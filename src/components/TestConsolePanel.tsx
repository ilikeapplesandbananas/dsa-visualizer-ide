import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Plus,
  RotateCcw,
  Eye,
  Send,
  Play,
  Terminal,
} from 'lucide-react';
import type { Problem, TestCase } from '../types/problem';
import type { RunTestsResponse } from '../types/trace';

interface TestConsolePanelProps {
  problem: Problem;
  sampleTestCases: TestCase[];
  activeTestCaseId: string;
  customArgs: unknown[];
  testResults: RunTestsResponse | null;
  liveStdout: string[];
  activeTab: 'testcase' | 'output';
  isRunningTests: boolean;
  onTabChange: (tab: 'testcase' | 'output') => void;
  onSelectTestCase: (id: string) => void;
  onUpdateCustomArgs: (args: unknown[]) => void;
  onVisualizeCase: (tc: TestCase) => void;
  onRunTests: () => void;
  onSubmitAll: () => void;
}

function formatParamValue(val: unknown, type: string): string {
  if (type === 'string') {
    return typeof val === 'string' ? val : JSON.stringify(val ?? '');
  }
  return JSON.stringify(val ?? null);
}

function parseParamInput(raw: string, type: string): { ok: true; value: unknown } | { ok: false; error: string } {
  if (type === 'string') {
    const trimmed = raw;
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      try {
        return { ok: true, value: JSON.parse(trimmed) };
      } catch {
        return { ok: true, value: trimmed };
      }
    }
    return { ok: true, value: trimmed };
  }
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Invalid JSON' };
  }
}

