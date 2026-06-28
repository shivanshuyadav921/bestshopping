'use client';

/* PREMA ENGINEERING WORKS — Industrial Case Studies (Phase 6) */
/* Design: Same engineering-documentation language as Capabilities/Process/  */
/* EngineeringIntelligence/RFQConfigurator — numbered badge cards,          */
/* accent-line reveals, Space Grotesk/Inter, signal-red accent.             */
/* No new visual language introduced.                                      */
/*                                                                          */
/* Six field case studies, each following Problem → Analysis →             */
/* Manufacturing → Result. Three reuse real manufactured-component         */
/* photography already shipped with the Product Museum (precision shaft,   */
/* gear, guide rail). The other three have no existing product photo, so   */
/* they're presented as engineering-reconstruction line diagrams — drawn   */
/* in the same monochrome/accent stroke language as TechnicalIcon — rather */
/* than stock imagery. An "As Received / As Delivered" toggle simulates    */
/* before/after using the same filter-swap technique EngineeringIntelligence */
/* already uses, so no new visual asset pipeline is needed.                */
/*                                                                          */
/* Selection is click-driven, not scroll-jacked — consistent with every    */
/* other interactive section on this site.                                 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechnicalIcon from './TechnicalIcon';
import { CornerBrackets } from '@/components/engineering';
import type { IconType, Metric } from '@/types/engineering';

type ViewState = 'received' | 'delivered';

const ASSET_BASE = '/images/products';

interface StageStep {
  label: string;
  icon: IconType;
  text: string;
}

interface DimAnnotation {
  orientation: 'h' | 'v';
  top: string;
  left: string;
  size: string;
  label: string;
}

type DiagramType = 'star-wheel' | 'feed-screw' | 'oem-assembly';

interface CaseStudy {
  id: string;
  number: string;
  industry: string;
  customer: string;
  partLabel: string;
  title: string;
  summary: string;
  chipIcon: IconType;
  badge: string;
  problem: string;
  challenge: string;
  solution: string;
  process: string;
  result: string;
  stages: StageStep[];
  metrics: Metric[];
  dims: DimAnnotation[];
  visual:
    | { kind: 'photo'; image: string; beforeFilter: string; afterFilter: string }
    | { kind: 'blueprint'; diagram: DiagramType };
}

/* ---------------------------------------------------------------------- */
/* Case study data                                                        */
/* ---------------------------------------------------------------------- */

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'splined-shaft',
    number: '01',
    industry: 'FMCG Packaging — Labeling Line',
    customer: 'Bottling & Labeling Plant, Baddi',
    partLabel: 'Splined Drive Shaft',
    title: 'Restoring a Stopped Labeling Line',
    summary: 'Splined shaft sheared mid-shift. Line down.',
    chipIcon: 'shaft-part',
    badge: 'REVERSE ENGINEERED · NO DRAWING',
    problem:
      'A splined drive shaft on a high-speed labeling machine sheared mid-shift, taking the entire line down. The OEM no longer stocked the part, and the import quote was three weeks out.',
    challenge:
      'No drawing existed on-site. The spline profile used a non-standard, machine-specific tooth count, and the failure pattern suggested the original fillet radius was undersized for the load.',
    solution:
      'The broken halves were dimensionally scanned and the spline profile reconstructed in CAD. The root fillet radius was increased within the original envelope to address the actual failure mode, not just replicate it.',
    process:
      'EN19 alloy steel, CNC turned to print, spline form broached, induction hardened on the working diameter, CMM-verified before dispatch.',
    result:
      'The line was back in production in four days. The corrected fillet radius means this shaft is now also held as the plant\u2019s standing spare.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Splined shaft sheared under load; line stopped mid-shift with no spare on hand.' },
      { label: 'Analysis', icon: 'measurement', text: 'Broken halves scanned to recover the spline profile and pinpoint the fillet-radius weakness.' },
      { label: 'Manufacturing', icon: 'machining', text: 'EN19 turned, spline broached, induction hardened, CMM-checked against the model.' },
      { label: 'Result', icon: 'certification', text: 'Line restarted in 4 days with a corrected design now held as standing spare.' },
    ],
    metrics: [
      { label: 'Turnaround', value: '4 Days', description: 'Against a 3-week OEM import quote' },
      { label: 'Tolerance', value: '±0.01mm', description: 'On spline diameter and length' },
      { label: 'Design Fix', value: 'Root Cause', description: 'Fillet radius corrected, not copied' },
    ],
    dims: [
      { orientation: 'h', top: '22%', left: '20%', size: '60%', label: 'L · 340mm' },
      { orientation: 'v', top: '45%', left: '78%', size: '22%', label: 'Ø 28mm' },
    ],
    visual: {
      kind: 'photo',
      image: `${ASSET_BASE}/component-precision-shaft.webp`,
      beforeFilter: 'grayscale(0.65) brightness(0.5) contrast(1.2)',
      afterFilter: 'grayscale(0) brightness(0.95)',
    },
  },
  {
    id: 'star-wheel',
    number: '02',
    industry: 'Beverage Bottling',
    customer: 'Beverage Bottling Plant, Solan',
    partLabel: 'Star Wheel Change Part',
    title: 'Ending a Six-Week Failure Cycle',
    summary: 'Change part failing every 6 weeks. Root cause: material.',
    chipIcon: 'gear-part',
    badge: 'RECONSTRUCTED FROM WEAR PATTERN',
    problem:
      'A star wheel change part on the bottling line was wearing out every six weeks, each replacement costing a shift in micro-stops while the line was re-timed.',
    challenge:
      'The OEM replacement was identical to the part that kept failing. The wear pattern showed the original material wasn\u2019t suited to the bottle\u2019s edge contact — not a machining defect.',
    solution:
      'Material substitution analysis pointed to an engineering-grade polymer with better abrasion resistance, and the pocket geometry was re-measured to correct a slight timing mismatch found during inspection.',
    process:
      'CNC machined from solid polymer billet, pockets finished to the corrected bottle-neck profile, trial-fitted on the customer\u2019s line before final delivery.',
    result:
      'Service life extended roughly four times over, and the line\u2019s micro-stop rate from this change part dropped to near zero.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Star wheel change part wearing out every 6 weeks, causing recurring micro-stops.' },
      { label: 'Analysis', icon: 'measurement', text: 'Wear pattern and pocket geometry inspected; root cause traced to material, not machining.' },
      { label: 'Manufacturing', icon: 'machining', text: 'Re-engineered in a higher wear-resistance polymer, pockets corrected to the bottle profile.' },
      { label: 'Result', icon: 'certification', text: 'Service life roughly 4x longer; recurring micro-stops eliminated.' },
    ],
    metrics: [
      { label: 'Service Life', value: '~4x Longer', description: 'Versus the original OEM part' },
      { label: 'Micro-Stops', value: 'Near Zero', description: 'From this change part specifically' },
      { label: 'Lead Time', value: '5 Days', description: 'Design correction to delivery' },
    ],
    dims: [
      { orientation: 'h', top: '50%', left: '18%', size: '64%', label: 'Ø 140mm' },
      { orientation: 'v', top: '30%', left: '50%', size: '18%', label: 'Pocket R16' },
    ],
    visual: { kind: 'blueprint', diagram: 'star-wheel' },
  },
  {
    id: 'guide-rail',
    number: '03',
    industry: 'Packaging Automation',
    customer: 'Automated Labeling Line, Nalagarh',
    partLabel: 'Linear Guide Rail',
    title: 'Realigning a High-Speed Carriage',
    summary: 'Worn rail caused carriage drift and jamming.',
    chipIcon: 'rail-part',
    badge: 'UPGRADED BEYOND ORIGINAL SPEC',
    problem:
      'A worn guide rail let the carriage on a high-speed labeling machine drift out of alignment, causing intermittent jams that operators had to clear by hand.',
    challenge:
      'The rail needed parallelism held to ±0.01mm over its full 1000mm length, and the original steel grade couldn\u2019t sustain that tolerance under continuous running.',
    solution:
      'Dimensional scanning of the wear pattern showed the load concentrated on one edge. A harder steel grade than the original was specified to extend service life under the same load.',
    process:
      'Rough ground, heat treated to 62–65 HRC, fine ground and lapped, parallelism verified end-to-end on a surface plate before dispatch.',
    result:
      'Carriage motion was restored to specification and the jam-related stoppages stopped. The harder grade is expected to outlast the original rail by a wide margin.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Worn guide rail caused carriage drift; intermittent jams on a high-speed line.' },
      { label: 'Analysis', icon: 'measurement', text: 'Wear pattern scanned; load traced to one edge, original steel grade found insufficient.' },
      { label: 'Manufacturing', icon: 'machining', text: 'Ground, heat treated to 62–65 HRC, fine ground and lapped to ±0.01mm parallelism.' },
      { label: 'Result', icon: 'certification', text: 'Carriage motion restored to spec; jam-related stoppages eliminated.' },
    ],
    metrics: [
      { label: 'Parallelism', value: '±0.01mm', description: 'Verified over the full 1000mm length' },
      { label: 'Hardness', value: '58 → 64 HRC', description: 'Upgraded from the original spec' },
      { label: 'Downtime', value: 'Same Week', description: 'Production resumed on install' },
    ],
    dims: [
      { orientation: 'h', top: '78%', left: '15%', size: '70%', label: 'L · 1000mm' },
      { orientation: 'v', top: '30%', left: '85%', size: '20%', label: '∥ ±0.01mm' },
    ],
    visual: {
      kind: 'photo',
      image: `${ASSET_BASE}/component-guide-rail.webp`,
      beforeFilter: 'grayscale(0.65) brightness(0.5) contrast(1.2)',
      afterFilter: 'grayscale(0) brightness(0.95)',
    },
  },
  {
    id: 'feed-screw',
    number: '04',
    industry: 'Pharmaceutical Packaging',
    customer: 'Pharmaceutical Filling Line, Baddi',
    partLabel: 'Nylon Feed Screw',
    title: 'Manufacturing a Part With No Spare in the Country',
    summary: 'Variable-pitch feed screw cracked. No spares anywhere.',
    chipIcon: 'shaft-part',
    badge: 'RECONSTRUCTED FROM 3D SCAN',
    problem:
      'The feed screw on a tablet-counting and filling machine cracked at one of the flight roots. The machine model was discontinued and no spare existed anywhere in the country.',
    challenge:
      'The screw\u2019s pitch varied along its length to control feed rate, and it had to be machined in a food/pharma-safe nylon grade with no original drawing to work from.',
    solution:
      'The cracked screw was 3D scanned to capture the exact variable-pitch helix, and the geometry was reconstructed in CAD before being checked against the scan data point by point.',
    process:
      'Multi-axis CNC milling of the helix in certified food-safe nylon, flights hand-finished, dimensions verified against the original scan.',
    result:
      'Production resumed without waiting on an import that wasn\u2019t available, and the plant now holds an in-house spare for the first time since the machine was installed.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Variable-pitch feed screw cracked; no spare available from a discontinued machine.' },
      { label: 'Analysis', icon: 'measurement', text: 'Cracked part 3D scanned to capture the exact helix and pitch variation along its length.' },
      { label: 'Manufacturing', icon: 'machining', text: 'Helix multi-axis milled in food-safe nylon, flights finished and checked against scan data.' },
      { label: 'Result', icon: 'certification', text: 'Production resumed; an in-house spare now exists for the first time.' },
    ],
    metrics: [
      { label: 'Lead Time', value: '6 Days', description: 'Versus a 10+ week import with no guarantee' },
      { label: 'Material', value: 'Food-Safe Nylon', description: 'Certified for pharmaceutical contact' },
      { label: 'Spares', value: 'Now In Stock', description: 'First time since machine installation' },
    ],
    dims: [
      { orientation: 'h', top: '30%', left: '20%', size: '60%', label: 'Pitch · 18mm' },
      { orientation: 'h', top: '75%', left: '15%', size: '70%', label: 'L · 260mm' },
    ],
    visual: { kind: 'blueprint', diagram: 'feed-screw' },
  },
  {
    id: 'reverse-gear',
    number: '05',
    industry: 'Textile Machinery',
    customer: 'Textile Spinning Unit, Himachal Pradesh',
    partLabel: 'Drive Gear',
    title: 'Keeping a Decades-Old Machine Running',
    summary: 'Drive gear failed on a machine its maker no longer exists.',
    chipIcon: 'gear-part',
    badge: 'GEOMETRY REBUILT FROM TOOTH SCAN',
    problem:
      'A drive gear on a decades-old spinning frame failed. The machine\u2019s original manufacturer no longer exists, and no replacement was available through any channel.',
    challenge:
      'The gear used a non-standard module and a custom tooth profile, and the original was case-hardened — the geometry had to be reverse engineered exactly, not approximated.',
    solution:
      'The tooth profile was optically scanned and the gear geometry — module, pressure angle, and profile shift — was back-calculated and rebuilt in CAD, then checked for contact stress before manufacturing.',
    process:
      'Forged to near-net shape, precision hobbed, case hardened to 58–62 HRC, ground and 100% tooth-profile inspected.',
    result:
      'The gear meshed correctly on first installation with no rework. A second gear was manufactured alongside it and kept as a standing spare.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Drive gear failed on a machine whose original manufacturer no longer exists.' },
      { label: 'Analysis', icon: 'measurement', text: 'Tooth profile optically scanned; module, pressure angle, and profile shift back-calculated.' },
      { label: 'Manufacturing', icon: 'machining', text: 'Forged, precision hobbed, case hardened to 58–62 HRC, ground to DIN 6-7 accuracy.' },
      { label: 'Result', icon: 'certification', text: 'Correct mesh on first installation; a spare gear now held in stock.' },
    ],
    metrics: [
      { label: 'Tooth Accuracy', value: 'DIN 6-7', description: 'Matched to original engagement' },
      { label: 'Hardness', value: '58–62 HRC', description: 'Case hardened to original spec' },
      { label: 'First-Fit', value: '100%', description: 'No rework needed on installation' },
    ],
    dims: [
      { orientation: 'h', top: '50%', left: '18%', size: '64%', label: 'PCD 112mm' },
      { orientation: 'v', top: '28%', left: '50%', size: '20%', label: 'Module 2.5' },
    ],
    visual: {
      kind: 'photo',
      image: `${ASSET_BASE}/component-gear.webp`,
      beforeFilter: 'grayscale(0.65) brightness(0.5) contrast(1.2)',
      afterFilter: 'grayscale(0) brightness(0.95)',
    },
  },
  {
    id: 'oem-assembly',
    number: '06',
    industry: 'Heavy Machinery',
    customer: 'Processing Plant — Imported Equipment Line',
    partLabel: 'Housing & Shaft Assembly',
    title: 'Beating a 14-Week Import Quote',
    summary: 'Critical assembly failed. Import quote: 14 weeks.',
    chipIcon: 'oem',
    badge: 'RECONSTRUCTED FROM MATING ASSEMBLY',
    problem:
      'A critical housing-and-shaft assembly failed on a piece of imported machinery. The OEM\u2019s replacement quote came back at fourteen weeks, with the machine down the entire time.',
    challenge:
      'The replacement had to mate precisely with the surrounding imported components, and the application was safety-critical — material certification and full documentation were non-negotiable.',
    solution:
      'The mating geometry was reverse engineered directly from the existing assembly, and a certified-equivalent domestic material was specified and documented for traceability.',
    process:
      'CNC turned and milled to the reconstructed assembly geometry, heat treated, supplied with full material certification and a CMM dimensional report.',
    result:
      'The machine was back in production in days rather than months, and the customer is no longer dependent on a single overseas supplier for this component.',
    stages: [
      { label: 'Problem', icon: 'broken', text: 'Critical housing-and-shaft assembly failed; OEM quoted a 14-week replacement.' },
      { label: 'Analysis', icon: 'measurement', text: 'Mating geometry measured directly from the existing assembly and surrounding components.' },
      { label: 'Manufacturing', icon: 'machining', text: 'CNC turned and milled, heat treated, supplied with full material certification.' },
      { label: 'Result', icon: 'certification', text: 'Machine back in production in days; single-supplier risk on this part removed.' },
    ],
    metrics: [
      { label: 'Lead Time', value: '6 Days', description: 'Versus a 14-week OEM import quote' },
      { label: 'Documentation', value: 'Full CMM + Cert', description: 'Material traceability included' },
      { label: 'Supply Risk', value: 'Eliminated', description: 'No longer single-sourced overseas' },
    ],
    dims: [
      { orientation: 'h', top: '76%', left: '22%', size: '56%', label: 'Bore Ø44mm' },
      { orientation: 'v', top: '24%', left: '50%', size: '18%', label: 'W 80mm' },
    ],
    visual: { kind: 'blueprint', diagram: 'oem-assembly' },
  },
];

