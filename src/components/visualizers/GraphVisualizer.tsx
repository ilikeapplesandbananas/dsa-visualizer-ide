import React from 'react';
import type { GraphViewModel } from '../../engine/structureDetector';

interface Props {
  model: GraphViewModel;
}

export const GraphVisualizer: React.FC<Props> = ({ model }) => {
  const n = model.nodes.length;
  const width = 440;
  const height = 270;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(96, Math.max(55, n * 16));
  const nodeRadius = 20;

  const coords = new Map<string, { x: number; y: number }>();
  model.nodes.forEach((node, idx) => {
    const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / Math.max(1, n);
    coords.set(node.id, {
      x: n === 1 ? cx : cx + radius * Math.cos(angle),
      y: n === 1 ? cy : cy + radius * Math.sin(angle),
    });
  });

  const edgeSet = new Set(model.edges.map((e) => `${e.from}->${e.to}`));

  const getNodeColors = (status: string) => {
    switch (status) {
      case 'active':
        return { fill: 'rgba(99, 102, 241, 0.3)', stroke: '#818cf8' };
      case 'queued':
        return { fill: 'rgba(251, 191, 36, 0.2)', stroke: '#fbbf24' };
      case 'visiting':
        return { fill: 'rgba(244, 114, 182, 0.25)', stroke: '#f472b6' };
      case 'visited':
        return { fill: 'rgba(16, 185, 129, 0.24)', stroke: '#34d399' };
      default:
        return { fill: '#171d2c', stroke: '#475569' };
    }
  };

  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-sky-300 border border-sky-500/25">
            {model.name} (Graph)
          </span>
          <span className="text-[11px] text-slate-400">
            {model.nodes.length}V · {model.edges.length}E
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-400" /> active</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> queued</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> visited</span>
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[460px] h-[250px]">
          <defs>
            <marker id="graph-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#64748b" />
            </marker>
          </defs>

          {model.edges.map((edge, idx) => {
            const p1 = coords.get(edge.from);
            const p2 = coords.get(edge.to);
            if (!p1 || !p2) return null;

            if (edge.from === edge.to) {
              return (
                <circle
                  key={`self-${idx}`}
                  cx={p1.x}
                  cy={p1.y - 24}
                  r={11}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={1.6}
                />
              );
            }

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const hasReverse = edge.directed && edgeSet.has(`${edge.to}->${edge.from}`);
            const sx = p1.x + ux * nodeRadius;
            const sy = p1.y + uy * nodeRadius;
            const ex = p2.x - ux * (nodeRadius + (edge.directed ? 4 : 0));
            const ey = p2.y - uy * (nodeRadius + (edge.directed ? 4 : 0));

            if (hasReverse) {
              const nx = -uy * 18;
              const ny = ux * 18;
              const ctrlX = (sx + ex) / 2 + nx;
              const ctrlY = (sy + ey) / 2 + ny;
              return (
                <path
                  key={`ge-${idx}`}
                  d={`M ${sx} ${sy} Q ${ctrlX} ${ctrlY} ${ex} ${ey}`}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth={1.6}
                  markerEnd={edge.directed ? 'url(#graph-arrow)' : undefined}
                />
              );
            }

            return (
              <line
                key={`ge-${idx}`}
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="#64748b"
                strokeWidth={1.6}
                markerEnd={edge.directed ? 'url(#graph-arrow)' : undefined}
              />
            );
          })}

          {model.nodes.map((node) => {
            const p = coords.get(node.id);
            if (!p) return null;
            const colors = getNodeColors(node.status);
            return (
              <g key={node.id} transform={`translate(${p.x}, ${p.y})`}>
                {node.pointers.length > 0 && (
                  <text
                    x={0}
                    y={-26}
                    textAnchor="middle"
                    className="fill-indigo-300 font-mono text-[10px] font-semibold"
                  >
                    {node.pointers.join(',')}
                  </text>
                )}
                <circle
                  r={nodeRadius}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={node.status === 'active' ? 2.4 : 1.7}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  className="fill-slate-100 font-mono text-xs font-semibold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

