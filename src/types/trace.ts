export type PrimitiveType = 'number' | 'string' | 'boolean' | 'null' | 'undefined';

export type SerializedValue =
  | {
    kind: 'primitive';
    type: PrimitiveType;
    value: string | number | boolean | null;
  }
  | {
    kind: 'ref';
    id: string;
  };

export type HeapObject =
  | {
    id: string;
    kind: 'array';
    items: SerializedValue[];
    className?: string;
  }
  | {
    id: string;
    kind: 'map';
    entries: Array<{ key: string; value: SerializedValue }>;
    className?: string;
  }
  | {
    id: string;
    kind: 'set';
    items: SerializedValue[];
    className?: string;
  }
  | {
    id: string;
    kind: 'heap';
    items: SerializedValue[];
    comparator?: 'min' | 'max';
    className?: string;
  }
  | {
    id: string;
    kind: 'object';
    className: string;
    fields: Record<string, SerializedValue>;
  };

export interface StackFrame {
  id: string;
  callId: number;
  parentCallId: number | null;
  funcName: string;
  line: number;
  locals: Record<string, SerializedValue>;
}

export interface TraceStep {
  step: number;
  line: number;
  event: 'step' | 'call' | 'return' | 'exception';
  funcName: string;
  callId: number;
  parentCallId: number | null;
  callStack: StackFrame[];
  heap: Record<string, HeapObject>;
  stdout: string[];
  changedVars: string[];
  returnValue?: SerializedValue;
  error?: string;
}

export interface ExecutionTrace {
  steps: TraceStep[];
  finalOutput: unknown;
  stdout: string[];
  error?: string;
  errorLine?: number;
  truncated?: boolean;
  runtimeMs: number;
}

export interface TestCaseResult {
  testCaseId: string;
  label: string;
  passed: boolean;
  isHidden?: boolean;
  inputDisplay: string;
  expectedDisplay: string;
  actualDisplay: string;
  stdout: string[];
  runtimeMs: number;
  error?: string;
  errorLine?: number;
}

export interface RunTestsResponse {
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  results: TestCaseResult[];
  totalRuntimeMs: number;
  error?: string;
}