const SECTION_METRICS: Metric[] = [
  { label: 'Cases Documented', value: '6', description: 'Real production-line failures, resolved end to end' },
  { label: 'Avg. Emergency Turnaround', value: '~5 Days', description: 'From intake to delivered, verified component' },
  { label: 'Drawings Required', value: 'Not Always', description: 'Every part above was reverse engineered' },
];

/* ---------------------------------------------------------------------- */
/* Dimension overlay — engineering HUD annotations over the visual frame  */
/* ---------------------------------------------------------------------- */

function DimensionOverlay({ dims }: { dims: DimAnnotation[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {dims.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: d.top,
            left: d.left,
            ...(d.orientation === 'h' ? { width: d.size } : { height: d.size }),
          }}
        >
          {d.orientation === 'h' ? (
            <div className="relative w-full">
              <span className="absolute left-1/2 -translate-x-1/2 -top-4 text-[9px] font-mono tracking-wider text-accent whitespace-nowrap">
                {d.label}
              </span>
              <div className="h-px w-full bg-accent/60" />
              <div className="absolute left-0 -top-1 w-px h-2 bg-accent/60" />
              <div className="absolute right-0 -top-1 w-px h-2 bg-accent/60" />
            </div>
          ) : (
            <div className="relative h-full">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[9px] font-mono tracking-wider text-accent whitespace-nowrap">
                {d.label}
              </span>
              <div className="w-px h-full bg-accent/60" />
              <div className="absolute top-0 -left-1 h-px w-2 bg-accent/60" />
              <div className="absolute bottom-0 -left-1 h-px w-2 bg-accent/60" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Engineering-reconstruction line diagrams — used in place of stock      */
/* photography for cases with no existing product image. Same stroke     */
/* language as TechnicalIcon: monochrome, geometric, currentColor.       */
/* ---------------------------------------------------------------------- */

function StarWheelDiagram({ state }: { state: ViewState }) {
  const pockets = 8;
  const cx = 100, cy = 100, rOuter = 64, rPocket = 15, rPocketCenter = 64;
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/40">
      <defs>
        <mask id="starWheelMask">
          <rect x="0" y="0" width="200" height="200" fill="white" />
          {Array.from({ length: pockets }).map((_, i) => {
            const angle = (i / pockets) * Math.PI * 2;
            const px = cx + Math.cos(angle) * rPocketCenter;
            const py = cy + Math.sin(angle) * rPocketCenter;
            return <circle key={i} cx={px} cy={py} r={rPocket} fill="black" />;
          })}
        </mask>
      </defs>
      <circle cx={cx} cy={cy} r={rOuter} fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="2" mask="url(#starWheelMask)" />
      <circle cx={cx} cy={cy} r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1={cx - 9} y1={cy} x2={cx - 16} y2={cy} stroke="currentColor" strokeWidth="1.5" />
      {state === 'received' && (
        <path
          d="M122 58 L133 76 L121 90 L136 106"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          className="text-accent"
        />
      )}
      {state === 'delivered' && (
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 16}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
          className="text-accent/50"
        />
      )}
    </svg>
  );
}

function FeedScrewDiagram({ state }: { state: ViewState }) {
  const startX = 42, endX = 158, y = 100, flightR = 24, flightCount = 9;
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/40">
      <line x1="18" y1={y} x2={startX} y2={y} stroke="currentColor" strokeWidth="3" />
      <line x1={endX} y1={y} x2="182" y2={y} stroke="currentColor" strokeWidth="3" />
      <line x1={startX} y1={y} x2={endX} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {Array.from({ length: flightCount }).map((_, i) => {
        const x = startX + (i / (flightCount - 1)) * (endX - startX);
        return <ellipse key={i} cx={x} cy={y} rx="5" ry={flightR} stroke="currentColor" strokeWidth="1.25" fill="none" />;
      })}
      {state === 'received' && (
        <path
          d={`M${startX + (endX - startX) * 0.42} ${y - flightR} L${startX + (endX - startX) * 0.55} ${y + flightR}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          className="text-accent"
        />
      )}
      {state === 'delivered' && (
        <rect
          x={startX - 8}
          y={y - flightR - 12}
          width={endX - startX + 16}
          height={flightR * 2 + 24}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
          className="text-accent/50"
        />
      )}
    </svg>
  );
}

function OemAssemblyDiagram({ state }: { state: ViewState }) {
  const corners: [number, number][] = [
    [72, 67],
    [128, 67],
    [72, 133],
    [128, 133],
  ];
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/40">
      <rect x="60" y="55" width="80" height="90" rx="3" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="21" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="3" />
      <line x1="140" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="3" />
      {corners.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      ))}
      {state === 'received' && (
        <path
          d="M100 79 L92 100 L107 112 L97 130"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          className="text-accent"
        />
      )}
      {state === 'delivered' && (
        <rect
          x="50"
          y="45"
          width="100"
          height="110"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
          className="text-accent/50"
        />
      )}
    </svg>
  );
}

function BlueprintDiagram({ type, state }: { type: DiagramType; state: ViewState }) {
  if (type === 'star-wheel') return <StarWheelDiagram state={state} />;
  if (type === 'feed-screw') return <FeedScrewDiagram state={state} />;
  return <OemAssemblyDiagram state={state} />;
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('received');
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    setViewState('received');
  }

  const active = CASE_STUDIES[activeIndex];

  return (
    <section id="case-studies" className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Faint engineering grid background — consistent with EngineeringIntelligence */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 06 — Industrial Case Studies
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Engineering in the Field
          </h2>
          <p className="text-lg text-white/70">
            Six production lines. Six failures. Six components engineered, manufactured,
            and delivered to get them running again — documented end to end, from the
            part that failed to the part that replaced it.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Case Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {CASE_STUDIES.map((study, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={study.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`relative text-left p-4 border transition-all duration-300 ${
                  isActive
                    ? 'border-accent bg-white/[0.04]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                }`}
              >
                <div className="absolute -top-1 -left-1 w-7 h-7 bg-accent text-accent-foreground flex items-center justify-center font-bold text-[11px] leading-none">
                  {study.number}
                </div>
                <div className={`mb-3 pt-2 ${isActive ? 'text-accent' : 'text-white/50'}`}>
                  <TechnicalIcon type={study.chipIcon} className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                  {study.industry.split('—')[0].trim()}
                </p>
                <p className="text-xs font-medium text-white leading-snug">{study.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Active Case Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          >
            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square border border-white/10 bg-white/[0.02] overflow-hidden">
                <CornerBrackets />

                {/* Photo or diagram */}
                {active.visual.kind === 'photo' ? (
                  <img
                    src={active.visual.image}
                    alt={active.partLabel}
                    className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-500"
                    style={{
                      filter: viewState === 'received' ? active.visual.beforeFilter : active.visual.afterFilter,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <BlueprintDiagram type={active.visual.diagram} state={viewState} />
                  </div>
                )}

                {/* Scanning grid overlay — diagnostic feel, only in "as received" */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    viewState === 'received' ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,90,54,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,90,54,0.12) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <DimensionOverlay dims={active.dims} />

                {/* Status HUD */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-white/50">
                  <span>CASE {active.number}/06</span>
                  <span className="text-accent text-right">{active.badge}</span>
                </div>

                {/* Verified strip — only once "as delivered" is selected */}
                <div
                  className={`absolute bottom-4 left-4 right-4 flex items-center gap-2 transition-opacity duration-500 ${
                    viewState === 'delivered' ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <TechnicalIcon type="quality" className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-mono tracking-wider text-white/70">
                    CMM VERIFIED · DELIVERED
                  </span>
                </div>
              </div>

              {/* As Received / As Delivered toggle */}
              <div className="flex border border-white/10 mt-4">
                {(['received', 'delivered'] as ViewState[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setViewState(s)}
                    className={`flex-1 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 ${
                      viewState === s
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-transparent text-white/50 hover:text-white'
                    }`}
                  >
                    {s === 'received' ? 'As Received' : 'As Delivered'}
                  </button>
                ))}
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">
                {active.industry}
              </p>
              <p className="text-xs text-white/40 mb-4">{active.customer}</p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">
                {active.title}
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Problem</p>
                  <p className="text-white/70 leading-relaxed font-light">{active.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Challenge</p>
                  <p className="text-white/70 leading-relaxed font-light">{active.challenge}</p>
                </div>
              </div>

              {/* Mini process timeline */}
              <div className="mt-8">
                <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-4">
                  Engineering Response
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {active.stages.map((stage, idx) => (
                    <div key={stage.label} className="relative p-3 border border-white/10 bg-white/[0.02]">
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-accent text-accent-foreground flex items-center justify-center font-bold text-[9px] leading-none">
                        {idx + 1}
                      </div>
                      <div className="text-white/50 mb-2 pt-1">
                        <TechnicalIcon type={stage.icon} className="w-4 h-4" />
                      </div>
                      <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                        {stage.label}
                      </p>
                      <p className="text-[11px] text-white/60 leading-snug font-light">{stage.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result callout */}
              <div className="mt-6 pl-4 border-l-2 border-accent">
                <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Result</p>
                <p className="text-white/80 leading-relaxed">{active.result}</p>
              </div>

              {/* Outcome metrics */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                {active.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                      {metric.label}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-accent mb-1 leading-tight">
                      {metric.value}
                    </p>
                    <p className="text-[11px] text-white/50 leading-snug">{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Closing stat strip — mirrors Process.tsx / EngineeringIntelligence pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/10">
          {SECTION_METRICS.map((metric) => (
            <div key={metric.label} className="p-8 border border-white/10 bg-white/[0.02]">
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">
                {metric.label}
              </p>
              <p className="text-4xl font-bold text-accent mb-2">{metric.value}</p>
              <p className="text-sm text-white/70">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* CTA into RFQ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-16 pt-12 border-t border-white/10">
          <p className="text-lg text-white/80 max-w-xl">
            Facing something similar on your line? Tell us what broke — drawing or not.
          </p>
          <a
            href="#rfq"
            className="shrink-0 px-6 py-3 bg-accent text-accent-foreground font-medium text-sm transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
