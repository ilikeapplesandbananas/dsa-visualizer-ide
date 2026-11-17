import { describe, it, expect } from 'vitest';
import { runJavaScriptTrace, runJavaScriptTests } from '../engine/jsRunner';
import { executePython } from '../../server/pyRunner';
import type { ExecutionTrace, RunTestsResponse } from '../types/trace';

describe('JavaScript AST Instrumenter & Tracer', () => {
  it('traces TDZ variables, for-loops, and Map updates safely', () => {
    const code = `
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) return [seen.get(comp), i];
    seen.set(nums[i], i);
  }
  return [];
}`;
    const trace = runJavaScriptTrace({
      code,
      entryFunction: 'twoSum',
      params: [
        { name: 'nums', type: 'number[]' },
        { name: 'target', type: 'number' },
      ],
      returnType: 'number[]',
      testCase: { id: '1', label: 't', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
    });

    expect(trace.error).toBeUndefined();
    expect(trace.finalOutput).toEqual([0, 1]);
    expect(trace.steps.length).toBeGreaterThan(5);
    expect(trace.steps.some((s) => s.event === 'return')).toBe(true);
  });

  it('catches infinite loops cleanly without hanging', () => {
    const code = `
function bad(n) {
  let i = 0;
  while (true) {
    i++;
  }
  return i;
}`;
    const trace = runJavaScriptTrace({
      code,
      entryFunction: 'bad',
      params: [{ name: 'n', type: 'number' }],
      returnType: 'number',
      testCase: { id: '1', label: 't', args: [5], expected: 5 },
    });

    expect(trace.error).toBeDefined();
    expect(trace.error).toMatch(/limit|infinite loop/i);
  });

  it('handles class Solution and destructured loops', () => {
    const code = `
class Solution {
  sumPairs(pairs) {
    let total = 0;
    for (const [a, b] of pairs) {
      total += a + b;
    }
    return total;
  }
}`;
    const res = runJavaScriptTests({
      code,
      entryFunction: 'sumPairs',
      params: [{ name: 'pairs', type: 'number[][]' }],
      returnType: 'number',
      compareMode: 'exact',
      testCases: [{ id: '1', label: 't', args: [[[1, 2], [3, 4]]], expected: 10 }],
    });

    expect(res.allPassed).toBe(true);
    expect(res.passedCount).toBe(1);
  });

  it('catches syntax errors with line numbers', () => {
    const trace = runJavaScriptTrace({
      code: 'function foo( {\n  return 1;\n}',
      entryFunction: 'foo',
      params: [],
      returnType: 'number',
      testCase: { id: '1', label: 't', args: [], expected: 1 },
    });
    expect(trace.error).toMatch(/SyntaxError/);
    expect(trace.errorLine).toBeGreaterThanOrEqual(1);
  });
});

describe('Python sys.settrace Execution Engine', () => {
  it('traces Python recursion and catches infinite loops', async () => {
    const trace = (await executePython({
      mode: 'trace',
      code: `def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)`,
      entryFunction: 'fib',
      params: [{ name: 'n', type: 'number' }],
      returnType: 'number',
      testCases: [{ id: '1', label: 't', args: [4], expected: 3 }],
    })) as ExecutionTrace;

    expect(trace.error).toBeNull();
    expect(trace.finalOutput).toBe(3);
    expect(trace.steps.length).toBeGreaterThan(10);

    const infRes = (await executePython({
      mode: 'tests',
      code: `def spin(n):\n    while True:\n        n += 1`,
      entryFunction: 'spin',
      params: [{ name: 'n', type: 'number' }],
      returnType: 'number',
      compareMode: 'exact',
      testCases: [{ id: '1', label: 't', args: [1], expected: 1 }],
    })) as RunTestsResponse;

    expect(infRes.allPassed).toBe(false);
    expect(infRes.results[0].error).toMatch(/Time Limit|TraceLimitError/i);
  });
});

