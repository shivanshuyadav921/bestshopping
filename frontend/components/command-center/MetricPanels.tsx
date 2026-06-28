/* PREMA ENGINEERING WORKS — Metric Panels */
/* Client Component: Metric cards showing engineering data counts with gauge visualizations */
/* Placeholder data only. */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Metric Definitions ─── */

interface MetricItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: IconType;
  /** Gauge fill as percentage (0–100) */
  fill: number;
  /** Color accent class */
  accent?: boolean;
}

const METRICS: MetricItem[] = [
  { id: 'materials', label: 'Materials', value: 247, unit: 'grades', icon: 'material', fill: 78, accent: true },
  { id: 'bearings', label: 'Bearings', value: 312, unit: 'models', icon: 'machining', fill: 92 },
  { id: 'threads', label: 'Thread Standards', value: 156, unit: 'specs', icon: 'gear-part', fill: 65 },
  { id: 'surface', label: 'Surface Finishes', value: 64, unit: 'finishes', icon: 'finishing', fill: 42 },
  { id: 'heat', label: 'Heat Treatments', value: 38, unit: 'processes', icon: 'precision', fill: 28 },
  { id: 'reference', label: 'Reference Datasets', value: 34, unit: 'datasets', icon: 'engineering', fill: 22 },
];

/* ─── Animation ─── */

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

/* ─── Gauge Component ─── */

function GaugeBar({ fill, accent }: { fill: number; accent?: boolean }) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <div className="w-full h-1.5 bg-secondary overflow-hidden" role="progressbar" aria-valuenow={fill} aria-valuemin={0} aria-valuemax={100} aria-label={`${fill}% capacity`}>
      <motion.div
        className={`h-full ${accent ? 'bg-accent' : 'bg-foreground'}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${fill}%` }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.23, 1, 0.32, 1] }}
      />
    </div>
  );
}

/* ─── Component ─── */

export default function MetricPanels() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Engineering Metrics" className="bg-secondary/30 border-y border-border">
      <div className="container py-10 lg:py-14 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
              System Overview
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
              Engineering Metrics
            </h2>
          </div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
            Placeholder Data
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          {...(prefersReducedMotion ? {} : stagger)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {METRICS.map((metric) => (
            <motion.div
              key={metric.id}
              variants={prefersReducedMotion ? undefined : cardVariants}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
              className="p-5 border border-border bg-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <TechnicalIcon
                  type={metric.icon}
                  className={`w-5 h-5 ${metric.accent ? 'text-accent' : 'text-muted-foreground'}`}
                />
                <span className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground">
                  {metric.unit}
                </span>
              </div>

              <div>
                <p className={`text-3xl font-bold font-mono leading-none ${metric.accent ? 'text-accent' : 'text-foreground'}`}>
                  {metric.value}
                </p>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mt-2">
                  {metric.label}
                </p>
              </div>

              <GaugeBar fill={metric.fill} accent={metric.accent} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}