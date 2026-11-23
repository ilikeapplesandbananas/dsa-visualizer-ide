import type { ArgType, CompareMode, ProblemParam } from '../types/problem';

export class ListNode {
  val: unknown;
  next: ListNode | null;
  constructor(val: unknown = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class TreeNode {
  val: unknown;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: unknown = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class GraphNode {
  val: unknown;
  neighbors: GraphNode[];
  constructor(val: unknown = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

export class AlgoHeap<T = unknown> {
  items: T[] = [];
  comparatorKind: 'min' | 'max';
  private cmp: (a: T, b: T) => number;
  constructor(cmp?: (a: T, b: T) => number, comparatorKind: 'min' | 'max' = 'min') {
    this.comparatorKind = comparatorKind;
    this.cmp =
      cmp ??
      ((a: unknown, b: unknown) => {
        const va = Array.isArray(a) ? Number(a[0]) : Number(a);
        const vb = Array.isArray(b) ? Number(b[0]) : Number(b);
        return va - vb;
      });
  }
  get size(): number {
    return this.items.length;
  }
  get length(): number {
    return this.items.length;
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  peek(): T | undefined {
    return this.items[0];
  }
  top(): T | undefined {
    return this.items[0];
  }
  push(val: T): void {
    this.items.push(val);
    let i = this.items.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.items[i], this.items[p]) < 0) {
        [this.items[i], this.items[p]] = [this.items[p], this.items[i]];
        i = p;
      } else break;
    }
  }
  enqueue(val: T): void {
    this.push(val);
  }
  offer(val: T): boolean {
    this.push(val);
    return true;
  }
  add(val: T): boolean {
    this.push(val);
    return true;
  }
  pop(): T | undefined {
    if (this.items.length === 0) return undefined;
    const top = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      let i = 0;
      const n = this.items.length;
      while (true) {
        let best = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < n && this.cmp(this.items[l], this.items[best]) < 0) best = l;
        if (r < n && this.cmp(this.items[r], this.items[best]) < 0) best = r;
        if (best === i) break;
        [this.items[i], this.items[best]] = [this.items[best], this.items[i]];
        i = best;
      }
    }
    return top;
  }
  dequeue(): T | undefined {
    return this.pop();
  }
  poll(): T | undefined {
    return this.pop();
  }
  toArray(): T[] {
    return [...this.items];
  }
}

export function findTreeNode(root: TreeNode | null, targetVal: unknown): TreeNode | null {
  if (!root) return null;
  if (root.val === targetVal) return root;
  return findTreeNode(root.left, targetVal) ?? findTreeNode(root.right, targetVal);
}

export function buildLinkedList(values: unknown[], cyclePos = -1): ListNode | null {
  if (!Array.isArray(values) || values.length === 0) return null;
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  if (typeof cyclePos === 'number' && cyclePos >= 0 && cyclePos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[cyclePos];
  }
  return nodes[0];
}

export function linkedListToArray(head: ListNode | null, limit = 2000): unknown[] {
  const result: unknown[] = [];
  const seen = new Set<ListNode>();
  let curr = head;
  while (curr && result.length < limit) {
    if (seen.has(curr)) break;
    seen.add(curr);
    result.push(curr.val);
    curr = curr.next;
  }
  return result;
}

export function buildBinaryTree(values: unknown[]): TreeNode | null {
  if (!Array.isArray(values) || values.length === 0 || values[0] === null || values[0] === undefined) {
    return null;
  }
  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let idx = 1;
  while (queue.length > 0 && idx < values.length) {
    const node = queue.shift()!;
    if (idx < values.length) {
      const leftVal = values[idx++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }
    if (idx < values.length) {
      const rightVal = values[idx++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }
  return root;
}

export function binaryTreeToArray(root: TreeNode | null): unknown[] {
  if (!root) return [];
  const res: unknown[] = [];
  const queue: Array<TreeNode | null> = [root];
  const seen = new Set<TreeNode>();
  while (queue.length > 0 && res.length < 2000) {
    const node = queue.shift()!;
    if (node === null) {
      res.push(null);
    } else {
      if (seen.has(node)) {
        res.push(node.val);
        continue;
      }
      seen.add(node);
      res.push(node.val);
      queue.push(node.left ?? null);
      queue.push(node.right ?? null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}

export function deepCloneJson<T>(value: T): T {
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value));
}

export function convertArg(val: unknown, argType: ArgType): unknown {
  if (argType === 'linkedList') {
    return buildLinkedList(Array.isArray(val) ? val : []);
  }
  if (argType === 'linkedListArray') {
    return Array.isArray(val)
      ? val.map((arr) => buildLinkedList(Array.isArray(arr) ? arr : []))
      : [];
  }
  if (argType === 'linkedListCycle') {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const obj = val as { values?: unknown[]; pos?: number };
      return buildLinkedList(obj.values ?? [], obj.pos ?? -1);
    }
    return buildLinkedList(Array.isArray(val) ? val : []);
  }
  if (argType === 'binaryTree') {
    return buildBinaryTree(Array.isArray(val) ? val : []);
  }
  if (typeof val === 'object' && val !== null) {
    return deepCloneJson(val);
  }
  return val;
}

export function convertArgs(rawArgs: unknown[], params: ProblemParam[]): unknown[] {
  const out: unknown[] = [];
  let firstTreeRoot: TreeNode | null = null;
  for (let i = 0; i < rawArgs.length; i++) {
    const type = params[i]?.type ?? 'any';
    if (type === 'treeNodeRef') {
      const raw = rawArgs[i];
      if (firstTreeRoot) {
        out.push(findTreeNode(firstTreeRoot, raw));
      } else {
        out.push(new TreeNode(raw));
      }
      continue;
    }
    const converted = convertArg(rawArgs[i], type);
    if (type === 'binaryTree' && !firstTreeRoot) {
      firstTreeRoot = (converted as TreeNode | null) ?? null;
    }
    out.push(converted);
  }
  return out;
}

export function toJsonOutput(val: unknown, returnType: ArgType | 'void'): unknown {
  if (returnType === 'string' && Array.isArray(val)) {
    let out = '';
    for (const ch of val) {
      if (ch === '\0' || ch === 0 || ch === null || ch === undefined) break;
      out += String(ch);
    }
    return out;
  }
  if (returnType === 'linkedList' || returnType === 'linkedListCycle') {
    return linkedListToArray((val as ListNode | null) ?? null);
  }
  if (returnType === 'binaryTree') {
    return binaryTreeToArray((val as TreeNode | null) ?? null);
  }
  if (returnType === 'treeNodeVal' || returnType === 'treeNodeRef') {
    if (val && typeof val === 'object' && 'val' in (val as Record<string, unknown>)) {
      return sanitizeJsonValue((val as TreeNode).val);
    }
    return sanitizeJsonValue(val);
  }
  return sanitizeJsonValue(val);
}

export function sanitizeJsonValue(val: unknown, seen = new Set<object>()): unknown {
  if (val === null || val === undefined) return val ?? null;
  if (typeof val === 'boolean' || typeof val === 'string') return val;
  if (typeof val === 'number') {
    if (Number.isNaN(val)) return 'NaN';
    if (!Number.isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';
    return val;
  }
  if (val instanceof ListNode) return linkedListToArray(val);
  if (val instanceof TreeNode) return binaryTreeToArray(val);
  if (Array.isArray(val)) {
    if (seen.has(val)) return '[Circular]';
    seen.add(val);
    return val.map((item) => sanitizeJsonValue(item, seen));
  }
  if (val instanceof Set) {
    return Array.from(val)
      .map((item) => sanitizeJsonValue(item, seen))
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }
  if (val instanceof Map) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of val.entries()) {
      out[String(k)] = sanitizeJsonValue(v, seen);
    }
    return out;
  }
  if (typeof val === 'object') {
    if (seen.has(val)) return { _circular: true };
    seen.add(val);
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val)) {
      out[k] = sanitizeJsonValue(v, seen);
    }
    return out;
  }
  return String(val);
}

function stableStringify(val: unknown): string {
  if (val === null || typeof val !== 'object') return JSON.stringify(val);
  if (Array.isArray(val)) return '[' + val.map(stableStringify).join(',') + ']';
  const keys = Object.keys(val as Record<string, unknown>).sort();
  return (
    '{' +
    keys
      .map((k) => JSON.stringify(k) + ':' + stableStringify((val as Record<string, unknown>)[k]))
      .join(',') +
    '}'
  );
}

export function compareOutputs(actual: unknown, expected: unknown, mode: CompareMode): boolean {
  if (mode === 'playground') return true;
  if (mode === 'float') {
    const a = Number(actual);
    const b = Number(expected);
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-5;
  }
  if (mode === 'unorderedArray') {
    if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
    if (actual.length !== expected.length) return false;
    const sa = actual.map(stableStringify).sort();
    const se = expected.map(stableStringify).sort();
    return sa.every((v, idx) => v === se[idx]);
  }
  if (mode === 'unorderedOuterArray') {
    if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
    if (actual.length !== expected.length) return false;
    const sa = actual.map(stableStringify).sort();
    const se = expected.map(stableStringify).sort();
    return sa.every((v, idx) => v === se[idx]);
  }
  if (mode === 'unorderedNestedArray') {
    if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
    if (actual.length !== expected.length) return false;
    const norm = (arr: unknown[]) =>
      arr
        .map((sub) =>
          Array.isArray(sub) ? '[' + sub.map(stableStringify).sort().join(',') + ']' : stableStringify(sub)
        )
        .sort();
    const sa = norm(actual);
    const se = norm(expected);
    return sa.every((v, idx) => v === se[idx]);
  }
  return stableStringify(actual) === stableStringify(expected);
}

export function formatDisplay(val: unknown): string {
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

