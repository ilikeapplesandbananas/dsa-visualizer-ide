import React from 'react';
import type { LinkedListViewModel, LinkedListNodeModel } from '../../engine/structureDetector';

interface Props {
  model: LinkedListViewModel;
}

export const LinkedListVisualizer: React.FC<Props> = ({ model }) => {
  const nodeMap = new Map<string, LinkedListNodeModel>();
  for (const n of model.nodes) nodeMap.set(n.id, n);

  // Lay out chains row by row starting from heads
  const placed = new Set<string>();
  const rows: LinkedListNodeModel[][] = [];

  for (const headId of model.heads) {
    const chain: LinkedListNodeModel[] = [];
    let cur: string | null = headId;
    while (cur && nodeMap.has(cur) && !placed.has(cur)) {
      placed.add(cur);
      const item: LinkedListNodeModel | undefined = nodeMap.get(cur);
      if (!item) break;
      chain.push(item);
      cur = item.nextId;
    }
    if (chain.length > 0) rows.push(chain);
  }

  for (const n of model.nodes) {
    if (!placed.has(n.id)) {
      placed.add(n.id);
      rows.push([n]);
    }
  }

  const nodeW = 84;
  const nodeH = 38;
  const gapX = 52;
  const rowH = 112;
  const padX = 36;
  const padY = 52;

  const coords = new Map<string, { x: number; y: number; row: number; col: number }>();
  let maxCols = 1;
  rows.forEach((chain, rIdx) => {
    maxCols = Math.max(maxCols, chain.length);
    chain.forEach((node, cIdx) => {
      coords.set(node.id, {
        x: padX + cIdx * (nodeW + gapX),
        y: padY + rIdx * rowH,
        row: rIdx,
        col: cIdx,
      });
    });
  });

  const svgWidth = Math.max(460, padX * 2 + maxCols * (nodeW + gapX) + 40);
  const svgHeight = Math.max(150, padY + rows.length * rowH + 26);

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-violet-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-violet-300 border border-violet-500/25">
            Linked List
          </span>
          <span className="text-[11px] text-slate-400">{model.nodes.length} nodes</span>
        </div>
        {model.cycleEdges.length > 0 && (
          <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[11px] text-amber-300 border border-amber-500/30">
            Cycle Detected
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="block">
          <defs>
            <marker id="ll-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#64748b" />
            </marker>
            <marker id="ll-arrow-cycle" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Edges */}
          {model.nodes.map((node) => {
            const from = coords.get(node.id);
            if (!from) return null;
            const startX = from.x + nodeW;
            const startY = from.y + nodeH / 2;

            if (!node.nextId) {
              // Null terminator pill
              return (
                <g key={`null-${node.id}`}>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={startX + 22}
                    y2={startY}
                    stroke="#475569"
                    strokeWidth={1.6}
                    markerEnd="url(#ll-arrow)"
                  />
                  <rect
                    x={startX + 26}
                    y={startY - 11}
                    width={36}
                    height={22}
                    rx={6}
                    fill="#0f172a"
                    stroke="#334155"
                    strokeDasharray="3 2"
                  />
                  <text
                    x={startX + 44}
                    y={startY + 4}
                    textAnchor="middle"
                    className="fill-slate-500 font-mono text-[10px]"
                  >
                    null
                  </text>
                </g>
              );
            }

            const to = coords.get(node.nextId);
            if (!to) return null;

            const isAdjacentSameRow = to.row === from.row && to.col === from.col + 1;
            const isCycleOrBack = to.row === from.row && to.col <= from.col;

            if (isAdjacentSameRow) {
              return (
                <line
                  key={`e-${node.id}-${node.nextId}`}
                  x1={startX}
                  y1={startY}
                  x2={to.x - 2}
                  y2={to.y + nodeH / 2}
                  stroke="#64748b"
                  strokeWidth={1.8}
                  markerEnd="url(#ll-arrow)"
                />
              );
            }

            if (isCycleOrBack) {
              const targetX = to.x + nodeW / 2;
              const targetY = to.y + nodeH;
              const arcDepth = 36;
              return (
                <path
                  key={`e-${node.id}-${node.nextId}`}
                  d={`M ${from.x + nodeW / 2} ${from.y + nodeH} C ${from.x + nodeW / 2} ${from.y + nodeH + arcDepth}, ${targetX} ${targetY + arcDepth}, ${targetX} ${targetY + 2}`}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={1.8}
                  strokeDasharray="4 2"
                  markerEnd="url(#ll-arrow-cycle)"
                />
              );
            }

            // Cross-row forward/rewire curve
            const tx = to.x;
            const ty = to.y + nodeH / 2;
            const midX = (startX + tx) / 2;
            return (
              <path
                key={`e-${node.id}-${node.nextId}`}
                d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${ty}, ${tx - 2} ${ty}`}
                fill="none"
                stroke="#818cf8"
                strokeWidth={1.8}
                markerEnd="url(#ll-arrow)"
              />
            );
          })}

          {/* Nodes */}
          {model.nodes.map((node) => {
            const pos = coords.get(node.id);
            if (!pos) return null;
            const hasPointers = node.pointers.length > 0;
            const pointerLabel = node.pointers.join(', ');

            return (
              <g key={node.id}>
                {/* Pointer pill above node */}
                {hasPointers && (
                  <g>
                    <rect
                      x={pos.x + nodeW / 2 - Math.max(28, pointerLabel.length * 4 + 10)}
                      y={pos.y - 34}
                      width={Math.max(56, pointerLabel.length * 8 + 20)}
                      height={19}
                      rx={5}
                      fill="rgba(99, 102, 241, 0.22)"
                      stroke="#818cf8"
                      strokeWidth={1}
                    />
                    <text
                      x={pos.x + nodeW / 2}
                      y={pos.y - 21}
                      textAnchor="middle"
                      className="fill-indigo-200 font-mono text-[10px] font-semibold"
                    >
                      {pointerLabel}
                    </text>
                    <line
                      x1={pos.x + nodeW / 2}
                      y1={pos.y - 15}
                      x2={pos.x + nodeW / 2}
                      y2={pos.y - 2}
                      stroke="#818cf8"
                      strokeWidth={1.3}
                    />
                  </g>
                )}

                {/* Node box */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={nodeW}
                  height={nodeH}
                  rx={8}
                  fill={node.changed ? 'rgba(16, 185, 129, 0.2)' : hasPointers ? 'rgba(99, 102, 241, 0.16)' : '#171d2c'}
                  stroke={node.changed ? '#34d399' : hasPointers ? '#818cf8' : '#334155'}
                  strokeWidth={hasPointers || node.changed ? 2 : 1.4}
                />
                {/* Divider between val and next */}
                <line
                  x1={pos.x + nodeW - 24}
                  y1={pos.y + 4}
                  x2={pos.x + nodeW - 24}
                  y2={pos.y + nodeH - 4}
                  stroke="#334155"
                  strokeWidth={1}
                />
                <text
                  x={pos.x + (nodeW - 24) / 2}
                  y={pos.y + nodeH / 2 + 5}
                  textAnchor="middle"
                  className="fill-slate-100 font-mono text-sm font-semibold"
                >
                  {node.valDisplay}
                </text>
                <circle
                  cx={pos.x + nodeW - 12}
                  cy={pos.y + nodeH / 2}
                  r={3.2}
                  fill={node.nextId ? '#818cf8' : '#475569'}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
