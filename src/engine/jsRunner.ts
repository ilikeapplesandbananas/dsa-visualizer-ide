import * as acorn from 'acorn';
import type {
  ExecutionTrace,
  HeapObject,
  RunTestsResponse,
  SerializedValue,
  StackFrame,
  TestCaseResult,
  TraceStep,
} from '../types/trace';
import type { ProblemParam, TestCase, ArgType, CompareMode } from '../types/problem';
import {
  ListNode,
  TreeNode,
  GraphNode,
  AlgoHeap,
  convertArgs,
  toJsonOutput,
  compareOutputs,
  formatDisplay,
} from './dataConverters';
import { instrumentJavaScript } from './jsInstrumenter';

class TraceLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TraceLimitError';
  }
}

interface ActiveFrame {
  id: string;
  callId: number;
  parentCallId: number | null;
  funcName: string;
  line: number;
  snapFn: () => Record<string, unknown>;
  returned: boolean;
}

class JsHeapSerializer {
  private objIds = new WeakMap<object, string>();
  private counter = 0;

  getId(obj: object): string {
    let id = this.objIds.get(obj);
    if (!id) {
      this.counter += 1;
      id = `h${this.counter}`;
      this.objIds.set(obj, id);
    }
    return id;
  }

  serializeFrames(frames: ActiveFrame[]): {
    stack: StackFrame[];
    heap: Record<string, HeapObject>;
    serFn: (val: unknown) => SerializedValue;
  } {
    const heap: Record<string, HeapObject> = {};

    const ser = (val: unknown, depth = 0): SerializedValue => {
      if (val === null) return { kind: 'primitive', type: 'null', value: null };
      if (val === undefined) return { kind: 'primitive', type: 'undefined', value: null };
      if (typeof val === 'boolean') return { kind: 'primitive', type: 'boolean', value: val };
      if (typeof val === 'number') {
        if (Number.isNaN(val)) return { kind: 'primitive', type: 'string', value: 'NaN' };
        if (!Number.isFinite(val)) {
          return { kind: 'primitive', type: 'string', value: val > 0 ? 'Infinity' : '-Infinity' };
        }
        return { kind: 'primitive', type: 'number', value: val };
      }
      if (typeof val === 'string') return { kind: 'primitive', type: 'string', value: val };
      if (typeof val === 'bigint') return { kind: 'primitive', type: 'string', value: `${val}n` };
      if (typeof val === 'symbol') return { kind: 'primitive', type: 'string', value: val.toString() };
      if (typeof val === 'function') return { kind: 'primitive', type: 'string', value: `[fn ${val.name || 'anon'}]` };

      if (depth > 40 || Object.keys(heap).length > 400) {
        return { kind: 'primitive', type: 'string', value: '[MaxDepth]' };
      }

      if (typeof val === 'object') {
        const obj = val as object;
        const hid = this.getId(obj);
        if (heap[hid]) {
          return { kind: 'ref', id: hid };
        }

        if (obj instanceof AlgoHeap) {
          const entry: HeapObject = {
            id: hid,
            kind: 'heap',
            comparator: obj.comparatorKind,
            items: [],
            className: obj.comparatorKind === 'max' ? 'MaxHeap' : 'MinHeap',
          };
          heap[hid] = entry;
          entry.items = obj.items.slice(0, 200).map((item) => ser(item, depth + 1));
          return { kind: 'ref', id: hid };
        }

        if (Array.isArray(obj)) {
          const entry: HeapObject = { id: hid, kind: 'array', items: [] };
          heap[hid] = entry;
          entry.items = obj.slice(0, 250).map((item) => ser(item, depth + 1));
          return { kind: 'ref', id: hid };
        }

        if (obj instanceof Set) {
          const entry: HeapObject = { id: hid, kind: 'set', items: [] };
          heap[hid] = entry;
          entry.items = Array.from(obj)
            .slice(0, 200)
            .map((item) => ser(item, depth + 1));
          return { kind: 'ref', id: hid };
        }

        if (obj instanceof Map) {
          const entry: HeapObject = { id: hid, kind: 'map', entries: [], className: 'Map' };
          heap[hid] = entry;
          let count = 0;
          for (const [k, v] of obj.entries()) {
            if (count >= 200) break;
            entry.entries.push({ key: formatMapKey(k), value: ser(v, depth + 1) });
            count += 1;
          }
          return { kind: 'ref', id: hid };
        }

        const ctorName = obj.constructor?.name || 'Object';
        const record = obj as Record<string, unknown>;
        const isPlainObject = ctorName === 'Object' || ctorName === '';
        const looksLikeNode =
          'next' in record ||
          'left' in record ||
          'right' in record ||
          'neighbors' in record ||
          'children' in record;

        if (isPlainObject && !looksLikeNode) {
          const entry: HeapObject = { id: hid, kind: 'map', entries: [] };
          heap[hid] = entry;
          for (const [k, v] of Object.entries(record).slice(0, 200)) {
            if (typeof v !== 'function') {
              entry.entries.push({ key: k, value: ser(v, depth + 1) });
            }
          }
          return { kind: 'ref', id: hid };
        }

        const fields: Record<string, SerializedValue> = {};
        const entry: HeapObject = {
          id: hid,
          kind: 'object',
          className: isPlainObject ? 'Node' : ctorName,
          fields,
        };
        heap[hid] = entry;
        for (const [k, v] of Object.entries(record).slice(0, 50)) {
          if (!k.startsWith('_') && typeof v !== 'function') {
            fields[k] = ser(v, depth + 1);
          }
        }
        return { kind: 'ref', id: hid };
      }

      return { kind: 'primitive', type: 'string', value: String(val) };
    };

    const stack: StackFrame[] = frames.map((f) => {
      let rawLocals: Record<string, unknown> = {};
      try {
        rawLocals = f.snapFn();
      } catch {
        rawLocals = {};
      }
      const locals: Record<string, SerializedValue> = {};
      for (const [k, v] of Object.entries(rawLocals)) {
        if (typeof v === 'function' || k === 'ListNode' || k === 'TreeNode' || k === 'GraphNode' || k === 'Solution') {
          continue;
        }
        locals[k] = ser(v);
      }
      return {
        id: f.id,
        callId: f.callId,
        parentCallId: f.parentCallId,
        funcName: f.funcName,
        line: f.line,
        locals,
      };
    });

    return { stack, heap, serFn: (v: unknown) => ser(v) };
  }
}

