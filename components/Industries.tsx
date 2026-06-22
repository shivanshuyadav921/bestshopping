/* PREMA ENGINEERING WORKS — Industries We Keep Running (Phase 7) */
/* Design: Same engineering-documentation language as every prior phase —   */
/* numbered badge cards, accent-line reveals, Space Grotesk/Inter, signal-  */
/* red accent. No new visual language introduced.                          */
/*                                                                          */
/* Core experience: a connected industrial knowledge map, not service       */
/* cards. Selecting an industry from the index drives a live network —     */
/* a hub node connected by measured, animated SVG paths to four category   */
/* nodes (Challenges / Components / Engineering Services / Applications).  */
/* Connector geometry is computed from real DOM positions (ResizeObserver  */
/* + getBoundingClientRect), not hard-coded coordinates, so it holds up    */
/* across breakpoints and content-length changes — genuinely a network,    */
/* not a decorative graphic standing in for one.                          */
/*                                                                          */
/* Below the map: a technical "Why Industries Trust PREMA" capability      */
/* legend, and a capability × industry matrix in an engineering-dashboard  */
/* table style. No case studies, stories, or metrics are repeated from     */
/* Phase 6 — this section establishes breadth, not proof.                 */

import { useRef, useState } from 'react';
import TechnicalIcon from './TechnicalIcon';
import { ConsolePanel, DashboardMatrix } from '@/components/engineering';
import { useHubConnectors } from '@/hooks/useMeasuredConnector';
import type { IconType, MatrixColumn } from '@/types/engineering';
import type { ConnectorPath } from '@/hooks/useMeasuredConnector';

/* ---------------------------------------------------------------------- */
/* Data                                                                    */
/* ---------------------------------------------------------------------- */

interface Industry {
  id: string;
  number: string;
  name: string;
  icon: IconType;
  challenges: string[];
  products: string[];
  solutions: string[];
  applications: string[];
  /* capability ids from CAPABILITIES this industry is NOT a primary fit for */
  gaps?: string[];
}

interface Capability {
  id: string;
  label: string;
  icon: IconType;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'reverse-engineering',
    label: 'Reverse Engineering',
    icon: 'design',
    description: 'Physical part in, working CAD model out — no original design file required.',
  },
  {
    id: 'no-drawing',
    label: 'No Drawing Required',
    icon: 'broken',
    description: 'Geometry reconstructed from the component itself through dimensional scanning.',
  },
  {
    id: 'emergency',
    label: 'Emergency Manufacturing',
    icon: 'urgent',
    description: 'Production-stoppage requests prioritized ahead of the standard queue.',
  },
  {
    id: 'oem-replacement',
    label: 'OEM Replacement Capability',
    icon: 'oem',
    description: 'Exact-fit components manufactured for discontinued or imported machinery.',
  },
  {
    id: 'breakdown-support',
    label: 'Production Breakdown Support',
    icon: 'breakdown',
    description: 'Direct engineering response when the line is down — not a support ticket.',
  },
  {
    id: 'custom-manufacturing',
    label: 'Custom Manufacturing',
    icon: 'machining',
    description: 'New components engineered from a requirement, a sketch, or a working sample.',
  },
  {
    id: 'precision-inspection',
    label: 'Precision Inspection',
    icon: 'inspection',
    description: 'CMM verification against the reconstructed model before any part leaves the floor.',
  },
];

