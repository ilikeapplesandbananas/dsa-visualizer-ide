import type { HeapObject, SerializedValue, StackFrame, TraceStep } from '../types/trace';
import type { VisualHint } from '../types/problem';

export interface ArrayPointer {
  name: string;
  index: number;
  color: string;
}

export interface ArrayViewModel {
  id: string;
  name: string;
  isString?: boolean;
  items: Array<{
    index: number;
    display: string;
    numericValue: number | null;
    changed: boolean;
  }>;
  pointers: ArrayPointer[];
  windowRange?: {
    start: number;
    end: number;
    label: string;
  };
  preferBars: boolean;
}

export interface MatrixViewModel {
  id: string;
  name: string;
  rows: Array<
    Array<{
      r: number;
      c: number;
      display: string;
      numericValue: number | null;
      changed: boolean;
    }>
  >;
  activeRow: number | null;
  activeCol: number | null;
  rowLabel?: string;
  colLabel?: string;
}

export interface LinkedListNodeModel {
  id: string;
  valDisplay: string;
  nextId: string | null;
  pointers: string[];
  changed: boolean;
}

export interface LinkedListViewModel {
  nodes: LinkedListNodeModel[];
  heads: string[];
  cycleEdges: Array<{ from: string; to: string }>;
}

export interface TreeNodeModel {
  id: string;
  valDisplay: string;
  leftId: string | null;
  rightId: string | null;
  pointers: string[];
  inQueue: boolean;
  changed: boolean;
}

export interface TreeViewModel {
  rootId: string;
  nodes: Record<string, TreeNodeModel>;
  extraRoots: string[];
}

export interface GraphNodeModel {
  id: string;
  label: string;
  status: 'default' | 'active' | 'queued' | 'visited' | 'visiting';
  pointers: string[];
}

export interface GraphEdgeModel {
  from: string;
  to: string;
  directed: boolean;
}

export interface GraphViewModel {
  name: string;
  nodes: GraphNodeModel[];
  edges: GraphEdgeModel[];
}

export interface MapEntryModel {
  key: string;
  valueDisplay: string;
  changed: boolean;
}

export interface MapViewModel {
  id: string;
  name: string;
  entries: MapEntryModel[];
}

export interface SetViewModel {
  id: string;
  name: string;
  items: Array<{ display: string; changed: boolean }>;
}

export interface StackQueueViewModel {
  id: string;
  name: string;
  kind: 'stack' | 'queue';
  items: Array<{ display: string; changed: boolean }>;
}

export interface HeapItemModel {
  display: string;
  numericValue: number | null;
  changed: boolean;
}

export interface HeapViewModel {
  id: string;
  name: string;
  comparator: 'min' | 'max';
  items: HeapItemModel[];
}

export interface IntervalItemModel {
  index: number;
  start: number;
  end: number;
  changed: boolean;
}

export interface IntervalViewModel {
  id: string;
  name: string;
  minVal: number;
  maxVal: number;
  items: IntervalItemModel[];
  activeIndices: number[];
}

export interface ScalarVarModel {
  name: string;
  type: string;
  display: string;
  changed: boolean;
}

export interface RecursionNodeModel {
  callId: number;
  parentCallId: number | null;
  funcName: string;
  argsSummary: string;
  returnDisplay?: string;
  status: 'active' | 'waiting' | 'returned';
  children: number[];
}

export interface DetectedStructures {
  arrays: ArrayViewModel[];
  matrices: MatrixViewModel[];
  linkedList: LinkedListViewModel | null;
  trees: TreeViewModel[];
  graphs: GraphViewModel[];
  maps: MapViewModel[];
  sets: SetViewModel[];
  stacksQueues: StackQueueViewModel[];
  heaps: HeapViewModel[];
  intervals: IntervalViewModel[];
  scalars: ScalarVarModel[];
  recursionTree: {
    roots: number[];
    nodes: Record<number, RecursionNodeModel>;
    activeCallId: number | null;
  } | null;
}

const POINTER_COLORS = [
  '#818cf8', // indigo
  '#34d399', // emerald
  '#fbbf24', // amber
  '#f472b6', // pink
  '#38bdf8', // sky
  '#a78bfa', // violet
  '#fb7185', // rose
];

const NON_POINTER_VARS = new Set([
  'target',
  'sum',
  'total',
  'ans',
  'res',
  'result',
  'output',
  'count',
  'cnt',
  'max',
  'min',
  'maxArea',
  'max_area',
  'maxLen',
  'max_len',
  'minLen',
  'min_len',
  'water',
  'area',
  'height',
  'width',
  'profit',
  'best',
  'complement',
  'comp',
  'diff',
  'val',
  'value',
  'temp',
  'tmp',
  'prod',
  'prefix',
  'suffix',
  'leftMax',
  'left_max',
  'rightMax',
  'right_max',
  'numCourses',
  'num_courses',
  'amount',
  'coins',
  'n',
  'm',
  'rows',
  'cols',
  'len',
  'size',
  'depth',
  'level',
  'islands',
  'streak',
  'longest',
  'fresh',
  'minutes',
  'mins',
  'time',
  'dist',
  'steps',
  'windowSum',
  'window_sum',
  'maxSum',
  'max_sum',
  'currSum',
  'curr_sum',
  'prefixSum',
  'prefix_sum',
  'targetSum',
  'target_sum',
  'remain',
  'remaining',
  'k',
  'rooms',
  'maxRooms',
  'max_rooms',
  'returnSize',
  'returnColumnSizes',
]);

