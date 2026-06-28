/* PREMA ENGINEERING WORKS — Search Hook */
/* Debounced search hook with request cancellation, memoization, */
/* and category filtering. Connects to GET ${process.env.NEXT_PUBLIC_API_URL || ""}/api/search. */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { SearchResult, SearchFilters, RecentSearch } from '@/types/search';
import { REVERSE_CATEGORY_MAP } from '@/types/search';

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;
const MAX_RECENT_SEARCHES = 10;
const RECENT_SEARCHES_KEY = 'prema-recent-searches';

function loadRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(searches: RecentSearch[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch {
    // Storage quota exceeded or unavailable
  }
}

export interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  filteredResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string, resultCount: number) => void;
  clearRecentSearches: () => void;
  clearResults: () => void;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({ category: 'all' });
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(loadRecentSearches);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryCacheRef = useRef<Map<string, SearchResult[]>>(new Map());

  // Save recent searches to localStorage
  useEffect(() => {
    saveRecentSearches(recentSearches);
  }, [recentSearches]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    // Check cache first
    const cached = queryCacheRef.current.get(searchQuery.toLowerCase());
    if (cached) {
      setResults(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/search?q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment.');
        }
        if (response.status === 401) {
          throw new Error('Authentication required.');
        }
        throw new Error(`Search failed (${response.status})`);
      }

      const data: SearchResult[] = await response.json();
      setResults(data);

      // Cache the results
      queryCacheRef.current.set(searchQuery.toLowerCase(), data);

      // Limit cache size to 50 entries
      if (queryCacheRef.current.size > 50) {
        const firstKey = queryCacheRef.current.keys().next().value;
        if (firstKey) queryCacheRef.current.delete(firstKey);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled, don't update state
      }
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResults([]);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setError(null);

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (newQuery.trim().length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Debounce the search
    debounceTimerRef.current = setTimeout(() => {
      performSearch(newQuery.trim());
    }, DEBOUNCE_MS);
  }, [performSearch]);

  const addRecentSearch = useCallback((searchQuery: string, resultCount: number) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.query !== searchQuery);
      const updated = [
        { query: searchQuery, timestamp: Date.now(), resultCount },
        ...filtered,
      ].slice(0, MAX_RECENT_SEARCHES);
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  // Client-side category filtering
  const filteredResults = results.filter((r) => {
    if (filters.category === 'all') return true;
    return r.type === filters.category;
  });

  return {
    query,
    setQuery: handleQueryChange,
    results,
    filteredResults,
    isLoading,
    error,
    filters,
    setFilters,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    clearResults,
  };
}