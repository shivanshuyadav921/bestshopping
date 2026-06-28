/* PREMA ENGINEERING WORKS — Timeline Section */
/* Wraps a group of timeline entries with a section header, */
/* description, and sticky category label. */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { TimelineSection as TimelineSectionType } from '@/types/timeline';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/types/timeline';

interface TimelineSectionProps {
  section: TimelineSectionType;
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}

const TimelineSection = memo(function TimelineSection({
  section,
  prefersReducedMotion,
  children,
}: TimelineSectionProps) {
  const categoryColor = CATEGORY_COLORS[section.entries[0]?.category ?? 'origins'];

  return (
    <section
      className="mb-20"
      aria-labelledby={`section-${section.id}`}
    >
      {/* Section header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono font-bold text-accent tracking-widest">
            {section.number}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
        </div>
        <div className={`mb-3 ${categoryColor}`}>
          <TechnicalIcon type={section.icon} className="w-10 h-10" />
        </div>
        <h2
          id={`section-${section.id}`}
          className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
        >
          {section.title}
        </h2>
        <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl font-light">
          {section.description}
        </p>
      </motion.div>

      {/* Timeline entries */}
      {children}
    </section>
  );
});

export default TimelineSection;