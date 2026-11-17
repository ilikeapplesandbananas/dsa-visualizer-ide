import {
  ListNode,
  TreeNode,
  GraphNode,
  AlgoHeap,
  toJsonOutput,
} from '../src/engine/dataConverters';
import type { HeapObject, SerializedValue, StackFrame } from '../src/types/trace';

export const SENTINEL_END = Symbol('STL_END');

export class TraceLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TraceLimitError';
  }
}

export class RefBox<T = unknown> {
  $: T;
  constructor(val: T) {
    this.$ = val;
  }
}

export class AlgoPair extends Array<unknown> {
  constructor(a: unknown = 0, b: unknown = 0) {
    super(2);
    this[0] = a;
    this[1] = b;
  }
  get first(): unknown {
    return this[0];
  }
  set first(v: unknown) {
    this[0] = v;
  }
  get second(): unknown {
    return this[1];
  }
  set second(v: unknown) {
    this[1] = v;
  }
  get Key(): unknown {
    return this[0];
  }
  get Value(): unknown {
    return this[1];
  }
  getKey(): unknown {
    return this[0];
  }
  getValue(): unknown {
    return this[1];
  }
}

function canonicalKey(k: unknown): unknown {
  if (k === null || k === undefined) return String(k);
  if (typeof k === 'number' || typeof k === 'string' || typeof k === 'boolean') return k;
  if (Array.isArray(k)) return JSON.stringify(k);
  if (typeof k === 'object') {
    const rec = k as Record<string, unknown>;
    if ('val' in rec) return `node#${String(rec.val)}`;
    try {
      return JSON.stringify(k);
    } catch {
      return String(k);
    }
  }
  return String(k);
}

export class AlgoMap implements Iterable<[unknown, unknown]> {
  private map = new Map<unknown, unknown>();
  private keyRepr = new Map<unknown, unknown>();
  className: string;
  private defaultFactory?: () => unknown;

  constructor(className = 'HashMap', defaultFactory?: () => unknown) {
    this.className = className;
    this.defaultFactory = defaultFactory;
  }

  private k(key: unknown): unknown {
    return canonicalKey(key);
  }

  put(key: unknown, val: unknown): unknown {
    const ck = this.k(key);
    const prev = this.map.has(ck) ? this.map.get(ck) : null;
    this.map.set(ck, val);
    this.keyRepr.set(ck, key);
    return prev ?? null;
  }

  Add(key: unknown, val: unknown): void {
    this.put(key, val);
  }

  set(key: unknown, val: unknown): this {
    this.put(key, val);
    return this;
  }

  get(key: unknown): unknown {
    const ck = this.k(key);
    if (!this.map.has(ck)) return null;
    return this.map.get(ck);
  }

  getOrCreate(key: unknown): unknown {
    const ck = this.k(key);
    if (!this.map.has(ck)) {
      const def = this.defaultFactory ? this.defaultFactory() : 0;
      this.map.set(ck, def);
      this.keyRepr.set(ck, key);
    }
    return this.map.get(ck);
  }

  getOrDefault(key: unknown, def: unknown): unknown {
    const ck = this.k(key);
    return this.map.has(ck) ? this.map.get(ck) : def;
  }

  GetValueOrDefault(key: unknown, def: unknown): unknown {
    return this.getOrDefault(key, def);
  }

  containsKey(key: unknown): boolean {
    return this.map.has(this.k(key));
  }

  ContainsKey(key: unknown): boolean {
    return this.containsKey(key);
  }

  containsValue(val: unknown): boolean {
    for (const v of this.map.values()) {
      if (v === val) return true;
    }
    return false;
  }

  has(key: unknown): boolean {
    return this.containsKey(key);
  }

  count(key: unknown): number {
    return this.containsKey(key) ? 1 : 0;
  }

  find(key: unknown): AlgoPair | symbol {
    const ck = this.k(key);
    if (!this.map.has(ck)) return SENTINEL_END;
    return new AlgoPair(this.keyRepr.get(ck), this.map.get(ck));
  }

