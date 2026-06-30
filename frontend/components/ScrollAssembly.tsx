'use client';

/* PREMA ENGINEERING WORKS — Scroll-Triggered Component Assembly */
/* Design: Components materialize and assemble as user scrolls */
/* Gears, star wheels, guide rails, splined shafts emerge from raw material */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const GEAR_TEETH = [
  { x1: "170.00", y1: "100.00", x2: "185.00", y2: "100.00" },
  { x1: "160.62", y1: "135.00", x2: "173.61", y2: "142.50" },
  { x1: "135.00", y1: "160.62", x2: "142.50", y2: "173.61" },
  { x1: "100.00", y1: "170.00", x2: "100.00", y2: "185.00" },
  { x1: "65.00", y1: "160.62", x2: "57.50", y2: "173.61" },
  { x1: "39.38", y1: "135.00", x2: "26.39", y2: "142.50" },
  { x1: "30.00", y1: "100.00", x2: "15.00", y2: "100.00" },
  { x1: "39.38", y1: "65.00", x2: "26.39", y2: "57.50" },
  { x1: "65.00", y1: "39.38", x2: "57.50", y2: "26.38" },
  { x1: "100.00", y1: "30.00", x2: "100.00", y2: "15.00" },
  { x1: "135.00", y1: "39.38", x2: "142.50", y2: "26.38" },
  { x1: "160.62", y1: "65.00", x2: "173.61", y2: "57.50" }
];

const STAR_POLYGONS = [
  { points: "100,100 170.00,100.00 146.19,119.13" },
  { points: "100,100 149.50,149.50 119.13,146.19" },
  { points: "100,100 100.00,170.00 80.87,146.19" },
  { points: "100,100 50.50,149.50 53.81,119.13" },
  { points: "100,100 30.00,100.00 53.81,80.87" },
  { points: "100,100 50.50,50.50 80.87,53.81" },
  { points: "100,100 100.00,30.00 119.13,53.81" },
  { points: "100,100 149.50,50.50 146.19,80.87" }
];

const components: ComponentItem[] = [
  {
    id: 'gear',
    name: 'Custom Gears',
    description: 'Precision-engineered tooth geometry with heat treatment',
    icon: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="gearGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9ca3af', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="70" fill="url(#gearGrad)" />
        <circle cx="100" cy="100" r="40" fill="black" />
        {/* Gear teeth */}
        {GEAR_TEETH.map((tooth, i) => (
          <line key={i} x1={tooth.x1} y1={tooth.y1} x2={tooth.x2} y2={tooth.y2} stroke="#6b7280" strokeWidth="4" />
        ))}
      </svg>
    ),
    delay: 0,
  },
  {
    id: 'star-wheel',
    name: 'Star Wheels',
    description: 'Bottle line components with precision indexing',
    icon: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        {/* Star shape */}
        {STAR_POLYGONS.map((polygon, i) => (
          <polygon
            key={i}
            points={polygon.points}
            fill="url(#starGrad)"
            stroke="#9ca3af"
            strokeWidth="1"
          />
        ))}
        <circle cx="100" cy="100" r="25" fill="black" />
      </svg>
    ),
    delay: 0.2,
  },
  {
    id: 'guide-rail',
    name: 'Guide Rails',
    description: 'Precision-ground linear motion components',
    icon: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Rail body */}
        <rect x="30" y="70" width="140" height="60" fill="url(#railGrad)" stroke="#6b7280" strokeWidth="1" />
        {/* Precision grooves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="50" y1={85 + i * 12} x2="150" y2={85 + i * 12} stroke="#9ca3af" strokeWidth="1" opacity="0.5" />
        ))}
        {/* Mounting holes */}
        {[50, 150].map((x) => (
          <circle key={x} cx={x} cy="100" r="6" fill="none" stroke="#6b7280" strokeWidth="1" />
        ))}
      </svg>
    ),
    delay: 0.4,
  },
  {
    id: 'splined-shaft',
    name: 'Splined Shafts',
    description: 'Mirror-polished with exact tolerance specifications',
    icon: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="shaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        {/* Shaft cylinder */}
        <rect x="40" y="80" width="120" height="40" fill="url(#shaftGrad)" stroke="#6b7280" strokeWidth="1" />
        {/* Spline ridges */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={50 + i * 15} y1="80" x2={50 + i * 15} y2="120" stroke="#9ca3af" strokeWidth="1.5" opacity="0.6" />
        ))}
        {/* Highlight */}
        <ellipse cx="100" cy="85" rx="50" ry="4" fill="white" opacity="0.4" />
      </svg>
    ),
    delay: 0.6,
  },
];

export default function ScrollAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = containerRef.current?.querySelectorAll('[data-id]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-32 pb-16 bg-background relative overflow-hidden">
      <div className="container">
        {/* Section intro */}
        <div className="max-w-2xl mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Component Assembly
          </h2>
          <p className="text-lg text-foreground/70">
            Watch as precision components materialize. Each element engineered for exact specifications and seamless integration.
          </p>
        </div>

        {/* Assembly grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {components.map((component) => {
            const isVisible = visibleItems.has(component.id);

            return (
              <motion.div
                key={component.id}
                data-id={component.id}
                className="flex flex-col items-center space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: component.delay, duration: 0.8, ease: 'easeOut' }}
              >
                {/* Component visualization */}
                <motion.div
                  className="w-48 h-48 relative drop-shadow-2xl"
                  initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
                  animate={isVisible ? { scale: 1, opacity: 1, rotateY: 0 } : { scale: 0.7, opacity: 0, rotateY: -90 }}
                  transition={{ delay: component.delay + 0.15, duration: 0.9, ease: 'easeOut' }}
                  style={{ perspective: 1000 }}
                >
                  {/* Raw material background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg"
                    initial={{ opacity: 0.5 }}
                    animate={isVisible ? { opacity: 0 } : { opacity: 0.5 }}
                    transition={{ delay: component.delay + 0.2, duration: 0.7, ease: 'easeInOut' }}
                  />

                  {/* Component icon */}
                  <motion.div
                    className="absolute inset-0 text-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: component.delay + 0.35, duration: 0.7, ease: 'easeOut' }}
                  >
                    {component.icon}
                  </motion.div>

                  {/* Shine effect */}
                  {isVisible && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-lg"
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: '100%', opacity: 1 }}
                      transition={{ delay: component.delay + 0.4, duration: 1.2, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>

                {/* Component info */}
                <motion.div
                  className="text-center space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: component.delay + 0.4, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold tracking-tight">{component.name}</h3>
                  <p className="text-foreground/70 max-w-xs">{component.description}</p>

                  {/* Spec line */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-24 mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: component.delay + 0.5, duration: 0.6 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Assembly complete message */}
        <motion.div
          className="mt-16 text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-lg text-foreground/70">
            Every component engineered for precision. Every assembly verified for quality.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent w-32 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
