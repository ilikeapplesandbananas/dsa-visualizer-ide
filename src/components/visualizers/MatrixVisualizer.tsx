import React from 'react';
import type { MatrixViewModel } from '../../engine/structureDetector';

interface MatrixVisualizerProps {
  matrices: MatrixViewModel[];
}

function getMatrixCellClasses(display: string, isActive: boolean, changed: boolean): string {
  const clean = display.replace(/^['"]|['"]$/g, '');
  if (isActive) {
    return 'border-[#8ea3ff] bg-[#1e2645] text-[#eef2ff] shadow-[0_0_0_1px_rgba(142,163,255,0.35)]';
  }
  if (changed) {
    return 'border-[#5eead4]/60 bg-[#142929] text-[#ccfbf1]';
  }
  if (clean === '2' || clean === 'rotten') {
    return 'border-[#59352b] bg-[#241614] text-[#fda486]';
  }
  if (clean === '1' || clean === 'land') {
    return 'border-[#253b31] bg-[#13211b] text-[#7dd3a8]';
  }
  if (clean === '0') {
    return 'border-[#20232f] bg-[#13151c] text-[#555c6e]';
  }
  if (clean === '#') {
    return 'border-[#2e3242] bg-[#1f2330] text-[#7c849c]';
  }
  const num = Number(clean);
  if (Number.isFinite(num) && clean !== '') {
    return num > 0
      ? 'border-[#2c334a] bg-[#171b2a] text-[#d6def5]'
      : 'border-[#212430] bg-[#14161e] text-[#737b90]';
  }
  return 'border-[#252836] bg-[#151720] text-[#c4ccdc]';
}

export const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({ matrices }) => {
  if (matrices.length === 0) return null;

  return (
    <div className="space-y-3">
      {matrices.map((mat) => {
        const numCols = mat.rows[0]?.length ?? 0;

        return (
          <div
            key={mat.id}
            className="rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-medium text-[#b4bccb]">
                {mat.name}
              </span>
              <span className="font-mono text-[11px] text-[#6d7488]">
                {mat.rows.length} × {numCols}
                {mat.activeRow !== null && mat.activeCol !== null
                  ? ` · (${mat.activeRow}, ${mat.activeCol})`
                  : ''}
              </span>
            </div>

            {mat.rows.length === 0 ? (
              <div className="py-3 text-center font-mono text-xs italic text-[#60677a]">
                [ ] empty grid
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="mx-auto border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="w-6" />
                      {Array.from({ length: numCols }, (_, c) => (
                        <th
                          key={c}
                          className={`pb-1 font-mono text-[10px] font-normal ${
                            mat.activeCol === c ? 'text-[#9db2ff]' : 'text-[#5b6274]'
                          }`}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mat.rows.map((row, r) => (
                      <tr key={r}>
                        <td
                          className={`pr-1.5 text-right font-mono text-[10px] ${
                            mat.activeRow === r ? 'text-[#9db2ff]' : 'text-[#5b6274]'
                          }`}
                        >
                          {r}
                        </td>
                        {row.map((cell) => {
                          const isActive =
                            mat.activeRow === cell.r && mat.activeCol === cell.c;
                          return (
                            <td key={cell.c}>
                              <div
                                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md border px-2 font-mono text-xs font-medium transition-colors ${getMatrixCellClasses(
                                  cell.display,
                                  isActive,
                                  cell.changed
                                )}`}
                              >
                                {cell.display.replace(/^['"]|['"]$/g, '')}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
