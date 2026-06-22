/* PREMA ENGINEERING WORKS — Shared Console Panel */
/*
 * The dark "dashboard console" shell — bordered card, near-black
 * background, faint engineering grid backdrop — embedded inside an
 * otherwise light section. Used by Industries.tsx, QualityVerification.tsx,
 * TechnicalResourceLibrary.tsx, and EmergencyBreakdownCenter.tsx as the
 * outer wrapper around their interactive timeline + visualization layout.
 *
 * Only the shell is shared; each phase keeps its own inner grid markup
 * (column spans, ref placement, optional connector SVG overlay) as
 * children, since those genuinely differ per phase.
 *
 * CaseStudies.tsx and EngineeringIntelligence.tsx apply the same grid
 * backdrop directly to a full-bleed black <section>, not to an embedded
 * card — a different layout primitive, intentionally left as-is rather
 * than forced through this component.
 */

import type { ReactNode } from 'react';

interface ConsolePanelProps {
  children: ReactNode;
  className?: string;
}

export default function ConsolePanel({ children, className = '' }: ConsolePanelProps) {
  return (
    <div className={`relative border border-border bg-primary text-primary-foreground overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {children}
    </div>
  );
}
