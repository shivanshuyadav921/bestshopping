/* PREMA ENGINEERING WORKS — Search Types */
/* Shared type definitions for the Engineering Search system. */

export type SearchCategory =
  | 'MATERIAL'
  | 'FIT'
  | 'SURFACE_FINISH'
  | 'HEAT_TREATMENT'
  | 'BEARING'
  | 'THREAD'
  | 'GEAR'
  | 'ORDER'
  | 'RFQ'
  | 'CUSTOMER'
  | 'AI_ASSIST';

export interface SearchResult {
  type: SearchCategory;
  title: string;
  subtitle: string;
  score: number;
  metadata: Record<string, unknown>;
}

export interface SearchFilters {
  category: SearchCategory | 'all';
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
  recentSearches: RecentSearch[];
}

export interface RecentSearch {
  query: string;
  timestamp: number;
  resultCount: number;
}

export const CATEGORY_MAP: Record<string, SearchCategory> = {
  materials: 'MATERIAL',
  fits: 'FIT',
  threads: 'THREAD',
  bearings: 'BEARING',
  surface: 'SURFACE_FINISH',
  heat: 'HEAT_TREATMENT',
  gears: 'GEAR',
  orders: 'ORDER',
  rfqs: 'RFQ',
  customers: 'CUSTOMER',
  assistant: 'AI_ASSIST',
};

export const REVERSE_CATEGORY_MAP: Record<SearchCategory, string> = {
  MATERIAL: 'materials',
  FIT: 'fits',
  THREAD: 'threads',
  BEARING: 'bearings',
  SURFACE_FINISH: 'surface',
  HEAT_TREATMENT: 'heat',
  GEAR: 'gears',
  ORDER: 'orders',
  RFQ: 'rfqs',
  CUSTOMER: 'customers',
  AI_ASSIST: 'assistant',
};

export const CATEGORY_LABELS: Record<SearchCategory, string> = {
  MATERIAL: 'Materials',
  FIT: 'Fits & Tolerances',
  THREAD: 'Threads',
  BEARING: 'Bearings',
  SURFACE_FINISH: 'Surface Finishes',
  HEAT_TREATMENT: 'Heat Treatments',
  GEAR: 'Gear Data',
  ORDER: 'Orders',
  RFQ: 'RFQs',
  CUSTOMER: 'Customers',
  AI_ASSIST: 'AI Assistant',
};

export const CATEGORY_ICONS: Record<SearchCategory, string> = {
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