import { describe, it, expect } from 'vitest';
import { getProblemById, PROBLEMS } from '../data/problems';
import { runJavaScriptTrace } from '../engine/jsRunner';
import { detectStructures } from '../engine/structureDetector';
import { narrateStep } from '../engine/stepNarrator';

describe('Pedagogical Step Narrator Verification', () => {
  it('generates rich WHY THIS WORKS and formula callouts for Two Sum match step', () => {
    const problem = getProblemById('two-sum')!;
    const trace = runJavaScriptTrace({
      code: problem.optimalCode.javascript,
      entryFunction: problem.entryFunction,
      params: problem.params,
      returnType: problem.returnType,
      testCase: problem.testCases[0],
    });

    const returnIdx = trace.steps.findIndex((s) => s.event === 'return');
    expect(returnIdx).toBeGreaterThan(0);

    const step = trace.steps[returnIdx];
    const prev = trace.steps[returnIdx - 1];
    const detected = detectStructures(step, prev, trace.steps, returnIdx, problem.visualHint);
    const narrative = narrateStep(problem, step, prev, detected, problem.testCases[0], trace.finalOutput);

    expect(narrative.headline).toContain('Match found');
    expect(narrative.formula?.expression).toContain('9 - 7 = 2');
    expect(narrative.formula?.badgeOk).toBe(true);
    expect(narrative.whyTitle).toContain('7 needs 2 to reach 9');
    expect(narrative.resultPreview?.value).toBe('[0, 1]');
  });

  it('produces non-empty narratives, heaps, matrices, and intervals on all new interview problems', () => {
    const ids = [
      'rotting-oranges',
      'shortest-path-binary-matrix',
      'right-side-view',
      'path-sum-ii',
      'lowest-common-ancestor',
      'top-k-frequent',
      'k-closest-points',
      'meeting-rooms-ii',
      'merge-k-sorted-lists',
      'max-sum-distinct-subarrays',
      'three-sum',
      'merge-intervals',
      'subarray-sum-equals-k',
      'house-robber',
      'longest-substring-k-repeating',
      'partition-labels',
      'remove-duplicate-letters',
    ];

    for (const id of ids) {
      const problem = getProblemById(id)!;
      expect(problem).toBeDefined();
      const trace = runJavaScriptTrace({
        code: problem.optimalCode.javascript,
        entryFunction: problem.entryFunction,
        params: problem.params,
        returnType: problem.returnType,
        testCase: problem.testCases[0],
      });
      expect(trace.error).toBeUndefined();
      expect(trace.steps.length).toBeGreaterThan(1);

      const midIdx = Math.floor(trace.steps.length / 2);
      const step = trace.steps[midIdx];
      const prev = trace.steps[midIdx - 1];
      const detected = detectStructures(step, prev, trace.steps, midIdx, problem.visualHint);
      const narrative = narrateStep(problem, step, prev, detected, problem.testCases[0], trace.finalOutput);

      expect(narrative.headline.length).toBeGreaterThan(0);
      expect(narrative.whyTitle.length).toBeGreaterThan(0);
      expect(narrative.whyBody.length).toBeGreaterThan(0);
    }

    expect(PROBLEMS.length).toBe(41);
  });
});
