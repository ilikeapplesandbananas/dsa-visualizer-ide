import type { Problem, TestCase } from '../types/problem';
import type { HeapObject, SerializedValue, TraceStep } from '../types/trace';
import { detectStructures, type DetectedStructures } from './structureDetector';

export function buildInputPreviewStructures(
  problem: Problem,
  testCase: TestCase | undefined
): DetectedStructures {
  if (!testCase || problem.isPlayground) {
    return {
      arrays: [],
      matrices: [],
      linkedList: null,
      trees: [],
      graphs: [],
      maps: [],
      sets: [],
      stacksQueues: [],
      heaps: [],
      intervals: [],
      scalars: [],
      recursionTree: null,
    };
  }

  const heap: Record<string, HeapObject> = {};
  const locals: Record<string, SerializedValue> = {};
  let idCounter = 0;
  const nextId = () => `preview_${++idCounter}`;

  const toSer = (val: unknown): SerializedValue => {
    if (val === null) return { kind: 'primitive', type: 'null', value: null };
    if (val === undefined) return { kind: 'primitive', type: 'undefined', value: null };
    if (typeof val === 'boolean') return { kind: 'primitive', type: 'boolean', value: val };
    if (typeof val === 'number') return { kind: 'primitive', type: 'number', value: val };
    if (typeof val === 'string') return { kind: 'primitive', type: 'string', value: val };
    if (Array.isArray(val)) {
      const hid = nextId();
      heap[hid] = { id: hid, kind: 'array', items: val.slice(0, 100).map(toSer) };
      return { kind: 'ref', id: hid };
    }
    return { kind: 'primitive', type: 'string', value: JSON.stringify(val) };
  };

  problem.params.forEach((param, idx) => {
    const raw = testCase.args[idx];
    if (raw === undefined) return;

    if (param.type === 'linkedList' || param.type === 'linkedListCycle') {
      const values =
        param.type === 'linkedListCycle' && raw && typeof raw === 'object' && !Array.isArray(raw)
          ? (raw as { values?: unknown[] }).values ?? []
          : Array.isArray(raw)
            ? raw
            : [];
      const pos =
        param.type === 'linkedListCycle' && raw && typeof raw === 'object' && !Array.isArray(raw)
          ? (raw as { pos?: number }).pos ?? -1
          : -1;

      if (values.length === 0) {
        locals[param.name] = { kind: 'primitive', type: 'null', value: null };
        return;
      }

      const ids = values.map(() => nextId());
      values.forEach((v, i) => {
        const nextIdx = i < values.length - 1 ? i + 1 : pos >= 0 && pos < values.length ? pos : -1;
        heap[ids[i]] = {
          id: ids[i],
          kind: 'object',
          className: 'ListNode',
          fields: {
            val: toSer(v),
            next: nextIdx >= 0 ? { kind: 'ref', id: ids[nextIdx] } : { kind: 'primitive', type: 'null', value: null },
          },
        };
      });
      locals[param.name] = { kind: 'ref', id: ids[0] };
      return;
    }

    if (param.type === 'linkedListArray' && Array.isArray(raw)) {
      const listRefs: SerializedValue[] = [];
      for (const subArr of raw) {
        if (!Array.isArray(subArr) || subArr.length === 0) {
          listRefs.push({ kind: 'primitive', type: 'null', value: null });
          continue;
        }
        const ids = subArr.map(() => nextId());
        subArr.forEach((v, i) => {
          heap[ids[i]] = {
            id: ids[i],
            kind: 'object',
            className: 'ListNode',
            fields: {
              val: toSer(v),
              next:
                i < subArr.length - 1
                  ? { kind: 'ref', id: ids[i + 1] }
                  : { kind: 'primitive', type: 'null', value: null },
            },
          };
        });
        listRefs.push({ kind: 'ref', id: ids[0] });
      }
      const arrId = nextId();
      heap[arrId] = { id: arrId, kind: 'array', items: listRefs };
      locals[param.name] = { kind: 'ref', id: arrId };
      return;
    }

    if (param.type === 'treeNodeRef') {
      // Find matching TreeNode in already-constructed root so p/q pointers tag the tree node directly
      const targetId = Object.keys(heap).find((id) => {
        const obj = heap[id];
        if (obj.kind !== 'object' || obj.className !== 'TreeNode') return false;
        const valF = obj.fields.val;
        return valF?.kind === 'primitive' && valF.value === raw;
      });
      if (targetId) {
        locals[param.name] = { kind: 'ref', id: targetId };
        return;
      }
    }

    if (param.type === 'binaryTree') {
      const values = Array.isArray(raw) ? raw : [];
      if (values.length === 0 || values[0] === null || values[0] === undefined) {
        locals[param.name] = { kind: 'primitive', type: 'null', value: null };
        return;
      }
      const rootId = nextId();
      const createNode = (v: unknown): string => {
        const id = nextId();
        heap[id] = {
          id,
          kind: 'object',
          className: 'TreeNode',
          fields: {
            val: toSer(v),
            left: { kind: 'primitive', type: 'null', value: null },
            right: { kind: 'primitive', type: 'null', value: null },
          },
        };
        return id;
      };
      heap[rootId] = {
        id: rootId,
        kind: 'object',
        className: 'TreeNode',
        fields: {
          val: toSer(values[0]),
          left: { kind: 'primitive', type: 'null', value: null },
          right: { kind: 'primitive', type: 'null', value: null },
        },
      };
      const q: string[] = [rootId];
      let ptr = 1;
      while (q.length > 0 && ptr < values.length) {
        const nid = q.shift()!;
        const node = heap[nid] as Extract<HeapObject, { kind: 'object' }>;
        if (ptr < values.length) {
          const lv = values[ptr++];
          if (lv !== null && lv !== undefined) {
            const lid = createNode(lv);
            node.fields.left = { kind: 'ref', id: lid };
            q.push(lid);
          }
        }
        if (ptr < values.length) {
          const rv = values[ptr++];
          if (rv !== null && rv !== undefined) {
            const rid = createNode(rv);
            node.fields.right = { kind: 'ref', id: rid };
            q.push(rid);
          }
        }
      }
      locals[param.name] = { kind: 'ref', id: rootId };
      return;
    }

    // Course Schedule preview: convert numCourses + prerequisites into adj graph preview
    if (
      problem.id === 'course-schedule' &&
      param.name === 'prerequisites' &&
      Array.isArray(raw) &&
      typeof testCase.args[0] === 'number'
    ) {
      const n = testCase.args[0];
      const adjLists: number[][] = Array.from({ length: n }, () => []);
      for (const pair of raw as number[][]) {
        if (Array.isArray(pair) && pair.length >= 2 && pair[1] >= 0 && pair[1] < n) {
          adjLists[pair[1]].push(pair[0]);
        }
      }
      locals.adj = toSer(adjLists);
      return;
    }

    locals[param.name] = toSer(raw);
  });

  const syntheticStep: TraceStep = {
    step: 0,
    line: 1,
    event: 'step',
    funcName: problem.entryFunction || 'main',
    callId: 1,
    parentCallId: null,
    callStack: [
      {
        id: 'preview',
        callId: 1,
        parentCallId: null,
        funcName: problem.entryFunction || 'main',
        line: 1,
        locals,
      },
    ],
    heap,
    stdout: [],
    changedVars: [],
  };

  return detectStructures(syntheticStep, null, [syntheticStep], 0, problem.visualHint);
}

