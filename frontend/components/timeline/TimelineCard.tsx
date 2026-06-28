/* PREMA ENGINEERING WORKS — Timeline Card */
/* Expandable card showing timeline entry details, metrics, and list items. */

'use client';

import { memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { TimelineEntry } from '@/types/timeline';

interface TimelineCardProps {
  entry: TimelineEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

const TimelineCard = memo(function TimelineCard({ entry, isExpanded, onToggle }: TimelineCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-border bg-card rounded-sm overflow-hidden">
      {/* Summary — always visible */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors duration-200"
      >
        <p className="text-sm text-foreground/80 leading-relaxed font-light flex-1">
          {entry.description}
        </p>
        <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase shrink-0 mt-0.5">
          {isExpanded ? 'Collapse' : 'Details'}
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-4 space-y-4">
              {/* Metrics */}
              {entry.metrics && entry.metrics.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase mb-2">
                    Key Metrics
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {entry.metrics.map((metric, i) => (
                      <div key={i} className="bg-muted/50 p-3 rounded-sm">
                        <p className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase mb-1">
                          {metric.label}
                        </p>
                        <p className="text-sm font-bold text-foreground">{metric.value}</p>
                        {metric.description && (
                          <p className="text-[10px] text-foreground/60 mt-0.5">{metric.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details list */}
              {entry.details && entry.details.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase mb-2">
                    Details
                  </p>
                  <ul className="space-y-1.5">
                    {entry.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                        <span className="text-accent mt-0.5 shrink-0">—</span>
                        <span className="font-light leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default TimelineCard;