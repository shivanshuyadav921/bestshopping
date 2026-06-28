/* PREMA ENGINEERING WORKS — Command Center Search Area */
/* Client Component: Search box, filter chips, category selector, suggestions, recent searches, pinned items */
/* Connected to GET ${process.env.NEXT_PUBLIC_API_URL || ""}/api/search via useSearch hook. */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  Clock,
  Pin,
  ChevronDown,
  Layers,
  Disc,
  Settings,
  Thermometer,
  Gauge,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from './SearchResults';
import type { SearchCategory } from '@/types/search';

/* ─── Filter Chips ─── */

const FILTER_CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'materials', label: 'Materials' },
  { id: 'fits', label: 'Fits & Tolerances' },
  { id: 'threads', label: 'Threads' },
  { id: 'bearings', label: 'Bearings' },
  { id: 'surface', label: 'Surface Finishes' },
  { id: 'heat', label: 'Heat Treatments' },
] as const;

type FilterId = (typeof FILTER_CHIPS)[number]['id'];

const FILTER_TO_CATEGORY: Record<FilterId, SearchCategory | 'all'> = {
  all: 'all',
  materials: 'MATERIAL',
  fits: 'FIT',
  threads: 'THREAD',
  bearings: 'BEARING',
  surface: 'SURFACE_FINISH',
  heat: 'HEAT_TREATMENT',
};

/* ─── Categories ─── */

const CATEGORIES = [
  { id: 'materials', label: 'Materials Database', icon: 'material' as const, count: 247 },
  { id: 'fits', label: 'ISO Fits & Tolerances', icon: 'measurement' as const, count: 89 },
  { id: 'threads', label: 'Thread Standards', icon: 'gear-part' as const, count: 156 },
  { id: 'bearings', label: 'Bearing Catalog', icon: 'machining' as const, count: 312 },
  { id: 'surface', label: 'Surface Finishes', icon: 'finishing' as const, count: 64 },
  { id: 'heat', label: 'Heat Treatments', icon: 'precision' as const, count: 38 },
  { id: 'certificates', label: 'Certificates', icon: 'certification' as const, count: 21 },
  { id: 'notes', label: 'Engineering Notes', icon: 'drawing' as const, count: 95 },
];

/* ─── Suggestions ─── */

const SUGGESTIONS = [
  'EN19 equivalent steel grades',
  'H7/k6 interference fit data',
  'M10 x 1.5 thread tolerances',
  '6205 bearing specifications',
  'Ra 0.8 surface finish applications',
  'Case hardening depth requirements',
  'ISO 2768 general tolerances',
  'Torque specifications M8 bolt',
];

/* ─── Pinned Items ─── */

const PINNED_ITEMS = [
  { id: 'pin-1', label: 'ISO 2768-mK', category: 'Tolerances', icon: 'measurement' as const },
  { id: 'pin-2', label: 'EN19 Steel', category: 'Materials', icon: 'material' as const },
  { id: 'pin-3', label: 'M6\u2013M16 Coarse', category: 'Threads', icon: 'gear-part' as const },
  { id: 'pin-4', label: '62xx Series', category: 'Bearings', icon: 'machining' as const },
  { id: 'pin-5', label: 'Ra 0.4\u20133.2', category: 'Surface', icon: 'finishing' as const },
  { id: 'pin-6', label: 'Case Hardening', category: 'Heat Treat', icon: 'precision' as const },
];

/* ─── Animation Variants ─── */

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const itemVariant = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Component ─── */

interface SearchAreaProps {
  onTriggerView?: (view: string) => void;
}

