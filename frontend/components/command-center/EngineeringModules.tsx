/* PREMA ENGINEERING WORKS — Engineering Modules */
/* Client Component: Cards for Materials, Fits & Tolerances, Heat Treatments, Surface Finishes, */
/* Thread Standards, Bearings, Gear Data, Engineering Notes, Certificates, Reference Tables */
/* Each card uses TechnicalIcon, displays summary metrics, shows expandable details. */

'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Module Definitions ─── */

interface EngineeringModule {
  id: string;
  title: string;
  icon: IconType;
  description: string;
  metrics: { label: string; value: string }[];
  details: string[];
}

const MODULES: EngineeringModule[] = [
  {
    id: 'materials',
    title: 'Materials',
    icon: 'material',
    description: 'Steel grades, alloys, non-ferrous metals, and polymer specifications for precision manufacturing.',
    metrics: [
      { label: 'Total Grades', value: '247' },
      { label: 'Steel Alloys', value: '156' },
      { label: 'Non-Ferrous', value: '91' },
    ],
    details: [
      'Carbon steels: C15, C45, C60, EN8, EN9, EN19, EN24, EN36',
      'Stainless steels: 304, 316, 410, 420, 17-4PH',
      'Aluminium: 6061, 7075, 2024, 5052',
      'Copper alloys: C110, C260, C360, C932',
    ],
  },
  {
    id: 'fits',
    title: 'Fits & Tolerances',
    icon: 'measurement',
    description: 'ISO system of limits and fits for hole-basis and shaft-basis assemblies.',
    metrics: [
      { label: 'Fit Combinations', value: '89' },
      { label: 'ISO Standards', value: '12' },
      { label: 'Tolerance Grades', value: 'IT01–IT16' },
    ],
    details: [
      'Clearance fits: H7/f7, H7/g6, H7/h6',
      'Transition fits: H7/k6, H7/n6, H7/m6',
      'Interference fits: H7/p6, H7/s6, H7/u6',
      'ISO 286-1, ISO 1800 series',
    ],
  },
  {
    id: 'heat',
    title: 'Heat Treatments',
    icon: 'precision',
    description: 'Hardening, tempering, annealing, case hardening, nitriding, and surface treatment processes.',
    metrics: [
      { label: 'Processes', value: '38' },
      { label: 'Hardness Range', value: 'HRC 20–68' },
      { label: 'Depth Range', value: '0.1–6.0 mm' },
    ],
    details: [
      'Through hardening: Quench & temper 800–1050°C',
      'Case hardening: Carburizing 900–950°C, 0.5–2.0mm depth',
      'Nitriding: 500–550°C, 0.1–0.6mm depth',
      'Induction hardening: Surface HRC 50–62',
    ],
  },
  {
    id: 'surface',
    title: 'Surface Finishes',
    icon: 'finishing',
    description: 'Surface roughness specifications, finishing processes, andRa value references.',
    metrics: [
      { label: 'Finish Grades', value: '64' },
      { label: 'Ra Range', value: '0.05–12.5 µm' },
      { label: 'Processes', value: '18' },
    ],
    details: [
      'Ground finish: Ra 0.4–1.6 µm',
      'Fine turned: Ra 1.6–3.2 µm',
      'Milled: Ra 3.2–6.3 µm',
      'As-cast / As-forged: Ra 6.3–12.5 µm',
    ],
  },
  {
    id: 'threads',
    title: 'Thread Standards',
    icon: 'gear-part',
    description: 'Metric coarse, fine, Whitworth, UN, and special thread specifications.',
    metrics: [
      { label: 'Thread Types', value: '156' },
      { label: 'Size Range', value: 'M2–M64' },
      { label: 'Standards', value: 'ISO 68' },
    ],
    details: [
      'Metric coarse: M3×0.5 to M64×6.0',
      'Metric fine: M8×1.0, M10×1.25, M12×1.5',
      'Unified: UNC, UNF, UNEF series',
      'BSW / BSF for legacy equipment',
    ],
  },
  {
    id: 'bearings',
    title: 'Bearings',
    icon: 'machining',
    description: 'Rolling element bearing catalog — ball, roller, needle, and thrust bearing specifications.',
    metrics: [
      { label: 'Bearing Models', value: '312' },
      { label: 'Bore Range', value: '3–500 mm' },
      { label: 'Load Rating', value: 'Up to 850 kN' },
    ],
    details: [
      'Deep groove ball: 6000, 6200, 6300 series',
      'Cylindrical roller: NU, NJ, NUP series',
      'Tapered roller: 30200, 30300 series',
      'Needle roller: NK, NKI, RNA series',
    ],
  },
  {
    id: 'gears',
    title: 'Gear Data',
    icon: 'gear-part',
    description: 'Spur, helical, bevel, and worm gear geometry, material, and manufacturing specifications.',
    metrics: [
      { label: 'Gear Profiles', value: '45' },
      { label: 'Module Range', value: '0.3–10' },
      { label: 'Accuracy', value: 'ISO 1328' },
    ],
    details: [
      'Spur gears: Module 0.5–8, PA 20°',
      'Helical gears: Hand L/R, helix 10°–45°',
      'Bevel gears: Straight, spiral, zerol',
      'Worm gears: 1-start to 4-start',
    ],
  },
  {
    id: 'notes',
    title: 'Engineering Notes',
    icon: 'drawing',
    description: 'Design guidelines, manufacturing best practices, and material selection decision trees.',
    metrics: [
      { label: 'Documents', value: '95' },
      { label: 'Categories', value: '12' },
      { label: 'Last Updated', value: '2026-06' },
    ],
    details: [
      'Design for manufacturability (DFM) guidelines',
      'GD&T reference per ASME Y14.5-2018',
      'Material selection decision matrices',
      'Surface finish selection guidelines',
    ],
  },
  {
    id: 'certificates',
    title: 'Certificates',
    icon: 'certification',
    description: 'Material test certificates, quality management documentation, and compliance records.',
    metrics: [
      { label: 'Cert. Records', value: '21' },
      { label: 'Standards', value: 'EN 10204' },
      { label: 'Valid Through', value: '2027-12' },
    ],
    details: [
      'EN 10204 Type 3.1 mill certificates',
      'EN 10204 Type 3.2 third-party inspection',
      'RoHS and REACH compliance documentation',
      'ISO 9001:2015 QMS certificates',
    ],
  },
  {
    id: 'reference',
    title: 'Reference Tables',
    icon: 'engineering',
    description: 'Consolidated reference data — conversion factors, physical constants, and engineering formulas.',
    metrics: [
      { label: 'Datasets', value: '34' },
      { label: 'Conversions', value: '120+' },
      { label: 'Formulas', value: '48' },
    ],
    details: [
      'Unit conversions: mm/inch, N/lbf, °C/°F',
      'Physical properties: density, modulus, CTE',
      'Standard formulas: stress, strain, deflection',
      'Fastener torque tables (metric)',
    ],
  },
];