const KNOWN_POINTER_NAMES = new Set([
  'i',
  'j',
  'l',
  'r',
  'left',
  'right',
  'mid',
  'low',
  'high',
  'lo',
  'hi',
  'start',
  'end',
  'idx',
  'index',
  'pos',
  'ptr',
  'cur',
  'curr',
  'p',
  'p1',
  'p2',
  'slow',
  'fast',
  'head',
  'tail',
  'front',
  'back',
  'a',
  'b',
  'c',
  'row',
  'col',
]);

export function formatSerializedValue(
  val: SerializedValue | undefined,
  heap: Record<string, HeapObject>,
  depth = 0
): string {
  if (!val) return 'undefined';
  if (val.kind === 'primitive') {
    if (val.type === 'null') return 'null';
    if (val.type === 'undefined') return 'undefined';
    if (val.type === 'string') return JSON.stringify(val.value);
    return String(val.value);
  }
  const obj = heap[val.id];
  if (!obj) return `@${val.id}`;
  if (depth > 2) return `[${obj.kind}]`;
  if (obj.kind === 'array' || obj.kind === 'heap') {
    const preview = obj.items.slice(0, 6).map((x) => formatSerializedValue(x, heap, depth + 1));
    return `[${preview.join(', ')}${obj.items.length > 6 ? ', ...' : ''}]`;
  }
  if (obj.kind === 'set') {
    const preview = obj.items.slice(0, 5).map((x) => formatSerializedValue(x, heap, depth + 1));
    return `{${preview.join(', ')}${obj.items.length > 5 ? ', ...' : ''}}`;
  }
  if (obj.kind === 'map') {
    const preview = obj.entries
      .slice(0, 4)
      .map((e) => `${e.key}: ${formatSerializedValue(e.value, heap, depth + 1)}`);
    return `{${preview.join(', ')}${obj.entries.length > 4 ? ', ...' : ''}}`;
  }
  if ('val' in obj.fields) {
    return `${obj.className}(${formatSerializedValue(obj.fields.val, heap, depth + 1)})`;
  }
  return `${obj.className}{...}`;
}

function formatCompactItem(val: SerializedValue | undefined, heap: Record<string, HeapObject>): string {
  if (!val) return 'null';
  if (val.kind === 'primitive') {
    if (val.type === 'null') return 'null';
    if (val.type === 'undefined') return 'undef';
    if (val.type === 'string') return String(val.value);
    return String(val.value);
  }
  const obj = heap[val.id];
  if (!obj) return `@${val.id}`;
  if (obj.kind === 'object' && 'val' in obj.fields) {
    return `${obj.className}(${formatCompactItem(obj.fields.val, heap)})`;
  }
  if (obj.kind === 'array') {
    return `[${obj.items.slice(0, 3).map((x) => formatCompactItem(x, heap)).join(',')}${obj.items.length > 3 ? '..' : ''}]`;
  }
  return formatSerializedValue(val, heap, 1);
}

function isLinkedListObj(obj: HeapObject | undefined): boolean {
  if (!obj || obj.kind !== 'object') return false;
  if (obj.className === 'ListNode') return true;
  return 'next' in obj.fields && ('val' in obj.fields || 'value' in obj.fields);
}

function isTreeObj(obj: HeapObject | undefined): boolean {
  if (!obj || obj.kind !== 'object') return false;
  if (obj.className === 'TreeNode') return true;
  return ('left' in obj.fields || 'right' in obj.fields) && ('val' in obj.fields || 'value' in obj.fields);
}

function isMatrixHeapObj(obj: HeapObject | undefined, heap: Record<string, HeapObject>): boolean {
  if (!obj || obj.kind !== 'array' || obj.items.length === 0) return false;
  let rowLen = -1;
  for (const rowRef of obj.items) {
    if (rowRef.kind !== 'ref') return false;
    const rowObj = heap[rowRef.id];
    if (!rowObj || rowObj.kind !== 'array') return false;
    if (rowLen === -1) rowLen = rowObj.items.length;
    if (rowObj.items.length === 0) return false;
    for (const cell of rowObj.items) {
      if (cell.kind !== 'primitive') return false;
    }
  }
  return rowLen > 0;
}

function isPrimitiveArray(obj: HeapObject | undefined): boolean {
  if (!obj || obj.kind !== 'array') return false;
  return obj.items.every((item) => item.kind === 'primitive');
}

function isAdjacencyArray(
  name: string,
  obj: HeapObject | undefined,
  heap: Record<string, HeapObject>,
  visualHint?: VisualHint
): boolean {
  if (!obj || obj.kind !== 'array' || obj.items.length === 0) return false;
  const looksLikeGraphName = /^(adj|graph|adjList|adj_list)$/i.test(name);
  if (!looksLikeGraphName && visualHint?.primaryStructure !== 'graph') return false;
  if (!looksLikeGraphName && /^(edges|prerequisites|intervals|res|result|ans)$/i.test(name)) return false;

  const n = obj.items.length;
  return obj.items.every((item) => {
    if (item.kind !== 'ref') return false;
    const inner = heap[item.id];
    if (!inner || inner.kind !== 'array') return false;
    return inner.items.every(
      (v) => v.kind === 'primitive' && v.type === 'number' && typeof v.value === 'number' && v.value >= 0 && v.value < n
    );
  });
}

