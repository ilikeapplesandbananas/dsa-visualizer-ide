import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Terminal,
  AlertCircle,
} from 'lucide-react';
import type { Problem, TestCase } from '../types/problem';
import type { ExecutionTrace } from '../types/trace';
import { detectStructures, formatSerializedValue } from '../engine/structureDetector';
import { buildInputPreviewStructures } from '../engine/inputPreview';
import { narrateStep } from '../engine/stepNarrator';
import { ArrayVisualizer } from './visualizers/ArrayVisualizer';
import { MatrixVisualizer } from './visualizers/MatrixVisualizer';
import { TreeVisualizer } from './visualizers/TreeVisualizer';
import { GraphVisualizer } from './visualizers/GraphVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { HashMapSetVisualizer } from './visualizers/HashMapSetVisualizer';
import { StackQueueVisualizer } from './visualizers/StackQueueVisualizer';
import { HeapVisualizer } from './visualizers/HeapVisualizer';
import { IntervalVisualizer } from './visualizers/IntervalVisualizer';
import { CallStackList, RecursionTreeSvg } from './visualizers/CallStackPanel';

interface VisualizerPanelProps {
  problem: Problem;
  trace: ExecutionTrace | null;
  currentStepIndex: number;
  activeTestCase: TestCase | undefined;
  isPlaying: boolean;
  speedMs: number;
  isRunning: boolean;
  isExpanded: boolean;
  onStepChange: (idx: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (ms: number) => void;
  onToggleExpand: () => void;
}

const SPEED_OPTIONS: Array<{ label: string; ms: number }> = [
  { label: '0.5x', ms: 1300 },
  { label: '1x', ms: 650 },
  { label: '1.5x', ms: 420 },
  { label: '2x', ms: 260 },
  { label: '4x', ms: 120 },
];

export const VisualizerPanel: React.FC<VisualizerPanelProps> = ({
  problem,
  trace,
  currentStepIndex,
  activeTestCase,
  isPlaying,
  speedMs,
  isRunning,
  isExpanded,
  onStepChange,
  onTogglePlay,
  onSpeedChange,
  onToggleExpand,
}) => {
  const [activeTab, setActiveTab] = useState<'visualization' | 'debug'>('visualization');

  const steps = trace?.steps ?? [];
  const hasSteps = steps.length > 0;
  const safeIndex = hasSteps ? Math.min(Math.max(0, currentStepIndex), steps.length - 1) : 0;
  const currentStep = hasSteps ? steps[safeIndex] : null;
  const prevStep = hasSteps && safeIndex > 0 ? steps[safeIndex - 1] : null;

  const structures = useMemo(() => {
    if (currentStep) {
      return detectStructures(currentStep, prevStep, steps, safeIndex, problem.visualHint);
    }
    return buildInputPreviewStructures(problem, activeTestCase);
  }, [currentStep, prevStep, steps, safeIndex, problem, activeTestCase]);

  const narrative = useMemo(() => {
    return narrateStep(
      problem,
      currentStep,
      prevStep,
      structures,
      activeTestCase,
      trace?.finalOutput ?? null,
      !hasSteps
    );
  }, [problem, currentStep, prevStep, structures, activeTestCase, trace?.finalOutput, hasSteps]);

  // Surface a helpful scalar parameter hint on the first array card (e.g. "target = 9")
  const arrayRightMeta = useMemo(() => {
    if (structures.arrays.length === 0) return undefined;
    if (problem.id === 'two-sum' || problem.id === 'subarray-sum-equals-k') {
      const targetScalar = structures.scalars.find((s) => s.name === 'target' || s.name === 'k');
      if (targetScalar) return `${targetScalar.name} = ${targetScalar.display}`;
    }
    for (const p of problem.params) {
      if (p.type === 'number' || p.type === 'string') {
        const idx = problem.params.indexOf(p);
        const val = activeTestCase?.args[idx];
        if (val !== undefined) {
          return `${p.name} = ${typeof val === 'string' ? JSON.stringify(val) : String(val)}`;
        }
      }
    }
    return undefined;
  }, [structures.arrays.length, structures.scalars, problem.id, problem.params, activeTestCase]);

  const hasVisualStructures =
    structures.arrays.length > 0 ||
    structures.matrices.length > 0 ||
    structures.trees.length > 0 ||
    structures.graphs.length > 0 ||
    Boolean(structures.linkedList) ||
    structures.intervals.length > 0 ||
    structures.heaps.length > 0 ||
    structures.maps.length > 0 ||
    structures.sets.length > 0 ||
    structures.stacksQueues.length > 0;

  const stepNumber = hasSteps ? safeIndex + 1 : 0;
  const totalSteps = steps.length;
  const padStep = (n: number) => String(n).padStart(2, '0');
  const progressPct =
    totalSteps > 1 ? Math.round((safeIndex / (totalSteps - 1)) * 100) : hasSteps ? 100 : 0;

  const syncLabel = isRunning
    ? 'Running...'
    : trace?.error
      ? 'Error'
      : hasSteps
        ? isPlaying
          ? 'Playing'
          : 'Synced'
        : 'Preview';

  const syncDotClass = isRunning
    ? 'bg-amber-400 animate-pulse'
    : trace?.error
      ? 'bg-rose-400'
      : hasSteps
        ? 'bg-[#8ea3ff]'
        : 'bg-[#5d6478]';

  const stdoutLines = currentStep?.stdout ?? trace?.stdout ?? [];

  return (
    <section className="flex h-full flex-col bg-[#0d0f14] text-[#e6eaf3]">
      {/* Right Canvas Top Underline Tabs */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0e1016] px-5">
        <div className="flex h-full items-center gap-5">
          <button
            type="button"
            onClick={() => setActiveTab('visualization')}
            className={`relative flex h-full items-center text-xs font-medium transition cursor-pointer ${
              activeTab === 'visualization'
                ? 'text-[#edf1fa]'
                : 'text-[#6c7488] hover:text-[#b2bacb]'
            }`}
          >
            Visualization
            {activeTab === 'visualization' && (
              <span className="absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#8ea3ff]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('debug')}
            className={`relative flex h-full items-center gap-1.5 text-xs font-medium transition cursor-pointer ${
              activeTab === 'debug'
                ? 'text-[#edf1fa]'
                : 'text-[#6c7488] hover:text-[#b2bacb]'
            }`}
          >
            <span>Execution trace</span>
            {currentStep && currentStep.callStack.length > 0 && (
              <span className="rounded bg-[#1a1e2a] px-1.5 py-0.5 font-mono text-[10px] text-[#7c8499]">
                {currentStep.callStack.length}
              </span>
            )}
            {activeTab === 'debug' && (
              <span className="absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#8ea3ff]" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] text-[#788096]">
            <span className={`h-1.5 w-1.5 rounded-full ${syncDotClass}`} />
            {syncLabel}
          </span>
          <button
            type="button"
            onClick={onToggleExpand}
            className="rounded-md p-1 text-[#6c7488] transition hover:bg-[#191c27] hover:text-[#d5dce9] cursor-pointer"
            title={isExpanded ? 'Restore split layout' : 'Expand visual canvas'}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Scrollable Main Stage */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        {activeTab === 'visualization' ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {/* Hero Headline + Step Counter (matching Figma screenshot) */}
            <div className="flex items-start justify-between gap-4 pt-0.5">
              <div>
                <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-[#edf1fa]">
                  {narrative.headline}
                </h2>
                <p className="mt-1 text-xs text-[#737b8f]">
                  {narrative.subtitle}
                </p>
              </div>
              <div className="shrink-0 pt-1 font-mono text-xs text-[#6a7285]">
                {hasSteps ? `${padStep(stepNumber)} / ${padStep(totalSteps)}` : 'Preview'}
              </div>
            </div>

            {/* Trace Error Banner (if execution failed) */}
            {trace?.error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-950/25 px-4 py-3 text-xs text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <div className="min-w-0 font-mono leading-relaxed">
                  {trace.errorLine ? `Line ${trace.errorLine}: ` : ''}
                  {trace.error}
                </div>
              </div>
            )}

            {/* Truncation Notice */}
            {trace?.truncated && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-[11px] text-amber-200">
                Trace capped at {steps.length} steps to keep playback responsive.
              </div>
            )}

            {/* Live Data Structure Visualizers */}
            <IntervalVisualizer intervals={structures.intervals} />

            <ArrayVisualizer
              arrays={structures.arrays}
              rightMeta={arrayRightMeta}
              formula={structures.arrays.length > 0 ? narrative.formula : undefined}
            />

            <MatrixVisualizer matrices={structures.matrices} />

            {structures.trees.map((t, idx) => (
              <TreeVisualizer key={`tree-${idx}`} model={t} />
            ))}

            {structures.graphs.map((g, idx) => (
              <GraphVisualizer key={`graph-${idx}`} model={g} />
            ))}

            {structures.linkedList && <LinkedListVisualizer model={structures.linkedList} />}

            <HeapVisualizer heaps={structures.heaps} />

            <HashMapSetVisualizer
              maps={structures.maps}
              sets={structures.sets}
              mapAnnotation={narrative.mapAnnotation}
            />

            <StackQueueVisualizer items={structures.stacksQueues} />

            {/* Standalone Formula Card when primary problem has no Array card (e.g. Tree/Scalar DP/Graph) */}
            {structures.arrays.length === 0 && narrative.formula && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3">
                <span className="font-mono text-xs text-[#6d7487]">
                  {narrative.formula.label}
                </span>
                <span className="font-mono text-sm font-medium text-[#e5e9f2]">
                  {narrative.formula.expression}
                </span>
                {narrative.formula.badge && (
                  <span
                    className={`font-mono text-xs font-medium ${
                      narrative.formula.badgeOk === true
                        ? 'text-[#8ea3ff]'
                        : narrative.formula.badgeOk === false
                          ? 'text-amber-300'
                          : 'text-[#8c94a8]'
                    }`}
                  >
                    {narrative.formula.badge}
                  </span>
                )}
              </div>
            )}

            {/* Compact Live Variables strip only when there are no primary container visuals */}
            {!hasVisualStructures && structures.scalars.length > 0 && (
              <div className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#666e82]">
                    State Variables
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {structures.scalars.map((sv) => (
                    <div
                      key={sv.name}
                      className={`rounded-lg border px-3 py-2 font-mono text-xs transition ${
                        sv.changed
                          ? 'border-[#8ea3ff] bg-[#191f36] text-[#edf1ff]'
                          : 'border-[#252938] bg-[#151822] text-[#c7cfdf]'
                      }`}
                    >
                      <span className="text-[#727a90]">{sv.name} = </span>
                      <span className="font-semibold">{sv.display}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHY THIS WORKS Educational Card (signature insight surface) */}
            <div className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666e82]">
                WHY THIS WORKS
              </div>
              <div className="mt-1.5 text-[15px] font-medium text-[#edf1fa]">
                {narrative.whyTitle}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#7c8498]">
                {narrative.whyBody}
              </p>

              {narrative.resultPreview && (
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1d202c] pt-3">
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-xs text-[#6d7487]">
                      {narrative.resultPreview.label}
                    </span>
                    <span className="text-sm font-semibold text-[#eef2fb]">
                      {narrative.resultPreview.value}
                    </span>
                  </div>
                  {narrative.resultPreview.note && (
                    <span className="font-mono text-xs text-[#6b7285]">
                      {narrative.resultPreview.note}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Debug / Execution Trace Tab (Call Stack, Recursion Tree, Locals, Stdout) */
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {!currentStep ? (
              <div className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-8 text-center">
                <p className="text-xs font-medium text-[#cfd6e5]">
                  No execution trace captured yet.
                </p>
                <p className="mt-1 text-[11px] text-[#6d7487]">
                  Click <span className="font-semibold text-[#b8c6ff]">Visualize</span> in the top bar to step through frames, local variables, heap objects, and recursion trees.
                </p>
              </div>
            ) : (
              <>
                <CallStackList
                  frames={currentStep.callStack}
                  heap={currentStep.heap}
                  changedVars={currentStep.changedVars}
                />

                {structures.recursionTree &&
                  Object.keys(structures.recursionTree.nodes).length > 1 && (
                    <RecursionTreeSvg tree={structures.recursionTree} />
                  )}

                {/* Raw Return Value if on return event */}
                {currentStep.event === 'return' && currentStep.returnValue !== undefined && (
                  <div className="rounded-xl border border-[#222532] bg-[#11131a] px-4 py-3 font-mono text-xs">
                    <span className="text-[#72798d]">Return value: </span>
                    <span className="font-semibold text-emerald-300">
                      {formatSerializedValue(currentStep.returnValue, currentStep.heap)}
                    </span>
                  </div>
                )}

                {/* Stdout Console */}
                <div className="rounded-xl border border-[#222532] bg-[#11131a] p-3.5">
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#6d7487]">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Stdout ({stdoutLines.length})</span>
                  </div>
                  {stdoutLines.length === 0 ? (
                    <div className="font-mono text-[11px] italic text-[#5c6375]">
                      No print output on this step.
                    </div>
                  ) : (
                    <pre className="max-h-36 overflow-y-auto rounded-lg border border-[#1c1f2b] bg-[#0b0d12] p-2.5 font-mono text-[11px] leading-relaxed text-[#cfd6e5]">
                      {stdoutLines.join('\n')}
                    </pre>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Playback Scrubber Dock */}
      <div className="shrink-0 border-t border-[#1b1e29] bg-[#0e1016] px-6 py-3 select-none">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-[#747c90]">
          <span className="font-mono">
            {hasSteps ? `Step ${stepNumber} of ${totalSteps}` : 'Step 0 of 0'}
          </span>
          <label className="flex items-center gap-1 text-[#747c90]">
            <select
              value={speedMs}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="rounded bg-transparent px-1 py-0.5 font-mono text-[11px] text-[#8d95aa] outline-none hover:text-[#d8deec] cursor-pointer"
              aria-label="Playback speed"
            >
              {SPEED_OPTIONS.map((opt) => (
                <option key={opt.ms} value={opt.ms} className="bg-[#12141c] text-[#e5e9f2]">
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={safeIndex}
          disabled={!hasSteps}
          onChange={(e) => onStepChange(Number(e.target.value))}
          style={{ '--pct': `${progressPct}%` } as React.CSSProperties}
          className="trace-slider mb-3 w-full disabled:opacity-40"
          aria-label="Execution step scrubber"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasSteps || safeIndex <= 0}
              onClick={() => onStepChange(safeIndex - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#242836] bg-[#141720] text-[#9aa2b6] transition hover:border-[#343a4f] hover:text-[#edf1fa] disabled:opacity-35 cursor-pointer"
              title="Previous step (Left Arrow)"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              disabled={!hasSteps}
              onClick={onTogglePlay}
              className="flex h-7 items-center gap-1.5 rounded-md border border-[#282d3e] bg-[#161923] px-3 text-xs font-medium text-[#dce2f0] transition hover:border-[#394158] hover:bg-[#1b1f2c] disabled:opacity-40 cursor-pointer"
              title="Play / Pause (Space)"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              disabled={!hasSteps || safeIndex >= totalSteps - 1}
              onClick={() => onStepChange(safeIndex + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#242836] bg-[#141720] text-[#9aa2b6] transition hover:border-[#343a4f] hover:text-[#edf1fa] disabled:opacity-35 cursor-pointer"
              title="Next step (Right Arrow)"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="font-mono text-[11px] text-[#5c6376]">
            ← → to step
          </span>
        </div>
      </div>
    </section>
  );
};
