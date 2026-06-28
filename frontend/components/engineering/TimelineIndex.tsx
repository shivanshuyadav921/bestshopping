/* PREMA ENGINEERING WORKS — Shared Timeline Index */
/*
 * Consolidated from four independently-written but structurally identical
 * vertical numbered navigation lists: Industries.tsx ("Select Sector"),
 * QualityVerification.tsx ("Quality Pipeline"), TechnicalResourceLibrary.tsx
 * ("Archive Index"), and EmergencyBreakdownCenter.tsx ("Emergency Flow").
 *
 * One genuine layout difference is preserved via `mobileLayout`: Industries
 * has 10 entries and scrolls horizontally on mobile rather than stacking a
 * very tall list; the other three (7–9 entries) stack vertically at every
 * breakpoint. This isn't a cosmetic choice to flatten away — it's a real,
 * deliberate per-section decision, so the prop exists instead of forcing
 * one behavior on every consumer.
 */

import TechnicalIcon from '@/components/TechnicalIcon';
import type { TimelineMilestone } from '@/types/engineering';

interface TimelineIndexProps {
  title: string;
  items: TimelineMilestone[];
  activeIndex: number;
  onSelect: (index: number) => void;
  mobileLayout?: 'stack' | 'scroll';
  /** Needed by phases whose visualization panel is connected to the active
   *  button via a measured SVG connector (QualityVerification,
   *  EmergencyBreakdownCenter) — lets the caller capture each button's DOM
   *  node into its own ref registry for useStageConnector. Phases without
   *  a connector (TechnicalResourceLibrary) simply omit it. */
  registerButtonRef?: (id: string, el: HTMLButtonElement | null) => void;
}

export default function TimelineIndex({
  title,
  items,
  activeIndex,
  onSelect,
  mobileLayout = 'stack',
  registerButtonRef,
}: TimelineIndexProps) {
  const isScroll = mobileLayout === 'scroll';
  const containerClass = isScroll
    ? 'flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0'
    : 'flex flex-col gap-1';

  return (
    <>
      <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-4">{title}</p>
      <div className={containerClass}>
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              ref={registerButtonRef ? (el: HTMLButtonElement | null) => registerButtonRef(item.id, el) : undefined}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(idx)}
              className={`${isScroll ? 'shrink-0 lg:shrink lg:w-full whitespace-nowrap lg:whitespace-normal ' : ''}flex items-center gap-3 px-3 py-2.5 border-l-2 text-left transition-all duration-200 ${
                isActive
                  ? 'border-accent bg-white/[0.06] text-white'
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <span
                className={`text-[10px] font-mono tracking-wider ${isScroll ? '' : 'w-5 shrink-0 '}${
                  isActive ? 'text-accent' : 'text-white/30'
                }`}
              >
                {item.number}
              </span>
              <TechnicalIcon type={item.icon} className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