function getMergedBindings(callStack: StackFrame[]): {
  merged: Record<string, SerializedValue>;
  topLocals: Record<string, SerializedValue>;
} {
  const merged: Record<string, SerializedValue> = {};
  for (const frame of callStack) {
    for (const [k, v] of Object.entries(frame.locals)) {
      merged[k] = v;
    }
  }
  const topLocals = callStack.length > 0 ? callStack[callStack.length - 1].locals : {};
  return { merged, topLocals };
}

function findVarForHeapId(
  merged: Record<string, SerializedValue>,
  targetId: string
): string | null {
  for (const [k, v] of Object.entries(merged)) {
    if (v.kind === 'ref' && v.id === targetId) return k;
  }
  return null;
}

export function buildRecursionTree(
  steps: TraceStep[],
  upToIndex: number
): DetectedStructures['recursionTree'] {
  if (!steps.length || upToIndex < 0) return null;
  const slice = steps.slice(0, upToIndex + 1);
  const nodes: Record<number, RecursionNodeModel> = {};
  const roots: number[] = [];

  for (const s of slice) {
    if (s.event === 'call' && !nodes[s.callId]) {
      const topFrame = s.callStack[s.callStack.length - 1];
      const argsPreview = topFrame
        ? Object.entries(topFrame.locals)
            .slice(0, 3)
            .map(([k, v]) => `${k}=${formatCompactItem(v, s.heap)}`)
            .join(', ')
        : '';
      nodes[s.callId] = {
        callId: s.callId,
        parentCallId: s.parentCallId,
        funcName: s.funcName,
        argsSummary: argsPreview,
        status: 'active',
        children: [],
      };
      if (s.parentCallId !== null && nodes[s.parentCallId]) {
        nodes[s.parentCallId].children.push(s.callId);
      } else {
        roots.push(s.callId);
      }
    } else if (s.event === 'return' && nodes[s.callId]) {
      nodes[s.callId].status = 'returned';
      if (s.returnValue) {
        nodes[s.callId].returnDisplay = formatCompactItem(s.returnValue, s.heap);
      }
    }
  }

  const totalCalls = Object.keys(nodes).length;
  if (totalCalls < 2) return null;

  const lastStep = slice[slice.length - 1];
  const activeCallId = lastStep?.callId ?? null;
  const activeStackIds = new Set((lastStep?.callStack ?? []).map((f) => f.callId));
  for (const node of Object.values(nodes)) {
    if (node.status !== 'returned') {
      node.status = node.callId === activeCallId ? 'active' : activeStackIds.has(node.callId) ? 'waiting' : 'returned';
    }
  }

  return { roots, nodes, activeCallId };
}

