/* PREMA ENGINEERING WORKS — Vertical Timeline Container */
/* Renders a vertical timeline with animated connectors, sticky year labels, */
/* and responsive layout. Supports prefers-reduced-motion. */

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import type { TimelineEntry } from '@/types/timeline';

interface TimelineProps {
  entries: TimelineEntry[];
  activeId?: string;
  onEntrySelect?: (id: string) => void;
  prefersReducedMotion?: boolean;
}

export default function Timeline({ entries, activeId, onEntrySelect, prefersReducedMotion = false }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative" role="list" aria-label="Engineering history timeline">
      {/* Vertical connector line */}
      <div
        className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent"
        aria-hidden="true"
      />

      {entries.map((entry, index) => (
        <TimelineNode
          key={entry.id}
          entry={entry}
          index={index}
          isActive={entry.id === activeId}
          onSelect={onEntrySelect}
          prefersReducedMotion={prefersReducedMotion}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
}