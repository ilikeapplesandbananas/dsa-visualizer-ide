import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROBLEMS } from './data/problems';
import type { Language, Problem, TestCase } from './types/problem';
import type { ExecutionTrace, RunTestsResponse } from './types/trace';
import { Header } from './components/Header';
import {
  CodeEditorPanel,
  LANGUAGE_OPTIONS,
  type SubmissionRecord,
} from './components/CodeEditorPanel';
import { TestConsolePanel } from './components/TestConsolePanel';
import { VisualizerPanel } from './components/VisualizerPanel';
import { ProblemDrawer } from './components/ProblemDrawer';
import { runUnifiedTests, runUnifiedTrace } from './engine/pythonClient';

const LS_PREFIX = 'trace.v2';

function loadJsonStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}.${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJsonStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(`${LS_PREFIX}.${key}`, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export function App() {
  const [problemId, setProblemId] = useState<string>(() => {
    const saved = loadJsonStorage<string>('problem', PROBLEMS[0].id);
    return PROBLEMS.some((p) => p.id === saved) ? saved : PROBLEMS[0].id;
  });

  const problem = useMemo<Problem>(
    () => PROBLEMS.find((p) => p.id === problemId) ?? PROBLEMS[0],
    [problemId]
  );

  const [language, setLanguage] = useState<Language>(() => {
    const saved = loadJsonStorage<Language>('lang', 'python');
    return LANGUAGE_OPTIONS.some((o) => o.id === saved) ? saved : 'python';
  });

  const [codeMap, setCodeMap] = useState<Record<string, string>>(() =>
    loadJsonStorage<Record<string, string>>('code', {})
  );
  const [solvedIds, setSolvedIds] = useState<string[]>(() =>
    loadJsonStorage<string[]>('solved', [])
  );
  const [submissionsMap, setSubmissionsMap] = useState<Record<string, SubmissionRecord[]>>(() =>
    loadJsonStorage<Record<string, SubmissionRecord[]>>('submissions', {})
  );

  const codeKey = `${problem.id}:${language}`;
  const currentCode = codeMap[codeKey] ?? problem.starterCode[language];

  // Test case state
  const sampleTestCases = useMemo(
    () => problem.testCases.filter((tc) => !tc.isHidden),
    [problem]
  );
  const [activeTestCaseId, setActiveTestCaseId] = useState<string>(
    () => sampleTestCases[0]?.id ?? 'custom'
  );
  const [customArgs, setCustomArgs] = useState<unknown[]>(() =>
    JSON.parse(JSON.stringify(sampleTestCases[0]?.args ?? []))
  );

  // Sync active test case & customArgs when problem changes
  useEffect(() => {
    const first = problem.testCases.find((tc) => !tc.isHidden) ?? problem.testCases[0];
    setActiveTestCaseId(first?.id ?? 'custom');
    setCustomArgs(JSON.parse(JSON.stringify(first?.args ?? [])));
    setTrace(null);
    setTestResults(null);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setConsoleTab('testcase');
  }, [problem]);

  const activeTestCase = useMemo<TestCase | undefined>(() => {
    if (problem.isPlayground) return problem.testCases[0];
    if (activeTestCaseId === 'custom') {
      return {
        id: 'custom',
        label: 'Custom',
        args: customArgs,
        expected: null,
      };
    }
    return sampleTestCases.find((t) => t.id === activeTestCaseId) ?? sampleTestCases[0];
  }, [problem, sampleTestCases, activeTestCaseId, customArgs]);

  // Execution & playback state
  const [trace, setTrace] = useState<ExecutionTrace | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(650);
  const [isRunningTrace, setIsRunningTrace] = useState<boolean>(false);

  const [testResults, setTestResults] = useState<RunTestsResponse | null>(null);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [consoleTab, setConsoleTab] = useState<'testcase' | 'output'>('testcase');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState<boolean>(false);

  // 2-pane responsive split geometry
  const [leftPanePct, setLeftPanePct] = useState<number>(48);
  const [editorPct, setEditorPct] = useState<number>(67);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<'vertical' | 'horizontal' | null>(null);

  useEffect(() => {
    saveJsonStorage('problem', problemId);
  }, [problemId]);
  useEffect(() => {
    saveJsonStorage('lang', language);
  }, [language]);
  useEffect(() => {
    saveJsonStorage('code', codeMap);
  }, [codeMap]);
  useEffect(() => {
    saveJsonStorage('solved', solvedIds);
  }, [solvedIds]);
  useEffect(() => {
    saveJsonStorage('submissions', submissionsMap);
  }, [submissionsMap]);

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying || !trace || trace.steps.length <= 1) return;
    const id = window.setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= trace.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);
    return () => window.clearInterval(id);
  }, [isPlaying, speedMs, trace]);

  // Drag-resize handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      if (draggingRef.current === 'vertical' && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
        setLeftPanePct(Math.min(68, Math.max(28, pct)));
      } else if (draggingRef.current === 'horizontal' && leftColRef.current) {
        const rect = leftColRef.current.getBoundingClientRect();
        const pct = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
        setEditorPct(Math.min(82, Math.max(36, pct)));
      }
    };
    const onUp = () => {
      draggingRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const startDrag = (kind: 'vertical' | 'horizontal') => {
    draggingRef.current = kind;
    document.body.style.cursor = kind === 'vertical' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const handleChangeCode = useCallback(
    (newCode: string) => {
      setCodeMap((prev) => ({ ...prev, [codeKey]: newCode }));
    },
    [codeKey]
  );

  const handleChangeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setTrace(null);
    setTestResults(null);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCodeMap((prev) => {
      const next = { ...prev };
      delete next[codeKey];
      return next;
    });
    setTrace(null);
    setTestResults(null);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [codeKey]);

  const handleLoadOptimal = useCallback(() => {
    setCodeMap((prev) => ({ ...prev, [codeKey]: problem.optimalCode[language] }));
    setTrace(null);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [codeKey, problem, language]);

  const handleSelectTestCase = useCallback(
    (id: string) => {
      setActiveTestCaseId(id);
      if (id !== 'custom') {
        const tc = sampleTestCases.find((t) => t.id === id);
        if (tc) setCustomArgs(JSON.parse(JSON.stringify(tc.args)));
      }
    },
    [sampleTestCases]
  );

  const runTraceForCase = useCallback(
    async (tcOverride?: TestCase) => {
      const targetTc: TestCase = tcOverride ??
        activeTestCase ?? { id: 'default', label: 'Case 1', args: [], expected: null };

      setIsRunningTrace(true);
      setIsPlaying(false);
      try {
        const res = await runUnifiedTrace(language, {
          code: currentCode,
          entryFunction: problem.entryFunction,
          params: problem.params,
          returnType: problem.returnType,
          compareMode: problem.compareMode,
          isPlayground: problem.isPlayground,
          testCase: targetTc,
        });
        setTrace(res);
        setCurrentStepIndex(0);
        setIsPlaying(res.steps.length > 1);
      } finally {
        setIsRunningTrace(false);
      }
    },
    [activeTestCase, language, currentCode, problem]
  );

  const executeTestSuite = useCallback(
    async (allCases: boolean) => {
      setIsRunningTests(true);
      setConsoleTab('output');
      try {
        let casesToRun: TestCase[];
        if (problem.isPlayground) {
          casesToRun = problem.testCases;
        } else if (allCases) {
          casesToRun = problem.testCases;
        } else {
          casesToRun =
            activeTestCaseId === 'custom'
              ? [
                  {
                    id: 'custom',
                    label: 'Custom Case',
                    args: customArgs,
                    expected: sampleTestCases[0]?.expected ?? null,
                  },
                ]
              : sampleTestCases;
        }

        const res = await runUnifiedTests(language, {
          code: currentCode,
          entryFunction: problem.entryFunction,
          params: problem.params,
          returnType: problem.returnType,
          compareMode: problem.compareMode,
          isPlayground: problem.isPlayground,
          testCases: casesToRun,
        });
        setTestResults(res);

        if (allCases) {
          const langLabel =
            LANGUAGE_OPTIONS.find((l) => l.id === language)?.label ?? language;
          const rec: SubmissionRecord = {
            id: `sub_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            language: langLabel,
            passed: res.allPassed,
            passedCount: res.passedCount,
            totalCount: res.totalCount,
            runtimeMs: res.totalRuntimeMs,
          };
          setSubmissionsMap((prev) => ({
            ...prev,
            [problem.id]: [rec, ...(prev[problem.id] ?? [])].slice(0, 15),
          }));
          if (res.allPassed && !problem.isPlayground) {
            setSolvedIds((prev) => (prev.includes(problem.id) ? prev : [...prev, problem.id]));
          }
        }
      } finally {
        setIsRunningTests(false);
      }
    },
    [problem, activeTestCaseId, customArgs, sampleTestCases, language, currentCode]
  );

  // Global keyboard shortcuts (Cmd/Ctrl+Enter = Visualize, Space = Play/Pause, Arrows = Step)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        void runTraceForCase();
        return;
      }

      const target = e.target as HTMLElement | null;
      const inEditable = Boolean(
        target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.closest('.monaco-editor'))
      );
      if (inEditable || !trace || trace.steps.length === 0) return;

      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => {
          if (!p && currentStepIndex >= trace.steps.length - 1) {
            setCurrentStepIndex(0);
          }
          return !p;
        });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex((idx) => Math.min(trace.steps.length - 1, idx + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex((idx) => Math.max(0, idx - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [runTraceForCase, trace, currentStepIndex]);

  const currentIdx = PROBLEMS.findIndex((p) => p.id === problem.id);
  const handlePrevProblem = () => {
    const prevIdx = (currentIdx - 1 + PROBLEMS.length) % PROBLEMS.length;
    setProblemId(PROBLEMS[prevIdx].id);
  };
  const handleNextProblem = () => {
    const nextIdx = (currentIdx + 1) % PROBLEMS.length;
    setProblemId(PROBLEMS[nextIdx].id);
  };

  const currentStep =
    trace && trace.steps.length > 0
      ? trace.steps[Math.min(currentStepIndex, trace.steps.length - 1)]
      : null;

  const activeLine = currentStep ? currentStep.line : null;
  const liveStdout = currentStep?.stdout ?? trace?.stdout ?? [];
  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);
  const langLabel = LANGUAGE_OPTIONS.find((o) => o.id === language)?.label ?? language;

  const footerStatusText = isRunningTrace
    ? 'Tracing'
    : trace?.error
      ? 'Error'
      : trace && trace.steps.length > 0
        ? isPlaying
          ? 'Playing'
          : 'Paused'
        : 'Ready';

  const footerDotClass = isRunningTrace
    ? 'bg-amber-400 animate-pulse'
    : trace?.error
      ? 'bg-rose-400'
      : trace && trace.steps.length > 0
        ? isPlaying
          ? 'bg-emerald-400 animate-pulse'
          : 'bg-[#8ea3ff]'
        : 'bg-[#5d6478]';

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0e0f14] text-[#e6eaf3]">
      <Header
        problem={problem}
        isSolved={solvedSet.has(problem.id)}
        isRunningTrace={isRunningTrace}
        isRunningTests={isRunningTests}
        totalProblems={PROBLEMS.length}
        onOpenProblemDrawer={() => setDrawerOpen(true)}
        onPrevProblem={handlePrevProblem}
        onNextProblem={handleNextProblem}
        onVisualize={() => void runTraceForCase()}
        onRunTests={() => void executeTestSuite(false)}
      />

      {/* 2-Surface Workspace: Left = Code + Test Drawer, Right = Visual Canvas */}
      <main
        ref={containerRef}
        className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row"
      >
        {!isCanvasExpanded && (
          <div
            ref={leftColRef}
            style={{ '--left-pane-pct': `${leftPanePct}%` } as React.CSSProperties}
            className="flex min-h-0 w-full flex-col md:h-full md:w-[var(--left-pane-pct)] max-md:h-1/2"
          >
            <div style={{ height: `${editorPct}%` }} className="min-h-0 overflow-hidden">
              <CodeEditorPanel
                problem={problem}
                submissions={submissionsMap[problem.id] ?? []}
                code={currentCode}
                language={language}
                activeLine={activeLine}
                errorLine={trace?.errorLine ?? null}
                isPlaying={isPlaying}
                onChange={handleChangeCode}
                onChangeLanguage={handleChangeLanguage}
                onReset={handleReset}
                onLoadOptimal={handleLoadOptimal}
              />
            </div>

            {/* Horizontal Splitter */}
            <div
              onMouseDown={() => startDrag('horizontal')}
              className="hidden h-1 shrink-0 cursor-row-resize bg-[#181a24] transition-colors hover:bg-[#8ea3ff]/50 md:block"
              title="Drag to resize editor and test drawer"
            />

            <div style={{ height: `${100 - editorPct}%` }} className="min-h-0 overflow-hidden">
              <TestConsolePanel
                problem={problem}
                sampleTestCases={sampleTestCases}
                activeTestCaseId={activeTestCaseId}
                customArgs={customArgs}
                testResults={testResults}
                liveStdout={liveStdout}
                activeTab={consoleTab}
                isRunningTests={isRunningTests}
                onTabChange={setConsoleTab}
                onSelectTestCase={handleSelectTestCase}
                onUpdateCustomArgs={setCustomArgs}
                onVisualizeCase={(tc) => void runTraceForCase(tc)}
                onRunTests={() => void executeTestSuite(false)}
                onSubmitAll={() => void executeTestSuite(true)}
              />
            </div>
          </div>
        )}

        {/* Vertical Splitter */}
        {!isCanvasExpanded && (
          <div
            onMouseDown={() => startDrag('vertical')}
            className="hidden w-1 shrink-0 cursor-col-resize bg-[#181a24] transition-colors hover:bg-[#8ea3ff]/50 md:block"
            title="Drag to resize editor and visual canvas"
          />
        )}

        {/* Right Visual Canvas Surface */}
        <div
          style={
            {
              '--right-pane-pct': isCanvasExpanded ? '100%' : `${100 - leftPanePct}%`,
            } as React.CSSProperties
          }
          className="min-h-0 w-full flex-1 overflow-hidden md:h-full md:w-[var(--right-pane-pct)]"
        >
          <VisualizerPanel
            problem={problem}
            trace={trace}
            currentStepIndex={currentStepIndex}
            activeTestCase={activeTestCase}
            isPlaying={isPlaying}
            speedMs={speedMs}
            isRunning={isRunningTrace}
            isExpanded={isCanvasExpanded}
            onStepChange={(idx) => {
              setIsPlaying(false);
              setCurrentStepIndex(idx);
            }}
            onTogglePlay={() => {
              if (!trace || trace.steps.length === 0) return;
              if (!isPlaying && currentStepIndex >= trace.steps.length - 1) {
                setCurrentStepIndex(0);
              }
              setIsPlaying((p) => !p);
            }}
            onSpeedChange={setSpeedMs}
            onToggleExpand={() => setIsCanvasExpanded((e) => !e)}
          />
        </div>
      </main>

      {/* Global Bottom Status Footer */}
      <footer className="flex h-7 shrink-0 items-center justify-between border-t border-[#1b1e29] bg-[#0b0c10] px-4 font-mono text-[11px] text-[#687084] select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#b8c2d8]">
            <span className={`h-1.5 w-1.5 rounded-full ${footerDotClass}`} />
            {footerStatusText}
          </span>
          <span className="text-[#4a5163]">·</span>
          <span>All changes saved</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            Time <span className="text-[#99a2b8]">{problem.timeComplexity}</span>
          </span>
          <span className="hidden sm:inline">
            Space <span className="text-[#99a2b8]">{problem.spaceComplexity}</span>
          </span>
          <span className="hidden text-[#3a4052] sm:inline">|</span>
          <span>UTF-8 · {langLabel}</span>
        </div>
      </footer>

      {/* Problem Catalog Overlay */}
      <ProblemDrawer
        open={drawerOpen}
        problems={PROBLEMS}
        activeProblemId={problem.id}
        solvedIds={solvedIds}
        onSelect={(id) => {
          setProblemId(id);
          setDrawerOpen(false);
        }}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default App;