const INDUSTRIES: Industry[] = [
  {
    id: 'packaging',
    number: '01',
    name: 'Packaging',
    icon: 'packaging',
    challenges: ['Frequent changeovers', 'Component wear from cycle speed', 'Production downtime'],
    products: ['Star Wheels', 'Guide Rails', 'Feed Screws', 'Change Parts'],
    solutions: ['Reverse Engineering', 'Emergency Manufacturing', 'Precision Replacement Parts'],
    applications: ['Labeling machines', 'Capping lines', 'Cartoning equipment'],
  },
  {
    id: 'beverage',
    number: '02',
    name: 'Beverage',
    icon: 'beverage',
    challenges: ['High-speed production', 'Wear on moving components', 'Line synchronization'],
    products: ['Splined Shafts', 'Conveyor Components', 'Precision Fixtures'],
    solutions: ['Tight-Tolerance Manufacturing', 'Rapid Replacement Parts'],
    applications: ['Filling lines', 'Bottling conveyors', 'Crating systems'],
  },
  {
    id: 'food-processing',
    number: '03',
    name: 'Food Processing',
    icon: 'food-processing',
    challenges: ['Hygienic design requirements', 'Continuous-duty wear', 'Sanitation washdown cycles'],
    products: ['Mixer Shafts', 'Auger Screws', 'Conveyor Sprockets'],
    solutions: ['Food-Grade Material Selection', 'Reverse Engineering', 'Precision Machining'],
    applications: ['Mixing & blending equipment', 'Conveyor systems', 'Portioning machinery'],
  },
  {
    id: 'pharmaceutical',
    number: '04',
    name: 'Pharmaceutical',
    icon: 'pharma',
    challenges: ['Clean operation', 'Precision requirements', 'Consistent performance'],
    products: ['Stainless Components', 'Feed Systems', 'Custom Assemblies'],
    solutions: ['Precision Machining', 'Material Selection Support'],
    applications: ['Filling machines', 'Tablet counting & packaging', 'Capsule handling'],
  },
  {
    id: 'chemical',
    number: '05',
    name: 'Chemical',
    icon: 'chemical',
    challenges: ['Corrosive media exposure', 'Sealing & containment integrity', 'Continuous-process reliability'],
    products: ['Pump Shafts', 'Valve Components', 'Agitator Parts'],
    solutions: ['Material Selection Support', 'Custom Manufacturing', 'Precision Inspection'],
    applications: ['Process pumps', 'Agitators & mixers', 'Dosing systems'],
  },
  {
    id: 'automation',
    number: '06',
    name: 'Automation Systems',
    icon: 'automation',
    challenges: ['Repeatability under cyclic load', 'Integration with existing equipment', 'Minimal-downtime servicing'],
    products: ['Precision Fixtures', 'Guide Rails', 'Drive Shafts'],
    solutions: ['Reverse Engineering', 'Tight-Tolerance Manufacturing', 'Emergency Manufacturing'],
    applications: ['Robotic end-effectors', 'Pick-and-place systems', 'Indexing stations'],
  },
  {
    id: 'material-handling',
    number: '07',
    name: 'Material Handling',
    icon: 'material-handling',
    challenges: ['Continuous-duty wear', 'Heavy cyclic loading', 'Component availability during downtime'],
    products: ['Conveyor Shafts', 'Sprockets', 'Rollers'],
    solutions: ['Emergency Manufacturing', 'Production Breakdown Support', 'OEM Replacement Parts'],
    applications: ['Conveyor systems', 'Sortation equipment', 'Palletizing lines'],
  },
  {
    id: 'custom-machinery',
    number: '08',
    name: 'Custom Machinery',
    icon: 'custom',
    challenges: ['One-off design requirements', 'No existing reference part', 'Tight project timelines'],
    products: ['Custom Assemblies', 'Fixtures', 'Specialty Components'],
    solutions: ['Custom Manufacturing', 'CAD Design Support', 'Precision Inspection'],
    applications: ['Special-purpose machines', 'Test rigs', 'Prototype equipment'],
    gaps: ['breakdown-support'],
  },
  {
    id: 'oem-support',
    number: '09',
    name: 'OEM Equipment Support',
    icon: 'oem',
    challenges: ['Discontinued machine models', 'No drawings available', 'Long import lead times'],
    products: ['OEM-Equivalent Shafts', 'Gears', 'Guide Rails'],
    solutions: ['Reverse Engineering', 'No Drawing Required', 'OEM Replacement Capability'],
    applications: ['Legacy production equipment', 'Imported machinery', 'Discontinued model support'],
    gaps: ['custom-manufacturing'],
  },
  {
    id: 'manufacturing-plants',
    number: '10',
    name: 'Manufacturing Plants',
    icon: 'plant',
    challenges: ['Multiple machine types on one floor', 'Unplanned breakdowns', 'Spare-parts inventory gaps'],
    products: ['Shafts', 'Gears', 'Guide Rails', 'Custom Fixtures'],
    solutions: ['Production Breakdown Support', 'Emergency Manufacturing', 'Reverse Engineering'],
    applications: ['General plant maintenance', 'Spare-parts stocking', 'Multi-line support'],
  },
];

