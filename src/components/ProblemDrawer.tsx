import React, { useMemo, useState } from 'react';
import { X, Search, CheckCircle2, Sparkles } from 'lucide-react';
import type { Category, Difficulty, Problem } from '../types/problem';

interface ProblemDrawerProps {
  open: boolean;
  problems: Problem[];
  activeProblemId: string;
  solvedIds: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'text-emerald-300/90 bg-emerald-500/10 border-emerald-500/25',
  Medium: 'text-amber-300/90 bg-amber-500/10 border-amber-500/25',
  Hard: 'text-rose-300/90 bg-rose-500/10 border-rose-500/25',
  Playground: 'text-[#9db2ff] bg-[#8ea3ff]/10 border-[#8ea3ff]/25',
};

export const ProblemDrawer: React.FC<ProblemDrawerProps> = ({
  open,
  problems,
  activeProblemId,
  solvedIds,
  onSelect,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | Category>('All');

  const categories = useMemo(() => {
    const seen = new Set<Category>();
    for (const p of problems) seen.add(p.category);
    return Array.from(seen);
  }, [problems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (difficultyFilter !== 'All' && p.difficulty !== difficultyFilter) return false;
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.scenario && p.scenario.toLowerCase().includes(q)) ||
        String(p.number).includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [problems, query, difficultyFilter, categoryFilter]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/65 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-lg flex-col border-r border-[#1f222e] bg-[#0d0e14] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1c1f2b] px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-[#eef1f8]">
              Problems &amp; Playgrounds
            </h2>
            <p className="text-[11px] text-[#777f93]">
              {problems.length} visualizable DSA items · {solvedIds.length} solved
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#777f93] transition hover:bg-[#171924] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3 border-b border-[#1c1f2b] p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#646b7e]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problem, scenario (e.g. Warehouse, CloudWatch), tag..."
              className="w-full rounded-lg border border-[#242836] bg-[#12141c] py-2 pl-9 pr-3 text-xs text-[#e5e9f2] placeholder-[#5e6578] focus:border-[#8ea3ff] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Easy', 'Medium', 'Hard', 'Playground'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficultyFilter(diff)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
                  difficultyFilter === diff
                    ? 'bg-[#20253a] text-[#dce3ff]'
                    : 'bg-[#14161f] text-[#7c8498] hover:text-[#cfd6e6]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setCategoryFilter('All')}
              className={`rounded-md px-2 py-0.5 text-[10px] transition cursor-pointer ${
                categoryFilter === 'All'
                  ? 'bg-[#20253a] text-[#dce3ff]'
                  : 'text-[#737b8e] hover:bg-[#14161f] hover:text-[#cfd6e6]'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-md px-2 py-0.5 text-[10px] transition cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#20253a] text-[#dce3ff]'
                    : 'text-[#737b8e] hover:bg-[#14161f] hover:text-[#cfd6e6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 space-y-1.5 overflow-y-auto p-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#697084]">
              No problems match "{query}".
            </div>
          ) : (
            filtered.map((p) => {
              const active = p.id === activeProblemId;
              const solved = solvedIds.includes(p.id);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSelect(p.id);
                    onClose();
                  }}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
                    active
                      ? 'border-[#6d80e0]/60 bg-[#171c2e]'
                      : 'border-[#1d202b] bg-[#11131a] hover:border-[#2c3142] hover:bg-[#151822]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {p.isPlayground ? (
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#9db2ff]" />
                      ) : solved ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      ) : (
                        <span className="ml-0.5 mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#383e52]" />
                      )}
                      <span className="font-mono text-xs text-[#737b8e]">
                        {p.isPlayground ? 'PLAY' : `#${p.number}`}
                      </span>
                      <span className="truncate text-xs font-medium text-[#e6eaf5]">
                        {p.title}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-5">
                      <span className="text-[10px] text-[#7c8499]">{p.category}</span>
                      {p.scenario && (
                        <>
                          <span className="text-[#454c5e]">·</span>
                          <span className="text-[10px] text-[#9db2ff]/85">
                            {p.scenario}
                          </span>
                        </>
                      )}
                      {p.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-[#171a24] px-1.5 py-0.5 text-[10px] text-[#838b9e]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-medium ${difficultyColors[p.difficulty]}`}
                  >
                    {p.difficulty}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