function formatMapKey(k: unknown): string {
  if (typeof k === 'string') return k;
  if (typeof k === 'number' || typeof k === 'boolean' || k === null || k === undefined) {
    return String(k);
  }
  try {
    return JSON.stringify(k);
  } catch {
    return String(k);
  }
}

function discoverTopLevelNames(sourceCode: string): string[] {
  try {
    const ast = acorn.parse(sourceCode, { ecmaVersion: 'latest', sourceType: 'script' });
    const names: string[] = [];
    for (const node of ast.body) {
      if (node.type === 'FunctionDeclaration' && node.id) {
        names.push(node.id.name);
      } else if (node.type === 'VariableDeclaration') {
        for (const decl of node.declarations) {
          if (decl.id.type === 'Identifier') names.push(decl.id.name);
        }
      } else if (node.type === 'ClassDeclaration' && node.id) {
        names.push(node.id.name);
      }
    }
    return names;
  } catch {
    return [];
  }
}

function buildEntryResolverCode(entryFunction: string, topNames: string[]): string {
  const safeTop = topNames.filter((n) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(n));
  const exportsObj = safeTop
    .map((n) => `${JSON.stringify(n)}: (typeof ${n} !== 'undefined' ? ${n} : undefined)`)
    .join(', ');

  return `
    ;return (function() {
      const __exports = { ${exportsObj} };
      if (typeof ${JSON.stringify(entryFunction)} === 'string') {
        const __direct = __exports[${JSON.stringify(entryFunction)}];
        if (typeof __direct === 'function') return __direct;
      }
      if (typeof __exports.Solution === 'function') {
        const __sol = new __exports.Solution();
        if (typeof __sol[${JSON.stringify(entryFunction)}] === 'function') {
          return __sol[${JSON.stringify(entryFunction)}].bind(__sol);
        }
      }
      for (const __k of Object.keys(__exports)) {
        if (__k !== 'Solution' && typeof __exports[__k] === 'function') {
          return __exports[__k];
        }
      }
      return null;
    })();
  `;
}

export interface JsTracePayload {
  code: string;
  entryFunction: string;
  params: ProblemParam[];
  returnType: ArgType | 'void';
  isPlayground?: boolean;
  testCase: TestCase;
  maxSteps?: number;
}

