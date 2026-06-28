/* PREMA ENGINEERING WORKS — Capabilities Section */
/* Design: Engineering documentation panels with technical icons */

import TechnicalIcon from './TechnicalIcon';

interface Capability {
  title: string;
  description: string;
  icon: 'precision' | 'engineering' | 'quality' | 'turnaround' | 'material' | 'oem';
}

const capabilities: Capability[] = [
  {
    title: 'Precision Machining',
    description: 'CNC machines with tolerances to ±0.005mm. Capable of complex geometries and multi-axis operations.',
    icon: 'precision',
  },
  {
    title: 'Custom Engineering',
    description: 'Reverse engineering and custom component design. From concept to production in weeks, not months.',
    icon: 'engineering',
  },
  {
    title: 'Quality Assurance',
    description: 'ISO 9001 certified. Every component inspected. CMM verification for critical tolerances.',
    icon: 'quality',
  },
  {
    title: 'Fast Turnaround',
    description: 'When your production line stops, we manufacture the part that restarts it. 24/7 capability.',
    icon: 'turnaround',
  },
  {
    title: 'Material Expertise',
    description: 'EN8, EN9, Alloy Steel, Stainless Steel 316, 20CrMnTi. Hardening, heat treatment, surface finishing.',
    icon: 'material',
  },
  {
    title: 'OEM Replacement',
    description: 'Reverse engineered components for discontinued machinery. Exact specifications, better lead times.',
    icon: 'oem',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Engineering Capability
          </h2>
          <p className="text-lg text-foreground/70">
            Equipped with precision machinery, expert engineers, and decades of manufacturing experience. Baddi industrial belt, 24/7 operations.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="relative p-8 border border-border bg-background hover:border-accent transition-all duration-300 group"
            >
              {/* Technical Icon */}
              <div className="mb-6 text-foreground/60 group-hover:text-accent transition-colors duration-300">
                <TechnicalIcon type={capability.icon} className="w-10 h-10" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight mb-3">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground/70 leading-relaxed font-light">
                {capability.description}
              </p>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