  end(): symbol {
    return SENTINEL_END;
  }

  computeIfAbsent(key: unknown, fn: (k: unknown) => unknown): unknown {
    const ck = this.k(key);
    if (!this.map.has(ck)) {
      const val = fn(key);
      this.map.set(ck, val);
      this.keyRepr.set(ck, key);
    }
    return this.map.get(ck);
  }

  putIfAbsent(key: unknown, val: unknown): unknown {
    const ck = this.k(key);
    if (!this.map.has(ck)) {
      this.map.set(ck, val);
      this.keyRepr.set(ck, key);
      return null;
    }
    return this.map.get(ck);
  }

  remove(key: unknown): unknown {
    const ck = this.k(key);
    const prev = this.map.get(ck) ?? null;
    this.map.delete(ck);
    this.keyRepr.delete(ck);
    return prev;
  }

  Remove(key: unknown): boolean {
    const ck = this.k(key);
    this.keyRepr.delete(ck);
    return this.map.delete(ck);
  }

  erase(key: unknown): number {
    return this.Remove(key) ? 1 : 0;
  }

  clear(): void {
    this.map.clear();
    this.keyRepr.clear();
  }

  Clear(): void {
    this.clear();
  }

  size(): number {
    return this.map.size;
  }

  get Count(): number {
    return this.map.size;
  }

  isEmpty(): boolean {
    return this.map.size === 0;
  }

  empty(): boolean {
    return this.map.size === 0;
  }

  keySet(): unknown[] {
    return Array.from(this.keyRepr.values());
  }

  get Keys(): unknown[] {
    return this.keySet();
  }

  values(): unknown[] {
    return Array.from(this.map.values());
  }

  get Values(): unknown[] {
    return this.values();
  }

  entrySet(): AlgoPair[] {
    const out: AlgoPair[] = [];
    for (const [ck, val] of this.map.entries()) {
      out.push(new AlgoPair(this.keyRepr.get(ck), val));
    }
    return out;
  }

  entriesList(): Array<{ key: string; value: unknown }> {
    const out: Array<{ key: string; value: unknown }> = [];
    for (const [ck, val] of this.map.entries()) {
      const origKey = this.keyRepr.get(ck);
      out.push({ key: typeof origKey === 'string' ? origKey : String(origKey), value: val });
    }
    return out;
  }

  [Symbol.iterator](): Iterator<[unknown, unknown]> {
    const pairs = Array.from(this.map.entries()).map(
      ([ck, v]): [unknown, unknown] => [this.keyRepr.get(ck), v]
    );
    return pairs[Symbol.iterator]();
  }
}

export class AlgoSet implements Iterable<unknown> {
  private set = new Map<unknown, unknown>();
  className: string;

  constructor(className = 'HashSet', initial?: Iterable<unknown>) {
    this.className = className;
    if (initial) {
      for (const x of initial) this.add(x);
    }
  }

  add(val: unknown): boolean {
    const ck = canonicalKey(val);
    if (this.set.has(ck)) return false;
    this.set.set(ck, val);
    return true;
  }

  Add(val: unknown): boolean {
    return this.add(val);
  }

  insert(val: unknown): AlgoPair {
    const added = this.add(val);
    return new AlgoPair(val, added);
  }

  contains(val: unknown): boolean {
    return this.set.has(canonicalKey(val));
  }

  Contains(val: unknown): boolean {
    return this.contains(val);
  }

  has(val: unknown): boolean {
    return this.contains(val);
  }

  count(val: unknown): number {
    return this.contains(val) ? 1 : 0;
  }

  find(val: unknown): unknown {
    const ck = canonicalKey(val);
    return this.set.has(ck) ? this.set.get(ck) : SENTINEL_END;
  }

  end(): symbol {
    return SENTINEL_END;
  }

  remove(val: unknown): boolean {
    return this.set.delete(canonicalKey(val));
  }

