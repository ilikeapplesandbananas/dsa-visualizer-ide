import React from 'react';
import type { ArrayViewModel } from '../../engine/structureDetector';
import type { FormulaCallout } from '../../engine/stepNarrator';

interface ArrayVisualizerProps {
  arrays: ArrayViewModel[];
  forceBars?: boolean;
  rightMeta?: string;
  formula?: FormulaCallout;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  arrays,
  forceBars = false,
  rightMeta,
  formula,
}) => {
  if (arrays.length === 0) return null;

  return (
    <div className="space-y-4">
      {arrays.map((arr, arrIdx) => {
        const useBars =
          (forceBars || arr.preferBars) &&
          arr.items.length > 0 &&
          arr.items.every((it) => it.numericValue !== null);
        const maxAbs = useBars
          ? Math.max(1, ...arr.items.map((it) => Math.abs(it.numericValue ?? 0)))
          : 1;

        return (
          <div
            key={arr.id}
            className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4"
          >
            {/* Header Row */}
            <div className="mb-3.5 flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-[#b4bccb]">
                {arr.name}
              </span>
              <span className="font-mono text-xs text-[#6f7688]">
                {arrIdx === 0 && rightMeta
                  ? rightMeta
                  : arr.windowRange
                    ? `${arr.windowRange.label} [${arr.windowRange.start}..${arr.windowRange.end}]`
                    : `len ${arr.items.length}`}
              </span>
            </div>

            {arr.items.length === 0 ? (
              <div className="py-5 text-center font-mono text-xs italic text-[#646b7d]">
                []
              </div>
            ) : useBars ? (
              <div className="flex h-44 items-end gap-2 pt-7 pb-6">
                {arr.items.map((item) => {
                  const val = Math.max(0, item.numericValue ?? 0);
                  const heightPct = Math.max(8, (val / maxAbs) * 100);
                  const cellPointers = arr.pointers.filter((p) => p.index === item.index);
                  const inWindow =
                    arr.windowRange &&
                    item.index >= arr.windowRange.start &&
                    item.index <= arr.windowRange.end;
                  const isActive = cellPointers.length > 0;

                  return (
                    <div
                      key={item.index}
                      className="relative flex h-full min-w-[24px] flex-1 flex-col items-center justify-end"
                    >
                      {isActive && (
                        <div className="absolute -top-6 flex flex-wrap justify-center gap-1">
                          {cellPointers.map((ptr) => (
                            <span
                              key={ptr.name}
                              className="font-mono text-[10px] font-medium text-[#9db2ff]"
                            >
                              {ptr.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`w-full max-w-[44px] rounded-t-md border transition-all duration-200 ${
                          isActive
                            ? 'border-[#8fa3ff] bg-[#7d93ff]/30'
                            : item.changed
                              ? 'border-[#5eead4]/70 bg-[#2dd4bf]/20'
                              : inWindow
                                ? 'border-[#566494] bg-[#21273d]'
                                : 'border-[#272b3a] bg-[#191c26]'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />

                      <span className="mt-1 font-mono text-[10px] text-[#9aa3b8]">
                        {item.display}
                      </span>
                      <span className="font-mono text-[9px] text-[#5e6577]">
                        {item.index}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto pb-1">
                <div
                  className={`inline-flex min-w-full justify-center pt-5 ${
                    arr.items.length > 10 ? 'gap-1.5' : 'gap-2.5'
                  }`}
                >
                  {arr.items.map((item) => {
                    const cellPointers = arr.pointers.filter((p) => p.index === item.index);
                    const inWindow =
                      arr.windowRange &&
                      item.index >= arr.windowRange.start &&
                      item.index <= arr.windowRange.end;
                    const primaryPtr = cellPointers.find((p) =>
                      /^(i|j|mid|m|r|right|curr|head|fast|hi)$/i.test(p.name)
                    );
                    const isPrimary = Boolean(primaryPtr) || (cellPointers.length > 0 && arr.pointers[0]?.index === item.index);
                    const hasAnyPointer = cellPointers.length > 0;
                    const compact = arr.items.length > 10;

                    return (
                      <div
                        key={item.index}
                        className="relative flex flex-col items-center"
                      >
                        {/* Pointer label cleanly floating above box */}
                        <div className="absolute -top-5 flex h-4 items-center gap-1 whitespace-nowrap">
                          {cellPointers.map((ptr) => (
                            <span
                              key={ptr.name}
                              className={`font-mono text-[10px] font-medium ${
                                isPrimary ? 'text-[#9db2ff]' : 'text-[#7c87a3]'
                              }`}
                            >
                              {ptr.name === 'i' || ptr.name === 'j' || ptr.name === 'l' || ptr.name === 'r'
                                ? `${ptr.name} = ${item.index}`
                                : ptr.name}
                            </span>
                          ))}
                        </div>

                        {/* Matte Tile */}
                        <div
                          className={`flex items-center justify-center rounded-lg border font-mono font-medium transition-all duration-150 ${
                            compact
                              ? 'min-w-[34px] px-2 py-2 text-xs'
                              : 'min-w-[54px] px-3 py-3 text-sm'
                          } ${
                            isPrimary
                              ? 'border-[#7c90f6] bg-[#1a2036] text-[#e6ebff] shadow-[0_0_0_1px_rgba(124,144,246,0.2)]'
                              : hasAnyPointer
                                ? 'border-[#3d4766] bg-[#171b29] text-[#d5dcf0]'
                                : item.changed
                                  ? 'border-[#4b608a] bg-[#181d2b] text-[#d9e2ff]'
                                  : inWindow
                                    ? 'border-[#495580] bg-[#171b2a] text-[#dce2f0]'
                                    : 'border-[#252836] bg-[#151720] text-[#b4bccd]'
                          }`}
                        >
                          {item.display}
                        </div>

                        {/* Index below tile */}
                        <span className="mt-1.5 font-mono text-[10px] text-[#60677a]">
                          {item.index}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Embedded Equation / Formula Strip matching screenshot */}
            {arrIdx === 0 && formula && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1c1f2b] pt-3">
                <span className="font-mono text-xs text-[#6f7688]">
                  {formula.label}
                </span>
                <span className="font-mono text-sm tracking-wide text-[#e2e7f2]">
                  {formula.expression}
                </span>
                {formula.badge ? (
                  <span
                    className={`font-mono text-xs font-medium ${
                      formula.badgeOk ? 'text-[#9db2ff]' : 'text-[#7a8296]'
                    }`}
                  >
                    {formula.badge}
                  </span>
                ) : (
                  <span className="w-12" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
