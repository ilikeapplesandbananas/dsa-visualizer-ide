import React from 'react';
import type { TreeViewModel, TreeNodeModel } from '../../engine/structureDetector';

interface Props {
  model: TreeViewModel;
}

interface PositionedNode {
  node: TreeNodeModel;
  x: number;
  y: number;
}

function layoutTree(
  rootId: string,
  nodes: Record<string, TreeNodeModel>,
  horizontalStep = 64,
  verticalStep = 76
): { positioned: PositionedNode[]; edges: Array<{ from: PositionedNode; to: PositionedNode }>; width: number; height: number } {
  const posMap = new Map<string, { x: number; y: number }>();
  const visited = new Set<string>();
  let nextLeafX = 0;
  let maxDepth = 0;

  function assignX(id: string, depth: number): number {
    if (visited.has(id) || !nodes[id]) return nextLeafX;
    visited.add(id);
    maxDepth = Math.max(maxDepth, depth);
    const n = nodes[id];
    const hasLeft = Boolean(n.leftId && nodes[n.leftId] && !visited.has(n.leftId));
    const hasRight = Boolean(n.rightId && nodes[n.rightId] && !visited.has(n.rightId));

    let x: number;
    if (!hasLeft && !hasRight) {
      x = nextLeafX;
      nextLeafX += horizontalStep;
    } else if (hasLeft && hasRight) {
      const lx = assignX(n.leftId!, depth + 1);
      const rx = assignX(n.rightId!, depth + 1);
      x = (lx + rx) / 2;
    } else if (hasLeft) {
      const lx = assignX(n.leftId!, depth + 1);
      x = lx + horizontalStep * 0.4;
      nextLeafX = Math.max(nextLeafX, x + horizontalStep * 0.6);
    } else {
      const rx = assignX(n.rightId!, depth + 1);
      x = rx - horizontalStep * 0.4;
      nextLeafX = Math.max(nextLeafX, rx + horizontalStep * 0.6);
    }

    posMap.set(id, { x, y: depth * verticalStep + 46 });
    return x;
  }

  assignX(rootId, 0);

  let minX = Infinity;
  let maxX = -Infinity;
  for (const p of posMap.values()) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
  }
  const padX = 52;
  const shiftX = Number.isFinite(minX) ? padX - minX : padX;

  const positioned: PositionedNode[] = [];
  const pLookup = new Map<string, PositionedNode>();
  for (const [id, p] of posMap.entries()) {
    const item = { node: nodes[id], x: p.x + shiftX, y: p.y };
    positioned.push(item);
    pLookup.set(id, item);
  }

  const edges: Array<{ from: PositionedNode; to: PositionedNode }> = [];
  for (const item of positioned) {
    if (item.node.leftId && pLookup.has(item.node.leftId)) {
      edges.push({ from: item, to: pLookup.get(item.node.leftId)! });
    }
    if (item.node.rightId && pLookup.has(item.node.rightId)) {
      edges.push({ from: item, to: pLookup.get(item.node.rightId)! });
    }
  }

  const width = Math.max(360, (Number.isFinite(maxX) ? maxX - minX : 0) + padX * 2);
  const height = Math.max(180, (maxDepth + 1) * verticalStep + 38);

  return { positioned, edges, width, height };
}

export const TreeVisualizer: React.FC<Props> = ({ model }) => {
  const { positioned, edges, width, height } = layoutTree(model.rootId, model.nodes);

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-300 border border-emerald-500/25">
            Binary Tree
          </span>
          <span className="text-[11px] text-slate-400">
            {positioned.length} visible nodes
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" /> active pointer
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> queued
          </span>
        </div>
      </div>

      <div className="overflow-x-auto flex justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: Math.min(width, 420), maxWidth: '100%', height: Math.min(340, height) }}
          className="block"
        >
          {/* Smooth Bezier Edges */}
          {edges.map(({ from, to }) => {
            const midY = (from.y + to.y) / 2;
            return (
              <path
                key={`${from.node.id}-${to.node.id}`}
                d={`M ${from.x} ${from.y + 18} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y - 18}`}
                fill="none"
                stroke="#475569"
                strokeWidth={2}
              />
            );
          })}

          {/* Nodes */}
          {positioned.map(({ node, x, y }) => {
            const hasPointers = node.pointers.length > 0;
            const ptrLabel = node.pointers.join(',');

            return (
              <g key={node.id} transform={`translate(${x}, ${y})`}>
                {hasPointers && (
                  <g>
                    <rect
                      x={-Math.max(20, ptrLabel.length * 4 + 8)}
                      y={-41}
                      width={Math.max(40, ptrLabel.length * 8 + 16)}
                      height={17}
                      rx={5}
                      fill="rgba(99, 102, 241, 0.25)"
                      stroke="#818cf8"
                      strokeWidth={1}
                    />
                    <text
                      x={0}
                      y={-29}
                      textAnchor="middle"
                      className="fill-indigo-200 font-mono text-[10px] font-semibold"
                    >
                      {ptrLabel}
                    </text>
                  </g>
                )}

                {node.inQueue && !hasPointers && (
                  <circle
                    r={24}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={1.5}
                    strokeDasharray="3 2"
                  />
                )}

                <circle
                  r={19}
                  fill={
                    node.changed
                      ? 'rgba(16, 185, 129, 0.28)'
                      : hasPointers
                        ? 'rgba(99, 102, 241, 0.28)'
                        : '#171d2c'
                  }
                  stroke={
                    node.changed
                      ? '#34d399'
                      : hasPointers
                        ? '#818cf8'
                        : node.inQueue
                          ? '#fbbf24'
                          : '#475569'
                  }
                  strokeWidth={hasPointers || node.changed ? 2.4 : 1.6}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  className="fill-slate-100 font-mono text-xs font-semibold"
                >
                  {node.valDisplay}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
