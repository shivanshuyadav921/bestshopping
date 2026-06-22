/* PREMA ENGINEERING WORKS — Shared Engineering Types */
/*
 * Consolidated from duplicate local definitions that existed independently
 * in CaseStudies.tsx, QualityVerification.tsx, EmergencyBreakdownCenter.tsx,
 * Industries.tsx, and TechnicalResourceLibrary.tsx (each phase originally
 * redefined the same shapes — Metric, Artifact, IconType, Point — locally).
 *
 * Every dashboard-style phase section (Industries, QualityVerification,
 * TechnicalResourceLibrary, CaseStudies, EmergencyBreakdownCenter) now
 * imports from here instead of redeclaring these interfaces per file.
 */

import type TechnicalIcon from '@/components/TechnicalIcon';

/** Re-exported from TechnicalIcon so every phase shares one source of truth
 *  for which icon names exist, instead of each file deriving its own copy
 *  of the same `Parameters<typeof TechnicalIcon>[0]['type']` alias. */
export type IconType = Parameters<typeof TechnicalIcon>[0]['type'];

/** A single labeled measurement shown in an inspection/metrics panel.
 *  Used by CaseStudies, QualityVerification, and EmergencyBreakdownCenter. */
export interface Metric {
  label: string;
  value: string;
  description: string;
}

/** A generated document/record referenced in an artifacts panel.
 *  Used by QualityVerification and EmergencyBreakdownCenter. */
export interface Artifact {
  name: string;
  code: string;
}

/** 2D coordinate used by the measured SVG connector hooks. */
export interface Point {
  x: number;
  y: number;
}

/** One column definition for a DashboardMatrix table.
 *  `T` is the union of coverage-id strings a given phase's matrix uses
 *  (e.g. MatrixColumnId in QualityVerification, or the capability id
 *  union in Industries) — kept generic since each phase's matrix tracks
 *  a different, phase-specific set of categories. */
export interface MatrixColumn<T extends string = string> {
  id: T;
  label: string;
  /** Optional icon — when present, the column header renders icon+label
   *  stacked (Industries' industry columns); when absent, it renders as
   *  a plain text header (QualityVerification / TechnicalResourceLibrary /
   *  EmergencyBreakdownCenter's category columns). */
  icon?: IconType;
}

/** One row definition for a DashboardMatrix table. */
export interface MatrixRow<T extends string = string> {
  id: string;
  label: string;
  /** Short numeric/code prefix shown before the label, e.g. "01". */
  numberLabel?: string;
  /** Icon shown before the label and used by the TimelineIndex this row
   *  is usually paired with. */
  icon?: IconType;
  /** Which columns this row is checked ("✓") for. */
  coverage: T[];
}

/** A reference/data table rendered inside an engineering document panel
 *  (TechnicalResourceLibrary's per-category spec sheets). */
export interface ReferenceTable {
  columns: string[];
  rows: string[][];
}

/** The five-part engineering-notes block shown beneath each resource
 *  category in TechnicalResourceLibrary. */
export interface EngineeringNotes {
  applications: string[];
  designNotes: string[];
  limitations: string[];
  bestPractices: string[];
  warnings: string[];
}

/** Single navigable entry for the shared TimelineIndex component
 *  (the left-hand vertical numbered list used by Industries,
 *  QualityVerification, TechnicalResourceLibrary, and
 *  EmergencyBreakdownCenter). */
export interface TimelineMilestone {
  id: string;
  number: string;
  label: string;
  icon: IconType;
}
