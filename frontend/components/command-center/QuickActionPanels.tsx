/* PREMA ENGINEERING WORKS — Quick Action Panels */
/* Client Component: Quick-access action cards for common engineering lookups */
/* UI only — no API connections. Placeholder data. */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Sliders,
  Disc,
  Settings,
  Paintbrush,
  Thermometer,
  FileText,
  Clock,
} from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Quick Action Definitions ─── */

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  stat: string;
  statLabel: string;
}

const ACTIONS: QuickAction[] = [
  {
    id: 'material-lookup',
    title: 'Material Lookup',
    description: 'Search by grade, alloy designation, or mechanical properties across 247 material specifications.',
    icon: 'material',
    stat: '247',
    statLabel: 'grades',
  },
  {
    id: 'tolerance-lookup',
    title: 'Tolerance Lookup',
    description: 'ISO 286 fits, ISO 2768 general tolerances, and custom tolerance stack-up calculations.',
    icon: 'measurement',
    stat: '89',
    statLabel: 'fits',
  },
  {
    id: 'bearing-finder',
    title: 'Bearing Finder',
    description: 'Cross-reference bearing models by dimensions, load ratings, or application requirements.',
    icon: 'machining',
    stat: '312',
    statLabel: 'models',
  },
  {
    id: 'thread-calculator',
    title: 'Thread Calculator',
    description: 'Metric, UNC, UNF thread dimensions, tap drill sizes, and torque specifications.',
    icon: 'gear-part',
    stat: '156',
    statLabel: 'specs',
  },
  {
    id: 'surface-finish',
    title: 'Surface Finish Selector',
    description: 'Match Ra values to manufacturing processes and application requirements.',
    icon: 'finishing',
    stat: '64',
    statLabel: 'finishes',
  },
  {
    id: 'heat-treatment',
    title: 'Heat Treatment Guide',
    description: 'Process parameters, hardness outcomes, and material-specific treatment recommendations.',
    icon: 'precision',
    stat: '38',
    statLabel: 'processes',
  },
  {
    id: 'engineering-notes',
    title: 'Engineering Notes',
    description: 'DFM guidelines, GD&T references, material selection matrices, and design best practices.',
    icon: 'drawing',
    stat: '95',
    statLabel: 'documents',
  },
  {
    id: 'recent-activity',
    title: 'Recent Activity',
    description: 'Review your recent searches, viewed specifications, and downloaded reference data.',
    icon: 'certification',
    stat: '12',
    statLabel: 'sessions',
  },
];

/* ─── Animation ─── */

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
};

/* ─── Component ─── */

interface QuickActionPanelsProps {
  setActiveView?: (view: string) => void;
}

export default function QuickActionPanels({ setActiveView }: QuickActionPanelsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Quick Actions" className="bg-background">
      <div className="container py-10 lg:py-14 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
            Quick Access
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Lookup Tools
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Instant access to the most-used engineering reference tools.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          {...(prefersReducedMotion ? {} : stagger)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {ACTIONS.map((action) => (
            <motion.button
              key={action.id}
              onClick={() => {
                if (setActiveView) {
                  let targetId = action.id;
                  if (action.id === 'thread-calculator') targetId = 'thread-calc';
                  if (action.id === 'surface-finish') targetId = 'surface-sel';
                  if (action.id === 'heat-treatment') targetId = 'heat-guide';
                  if (action.id === 'engineering-notes') targetId = 'notes';
                  if (action.id === 'recent-activity') targetId = 'dashboard';
                  setActiveView(targetId);
                }
              }}
              variants={prefersReducedMotion ? undefined : cardVariants}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
              className="group text-left p-5 border border-border bg-card hover:border-accent/40 hover:shadow-md transition-all duration-200"
              aria-label={`${action.title}: ${action.description}`}
            >
              <div className="flex items-start justify-between mb-4">
                <TechnicalIcon type={action.icon} className="w-6 h-6 text-accent flex-shrink-0" />
                <ArrowRight
                  className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-sm font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
                {action.title}
              </h3>

              <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {action.description}
              </p>

              <div className="flex items-baseline gap-1.5 pt-3 border-t border-border">
                <span className="text-lg font-bold font-mono text-foreground">{action.stat}</span>
                <span className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground">
                  {action.statLabel}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}