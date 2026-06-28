/* PREMA ENGINEERING WORKS — Command Center Sidebar */
/* Client Component: Responsive sidebar with navigation, quick links, and system status */
/* Placeholder data only. */

'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronRight,
  BookOpen,
  Layers,
  Sliders,
  Disc,
  Settings,
  Gauge,
  FileText,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Sidebar Navigation ─── */

interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
}

interface SidebarItem {
  id: string;
  label: string;
  icon: IconType;
  badge?: string;
}

const SECTIONS: SidebarSection[] = [
  {
    id: 'modules',
    title: 'Reference Modules',
    items: [
      { id: 'materials', label: 'Materials Database', icon: 'material', badge: '247' },
      { id: 'fits', label: 'ISO Fits & Tolerances', icon: 'measurement', badge: '89' },
      { id: 'threads', label: 'Thread Standards', icon: 'gear-part', badge: '156' },
      { id: 'bearings', label: 'Bearing Catalog', icon: 'machining', badge: '312' },
      { id: 'surface', label: 'Surface Finishes', icon: 'finishing', badge: '64' },
      { id: 'heat', label: 'Heat Treatments', icon: 'precision', badge: '38' },
    ],
  },
  {
    id: 'tools',
    title: 'Lookup Tools',
    items: [
      { id: 'assistant', label: 'AI Engineering Assistant', icon: 'precision' },
      { id: 'material-lookup', label: 'Material Lookup', icon: 'material' },
      { id: 'tolerance-lookup', label: 'Tolerance Lookup', icon: 'measurement' },
      { id: 'bearing-finder', label: 'Bearing Finder', icon: 'machining' },
      { id: 'thread-calc', label: 'Thread Calculator', icon: 'gear-part' },
      { id: 'surface-sel', label: 'Surface Finish Selector', icon: 'finishing' },
      { id: 'heat-guide', label: 'Heat Treatment Guide', icon: 'precision' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    items: [
      { id: 'notes', label: 'Engineering Notes', icon: 'drawing', badge: '95' },
      { id: 'certs', label: 'Certificates', icon: 'certification', badge: '21' },
      { id: 'reference', label: 'Reference Tables', icon: 'engineering', badge: '34' },
    ],
  },
];

/* ─── System Status ─── */

const STATUS_ITEMS = [
  { label: 'Last sync', value: '2 min ago' },
  { label: 'Data version', value: 'v3.2.1' },
  { label: 'Standards', value: 'ISO / EN' },
];

/* ─── Animation ─── */

const sidebarVariants = {
  hidden: { x: -280, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const itemVariant = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.02 } },
};

/* ─── Component ─── */

interface CommandCenterSidebarProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
}

export default function CommandCenterSidebar({ activeView = 'dashboard', setActiveView }: CommandCenterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>('modules');
  const prefersReducedMotion = useReducedMotion();

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? '' : id));
  };

  const sidebarContent = (
    <nav aria-label="Command Center navigation" className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TechnicalIcon type="engineering" className="w-5 h-5 text-accent" />
          <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-foreground">
            Navigation
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dashboard Overview link */}
      <div className="p-4 border-b border-border/40">
        <button
          onClick={() => {
            if (setActiveView) setActiveView('dashboard');
          }}
          className={`w-full text-left px-3 py-2 flex items-center gap-3 text-xs rounded-sm transition-colors ${
            activeView === 'dashboard'
              ? 'text-accent bg-secondary/80 font-bold border-l-2 border-accent'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
          }`}
        >
          <TechnicalIcon type="design" className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">Dashboard Overview</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {SECTIONS.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-2 py-2 text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              aria-expanded={expandedSection === section.id}
            >
              {section.title}
              <ChevronRight
                className={`w-3 h-3 transition-transform duration-200 ${
                  expandedSection === section.id ? 'rotate-90' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {expandedSection === section.id && (
              <motion.ul
                className="space-y-0.5 mt-1"
                {...(prefersReducedMotion ? {} : stagger)}
                initial="initial"
                animate="animate"
                role="list"
              >
                {section.items.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={prefersReducedMotion ? undefined : itemVariant}
                  >
                    <button
                      onClick={() => {
                        if (setActiveView) setActiveView(item.id);
                      }}
                      className={`w-full text-left px-3 py-2.5 flex items-center gap-3 text-xs rounded-sm transition-colors ${
                        activeView === item.id
                          ? 'text-accent bg-secondary/80 font-bold border-l-2 border-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                      }`}
                      aria-label={item.label}
                    >
                      <TechnicalIcon type={item.icon} className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-border space-y-3">
        <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
          System Status
        </p>
        {STATUS_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
            <span className="text-[10px] font-mono text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open navigation sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r border-border overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={prefersReducedMotion ? undefined : sidebarVariants}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r border-border bg-card overflow-y-auto sticky top-0 h-screen"
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
}