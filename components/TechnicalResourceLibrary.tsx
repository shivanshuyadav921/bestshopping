/* PREMA ENGINEERING WORKS — Technical Resource Library (Phase 9) */
/* Design: Same engineering-documentation language as every prior phase —   */
/* numbered badge cards, accent-line reveals, Space Grotesk/Inter, signal-  */
/* red accent. No new visual language introduced.                          */
/*                                                                          */
/* This is a reference archive, not a content section: a left-hand index   */
/* of ten engineering topics drives a right-hand "document" panel — title, */
/* topic chips, a hand-drawn SVG reference illustration, a data table, and */
/* a five-part engineering-notes block (Applications / Design Notes /      */
/* Limitations / Best Practices / Warning Conditions). No connector lines  */
/* are used here, unlike Industries.tsx / QualityVerification.tsx — this   */
/* layout is a document browser, not a network or a measured process flow,*/
/* so a connector hook would be the wrong tool for what's actually being   */
/* asked. The dark "console" panel + closing matrix table follow exactly  */
/* the dashboard treatment Industries.tsx and QualityVerification.tsx      */
/* already established.                                                    */
/*                                                                          */
/* Pure React + SVG. No Three.js, no Canvas, no stock imagery. Motion is   */
/* a single small AnimatePresence crossfade, gated by useReducedMotion.    */

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TechnicalIcon from './TechnicalIcon';
import { ConsolePanel, TimelineIndex, VisualizationFrame, DashboardMatrix } from '@/components/engineering';
import type { IconType, ReferenceTable, EngineeringNotes, MatrixColumn } from '@/types/engineering';

/* ---------------------------------------------------------------------- */
/* Data model                                                              */
/* ---------------------------------------------------------------------- */

interface Topic {
  name: string;
}

type VisualType =
  | 'materials'
  | 'fits'
  | 'tolerance'
  | 'surface-finish'
  | 'gear'
  | 'bearings'
  | 'threads'
  | 'heat-treatment'
  | 'calculations'
  | 'gdt';

type MatrixColumnId = 'design' | 'manufacturing' | 'inspection' | 'maintenance' | 'reverse-engineering';

interface ResourceCategory {
  id: string;
  number: string;
  label: string;
  icon: IconType;
  description: string;
  topics: Topic[];
  referenceTable: ReferenceTable;
  notes: EngineeringNotes;
  visualType: VisualType;
  coverage: MatrixColumnId[];
}

const topics = (...names: string[]): Topic[] => names.map((name) => ({ name }));

const MATRIX_COLUMNS: MatrixColumn<MatrixColumnId>[] = [
  { id: 'design', label: 'Design' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'reverse-engineering', label: 'Reverse Engineering' },
];

const ALL_DISCIPLINES: MatrixColumnId[] = ['design', 'manufacturing', 'inspection', 'maintenance', 'reverse-engineering'];

