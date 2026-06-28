/* PREMA ENGINEERING WORKS — Search Results Panel */
/* Displays search results with cards, loading, error, empty, and no-results states. */
/* Supports category filtering, keyboard navigation, and TechnicalIcon integration. */

'use client';

import { useCallback, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  AlertTriangle,
  Loader2,
  Package,
  Layers,
  Disc,
  Settings,
  Sliders,
  Thermometer,
  Gauge,
  FileText,
  ChevronRight,
} from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { SearchResult } from '@/types/search';
import { CATEGORY_LABELS } from '@/types/search';

/* ─── Props ─── */

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  query: string;
  onSelectResult?: (result: SearchResult) => void;
}

/* ─── Result Icon Map ─── */

const RESULT_ICON_MAP: Record<string, string> = {
  MATERIAL: 'material',
  FIT: 'measurement',
  THREAD: 'gear-part',
  BEARING: 'machining',
  SURFACE_FINISH: 'finishing',
  HEAT_TREATMENT: 'precision',
  GEAR: 'gear-part',
  ORDER: 'oem',
  RFQ: 'drawing',
  CUSTOMER: 'oem',
  AI_ASSIST: 'precision',
};

/* ─── Animation Variants ─── */

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.03 } },
};

const itemVariant = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Loading Skeleton ─── */

function LoadingSkeleton() {
  return (
    <div className="space-y-3" role="status" aria-label="Loading search results">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="p-4 border border-border bg-card animate-pulse"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading search results...</span>
    </div>
  );
}

/* ─── Empty State ─── */

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search className="w-10 h-10 text-muted-foreground/40 mb-4" />
      <p className="text-sm text-muted-foreground">
        {query.trim().length < 2
          ? 'Type at least 2 characters to search the engineering catalog.'
          : `No results found for "${query}". Try different keywords.`}
      </p>
    </div>
  );
}

/* ─── Error State ─── */

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/* ─── Result Card ─── */

function ResultCard({
  result,
  index,
  onSelect,
}: {
  result: SearchResult;
  index: number;
  onSelect?: (result: SearchResult) => void;
}) {
  const iconType = RESULT_ICON_MAP[result.type] || 'material';
  const categoryLabel = CATEGORY_LABELS[result.type] || result.type;

  return (
    <motion.button
      variants={itemVariant}
      onClick={() => onSelect?.(result)}
      className="w-full text-left p-4 border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group"
      aria-label={`${result.title} — ${categoryLabel}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-secondary/50 rounded flex-shrink-0">
          <TechnicalIcon type={iconType as any} className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-foreground truncate">{result.title}</h4>
            <span className="text-[9px] font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded flex-shrink-0">
              {categoryLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{result.subtitle}</p>

          {/* Metadata preview */}
          {result.metadata && Object.keys(result.metadata).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(result.metadata)
                .filter(([, v]) => v !== null && v !== undefined && typeof v !== 'object')
                .slice(0, 3)
                .map(([key, value]) => (
                  <span key={key} className="text-[10px] font-mono text-muted-foreground/70">
                    {key}: {String(value)}
                  </span>
                ))}
            </div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
      </div>
    </motion.button>
  );
}

/* ─── Main Component ─── */

export default function SearchResults({
  results,
  isLoading,
  error,
  query,
  onSelectResult,
}: SearchResultsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [prevResults, setPrevResults] = useState(results);

  if (results !== prevResults) {
    setPrevResults(results);
    setSelectedIndex(-1);
  }

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!results.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            onSelectResult?.(results[selectedIndex]);
          }
          break;
        case 'Escape':
          setSelectedIndex(-1);
          break;
      }
    },
    [results, selectedIndex, onSelectResult]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-result-item]');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Show states
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (query.trim().length >= 2 && results.length === 0) {
    return <EmptyState query={query} />;
  }

  if (query.trim().length < 2) {
    return null;
  }

  return (
    <div
      ref={listRef}
      className="space-y-2"
      role="listbox"
      aria-label="Search results"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
          Results ({results.length})
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={query}
          className="space-y-2"
          {...(fadeIn)}
        >
          <motion.div className="space-y-2" {...stagger} initial="initial" animate="animate">
            {results.map((result, index) => (
              <div key={`${result.type}-${result.title}-${index}`} data-result-item>
                <ResultCard
                  result={result}
                  index={index}
                  onSelect={onSelectResult}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}