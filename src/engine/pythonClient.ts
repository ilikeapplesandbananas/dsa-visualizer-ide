import type { ExecutionTrace, RunTestsResponse } from '../types/trace';
import type { ProblemParam, TestCase, ArgType, CompareMode, Language } from '../types/problem';
import type { JsTracePayload, JsTestsPayload } from './jsRunner';

export interface PythonRunRequest {
  mode: 'trace' | 'tests';
  code: string;
  entryFunction: string;
  params: ProblemParam[];
  returnType: ArgType | 'void';
  compareMode: CompareMode;
  isPlayground?: boolean;
  testCases: TestCase[];
  maxSteps?: number;
}

export async function runPythonTrace(req: Omit<PythonRunRequest, 'mode'>): Promise<ExecutionTrace> {
  try {
    const res = await fetch('/api/python/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...req, mode: 'trace' }),
    });
    if (!res.ok) {
      throw new Error(`Python server responded with HTTP ${res.status}`);
    }
    return (await res.json()) as ExecutionTrace;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not reach Python execution server.';
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: `${msg} Make sure the AlgoLens API server is running (npm run dev).`,
      runtimeMs: 0,
    };
  }
}

export async function runPythonTests(req: Omit<PythonRunRequest, 'mode'>): Promise<RunTestsResponse> {
  try {
    const res = await fetch('/api/python/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...req, mode: 'tests' }),
    });
    if (!res.ok) {
      throw new Error(`Python server responded with HTTP ${res.status}`);
    }
    return (await res.json()) as RunTestsResponse;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not reach Python execution server.';
    return {
      allPassed: false,
      passedCount: 0,
      totalCount: req.testCases.length,
      results: [],
      totalRuntimeMs: 0,
      error: `${msg} Make sure the AlgoLens API server is running (npm run dev).`,
    };
  }
}

// Worker-backed non-blocking JS execution with timeout safeguard so infinite code outside loops can't freeze UI
let activeWorker: Worker | null = null;
let reqCounter = 0;

function getJsWorker(): Worker {
  if (!activeWorker) {
    activeWorker = new Worker(new URL('./jsWorker.ts', import.meta.url), { type: 'module' });
  }
  return activeWorker;
}

function resetJsWorker() {
  if (activeWorker) {
    activeWorker.terminate();
    activeWorker = null;
  }
}

export function runJsTraceInWorker(payload: JsTracePayload, timeoutMs = 4000): Promise<ExecutionTrace> {
  return new Promise((resolve) => {
    const worker = getJsWorker();
    const requestId = ++reqCounter;
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resetJsWorker();
        resolve({
          steps: [],
          finalOutput: null,
          stdout: [],
          error: `JavaScript execution timed out after ${timeoutMs}ms (worker terminated safely).`,
          runtimeMs: timeoutMs,
        });
      }
    }, timeoutMs);

    const onMsg = (e: MessageEvent) => {
      if (e.data?.requestId !== requestId || done) return;
      done = true;
      clearTimeout(timer);
      worker.removeEventListener('message', onMsg);
      if (e.data.ok) resolve(e.data.result as ExecutionTrace);
      else {
        resolve({
          steps: [],
          finalOutput: null,
          stdout: [],
          error: e.data.error || 'Worker execution error',
          runtimeMs: 0,
        });
      }
    };

    worker.addEventListener('message', onMsg);
    worker.postMessage({ requestId, kind: 'trace', payload });
  });
}

