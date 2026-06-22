/* PREMA ENGINEERING WORKS — Emergency Breakdown Command Center (Phase 10) */
/* Design: Same engineering-documentation language as every prior phase —   */
/* numbered badge cards, accent-line reveals, Space Grotesk/Inter, signal-  */
/* red accent. No new visual language introduced.                          */
/*                                                                          */
/* Architecture is a direct reuse of QualityVerification.tsx: a click-     */
/* driven vertical stage timeline on the left, a large SVG visualization   */
/* on the right with description / metrics / artifacts stacked beneath it, */
/* and a measured SVG connector between the active timeline entry and the  */
/* visualization panel — same useLayoutEffect + ResizeObserver +           */
/* getBoundingClientRect technique used in Industries.tsx and              */
/* QualityVerification.tsx. The dark console panel embedded in a light     */
/* section, and the closing matrix table, follow the same dashboard        */
/* treatment as Industries / QualityVerification / TechnicalResourceLibrary.*/
/*                                                                          */
/* New to this phase: a "Drawing Available?" stage with a branching        */
/* decision visualization, and a side notice panel (machine-room placards) */
/* sitting beneath the stage timeline in the left column.                  */
/*                                                                          */
/* Pure React + SVG. No Three.js, no Canvas, no stock imagery. Motion is   */
/* a single small AnimatePresence crossfade, gated by useReducedMotion.    */
/* CSS keyframes are scoped with an `ebc-` prefix so they never collide    */
/* with the equivalent animations already defined by QualityVerification.  */

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TechnicalIcon from './TechnicalIcon';
import { ConsolePanel, TimelineIndex, VisualizationFrame, MetricGrid, ArtifactList, DashboardMatrix } from '@/components/engineering';
import { useStageConnector } from '@/hooks/useMeasuredConnector';
import type { IconType, Metric, Artifact, MatrixColumn } from '@/types/engineering';

/* ---------------------------------------------------------------------- */
/* Data model                                                              */
/* ---------------------------------------------------------------------- */

type VisualType =
  | 'stopped'
  | 'upload'
  | 'decision'
  | 'reverse-engineering'
  | 'material-id'
  | 'manufacturing'
  | 'inspection'
  | 'dispatch'
  | 'restart';

type MatrixColumnId = 'traceability' | 'manufacturing' | 'inspection' | 'logistics' | 'recovery';

interface BreakdownStage {
  id: string;
  number: string;
  label: string;
  title: string;
  icon: IconType;
  description: string;
  metrics: Metric[];
  artifacts: Artifact[];
  visualType: VisualType;
  coverage: MatrixColumnId[];
}

const MATRIX_COLUMNS: MatrixColumn<MatrixColumnId>[] = [
  { id: 'traceability', label: 'Traceability' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'recovery', label: 'Recovery' },
];

const EMERGENCY_NOTICES = [
  'No Drawing Required',
  'OEM Part Obsolete — OK',
  'Sample Component Accepted',
  'Urgent Production Support',
  '24×7 Response',
  'Reverse Engineering Available',
];