  Remove(val: unknown): boolean {
    return this.remove(val);
  }

  erase(val: unknown): number {
    return this.remove(val) ? 1 : 0;
  }

  clear(): void {
    this.set.clear();
  }

  size(): number {
    return this.set.size;
  }

  get Count(): number {
    return this.set.size;
  }

  isEmpty(): boolean {
    return this.set.size === 0;
  }

  empty(): boolean {
    return this.set.size === 0;
  }

  toArray(): unknown[] {
    return Array.from(this.set.values());
  }

  [Symbol.iterator](): Iterator<unknown> {
    return this.set.values();
  }
}

export type ContainerDialect = 'java' | 'cpp' | 'c' | 'csharp';

export class AlgoDeque implements Iterable<unknown> {
  items: unknown[] = [];
  role: 'queue' | 'stack' | 'deque';
  dialect: ContainerDialect;
  className: string;

  constructor(role: 'queue' | 'stack' | 'deque', dialect: ContainerDialect, initial?: Iterable<unknown>) {
    this.role = role;
    this.dialect = dialect;
    this.className = role === 'stack' ? 'Stack' : role === 'queue' ? 'Queue' : 'Deque';
    if (initial) {
      for (const x of initial) this.items.push(x);
    }
  }

  // Unified insertion
  push(val: unknown): unknown {
    if (this.dialect !== 'cpp' && this.className !== 'Queue') {
      this.role = 'stack';
      this.className = 'Stack';
    }
    this.items.push(val);
    return val;
  }
  Push(val: unknown): void {
    this.role = 'stack';
    this.items.push(val);
  }
  push_back(val: unknown): void {
    this.items.push(val);
  }
  push_front(val: unknown): void {
    this.items.unshift(val);
  }
  emplace(val: unknown): void {
    this.items.push(val);
  }
  offer(val: unknown): boolean {
    this.items.push(val);
    return true;
  }
  add(val: unknown): boolean {
    this.items.push(val);
    return true;
  }
  addLast(val: unknown): void {
    this.items.push(val);
  }
  offerLast(val: unknown): boolean {
    this.items.push(val);
    return true;
  }
  addFirst(val: unknown): void {
    this.items.unshift(val);
  }
  offerFirst(val: unknown): boolean {
    this.items.unshift(val);
    return true;
  }
  enqueue(val: unknown): void {
    this.items.push(val);
  }
  Enqueue(val: unknown): void {
    this.items.push(val);
  }

  // Removal
  pop(): unknown {
    if (this.dialect === 'cpp') {
      if (this.role === 'stack') {
        this.items.pop();
      } else {
        this.items.shift();
      }
      return undefined;
    }
    return this.items.pop() ?? null;
  }
  Pop(): unknown {
    return this.items.pop() ?? null;
  }
  pop_back(): void {
    this.items.pop();
  }
  pop_front(): void {
    this.items.shift();
  }
  poll(): unknown {
    return this.items.length > 0 ? this.items.shift() : null;
  }
  pollFirst(): unknown {
    return this.poll();
  }
  removeFirst(): unknown {
    return this.poll();
  }
  pollLast(): unknown {
    return this.items.length > 0 ? this.items.pop() : null;
  }
  removeLast(): unknown {
    return this.pollLast();
  }
  Dequeue(): unknown {
    return this.poll();
  }

  // Peeking
  peek(): unknown {
    if (this.role === 'stack') return this.items[this.items.length - 1] ?? null;
    return this.items[0] ?? null;
  }
  Peek(): unknown {
    return this.peek();
  }
  peekFirst(): unknown {
    return this.items[0] ?? null;
  }
  peekLast(): unknown {
    return this.items[this.items.length - 1] ?? null;
  }
  front(): unknown {
    return this.items[0] ?? null;
  }
  back(): unknown {
    return this.items[this.items.length - 1] ?? null;
  }
  top(): unknown {
    return this.items[this.items.length - 1] ?? null;
  }

