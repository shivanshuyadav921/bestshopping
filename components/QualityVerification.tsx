/* PREMA ENGINEERING WORKS — Quality Assurance & Verification (Phase 8) */
/* Design: Same engineering-documentation language as every prior phase —   */
/* numbered badge cards, accent-line reveals, Space Grotesk/Inter, signal-  */
/* red accent. No new visual language introduced.                          */
/*                                                                          */
/* Architecture deliberately mirrors what's already on the page:           */
/*  - Click-driven stage selection + AnimatePresence crossfade, exactly    */
/*    the pattern CaseStudies.tsx already uses for its case panel.         */
/*  - A measured, animated SVG connector between the selected timeline     */
/*    entry and the visualization panel, built with the same              */
/*    useLayoutEffect + ResizeObserver + getBoundingClientRect technique   */
/*    Industries.tsx uses for its hub network — scoped down to a single    */
/*    source/target pair since this layout has one visualization target,  */
/*    not four category nodes.                                            */
/*  - A dark "console" panel embedded in a light section, and a closing    */
/*    capability-style matrix table — the same dashboard treatment        */
/*    Industries.tsx established, reused rather than reinvented.          */
/*                                                                          */
/* No Three.js, no WebGL, no stock imagery — every stage visualization is  */
/* a hand-drawn SVG in TechnicalIcon's monochrome-plus-accent stroke       */
/* language. Motion respects prefers-reduced-motion via framer-motion's    */
/* useReducedMotion, backed by a CSS @media safeguard.                     */

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ConsolePanel, TimelineIndex, VisualizationFrame, MetricGrid, ArtifactList, DashboardMatrix } from '@/components/engineering';
import { useStageConnector } from '@/hooks/useMeasuredConnector';
import type { IconType, Metric, Artifact, MatrixColumn } from '@/types/engineering';

/* ---------------------------------------------------------------------- */
/* Data model                                                              */
/* ---------------------------------------------------------------------- */

type VisualType =
  | 'material'
  | 'manufacturing'
  | 'inprocess'
  | 'cmm'
  | 'surface'
  | 'documentation'
  | 'dispatch';

type MatrixColumnId = 'traceability' | 'dimensional' | 'material' | 'surface' | 'approval';

interface QAStage {
  id: string;
  number: string;
  label: string;
  title: string;
  icon: IconType;
  description: string;
  metrics: Metric[];
  artifacts: Artifact[];
  visual: { type: VisualType };
  /* Quality Control Matrix — which categories this stage covers */
  coverage: MatrixColumnId[];
}

const MATRIX_COLUMNS: MatrixColumn<MatrixColumnId>[] = [
  { id: 'traceability', label: 'Traceability' },
  { id: 'dimensional', label: 'Dimensional Accuracy' },
  { id: 'material', label: 'Material Verification' },
  { id: 'surface', label: 'Surface Finish' },
  { id: 'approval', label: 'Approval' },
];