export const TestConsolePanel: React.FC<TestConsolePanelProps> = ({
  problem,
  sampleTestCases,
  activeTestCaseId,
  customArgs,
  testResults,
  liveStdout,
  activeTab,
  isRunningTests,
  onTabChange,
  onSelectTestCase,
  onUpdateCustomArgs,
  onVisualizeCase,
  onRunTests,
  onSubmitAll,
}) => {
  const [draftInputs, setDraftInputs] = useState<string[]>([]);
  const [inputErrors, setInputErrors] = useState<Array<string | null>>([]);
  const [showCustomTab, setShowCustomTab] = useState(false);

  const selectedCase =
    activeTestCaseId === 'custom'
      ? { id: 'custom', label: 'Custom', args: customArgs, expected: null }
      : sampleTestCases.find((t) => t.id === activeTestCaseId) ?? sampleTestCases[0];

  useEffect(() => {
    const args = selectedCase?.args ?? [];
    setDraftInputs(
      problem.params.map((p, idx) => formatParamValue(args[idx], p.type))
    );
    setInputErrors(problem.params.map(() => null));
  }, [problem.id, problem.params, activeTestCaseId, selectedCase?.args]);

  useEffect(() => {
    if (activeTestCaseId === 'custom') {
      setShowCustomTab(true);
    }
  }, [activeTestCaseId]);

  const handleFieldChange = (idx: number, raw: string) => {
    const nextDrafts = [...draftInputs];
    nextDrafts[idx] = raw;
    setDraftInputs(nextDrafts);

    const parsed = parseParamInput(raw, problem.params[idx]?.type ?? 'any');
    const nextErrors = [...inputErrors];
    if (!parsed.ok) {
      nextErrors[idx] = parsed.error;
      setInputErrors(nextErrors);
      return;
    }

    nextErrors[idx] = null;
    setInputErrors(nextErrors);

    const baseArgs =
      activeTestCaseId === 'custom'
        ? [...customArgs]
        : [...(selectedCase?.args ?? [])];
    baseArgs[idx] = parsed.value;
    setShowCustomTab(true);
    if (activeTestCaseId !== 'custom') {
      onSelectTestCase('custom');
    }
    onUpdateCustomArgs(baseArgs);
  };

  const handleResetCase = () => {
    const first = sampleTestCases[0];
    if (!first) return;
    setShowCustomTab(false);
    onSelectTestCase(first.id);
    onUpdateCustomArgs(first.args);
  };

  const handleAddCase = () => {
    const seed = selectedCase?.args ?? sampleTestCases[0]?.args ?? [];
    setShowCustomTab(true);
    onUpdateCustomArgs(JSON.parse(JSON.stringify(seed)));
    onSelectTestCase('custom');
    onTabChange('testcase');
  };

  const hasErrors = inputErrors.some(Boolean);

  return (
    <div className="flex h-full flex-col border-t border-[#1b1e29] bg-[#0e1016]">
      {/* Drawer Header: Test case | Output + Add case */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-[#191c26] px-5">
        <div className="flex h-full items-center gap-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => onTabChange('testcase')}
            className={`h-full border-b-2 px-0.5 transition cursor-pointer ${
              activeTab === 'testcase'
                ? 'border-[#8ea3ff] text-[#eef1f8]'
                : 'border-transparent text-[#6f778a] hover:text-[#cfd6e6]'
            }`}
          >
            Test case
          </button>

          <button
            type="button"
            onClick={() => onTabChange('output')}
            className={`flex h-full items-center gap-1.5 border-b-2 px-0.5 transition cursor-pointer ${
              activeTab === 'output'
                ? 'border-[#8ea3ff] text-[#eef1f8]'
                : 'border-transparent text-[#6f778a] hover:text-[#cfd6e6]'
            }`}
          >
            <span>Output</span>
            {testResults && (
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  testResults.allPassed
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-rose-500/15 text-rose-300'
                }`}
              >
                {testResults.passedCount}/{testResults.totalCount}
              </span>
            )}
          </button>
        </div>

        {!problem.isPlayground && (
          <button
            type="button"
            onClick={handleAddCase}
            className="flex items-center gap-1 text-[11px] font-medium text-[#7b8396] transition hover:text-[#dce2ee] cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add case</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
        {activeTab === 'testcase' ? (
          problem.isPlayground ? (
            <div className="flex h-full flex-col justify-center gap-1 text-xs text-[#737b8e]">
              <p>Playground script runs top-level code directly.</p>
              <p className="text-[11px] text-[#596073]">
                Switch to Output to view captured console / print statements.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Case Selector Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  {sampleTestCases.slice(0, 4).map((tc, idx) => {
                    const active = activeTestCaseId === tc.id;
                    return (
                      <button
                        key={tc.id}
                        type="button"
                        onClick={() => onSelectTestCase(tc.id)}
                        className={`text-xs font-medium transition cursor-pointer ${
                          active
                            ? 'text-[#eef1f8]'
                            : 'text-[#666e82] hover:text-[#b4bccb]'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    );
                  })}
                  {showCustomTab && (
                    <button
                      type="button"
                      onClick={() => onSelectTestCase('custom')}
                      className={`text-xs font-medium transition cursor-pointer ${
                        activeTestCaseId === 'custom'
                          ? 'text-[#9db2ff]'
                          : 'text-[#666e82] hover:text-[#b4bccb]'
                      }`}
                    >
                      Custom
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetCase}
                  className="flex items-center gap-1 text-[11px] text-[#6d7588] transition hover:text-[#cfd6e6] cursor-pointer"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Clean Parameter Inputs Side by Side */}
              <div
                className={`grid gap-3 ${
                  problem.params.length >= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {problem.params.map((param, idx) => (
                  <div key={param.name} className="space-y-1">
                    <label className="block font-mono text-[11px] text-[#6f778a]">
                      {param.name}
                    </label>
                    <input
                      type="text"
                      value={draftInputs[idx] ?? ''}
                      onChange={(e) => handleFieldChange(idx, e.target.value)}
                      spellCheck={false}
                      className={`w-full rounded-lg border bg-[#13151e] px-3 py-2 font-mono text-xs text-[#e2e7f2] focus:outline-none transition ${
                        inputErrors[idx]
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-[#222534] focus:border-[#7c90f6]'
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Validation Status */}
              <div className="flex items-center justify-between pt-0.5 text-[11px]">
                {hasErrors ? (
                  <span className="text-rose-400">
                    ✕ {inputErrors.find(Boolean)}
                  </span>
                ) : (
                  <span className="text-emerald-400/80">
                    ✓ Valid input
                  </span>
                )}
                {selectedCase?.expected !== undefined && selectedCase.expected !== null && activeTestCaseId !== 'custom' && (
                  <span className="font-mono text-[#61687a]">
                    expected {JSON.stringify(selectedCase.expected)}
                  </span>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="space-y-3">
            {/* Test Actions + Submit moved cleanly out of primary workflow */}
            {!problem.isPlayground && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onRunTests}
                    disabled={isRunningTests}
                    className="flex items-center gap-1.5 rounded-md border border-[#252938] bg-[#141722] px-2.5 py-1 text-[11px] font-medium text-[#cfd6e6] transition hover:border-[#363d54] hover:text-white disabled:opacity-50 cursor-pointer"
                  >
                    <Play className="h-3 w-3" />
                    <span>Run Sample Cases</span>
                  </button>
                  <button
                    type="button"
                    onClick={onSubmitAll}
                    disabled={isRunningTests}
                    className="flex items-center gap-1.5 rounded-md border border-[#2c334a] bg-[#171c2c] px-2.5 py-1 text-[11px] font-medium text-[#c5d0ff] transition hover:bg-[#1e253b] disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                    <span>Submit All ({problem.testCases.length})</span>
                  </button>
                </div>
                {testResults && (
                  <span className="font-mono text-[11px] text-[#6d7588]">
                    {testResults.totalRuntimeMs} ms
                  </span>
                )}
              </div>
            )}

            {/* Test Suite Results */}
            {testResults && (
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
                    testResults.allPassed
                      ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-500/35 bg-rose-500/10 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    {testResults.allPassed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-rose-400" />
                    )}
                    <span>
                      {testResults.error
                        ? 'Execution Error'
                        : testResults.allPassed
                          ? `Accepted — ${testResults.passedCount}/${testResults.totalCount} Tests Passed`
                          : `Wrong Answer — ${testResults.passedCount}/${testResults.totalCount} Passed`}
                    </span>
                  </div>
                </div>

                {testResults.error && (
                  <div className="rounded-lg border border-rose-500/35 bg-rose-950/25 p-2.5 font-mono text-[11px] text-rose-200">
                    {testResults.error}
                  </div>
                )}

                {testResults.results.map((r) => {
                  const matchingCase = problem.testCases.find((t) => t.id === r.testCaseId);
                  return (
                    <div
                      key={r.testCaseId}
                      className="rounded-lg border border-[#1f2230] bg-[#12141c] px-3 py-2 text-[11px] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {r.passed ? (
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <XCircle className="h-3 w-3 text-rose-400" />
                          )}
                          <span className="font-medium text-[#dce2ee]">
                            {r.label}
                            {r.isHidden ? ' (Hidden)' : ''}
                          </span>
                          <span className="font-mono text-[10px] text-[#61687a]">
                            {r.runtimeMs} ms
                          </span>
                        </div>
                        {matchingCase && (
                          <button
                            type="button"
                            onClick={() => onVisualizeCase(matchingCase)}
                            className="flex items-center gap-1 text-[10px] font-medium text-[#9db2ff] hover:underline cursor-pointer"
                          >
                            <Eye className="h-3 w-3" />
                            <span>{r.passed ? 'Trace' : 'Debug Failure'}</span>
                          </button>
                        )}
                      </div>
                      <div className="font-mono text-[#8890a4] break-all">
                        {r.inputDisplay}
                      </div>
                      <div className="flex flex-wrap gap-3 font-mono">
                        <span className="text-emerald-300/90">
                          expected: {r.expectedDisplay}
                        </span>
                        <span className={r.passed ? 'text-emerald-300/90' : 'text-rose-300'}>
                          actual: {r.actualDisplay}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Stdout Console */}
            <div className="rounded-lg border border-[#1f2230] bg-[#0b0d12] p-2.5 font-mono text-[11px]">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5f667a]">
                <Terminal className="h-3 w-3" />
                <span>Console stdout</span>
              </div>
              {liveStdout.length === 0 ? (
                <div className="text-[#545b6e]">// No print / console output captured</div>
              ) : (
                <div className="space-y-0.5 text-[#cfd6e6]">
                  {liveStdout.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-all">
                      <span className="mr-2 select-none text-[#535a6c]">&gt;</span>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
