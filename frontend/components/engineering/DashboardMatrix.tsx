/* PREMA ENGINEERING WORKS — Shared Dashboard Matrix */
/*
 * Consolidated from four independently-written but structurally identical
 * tables: Industries.tsx's Capability Matrix, QualityVerification.tsx's
 * Quality Control Matrix, TechnicalResourceLibrary.tsx's Engineering
 * Reference Matrix, and EmergencyBreakdownCenter.tsx's Emergency Response
 * Matrix. Same engineering-dashboard table styling throughout: sticky
 * left header column, muted "·" for uncovered cells, signal-red "✓" for
 * covered ones.
 *
 * The one real layout difference between the originals — Industries'
 * column headers show an icon above the label, the other three show a
 * plain text label — is handled by the optional `icon` field on
 * MatrixColumn rather than by forking the component.
 */

import TechnicalIcon from '@/components/TechnicalIcon';
import type { MatrixColumn, MatrixRow } from '@/types/engineering';

interface DashboardMatrixProps<T extends string> {
  eyebrow?: string;
  title: string;
  description: string;
  rowHeaderLabel: string;
  columns: MatrixColumn<T>[];
  rows: MatrixRow<T>[];
  footnote: string;
  coveredLabel?: string;
  notCoveredLabel?: string;
  /** Table gets wide once there are many columns (Industries has 10) —
   *  callers set this so the table scrolls horizontally instead of
   *  squashing columns unreadably thin. */
  minWidthPx?: number;
}

export default function DashboardMatrix<T extends string>({
  eyebrow = 'Engineering Dashboard',
  title,
  description,
  rowHeaderLabel,
  columns,
  rows,
  footnote,
  coveredLabel = 'Covered at this stage',
  notCoveredLabel = 'Not a primary focus here',
  minWidthPx = 680,
}: DashboardMatrixProps<T>) {
  return (
    <div className="mt-20">
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">{eyebrow}</p>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h3>
        <p className="text-foreground/70 mt-4">{description}</p>
      </div>

      <div className="border border-border bg-primary text-primary-foreground overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: `${minWidthPx}px` }}>
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-primary text-left p-3 border-b border-r border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50 w-56">
                {rowHeaderLabel}
              </th>
              {columns.map((col) => (
                <th key={col.id} className="p-3 border-b border-white/10 text-center align-bottom">
                  {col.icon ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <TechnicalIcon type={col.icon} className="w-4 h-4 text-white/50" />
                      <span className="text-[9px] font-bold tracking-wider uppercase text-white/50 leading-tight">
                        {col.label}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-bold tracking-wider uppercase text-white/50 leading-tight">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={row.id} className={rowIdx % 2 === 1 ? 'bg-white/[0.02]' : ''}>
                <td className="sticky left-0 z-10 bg-primary p-3 border-r border-white/10 text-xs font-medium text-white/80 whitespace-nowrap">
                  {row.numberLabel && (
                    <span className="text-white/30 font-mono text-[10px] mr-2">{row.numberLabel}</span>
                  )}
                  {row.label}
                </td>
                {columns.map((col) => {
                  const covered = row.coverage.includes(col.id);
                  return (
                    <td key={col.id} className="p-3 text-center">
                      {covered ? (
                        <span className="text-accent text-sm leading-none" aria-label={coveredLabel}>
                          ✓
                        </span>
                      ) : (
                        <span className="text-white/15 text-sm leading-none" aria-label={notCoveredLabel}>
                          ·
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-foreground/50 mt-3">{footnote}</p>
    </div>
  );
}