export function runJavaScriptTrace(payload: JsTracePayload): ExecutionTrace {
  const startTime = performance.now();
  const maxSteps = payload.maxSteps ?? 1000;
  const maxLoopOps = 5000;

  const inst = instrumentJavaScript(payload.code, {
    traceTopLevel: Boolean(payload.isPlayground),
    guardOnly: false,
  });

  if (inst.error) {
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: inst.error,
      errorLine: inst.errorLine,
      runtimeMs: Number((performance.now() - startTime).toFixed(2)),
    };
  }

  const topNames = discoverTopLevelNames(payload.code);
  const wrappedSource = payload.isPlayground
    ? inst.code
    : `${inst.code}\n${buildEntryResolverCode(payload.entryFunction, topNames)}`;

  const steps: TraceStep[] = [];
  const stdoutLines: string[] = [];
  const serializer = new JsHeapSerializer();
  const frameStack: ActiveFrame[] = [];
  const prevLocals = new Map<number, Record<string, SerializedValue>>();
  let callCounter = 0;
  let loopOps = 0;
  let truncated = false;
  let finalOutput: unknown = null;
  let errorMsg: string | undefined;
  let errorLine: number | undefined;

  const customConsole = {
    log: (...args: unknown[]) => {
      const msg = args
        .map((a) => {
          if (typeof a === 'string') return a;
          try {
            return JSON.stringify(toJsonOutput(a, 'any'));
          } catch {
            return String(a);
          }
        })
        .join(' ');
      stdoutLines.push(msg);
      if (stdoutLines.length > 200) stdoutLines.shift();
    },
    warn: (...args: unknown[]) => customConsole.log(...args),
    error: (...args: unknown[]) => customConsole.log(...args),
  };

  function captureStep(
    line: number,
    event: TraceStep['event'],
    returnVal?: unknown,
    errText?: string
  ) {
    if (steps.length >= maxSteps) {
      truncated = true;
      throw new TraceLimitError(
        `Trace limit reached (${maxSteps} steps). Your code may have an infinite loop or large input.`
      );
    }
    if (frameStack.length === 0) return;

    const { stack, heap, serFn } = serializer.serializeFrames(frameStack);
    const topFrame = stack[stack.length - 1];
    const prev = prevLocals.get(topFrame.callId) ?? {};
    const changedVars: string[] = [];
    for (const [k, v] of Object.entries(topFrame.locals)) {
      if (!(k in prev) || JSON.stringify(prev[k]) !== JSON.stringify(v)) {
        changedVars.push(k);
      }
    }
    prevLocals.set(topFrame.callId, topFrame.locals);

    const stepObj: TraceStep = {
      step: steps.length,
      line,
      event,
      funcName: topFrame.funcName,
      callId: topFrame.callId,
      parentCallId: topFrame.parentCallId,
      callStack: stack,
      heap,
      stdout: [...stdoutLines],
      changedVars,
    };
    if (event === 'return') {
      stepObj.returnValue = serFn(returnVal);
    }
    if (errText) {
      stepObj.error = errText;
    }
    steps.push(stepObj);
  }

  const __pushFrame = (
    funcName: string,
    line: number,
    snapFn: () => Record<string, unknown>
  ) => {
    if (frameStack.length >= 120) {
      throw new TraceLimitError('Maximum recursion depth (120) exceeded.');
    }
    callCounter += 1;
    const parentCallId =
      frameStack.length > 0 ? frameStack[frameStack.length - 1].callId : null;
    frameStack.push({
      id: `f${callCounter}`,
      callId: callCounter,
      parentCallId,
      funcName,
      line,
      snapFn,
      returned: false,
    });
    captureStep(line, 'call');
  };

  const __step = (line: number, snapFn: () => Record<string, unknown>) => {
    if (frameStack.length > 0) {
      const top = frameStack[frameStack.length - 1];
      top.line = line;
      top.snapFn = snapFn;
    }
    captureStep(line, 'step');
  };

  const __ret = <T>(
    line: number,
    exprFn: () => T,
    snapFn: () => Record<string, unknown>
  ): T => {
    const val = exprFn();
    if (frameStack.length > 0) {
      const top = frameStack[frameStack.length - 1];
      top.line = line;
      top.snapFn = snapFn;
      top.returned = true;
      captureStep(line, 'return', val);
    }
    return val;
  };

  const __popFrame = (line: number, snapFn: () => Record<string, unknown>) => {
    const top = frameStack[frameStack.length - 1];
    if (top && !top.returned) {
      top.line = line;
      top.snapFn = snapFn;
      try {
        captureStep(line, 'return', undefined);
      } catch {
        // Ignore if trace limit already triggered during unwind
      }
    }
    frameStack.pop();
  };

  const __guard = () => {
    loopOps += 1;
    if (loopOps > maxLoopOps) {
      throw new TraceLimitError(
        `Loop iteration limit exceeded (${maxLoopOps} iterations). Possible infinite loop.`
      );
    }
  };

  try {
    const compiledFn = new Function(
      'ListNode',
      'TreeNode',
      'GraphNode',
      'MinHeap',
      'MaxHeap',
      'console',
      '__pushFrame',
      '__step',
      '__ret',
      '__popFrame',
      '__guard',
      wrappedSource
    );

    const MinHeap = class<T = unknown> extends AlgoHeap<T> {
      constructor(cmp?: (a: T, b: T) => number) {
        super(cmp, 'min');
      }
    };
    const MaxHeap = class<T = unknown> extends AlgoHeap<T> {
      constructor(cmp?: (a: T, b: T) => number) {
        super(
          cmp ??
            ((a: unknown, b: unknown) => {
              const va = Array.isArray(a) ? Number(a[0]) : Number(a);
              const vb = Array.isArray(b) ? Number(b[0]) : Number(b);
              return vb - va;
            }),
          'max'
        );
      }
    };

    const exported = compiledFn(
      ListNode,
      TreeNode,
      GraphNode,
      MinHeap,
      MaxHeap,
      customConsole,
      __pushFrame,
      __step,
      __ret,
      __popFrame,
      __guard
    );

    if (!payload.isPlayground) {
      if (typeof exported !== 'function') {
        throw new Error(
          `Could not find entry function '${payload.entryFunction}' in your JavaScript code.`
        );
      }
      const rawArgs = payload.testCase?.args ?? [];
      const jsArgs = convertArgs(rawArgs, payload.params);
      const rawRes = exported(...jsArgs);
      if (payload.returnType === 'void' && rawRes === undefined && jsArgs.length > 0) {
        finalOutput = toJsonOutput(jsArgs[0], payload.params[0]?.type ?? 'any');
      } else {
        finalOutput = toJsonOutput(rawRes, payload.returnType);
      }
    }
  } catch (err) {
    if (err instanceof TraceLimitError) {
      errorMsg = err.message;
    } else if (err instanceof Error) {
      errorMsg = `${err.name}: ${err.message}`;
      if (steps.length > 0) {
        errorLine = steps[steps.length - 1].line;
      }
    } else {
      errorMsg = String(err);
    }
  }

  return {
    steps,
    finalOutput,
    stdout: stdoutLines,
    error: errorMsg,
    errorLine,
    truncated,
    runtimeMs: Number((performance.now() - startTime).toFixed(2)),
  };
}

