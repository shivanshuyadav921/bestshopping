/* PREMA ENGINEERING WORKS — Command Center Shell */
/* Client Component: Main orchestrator that composes all Command Center sub-components */
/* This is the root client component — handles layout with sidebar + main content area */

'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CommandCenterHeader from './CommandCenterHeader';
import SearchArea from './SearchArea';
import EngineeringModules from './EngineeringModules';
import ReferenceTables from './ReferenceTables';
import QuickActionPanels from './QuickActionPanels';
import MetricPanels from './MetricPanels';
import RecentQueries from './RecentQueries';
import PinnedStandards from './PinnedStandards';
import CommandCenterSidebar from './CommandCenterSidebar';
import EngineeringTools from './EngineeringTools';

/* ─── Animation ─── */

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Component ─── */

export default function CommandCenterShell() {
  const prefersReducedMotion = useReducedMotion();
  const [activeView, setActiveView] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <CommandCenterHeader />

      {/* Search Area */}
      <SearchArea onTriggerView={(view) => {
        setActiveView(view);
      }} />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex">
        {/* Responsive Sidebar */}
        <CommandCenterSidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <motion.div
            {...(prefersReducedMotion ? {} : fadeUp)}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeView === 'dashboard' ? (
              <>
                {/* Metric Panels */}
                <MetricPanels />

                {/* Engineering Modules */}
                <EngineeringModules setActiveView={setActiveView} />

                {/* Quick Action Panels */}
                <QuickActionPanels setActiveView={setActiveView} />

                {/* Reference Tables */}
                <ReferenceTables />

                {/* Recent Queries & Pinned Standards — Side by Side */}
                <section aria-label="Activity and References" className="bg-background">
                  <div className="container py-10 lg:py-14">
                    <div className="max-w-2xl mb-8">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
                        Activity
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
                        Recent & Pinned
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <RecentQueries />
                      <PinnedStandards />
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <EngineeringTools activeView={activeView} setActiveView={setActiveView} />
            )}
          </motion.div>

          {/* Footer Area */}
          <footer className="border-t border-border bg-card">
            <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                  PREMA Engineering Works
                </p>
                <span className="text-muted-foreground" aria-hidden="true">·</span>
                <p className="text-[10px] text-muted-foreground">
                  Command Center v1.0
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Engineering reference data is for planning purposes only. Verify against current standards.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}