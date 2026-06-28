'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TechnicalIcon from '@/components/TechnicalIcon';
import { Timeline, TimelineSection } from '@/components/timeline';
import { TIMELINE_SECTIONS } from '@/lib/timeline-data';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/timeline';
import type { TimelineCategory } from '@/types/timeline';

const CATEGORIES: TimelineCategory[] = [
  'origins',
  'evolution',
  'machines',
  'certifications',
  'industries',
  'achievements',
];

export default function TimelinePage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState<TimelineCategory | 'all'>('all');

  const filteredSections = activeCategory === 'all'
    ? TIMELINE_SECTIONS
    : TIMELINE_SECTIONS.filter((s) => s.entries[0]?.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background border-b border-border">
          <div className="container">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.8 }}
            >
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
                Engineering Heritage
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Two Decades of
                <br />
                <span className="text-accent">Precision Engineering</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                From a three-workshop founding in 2005 to a smart factory producing
                flight-ready aerospace components — every milestone documented, every
                capability earned through precision.
              </p>
              <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border bg-muted/30">
          <div className="container">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`shrink-0 px-4 py-2 text-[10px] font-bold tracking-widest uppercase border-b-2 transition-colors duration-200 ${
                  activeCategory === 'all'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-foreground/50 hover:text-foreground'
                }`}
              >
                All Sections
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 text-[10px] font-bold tracking-widest uppercase border-b-2 transition-colors duration-200 ${
                    activeCategory === cat
                      ? 'border-accent text-accent'
                      : 'border-transparent text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {filteredSections.map((section) => (
                <TimelineSection
                  key={section.id}
                  section={section}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <Timeline
                    entries={section.entries}
                    activeId={activeId}
                    onEntrySelect={setActiveId}
                  />
                </TimelineSection>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-16 md:py-24 border-t border-border bg-muted/20">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Years of Operation', value: '20+' },
                { label: 'Industry Certifications', value: '4' },
                { label: 'Industries Served', value: '6+' },
                { label: 'Flight-Ready Components', value: '100K+' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: prefersReducedMotion ? 0.15 : 0.5 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                  <p className="text-xs text-foreground/60 tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ready to Work With Us?
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto">
              Two decades of precision engineering, ready to solve your next
              manufacturing challenge.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-3 bg-accent text-accent-foreground font-medium text-sm transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                View Products
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-3 border border-foreground/20 text-foreground font-medium text-sm transition-all duration-200 hover:bg-foreground/5 active:scale-95"
              >
                Contact Engineering
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}