const BREAKDOWN_STAGES: BreakdownStage[] = [
  {
    id: 'stopped',
    number: '01',
    label: 'Line Stopped',
    title: 'Production Line Stopped',
    icon: 'breakdown',
    description:
      'Unexpected failure has interrupted operation. Downtime assessment begins immediately so the right response can start without delay.',
    metrics: [
      { label: 'Downtime Severity', value: 'Critical', description: 'Production fully halted pending a replacement component.' },
      { label: 'Affected Machine', value: 'Identified', description: 'Machine and failed component logged against the line.' },
      { label: 'Production Impact', value: 'Full Stop', description: 'No output until the component is replaced.' },
    ],
    artifacts: [
      { name: 'Incident Record', code: 'INC' },
      { name: 'Maintenance Ticket', code: 'MNT' },
    ],
    visualType: 'stopped',
    coverage: ['traceability', 'recovery'],
  },
  {
    id: 'upload',
    number: '02',
    label: 'Upload Component',
    title: 'Upload Broken Component',
    icon: 'upload',
    description:
      "The failed component — or what's left of it — is photographed and logged. A physical sample can be sent in directly when a photo alone isn't enough.",
    metrics: [
      { label: 'Sample Received', value: 'Logged', description: 'Physical component or fragment received for reference.' },
      { label: 'Photos Available', value: 'Captured', description: 'Reference images logged against the incident.' },
      { label: 'Reference Part', value: 'On File', description: 'Component cross-checked against prior records where possible.' },
    ],
    artifacts: [
      { name: 'Image Set', code: 'IMG' },
      { name: 'Sample Log', code: 'SMP' },
    ],
    visualType: 'upload',
    coverage: ['traceability'],
  },
  {
    id: 'drawing',
    number: '03',
    label: 'Drawing Available?',
    title: 'Drawing Available?',
    icon: 'drawing',
    description:
      "Every part takes one of two paths from here. If a drawing exists, manufacturing references it directly. If not, the component moves to reverse engineering instead.",
    metrics: [
      { label: 'Drawing Search', value: 'Checked', description: 'Internal and OEM records checked for an existing drawing.' },
      { label: 'CAD on File', value: 'Verified', description: 'Confirmed whether a usable CAD file already exists.' },
      { label: 'Path Selected', value: 'Branched', description: 'Component routed to manufacturing or reverse engineering.' },
    ],
    artifacts: [
      { name: 'CAD Files', code: 'CAD' },
      { name: 'Legacy Drawings', code: 'LGD' },
    ],
    visualType: 'decision',
    coverage: ['traceability'],
  },
  {
    id: 'reverse-engineering',
    number: '04',
    label: 'Reverse Engineering',
    title: 'Reverse Engineering',
    icon: 'design',
    description:
      'When no drawing exists, the component itself becomes the reference. Critical features are measured and rebuilt into a working CAD model.',
    metrics: [
      { label: 'Measurement Points', value: 'Captured', description: 'Critical surfaces and features measured directly from the part.' },
      { label: '3D Model', value: 'Reconstructed', description: 'CAD model rebuilt from measured geometry.' },
      { label: 'Critical Features', value: 'Identified', description: 'Fits, tolerances, and functional surfaces flagged before manufacturing.' },
    ],
    artifacts: [
      { name: 'CAD Reconstruction', code: 'CADR' },
      { name: 'Dimension Report', code: 'DIM' },
    ],
    visualType: 'reverse-engineering',
    coverage: ['traceability', 'manufacturing', 'recovery'],
  },
  {
    id: 'material',
    number: '05',
    label: 'Material ID',
    title: 'Material Identification',
    icon: 'material',
    description:
      "Matching the original material is what makes a replacement behave like the part it's replacing. Hardness and grade are confirmed before manufacturing begins.",
    metrics: [
      { label: 'Hardness Reading', value: 'Logged', description: 'Surface hardness measured against the original component.' },
      { label: 'Material Grade', value: 'Identified', description: 'Grade confirmed by testing or closest equivalent specified.' },
      { label: 'Heat Treatment', value: 'Assessed', description: 'Original heat-treatment condition evaluated where detectable.' },
    ],
    artifacts: [{ name: 'Material Report', code: 'MAT' }],
    visualType: 'material-id',
    coverage: ['traceability', 'manufacturing', 'inspection', 'recovery'],
  },
  {
    id: 'manufacturing',
    number: '06',
    label: 'Priority Manufacturing',
    title: 'Priority Manufacturing',
    icon: 'machining',
    description:
      "Breakdown jobs are scheduled ahead of the standard queue. Machine time is allocated immediately once the reconstructed geometry and material are confirmed.",
    metrics: [
      { label: 'Machine Allocation', value: 'Reserved', description: 'Machine time blocked ahead of standard production queue.' },
      { label: 'Estimated Recovery', value: '24–48 Hours', description: 'Depends on material availability and process complexity.' },
      { label: 'Queue Position', value: 'Priority', description: 'Job sequenced ahead of non-emergency work.' },
    ],
    artifacts: [
      { name: 'Setup Sheet', code: 'STP' },
      { name: 'Production Plan', code: 'PPL' },
    ],
    visualType: 'manufacturing',
    coverage: ['traceability', 'manufacturing', 'recovery'],
  },
  {
    id: 'inspection',
    number: '07',
    label: 'Inspection',
    title: 'Inspection & Verification',
    icon: 'precision',
    description:
      "The finished component is checked against the reconstructed model before it's cleared to leave the floor — tolerance, finish, and fit are all verified.",
    metrics: [
      { label: 'Tolerance', value: '±0.005 mm', description: 'Verified against the reconstructed CAD model.' },
      { label: 'CMM Verification', value: 'Passed', description: 'Dimensional check completed on the coordinate measuring machine.' },
      { label: 'Surface Finish', value: 'Inspected', description: "Checked against the original component's working surfaces." },
    ],
    artifacts: [
      { name: 'Inspection Report', code: 'INSP' },
      { name: 'CMM Report', code: 'CMM' },
    ],
    visualType: 'inspection',
    coverage: ['traceability', 'inspection', 'recovery'],
  },
  {
    id: 'dispatch',
    number: '08',
    label: 'Dispatch Approval',
    title: 'Dispatch Approval',
    icon: 'certification',
    description:
      "A final engineering sign-off confirms the component is complete and verified before it's packaged and sent back to the line.",
    metrics: [
      { label: 'Packaging', value: 'Confirmed', description: 'Packaging verified adequate for urgent transit.' },
      { label: 'Release Approval', value: 'Signed Off', description: 'Engineering clearance recorded before dispatch.' },
      { label: 'Tracking', value: 'Assigned', description: 'Shipment tracked through to delivery at the plant.' },
    ],
    artifacts: [{ name: 'Dispatch Document', code: 'DSP' }],
    visualType: 'dispatch',
    coverage: ['traceability', 'logistics', 'recovery'],
  },
  {
    id: 'restart',
    number: '09',
    label: 'Production Restarted',
    title: 'Production Restarted',
    icon: 'quality',
    description:
      'The component is installed and the line is confirmed running. Total downtime is logged for the record, closing out the emergency response.',
    metrics: [
      { label: 'Downtime Recovered', value: 'Logged', description: 'Total downtime recorded from stoppage to restart.' },
      { label: 'Line Status', value: 'Running', description: 'Production confirmed back to normal operation.' },
      { label: 'Delivery Complete', value: 'Confirmed', description: 'Component delivered and installed on the line.' },
    ],
    artifacts: [{ name: 'Closure Record', code: 'CLS' }],
    visualType: 'restart',
    coverage: ['traceability', 'logistics', 'recovery'],
  },
];

