/* PREMA ENGINEERING WORKS — Manufacturing Process */
/* Design: Engineering documentation panels with technical icons and precision language */

import TechnicalIcon from './TechnicalIcon';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: 'measurement' | 'design' | 'machining' | 'quality' | 'finishing' | 'inspection';
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Specification Review',
    description: 'Detailed analysis of your requirements. Tolerance verification, material selection, and feasibility assessment.',
    icon: 'measurement',
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'CAD modeling, tooling design, and production planning. Optimized for precision and efficiency.',
    icon: 'design',
  },
  {
    number: '03',
    title: 'Precision Machining',
    description: 'CNC operations with real-time monitoring. Multi-axis capabilities for complex geometries.',
    icon: 'machining',
  },
  {
    number: '04',
    title: 'Quality Verification',
    description: 'CMM inspection, surface finish verification, and dimensional accuracy confirmation.',
    icon: 'quality',
  },
  {
    number: '05',
    title: 'Finishing & Treatment',
    description: 'Heat treatment, surface finishing, coating, or polishing as specified.',
    icon: 'finishing',
  },
  {
    number: '06',
    title: 'Final Inspection',
    description: 'Comprehensive quality check. Documentation and certification included.',
    icon: 'inspection',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/20">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Manufacturing Process
          </h2>
          <p className="text-lg text-foreground/70">
            From specification to delivery, every step is optimized for precision, quality, and speed. We understand that your production line cannot afford downtime.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 border border-border bg-background hover:border-accent transition-all duration-300 group"
            >
              {/* Number Badge - Positioned at top-left corner */}
              <div className="absolute -top-1 -left-1 w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm leading-none">
                {step.number}
              </div>

              {/* Technical Icon */}
              <div className="mb-6 text-foreground/60 group-hover:text-accent transition-colors duration-300 pt-2">
                <TechnicalIcon type={step.icon} className="w-10 h-10" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground/70 leading-relaxed font-light">
                {step.description}
              </p>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Key Stats - Technical Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-20 border-t border-border">
          <div className="p-8 border border-border/50 bg-background/50">
            <p className="text-xs font-bold tracking-widest text-foreground/60 uppercase mb-2">Availability</p>
            <p className="text-4xl font-bold text-accent mb-2">24/7</p>
            <p className="text-sm text-foreground/70">Round-the-clock manufacturing capability</p>
          </div>
          <div className="p-8 border border-border/50 bg-background/50">
            <p className="text-xs font-bold tracking-widest text-foreground/60 uppercase mb-2">Tolerance</p>
            <p className="text-4xl font-bold text-accent mb-2">±0.005mm</p>
            <p className="text-sm text-foreground/70">Precision capability on critical dimensions</p>
          </div>
          <div className="p-8 border border-border/50 bg-background/50">
            <p className="text-xs font-bold tracking-widest text-foreground/60 uppercase mb-2">Quality</p>
            <p className="text-4xl font-bold text-accent mb-2">100%</p>
            <p className="text-sm text-foreground/70">Verification on every manufactured part</p>
          </div>
        </div>
      </div>
    </section>
  );
}