  size(): number {
    return this.items.length;
  }
  get length(): number {
    return this.items.length;
  }
  get Count(): number {
    return this.items.length;
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  empty(): boolean {
    return this.items.length === 0;
  }
  clear(): void {
    this.items.length = 0;
  }

  [Symbol.iterator](): Iterator<unknown> {
    return this.items[Symbol.iterator]();
  }
}

export function defaultCompareValues(a: unknown, b: unknown): number {
  if (Array.isArray(a) && Array.isArray(b)) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      const d = defaultCompareValues(a[i], b[i]);
      if (d !== 0) return d;
    }
    return a.length - b.length;
  }
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0;
  const na = Number(a);
  const nb = Number(b);
  if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
  return String(a).localeCompare(String(b));
}

export class TrackedHeap extends AlgoHeap<unknown> {
  private prioList: unknown[] = [];
  private hasPairedPriority = false;

  constructor(cmp?: (a: unknown, b: unknown) => number, kind: 'min' | 'max' = 'min') {
    super(
      cmp ??
        ((a: unknown, b: unknown) => {
          const d = defaultCompareValues(a, b);
          return kind === 'max' ? -d : d;
        }),
      kind
    );
  }

  Enqueue(elem: unknown, prio?: unknown): void {
    if (prio !== undefined) {
      this.hasPairedPriority = true;
      this.push(new AlgoPair(prio, elem));
      this.prioList.push(prio);
      return;
    }
    this.push(elem);
  }

  Dequeue(): unknown {
    const top = this.pop();
    if (this.hasPairedPriority && top instanceof AlgoPair) {
      return top[1];
    }
    return top ?? null;
  }

  TryDequeue(setElem: (v: unknown) => void, setPrio?: (p: unknown) => void): boolean {
    if (this.items.length === 0) return false;
    const rawTop = this.pop();
    if (rawTop instanceof AlgoPair && this.hasPairedPriority) {
      setElem(rawTop[1]);
      if (setPrio) setPrio(rawTop[0]);
    } else {
      setElem(rawTop);
      if (setPrio) setPrio(rawTop);
    }
    return true;
  }

  Peek(): unknown {
    const t = this.peek();
    if (this.hasPairedPriority && t instanceof AlgoPair) return t[1];
    return t ?? null;
  }

  get Count(): number {
    return this.items.length;
  }

  empty(): boolean {
    return this.items.length === 0;
  }
}

export class AlgoStringBuilder {
  private buf = '';
  constructor(init?: string) {
    if (init !== undefined) this.buf = String(init);
  }
  append(val: unknown): this {
    this.buf += String(val);
    return this;
  }
  Append(val: unknown): this {
    return this.append(val);
  }
  deleteCharAt(idx: number): this {
    this.buf = this.buf.slice(0, idx) + this.buf.slice(idx + 1);
    return this;
  }
  reverse(): this {
    this.buf = this.buf.split('').reverse().join('');
    return this;
  }
  length(): number {
    return this.buf.length;
  }
  get Length(): number {
    return this.buf.length;
  }
  toString(): string {
    return this.buf;
  }
  ToString(): string {
    return this.buf;
  }
}

export function __idiv(a: unknown, b: unknown): number {
  const na = Number(a);
  const nb = Number(b);
  return Math.trunc(na / nb);
}

export function __sub(a: unknown, b: unknown): number {
  const na = typeof a === 'string' && a.length === 1 ? a.charCodeAt(0) : Number(a);
  const nb = typeof b === 'string' && b.length === 1 ? b.charCodeAt(0) : Number(b);
  return na - nb;
}

export function __add(a: unknown, b: unknown): unknown {
  if (typeof a === 'string' && typeof b === 'number' && a.length === 1) {
    return String.fromCharCode(a.charCodeAt(0) + b);
  }
  return (a as number) + (b as number);
}

