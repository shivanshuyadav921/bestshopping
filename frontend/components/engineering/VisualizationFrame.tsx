/* PREMA ENGINEERING WORKS — Shared Visualization Frame */
/*
 * Consolidated from three byte-for-byte identical panels: the stage
 * visualization frame in QualityVerification.tsx and
 * EmergencyBreakdownCenter.tsx, and the (near-identical, minus the
 * connector ref) illustration frame in TechnicalResourceLibrary.tsx.
 *
 * CaseStudies.tsx's visual panel is deliberately NOT folded into this —
 * it carries extra behavior (before/after photo toggle, dimension
 * overlay, scanning-grid diagnostic effect, a "verified" strip) that
 * none of the other three have, so forcing it through this shared frame
 * would mean either stripping those features or bloating this component
 * with CaseStudies-only props. It still reuses the one piece that
 * genuinely is identical — CornerBrackets.
 */

import type { ReactNode } from 'react';
import CornerBrackets from './CornerBrackets';

interface VisualizationFrameProps {
  panelRef?: React.RefObject<HTMLDivElement | null> | ((el: HTMLDivElement | null) => void) | null;
  statusLeft: string;
  statusRight: string;
  children: ReactNode;
  className?: string;
}

export default function VisualizationFrame({
  panelRef,
  statusLeft,
  statusRight,
  children,
  className = '',
}: VisualizationFrameProps) {
  return (
    <div
      ref={panelRef}
      className={`relative aspect-[4/3] sm:aspect-video border border-white/10 bg-black/30 overflow-hidden ${className}`}
    >
      <CornerBrackets />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-white/50 z-10">
        <span>{statusLeft}</span>
        <span className="text-accent text-right">{statusRight}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
        <div className="w-full max-w-[280px]">{children}</div>
      </div>
    </div>
  );
}