export function detectStructures(
  step: TraceStep | null,
  prevStep: TraceStep | null,
  allSteps: TraceStep[],
  stepIndex: number,
  visualHint?: VisualHint
): DetectedStructures {
  const empty: DetectedStructures = {
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

  if (!step) return empty;

  const { merged, topLocals } = getMergedBindings(step.callStack);
  const prevMerged = prevStep ? getMergedBindings(prevStep.callStack).merged : {};
  const heap = step.heap;
  const prevHeap = prevStep?.heap ?? {};

  // Numeric pointers from top stack frame
  const numericPointers: Array<{ name: string; value: number; color: string }> = [];
  let ptrColorIdx = 0;
  for (const [name, val] of Object.entries(topLocals)) {
    const isHintPtr = visualHint?.highlightPointers?.includes(name) ?? false;
    if (
      val.kind === 'primitive' &&
      val.type === 'number' &&
      typeof val.value === 'number' &&
      Number.isInteger(val.value) &&
      (isHintPtr || !NON_POINTER_VARS.has(name))
    ) {
      if (KNOWN_POINTER_NAMES.has(name) || isHintPtr || (val.value >= 0 && val.value <= 200)) {
        numericPointers.push({
          name,
          value: val.value,
          color: POINTER_COLORS[ptrColorIdx % POINTER_COLORS.length],
        });
        ptrColorIdx += 1;
      }
    }
  }

  // Sort known pointers first
  numericPointers.sort((a, b) => {
    const ap = KNOWN_POINTER_NAMES.has(a.name) ? 0 : 1;
    const bp = KNOWN_POINTER_NAMES.has(b.name) ? 0 : 1;
    return ap - bp;
  });

  // 1. Linked Lists across all heap objects
  const listNodeIds = Object.keys(heap).filter((id) => isLinkedListObj(heap[id]));
  let linkedList: LinkedListViewModel | null = null;
  if (listNodeIds.length > 0) {
    const idSet = new Set(listNodeIds);
    const inDegree: Record<string, number> = {};
    for (const id of listNodeIds) inDegree[id] = 0;

    for (const id of listNodeIds) {
      const obj = heap[id] as Extract<HeapObject, { kind: 'object' }>;
      const nextVal = obj.fields.next;
      if (nextVal?.kind === 'ref' && idSet.has(nextVal.id)) {
        inDegree[nextVal.id] = (inDegree[nextVal.id] || 0) + 1;
      }
    }

    // Collect ref pointers pointing to list nodes
    const ptrMap: Record<string, string[]> = {};
    for (const [varName, val] of Object.entries(topLocals)) {
      if (val.kind === 'ref' && idSet.has(val.id)) {
        ptrMap[val.id] = ptrMap[val.id] || [];
        ptrMap[val.id].push(varName);
      }
    }
    // Also add outer variable refs if not in topLocals
    for (const [varName, val] of Object.entries(merged)) {
      if (val.kind === 'ref' && idSet.has(val.id)) {
        ptrMap[val.id] = ptrMap[val.id] || [];
        if (!ptrMap[val.id].includes(varName)) {
          ptrMap[val.id].push(varName);
        }
      }
    }

    // Heads: inDegree === 0, or pointed by `head` / `l1` / `l2` / `prev` / `curr` / `dummy`
    const headCandidates = listNodeIds.filter((id) => inDegree[id] === 0);
    const heads = headCandidates.length > 0 ? headCandidates : [listNodeIds[0]];
    const orderedNodes: LinkedListNodeModel[] = [];
    const visited = new Set<string>();
    const cycleEdges: Array<{ from: string; to: string }> = [];

    const walkList = (startId: string) => {
      let curId: string | null = startId;
      while (curId && idSet.has(curId)) {
        if (visited.has(curId)) break;
        visited.add(curId);
        const obj = heap[curId] as Extract<HeapObject, { kind: 'object' }>;
        const prevObj = prevHeap[curId];
        const valField = obj.fields.val ?? obj.fields.value;
        const nextField = obj.fields.next;
        const nextId = nextField?.kind === 'ref' && idSet.has(nextField.id) ? nextField.id : null;

        let changed = false;
        if (!prevObj || prevObj.kind !== 'object') {
          changed = true;
        } else {
          const prevNext = prevObj.fields.next;
          const prevVal = prevObj.fields.val ?? prevObj.fields.value;
          if (JSON.stringify(prevNext) !== JSON.stringify(nextField) || JSON.stringify(prevVal) !== JSON.stringify(valField)) {
            changed = true;
          }
        }

        orderedNodes.push({
          id: curId,
          valDisplay: formatCompactItem(valField, heap),
          nextId,
          pointers: ptrMap[curId] ?? [],
          changed,
        });

        if (nextId && visited.has(nextId)) {
          cycleEdges.push({ from: curId, to: nextId });
          break;
        }
        curId = nextId;
      }
    };

    for (const h of heads) walkList(h);
    for (const id of listNodeIds) {
      if (!visited.has(id)) {
        heads.push(id);
        walkList(id);
      }
    }

    linkedList = { nodes: orderedNodes, heads, cycleEdges };
  }

  // 2. Binary Trees across all heap objects
  const treeNodeIds = Object.keys(heap).filter((id) => isTreeObj(heap[id]));
  const trees: TreeViewModel[] = [];
  if (treeNodeIds.length > 0) {
    const idSet = new Set(treeNodeIds);
    const inDegree: Record<string, number> = {};
    for (const id of treeNodeIds) inDegree[id] = 0;

    for (const id of treeNodeIds) {
      const obj = heap[id] as Extract<HeapObject, { kind: 'object' }>;
      const leftId = obj.fields.left?.kind === 'ref' && idSet.has(obj.fields.left.id) ? obj.fields.left.id : null;
      const rightId = obj.fields.right?.kind === 'ref' && idSet.has(obj.fields.right.id) ? obj.fields.right.id : null;
      if (leftId) inDegree[leftId] += 1;
      if (rightId) inDegree[rightId] += 1;
    }

    const ptrMap: Record<string, string[]> = {};
    for (const [varName, val] of Object.entries(topLocals)) {
      if (val.kind === 'ref' && idSet.has(val.id)) {
        ptrMap[val.id] = ptrMap[val.id] || [];
        ptrMap[val.id].push(varName);
      }
    }

    // Collect nodes sitting inside any queue/stack array
    const queuedTreeIds = new Set<string>();
    for (const [varName, val] of Object.entries(merged)) {
      if (val.kind === 'ref' && /^(q|queue|deque|stack|stk|st)/i.test(varName)) {
        const arrObj = heap[val.id];
        if (arrObj?.kind === 'array') {
          for (const item of arrObj.items) {
            if (item.kind === 'ref' && idSet.has(item.id)) queuedTreeIds.add(item.id);
            if (item.kind === 'ref' && heap[item.id]?.kind === 'array') {
              for (const sub of (heap[item.id] as Extract<HeapObject, { kind: 'array' }>).items) {
                if (sub.kind === 'ref' && idSet.has(sub.id)) queuedTreeIds.add(sub.id);
              }
            }
          }
        }
      }
    }

    const nodes: Record<string, TreeNodeModel> = {};
    for (const id of treeNodeIds) {
      const obj = heap[id] as Extract<HeapObject, { kind: 'object' }>;
      const prevObj = prevHeap[id];
      const valField = obj.fields.val ?? obj.fields.value;
      const leftId = obj.fields.left?.kind === 'ref' && idSet.has(obj.fields.left.id) ? obj.fields.left.id : null;
      const rightId = obj.fields.right?.kind === 'ref' && idSet.has(obj.fields.right.id) ? obj.fields.right.id : null;
      let changed = false;
      if (!prevObj || prevObj.kind !== 'object') changed = true;
      else if (
        JSON.stringify(prevObj.fields.left) !== JSON.stringify(obj.fields.left) ||
        JSON.stringify(prevObj.fields.right) !== JSON.stringify(obj.fields.right) ||
        JSON.stringify(prevObj.fields.val) !== JSON.stringify(valField)
      ) {
        changed = true;
      }

      nodes[id] = {
        id,
        valDisplay: formatCompactItem(valField, heap),
        leftId,
        rightId,
        pointers: ptrMap[id] ?? [],
        inQueue: queuedTreeIds.has(id),
        changed,
      };
    }

    // Prefer `root` variable if inDegree === 0, else first inDegree === 0
    const rootVar = merged.root;
    let primaryRoot = treeNodeIds.find((id) => inDegree[id] === 0) ?? treeNodeIds[0];
    if (rootVar?.kind === 'ref' && idSet.has(rootVar.id) && inDegree[rootVar.id] === 0) {
      primaryRoot = rootVar.id;
    }
    const extraRoots = treeNodeIds.filter((id) => id !== primaryRoot && inDegree[id] === 0);
    trees.push({ rootId: primaryRoot, nodes, extraRoots });
  }

  // 3. Process named variables in merged scope
  const matrices: MatrixViewModel[] = [];
  const arrays: ArrayViewModel[] = [];
  const graphs: GraphViewModel[] = [];
  const maps: MapViewModel[] = [];
  const sets: SetViewModel[] = [];
  const stacksQueues: StackQueueViewModel[] = [];
  const heaps: HeapViewModel[] = [];
  const intervals: IntervalViewModel[] = [];
  const scalars: ScalarVarModel[] = [];
  const claimedHeapIds = new Set<string>();

  const varEntries = Object.entries(merged);

  // Detect active row/col pointers for matrices
  const rowPtr = numericPointers.find((p) => /^(r|row|i)$/i.test(p.name));
  const colPtr = numericPointers.find((p) => /^(c|col|j)$/i.test(p.name));

  // Sliding window bracket pairs
  const findWindowPair = (len: number) => {
    const pairs: Array<[string, string]> = [
      ['left', 'right'],
      ['l', 'r'],
      ['start', 'end'],
      ['low', 'high'],
      ['lo', 'hi'],
      ['slow', 'fast'],
    ];
    for (const [a, b] of pairs) {
      const pa = numericPointers.find((p) => p.name === a);
      const pb = numericPointers.find((p) => p.name === b);
      if (pa && pb && pa.value >= 0 && pb.value >= 0 && pa.value <= len && pb.value <= len) {
        const s = Math.min(pa.value, pb.value);
        const e = Math.max(pa.value, pb.value);
        if (e < len) {
          return { start: s, end: e, label: `${a}..${b}` };
        }
      }
    }
    return undefined;
  };

  for (const [name, val] of varEntries) {
    const isChanged = step.changedVars.includes(name);

    if (val.kind === 'primitive') {
      // Render active string variables as indexed character tiles (down to 1-char slices during recursion)
      if (
        val.type === 'string' &&
        typeof val.value === 'string' &&
        val.value.length >= 1 &&
        val.value.length <= 40 &&
        /^(s|t|word|word1|word2|text|text1|text2|str|pattern|chars|part)$/i.test(name)
      ) {
        const chars = Array.from(val.value);
        const ptrs: ArrayPointer[] = numericPointers
          .filter((p) => p.value >= 0 && p.value <= chars.length)
          .map((p) => ({ name: p.name, index: p.value, color: p.color }));
        arrays.push({
          id: `str_${name}`,
          name,
          isString: true,
          items: chars.map((ch, idx) => ({
            index: idx,
            display: ch,
            numericValue: null,
            changed: isChanged,
          })),
          pointers: ptrs,
          windowRange: findWindowPair(chars.length),
          preferBars: false,
        });
      }

      scalars.push({
        name,
        type: val.type,
        display: formatSerializedValue(val, heap),
        changed: isChanged,
      });
      continue;
    }

    const obj = heap[val.id];
    if (!obj) continue;
    if (isLinkedListObj(obj) || isTreeObj(obj)) {
      claimedHeapIds.add(val.id);
      continue;
    }

    if (claimedHeapIds.has(val.id)) continue;

    if (obj.kind === 'heap') {
      claimedHeapIds.add(val.id);
      const prevH = prevHeap[val.id];
      const prevLen = prevH && (prevH.kind === 'heap' || prevH.kind === 'array') ? prevH.items.length : 0;
      heaps.push({
        id: val.id,
        name,
        comparator: obj.comparator ?? 'min',
        items: obj.items.map((it, idx) => {
          const prevIt = prevH && (prevH.kind === 'heap' || prevH.kind === 'array') ? prevH.items[idx] : undefined;
          const changed = !prevIt || idx >= prevLen || JSON.stringify(prevIt) !== JSON.stringify(it);
          const num = it.kind === 'primitive' && it.type === 'number' ? Number(it.value) : null;
          return {
            display: formatCompactItem(it, heap),
            numericValue: num,
            changed,
          };
        }),
      });
      continue;
    }

    if (obj.kind === 'array') {
      // Skip array of ListNodes / TreeNodes because LinkedListVisualizer / TreeVisualizer handles them cleanly
      if (
        obj.items.length > 0 &&
        obj.items.every((it) => it.kind === 'ref' && (isLinkedListObj(heap[it.id]) || isTreeObj(heap[it.id])))
      ) {
        claimedHeapIds.add(val.id);
        continue;
      }

      // Check Interval list ([start, end] tuples)
      const looksLikeIntervals =
        obj.items.length > 0 &&
        (visualHint?.primaryStructure === 'intervals' || /^(intervals|merged|meetings)$/i.test(name)) &&
        obj.items.every((it) => {
          if (it.kind !== 'ref') return false;
          const sub = heap[it.id];
          return (
            sub?.kind === 'array' &&
            sub.items.length === 2 &&
            sub.items[0]?.kind === 'primitive' &&
            sub.items[0].type === 'number' &&
            sub.items[1]?.kind === 'primitive' &&
            sub.items[1].type === 'number'
          );
        });

      if (looksLikeIntervals) {
        claimedHeapIds.add(val.id);
        const prevArr = prevHeap[val.id];
        const intervalItems: IntervalItemModel[] = [];
        let minVal = Infinity;
        let maxVal = -Infinity;
        obj.items.forEach((it, idx) => {
          if (it.kind !== 'ref') return;
          const sub = heap[it.id] as Extract<HeapObject, { kind: 'array' }>;
          const s = Number((sub.items[0] as Extract<SerializedValue, { kind: 'primitive' }>).value);
          const e = Number((sub.items[1] as Extract<SerializedValue, { kind: 'primitive' }>).value);
          minVal = Math.min(minVal, s);
          maxVal = Math.max(maxVal, e);
          const prevIt = prevArr?.kind === 'array' ? prevArr.items[idx] : undefined;
          const changed = !prevIt || JSON.stringify(prevIt) !== JSON.stringify(it);
          intervalItems.push({ index: idx, start: s, end: e, changed });
        });
        const activeIndices = numericPointers
          .filter((p) => p.value >= 0 && p.value < intervalItems.length)
          .map((p) => p.value);
        intervals.push({
          id: val.id,
          name,
          minVal: Number.isFinite(minVal) ? minVal : 0,
          maxVal: Number.isFinite(maxVal) ? maxVal : 1,
          items: intervalItems,
          activeIndices,
        });
        continue;
      }

      // Check Heap-named array (e.g. Python heapq list or JS array heap)
      const isHeapNamed =
        (/^(heap|minHeap|min_heap|maxHeap|max_heap|pq|minPq|maxPq)$/i.test(name) ||
          (visualHint?.primaryStructure === 'heap' && /heap|pq|rooms/i.test(name))) &&
        obj.className !== 'Queue' &&
        obj.className !== 'Deque';
      if (isHeapNamed) {
        claimedHeapIds.add(val.id);
        const prevH = prevHeap[val.id];
        const prevLen = prevH?.kind === 'array' ? prevH.items.length : 0;
        heaps.push({
          id: val.id,
          name,
          comparator: /max/i.test(name) ? 'max' : 'min',
          items: obj.items.map((it, idx) => {
            const prevIt = prevH?.kind === 'array' ? prevH.items[idx] : undefined;
            const changed = !prevIt || idx >= prevLen || JSON.stringify(prevIt) !== JSON.stringify(it);
            const num = it.kind === 'primitive' && it.type === 'number' ? Number(it.value) : null;
            return {
              display: formatCompactItem(it, heap),
              numericValue: num,
              changed,
            };
          }),
        });
        continue;
      }

      // Check adjacency list graph first
      if (isAdjacencyArray(name, obj, heap, visualHint)) {
        claimedHeapIds.add(val.id);
        const n = obj.items.length;
        const edges: GraphEdgeModel[] = [];
        for (let u = 0; u < n; u++) {
          const rowRef = obj.items[u];
          if (rowRef.kind === 'ref') {
            const rowObj = heap[rowRef.id];
            if (rowObj?.kind === 'array') {
              for (const vVal of rowObj.items) {
                if (vVal.kind === 'primitive' && typeof vVal.value === 'number') {
                  edges.push({ from: String(u), to: String(vVal.value), directed: true });
                }
              }
            }
          }
        }

        // Detect visited/state/queue/active nodes
        const visitedSet = new Set<number>();
        const stateMap = new Map<number, number>();
        const queuedSet = new Set<number>();

        const visitedObj = merged.visited?.kind === 'ref' ? heap[merged.visited.id] : undefined;
        if (visitedObj?.kind === 'set') {
          for (const item of visitedObj.items) {
            if (item.kind === 'primitive' && typeof item.value === 'number') visitedSet.add(item.value);
          }
        }
        const stateRef = merged.state ?? merged.color ?? merged.visited;
        const stateObj = stateRef?.kind === 'ref' ? heap[stateRef.id] : undefined;
        if (stateObj?.kind === 'array') {
          stateObj.items.forEach((it, idx) => {
            if (it.kind === 'primitive' && typeof it.value === 'number') stateMap.set(idx, it.value);
          });
        }
        const qRef = merged.queue ?? merged.q;
        const qObj = qRef?.kind === 'ref' ? heap[qRef.id] : undefined;
        if (qObj?.kind === 'array') {
          for (const it of qObj.items) {
            if (it.kind === 'primitive' && typeof it.value === 'number') queuedSet.add(it.value);
          }
        }

        const activeNodeIds = new Map<string, string[]>();
        for (const p of numericPointers) {
          if (/^(u|v|node|curr|cur|course|nei|next)$/i.test(p.name) && p.value >= 0 && p.value < n) {
            const key = String(p.value);
            activeNodeIds.set(key, [...(activeNodeIds.get(key) ?? []), p.name]);
          }
        }

        const gNodes: GraphNodeModel[] = [];
        for (let u = 0; u < n; u++) {
          const ptrs = activeNodeIds.get(String(u)) ?? [];
          let status: GraphNodeModel['status'] = 'default';
          if (ptrs.length > 0) status = 'active';
          else if (queuedSet.has(u)) status = 'queued';
          else if (visitedSet.has(u) || stateMap.get(u) === 2) status = 'visited';
          else if (stateMap.get(u) === 1) status = 'visiting';
          gNodes.push({
            id: String(u),
            label: String(u),
            status,
            pointers: ptrs,
          });
        }
        graphs.push({ name, nodes: gNodes, edges });
        continue;
      }

      // Check 2D Matrix
      if (isMatrixHeapObj(obj, heap)) {
        claimedHeapIds.add(val.id);
        const prevMatrixObj = prevMerged[name]?.kind === 'ref' ? prevHeap[prevMerged[name].id] : prevHeap[val.id];
        const rows = obj.items.map((rowRef, rIdx) => {
          const rowObj = (rowRef.kind === 'ref' ? heap[rowRef.id] : null) as Extract<HeapObject, { kind: 'array' }>;
          const prevRowRef = prevMatrixObj?.kind === 'array' ? prevMatrixObj.items[rIdx] : undefined;
          const prevRowObj = prevRowRef?.kind === 'ref' ? prevHeap[prevRowRef.id] : undefined;
          return rowObj.items.map((cell, cIdx) => {
            const prevCell = prevRowObj?.kind === 'array' ? prevRowObj.items[cIdx] : undefined;
            const changed = prevCell ? JSON.stringify(prevCell) !== JSON.stringify(cell) : false;
            return {
              r: rIdx,
              c: cIdx,
              display: formatCompactItem(cell, heap),
              numericValue: cell.kind === 'primitive' && cell.type === 'number' ? Number(cell.value) : null,
              changed,
            };
          });
        });

        const rowCount = rows.length;
        const colCount = rows[0]?.length ?? 0;
        matrices.push({
          id: val.id,
          name,
          rows,
          activeRow: rowPtr && rowPtr.value >= 0 && rowPtr.value < rowCount ? rowPtr.value : null,
          activeCol: colPtr && colPtr.value >= 0 && colPtr.value < colCount ? colPtr.value : null,
          rowLabel: rowPtr?.name,
          colLabel: colPtr?.name,
        });
        continue;
      }

      // Check Stack or Queue
      const isStack =
        /^(stack|stk|st|mono)$/i.test(name) || obj.className === 'Stack';
      const isQueue =
        /^(queue|q|deque|dq)$/i.test(name) ||
        obj.className === 'deque' ||
        obj.className === 'Queue' ||
        obj.className === 'Deque';
      if (isStack || isQueue) {
        claimedHeapIds.add(val.id);
        const prevArr = prevHeap[val.id];
        const prevLen = prevArr?.kind === 'array' ? prevArr.items.length : 0;
        stacksQueues.push({
          id: val.id,
          name,
          kind: isStack ? 'stack' : 'queue',
          items: obj.items.map((it, idx) => {
            const prevIt = prevArr?.kind === 'array' ? prevArr.items[idx] : undefined;
            const changed = !prevIt || idx >= prevLen || JSON.stringify(prevIt) !== JSON.stringify(it);
            return {
              display: formatCompactItem(it, heap),
              changed,
            };
          }),
        });
        continue;
      }

      // Regular 1D Array
      claimedHeapIds.add(val.id);
      const prevArr = prevHeap[val.id];
      const items = obj.items.map((it, idx) => {
        const prevIt = prevArr?.kind === 'array' ? prevArr.items[idx] : undefined;
        const changed = prevArr?.kind === 'array'
          ? !prevIt || JSON.stringify(prevIt) !== JSON.stringify(it)
          : false;
        const num = it.kind === 'primitive' && it.type === 'number' ? Number(it.value) : null;
        return {
          index: idx,
          display: formatCompactItem(it, heap),
          numericValue: num,
          changed,
        };
      });

      const ptrs: ArrayPointer[] = numericPointers
        .filter((p) => p.value >= 0 && p.value <= items.length)
        .map((p) => ({ name: p.name, index: p.value, color: p.color }));

      const allNumeric = items.length > 0 && items.every((it) => it.numericValue !== null);
      const preferBars =
        allNumeric &&
        (visualHint?.primaryStructure === 'bars' ||
          /^(height|heights|temperatures|temps|bars|arr)$/i.test(name));

      arrays.push({
        id: val.id,
        name,
        items,
        pointers: ptrs,
        windowRange: findWindowPair(items.length),
        preferBars,
      });
      continue;
    }

    if (obj.kind === 'map') {
      claimedHeapIds.add(val.id);
      // Check if map is actually an adjacency list graph (e.g. { 0: [1, 2] })
      const isGraphDict =
        visualHint?.primaryStructure === 'graph' &&
        /^(adj|graph|adjList|adj_list)$/i.test(name) &&
        obj.entries.every((e) => e.value.kind === 'ref' && heap[e.value.id]?.kind === 'array');

      if (isGraphDict) {
        const nodeIds = new Set<string>();
        const edges: GraphEdgeModel[] = [];
        for (const entry of obj.entries) {
          nodeIds.add(entry.key);
          const listObj = entry.value.kind === 'ref' ? heap[entry.value.id] : undefined;
          if (listObj?.kind === 'array') {
            for (const neighbor of listObj.items) {
              const target = formatCompactItem(neighbor, heap);
              nodeIds.add(target);
              edges.push({ from: entry.key, to: target, directed: true });
            }
          }
        }
        graphs.push({
          name,
          nodes: Array.from(nodeIds).map((id) => ({
            id,
            label: id,
            status: 'default',
            pointers: [],
          })),
          edges,
        });
        continue;
      }

      const prevMap = prevHeap[val.id];
      const prevEntryLookup = new Map<string, string>();
      if (prevMap?.kind === 'map') {
        for (const pe of prevMap.entries) {
          prevEntryLookup.set(pe.key, JSON.stringify(pe.value));
        }
      }
      maps.push({
        id: val.id,
        name,
        entries: obj.entries.map((e) => {
          const serStr = JSON.stringify(e.value);
          const changed = prevMap?.kind === 'map' ? prevEntryLookup.get(e.key) !== serStr : true;
          return {
            key: e.key,
            valueDisplay: formatCompactItem(e.value, heap),
            changed,
          };
        }),
      });
      continue;
    }

    if (obj.kind === 'set') {
      claimedHeapIds.add(val.id);
      const prevSet = prevHeap[val.id];
      const prevDisplays = new Set<string>();
      if (prevSet?.kind === 'set') {
        for (const pi of prevSet.items) prevDisplays.add(JSON.stringify(pi));
      }
      sets.push({
        id: val.id,
        name,
        items: obj.items.map((it) => ({
          display: formatCompactItem(it, heap),
          changed: prevSet?.kind === 'set' ? !prevDisplays.has(JSON.stringify(it)) : true,
        })),
      });
      continue;
    }

    // Other custom objects (e.g. GraphNode)
    if (obj.kind === 'object') {
      if ('neighbors' in obj.fields) {
        // GraphNode BFS
        claimedHeapIds.add(val.id);
        const visitedIds = new Set<string>();
        const q: string[] = [val.id];
        const gNodes: GraphNodeModel[] = [];
        const gEdges: GraphEdgeModel[] = [];
        while (q.length > 0 && visitedIds.size < 40) {
          const cur = q.shift()!;
          if (visitedIds.has(cur)) continue;
          visitedIds.add(cur);
          const nodeObj = heap[cur];
          if (!nodeObj || nodeObj.kind !== 'object') continue;
          const lbl = formatCompactItem(nodeObj.fields.val, heap);
          const ptrName = findVarForHeapId(topLocals, cur);
          gNodes.push({
            id: cur,
            label: lbl,
            status: ptrName ? 'active' : 'default',
            pointers: ptrName ? [ptrName] : [],
          });
          const neighRef = nodeObj.fields.neighbors;
          if (neighRef?.kind === 'ref' && heap[neighRef.id]?.kind === 'array') {
            for (const nItem of (heap[neighRef.id] as Extract<HeapObject, { kind: 'array' }>).items) {
              if (nItem.kind === 'ref' && heap[nItem.id]?.kind === 'object') {
                gEdges.push({ from: cur, to: nItem.id, directed: false });
                if (!visitedIds.has(nItem.id)) q.push(nItem.id);
              }
            }
          }
        }
        graphs.push({ name, nodes: gNodes, edges: gEdges });
      } else {
        scalars.push({
          name,
          type: obj.className,
          display: formatSerializedValue(val, heap),
          changed: isChanged,
        });
      }
    }
  }

  // Deduplicate primitive arrays that happen to share exact content? No, distinct heap IDs already handled!
  // Re-order arrays so primary arrays (`nums`, `height`, `dp`, `s`, etc.) appear before auxiliary arrays
  arrays.sort((a, b) => {
    const score = (n: string) =>
      /^(nums|height|heights|prices|s|t|dp|temperatures|arr)$/i.test(n) ? 0 : 1;
    return score(a.name) - score(b.name);
  });

  // Also ensure `isPrimitiveArray` warning doesn't leave unused warnings
  void isPrimitiveArray;

  return {
    arrays,
    matrices,
    linkedList,
    trees,
    graphs,
    maps,
    sets,
    stacksQueues,
    heaps,
    intervals,
    scalars,
    recursionTree: buildRecursionTree(allSteps, stepIndex),
  };
}
