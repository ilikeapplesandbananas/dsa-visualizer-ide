import { describe, it, expect } from 'vitest';
import { PROBLEMS } from '../data/problems';
import { runJavaScriptTrace, runJavaScriptTests } from '../engine/jsRunner';
import { executePython } from '../../server/pyRunner';
import type { ExecutionTrace, RunTestsResponse } from '../types/trace';

describe('All Curated Problems & Playgrounds Verification', () => {
  for (const problem of PROBLEMS) {
    it(`[JS] ${problem.number}. ${problem.title} passes all tests and produces trace`, () => {
      const testRes = runJavaScriptTests({
        code: problem.optimalCode.javascript,
        entryFunction: problem.entryFunction,
        params: problem.params,
        returnType: problem.returnType,
        compareMode: problem.compareMode,
        isPlayground: problem.isPlayground,
        testCases: problem.testCases,
      });

      expect(testRes.error).toBeUndefined();
      expect(testRes.allPassed).toBe(true);
      expect(testRes.passedCount).toBe(problem.testCases.length);

      const trace = runJavaScriptTrace({
        code: problem.optimalCode.javascript,
        entryFunction: problem.entryFunction,
        params: problem.params,
        returnType: problem.returnType,
        isPlayground: problem.isPlayground,
        testCase: problem.testCases[0],
      });

      expect(trace.error).toBeUndefined();
      expect(trace.steps.length).toBeGreaterThan(0);
    });

    it(`[Python] ${problem.number}. ${problem.title} passes all tests and produces trace`, async () => {
      const testRes = (await executePython({
        mode: 'tests',
        code: problem.optimalCode.python,
        entryFunction: problem.entryFunction,
        params: problem.params,
        returnType: problem.returnType,
        compareMode: problem.compareMode,
        isPlayground: problem.isPlayground,
        testCases: problem.testCases,
      })) as RunTestsResponse;

      expect(testRes.error).toBeFalsy();
      expect(testRes.allPassed).toBe(true);
      expect(testRes.passedCount).toBe(problem.testCases.length);

      const trace = (await executePython({
        mode: 'trace',
        code: problem.optimalCode.python,
        entryFunction: problem.entryFunction,
        params: problem.params,
        returnType: problem.returnType,
        isPlayground: problem.isPlayground,
        testCases: [problem.testCases[0]],
      })) as ExecutionTrace;

      expect(trace.error).toBeNull();
      expect(trace.steps.length).toBeGreaterThan(0);
    });
  }
});