export function __toInt(v: unknown): number {
  if (typeof v === 'string') return v.length > 0 ? v.charCodeAt(0) : 0;
  if (typeof v === 'boolean') return v ? 1 : 0;
  const n = Math.trunc(Number(v));
  return Number.isFinite(n) ? n : 0;
}

export function __deref(x: unknown): unknown {
  if (x instanceof RefBox) return x.$;
  if (Array.isArray(x)) return x[0];
  return x;
}

export function __ptrUpd(target: unknown, delta: number, isPostfix = false): number {
  if (target instanceof RefBox) {
    const cur = Number(target.$ ?? 0);
    target.$ = cur + delta;
    return isPostfix ? cur : cur + delta;
  }
  if (Array.isArray(target)) {
    const cur = Number(target[0] ?? 0);
    target[0] = cur + delta;
    return isPostfix ? cur : cur + delta;
  }
  return 0;
}

export function __idx(target: unknown, key: unknown): unknown {
  if (target instanceof AlgoMap) {
    return target.getOrCreate(key);
  }
  if (Array.isArray(target)) {
    return target[key as number];
  }
  if (typeof target === 'string') {
    return target[key as number];
  }
  if (target && typeof target === 'object') {
    return (target as Record<string, unknown>)[String(key)];
  }
  return undefined;
}

export function __idxSet(target: unknown, key: unknown, val: unknown): unknown {
  if (target instanceof AlgoMap) {
    target.put(key, val);
    return val;
  }
  if (target && typeof target === 'object') {
    (target as Record<string | number, unknown>)[key as string | number] = val;
    return val;
  }
  return val;
}

export function __idxUpd(target: unknown, key: unknown, delta: number, isPostfix = false): unknown {
  if (target instanceof AlgoMap) {
    const cur = Number(target.getOrDefault(key, 0));
    target.put(key, cur + delta);
    return isPostfix ? cur : cur + delta;
  }
  const rec = target as Record<string | number, number>;
  const cur = Number(rec[key as string | number] ?? 0);
  rec[key as string | number] = cur + delta;
  return isPostfix ? cur : cur + delta;
}

export function __len(x: unknown): number {
  if (x === null || x === undefined) return 0;
  if (typeof x === 'string' || Array.isArray(x)) return x.length;
  if (typeof (x as { size?: () => number }).size === 'function') {
    return (x as { size: () => number }).size();
  }
  if (typeof (x as { size?: unknown }).size === 'number') {
    return (x as { size: number }).size;
  }
  if (typeof (x as { length?: unknown }).length === 'number') {
    return (x as { length: number }).length;
  }
  if (typeof (x as { Count?: unknown }).Count === 'number') {
    return (x as { Count: number }).Count;
  }
  return 0;
}

export function __empty(x: unknown): boolean {
  return __len(x) === 0;
}

export function __vec(size: unknown, initOrFactory: unknown = 0): unknown[] {
  if (Array.isArray(size)) {
    return size.map((v) => (Array.isArray(v) ? [...v] : v));
  }
  const n = Math.max(0, Math.trunc(Number(size) || 0));
  if (typeof initOrFactory === 'function') {
    return Array.from({ length: n }, (_, i) => (initOrFactory as (i: number) => unknown)(i));
  }
  return Array.from({ length: n }, () =>
    Array.isArray(initOrFactory) ? [...initOrFactory] : initOrFactory
  );
}

export function __sort(
  arr: unknown,
  cmp?: (a: unknown, b: unknown) => number | boolean,
  isCppBoolCmp = false
): void {
  if (!Array.isArray(arr)) return;
  if (!cmp) {
    arr.sort(defaultCompareValues);
    return;
  }
  if (isCppBoolCmp) {
    arr.sort((a, b) => (cmp(a, b) ? -1 : cmp(b, a) ? 1 : 0));
    return;
  }
  arr.sort((a, b) => {
    const r = cmp(a, b);
    if (typeof r === 'boolean') return r ? -1 : 1;
    return Number(r);
  });
}