export default function SearchArea({ onTriggerView }: SearchAreaProps) {
  const {
    query,
    setQuery,
    filteredResults,
    isLoading,
    error,
    filters,
    setFilters,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearch();

  const [showCategories, setShowCategories] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    query.trim().length > 0
      ? s.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setShowSuggestions(false);
    setActiveSuggestionIndex(null);
  }, [setQuery]);

  const handleSelectSuggestion = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(null);
  }, [setQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % filteredSuggestions.length;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => {
        if (prev === null) return filteredSuggestions.length - 1;
        return (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length;
      });
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex !== null && filteredSuggestions[activeSuggestionIndex]) {
        e.preventDefault();
        handleSelectSuggestion(filteredSuggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      setActiveSuggestionIndex(null);
    }
  };

  const handleSelectResult = useCallback((result: any) => {
    addRecentSearch(result.title, filteredResults.length);
    if (result.type === 'AI_ASSIST') {
      const q = result.metadata?.query || query;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('prema-assistant-query', q);
      }
      if (onTriggerView) {
        onTriggerView('assistant');
      }
    }
  }, [addRecentSearch, filteredResults.length, onTriggerView, query]);

  const formatTimestamp = (timestamp: number) => {
    // eslint-disable-next-line react-hooks/purity
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    return `${Math.floor(hours / 24)} day ago`;
  };

  const handleFilterChange = (filterId: FilterId) => {
    const category = FILTER_TO_CATEGORY[filterId];
    setFilters({ category });
  };

  return (
    <section aria-label="Engineering Search" className="bg-card border-b border-border">
      <div className="container py-8 lg:py-10 space-y-6">
        {/* Search Input Row */}
        <div className="relative max-w-3xl">
          <label htmlFor="cc-search" className="sr-only">
            Search engineering reference data
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="cc-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setActiveSuggestionIndex(null);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowSuggestions(false);
                  setActiveSuggestionIndex(null);
                }, 150);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search materials, tolerances, threads, bearings..."
              className="w-full pl-12 pr-20 py-4 bg-secondary/50 border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              autoComplete="off"
              role="combobox"
              aria-expanded={showSuggestions && filteredSuggestions.length > 0 && query.trim().length < 2}
              aria-controls="cc-search-suggestions"
              aria-autocomplete="list"
              aria-activedescendant={
                activeSuggestionIndex !== null ? `cc-suggestion-${activeSuggestionIndex}` : undefined
              }
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle category selector"
                aria-expanded={showCategories}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Suggestions Dropdown — only show when no results */}
          <AnimatePresence>
            {showSuggestions && query.trim().length < 2 && filteredSuggestions.length > 0 && (
              <motion.div
                id="cc-search-suggestions"
                role="listbox"
                aria-label="Search suggestions"
                {...(prefersReducedMotion ? {} : fadeIn)}
                className="absolute z-30 top-full left-0 right-0 mt-1 bg-card border border-border shadow-lg max-h-72 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    id={`cc-suggestion-${index}`}
                    role="option"
                    aria-selected={activeSuggestionIndex === index}
                    {...(prefersReducedMotion ? {} : itemVariant)}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`w-full text-left px-4 py-3 text-sm text-foreground transition-colors flex items-center gap-3 border-b border-border/50 last:border-0 ${
                      activeSuggestionIndex === index
                        ? 'bg-secondary/80 text-foreground ring-1 ring-accent/30'
                        : 'hover:bg-secondary/60'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <span>{suggestion}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Selector (Collapsible) */}
        <AnimatePresence>
          {showCategories && (
            <motion.div
              {...(prefersReducedMotion ? {} : fadeIn)}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
              role="radiogroup"
              aria-label="Category filter"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="radio"
                  aria-checked={filters.category === FILTER_TO_CATEGORY[cat.id as FilterId]}
                  onClick={() => handleFilterChange(cat.id as FilterId)}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all duration-200 ${
                    filters.category === FILTER_TO_CATEGORY[cat.id as FilterId]
                      ? 'border-accent bg-accent/5 text-foreground'
                      : 'border-border bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/60'
                  }`}
                >
                  <TechnicalIcon type={cat.icon} className="w-6 h-6" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-center leading-tight">
                    {cat.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Quick filters">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              role="radio"
              aria-checked={filters.category === FILTER_TO_CATEGORY[chip.id]}
              onClick={() => handleFilterChange(chip.id)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase border transition-all duration-200 ${
                filters.category === FILTER_TO_CATEGORY[chip.id]
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Search Results — show when querying */}
        {query.trim().length >= 2 && (
          <div className="mt-6">
            <SearchResults
              results={filteredResults}
              isLoading={isLoading}
              error={error}
              query={query}
              onSelectResult={handleSelectResult}
            />
          </div>
        )}

        {/* Recent Searches & Pinned Items — only show when not querying */}
        {query.trim().length < 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Searches */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                  Recent Queries
                </h3>
              </div>
              {recentSearches.length === 0 ? (
                <p className="text-xs text-muted-foreground/60 pl-4">No recent searches.</p>
              ) : (
                <motion.ul
                  className="space-y-1"
                  {...(prefersReducedMotion ? {} : stagger)}
                  role="list"
                  aria-label="Recent search queries"
                >
                  {recentSearches.map((item) => (
                    <motion.li
                      key={item.query}
                      {...(prefersReducedMotion ? {} : itemVariant)}
                    >
                      <button
                        onClick={() => setQuery(item.query)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover:bg-secondary/60 transition-colors group border border-transparent hover:border-border"
                        aria-label={`Re-run search: ${item.query}`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-foreground truncate">{item.query}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {formatTimestamp(item.timestamp)} \u2014 {item.resultCount} results
                          </p>
                        </div>
                        <Search className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Pinned Standards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Pin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                  Pinned Standards
                </h3>
              </div>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                {...(prefersReducedMotion ? {} : stagger)}
                role="list"
                aria-label="Pinned engineering standards"
              >
                {PINNED_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    {...(prefersReducedMotion ? {} : itemVariant)}
                    role="listitem"
                    onClick={() => setQuery(item.label)}
                    className="flex items-center gap-3 p-3 border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors text-left"
                    aria-label={`Search pinned standard: ${item.label} (${item.category})`}
                  >
                    <TechnicalIcon type={item.icon} className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{item.label}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{item.category}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}