const CATEGORY_DEFS: { id: 'challenges' | 'products' | 'solutions' | 'applications'; label: string; icon: IconType }[] = [
  { id: 'challenges', label: 'Common Challenges', icon: 'broken' },
  { id: 'products', label: 'Components Manufactured', icon: 'gear-part' },
  { id: 'solutions', label: 'Engineering Services', icon: 'engineering' },
  { id: 'applications', label: 'Typical Applications', icon: 'oem' },
];

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INDUSTRIES[activeIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { paths, hubAnchor, size } = useHubConnectors(
    containerRef,
    flexRef,
    hubRef,
    nodeRefs,
    [activeIndex]
  );

  return (
    <section id="industries" className="py-24 md:py-32 bg-background">
      <style>{`
        @keyframes prema-flow { to { stroke-dashoffset: -24; } }
        .prema-connector { stroke-dasharray: 5 5; animation: prema-flow 1.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .prema-connector { animation: none; }
        }
      `}</style>

      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 07 — Industrial Reach
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Industries We Keep Running
          </h2>
          <p className="text-lg text-foreground/70">
            Ten industrial sectors, one engineering discipline. Select a sector to see how its
            challenges, components, services, and applications connect.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Knowledge Map Console */}
        <ConsolePanel>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Industry Index */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
                {INDUSTRIES.map((industry, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={industry.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIndex(idx)}
                      className={`shrink-0 lg:shrink lg:w-full flex items-center gap-3 px-3 py-2.5 border-l-2 text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal ${
                        isActive
                          ? 'border-accent bg-white/[0.06] text-white'
                          : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-mono tracking-wider ${
                          isActive ? 'text-accent' : 'text-white/30'
                        }`}
                      >
                        {industry.number}
                      </span>
                      <TechnicalIcon type={industry.icon} className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-medium">{industry.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Network Map */}
            <div className="lg:col-span-9 p-4 sm:p-6 lg:p-10">
              <div ref={containerRef} className="relative">
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width={size.w || undefined}
                  height={size.h || undefined}
                  viewBox={`0 0 ${size.w} ${size.h}`}
                  preserveAspectRatio="none"
                >
                  {paths.map((p) => (
                    <path
                      key={p.id}
                      d={p.d}
                      fill="none"
                      stroke="var(--accent)"
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
                      className="prema-connector"
                    />
                  ))}
                  {hubAnchor && (
                    <circle cx={hubAnchor.x} cy={hubAnchor.y} r="3" fill="var(--accent)" />
                  )}
                </svg>

                <div
                  ref={flexRef}
                  className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch"
                >
                  {/* Hub Node */}
                  <div
                    ref={hubRef}
                    className="lg:w-52 shrink-0 relative p-5 border border-accent bg-white/[0.05] flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3"
                  >
                    <div className="absolute -top-1 -left-1 w-7 h-7 bg-accent text-accent-foreground flex items-center justify-center font-bold text-[11px] leading-none">
                      {active.number}
                    </div>
                    <div className="text-accent pt-1">
                      <TechnicalIcon type={active.icon} className="w-9 h-9" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1">
                        Active Sector
                      </p>
                      <p className="text-lg font-bold tracking-tight text-white leading-tight">
                        {active.name}
                      </p>
                    </div>
                  </div>

                  {/* Category Nodes */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CATEGORY_DEFS.map((cat) => {
                      const items =
                        cat.id === 'challenges'
                          ? active.challenges
                          : cat.id === 'products'
                          ? active.products
                          : cat.id === 'solutions'
                          ? active.solutions
                          : active.applications;
                      return (
                        <div
                          key={cat.id}
                          ref={(el: HTMLDivElement | null) => {
                            nodeRefs.current[cat.id] = el;
                          }}
                          className="relative p-4 border border-white/15 bg-black/30"
                        >
                          <div className="flex items-center gap-2 mb-3 text-white/50">
                            <TechnicalIcon type={cat.icon} className="w-4 h-4" />
                            <p className="text-[10px] font-bold tracking-widest uppercase">
                              {cat.label}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((item) => (
                              <span
                                key={item}
                                className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[11px] leading-snug"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConsolePanel>

        {/* Why Industries Trust PREMA */}
        <div className="mt-20">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
              Trust Layer
            </p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Why Industries Trust PREMA
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={cap.id}
                className="relative p-6 border border-border bg-background hover:border-accent transition-all duration-300 group"
              >
                <div className="absolute -top-1 -left-1 w-8 h-8 bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="mb-4 text-foreground/60 group-hover:text-accent transition-colors duration-300 pt-2">
                  <TechnicalIcon type={cap.icon} className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold tracking-tight mb-2">{cap.label}</h4>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DashboardMatrix<string>
          title="Capability Matrix"
          description="Where each capability applies across the sectors we serve."
          rowHeaderLabel="Capability"
          columns={INDUSTRIES.map((ind) => ({ id: ind.id, label: ind.name, icon: ind.icon }))}
          rows={CAPABILITIES.map((cap) => ({
            id: cap.id,
            label: cap.label,
            coverage: INDUSTRIES.filter((ind) => !ind.gaps?.includes(cap.id)).map((ind) => ind.id),
          }))}
          footnote="· indicates a capability outside that sector's primary engagement pattern, not a hard limit — ask."
          coveredLabel="Offered"
          notCoveredLabel="Not a primary focus"
          minWidthPx={860}
        />
      </div>
    </section>
  );
}