const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'materials',
    number: '01',
    label: 'Materials Guide',
    icon: 'material',
    description:
      "Material selection drives everything downstream — machinability, achievable tolerance, and service life. This reference summarizes the grades used across PREMA's work.",
    topics: topics('EN8', 'EN19', 'EN24', 'SS304', 'SS316', 'Brass', 'Aluminum', 'Nylon', 'Delrin'),
    referenceTable: {
      columns: ['Material', 'Hardness', 'Tensile Strength', 'Machinability', 'Common Use'],
      rows: [
        ['EN8', '150–200 HB', '550–700 MPa', 'Good', 'General shafts, pins, low-stress components'],
        ['EN19', '200–250 HB (Q&T)', '700–850 MPa', 'Good', 'Gears, shafts, high-strength components'],
        ['EN24', '250–300 HB (Q&T)', '850–1000 MPa', 'Moderate', 'Heavy-duty shafts, gears under high load'],
        ['SS304', '150–200 HB', '500–700 MPa', 'Moderate', 'Food/pharma components, corrosion resistance'],
        ['SS316', '150–200 HB', '500–700 MPa', 'Moderate', 'Chemical & marine environments'],
        ['Brass', '60–100 HB', '300–500 MPa', 'Excellent', 'Bushings, fittings, low-friction parts'],
        ['Aluminum', '30–95 HB (grade-dependent)', '90–570 MPa', 'Excellent', 'Lightweight housings, brackets'],
        ['Nylon', 'Shore D 70–85', '50–90 MPa', 'Good', 'Food-safe feed screws, low-wear bushings'],
        ['Delrin (POM)', 'Shore D 80–86', '60–70 MPa', 'Excellent', 'Precision change parts, gears, bushings'],
      ],
    },
    notes: {
      applications: ['Shaft & gear stock (EN8 / EN19 / EN24)', 'Corrosion-resistant components (SS304 / SS316)', 'Low-friction & food-safe parts (Nylon, Delrin, Brass)'],
      designNotes: ['Higher carbon/alloy content trades machinability for strength.', 'Stainless grades work-harden faster — feeds and speeds are adjusted accordingly.'],
      limitations: ['EN24 requires more conservative cutting parameters under load.', 'Polymers are not suited to high-temperature or high-load applications.'],
      bestPractices: ['Match grade to load case before finalizing tolerance — material and tolerance decisions interact.'],
      warnings: ['Stainless and polymer machining require different toolpaths than carbon steel — confirm grade before quoting on assumed material.'],
    },
    visualType: 'materials',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'fits',
    number: '02',
    label: 'Shaft & Hole Fits',
    icon: 'shaft-part',
    description:
      'Fit selection determines how a shaft and bore interact — whether the parts slide freely, locate precisely, or stay locked together permanently.',
    topics: topics('Clearance Fit', 'Transition Fit', 'Interference Fit', 'H7/g6', 'H7/k6', 'H7/p6'),
    referenceTable: {
      columns: ['Fit', 'Shaft', 'Hole', 'Type', 'Application'],
      rows: [
        ['H7/g6', 'g6', 'H7', 'Clearance', 'Rotating shafts, bushings, free-running components'],
        ['H7/k6', 'k6', 'H7', 'Transition', 'Located gears, pulleys requiring light assembly force'],
        ['H7/p6', 'p6', 'H7', 'Interference', 'Press-fitted bearing seats, permanent assemblies'],
      ],
    },
    notes: {
      applications: ['Clearance fits for rotating/sliding shafts', 'Transition fits for located, removable components', 'Interference fits for permanent press-fit assemblies'],
      designNotes: ['Hole tolerance (H7) is typically held constant; shaft tolerance varies to set the fit class.'],
      limitations: ['Interference fits require press equipment and controlled assembly temperature.'],
      bestPractices: ['Specify fit class on the drawing, not just a numeric tolerance — it documents intent for re-manufacture.'],
      warnings: ['Mixing fit classes on a reverse-engineered part without confirming function can cause premature wear or seizure.'],
    },
    visualType: 'fits',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'tolerance',
    number: '03',
    label: 'Tolerance Standards',
    icon: 'precision',
    description:
      'Tighter tolerance always costs more machine time and inspection effort. This reference sets expectations for where each tolerance band is normally applied.',
    topics: topics('±0.005 mm', '±0.01 mm', '±0.02 mm', '±0.05 mm', '±0.1 mm'),
    referenceTable: {
      columns: ['Tolerance', 'Typical Process', 'Typical Application'],
      rows: [
        ['±0.005 mm', 'Grinding, CMM-verified finishing', 'Bearing seats, precision mating fits'],
        ['±0.01 mm', 'Precision turning/milling', 'Shaft diameters, located bores'],
        ['±0.02 mm', 'Standard CNC turning/milling', 'General machined features'],
        ['±0.05 mm', 'Standard machining', 'Non-critical dimensions, clearance features'],
        ['±0.1 mm', 'Roughing, non-critical stock', 'Mounting holes, non-mating dimensions'],
      ],
    },
    notes: {
      applications: ['±0.005–0.01 mm for mating/rotating fits', '±0.02–0.1 mm for general and non-critical features'],
      designNotes: ['Apply the tightest tolerance only where function requires it — over-tolerancing inflates cost without benefit.'],
      limitations: ['Tolerances under ±0.01 mm typically require CMM verification, not just manual gauging.'],
      bestPractices: ['State the functional requirement, not just a number — it helps confirm the tolerance during reverse engineering.'],
      warnings: ['Stacking multiple tight tolerances on one part without a clear datum scheme can make the part unmeasurable as specified.'],
    },
    visualType: 'tolerance',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'surface-finish',
    number: '04',
    label: 'Surface Finish Reference',
    icon: 'finishing',
    description:
      'Surface roughness affects friction, sealing, fatigue life, and appearance. The Ra values below summarize what process typically achieves each finish.',
    topics: topics('Ra 0.2', 'Ra 0.4', 'Ra 0.8', 'Ra 1.6', 'Ra 3.2', 'Ra 6.3'),
    referenceTable: {
      columns: ['Ra (µm)', 'Process', 'Typical Use'],
      rows: [
        ['0.2', 'Lapping, fine grinding', 'Sealing faces, gauge surfaces'],
        ['0.4', 'Grinding, honing', 'Bearing seats, sliding fits'],
        ['0.8', 'Fine turning/milling, grinding', 'General precision mating surfaces'],
        ['1.6', 'Standard turning/milling', 'Functional machined surfaces'],
        ['3.2', 'Standard turning/milling', 'General machined surfaces, non-mating'],
        ['6.3', 'Rough turning/milling', 'Non-critical, as-machined surfaces'],
      ],
    },
    notes: {
      applications: ['Ra 0.2–0.4 for sealing and bearing surfaces', 'Ra 1.6–3.2 for general functional surfaces'],
      designNotes: ['Finer finish callouts increase cycle time — specify only on surfaces where friction, sealing, or fatigue matters.'],
      limitations: ['Achieving Ra 0.2–0.4 may require a secondary grinding or lapping operation beyond standard turning/milling.'],
      bestPractices: ['Call out finish per surface on the drawing, not as a single blanket value for the whole part.'],
      warnings: ['A finer finish than the original part had can change a press or interference fit — confirm before upgrading finish on a reverse-engineered component.'],
    },
    visualType: 'surface-finish',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'gear',
    number: '05',
    label: 'Gear Geometry',
    icon: 'gear-part',
    description:
      "Gear performance depends on a small set of geometric parameters. These are the terms used to describe and reverse engineer a gear's tooth form.",
    topics: topics('Module', 'Pitch Circle Diameter', 'Pressure Angle', 'Backlash', 'Tooth Profile'),
    referenceTable: {
      columns: ['Parameter', 'Typical Value / Range', 'Notes'],
      rows: [
        ['Module', '0.5 – 6 mm', 'Tooth size; PCD = Module × Number of Teeth'],
        ['Pitch Circle Diameter', 'Application-specific', 'Reference circle where teeth theoretically mesh'],
        ['Pressure Angle', '14.5° or 20°', '20° is the modern standard; older gears may use 14.5°'],
        ['Backlash', '0.04 – 0.10 mm', 'Increases with module; prevents binding'],
        ['Tooth Profile', 'Involute (standard)', 'Reconstructed from optical tooth scan when no drawing exists'],
      ],
    },
    notes: {
      applications: ['Reverse engineering obsolete or custom gears with no original drawing'],
      designNotes: ['Module and pressure angle must match the mating gear exactly — there is no tolerance for a mismatch here.'],
      limitations: ['Profile shift and backlash require contact-stress checking before cutting, not just geometric matching.'],
      bestPractices: ['Confirm module and pressure angle by measurement before committing to a hobbing tool — both must be correct.'],
      warnings: ['A close-but-incorrect module will mesh briefly and then fail — geometry must be exact, not approximate.'],
    },
    visualType: 'gear',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'bearings',
    number: '06',
    label: 'Bearings & Seating',
    icon: 'rail-part',
    description:
      'Bearing performance depends on getting the shaft and housing tolerances right, not just selecting the correct bearing. These are the seating conventions used most often.',
    topics: topics('Press Fit', 'Slip Fit', 'Bearing Seat Tolerances', 'Housing Tolerances', 'Inner Race', 'Outer Race'),
    referenceTable: {
      columns: ['Fit Type', 'Location', 'Typical Tolerance Class'],
      rows: [
        ['Press Fit', 'Inner race on rotating shaft', 'j6 / k6'],
        ['Slip Fit', 'Outer race in stationary housing', 'H7'],
        ['Bearing Seat', 'Shaft diameter at bearing', 'j6 / k6'],
        ['Housing Bore', 'Housing bore at bearing', 'H7 / J7'],
      ],
    },
    notes: {
      applications: ['Rotating shaft applications where the inner race turns with the shaft', 'Stationary housings where the outer race remains fixed'],
      designNotes: ['The rotating race is normally a tighter fit than the stationary race.'],
      limitations: ["Bearing seat tolerance is dictated by the bearing manufacturer's standard, not by general machining tolerance."],
      bestPractices: ['Verify bearing seat diameter against the actual bearing being installed, not just a catalog nominal size.'],
      warnings: ['An oversized bearing seat is a common cause of premature bearing failure on reverse-engineered shafts.'],
    },
    visualType: 'bearings',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'threads',
    number: '07',
    label: 'Thread Standards',
    icon: 'cad',
    description:
      'Thread identification is one of the most common reverse-engineering tasks — matching pitch and standard correctly is what makes a replacement fastener or threaded feature actually fit.',
    topics: topics('Metric Threads', 'UNC', 'UNF', 'Pitch', 'Major Diameter', 'Minor Diameter'),
    referenceTable: {
      columns: ['Thread', 'Pitch', 'Standard', 'Typical Application'],
      rows: [
        ['M6', '1.0 mm', 'Metric Coarse', 'General fasteners'],
        ['M8', '1.25 mm', 'Metric Coarse', 'General fasteners, housings'],
        ['M10', '1.5 mm', 'Metric Coarse', 'Structural fasteners'],
        ['1/4-20', '20 TPI', 'UNC', 'Imported machinery, US-spec equipment'],
        ['5/16-24', '24 TPI', 'UNF', 'Fine-pitch fasteners, vibration-prone joints'],
      ],
    },
    notes: {
      applications: ['Replacement fasteners for imported machinery (UNC/UNF)', 'General metric fastening and threaded features'],
      designNotes: ['Pitch must be measured, not assumed — visually similar threads can have different pitch.'],
      limitations: ['Mixed-standard assemblies (metric housing, UNC fastener) are common on imported equipment and easy to misidentify.'],
      bestPractices: ['Use a thread pitch gauge to confirm pitch before manufacturing a replacement threaded component.'],
      warnings: ['Cutting a metric thread into a UNC-tapped hole (or vice versa) will appear to start engaging before binding and damaging the thread.'],
    },
    visualType: 'threads',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'heat-treatment',
    number: '08',
    label: 'Heat Treatment',
    icon: 'turnaround',
    description:
      "Heat treatment changes a material's hardness, strength, and toughness without changing its shape. Selecting the right process is part of getting a replacement part to perform like the original.",
    topics: topics('Annealing', 'Normalizing', 'Hardening', 'Tempering', 'Case Hardening', 'Nitriding'),
    referenceTable: {
      columns: ['Process', 'Hardness Range', 'Purpose'],
      rows: [
        ['Annealing', '~150–200 HB', 'Softens material, relieves internal stress before machining'],
        ['Normalizing', '~180–220 HB', 'Refines grain structure for consistent machining'],
        ['Hardening', '55–62 HRC', 'Maximizes hardness and wear resistance'],
        ['Tempering', '40–55 HRC', 'Reduces brittleness after hardening, restores toughness'],
        ['Case Hardening', '58–62 HRC (surface)', 'Hard wear surface with a tougher, ductile core'],
        ['Nitriding', '900–1100 HV (surface)', 'Surface hardening with minimal distortion'],
      ],
    },
    notes: {
      applications: ['Hardening + tempering for shafts and gears under wear/load', 'Case hardening for components needing a tough core and hard surface'],
      designNotes: ['Specify hardness range and the surface it applies to (case vs. through-hardened) — they are not interchangeable.'],
      limitations: ['Heat treatment can introduce distortion — critical dimensions are typically finish-ground after treatment, not before.'],
      bestPractices: ["Match the process to the original part's hardness reading wherever possible, rather than defaulting to maximum hardness."],
      warnings: ['Over-hardening a component that should retain toughness (e.g. impact-loaded parts) increases the risk of brittle fracture in service.'],
    },
    visualType: 'heat-treatment',
    coverage: ALL_DISCIPLINES,
  },
  {
    id: 'calculations',
    number: '09',
    label: 'Engineering Calculations',
    icon: 'measurement',
    description:
      'These are the standing formulas referenced during machining setup and reverse engineering — presented as a handbook page, not a calculator.',
    topics: topics('Torque', 'RPM', 'Surface Speed', 'Feed Rate', 'Power', 'Gear Ratio'),
    referenceTable: {
      columns: ['Formula', 'Equation', 'Variables'],
      rows: [
        ['Torque', 'T = (P × 60) / (2 × π × N)', 'T = torque (Nm), P = power (W), N = RPM'],
        ['RPM', 'N = (Vc × 1000) / (π × D)', 'N = RPM, Vc = cutting speed (m/min), D = diameter (mm)'],
        ['Surface Speed', 'Vc = (π × D × N) / 1000', 'Vc = surface speed (m/min), D = diameter (mm), N = RPM'],
        ['Feed Rate', 'Vf = f × N', 'Vf = feed rate (mm/min), f = feed per rev (mm), N = RPM'],
        ['Power', 'P = (T × N) / 9550', 'P = power (kW), T = torque (Nm), N = RPM'],
        ['Gear Ratio', 'GR = T2 / T1', 'GR = gear ratio, T1/T2 = teeth on driving/driven gear'],
      ],
    },
    notes: {
      applications: ['Setting spindle speed and feed rate for a given material and tool', 'Back-calculating drive requirements for a reverse-engineered gear train'],
      designNotes: ['Surface speed is set by the material/tool combination; RPM is then derived from it for the actual part diameter.'],
      limitations: ['These are nominal formulas — actual setup is adjusted for tool wear, rigidity, and coolant condition on the floor.'],
      bestPractices: ['Recalculate surface speed whenever diameter changes significantly along a part, not just once at setup.'],
      warnings: ['Running a large-diameter cut at a small-diameter RPM produces excessive surface speed and accelerates tool wear.'],
    },
    visualType: 'calculations',
    coverage: ALL_DISCIPLINES.filter((d) => d !== 'maintenance'),
  },
  {
    id: 'gdt',
    number: '10',
    label: 'Inspection & GD&T',
    icon: 'inspection',
    description:
      "Geometric dimensioning and tolerancing communicates form and position requirements that a plain dimension can't. These are the characteristics most often called out on a drawing.",
    topics: topics('Flatness', 'Parallelism', 'Concentricity', 'Runout', 'Position', 'Perpendicularity'),
    referenceTable: {
      columns: ['Characteristic', 'Symbol Type', 'Typical Tolerance'],
      rows: [
        ['Flatness', 'Form', '0.01 – 0.05 mm'],
        ['Parallelism', 'Orientation', '0.01 – 0.03 mm'],
        ['Concentricity', 'Location', '0.02 – 0.05 mm'],
        ['Runout', 'Runout', '0.01 – 0.02 mm'],
        ['Position', 'Location', '0.05 – 0.1 mm (true position)'],
        ['Perpendicularity', 'Orientation', '0.01 – 0.03 mm'],
      ],
    },
    notes: {
      applications: ['Specifying form and position requirements that a linear tolerance cannot capture'],
      designNotes: ['Every GD&T callout needs a clear datum reference — the symbol alone is not enough to inspect against.'],
      limitations: ['Runout and concentricity both control rotational accuracy but are inspected differently — they are not interchangeable terms.'],
      bestPractices: ['Reconstruct the datum scheme first when reverse engineering a toleranced part, before assigning individual callouts.'],
      warnings: ['Omitting a datum reference on a position callout makes the tolerance technically unmeasurable.'],
    },
    visualType: 'gdt',
    coverage: ALL_DISCIPLINES.filter((d) => d !== 'maintenance'),
  },
];