/* ─── Animation ─── */

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

/* ─── Component ─── */

interface EngineeringModulesProps {
  setActiveView?: (view: string) => void;
}

export default function EngineeringModules({ setActiveView }: EngineeringModulesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-label="Engineering Modules" className="bg-background">
      <div className="container py-10 lg:py-14 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
            Reference Modules
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Engineering Data
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Core engineering reference categories. Select a module to view specifications and standards.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          {...(prefersReducedMotion ? {} : stagger)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {MODULES.map((mod) => {
            const isExpanded = expandedId === mod.id;
            return (
              <motion.article
                key={mod.id}
                variants={prefersReducedMotion ? undefined : cardVariants}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className={`border bg-card transition-all duration-200 ${
                  isExpanded ? 'border-accent shadow-lg' : 'border-border hover:border-accent/40 hover:shadow-md'
                }`}
                layout={!prefersReducedMotion}
              >
                <button
                  onClick={() => toggle(mod.id)}
                  className="w-full text-left p-5 flex flex-col gap-4"
                  aria-expanded={isExpanded}
                  aria-controls={`module-details-${mod.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <TechnicalIcon type={mod.icon} className="w-6 h-6 text-accent flex-shrink-0" />
                      <h3 className="text-sm font-bold tracking-tight">{mod.title}</h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                    {mod.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground">
                          {m.label}
                        </p>
                        <p className="text-xs font-bold font-mono text-foreground mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </button>

                {isExpanded && (
                  <div
                    id={`module-details-${mod.id}`}
                    role="region"
                    aria-label={`${mod.title} details`}
                    className="px-5 pb-5 border-t border-border pt-4"
                  >
                    <ul className="space-y-2">
                      {mod.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-[11px] text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-px before:bg-accent"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                    {setActiveView && (
                      <button
                        onClick={() => {
                          let targetId = mod.id;
                          if (mod.id === 'fits') targetId = 'fits';
                          if (mod.id === 'threads') targetId = 'thread-calc';
                          if (mod.id === 'bearings') targetId = 'bearing-finder';
                          if (mod.id === 'surface') targetId = 'surface-sel';
                          if (mod.id === 'heat') targetId = 'heat-guide';
                          if (mod.id === 'notes') targetId = 'notes';
                          if (mod.id === 'reference') targetId = 'reference';
                          setActiveView(targetId);
                        }}
                        className="mt-4 w-full text-center py-2 px-3 border border-accent/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-[10px] font-bold tracking-wider uppercase text-accent transition-all duration-200"
                      >
                        Open Interactive Workbench
                      </button>
                    )}
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}