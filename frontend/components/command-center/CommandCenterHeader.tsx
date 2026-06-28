/* PREMA ENGINEERING WORKS — Command Center Header */
/* Server Component: Static header section for the Engineering Command Center */

import TechnicalIcon from '@/components/TechnicalIcon';

export default function CommandCenterHeader() {
  return (
    <section aria-label="Command Center Header" className="border-b border-border bg-card">
      <div className="container py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
              Engineering Workspace
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
              Command Center
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
              Unified engineering reference workspace. Materials database, tolerance specifications,
              thread standards, bearing catalogs, and cross-referencing tools — engineered for
              precision manufacturing workflows.
            </p>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <TechnicalIcon type="engineering" className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
              PREMA Engineering Works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}