/* ---------------------------------------------------------------------- */
/* Command visualizations — hand-drawn SVG, TechnicalIcon's stroke        */
/* language. Monochrome white/40 base, signal-red accent highlights.      */
/* ---------------------------------------------------------------------- */

function StoppedVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="60" y="110" width="120" height="70" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <rect x="80" y="90" width="30" height="20" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="90" cy="180" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="150" cy="180" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M75 120l90 50M165 120l-90 50" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
      <g className={animate ? 'prema-ebc-pulse' : ''} style={{ transformOrigin: '120px 50px' }}>
        <path d="M120 28l24 42h-48z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <line x1="120" y1="40" x2="120" y2="54" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <circle cx="120" cy="61" r="1.5" fill="currentColor" className="text-accent" />
      </g>
      {animate && (
        <>
          <path d="M92 32 a32 32 0 0 0 -10 12" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent prema-ebc-ring" opacity="0.5" />
          <path d="M148 32 a32 32 0 0 1 10 12" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent prema-ebc-ring" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

function UploadVisual() {
  const markers: [number, number][] = [
    [55, 115],
    [100, 90],
    [150, 140],
    [185, 115],
  ];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="40" y="105" width="70" height="20" rx="3" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M110 105 L118 95 L112 115 L122 105 L116 125 L130 115" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" strokeLinejoin="round" />
      <rect x="130" y="105" width="70" height="20" rx="3" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      {markers.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 9} y={y - 9} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1={x - 13} y1={y} x2={x - 9} y2={y} stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1={x + 9} y1={y} x2={x + 13} y2={y} stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1={x} y1={y - 13} x2={x} y2={y - 9} stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1={x} y1={y + 9} x2={x} y2={y + 13} stroke="currentColor" strokeWidth="1" className="text-accent" />
        </g>
      ))}
    </svg>
  );
}

function DecisionVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="95" y="20" width="50" height="28" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <text x="120" y="38" fontSize="8.5" textAnchor="middle" fontFamily="monospace" fill="currentColor">DRAWING?</text>
      <path d="M120 48 L120 65 L60 65 L60 90" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <polygon points="60,90 56,82 64,82" fill="currentColor" className="text-accent" />
      <text x="78" y="78" fontSize="9" fontFamily="monospace" fill="currentColor" className="text-accent">YES</text>
      <path d="M120 48 L120 65 L180 65 L180 90" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <polygon points="180,90 176,82 184,82" fill="currentColor" />
      <text x="158" y="78" fontSize="9" fontFamily="monospace" fill="currentColor">NO</text>
      <rect x="40" y="95" width="40" height="50" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <path d="M48 110h24M48 120h24M48 130h16" stroke="currentColor" strokeWidth="1" opacity="0.6" className="text-accent" />
      <text x="60" y="160" fontSize="7" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">MANUFACTURE</text>
      <circle cx="180" cy="120" r="22" fill="none" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={180 + Math.cos(a) * 22} cy={120 + Math.sin(a) * 22} r="1.5" fill="currentColor" />;
      })}
      <text x="180" y="160" fontSize="7" textAnchor="middle" fontFamily="monospace" fill="currentColor">REVERSE ENGINEER</text>
    </svg>
  );
}

function ReverseEngineeringVisual({ animate }: { animate: boolean }) {
  const points: [number, number][] = [
    [70, 80], [100, 70], [130, 75], [155, 90], [160, 115], [140, 135], [110, 140], [85, 130], [70, 105], [105, 105], [135, 110],
  ];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <path
        d="M60 100 Q60 70 90 65 L150 65 Q180 70 180 100 L180 140 Q180 165 150 170 L90 170 Q60 165 60 140 Z"
        fill="rgba(255,255,255,0.02)"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" className="text-accent" opacity={0.45 + (i % 3) * 0.18} />
      ))}
      <line x1="60" y1="190" x2="180" y2="190" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <polygon points="60,190 68,186 68,194" fill="currentColor" className="text-accent" />
      <polygon points="180,190 172,186 172,194" fill="currentColor" className="text-accent" />
      <text x="120" y="205" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">
        MEASURED PROFILE
      </text>
      {animate && <line x1="64" y1="64" x2="64" y2="172" stroke="currentColor" strokeWidth="1" className="text-accent prema-ebc-scan" />}
    </svg>
  );
}

function MaterialIdVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="100" y="30" width="16" height="50" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M108 80l-6 14h12z" fill="currentColor" className="text-accent" />
      <rect x="50" y="100" width="140" height="24" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M104 100l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <rect x="50" y="145" width="140" height="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {Array.from({ length: 24 }).map((_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return <circle key={i} cx={62 + col * 17} cy={158 + row * 17} r="3.5" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />;
      })}
    </svg>
  );
}

function ManufacturingVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="20" y="80" width="40" height="55" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="78" cy="107" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g className={animate ? 'prema-ebc-spin' : ''} style={{ transformOrigin: '78px 107px' }}>
        <line x1="78" y1="89" x2="78" y2="95" stroke="currentColor" strokeWidth="1.5" />
        <line x1="78" y1="119" x2="78" y2="125" stroke="currentColor" strokeWidth="1.5" />
        <line x1="60" y1="107" x2="66" y2="107" stroke="currentColor" strokeWidth="1.5" />
        <line x1="90" y1="107" x2="96" y2="107" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <rect x="98" y="100" width="80" height="14" rx="2" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M178 107l14-9v18z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <text x="20" y="165" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">QUEUE</text>
      {Array.from({ length: 4 }).map((_, i) => (
        <rect
          key={i}
          x={20 + i * 18}
          y="172"
          width="14"
          height="14"
          fill={i === 0 ? 'rgba(255,90,54,0.1)' : 'rgba(255,255,255,0.04)'}
          stroke="currentColor"
          strokeWidth="1.25"
          className={i === 0 ? 'text-accent' : ''}
        />
      ))}
      <text x="20" y="202" fontSize="7" fontFamily="monospace" fill="currentColor" className="text-accent">↑ PRIORITY JOB</text>
    </svg>
  );
}

function InspectionVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="30" y="40" width="10" height="80" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <line x1="35" y1="120" x2="120" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="120" x2="120" y2="150" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <circle cx="120" cy="153" r="3" fill="currentColor" className="text-accent" />
      <rect x="70" y="155" width="100" height="20" rx="2" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <line x1="70" y1="192" x2="170" y2="192" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <polygon points="70,192 78,188 78,196" fill="currentColor" className="text-accent" />
      <polygon points="170,192 162,188 162,196" fill="currentColor" className="text-accent" />
      <text x="120" y="207" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">
        ±0.005 mm
      </text>
    </svg>
  );
}

function DispatchVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <path d="M50 110h140v60h-140zM50 110l25-18h90l25 18M120 110v60" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <g className={animate ? 'prema-ebc-stamp' : ''} style={{ transformOrigin: '178px 75px' }}>
        <circle cx="178" cy="75" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <path d="M168 75l7 7 12-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
      </g>
      <rect x="56" y="185" width="46" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={60 + i * 5} y1="187" x2={60 + i * 5} y2="197" stroke="currentColor" strokeWidth={i % 2 === 0 ? 1.25 : 0.75} opacity="0.6" />
      ))}
    </svg>
  );
}

function RestartVisual({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="60" y="110" width="120" height="70" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <rect x="80" y="90" width="30" height="20" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="90" cy="180" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="150" cy="180" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <g className={animate ? 'prema-ebc-spin-slow' : ''} style={{ transformOrigin: '120px 145px' }}>
        <line x1="120" y1="125" x2="120" y2="135" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="120" y1="155" x2="120" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="100" y1="145" x2="110" y2="145" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="130" y1="145" x2="140" y2="145" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </g>
      <g className={animate ? 'prema-ebc-pulse' : ''} style={{ transformOrigin: '120px 50px' }}>
        <circle cx="120" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
      </g>
      <circle cx="120" cy="50" r="3" fill="currentColor" className="text-accent" />
      <text x="120" y="30" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">
        ONLINE
      </text>
    </svg>
  );
}