export function runJsTestsInWorker(payload: JsTestsPayload, timeoutMs = 4000): Promise<RunTestsResponse> {
  return new Promise((resolve) => {
    const worker = getJsWorker();
    const requestId = ++reqCounter;
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resetJsWorker();
        resolve({
          allPassed: false,
          passedCount: 0,
          totalCount: payload.testCases.length,
          results: [],
          totalRuntimeMs: timeoutMs,
          error: `JavaScript tests timed out after ${timeoutMs}ms (worker terminated safely).`,
        });
      }
    }, timeoutMs);

    const onMsg = (e: MessageEvent) => {
      if (e.data?.requestId !== requestId || done) return;
      done = true;
      clearTimeout(timer);
      worker.removeEventListener('message', onMsg);
      if (e.data.ok) resolve(e.data.result as RunTestsResponse);
      else {
        resolve({
          allPassed: false,
          passedCount: 0,
          totalCount: payload.testCases.length,
          results: [],
          totalRuntimeMs: 0,
          error: e.data.error || 'Worker test execution error',
        });
      }
    };

    worker.addEventListener('message', onMsg);
    worker.postMessage({ requestId, kind: 'tests', payload });
  });
}

export async function runCompiledLangTrace(
  language: 'java' | 'cpp' | 'c' | 'csharp',
  req: Omit<PythonRunRequest, 'mode'>
): Promise<ExecutionTrace> {
  try {
    const res = await fetch('/api/lang/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...req, language, mode: 'trace' }),
    });
    if (!res.ok) {
      throw new Error(`Execution server responded with HTTP ${res.status}`);
    }
    return (await res.json()) as ExecutionTrace;
  } catch (err) {
    const msg = err instanceof Error ? err.message : `Could not reach ${language} execution server.`;
    return {
      steps: [],
      finalOutput: null,
      stdout: [],
      error: `${msg} Make sure the AlgoLens API server is running (npm run dev / npm start).`,
      runtimeMs: 0,
    };
  }
}

export async function runCompiledLangTests(
  language: 'java' | 'cpp' | 'c' | 'csharp',
  req: Omit<PythonRunRequest, 'mode'>
): Promise<RunTestsResponse> {
  try {
    const res = await fetch('/api/lang/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...req, language, mode: 'tests' }),
    });
    if (!res.ok) {
      throw new Error(`Execution server responded with HTTP ${res.status}`);
    }
    return (await res.json()) as RunTestsResponse;
  } catch (err) {
    const msg = err instanceof Error ? err.message : `Could not reach ${language} execution server.`;
    return {
      allPassed: false,
      passedCount: 0,
      totalCount: req.testCases.length,
      results: [],
      totalRuntimeMs: 0,
      error: `${msg} Make sure the AlgoLens API server is running (npm run dev / npm start).`,
    };
  }
}

export async function runUnifiedTrace(
  language: Language,
  params: {
    code: string;
    entryFunction: string;
    params: ProblemParam[];
    returnType: ArgType | 'void';
    isPlayground?: boolean;
    testCase: TestCase;
    compareMode: CompareMode;
  }
): Promise<ExecutionTrace> {
  if (language === 'javascript') {
    return runJsTraceInWorker({
      code: params.code,
      entryFunction: params.entryFunction,
      params: params.params,
      returnType: params.returnType,
      isPlayground: params.isPlayground,
      testCase: params.testCase,
    });
  }
  if (language === 'python') {
    return runPythonTrace({
      code: params.code,
      entryFunction: params.entryFunction,
      params: params.params,
      returnType: params.returnType,
      compareMode: params.compareMode,
      isPlayground: params.isPlayground,
      testCases: [params.testCase],
    });
  }
  return runCompiledLangTrace(language, {
    code: params.code,
    entryFunction: params.entryFunction,
    params: params.params,
    returnType: params.returnType,
    compareMode: params.compareMode,
    isPlayground: params.isPlayground,
    testCases: [params.testCase],
  });
}

export async function runUnifiedTests(
  language: Language,
  params: {
    code: string;
    entryFunction: string;
    params: ProblemParam[];
    returnType: ArgType | 'void';
    compareMode: CompareMode;
    isPlayground?: boolean;
    testCases: TestCase[];
  }
): Promise<RunTestsResponse> {
  if (language === 'javascript') {
    return runJsTestsInWorker(params);
  }
  if (language === 'python') {
    return runPythonTests(params);
  }
  return runCompiledLangTests(language, params);
}