const QA_STAGES: QAStage[] = [
  {
    id: 'incoming-material',
    number: '01',
    label: 'Material Inspection',
    title: 'Incoming Material Inspection',
    icon: 'material',
    description:
      'Raw material certificates are verified before machining begins. Heat numbers, grade specifications, and dimensional conformity are checked to ensure traceability.',
    metrics: [
      { label: 'Grade Verification', value: 'Spec Matched', description: 'Material grade cross-checked against drawing and supplier certificate.' },
      { label: 'Heat Number', value: 'Logged', description: 'Recorded against the certificate for full batch traceability.' },
      { label: 'Supplier Certificate', value: 'MTC Verified', description: 'Mill test certificate checked before material is released to the floor.' },
    ],
    artifacts: [
      { name: 'Material Test Certificate', code: 'MTC' },
      { name: 'Incoming Inspection Report', code: 'IIR-01' },
    ],
    visual: { type: 'material' },
    coverage: ['traceability', 'dimensional', 'material'],
  },
  {
    id: 'manufacturing',
    number: '02',
    label: 'Manufacturing',
    title: 'Manufacturing',
    icon: 'machining',
    description:
      'Machining begins only after setup is verified against the process sheet. Tool offsets, speeds, and feeds are confirmed on the machine before the production run starts.',
    metrics: [
      { label: 'Machine Setup', value: 'Verified', description: 'Setup checked against the process sheet before the first cut.' },
      { label: 'Tool Offset', value: 'Calibrated', description: 'Tool offsets confirmed on the machine before the production run begins.' },
      { label: 'Process Sheet', value: 'Followed', description: 'Operation sequence and parameters followed exactly as specified.' },
    ],
    artifacts: [
      { name: 'Setup Sheet', code: 'STP' },
      { name: 'Operation Sequence', code: 'OPS' },
    ],
    visual: { type: 'manufacturing' },
    coverage: ['traceability', 'dimensional'],
  },
  {
    id: 'in-process',
    number: '03',
    label: 'In-Process',
    title: 'In-Process Inspection',
    icon: 'inspection',
    description:
      'Critical dimensions are sampled at set intervals during the production run, not just at the end. Diameter, runout, and bore alignment are checked while the part is still on the machine.',
    metrics: [
      { label: 'Diameter Check', value: '±0.01 mm', description: 'Sampled at set intervals during the production run.' },
      { label: 'Runout', value: '< 0.01 mm', description: 'Checked on rotating features to catch deviation early.' },
      { label: 'Bore Alignment', value: 'Within Spec', description: 'Verified against datum before the part proceeds further.' },
    ],
    artifacts: [{ name: 'In-Process Inspection Sheet', code: 'IPI' }],
    visual: { type: 'inprocess' },
    coverage: ['traceability', 'dimensional'],
  },
  {
    id: 'cmm',
    number: '04',
    label: 'CMM Verification',
    title: 'CMM Dimensional Verification',
    icon: 'precision',
    description:
      'Finished components are measured on a coordinate measuring machine against the original CAD model. Every critical dimension and GD&T callout is verified to within ±0.005 mm.',
    metrics: [
      { label: 'Tolerance', value: '±0.005 mm', description: 'Verified against the CAD model on the coordinate measuring machine.' },
      { label: 'Point Cloud Validation', value: 'Full Scan', description: 'Surface points captured and compared against nominal geometry.' },
      { label: 'GD&T', value: 'Within Callout', description: 'Geometric dimensioning and tolerancing checked against the drawing.' },
    ],
    artifacts: [
      { name: 'CMM Report', code: 'CMM' },
      { name: 'Dimensional Chart', code: 'DIM' },
    ],
    visual: { type: 'cmm' },
    coverage: ['traceability', 'dimensional'],
  },
  {
    id: 'surface-hardness',
    number: '05',
    label: 'Hardness & Finish',
    title: 'Surface Finish & Hardness Testing',
    icon: 'finishing',
    description:
      'Surface roughness and hardness are measured wherever the drawing specifies a finish or heat-treatment callout. Readings are logged against the part before it moves to documentation.',
    metrics: [
      { label: 'Roughness', value: 'Ra 0.8 µm', description: 'Surface finish measured against the drawing callout.' },
      { label: 'Hardness', value: 'HRC Logged', description: 'Rockwell hardness reading taken and recorded on the working surface.' },
      { label: 'Surface Condition', value: 'Inspected', description: 'Checked visually and dimensionally for defects before sign-off.' },
    ],
    artifacts: [{ name: 'Hardness Test Report', code: 'HRC' }],
    visual: { type: 'surface' },
    coverage: ['traceability', 'surface'],
  },
  {
    id: 'documentation',
    number: '06',
    label: 'Documentation',
    title: 'Documentation & Traceability',
    icon: 'drawing',
    description:
      'Every certificate, inspection sheet, and report generated during manufacturing is compiled and linked back to the original material heat number, so any component can be traced after it leaves the floor.',
    metrics: [
      { label: 'Material Traceability', value: 'Linked', description: 'Every certificate and report linked back to the original heat number.' },
      { label: 'Revision Control', value: 'Logged', description: 'Drawing and process revision recorded against the finished part.' },
      { label: 'Batch Identification', value: 'Assigned', description: 'Batch ID issued so the part can be traced after dispatch.' },
    ],
    artifacts: [{ name: 'Certificate Package', code: 'CERT' }],
    visual: { type: 'documentation' },
    coverage: ['traceability', 'dimensional', 'material', 'surface'],
  },
  {
    id: 'dispatch',
    number: '07',
    label: 'Dispatch Approval',
    title: 'Final Dispatch Approval',
    icon: 'certification',
    description:
      'A final engineering sign-off confirms every prior stage is complete and on file before the component is packaged and released against the original order.',
    metrics: [
      { label: 'Final Signoff', value: 'Approved', description: 'Engineering sign-off recorded before release from the floor.' },
      { label: 'Packaging Verification', value: 'Checked', description: 'Packaging confirmed adequate for transit and handling.' },
      { label: 'Release Status', value: 'Cleared', description: 'Component cleared for dispatch against the original order.' },
    ],
    artifacts: [{ name: 'Dispatch Clearance Note', code: 'DC' }],
    visual: { type: 'dispatch' },
    coverage: ['traceability', 'approval'],
  },
];

