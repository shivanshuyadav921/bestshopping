/* PREMA ENGINEERING WORKS — Recent Queries */
/* Client Component: Recently searched queries panel with expandable details */
/* Placeholder data only. */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Clock, ArrowUpRight, Trash2 } from 'lucide-react';

/* ─── Placeholder Data ─── */

interface RecentQuery {
  id: string;
  query: string;
  category: string;
  timestamp: string;
  resultCount: number;
  topResult: string;
}

const RECENT_QUERIES: RecentQuery[] = [
  {
    id: 'rq-1',
    query: 'EN19 yield strength comparison',
    category: 'Materials',
    timestamp: '2 min ago',
    resultCount: 12,
    topResult: 'EN19 (708M40) — Yield: 755 MPa',
  },
  {
    id: 'rq-2',
    query: 'H7/g6 rotating shaft clearance',
    category: 'Fits & Tolerances',
    timestamp: '8 min ago',
    resultCount: 5,
    topResult: 'H7/g6 — Clearance: 7–20 µm',
  },
  {
    id: 'rq-3',
    query: '6308 dynamic load rating',
    category: 'Bearings',
    timestamp: '1 hr ago',
    resultCount: 3,
    topResult: '6308 — Dynamic Load: 42.3 kN',
  },
  {
    id: 'rq-4',
    query: 'Nitriding vs carburizing depth',
    category: 'Heat Treatments',
    timestamp: '3 hr ago',
    resultCount: 8,
    topResult: 'Nitriding: 0.1–0.6mm / Carburizing: 0.5–2.0mm',
  },
  {
    id: 'rq-5',
    query: 'M12 x 1.75 tap drill size',
    category: 'Threads',
    timestamp: '5 hr ago',
    resultCount: 2,
    topResult: 'M12×1.75 — Tap Drill: 10.2 mm',
  },
  {
    id: 'rq-6',
    query: 'Ra 0.4 surface finish process',
    category: 'Surface Finishes',
    timestamp: '1 day ago',
    resultCount: 6,
    topResult: 'Fine grinding, lapping, or honing',
  },
  {
    id: 'rq-7',
    query: 'ISO 2768-mK 60mm range',
    category: 'Tolerances',
    timestamp: '1 day ago',
    resultCount: 1,
    topResult: '60mm medium tolerance: ±0.3 mm',
  },
  {
    id: 'rq-8',
    query: '17-4PH hardness after H900',
    category: 'Materials',
    timestamp: '2 days ago',
    resultCount: 4,
    topResult: '17-4PH H900 — HRC 40–44',
  },
];

/* ─── Animation ─── */

const listVariants = {
  animate: { transition: { staggerChildren: 0.03 } },
};

const itemVariant = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
};

/* ─── Component ─── */

export default function RecentQueries() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Recent Queries" className="bg-card border border-border">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
              Recent Queries
            </h3>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">
            {RECENT_QUERIES.length} queries
          </span>
        </div>

        <motion.ul
          className="space-y-1"
          {...(prefersReducedMotion ? {} : listVariants)}
          initial="initial"
          animate="animate"
          role="list"
          aria-label="Recently searched queries"
        >
          {RECENT_QUERIES.map((item) => (
            <motion.li
              key={item.id}
              variants={prefersReducedMotion ? undefined : itemVariant}
            >
              <button
                className="w-full text-left px-4 py-3 hover:bg-secondary/60 transition-colors group border border-transparent hover:border-border"
                aria-label={`Re-run: ${item.query}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-foreground truncate">{item.query}</p>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="uppercase tracking-wider font-bold">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.timestamp}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.resultCount} results</span>
                    </div>
                    <p className="text-[11px] text-foreground/60 font-mono mt-1.5 truncate">
                      {item.topResult}
                    </p>
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}