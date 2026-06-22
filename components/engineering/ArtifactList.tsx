/* PREMA ENGINEERING WORKS — Shared Artifact List */
/*
 * Consolidated from QualityVerification.tsx and EmergencyBreakdownCenter.tsx,
 * which each defined an identical `ArtifactGlyph` SVG and an identical
 * artifacts-row layout. Deliberately not styled as a button — no
 * border-radius, no hover affordance — these represent generated
 * documents, not downloads.
 */

import type { Artifact } from '@/types/engineering';

function ArtifactGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40 shrink-0">
      <path d="M5 2h10l4 4v16H5z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M15 2v4h4" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 11h8M8 14.5h8M8 18h5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

interface ArtifactListProps {
  /** "Artifacts Generated" (QualityVerification) vs. "Documents Generated"
   *  (EmergencyBreakdownCenter) — left as a required prop rather than a
   *  default since the two existing callers genuinely disagree on wording. */
  title: string;
  artifacts: Artifact[];
}

export default function ArtifactList({ title, artifacts }: ArtifactListProps) {
  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-4">{title}</p>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {artifacts.map((artifact) => (
          <div key={artifact.code} className="flex items-center gap-2.5">
            <ArtifactGlyph />
            <div>
              <p className="text-xs text-white/80 leading-snug">{artifact.name}</p>
              <p className="text-[9px] font-mono tracking-wider text-white/40">{artifact.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
