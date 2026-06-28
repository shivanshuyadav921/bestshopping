/* PREMA ENGINEERING WORKS — Pinned Standards */
/* Client Component: Pinned engineering standards panel with quick access */
/* Placeholder data only. */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Pin, ExternalLink } from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Placeholder Data ─── */

interface PinnedStandard {
  id: string;
  label: string;
  code: string;
  category: string;
  icon: IconType;
  description: string;
}

const PINNED_STANDARDS: PinnedStandard[] = [
  {
    id: 'ps-1',
    label: 'ISO 2768-mK',
    code: 'ISO 2768',
    category: 'Tolerances',
    icon: 'measurement',
    description: 'General tolerances for linear and angular dimensions — medium class.',
  },
  {
    id: 'ps-2',
    label: 'EN19 Steel',
    code: '708M40',
    category: 'Materials',
    icon: 'material',
    description: 'Cr-Mo alloy steel, 0.40% C, through-hardenable to HRC 28–34.',
  },
  {
    id: 'ps-3',
    label: 'M6–M16 Coarse',
    code: 'ISO 68-1',
    category: 'Threads',
    icon: 'gear-part',
    description: 'Metric coarse thread series for general fastening applications.',
  },
  {
    id: 'ps-4',
    label: '62xx Series',
    code: 'ISO 15',
    category: 'Bearings',
    icon: 'machining',
    description: 'Deep groove ball bearings — single row, sealed and open variants.',
  },
  {
    id: 'ps-5',
    label: 'Ra 0.4–3.2',
    code: 'ISO 4287',
    category: 'Surface',
    icon: 'finishing',
    description: 'Surface roughness range for precision ground and fine turned surfaces.',
  },
  {
    id: 'ps-6',
    label: 'Case Hardening',
    code: 'ISO 4521',
    category: 'Heat Treat',
    icon: 'precision',
    description: 'Carburizing and carbonitriding — 0.5–2.0 mm effective case depth.',
  },
  {
    id: 'ps-7',
    label: 'H7/k6 Fit',
    code: 'ISO 286-1',
    category: 'Fits',
    icon: 'measurement',
    description: 'Transition fit for locating components — pulleys, gears on shafts.',
  },
  {
    id: 'ps-8',
    label: 'RoHS Compliance',
    code: '2011/65/EU',
    category: 'Certificates',
    icon: 'certification',
    description: 'Restriction of Hazardous Substances — material compliance standard.',
  },
];

/* ─── Animation ─── */

const gridVariants = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Component ─── */

export default function PinnedStandards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Pinned Standards" className="bg-card border border-border">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
              Pinned Standards
            </h3>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">
            {PINNED_STANDARDS.length} pinned
          </span>
        </div>

        <motion.div
          className="space-y-2"
          {...(prefersReducedMotion ? {} : gridVariants)}
          initial="initial"
          animate="animate"
          role="list"
          aria-label="Pinned engineering standards"
        >
          {PINNED_STANDARDS.map((item) => (
            <motion.button
              key={item.id}
              variants={prefersReducedMotion ? undefined : cardVariant}
              role="listitem"
              className="w-full text-left p-4 border border-border hover:border-accent/40 hover:bg-secondary/40 transition-all duration-200 group"
              aria-label={`Open ${item.label} — ${item.description}`}
            >
              <div className="flex items-start gap-3">
                <TechnicalIcon
                  type={item.icon}
                  className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-foreground truncate">{item.label}</p>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                    <span className="font-mono font-bold">{item.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase tracking-wider">{item.category}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}