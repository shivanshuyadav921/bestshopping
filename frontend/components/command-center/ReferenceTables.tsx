/* PREMA ENGINEERING WORKS — Reference Tables */
/* Client Component: Premium table layouts with sorting, filter chips, responsive overflow, sticky headers */
/* Placeholder data only. */

'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

/* ─── Types ─── */

type SortDirection = 'asc' | 'desc' | null;

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  mono?: boolean;
  accent?: boolean;
  width?: string;
}

interface TableData {
  id: string;
  cells: Record<string, string>;
}

interface ReferenceTableDef {
  id: string;
  title: string;
  description: string;
  columns: TableColumn[];
  rows: TableData[];
  filters: string[];
}

/* ─── Placeholder Data ─── */

const TABLES: ReferenceTableDef[] = [
  {
    id: 'fits-table',
    title: 'ISO Fits & Tolerances',
    description: 'Common hole-basis fit combinations per ISO 286-1.',
    columns: [
      { key: 'code', label: 'Fit Code', sortable: true, mono: true },
      { key: 'type', label: 'Class', sortable: true, accent: true },
      { key: 'hole', label: 'Hole Limits', mono: true },
      { key: 'shaft', label: 'Shaft Limits', mono: true },
      { key: 'application', label: 'Application' },
    ],
    rows: [
      { id: 'f1', cells: { code: 'H7/f7', type: 'Clearance', hole: '+21 / 0 \u00b5m', shaft: '-20 / -41 \u00b5m', application: 'Precision rotating assemblies' } },
      { id: 'f2', cells: { code: 'H7/g6', type: 'Clearance', hole: '+21 / 0 \u00b5m', shaft: '-7 / -20 \u00b5m', application: 'Rotating shafts, bushings' } },
      { id: 'f3', cells: { code: 'H7/h6', type: 'Clearance', hole: '+21 / 0 \u00b5m', shaft: '0 / -13 \u00b5m', application: 'Sliding fits, spigot joints' } },
      { id: 'f4', cells: { code: 'H7/k6', type: 'Transition', hole: '+21 / 0 \u00b5m', shaft: '+15 / +2 \u00b5m', application: 'Pulleys, locating gears' } },
      { id: 'f5', cells: { code: 'H7/n6', type: 'Transition', hole: '+21 / 0 \u00b5m', shaft: '+25 / +10 \u00b5m', application: 'Keyed shaft assemblies' } },
      { id: 'f6', cells: { code: 'H7/p6', type: 'Interference', hole: '+21 / 0 \u00b5m', shaft: '+42 / +29 \u00b5m', application: 'Bearing seats, press-fit' } },
      { id: 'f7', cells: { code: 'H7/s6', type: 'Interference', hole: '+21 / 0 \u00b5m', shaft: '+59 / +43 \u00b5m', application: 'Permanent press-fit assemblies' } },
      { id: 'f8', cells: { code: 'H7/u6', type: 'Interference', hole: '+21 / 0 \u00b5m', shaft: '+80 / +60 \u00b5m', application: 'Heavy interference press-fit' } },
    ],
    filters: ['All', 'Clearance', 'Transition', 'Interference'],
  },
  {
    id: 'threads-table',
    title: 'Metric Thread Specifications',
    description: 'Standard metric coarse thread dimensions per ISO 68-1.',
    columns: [
      { key: 'size', label: 'Size', sortable: true, mono: true },
      { key: 'pitch', label: 'Pitch', sortable: true, mono: true },
      { key: 'major', label: 'Major Dia.', mono: true },
      { key: 'pitchDia', label: 'Pitch Dia.', mono: true },
      { key: 'tapDrill', label: 'Tap Drill', mono: true, accent: true },
      { key: 'stressArea', label: 'Stress Area', mono: true },
    ],
    rows: [
      { id: 't1', cells: { size: 'M4', pitch: '0.7 mm', major: '4.000 mm', pitchDia: '3.545 mm', tapDrill: '\u23003.3 mm', stressArea: '8.78 mm\u00b2' } },
      { id: 't2', cells: { size: 'M5', pitch: '0.8 mm', major: '5.000 mm', pitchDia: '4.475 mm', tapDrill: '\u23004.2 mm', stressArea: '14.2 mm\u00b2' } },
      { id: 't3', cells: { size: 'M6', pitch: '1.0 mm', major: '6.000 mm', pitchDia: '5.350 mm', tapDrill: '\u23005.0 mm', stressArea: '20.1 mm\u00b2' } },
      { id: 't4', cells: { size: 'M8', pitch: '1.25 mm', major: '8.000 mm', pitchDia: '7.188 mm', tapDrill: '\u23006.8 mm', stressArea: '36.6 mm\u00b2' } },
      { id: 't5', cells: { size: 'M10', pitch: '1.5 mm', major: '10.000 mm', pitchDia: '9.026 mm', tapDrill: '\u23008.5 mm', stressArea: '58.0 mm\u00b2' } },
      { id: 't6', cells: { size: 'M12', pitch: '1.75 mm', major: '12.000 mm', pitchDia: '10.863 mm', tapDrill: '\u230010.2 mm', stressArea: '84.3 mm\u00b2' } },
      { id: 't7', cells: { size: 'M16', pitch: '2.0 mm', major: '16.000 mm', pitchDia: '14.701 mm', tapDrill: '\u230014.0 mm', stressArea: '157 mm\u00b2' } },
      { id: 't8', cells: { size: 'M20', pitch: '2.5 mm', major: '20.000 mm', pitchDia: '18.376 mm', tapDrill: '\u230017.5 mm', stressArea: '245 mm\u00b2' } },
    ],
    filters: [],
  },
  {
    id: 'bearings-table',
    title: 'Bearing Specifications',
    description: 'Deep groove ball bearing dimensions and load ratings.',
    columns: [
      { key: 'model', label: 'Model', sortable: true, mono: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'bore', label: 'Bore (d)', mono: true, sortable: true },
      { key: 'outer', label: 'Outer (D)', mono: true },
      { key: 'width', label: 'Width (B)', mono: true },
      { key: 'dynLoad', label: 'Dyn. Load', mono: true, accent: true },
      { key: 'statLoad', label: 'Stat. Load', mono: true },
    ],
    rows: [
      { id: 'b1', cells: { model: '6000', type: 'Deep Groove Ball', bore: '10 mm', outer: '26 mm', width: '8 mm', dynLoad: '4.66 kN', statLoad: '1.96 kN' } },
      { id: 'b2', cells: { model: '6005', type: 'Deep Groove Ball', bore: '25 mm', outer: '47 mm', width: '12 mm', dynLoad: '11.2 kN', statLoad: '5.59 kN' } },
      { id: 'b3', cells: { model: '6205', type: 'Deep Groove Ball', bore: '25 mm', outer: '52 mm', width: '15 mm', dynLoad: '14.0 kN', statLoad: '7.80 kN' } },
      { id: 'b4', cells: { model: '6206', type: 'Deep Groove Ball', bore: '30 mm', outer: '62 mm', width: '16 mm', dynLoad: '19.5 kN', statLoad: '11.2 kN' } },
      { id: 'b5', cells: { model: '6308', type: 'Deep Groove Ball', bore: '40 mm', outer: '90 mm', width: '23 mm', dynLoad: '42.3 kN', statLoad: '24.0 kN' } },
      { id: 'b6', cells: { model: '6310', type: 'Deep Groove Ball', bore: '50 mm', outer: '110 mm', width: '27 mm', dynLoad: '61.8 kN', statLoad: '38.0 kN' } },
    ],
    filters: [],
  },
  {
    id: 'tolerances-table',
    title: 'ISO 2768 General Tolerances',
    description: 'Linear and angular dimension tolerances for machined parts.',
    columns: [
      { key: 'range', label: 'Dimensional Range', sortable: true, mono: true },
      { key: 'fine', label: 'Fine (f)', mono: true },
      { key: 'medium', label: 'Medium (m)', mono: true, accent: true },
      { key: 'coarse', label: 'Coarse (c)', mono: true },
      { key: 'veryCoarse', label: 'Very Coarse (v)', mono: true },
    ],
    rows: [
      { id: 'to1', cells: { range: '0.5 \u2013 3.0 mm', fine: '\u00b10.05 mm', medium: '\u00b10.1 mm', coarse: '\u00b10.2 mm', veryCoarse: '\u2014' } },
      { id: 'to2', cells: { range: '3.0 \u2013 6.0 mm', fine: '\u00b10.05 mm', medium: '\u00b10.1 mm', coarse: '\u00b10.3 mm', veryCoarse: '\u00b10.5 mm' } },
      { id: 'to3', cells: { range: '6.0 \u2013 30.0 mm', fine: '\u00b10.1 mm', medium: '\u00b10.2 mm', coarse: '\u00b10.5 mm', veryCoarse: '\u00b11.0 mm' } },
      { id: 'to4', cells: { range: '30.0 \u2013 120.0 mm', fine: '\u00b10.15 mm', medium: '\u00b10.3 mm', coarse: '\u00b10.8 mm', veryCoarse: '\u00b11.5 mm' } },
      { id: 'to5', cells: { range: '120.0 \u2013 400.0 mm', fine: '\u00b10.2 mm', medium: '\u00b10.5 mm', coarse: '\u00b11.2 mm', veryCoarse: '\u00b12.5 mm' } },
      { id: 'to6', cells: { range: '400.0 \u2013 1000.0 mm', fine: '\u00b10.3 mm', medium: '\u00b10.8 mm', coarse: '\u00b12.0 mm', veryCoarse: '\u00b14.0 mm' } },
    ],
    filters: [],
  },
];

