/* PREMA ENGINEERING WORKS — Technical Icon Component */
/* Design: Monochrome geometric manufacturing symbols, not emoji */

interface TechnicalIconProps {
  type: 'measurement' | 'design' | 'machining' | 'quality' | 'finishing' | 'inspection' | 'precision' | 'engineering' | 'turnaround' | 'material' | 'oem' | 'certification'
    | 'drawing' | 'broken' | 'sample' | 'cad' | 'custom' | 'upload' | 'gear-part' | 'shaft-part' | 'rail-part' | 'urgent' | 'breakdown'
    | 'packaging' | 'beverage' | 'food-processing' | 'pharma' | 'chemical' | 'automation' | 'material-handling' | 'plant';
  className?: string;
}

export default function TechnicalIcon({ type, className = 'w-8 h-8' }: TechnicalIconProps) {
  const iconMap = {
    measurement: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 12h18M12 3v18M6 6h12v12H6zM9 9v6M15 9v6" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 3h18v18H3zM3 9h18M9 3v18M3 15h18" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    machining: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2v20M2 12h20M7 7l10 10M17 7l-10 10" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
    quality: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 12l6 6 12-12" />
        <rect x="2" y="2" width="20" height="20" />
      </svg>
    ),
    finishing: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 20h18M6 16v4M12 12v8M18 8v12M3 15h18M3 10h18" />
      </svg>
    ),
    inspection: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    precision: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2v20M2 12h20M6 6l12 12M18 6l-12 12M8 8h8v8H8z" />
      </svg>
    ),
    engineering: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 3h18v18H3zM3 9h18M9 3v18M15 3v18" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="12" cy="6" r="1" fill="currentColor" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
    turnaround: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2v14M2 12h14M12 2l-3 3M12 2l3 3" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
    material: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 6h18M3 12h18M3 18h18M3 6v12M21 6v12" />
        <line x1="6" y1="6" x2="6" y2="18" />
        <line x1="12" y1="6" x2="12" y2="18" />
        <line x1="18" y1="6" x2="18" y2="18" />
      </svg>
    ),
    oem: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 3h18v18H3zM3 9h18M9 3v18" />
        <path d="M6 6h3v3H6zM12 6h3v3h-3zM15 12h3v3h-3z" fill="currentColor" />
      </svg>
    ),
    certification: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 3h18v14H3zM12 17v4M9 21h6M12 17l-3 4M12 17l3 4" />
        <path d="M6 6h12v8H6z" />
        <path d="M9 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    drawing: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M4 3h16v18H4zM4 8h16M8 3v18" />
        <path d="M11 13h7M11 16h5" />
        <circle cx="8" cy="13" r="1.5" />
      </svg>
    ),
    broken: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 12l4-2-2 5 5-1-3 6M13 3l-2 7 4-1-6 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    sample: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="5" y="5" width="14" height="14" rx="1" />
        <path d="M5 15l4-4 3 3 4-5 3 3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.2" fill="currentColor" />
      </svg>
    ),
    cad: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
        <path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
      </svg>
    ),
    custom: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 16V4M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
      </svg>
    ),
    'gear-part': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = 12 + Math.cos(a) * 6, y1 = 12 + Math.sin(a) * 6;
          const x2 = 12 + Math.cos(a) * 9, y2 = 12 + Math.sin(a) * 9;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </svg>
    ),
    'shaft-part': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="9" width="18" height="6" rx="1" />
        <path d="M6 9v6M10 9v6M14 9v6M18 9v6" opacity="0.5" />
      </svg>
    ),
    'rail-part': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="2" y="8" width="20" height="8" />
        <circle cx="7" cy="12" r="1.5" />
        <circle cx="17" cy="12" r="1.5" />
        <path d="M2 8h20" opacity="0.5" />
      </svg>
    ),
    urgent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    breakdown: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2L2 21h20z" strokeLinejoin="round" />
        <path d="M12 9v5M12 17h.01" strokeLinecap="round" />
      </svg>
    ),
    /* — Industry symbols (Phase 7) — */
    packaging: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 8l9-4 9 4-9 4-9-4z" strokeLinejoin="round" />
        <path d="M3 8v8l9 4 9-4V8" strokeLinejoin="round" />
        <path d="M12 12v8" />
        <path d="M7.5 6l9 4" opacity="0.5" />
      </svg>
    ),
    beverage: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M10 2h4v3.5l2.2 3.3V20a1 1 0 01-1 1H8.8a1 1 0 01-1-1V8.8L10 5.5V2z" strokeLinejoin="round" />
        <path d="M9 13h6" opacity="0.5" />
        <path d="M10 5.5h4" />
      </svg>
    ),
    'food-processing': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 5v4M8.5 8l2.5 3M15.5 8l-2.5 3M12 13l-4 4M12 13l4 4" />
        <circle cx="12" cy="13" r="1.3" fill="currentColor" />
      </svg>
    ),
    pharma: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="9" width="18" height="6" rx="3" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <circle cx="7" cy="12" r="0.8" fill="currentColor" />
      </svg>
    ),
    chemical: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M10 2h4M10.5 2v6l-5 11a1.2 1.2 0 001.1 1.7h10.8a1.2 1.2 0 001.1-1.7l-5-11V2" strokeLinejoin="round" />
        <path d="M7.5 15h9" opacity="0.5" />
        <circle cx="11" cy="18" r="0.7" fill="currentColor" />
        <circle cx="14" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
    automation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="17" width="6" height="4" />
        <path d="M6 17v-4l6-3 5 2v3" />
        <circle cx="6" cy="13" r="1.3" fill="currentColor" />
        <circle cx="12" cy="10" r="1.3" fill="currentColor" />
        <path d="M17 15l3-1.5v-3" />
        <circle cx="20" cy="10" r="1" />
      </svg>
    ),
    'material-handling': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="16" width="8" height="2" />
        <rect x="3" y="19" width="8" height="2" opacity="0.5" />
        <path d="M11 17V8M11 8h2M16 4v13" />
        <circle cx="6" cy="21" r="1" />
        <circle cx="16" cy="21" r="1" />
        <path d="M16 17h4l1 4h-5" strokeLinejoin="round" />
      </svg>
    ),
    plant: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 21V11l5 3v-3l5 3v-3l6-3v10z" strokeLinejoin="round" />
        <path d="M3 21h18" />
        <path d="M16 8V4M16 4h3v3" />
      </svg>
    ),
  };

  return iconMap[type] || null;
}
