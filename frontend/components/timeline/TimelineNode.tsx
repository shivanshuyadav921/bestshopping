/* PREMA ENGINEERING WORKS — Timeline Node */
/* Individual timeline entry with animated reveal, expandable details, */
/* and measured connector dot. */

'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import TechnicalIcon from '@/components/TechnicalIcon';
import TimelineCard from './TimelineCard';
import type { TimelineEntry } from '@/types/timeline';
import { CATEGORY_COLORS } from '@/types/timeline';

interface TimelineNodeProps {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
  onSelect?: (id: string) => void;
  prefersReducedMotion: boolean;
  isLast: boolean;
}

const TimelineNode = memo(function TimelineNode({
  entry,
  index,
  isActive,
  onSelect,
  prefersReducedMotion,
  isLast,
}: TimelineNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColor = CATEGORY_COLORS[entry.category];

  return (
    <motion.div
      role="listitem"
      className={`relative pl-16 md:pl-20 ${isLast ? '' : 'pb-12'}`}
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: index * 0.05 }}
    >
      {/* Connector dot */}
      <div
        className={`absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center ${
          isActive
            ? 'border-accent bg-accent/20 scale-110'
            : 'border-white/20 bg-background'
        }`}
        aria-hidden="true"
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isActive ? 'bg-accent' : 'bg-white/30'
          }`}
        />
      </div>

      {/* Year label — sticky on desktop */}
      <div className="sticky top-24 mb-3">
        <span className="text-xs font-mono font-bold text-accent tracking-widest">
          {entry.year}
        </span>
      </div>

      {/* Title and subtitle */}
      <div className="mb-3">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="text-sm text-foreground/60 mt-1">{entry.subtitle}</p>
        )}
      </div>

      {/* TechnicalIcon */}
      <div className={`mb-4 ${categoryColor}`}>
        <TechnicalIcon type={entry.icon} className="w-8 h-8" />
      </div>

      {/* Expandable card */}
      <TimelineCard
        entry={entry}
        isExpanded={isExpanded}
        onToggle={() => {
          setIsExpanded(!isExpanded);
          onSelect?.(entry.id);
        }}
      />
    </motion.div>
  );
});

export default TimelineNode;