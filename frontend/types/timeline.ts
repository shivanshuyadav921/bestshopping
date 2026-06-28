/* PREMA ENGINEERING WORKS — Timeline Types */
/* Shared type definitions for the Engineering History & Timeline system. */

import type { IconType } from '@/types/engineering';

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: IconType;
  category: TimelineCategory;
  metrics?: TimelineMetric[];
  details?: string[];
  highlight?: boolean;
}

export type TimelineCategory =
  | 'origins'
  | 'evolution'
  | 'machines'
  | 'certifications'
  | 'industries'
  | 'achievements';

export interface TimelineMetric {
  label: string;
  value: string;
  description?: string;
}

export interface TimelineSection {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconType;
  entries: TimelineEntry[];
}

export const CATEGORY_COLORS: Record<TimelineCategory, string> = {
  origins: 'text-blue-400',
  evolution: 'text-emerald-400',
  machines: 'text-amber-400',
  certifications: 'text-purple-400',
  industries: 'text-cyan-400',
  achievements: 'text-rose-400',
};

export const CATEGORY_LABELS: Record<TimelineCategory, string> = {
  origins: 'Company Origins',
  evolution: 'Manufacturing Evolution',
  machines: 'Machine Acquisitions',
  certifications: 'Certification History',
  industries: 'Industry Expansion',
  achievements: 'Major Achievements',
};