export interface JsTestsPayload {
  code: string;
  entryFunction: string;
  params: ProblemParam[];
  returnType: ArgType | 'void';
  compareMode: CompareMode;
  isPlayground?: boolean;
  testCases: TestCase[];
}

export function runJavaScriptTests(payload: JsTestsPayload): RunTestsResponse {
  const totalStart = performance.now();

  const inst = instrumentJavaScript(payload.code, {
    traceTopLevel: false,
    guardOnly: true,
  });

  if (inst.error) {
    return {
      allPassed: false,
      passedCount: 0,
      totalCount: payload.testCases.length,
      results: [],
      totalRuntimeMs: 0,
      error: inst.error,
    };
  }

  const topNames = discoverTopLevelNames(payload.code);
  const wrappedSource = payload.isPlayground
    ? inst.code
    : `${inst.code}\n${buildEntryResolverCode(payload.entryFunction, topNames)}`;

  if (payload.isPlayground) {
    const stdoutLines: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) =>
        stdoutLines.push(args.map((a) => (typeof a === 'string' ? a : formatDisplay(toJsonOutput(a, 'any')))).join(' ')),
      warn: (...args: unknown[]) => customConsole.log(...args),
      error: (...args: unknown[]) => customConsole.log(...args),
    };
    let loopOps = 0;
    let depth = 0;
    const __guard = () => {
      loopOps += 1;
      if (loopOps > 150000) throw new TraceLimitError('Time Limit Exceeded (possible infinite loop).');
    };
    const __guardDepth = (delta: number) => {
      depth += delta;
      if (depth > 250) throw new TraceLimitError('Maximum recursion depth (250) exceeded.');
    };

    let err: string | undefined;
    try {
      const fn = new Function('ListNode', 'TreeNode', 'GraphNode', 'console', '__guard', '__guardDepth', wrappedSource);
      fn(ListNode, TreeNode, GraphNode, customConsole, __guard, __guardDepth);
    } catch (e) {
      err = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    }

    const rt = Number((performance.now() - totalStart).toFixed(2));
    return {
      allPassed: !err,
      passedCount: err ? 0 : 1,
      totalCount: 1,
      results: [
        {
          testCaseId: 'playground',
          label: 'Playground Execution',
          passed: !err,
          inputDisplay: '(custom script)',
          expectedDisplay: 'No runtime errors',
          actualDisplay: err ? err : 'Completed',
          stdout: stdoutLines,
          runtimeMs: rt,
          error: err,
        },
      ],
      totalRuntimeMs: rt,
      error: err,
    };
  }

  const results: TestCaseResult[] = [];
  let passedCount = 0;

  for (const tc of payload.testCases) {
    const tcStart = performance.now();
    const stdoutLines: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) =>
        stdoutLines.push(args.map((a) => (typeof a === 'string' ? a : formatDisplay(toJsonOutput(a, 'any')))).join(' ')),
      warn: (...args: unknown[]) => customConsole.log(...args),
      error: (...args: unknown[]) => customConsole.log(...args),
    };

    let loopOps = 0;
    let depth = 0;
    const __guard = () => {
      loopOps += 1;
      if (loopOps > 150000) throw new TraceLimitError('Time Limit Exceeded (possible infinite loop).');
    };
    const __guardDepth = (delta: number) => {
      depth += delta;
      if (depth > 250) throw new TraceLimitError('Maximum recursion depth (250) exceeded.');
    };

    let err: string | undefined;
    let actualJson: unknown = null;
    let passed = false;

    try {
      const compiledFn = new Function(
        'ListNode',
        'TreeNode',
        'GraphNode',
        'MinHeap',
        'MaxHeap',
        'console',
        '__guard',
        '__guardDepth',
        wrappedSource
      );
      const MinHeap = class<T = unknown> extends AlgoHeap<T> {
        constructor(cmp?: (a: T, b: T) => number) {
          super(cmp, 'min');
        }
      };
      const MaxHeap = class<T = unknown> extends AlgoHeap<T> {
        constructor(cmp?: (a: T, b: T) => number) {
          super(
            cmp ??
              ((a: unknown, b: unknown) => {
                const va = Array.isArray(a) ? Number(a[0]) : Number(a);
                const vb = Array.isArray(b) ? Number(b[0]) : Number(b);
                return vb - va;
              }),
            'max'
          );
        }
      };
      const entryFn = compiledFn(
        ListNode,
        TreeNode,
        GraphNode,
        MinHeap,
        MaxHeap,
        customConsole,
        __guard,
        __guardDepth
      );

      if (typeof entryFn !== 'function') {
        throw new Error(`Could not find entry function '${payload.entryFunction}'.`);
      }

      const jsArgs = convertArgs(tc.args, payload.params);
      const rawRes = entryFn(...jsArgs);
      if (payload.returnType === 'void' && rawRes === undefined && jsArgs.length > 0) {
        actualJson = toJsonOutput(jsArgs[0], payload.params[0]?.type ?? 'any');
      } else {
        actualJson = toJsonOutput(rawRes, payload.returnType);
      }

      passed = compareOutputs(actualJson, tc.expected, payload.compareMode);
      if (passed) passedCount += 1;
    } catch (e) {
      err = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    }

    const inputDisplay = tc.args
      .map((val, idx) => `${payload.params[idx]?.name ?? `arg${idx}`} = ${formatDisplay(val)}`)
      .join(', ');

    results.push({
      testCaseId: tc.id,
      label: tc.label,
      passed,
      isHidden: tc.isHidden,
      inputDisplay,
      expectedDisplay: formatDisplay(tc.expected),
      actualDisplay: err ? err : formatDisplay(actualJson),
      stdout: stdoutLines,
      runtimeMs: Number((performance.now() - tcStart).toFixed(2)),
      error: err,
    });
  }

  return {
    allPassed: passedCount === payload.testCases.length && payload.testCases.length > 0,
    passedCount,
    totalCount: payload.testCases.length,
    results,
    totalRuntimeMs: Number((performance.now() - totalStart).toFixed(2)),
  };
}