function CommandVisual({ type, animate }: { type: VisualType; animate: boolean }) {
  switch (type) {
    case 'stopped':
      return <StoppedVisual animate={animate} />;
    case 'upload':
      return <UploadVisual />;
    case 'decision':
      return <DecisionVisual />;
    case 'reverse-engineering':
      return <ReverseEngineeringVisual animate={animate} />;
    case 'material-id':
      return <MaterialIdVisual />;
    case 'manufacturing':
      return <ManufacturingVisual animate={animate} />;
    case 'inspection':
      return <InspectionVisual />;
    case 'dispatch':
      return <DispatchVisual animate={animate} />;
    case 'restart':
      return <RestartVisual animate={animate} />;
    default:
      return null;
  }
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function EmergencyBreakdownCenter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = BREAKDOWN_STAGES[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const vizPanelRef = useRef<HTMLDivElement>(null);

  const { path, size } = useStageConnector(containerRef, timelineRefs, active.id, vizPanelRef, [activeIndex]);

  const matrixRows = BREAKDOWN_STAGES.map((s) => ({
    id: s.id,
    label: s.label,
    numberLabel: s.number,
    coverage: s.coverage,
  }));

  return (
    <section id="emergency" className="py-24 md:py-32 bg-background">
      <style>{`
        @keyframes ebc-connector-flow { to { stroke-dashoffset: -24; } }
        @keyframes ebc-pulse-keyframe { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.6; } }
        @keyframes ebc-ring-keyframe { 0% { opacity: 0.6; } 50% { opacity: 0; } 100% { opacity: 0.6; } }
        @keyframes ebc-spin-keyframe { to { transform: rotate(360deg); } }
        @keyframes ebc-spin-slow-keyframe { to { transform: rotate(360deg); } }
        @keyframes ebc-scan-keyframe { 0% { transform: translateX(0); opacity: 0.15; } 50% { opacity: 1; } 100% { transform: translateX(112px); opacity: 0.15; } }
        @keyframes ebc-stamp-keyframe { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.04); opacity: 1; } }

        .prema-ebc-connector { stroke-dasharray: 5 5; animation: ebc-connector-flow 1.2s linear infinite; }
        .prema-ebc-pulse { animation: ebc-pulse-keyframe 1.4s ease-in-out infinite; }
        .prema-ebc-ring { animation: ebc-ring-keyframe 1.4s ease-in-out infinite; }
        .prema-ebc-spin { animation: ebc-spin-keyframe 2.6s linear infinite; }
        .prema-ebc-spin-slow { animation: ebc-spin-slow-keyframe 5s linear infinite; }
        .prema-ebc-scan { animation: ebc-scan-keyframe 2.4s ease-in-out infinite; }
        .prema-ebc-stamp { animation: ebc-stamp-keyframe 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .prema-ebc-connector, .prema-ebc-pulse, .prema-ebc-ring, .prema-ebc-spin,
          .prema-ebc-spin-slow, .prema-ebc-scan, .prema-ebc-stamp { animation: none !important; }
        }
      `}</style>

      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 10 — Rapid Response
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Emergency Breakdown Command Center
          </h2>
          <p className="text-lg text-foreground/70">
            When production stops, speed matters. Components can be reverse engineered,
            manufactured, inspected, and dispatched without requiring original drawings.
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
                <path d={path} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.5" className="prema-ebc-connector" />
              )}
            </svg>

            {/* Timeline + Notices */}
            <div className="relative z-10 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6">
              <TimelineIndex
                title="Emergency Flow"
                items={BREAKDOWN_STAGES}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                registerButtonRef={(id, el) => { timelineRefs.current[id] = el; }}
              />

              {/* Emergency Notices — machine-room placards */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-3">
                  Standing Notices
                </p>
                <div className="flex flex-col gap-2">
                  {EMERGENCY_NOTICES.map((notice) => (
                    <div key={notice} className="flex items-center gap-2 pl-3 border-l-2 border-accent/50 py-1">
                      <span className="text-[10px] font-bold tracking-wide uppercase text-white/70 leading-snug">
                        {notice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visualization + Details */}
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
                    statusLeft={`STAGE ${active.number}/09`}
                    statusRight={active.label.toUpperCase()}
                  >
                    <CommandVisual type={active.visualType} animate={!prefersReducedMotion} />
                  </VisualizationFrame>

                  <div className="mt-6">
                    <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">
                      {active.title}
                    </p>
                    <p className="text-white/70 leading-relaxed font-light">{active.description}</p>
                  </div>

                  <MetricGrid metrics={active.metrics} />
                  <ArtifactList title="Documents Generated" artifacts={active.artifacts} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ConsolePanel>

        <DashboardMatrix
          title="Emergency Response Matrix"
          description="What each stage of the breakdown response covers, end to end."
          rowHeaderLabel="Stage"
          columns={MATRIX_COLUMNS}
          rows={matrixRows}
          footnote="· indicates a discipline this stage does not directly act on — it is covered earlier or later in the response."
          coveredLabel="Active at this stage"
          notCoveredLabel="Not part of this stage"
        />
      </div>
    </section>
  );
}
