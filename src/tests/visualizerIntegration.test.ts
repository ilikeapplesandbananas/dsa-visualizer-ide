import { describe, it, expect } from 'vitest';
import { getProblemById, PROBLEMS } from '../data/problems';
import { runJavaScriptTrace } from '../engine/jsRunner';
import { detectStructures } from '../engine/structureDetector';
import { buildInputPreviewStructures } from '../engine/inputPreview';
import { executePython } from '../../server/pyRunner';
import type { ExecutionTrace } from '../types/trace';

describe('Visualizer Structure Detection & Input Previews', () => {
  it('generates non-empty input previews for all LeetCode problems', () => {
    for (const p of PROBLEMS.filter((x) => !x.isPlayground)) {
      const preview = buildInputPreviewStructures(p, p.testCases[0]);
      const total =
        preview.arrays.length +
        preview.matrices.length +
        (preview.linkedList ? 1 : 0) +
        preview.trees.length +
        preview.graphs.length +
        preview.intervals.length +
        preview.heaps.length +
        preview.maps.length +
        preview.sets.length +
        preview.stacksQueues.length +
        preview.scalars.length;
      expect(total, `Preview empty for ${p.id}`).toBeGreaterThan(0);
    }
  });

  it('detects array pointers and growing HashMap on Two Sum trace', () => {
    const p = getProblemById('two-sum')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const midStepIdx = Math.floor(trace.steps.length / 2);
    const detected = detectStructures(
      trace.steps[midStepIdx],
      trace.steps[midStepIdx - 1],
      trace.steps,
      midStepIdx,
      p.visualHint
    );

    expect(detected.arrays.length).toBeGreaterThanOrEqual(1);
    expect(detected.arrays[0].name).toBe('nums');
    expect(detected.arrays[0].pointers.some((ptr) => ptr.name === 'i')).toBe(true);
    expect(detected.maps.some((m) => m.name === 'seen')).toBe(true);
  });

  it('detects sliding window range and Set on Longest Substring', () => {
    const p = getProblemById('longest-substring-no-repeat')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const stepWithWindow = trace.steps.find((s, idx) => {
      const d = detectStructures(s, idx > 0 ? trace.steps[idx - 1] : null, trace.steps, idx, p.visualHint);
      return d.arrays.some((a) => a.isString && a.windowRange !== undefined) && d.sets.length > 0;
    });
    expect(stepWithWindow).toBeDefined();
  });

  it('detects Linked List cycle back-edge and slow/fast pointers on #141', () => {
    const p = getProblemById('linked-list-cycle')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const lastIdx = trace.steps.length - 1;
    const d = detectStructures(trace.steps[lastIdx], trace.steps[lastIdx - 1], trace.steps, lastIdx, p.visualHint);
    expect(d.linkedList).not.toBeNull();
    expect(d.linkedList!.nodes.length).toBe(4);
    expect(d.linkedList!.cycleEdges.length).toBeGreaterThanOrEqual(1);
  });

  it('detects Binary Tree SVG and Recursion Tree on #226 Invert Binary Tree (Python)', async () => {
    const p = getProblemById('invert-binary-tree')!;
    const trace = (await executePython({
      mode: 'trace',
      code: p.optimalCode.python,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCases: [p.testCases[0]],
    })) as ExecutionTrace;

    const lastIdx = trace.steps.length - 1;
    const d = detectStructures(trace.steps[lastIdx], trace.steps[lastIdx - 1], trace.steps, lastIdx, p.visualHint);
    expect(d.trees.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(d.trees[0].nodes).length).toBe(7);
    expect(d.recursionTree).not.toBeNull();
    expect(Object.keys(d.recursionTree!.nodes).length).toBeGreaterThan(3);
  });

  it('detects 2D Matrix and (r, c) crosshairs on #200 Number of Islands', () => {
    const p = getProblemById('number-of-islands')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const activeCellStep = trace.steps.find((s, idx) => {
      const d = detectStructures(s, idx > 0 ? trace.steps[idx - 1] : null, trace.steps, idx, p.visualHint);
      return d.matrices.some((m) => m.activeRow !== null && m.activeCol !== null);
    });
    expect(activeCellStep).toBeDefined();
  });

  it('detects Directed Graph adj + queue on #207 Course Schedule', () => {
    const p = getProblemById('course-schedule')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const graphStep = trace.steps.find((s, idx) => {
      const d = detectStructures(s, idx > 0 ? trace.steps[idx - 1] : null, trace.steps, idx, p.visualHint);
      return d.graphs.length > 0 && d.graphs[0].edges.length === 4 && d.stacksQueues.length > 0;
    });
    expect(graphStep).toBeDefined();
  });

  it('detects Elevation Bars on #11 Container With Most Water', () => {
    const p = getProblemById('container-with-most-water')!;
    const trace = runJavaScriptTrace({
      code: p.optimalCode.javascript,
      entryFunction: p.entryFunction,
      params: p.params,
      returnType: p.returnType,
      testCase: p.testCases[0],
    });

    const stepIdx = Math.min(4, trace.steps.length - 1);
    const d = detectStructures(trace.steps[stepIdx], trace.steps[stepIdx - 1], trace.steps, stepIdx, p.visualHint);
    expect(d.arrays[0].preferBars).toBe(true);
    expect(d.arrays[0].pointers.some((x) => x.name === 'left')).toBe(true);
    expect(d.arrays[0].pointers.some((x) => x.name === 'right')).toBe(true);
  });
});

