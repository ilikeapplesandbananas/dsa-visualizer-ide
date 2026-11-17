import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  FlaskConical,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import type { Problem } from '../types/problem';

interface HeaderProps {
  problem: Problem;
  isSolved: boolean;
  isRunningTrace: boolean;
  isRunningTests: boolean;
  totalProblems: number;
  onOpenProblemDrawer: () => void;
  onPrevProblem: () => void;
  onNextProblem: () => void;
  onVisualize: () => void;
  onRunTests: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  problem,
  isSolved,
  isRunningTrace,
  isRunningTests,
  totalProblems,
  onOpenProblemDrawer,
  onPrevProblem,
  onNextProblem,
  onVisualize,
  onRunTests,
}) => {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0b0c10] px-4 select-none">
      {/* Left: Brand Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-mono text-sm font-semibold tracking-tight text-[#eef1f8]">
          trace
        </span>
        <span className="text-[#454c5e]">/</span>
        <button
          type="button"
          onClick={onOpenProblemDrawer}
          className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[#7e8699] transition hover:bg-[#151822] hover:text-[#d8deea] cursor-pointer"
          title={`Browse all ${totalProblems} problems & playgrounds`}
        >
          <span>{problem.isPlayground ? 'playground' : 'problems'}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </button>
      </div>

      {/* Center: Problem Title / Category + Quiet Prev/Next */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrevProblem}
          className="flex h-6 w-6 items-center justify-center rounded-md text-[#6b7386] transition hover:bg-[#151822] hover:text-[#cfd6e6] cursor-pointer"
          title="Previous Problem"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={onOpenProblemDrawer}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs transition hover:bg-[#151822] cursor-pointer"
          title="Click to switch problem"
        >
          {isSolved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          <span className="font-medium text-[#e3e7f2]">{problem.title}</span>
          <span className="text-[#43495b]">/</span>
          <span className="text-[#7e8699]">{problem.category}</span>
        </button>

        <button
          type="button"
          onClick={onNextProblem}
          className="flex h-6 w-6 items-center justify-center rounded-md text-[#6b7386] transition hover:bg-[#151822] hover:text-[#cfd6e6] cursor-pointer"
          title="Next Problem"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right: Secondary Run Tests + Single Primary Visualize Action */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onRunTests}
          disabled={isRunningTests || isRunningTrace}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#8d96aa] transition hover:bg-[#151822] hover:text-[#e3e7f2] disabled:opacity-50 cursor-pointer"
          title="Run visible test cases"
        >
          {isRunningTests ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FlaskConical className="h-3.5 w-3.5" />
          )}
          <span>Run Tests</span>
        </button>

        <button
          type="button"
          onClick={onVisualize}
          disabled={isRunningTrace || isRunningTests}
          className="flex items-center gap-2 rounded-lg bg-[#9db2ff] px-3.5 py-1.5 text-xs font-semibold text-[#0b0d14] transition hover:bg-[#b2c2ff] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          title="Trace step-by-step execution (Ctrl/Cmd + Enter)"
        >
          {isRunningTrace ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3 w-3 fill-current" />
          )}
          <span>Visualize</span>
          <span className="hidden sm:inline font-mono text-[10px] font-medium opacity-60">
            ⌘↵
          </span>
        </button>
      </div>
    </header>
  );
};