/* ---------------------------------------------------------------------- */
/* Stage visualizations — hand-drawn SVG, TechnicalIcon's stroke language */
/* ---------------------------------------------------------------------- */

function MaterialVisual({ animate }: { animate: boolean }) {
  const bars = [60, 100, 140];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      {bars.map((y, i) => (
        <g key={i}>
          <rect x="27" y={y} width={68 - i * 8} height="14" rx="7" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="20" cy={y + 7} r="7" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
        </g>
      ))}
      <rect x="140" y="50" width="80" height="100" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M150 68h60M150 80h60M150 92h40M150 104h50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="180" cy="128" r="14" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <path d="M174 128l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
      <path
        d="M88 107 C112 107, 116 100, 138 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className={`text-accent ${animate ? 'prema-qa-flow' : ''}`}
      />
    </svg>
  );
}

function ManufacturingVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="20" y="90" width="42" height="60" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="82" cy="120" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g className={animate ? 'prema-qa-spin' : ''} style={{ transformOrigin: '82px 120px' }}>
        <line x1="82" y1="98" x2="82" y2="106" stroke="currentColor" strokeWidth="1.5" />
        <line x1="82" y1="134" x2="82" y2="142" stroke="currentColor" strokeWidth="1.5" />
        <line x1="60" y1="120" x2="68" y2="120" stroke="currentColor" strokeWidth="1.5" />
        <line x1="96" y1="120" x2="104" y2="120" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <rect x="104" y="113" width="96" height="14" rx="2" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M200 120l16-10v20z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M150 150l8-15 8 15z" fill="rgba(255,90,54,0.08)" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <line x1="158" y1="150" x2="158" y2="172" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <line x1="118" y1="190" x2="186" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className={`text-accent ${animate ? 'prema-qa-flow-h' : ''}`} />
      <polygon points="186,186 194,190 186,194" fill="currentColor" className="text-accent" />
    </svg>
  );
}

function InProcessVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <circle cx="120" cy="80" r="40" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={120 + Math.cos(a) * 33}
            y1={80 + Math.sin(a) * 33}
            x2={120 + Math.cos(a) * 38}
            y2={80 + Math.sin(a) * 38}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
        );
      })}
      <g className={animate ? 'prema-qa-needle' : ''} style={{ transformOrigin: '120px 80px' }}>
        <line x1="120" y1="80" x2="120" y2="52" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
      </g>
      <circle cx="120" cy="80" r="3" fill="currentColor" className="text-accent" />
      <line x1="120" y1="120" x2="120" y2="150" stroke="currentColor" strokeWidth="1.5" />
      <rect x="60" y="150" width="120" height="24" rx="3" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <line x1="60" y1="196" x2="180" y2="196" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <path d="M60 192l-5 4 5 4M180 192l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <text x="120" y="214" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" className="text-accent" opacity="0.85">
        DIAMETER CHECK
      </text>
    </svg>
  );
}