const NOTE_DEFS: { key: keyof EngineeringNotes; label: string; icon: IconType }[] = [
  { key: 'applications', label: 'Common Applications', icon: 'oem' },
  { key: 'designNotes', label: 'Design Notes', icon: 'design' },
  { key: 'limitations', label: 'Limitations', icon: 'broken' },
  { key: 'bestPractices', label: 'Best Practices', icon: 'certification' },
  { key: 'warnings', label: 'Warning Conditions', icon: 'urgent' },
];

/* ---------------------------------------------------------------------- */
/* Reference illustrations — hand-drawn SVG, TechnicalIcon's stroke       */
/* language. Monochrome white/40 base, signal-red accent highlights.      */
/* ---------------------------------------------------------------------- */

function MaterialsVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="24" y="50" width="56" height="90" fill="rgba(255,255,255,0.05)" stroke="currentColor" strokeWidth="1.25" />
      <rect x="92" y="50" width="56" height="90" fill="rgba(255,255,255,0.02)" stroke="currentColor" strokeWidth="1.25" />
      <g opacity="0.35">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`a${i}`} x1="92" y1={60 + i * 14} x2="148" y2={50 + i * 14} stroke="currentColor" strokeWidth="0.75" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`b${i}`} x1="92" y1={50 + i * 14} x2="148" y2={60 + i * 14} stroke="currentColor" strokeWidth="0.75" />
        ))}
      </g>
      <rect x="160" y="50" width="56" height="90" fill="rgba(255,255,255,0.02)" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 20 }).map((_, idx) => {
        const row = Math.floor(idx / 4);
        const col = idx % 4;
        return <circle key={idx} cx={170 + col * 12} cy={62 + row * 16} r="1.2" fill="currentColor" opacity="0.5" />;
      })}
      <text x="52" y="155" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" opacity="0.7">STEEL</text>
      <text x="120" y="155" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" opacity="0.7">STAINLESS</text>
      <text x="188" y="155" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" opacity="0.7">POLYMER</text>
      <line x1="24" y1="178" x2="216" y2="178" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={24 + i * 24} y1="175" x2={24 + i * 24} y2="181" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      ))}
      <polygon points="80,171 76,163 84,163" fill="currentColor" className="text-accent" />
      <text x="80" y="198" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">HARDNESS →</text>
    </svg>
  );
}

function FitsVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <circle cx="120" cy="110" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="120" cy="110" r="66" fill="rgba(255,255,255,0.02)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="120" cy="110" r="48" fill="rgba(255,255,255,0.05)" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
      <line x1="120" y1="20" x2="120" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 3 1 3" opacity="0.4" />
      <line x1="30" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 3 1 3" opacity="0.4" />
      <line x1="120" y1="110" x2="168" y2="110" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <polygon points="168,110 160,106 160,114" fill="currentColor" className="text-accent" />
      <text x="140" y="100" fontSize="9" fontFamily="monospace" fill="currentColor" className="text-accent">H7</text>
      <text x="140" y="128" fontSize="9" fontFamily="monospace" fill="currentColor">g6</text>
    </svg>
  );
}

function ToleranceVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <line x1="30" y1="60" x2="30" y2="180" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="210" y1="60" x2="210" y2="180" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="30" y1="120" x2="210" y2="120" stroke="currentColor" strokeWidth="1.25" />
      <polygon points="30,120 38,116 38,124" fill="currentColor" />
      <polygon points="210,120 202,116 202,124" fill="currentColor" />
      <text x="120" y="112" fontSize="10" textAnchor="middle" fontFamily="monospace" fill="currentColor">25.00</text>
      <line x1="100" y1="138" x2="140" y2="138" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <line x1="100" y1="145" x2="140" y2="145" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <line x1="100" y1="138" x2="100" y2="145" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <line x1="140" y1="138" x2="140" y2="145" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <text x="120" y="160" fontSize="9" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">± 0.01</text>
    </svg>
  );
}

