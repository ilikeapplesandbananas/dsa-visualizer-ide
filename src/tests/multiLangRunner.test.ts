import { describe, it, expect } from 'vitest';
import { PROBLEMS } from '../data/problems';
import { executeMultiLanguage, type CompiledLang } from '../../server/treeSitterRunner';
import type { ExecutionTrace, RunTestsResponse } from '../types/trace';

const COMPILED_LANGS: CompiledLang[] = ['java', 'cpp', 'c', 'csharp'];

describe('Multi-Language Compiled Runner Verification (Java, C++, C, C#)', () => {
  for (const problem of PROBLEMS) {
    for (const lang of COMPILED_LANGS) {
      it(`[${lang.toUpperCase()}] ${problem.number}. ${problem.title} passes all tests and produces trace`, async () => {
        const testRes = (await executeMultiLanguage({
          language: lang,
          mode: 'tests',
          code: problem.optimalCode[lang],
          entryFunction: problem.entryFunction,
          params: problem.params,
          returnType: problem.returnType,
          compareMode: problem.compareMode,
          isPlayground: problem.isPlayground,
          testCases: problem.testCases,
        })) as RunTestsResponse;

        expect(testRes.error).toBeUndefined();
        expect(testRes.allPassed).toBe(true);
        expect(testRes.passedCount).toBe(problem.testCases.length);

        const trace = (await executeMultiLanguage({
          language: lang,
          mode: 'trace',
          code: problem.optimalCode[lang],
          entryFunction: problem.entryFunction,
          params: problem.params,
          returnType: problem.returnType,
          compareMode: problem.compareMode,
          isPlayground: problem.isPlayground,
          testCases: [problem.testCases[0]],
        })) as ExecutionTrace;

        expect(trace.error).toBeUndefined();
        expect(trace.steps.length).toBeGreaterThan(0);
      });
    }
  }
});
