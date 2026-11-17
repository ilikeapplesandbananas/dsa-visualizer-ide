import React from 'react';
import type { StackQueueViewModel } from '../../engine/structureDetector';

interface StackQueueVisualizerProps {
  items: StackQueueViewModel[];
}

export const StackQueueVisualizer: React.FC<StackQueueVisualizerProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((sq) => (
        <div
          key={sq.id}
          className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-[#b4bccb]">
              {sq.name}
            </span>
            <span className="text-[11px] text-[#6d7488]">
              {sq.kind === 'queue' ? 'Queue (FIFO)' : 'Stack (LIFO)'} · {sq.items.length}
            </span>
          </div>

          {sq.items.length === 0 ? (
            <div className="py-2 text-xs italic text-[#60677a]">empty</div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {sq.kind === 'queue' && (
                <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-[#666d80]">
                  front →
                </span>
              )}
              {sq.items.map((item, idx) => {
                const isHead =
                  (sq.kind === 'queue' && idx === 0) ||
                  (sq.kind === 'stack' && idx === sq.items.length - 1);
                return (
                  <div
                    key={idx}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
                      isHead
                        ? 'border-[#7c90f6] bg-[#1a2036] text-[#dce4ff]'
                        : item.changed
                          ? 'border-[#5eead4]/60 bg-[#142929] text-[#ccfbf1]'
                          : 'border-[#252836] bg-[#151720] text-[#c7cfdf]'
                    }`}
                  >
                    {item.display}
                  </div>
                );
              })}
              {sq.kind === 'stack' && (
                <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-[#666d80]">
                  ← top
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