function CMMVisual({ animate }: { animate: boolean }) {
  const points: [number, number][] = [
    [70, 70], [100, 60], [130, 65], [160, 75], [180, 95], [170, 120], [140, 135],
    [110, 140], [80, 130], [65, 105], [95, 100], [125, 100], [152, 105], [80, 150],
    [112, 160], [145, 155], [168, 150],
  ];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <path
        d="M60 100 Q60 70 90 65 L160 65 Q190 70 190 100 L190 150 Q190 175 160 180 L90 180 Q60 175 60 150 Z"
        fill="rgba(255,255,255,0.02)"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" className="text-accent" opacity={0.45 + (i % 3) * 0.18} />
      ))}
      <g transform="translate(30,205)" opacity="0.6">
        <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" strokeWidth="1.25" />
        <line x1="0" y1="0" x2="0" y2="-20" stroke="currentColor" strokeWidth="1.25" />
        <line x1="0" y1="0" x2="14" y2="12" stroke="currentColor" strokeWidth="1.25" />
        <text x="24" y="4" fontSize="8" fontFamily="monospace" fill="currentColor">X</text>
        <text x="-4" y="-24" fontSize="8" fontFamily="monospace" fill="currentColor">Y</text>
        <text x="17" y="22" fontSize="8" fontFamily="monospace" fill="currentColor">Z</text>
      </g>
      {animate && <line x1="62" y1="64" x2="62" y2="182" stroke="currentColor" strokeWidth="1" className="text-accent prema-qa-scan" />}
    </svg>
  );
}

function SurfaceVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <line x1="28" y1="100" x2="182" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path
        d="M28 100 L38 89 L46 106 L54 84 L62 100 L70 94 L78 109 L86 87 L94 100 L102 91 L110 105 L118 89 L126 100 L134 95 L142 107 L150 87 L158 100 L166 93 L174 102 L182 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className={`text-accent ${animate ? 'prema-qa-flow' : ''}`}
      />
      <text x="28" y="120" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">Ra PROFILE</text>

      <rect x="30" y="155" width="150" height="16" fill="none" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={30 + i * 15} y1="155" x2={30 + i * 15} y2="163" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      ))}
      <polygon points="125,153 121,144 129,144" fill="currentColor" className="text-accent" />
      <text x="125" y="138" fontSize="9" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">HRC</text>
    </svg>
  );
}

function DocumentationVisual({ animate }: { animate: boolean }) {
  const sheets = [
    { x: 46, y: 130, r: -7 },
    { x: 62, y: 105, r: -2 },
    { x: 80, y: 80, r: 3 },
  ];
  const barWidths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1];
  let barX = 0;
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      {sheets.map((s, i) => (
        <g key={i} transform={`translate(${s.x},${s.y}) rotate(${s.r})`} className={animate && i === sheets.length - 1 ? 'prema-qa-stamp' : ''}>
          <rect x="0" y="0" width="100" height="128" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" />
          <path d="M80 0v20h20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M14 32h70M14 44h70M14 56h50M14 68h60M14 80h44" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </g>
      ))}
      <g transform="translate(92,172)">
        {barWidths.map((w, i) => {
          const rect = <rect key={i} x={barX} y="0" width={w * 2} height="16" fill="currentColor" opacity="0.7" />;
          barX += w * 2 + 2;
          return rect;
        })}
      </g>
    </svg>
  );
}

function DispatchVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <circle cx="100" cy="105" r="40" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="100" cy="105" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 40}
            y1={105 + Math.sin(a) * 40}
            x2={100 + Math.cos(a) * 48}
            y2={105 + Math.sin(a) * 48}
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.55"
          />
        );
      })}
      <g className={animate ? 'prema-qa-stamp' : ''} style={{ transformOrigin: '168px 62px' }}>
        <circle cx="168" cy="62" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <circle cx="168" cy="62" r="21" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" className="text-accent" opacity="0.7" />
        <path d="M157 62l8 8 14-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
      </g>
      <path d="M48 175h104v38h-104zM48 175l20-13h64l20 13M100 175v38" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function StageVisual({ type, animate }: { type: VisualType; animate: boolean }) {
  switch (type) {
    case 'material':
      return <MaterialVisual animate={animate} />;
    case 'manufacturing':
      return <ManufacturingVisual animate={animate} />;
    case 'inprocess':
      return <InProcessVisual animate={animate} />;
    case 'cmm':
      return <CMMVisual animate={animate} />;
    case 'surface':
      return <SurfaceVisual animate={animate} />;
    case 'documentation':
      return <DocumentationVisual animate={animate} />;
    case 'dispatch':
      return <DispatchVisual animate={animate} />;
    default:
      return null;
  }
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function QualityVerification() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = QA_STAGES[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const vizPanelRef = useRef<HTMLDivElement>(null);

  const { path, size } = useStageConnector(containerRef, timelineRefs, active.id, vizPanelRef, [activeIndex]);

  const matrixRows = QA_STAGES.map((s) => ({
    id: s.id,
    label: s.label,
    numberLabel: s.number,
    coverage: s.coverage,
  }));

  return (
    <section id="quality" className="py-24 md:py-32 bg-background">
      <style>{`
        @keyframes prema-qa-connector-flow { to { stroke-dashoffset: -24; } }
        @keyframes prema-qa-flow-keyframe { to { stroke-dashoffset: -20; } }
        @keyframes prema-qa-spin-keyframe { to { transform: rotate(360deg); } }
        @keyframes prema-qa-needle-keyframe { 0%, 100% { transform: rotate(-9deg); } 50% { transform: rotate(9deg); } }
        @keyframes prema-qa-scan-keyframe { 0% { transform: translateX(0); opacity: 0.15; } 50% { opacity: 1; } 100% { transform: translateX(128px); opacity: 0.15; } }
        @keyframes prema-qa-stamp-keyframe { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.04); opacity: 1; } }

        .prema-qa-connector { stroke-dasharray: 5 5; animation: prema-qa-connector-flow 1.2s linear infinite; }
        .prema-qa-flow, .prema-qa-flow-h { stroke-dasharray: 4 4; animation: prema-qa-flow-keyframe 1.1s linear infinite; }
        .prema-qa-spin { animation: prema-qa-spin-keyframe 3s linear infinite; }
        .prema-qa-needle { animation: prema-qa-needle-keyframe 2.2s ease-in-out infinite; }
        .prema-qa-scan { animation: prema-qa-scan-keyframe 2.6s ease-in-out infinite; }
        .prema-qa-stamp { animation: prema-qa-stamp-keyframe 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .prema-qa-connector, .prema-qa-flow, .prema-qa-flow-h, .prema-qa-spin,
          .prema-qa-needle, .prema-qa-scan, .prema-qa-stamp { animation: none !important; }
        }
      `}</style>

      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 08 — Quality Assurance &amp; Verification
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Every Stage Verified, Fully Traceable
          </h2>
          <p className="text-lg text-foreground/70">
            Every component that leaves PREMA passes through seven verification stages — not as a
            final check, but as a continuous record built from the moment raw material arrives.
            Select a stage to see what's verified, measured, and documented.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        <ConsolePanel>
          <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12">
            {/* Measured connector overlay */}
            <svg
              className="absolute inset-0 pointer-events-none z-0"
              width={size.w || undefined}
              height={size.h || undefined}
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
            >
              {path && (
                <path d={path} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.5" className="prema-qa-connector" />
              )}
            </svg>

            <div className="relative z-10 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6">
              <TimelineIndex
                title="Quality Pipeline"
                items={QA_STAGES}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                registerButtonRef={(id, el) => { timelineRefs.current[id] = el; }}
              />
            </div>

            <div className="relative z-10 lg:col-span-8 p-4 sm:p-6 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: 'easeOut' }}
                >
                  <VisualizationFrame
                    panelRef={vizPanelRef}
                    statusLeft={`STAGE ${active.number}/07`}
                    statusRight={active.label.toUpperCase()}
                  >
                    <StageVisual type={active.visual.type} animate={!prefersReducedMotion} />
                  </VisualizationFrame>

                  <div className="mt-6">
                    <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">
                      {active.title}
                    </p>
                    <p className="text-white/70 leading-relaxed font-light">{active.description}</p>
                  </div>

                  <MetricGrid metrics={active.metrics} />
                  <ArtifactList title="Artifacts Generated" artifacts={active.artifacts} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ConsolePanel>

        <DashboardMatrix
          title="Quality Control Matrix"
          description="What each stage of the pipeline verifies, checks, or signs off on."
          rowHeaderLabel="Stage"
          columns={MATRIX_COLUMNS}
          rows={matrixRows}
          footnote="· indicates a category this stage does not directly verify — it is covered earlier or later in the pipeline."
          coveredLabel="Verified at this stage"
          notCoveredLabel="Not part of this stage"
        />
      </div>
    </section>
  );
}
