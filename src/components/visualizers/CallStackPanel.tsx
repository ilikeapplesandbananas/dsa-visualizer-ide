import React from 'react';
import type { HeapObject, StackFrame } from '../../types/trace';
import { formatSerializedValue, type RecursionNodeModel } from '../../engine/structureDetector';

interface CallStackProps {
  frames: StackFrame[];
  heap: Record<string, HeapObject>;
  changedVars: string[];
}

export const CallStackList: React.FC<CallStackProps> = ({ frames, heap, changedVars }) => {
  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Call Stack ({frames.length})
        </span>
      </div>

      <div className="flex flex-col-reverse gap-2">
        {frames.map((frame, idx) => {
          const isTop = idx === frames.length - 1;
          const entries = Object.entries(frame.locals);
          return (
            <div
              key={frame.id}
              className={`rounded-lg border p-2.5 ${isTop
                  ? 'border-indigo-500/50 bg-indigo-500/10'
                  : 'border-slate-800 bg-slate-900/60 opacity-85'
                }`}
            >
              <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                <span className={isTop ? 'font-semibold text-indigo-200' : 'text-slate-300'}>
                  {frame.funcName}()
                </span>
                <span className="rounded bg-slate-800/90 px-1.5 py-0.5 text-[10px] text-slate-400">
                  line {frame.line}
                </span>
              </div>
              {entries.length === 0 ? (
                <div className="font-mono text-[11px] text-slate-500">(no local variables)</div>
              ) : (
                <div className="grid grid-cols-1 gap-1">
                  {entries.map(([k, v]) => {
                    const isCh = isTop && changedVars.includes(k);
                    return (
                      <div
                        key={k}
                        className={`flex items-baseline justify-between gap-2 rounded px-1.5 py-0.5 font-mono text-[11px] ${isCh ? 'bg-emerald-500/15 text-emerald-200' : 'text-slate-300'
                          }`}
                      >
                        <span className="text-slate-400 shrink-0">{k}:</span>
                        <span className="truncate text-right text-slate-100">
                          {formatSerializedValue(v, heap)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface RecursionTreeProps {
  tree: {
    roots: number[];
    nodes: Record<number, RecursionNodeModel>;
    activeCallId: number | null;
  };
}

export const RecursionTreeSvg: React.FC<RecursionTreeProps> = ({ tree }) => {
  const coords = new Map<number, { x: number; y: number; node: RecursionNodeModel }>();
  let nextLeafX = 0;
  let maxDepth = 0;
  const stepX = 114;
  const stepY = 64;

  function assign(id: number, depth: number): number {
    const node = tree.nodes[id];
    if (!node) return nextLeafX;
    maxDepth = Math.max(maxDepth, depth);
    if (node.children.length === 0) {
      const x = nextLeafX;
      nextLeafX += stepX;
      coords.set(id, { x, y: depth * stepY + 34, node });
      return x;
    }
    const childXs = node.children.map((cid) => assign(cid, depth + 1));
    const x = (childXs[0] + childXs[childXs.length - 1]) / 2;
    coords.set(id, { x, y: depth * stepY + 34, node });
    return x;
  }

  for (const r of tree.roots) {
    assign(r, 0);
  }

  const width = Math.max(380, nextLeafX + 40);
  const height = Math.max(150, (maxDepth + 1) * stepY + 26);

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Recursion Call Tree ({Object.keys(tree.nodes).length} calls)
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg width={width} height={height} className="block">
          {Array.from(coords.values()).map(({ x, y, node }) =>
            node.children.map((cid) => {
              const child = coords.get(cid);
              if (!child) return null;
              return (
                <path
                  key={`${node.callId}-${cid}`}
                  d={`M ${x + 50} ${y + 18} C ${x + 50} ${(y + child.y) / 2}, ${child.x + 50} ${(y + child.y) / 2}, ${child.x + 50} ${child.y - 18}`}
                  fill="none"
                  stroke="#475569"
                  strokeWidth={1.5}
                />
              );
            })
          )}

          {Array.from(coords.values()).map(({ x, y, node }) => {
            const isActive = node.status === 'active';
            const isReturned = node.status === 'returned';
            const label = `${node.funcName}(${node.argsSummary})`;
            const clipped = label.length > 16 ? label.slice(0, 15) + '…' : label;
            return (
              <g key={node.callId} transform={`translate(${x + 50}, ${y})`}>
                <rect
                  x={-52}
                  y={-17}
                  width={104}
                  height={34}
                  rx={8}
                  fill={
                    isActive
                      ? 'rgba(99, 102, 241, 0.25)'
                      : isReturned
                        ? 'rgba(16, 185, 129, 0.14)'
                        : 'rgba(251, 191, 36, 0.12)'
                  }
                  stroke={isActive ? '#818cf8' : isReturned ? '#34d399' : '#fbbf24'}
                  strokeWidth={isActive ? 2 : 1.2}
                />
                <text
                  x={0}
                  y={node.returnDisplay ? -2 : 4}
                  textAnchor="middle"
                  className="fill-slate-100 font-mono text-[10px]"
                >
                  {clipped}
                </text>
                {node.returnDisplay !== undefined && (
                  <text
                    x={0}
                    y={11}
                    textAnchor="middle"
                    className="fill-emerald-300 font-mono text-[10px] font-semibold"
                  >
                    → {node.returnDisplay.slice(0, 12)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