function SurfaceFinishVisual() {
  const profiles = [
    { y: 70, amp: 3, label: 'Ra 0.4', accent: true },
    { y: 125, amp: 8, label: 'Ra 1.6', accent: false },
    { y: 178, amp: 15, label: 'Ra 6.3', accent: false },
  ];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      {profiles.map((p) => {
        const points = Array.from({ length: 17 })
          .map((_, j) => {
            const x = 24 + j * 11;
            const y = p.y + (j % 2 === 0 ? -p.amp : p.amp) * (0.6 + 0.4 * Math.abs(Math.sin(j)));
            return `${x},${y}`;
          })
          .join(' ');
        return (
          <g key={p.label}>
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.25" className={p.accent ? 'text-accent' : ''} opacity={p.accent ? 1 : 0.55} />
            <text x="200" y={p.y + 3} fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">{p.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GearVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <circle cx="120" cy="115" r="50" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={120 + Math.cos(a) * 50}
            y1={115 + Math.sin(a) * 50}
            x2={120 + Math.cos(a) * 58}
            y2={115 + Math.sin(a) * 58}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        );
      })}
      <circle cx="120" cy="115" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" className="text-accent" />
      <circle cx="120" cy="115" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="120" y1="115" x2="120" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="115" x2="155" y2="73" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <text x="135" y="88" fontSize="8" fontFamily="monospace" fill="currentColor" className="text-accent">20°</text>
    </svg>
  );
}

function BearingsVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="40" y="50" width="160" height="130" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="120" cy="115" r="55" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="120" cy="115" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={120 + Math.cos(a) * 43.5}
            cy={115 + Math.sin(a) * 43.5}
            r="4.5"
            fill="rgba(255,90,54,0.1)"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
          />
        );
      })}
      <circle cx="120" cy="115" r="14" fill="rgba(255,255,255,0.05)" stroke="currentColor" strokeWidth="1.25" />
      <line x1="20" y1="115" x2="40" y2="115" stroke="currentColor" strokeWidth="3" />
      <line x1="200" y1="115" x2="220" y2="115" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function ThreadsVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <rect x="40" y="80" width="120" height="60" fill="rgba(255,255,255,0.03)" stroke="currentColor" strokeWidth="1.25" />
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M${52 + i * 16} 80 L${44 + i * 16} 140`} stroke="currentColor" strokeWidth="1" opacity="0.6" />
      ))}
      <line x1="52" y1="150" x2="68" y2="150" stroke="currentColor" strokeWidth="1" className="text-accent" />
      <polygon points="52,150 58,147 58,153" fill="currentColor" className="text-accent" />
      <polygon points="68,150 62,147 62,153" fill="currentColor" className="text-accent" />
      <text x="60" y="163" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" className="text-accent">PITCH</text>
      <circle cx="190" cy="60" r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M178 70 L190 48 L202 70" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <text x="190" y="205" fontSize="8" textAnchor="middle" fontFamily="monospace" fill="currentColor" opacity="0.7">60° PROFILE</text>
    </svg>
  );
}

function HeatTreatmentVisual() {
  const bars = [
    { label: 'ANNEAL', h: 30 },
    { label: 'NORM.', h: 38 },
    { label: 'HARDEN', h: 90 },
    { label: 'TEMPER', h: 65 },
    { label: 'CASE', h: 95 },
    { label: 'NITRIDE', h: 100 },
  ];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <text x="24" y="24" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">RELATIVE HARDNESS</text>
      <line x1="24" y1="180" x2="216" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {bars.map((b, i) => {
        const x = 30 + i * 31;
        const barHeight = b.h * 0.9;
        return (
          <g key={b.label}>
            <rect
              x={x}
              y={180 - barHeight}
              width="18"
              height={barHeight}
              fill="rgba(255,255,255,0.05)"
              stroke="currentColor"
              strokeWidth="1"
              className={b.h >= 90 ? 'text-accent' : ''}
            />
            <text x={x + 9} y="192" fontSize="6.5" textAnchor="middle" fontFamily="monospace" fill="currentColor" opacity="0.7">
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CalculationsVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <circle cx="120" cy="110" r="55" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="120" y1="110" x2="175" y2="110" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <text x="148" y="103" fontSize="8" fontFamily="monospace" fill="currentColor" className="text-accent">D</text>
      <path d="M120 55 A55 55 0 0 1 168 85" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <polygon points="168,85 160,82 165,90" fill="currentColor" />
      <text x="96" y="45" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">N (RPM)</text>
      <path d="M105 110 A15 15 0 0 1 135 110" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
      <polygon points="135,110 129,106 129,113" fill="currentColor" className="text-accent" />
      <text x="120" y="200" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" className="text-accent">
        T = (P × 60) / (2πN)
      </text>
    </svg>
  );
}

function GdtVisual() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full text-white/40">
      <g transform="translate(35,70)">
        <rect x="0" y="0" width="50" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <rect x="50" y="0" width="62" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <rect x="112" y="0" width="40" height="32" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="25" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
        <line x1="16" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <line x1="25" y1="7" x2="25" y2="25" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <text x="81" y="21" fontSize="10" textAnchor="middle" fontFamily="monospace" fill="currentColor">⌀0.05</text>
        <text x="132" y="21" fontSize="11" textAnchor="middle" fontFamily="monospace" fill="currentColor">A</text>
      </g>
      <line x1="40" y1="165" x2="150" y2="165" stroke="currentColor" strokeWidth="1.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={45 + i * 18} y1="165" x2={38 + i * 18} y2="177" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      ))}
      <rect x="155" y="153" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <text x="165" y="167" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" className="text-accent">A</text>
      <line x1="155" y1="163" x2="150" y2="163" stroke="currentColor" strokeWidth="1" className="text-accent" />
    </svg>
  );
}

function ResourceVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'materials':
      return <MaterialsVisual />;
    case 'fits':
      return <FitsVisual />;
    case 'tolerance':
      return <ToleranceVisual />;
    case 'surface-finish':
      return <SurfaceFinishVisual />;
    case 'gear':
      return <GearVisual />;
    case 'bearings':
      return <BearingsVisual />;
    case 'threads':
      return <ThreadsVisual />;
    case 'heat-treatment':
      return <HeatTreatmentVisual />;
    case 'calculations':
      return <CalculationsVisual />;
    case 'gdt':
      return <GdtVisual />;
    default:
      return null;
  }
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function TechnicalResourceLibrary() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = RESOURCE_CATEGORIES[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="resources" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 09 — Engineering Reference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Technical Resource Library
          </h2>
          <p className="text-lg text-foreground/70">
            Engineering decisions are easier when the standards, fits, materials, and tolerances
            are documented. These references summarize the language manufacturing engineers use
            every day.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Archive Console */}
        <ConsolePanel>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
            {/* Archive Index */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6">
              <TimelineIndex
                title="Archive Index"
                items={RESOURCE_CATEGORIES}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            </div>

            {/* Engineering Document Panel */}
            <div className="lg:col-span-8 p-4 sm:p-6 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: 'easeOut' }}
                >
                  {/* Title + description */}
                  <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">
                    Reference {active.number}/10
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white">
                    {active.label}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light mb-6">{active.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {active.topics.map((topic) => (
                      <span key={topic.name} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-[11px]">
                        {topic.name}
                      </span>
                    ))}
                  </div>

                  {/* Illustration */}
                  <div className="relative aspect-[4/3] sm:aspect-video border border-white/10 bg-black/30 overflow-hidden mb-6">
                    {[
                      'top-3 left-3 border-t border-l',
                      'top-3 right-3 border-t border-r',
                      'bottom-3 left-3 border-b border-l',
                      'bottom-3 right-3 border-b border-r',
                    ].map((pos) => (
                      <div key={pos} className={`absolute w-4 h-4 border-accent/60 ${pos}`} />
                    ))}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-white/50 z-10">
                      <span>REF {active.number}/10</span>
                      <span className="text-accent text-right">{active.label.toUpperCase()}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
                      <div className="w-full max-w-[280px]">
                        <ResourceVisual type={active.visualType} />
                      </div>
                    </div>
                  </div>

                  {/* Reference Table */}
                  <div className="border border-white/10 overflow-x-auto mb-6">
                    <table className="w-full border-collapse min-w-[480px]">
                      <thead>
                        <tr>
                          {active.referenceTable.columns.map((col) => (
                            <th key={col} className="p-2.5 border-b border-white/10 text-left text-[9px] font-bold tracking-widest uppercase text-white/50">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {active.referenceTable.rows.map((row, i) => (
                          <tr key={i} className={i % 2 === 1 ? 'bg-white/[0.02]' : ''}>
                            {row.map((cell, j) => (
                              <td key={j} className={`p-2.5 text-xs align-top ${j === 0 ? 'text-white font-medium whitespace-nowrap' : 'text-white/70'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Engineering Notes */}
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-4">
                      Engineering Notes
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {NOTE_DEFS.map((def) => {
                        const items = active.notes[def.key];
                        return (
                          <div
                            key={def.key}
                            className={`p-4 border border-white/10 bg-white/[0.03] ${def.key === 'warnings' ? 'sm:col-span-2' : ''}`}
                          >
                            <div className="flex items-center gap-2 mb-2.5 text-white/50">
                              <TechnicalIcon type={def.icon} className="w-4 h-4" />
                              <p className="text-[10px] font-bold tracking-widest uppercase">{def.label}</p>
                            </div>
                            <ul className="space-y-1.5">
                              {items.map((item) => (
                                <li key={item} className="text-[12px] text-white/70 leading-snug pl-3 relative">
                                  <span className="absolute left-0 text-white/30">—</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ConsolePanel>

        <DashboardMatrix
          title="Engineering Reference Matrix"
          description="Where each reference is used across the engineering workflow."
          rowHeaderLabel="Reference"
          columns={MATRIX_COLUMNS}
          rows={RESOURCE_CATEGORIES.map((cat) => ({
            id: cat.id,
            label: cat.label,
            numberLabel: cat.number,
            coverage: cat.coverage,
          }))}
          footnote="· indicates a reference that applies indirectly rather than as a primary working document for that discipline."
          coveredLabel="Used in this discipline"
          notCoveredLabel="Not a primary reference here"
        />
      </div>
    </section>
  );
}