export function __reverse(arr: unknown): void {
  if (Array.isArray(arr)) arr.reverse();
}

export function __swap(arr: unknown, i: number, j: number): void {
  if (Array.isArray(arr)) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

export function __cppCopy(x: unknown): unknown {
  return Array.isArray(x) ? [...x] : x;
}

export function __toArray(x: unknown): unknown[] {
  if (Array.isArray(x)) return [...x];
  if (x instanceof AlgoSet) return x.toArray();
  if (x instanceof AlgoDeque) return [...x.items];
  if (x instanceof TrackedHeap) return [...x.items];
  if (typeof x === 'string') return x.split('');
  return [];
}

export function buildLanguageGlobals(
  dialect: ContainerDialect,
  printLine: (msg: string) => void
): Record<string, unknown> {
  const fmtOut = (v: unknown): string => {
    if (typeof v === 'string') return v;
    try {
      return JSON.stringify(toJsonOutput(v, 'any'));
    } catch {
      return String(v);
    }
  };

  const ArraysHelper = {
    sort: (arr: unknown, cmp?: (a: unknown, b: unknown) => number) => __sort(arr, cmp, false),
    fill: (arr: unknown[], val: unknown) => {
      if (Array.isArray(arr)) arr.fill(val);
    },
    copyOf: (arr: unknown[], len: number) => (Array.isArray(arr) ? arr.slice(0, len) : []),
    copyOfRange: (arr: unknown[], from: number, to: number) =>
      Array.isArray(arr) ? arr.slice(from, to) : [],
    asList: (...args: unknown[]) => (args.length === 1 && Array.isArray(args[0]) ? [...args[0]] : args),
    equals: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
  };

  const CollectionsHelper = {
    sort: (arr: unknown, cmp?: (a: unknown, b: unknown) => number) => __sort(arr, cmp, false),
    reverse: (arr: unknown) => __reverse(arr),
    swap: (arr: unknown, i: number, j: number) => __swap(arr, i, j),
    min: (arr: unknown[]) => Math.min(...arr.map(Number)),
    max: (arr: unknown[]) => Math.max(...arr.map(Number)),
  };

  const IntegerHelper = {
    MAX_VALUE: 2147483647,
    MIN_VALUE: -2147483648,
    compare: (a: number, b: number) => (a < b ? -1 : a > b ? 1 : 0),
    parseInt: (s: string, radix = 10) => parseInt(String(s), radix),
    toString: (n: number) => String(n),
    MaxValue: 2147483647,
    MinValue: -2147483648,
  };

  const MathExt = Object.create(Math, {
    Max: { value: (...xs: number[]) => Math.max(...xs) },
    Min: { value: (...xs: number[]) => Math.min(...xs) },
    Abs: { value: (x: number) => Math.abs(x) },
    Floor: { value: (x: number) => Math.floor(x) },
    Ceiling: { value: (x: number) => Math.ceil(x) },
    Pow: { value: (a: number, b: number) => Math.pow(a, b) },
    Sqrt: { value: (x: number) => Math.sqrt(x) },
  });

  const ArrayCs = {
    Sort: (arr: unknown, cmp?: (a: unknown, b: unknown) => number) => __sort(arr, cmp, false),
    Fill: (arr: unknown[], val: unknown) => {
      if (Array.isArray(arr)) arr.fill(val);
    },
    Reverse: (arr: unknown) => __reverse(arr),
    Copy: (src: unknown[], dst: unknown[], len: number) => {
      for (let i = 0; i < len && i < src.length; i++) dst[i] = src[i];
    },
  };

  const CharacterHelper = {
    isLetterOrDigit: (ch: string) => /^[a-z0-9]$/i.test(String(ch)),
    isDigit: (ch: string) => /^[0-9]$/.test(String(ch)),
    isLetter: (ch: string) => /^[a-z]$/i.test(String(ch)),
    toLowerCase: (ch: string) => String(ch).toLowerCase(),
    toUpperCase: (ch: string) => String(ch).toUpperCase(),
  };

  const fmtPrintf = (fmt: string, ...args: unknown[]): string => {
    let idx = 0;
    return String(fmt).replace(/%[-+0# ]*(\d+)?(\.\d+)?[hlLz]*([diuoxXfFeEgGcsp%])/g, (m, _w, _p, spec) => {
      if (spec === '%') return '%';
      const val = args[idx++];
      return val === undefined ? m : String(val);
    });
  };

  return {
    ListNode,
    TreeNode,
    GraphNode,
    AlgoMap,
    AlgoSet,
    AlgoDeque,
    AlgoPair,
    TrackedHeap,
    AlgoStringBuilder,
    RefBox,
    SENTINEL_END,
    __idiv,
    __sub,
    __add,
    __toInt,
    __deref,
    __ptrUpd,
    __idx,
    __idxSet,
    __idxUpd,
    __len,
    __empty,
    __vec,
    __sort,
    __reverse,
    __swap,
    __cppCopy,
    __toArray,
    __pair: (a: unknown, b: unknown) => new AlgoPair(a, b),
    make_pair: (a: unknown, b: unknown) => new AlgoPair(a, b),
    __newMap: (name = 'HashMap', defFn?: () => unknown) => new AlgoMap(name, defFn),
    __newSet: (name = 'HashSet', init?: Iterable<unknown>) => new AlgoSet(name, init),
    __newDeque: (role: 'queue' | 'stack' | 'deque', init?: Iterable<unknown>) =>
      new AlgoDeque(role, dialect, init),
    __newHeap: (kind: 'min' | 'max' = 'min', cmp?: (a: unknown, b: unknown) => number) =>
      new TrackedHeap(cmp, kind),
    Arrays: ArraysHelper,
    Collections: CollectionsHelper,
    Integer: IntegerHelper,
    Long: IntegerHelper,
    Character: CharacterHelper,
    Math: MathExt,
    ArrayCs,
    StringBuilder: AlgoStringBuilder,
    System: {
      out: {
        println: (...args: unknown[]) => printLine(args.map(fmtOut).join(' ')),
        print: (...args: unknown[]) => printLine(args.map(fmtOut).join(' ')),
      },
    },
    Console: {
      WriteLine: (...args: unknown[]) => printLine(args.map(fmtOut).join(' ')),
      Write: (...args: unknown[]) => printLine(args.map(fmtOut).join(' ')),
    },
    __cout: (...parts: unknown[]) => {
      const text = parts
        .filter((p) => p !== '__ENDL__')
        .map(fmtOut)
        .join('');
      if (text.length > 0 || parts.includes('__ENDL__')) printLine(text);
    },
    endl: '__ENDL__',
    printf: (fmt: string, ...args: unknown[]) => printLine(fmtPrintf(fmt, ...args).replace(/\n$/, '')),
    INT_MAX: 2147483647,
    INT_MIN: -2147483648,
    LLONG_MAX: 9007199254740991,
    LLONG_MIN: -9007199254740991,
    DBL_MAX: Number.MAX_VALUE,
    min: (...xs: number[]) => Math.min(...xs),
    max: (...xs: number[]) => Math.max(...xs),
    abs: (x: number) => Math.abs(x),
    pow: (a: number, b: number) => Math.pow(a, b),
    sqrt: (x: number) => Math.sqrt(x),
    floor: (x: number) => Math.floor(x),
    ceil: (x: number) => Math.ceil(x),
    swap: (a: unknown, b: unknown) => [b, a],
    to_string: (v: unknown) => String(v),
    stoi: (s: string) => parseInt(String(s), 10),
    malloc: (bytes: number) => new Array(Math.max(1, Math.min(2000, Math.ceil((bytes || 4) / 4)))).fill(0),
    calloc: (count: number) => new Array(Math.max(0, Math.min(2000, count || 0))).fill(0),
    memset: (arr: unknown[], val: unknown, _bytes?: number) => {
      if (Array.isArray(arr)) arr.fill(val);
    },
    memcpy: (dst: unknown[], src: unknown[], len?: number) => {
      if (Array.isArray(dst) && Array.isArray(src)) {
        const count = Math.min(src.length, len ?? src.length);
        for (let i = 0; i < count; i++) dst[i] = src[i];
      }
    },
    strlen: (s: unknown) => (typeof s === 'string' || Array.isArray(s) ? s.length : 0),
    strcmp: (a: unknown, b: unknown) => (String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0),
    fmax: (a: number, b: number) => Math.max(a, b),
    fmin: (a: number, b: number) => Math.min(a, b),
    qsort: (arr: unknown[], n: number, _sz: number, cmp: (a: unknown, b: unknown) => number) => {
      if (!Array.isArray(arr)) return;
      const head = arr.slice(0, n).sort((a, b) => cmp(a, b));
      for (let i = 0; i < head.length; i++) arr[i] = head[i];
    },
  };
}

export interface ActiveRuntimeFrame {
  id: string;
  callId: number;
  parentCallId: number | null;
  funcName: string;
  line: number;
  snapFn: () => Record<string, unknown>;
  returned: boolean;
}

export class LangHeapSerializer {
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

  serializeFrames(frames: ActiveRuntimeFrame[]): {
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
      if (typeof val === 'symbol') return { kind: 'primitive', type: 'string', value: val.toString() };
      if (typeof val === 'function') return { kind: 'primitive', type: 'string', value: `[fn ${val.name || 'anon'}]` };

      if (val instanceof RefBox) {
        return ser(val.$, depth);
      }
      if (val instanceof AlgoStringBuilder) {
        return { kind: 'primitive', type: 'string', value: val.toString() };
      }

      if (depth > 40 || Object.keys(heap).length > 400) {
        return { kind: 'primitive', type: 'string', value: '[MaxDepth]' };
      }

      if (typeof val === 'object') {
        const obj = val as object;
        const hid = this.getId(obj);
        if (heap[hid]) return { kind: 'ref', id: hid };

        if (obj instanceof AlgoMap) {
          const entry: HeapObject = {
            id: hid,
            kind: 'map',
            entries: [],
            className: obj.className,
          };
          heap[hid] = entry;
          for (const { key, value } of obj.entriesList().slice(0, 200)) {
            entry.entries.push({ key, value: ser(value, depth + 1) });
          }
          return { kind: 'ref', id: hid };
        }

        if (obj instanceof AlgoSet) {
          const entry: HeapObject = {
            id: hid,
            kind: 'set',
            items: [],
            className: obj.className,
          };
          heap[hid] = entry;
          entry.items = obj.toArray().slice(0, 200).map((it) => ser(it, depth + 1));
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
          entry.items = obj.items.slice(0, 200).map((it) => ser(it, depth + 1));
          return { kind: 'ref', id: hid };
        }

        if (obj instanceof AlgoDeque) {
          const entry: HeapObject = {
            id: hid,
            kind: 'array',
            items: [],
            className: obj.className,
          };
          heap[hid] = entry;
          entry.items = obj.items.slice(0, 250).map((it) => ser(it, depth + 1));
          return { kind: 'ref', id: hid };
        }

        if (Array.isArray(obj)) {
          const entry: HeapObject = { id: hid, kind: 'array', items: [] };
          heap[hid] = entry;
          entry.items = obj.slice(0, 250).map((it) => ser(it, depth + 1));
          return { kind: 'ref', id: hid };
        }

        const ctorName = obj.constructor?.name || 'Object';
        const record = obj as Record<string, unknown>;
        const fields: Record<string, SerializedValue> = {};
        const entry: HeapObject = {
          id: hid,
          kind: 'object',
          className: ctorName === 'Object' ? 'Node' : ctorName,
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
        if (typeof v === 'function' || k.startsWith('__')) continue;
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