/* ─── Component ─── */

export default function ReferenceTables() {
  const [activeTable, setActiveTable] = useState(TABLES[0].id);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();

  const currentTable = useMemo(
    () => TABLES.find((t) => t.id === activeTable) || TABLES[0],
    [activeTable]
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedRows = useMemo(() => {
    let rows = [...currentTable.rows];
    if (activeFilter !== 'All' && currentTable.filters.length > 0) {
      rows = rows.filter((r) => r.cells['type'] === activeFilter);
    }
    if (sortKey && sortDir) {
      rows.sort((a, b) => {
        const av = a.cells[sortKey] || '';
        const bv = b.cells[sortKey] || '';
        const cmp = av.localeCompare(bv, undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [currentTable, sortKey, sortDir, activeFilter]);

  return (
    <section aria-label="Reference Tables" className="bg-secondary/30 border-y border-border">
      <div className="container py-10 lg:py-14 space-y-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
            Reference Data
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Specification Tables
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Premium reference layouts with sortable columns and responsive overflow.
          </p>
          <p className="text-[10px] text-accent font-bold tracking-widest uppercase mt-2.5 lg:hidden flex items-center gap-1.5 font-mono">
            <span>←</span> Swipe table to scroll <span>→</span>
          </p>
        </div>

        {/* Table Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none" role="tablist" aria-label="Reference tables">
          {TABLES.map((table) => (
            <button
              key={table.id}
              role="tab"
              aria-selected={activeTable === table.id}
              aria-controls={`panel-${table.id}`}
              onClick={() => {
                setActiveTable(table.id);
                setSortKey(null);
                setSortDir(null);
                setActiveFilter('All');
              }}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase border transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                activeTable === table.id
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {table.title}
            </button>
          ))}
        </div>

        {/* Filter Chips (if applicable) */}
        {currentTable.filters.length > 0 && (
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Table row filters">
            {currentTable.filters.map((filter) => (
              <button
                key={filter}
                role="radio"
                aria-checked={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-[9px] font-bold tracking-[0.1em] uppercase border transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div
          id={`panel-${currentTable.id}`}
          role="tabpanel"
          aria-label={currentTable.title}
          className="border border-border bg-card overflow-x-auto"
        >
          <div className="min-w-[600px]">
            {/* Sticky Header */}
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-sm">
                <tr className="border-b border-border">
                  {currentTable.columns.map((col) => (
                    <th
                      key={col.key}
                      className="p-4 text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground border-r border-border/50 last:border-r-0"
                      style={col.width ? { width: col.width } : undefined}
                      aria-sort={col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                    >
                      {col.sortable ? (
                        <button
                          onClick={() => handleSort(col.key)}
                          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                          {col.label}
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40" />
                          )}
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 hover:bg-secondary/40 transition-colors"
                  >
                    {currentTable.columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-4 text-xs border-r border-border/30 last:border-r-0 ${
                          col.mono ? 'font-mono' : ''
                        } ${
                          col.accent ? 'text-accent font-bold' : 'text-foreground/80'
                        }`}
                      >
                        {row.cells[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                {sortedRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={currentTable.columns.length}
                      className="p-8 text-center text-xs text-muted-foreground"
                    >
                      No matching records.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Description */}
        <p className="text-[11px] text-muted-foreground">
          {currentTable.description}
        </p>
      </div>
    </section>
  );
}