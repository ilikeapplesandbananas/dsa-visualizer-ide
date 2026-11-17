import React from 'react';
import type { HeapViewModel } from '../../engine/structureDetector';

interface HeapVisualizerProps {
  heaps: HeapViewModel[];
}

export const HeapVisualizer: React.FC<HeapVisualizerProps> = ({ heaps }) => {
  if (heaps.length === 0) return null;

  return (
    <div className="space-y-3">
      {heaps.map((heap) => {
        const showTree = heap.items.length > 0 && heap.items.length <= 15;
        const levels = showTree ? Math.floor(Math.log2(heap.items.length)) + 1 : 0;
        const svgHeight = Math.max(88, levels * 52 + 18);
        const svgWidth = 440;

        const positions = heap.items.map((_, idx) => {
          const depth = Math.floor(Math.log2(idx + 1));
          const levelStart = Math.pow(2, depth) - 1;
          const posInLevel = idx - levelStart;
          const totalInLevel = Math.pow(2, depth);
          const x = ((posInLevel + 0.5) / totalInLevel) * svgWidth;
          const y = 26 + depth * 48;
          return { x, y };
        });

        return (
          <div
            key={heap.id}
            className="rounded-xl border border-[#232634] bg-[#14161e] px-4 py-3"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium text-[#d7dce6]">
                  {heap.name}
                </span>
                <span className="rounded bg-[#1c1f2b] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#9db2ff]">
                  {heap.comparator === 'max' ? 'max-heap' : 'min-heap'}
                </span>
              </div>
              <span className="text-[11px] text-[#72798c]">
                {heap.items.length} item{heap.items.length === 1 ? '' : 's'}
              </span>
            </div>

            {heap.items.length === 0 ? (
              <div className="py-3 text-center text-xs italic text-[#687082]">
                empty priority queue
              </div>
            ) : (
              <div className="space-y-3">
                {showTree && (
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="mx-auto block w-full max-w-[440px] overflow-visible"
                  >
                    {heap.items.map((_, idx) => {
                      if (idx === 0) return null;
                      const parent = Math.floor((idx - 1) / 2);
                      const pPos = positions[parent];
                      const cPos = positions[idx];
                      return (
                        <line
                          key={`edge-${parent}-${idx}`}
                          x1={pPos.x}
                          y1={pPos.y}
                          x2={cPos.x}
                          y2={cPos.y}
                          stroke="#292d3d"
                          strokeWidth={1.4}
                        />
                      );
                    })}
                    {heap.items.map((item, idx) => {
                      const pos = positions[idx];
                      const isTop = idx === 0;
                      const label = item.display.length > 10 ? item.display.slice(0, 9) + '…' : item.display;
                      const pillWidth = Math.max(36, Math.min(76, label.length * 7.5 + 14));
                      return (
                        <g key={`node-${idx}`}>
                          <rect
                            x={pos.x - pillWidth / 2}
                            y={pos.y - 14}
                            width={pillWidth}
                            height={28}
                            rx={7}
                            fill={isTop ? '#1d2236' : '#181a24'}
                            stroke={isTop ? '#8b9eff' : item.changed ? '#5eead4' : '#2a2e3e'}
                            strokeWidth={isTop || item.changed ? 1.5 : 1}
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 4}
                            textAnchor="middle"
                            className="font-mono text-[11px] font-medium"
                            fill={isTop ? '#d9e2ff' : '#d6dae4'}
                          >
                            {label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}

                <div className="flex flex-wrap items-center gap-1.5 border-t border-[#1e212e] pt-2.5">
                  {heap.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs transition-colors ${
                        idx === 0
                          ? 'border-[#7c8ef7]/60 bg-[#1c2135] text-[#dce3ff]'
                          : item.changed
                            ? 'border-[#3b4b6b] bg-[#191d2b] text-[#d6dae4]'
                            : 'border-[#252836] bg-[#161821] text-[#b4bccb]'
                      }`}
                    >
                      <span className="text-[10px] text-[#6d7487]">
                        {idx === 0 ? 'top' : idx}
                      </span>
                      <span>{item.display}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
