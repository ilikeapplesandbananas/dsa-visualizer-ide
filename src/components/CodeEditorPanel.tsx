import React, { useEffect, useMemo, useRef, useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import {
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  Lightbulb,
} from 'lucide-react';
import type { Language, Problem } from '../types/problem';

export interface SubmissionRecord {
  id: string;
  timestamp: string;
  language: string;
  passed: boolean;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
}

interface CodeEditorPanelProps {
  problem: Problem;
  submissions: SubmissionRecord[];
  code: string;
  language: Language;
  activeLine: number | null;
  errorLine: number | null;
  isPlaying: boolean;
  onChange: (code: string) => void;
  onChangeLanguage: (lang: Language) => void;
  onReset: () => void;
  onLoadOptimal: () => void;
}

export const LANGUAGE_OPTIONS: Array<{
  id: Language;
  label: string;
  badge: string;
  monacoId: string;
}> = [
  { id: 'python', label: 'Python 3', badge: 'PY', monacoId: 'python' },
  { id: 'javascript', label: 'JavaScript', badge: 'JS', monacoId: 'javascript' },
  { id: 'java', label: 'Java', badge: 'JV', monacoId: 'java' },
  { id: 'cpp', label: 'C++', badge: 'C++', monacoId: 'cpp' },
  { id: 'c', label: 'C', badge: 'C', monacoId: 'c' },
  { id: 'csharp', label: 'C#', badge: 'C#', monacoId: 'csharp' },
];

function getTabFilename(problem: Problem, language: Language): string {
  const snake = problem.id.replace(/-/g, '_');
  const camel = problem.entryFunction || 'solution';
  switch (language) {
    case 'python':
      return `${snake}.py`;
    case 'javascript':
      return `${camel}.js`;
    case 'java':
      return problem.isPlayground ? 'Main.java' : 'Solution.java';
    case 'cpp':
      return `${snake}.cpp`;
    case 'c':
      return `${snake}.c`;
    case 'csharp':
      return problem.isPlayground ? 'Program.cs' : 'Solution.cs';
  }
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={idx}
          className="rounded bg-[#1a1d28] px-1.5 py-0.5 font-mono text-[11px] text-[#cdd6ee]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#eef1f8]">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  problem,
  submissions,
  code,
  language,
  activeLine,
  errorLine,
  isPlaying,
  onChange,
  onChangeLanguage,
  onReset,
  onLoadOptimal,
}) => {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const decorationsRef = useRef<string[]>([]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsTab, setDetailsTab] = useState<'description' | 'hints' | 'submissions'>('description');
  const [revealedHints, setRevealedHints] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ line: number; col: number }>({ line: 1, col: 1 });

  useEffect(() => {
    setRevealedHints(0);
    setDetailsTab('description');
  }, [problem.id]);

  const langMeta = useMemo(
    () => LANGUAGE_OPTIONS.find((l) => l.id === language) ?? LANGUAGE_OPTIONS[0],
    [language]
  );

  const fileName = useMemo(() => getTabFilename(problem, language), [problem, language]);

  const shortSummary = useMemo(() => {
    const firstSentence = problem.description
      .split('\n')[0]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .trim();
    return firstSentence.length > 125 ? firstSentence.slice(0, 122) + '...' : firstSentence;
  }, [problem.description]);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme('trace-obsidian', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5a6378', fontStyle: 'italic' },
        { token: 'keyword', foreground: '9db2ff' },
        { token: 'type', foreground: '93c5fd' },
        { token: 'string', foreground: '86efac' },
        { token: 'number', foreground: 'f9a8d4' },
      ],
      colors: {
        'editor.background': '#0e1016',
        'editor.foreground': '#dce2ee',
        'editorLineNumber.foreground': '#3e4556',
        'editorLineNumber.activeForeground': '#8a93a8',
        'editorCursor.foreground': '#9db2ff',
        'editor.lineHighlightBackground': '#141722',
        'editor.selectionBackground': '#263052',
        'editorGutter.background': '#0e1016',
      },
    });
    monaco.editor.setTheme('trace-obsidian');

    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, col: e.position.column });
    });

    const jsDefaults = monaco.languages.typescript?.javascriptDefaults;
    if (jsDefaults) {
      jsDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const newDecorations: Monaco.editor.IModelDeltaDecoration[] = [];

    if (activeLine && activeLine > 0) {
      newDecorations.push({
        range: new monaco.Range(activeLine, 1, activeLine, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-active-trace-line',
          glyphMarginClassName: 'monaco-active-trace-glyph',
        },
      });
      editor.revealLineInCenterIfOutsideViewport(activeLine);
    }

    if (errorLine && errorLine > 0) {
      newDecorations.push({
        range: new monaco.Range(errorLine, 1, errorLine, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-error-trace-line',
        },
      });
    }

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
  }, [activeLine, errorLine]);

  return (
    <div className="relative flex h-full flex-col bg-[#0e1016]">
      {/* File Tab + 6-Language Dropdown */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0c0d12] pr-3">
        <div className="flex h-full items-center">
          <div className="flex h-full items-center gap-2 border-r border-[#1b1e29] bg-[#0e1016] px-4 text-xs text-[#dde2ee]">
            <span className="rounded bg-[#1a1f30] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#9db2ff]">
              {langMeta.badge}
            </span>
            <span className="font-mono text-[12px]">{fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="relative">
            <select
              aria-label="Programming Language"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as Language)}
              className="appearance-none rounded-md border border-[#232736] bg-[#14161f] py-1 pl-2.5 pr-7 text-xs font-medium text-[#d4dbe8] transition hover:border-[#343b52] focus:border-[#8ea3ff] focus:outline-none cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#11131a] text-[#e4e8f2]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#737b8e]" />
          </div>

          <button
            type="button"
            onClick={onLoadOptimal}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-[#8a93a8] transition hover:bg-[#171a24] hover:text-[#e3e7f2] cursor-pointer"
            title="Load clean optimal solution & visualize"
          >
            <Sparkles className="h-3 w-3 text-[#9db2ff]" />
            <span>Optimal</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-[#757d90] transition hover:bg-[#171a24] hover:text-[#d6dce8] cursor-pointer"
            title="Reset starter template"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Collapsed Problem Strip (Matches Figma: title + 1-line summary + Saved; expandable on demand) */}
      <div className="shrink-0 border-b border-[#191c26] bg-[#0e1016] px-5 pt-3.5 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="truncate text-sm font-semibold text-[#eef1f8]">
              {problem.isPlayground ? problem.title : `${problem.number}. ${problem.title}`}
            </span>
            <span className="shrink-0 text-[11px] font-medium text-[#7c8499]">
              {problem.difficulty}
            </span>
            {problem.scenario && (
              <span className="hidden xl:inline-block truncate rounded bg-[#161923] px-2 py-0.5 text-[10px] text-[#8d99b8]">
                {problem.scenario}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#6d7588]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6d7588]" />
              Saved
            </span>
            <button
              type="button"
              onClick={() => setDetailsOpen((o) => !o)}
              className="flex items-center gap-1 rounded-md border border-[#232736] bg-[#14161f] px-2 py-0.5 text-[11px] font-medium text-[#b5bdd0] transition hover:border-[#373f57] hover:text-white cursor-pointer"
            >
              <span>Problem details</span>
              {detailsOpen ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        <p className="mt-1 truncate text-xs text-[#7d8598]">{shortSummary}</p>
      </div>

      {/* Slide-down Full Problem Description / Examples / Constraints / Hints / Submissions */}
      {detailsOpen && (
        <div className="absolute inset-x-0 top-[96px] bottom-7 z-30 flex flex-col border-b border-[#242836] bg-[#0d0f16]/98 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#1c1f2b] px-5">
            <div className="flex items-center gap-5 text-xs font-medium">
              {(
                [
                  { id: 'description', label: 'Description' },
                  { id: 'hints', label: `Hints (${problem.hints.length})` },
                  { id: 'submissions', label: `Submissions (${submissions.length})` },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDetailsTab(t.id)}
                  className={`border-b-2 py-2.5 transition cursor-pointer ${
                    detailsTab === t.id
                      ? 'border-[#8ea3ff] text-[#eef1f8]'
                      : 'border-transparent text-[#737b8e] hover:text-[#cfd6e6]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setDetailsOpen(false)}
              className="text-[11px] text-[#838ba0] hover:text-white cursor-pointer"
            >
              Collapse ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs leading-relaxed text-[#cfd6e6]">
            {detailsTab === 'description' && (
              <>
                <div className="space-y-2">
                  {problem.description.split('\n\n').map((para, i) => (
                    <p key={i}>{renderInlineMarkdown(para)}</p>
                  ))}
                </div>

                {problem.examples.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6d7588]">
                      Examples
                    </div>
                    {problem.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-[#222532] bg-[#12141c] p-3 font-mono text-[11px] space-y-1"
                      >
                        <div>
                          <span className="text-[#6d7588]">Input: </span>
                          <span className="text-[#dce2ee]">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-[#6d7588]">Output: </span>
                          <span className="text-emerald-300">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="font-sans text-[11px] text-[#848ca0] pt-0.5">
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6d7588]">
                      Constraints
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[#9ca4b8]">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{renderInlineMarkdown(c)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {detailsTab === 'hints' && (
              <div className="space-y-3">
                {problem.hints.map((hint, idx) => {
                  const unlocked = idx < revealedHints;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#222532] bg-[#12141c] p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#9db2ff]">
                          <Lightbulb className="h-3.5 w-3.5" />
                          Hint {idx + 1}
                        </span>
                        {!unlocked && (
                          <button
                            type="button"
                            onClick={() => setRevealedHints(idx + 1)}
                            className="rounded bg-[#1a1f30] px-2 py-0.5 text-[10px] text-[#b4c3ff] hover:bg-[#232940] cursor-pointer"
                          >
                            Reveal
                          </button>
                        )}
                      </div>
                      {unlocked ? (
                        <p className="text-xs text-[#cfd6e6]">{renderInlineMarkdown(hint)}</p>
                      ) : (
                        <p className="text-[11px] italic text-[#5e6578]">
                          Hidden — try reasoning about invariants first.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {detailsTab === 'submissions' && (
              <div className="space-y-2">
                {submissions.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#697084]">
                    No full submissions yet — run tests from the Output drawer below.
                  </div>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between rounded-lg border border-[#222532] bg-[#12141c] px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        {sub.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-400" />
                        )}
                        <div>
                          <div className={sub.passed ? 'font-medium text-emerald-300' : 'font-medium text-rose-300'}>
                            {sub.passed ? 'Accepted' : 'Wrong Answer'} ({sub.passedCount}/{sub.totalCount})
                          </div>
                          <div className="text-[11px] text-[#737b8e]">
                            {sub.language} · {sub.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[11px] text-[#8d95a8]">
                        <Clock className="h-3 w-3" />
                        {sub.runtimeMs} ms
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Monaco Editor */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={langMeta.monacoId}
          value={code}
          theme="trace-obsidian"
          onMount={handleMount}
          onChange={(val) => onChange(val ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13.5,
            lineHeight: 22,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            fontLigatures: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            glyphMargin: true,
            lineNumbersMinChars: 3,
            tabSize: language === 'javascript' ? 2 : 4,
            wordWrap: 'off',
            padding: { top: 14, bottom: 12 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'line',
            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
          }}
        />
      </div>

      {/* Subtle Bottom Editor Status Strip (matches screenshot: "Paused on line 8 | Ln 8, Col 17") */}
      <div className="flex h-7 shrink-0 items-center justify-between border-t border-[#181b25] bg-[#0e1016] px-5 font-mono text-[11px] text-[#666e80]">
        <div>
          {errorLine ? (
            <span className="text-rose-400">Error on line {errorLine}</span>
          ) : activeLine ? (
            <span>
              {isPlaying ? 'Executing' : 'Paused on'} line{' '}
              <span className="text-[#9db2ff]">{activeLine}</span>
            </span>
          ) : (
            <span>Ready to trace</span>
          )}
        </div>
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col}
        </div>
      </div>
    </div>
  );
};
