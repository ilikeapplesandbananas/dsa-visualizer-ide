import React from 'react';
import type { MapViewModel, SetViewModel } from '../../engine/structureDetector';
import type { MapAnnotation } from '../../engine/stepNarrator';

interface HashMapSetVisualizerProps {
  maps: MapViewModel[];
  sets: SetViewModel[];
  mapAnnotation?: MapAnnotation;
}

export const HashMapSetVisualizer: React.FC<HashMapSetVisualizerProps> = ({
  maps,
  sets,
  mapAnnotation,
}) => {
  if (maps.length === 0 && sets.length === 0) return null;

  return (
    <div className="space-y-3">
      {maps.map((mp, idx) => {
        const keyHeader = idx === 0 && mapAnnotation ? mapAnnotation.keyLabel : 'KEY';
        const valHeader = idx === 0 && mapAnnotation ? mapAnnotation.valueLabel : 'VALUE';

        return (
          <div
            key={mp.id}
            className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-[#b4bccb]">
                {mp.name}
              </span>
              <span className="text-[11px] text-[#6a7183]">
                Hash map
              </span>
            </div>

            {mp.entries.length === 0 ? (
              <div className="py-2 text-xs italic text-[#60677a]">
                {'{ } empty'}
              </div>
            ) : (
              <div>
                <div className="mb-1.5 grid grid-cols-[1fr_auto] items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[#61687a]">
                  <div className="flex items-center gap-5">
                    <span className="min-w-[44px]">{keyHeader}</span>
                    <span className="w-3" />
                    <span>{valHeader}</span>
                  </div>
                </div>

                <div className="divide-y divide-[#1a1d28]">
                  {mp.entries.map((entry) => {
                    const cleanKey = entry.key.replace(/^['"]|['"]$/g, '');
                    const isHighlighted =
                      idx === 0 &&
                      mapAnnotation?.highlightKey !== undefined &&
                      cleanKey === mapAnnotation.highlightKey;
                    const noteText =
                      idx === 0 && mapAnnotation
                        ? mapAnnotation.noteFormatter(mp.name, entry.key, entry.valueDisplay)
                        : `${mp.name}[${entry.key}] = ${entry.valueDisplay}`;

                    return (
                      <div
                        key={entry.key}
                        className={`flex items-center justify-between py-1.5 font-mono text-xs transition-colors ${
                          isHighlighted
                            ? 'text-[#dce4ff]'
                            : entry.changed
                              ? 'text-[#9db2ff]'
                              : 'text-[#cfd6e6]'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <span
                            className={`min-w-[44px] font-medium ${
                              isHighlighted ? 'text-[#9db2ff]' : 'text-[#e3e8f4]'
                            }`}
                          >
                            {entry.key}
                          </span>
                          <span className="text-[#5e6578]">→</span>
                          <span>{entry.valueDisplay}</span>
                        </div>
                        <span className="text-[11px] text-[#6d7589]">{noteText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {sets.map((st) => (
        <div
          key={st.id}
          className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-[#b4bccb]">
              {st.name}
            </span>
            <span className="text-[11px] text-[#6a7183]">
              Hash set · {st.items.length}
            </span>
          </div>

          {st.items.length === 0 ? (
            <div className="py-1.5 text-xs italic text-[#60677a]">empty set</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {st.items.map((item, idx) => (
                <span
                  key={idx}
                  className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
                    item.changed
                      ? 'border-[#7c90f6] bg-[#1a2036] text-[#dce4ff]'
                      : 'border-[#252836] bg-[#151720] text-[#c7cfdf]'
                  }`}
                >
                  {item.display}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
