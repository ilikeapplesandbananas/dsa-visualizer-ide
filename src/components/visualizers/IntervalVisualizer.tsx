import React from 'react';
import type { IntervalViewModel } from '../../engine/structureDetector';

interface IntervalVisualizerProps {
  intervals: IntervalViewModel[];
}

export const IntervalVisualizer: React.FC<IntervalVisualizerProps> = ({ intervals }) => {
  if (intervals.length === 0) return null;

  return (
    <div className="space-y-3">
      {intervals.map((iv) => {
        const span = Math.max(1, iv.maxVal - iv.minVal);
        const tickCount = Math.min(8, Math.max(3, span + 1));
        const activeSet = new Set(iv.activeIndices);

        return (
          <div
            key={iv.id}
            className="rounded-xl border border-[#232634] bg-[#14161e] px-4 py-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-[#d7dce6]">
                {iv.name}
              </span>
              <span className="text-[11px] text-[#72798c]">
                [{iv.minVal} .. {iv.maxVal}] · {iv.items.length} interval{iv.items.length === 1 ? '' : 's'}
              </span>
            </div>

            {iv.items.length === 0 ? (
              <div className="py-3 text-center text-xs italic text-[#687082]">
                empty intervals
              </div>
            ) : (
              <div className="space-y-2">
                {iv.items.map((bar) => {
                  const leftPct = ((bar.start - iv.minVal) / span) * 100;
                  const widthPct = Math.max(3, ((bar.end - bar.start) / span) * 100);
                  const isActive = activeSet.has(bar.index);

                  return (
                    <div key={bar.index} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 font-mono text-[11px] text-[#838b9e]">
                        [{bar.start}, {bar.end}]
                      </span>
                      <div className="relative h-5 flex-1 rounded bg-[#191b25]">
                        <div
                          className={`absolute top-1 bottom-1 rounded transition-all duration-200 ${
                            isActive
                              ? 'border border-[#90a4ff] bg-[#7c90ff]/35'
                              : bar.changed
                                ? 'border border-[#5eead4]/60 bg-[#2dd4bf]/20'
                                : 'border border-[#383e54] bg-[#262b3d]'
                          }`}
                          style={{
                            left: `${Math.min(97, Math.max(0, leftPct))}%`,
                            width: `${Math.min(100 - Math.max(0, leftPct), widthPct)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="ml-[76px] flex justify-between border-t border-[#1e212e] pt-1 font-mono text-[10px] text-[#666d80]">
                  {Array.from({ length: tickCount }, (_, i) => {
                    const val = Math.round(iv.minVal + (span * i) / (tickCount - 1));
                    return <span key={i}>{val}</span>;
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
