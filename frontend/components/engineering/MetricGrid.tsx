/* PREMA ENGINEERING WORKS — Shared Metric Grid */
/*
 * Consolidated from QualityVerification.tsx and EmergencyBreakdownCenter.tsx,
 * whose per-stage metrics blocks were byte-for-byte identical. Engineering-
 * dashboard styling, deliberately not the bigger "KPI stat" treatment used
 * elsewhere (e.g. CaseStudies' closing stat strip) — values render in
 * font-mono, like an instrument readout, not a marketing number.
 */

import type { Metric } from '@/types/engineering';

interface MetricGridProps {
  metrics: Metric[];
}

export default function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="p-4 border border-white/10 bg-white/[0.03]">
          <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1.5">
            {metric.label}
          </p>
          <p className="text-lg font-bold text-accent font-mono mb-1.5 leading-tight">{metric.value}</p>
          <p className="text-[11px] text-white/60 leading-snug">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}
