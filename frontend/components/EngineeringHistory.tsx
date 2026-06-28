/* PREMA ENGINEERING WORKS — Engineering History & Timeline (Phase 11) */
/* Design: Precision industrial documentary aesthetic. Space Grotesk display fonts, */
/* signal-red accent lines, detailed spec grids, monochrome vector illustrations,  */
/* and 60 FPS transitions with reduced motion checks.                              */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TechnicalIcon from './TechnicalIcon';
import { ConsolePanel, TimelineIndex, VisualizationFrame } from '@/components/engineering';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Machine {
  name: string;
  specs: string[];
}

interface EraDetails {
  id: string;
  number: string;
  label: string;
  icon: 'oem' | 'design' | 'machining' | 'quality' | 'precision' | 'engineering' | 'turnaround' | 'certification';
  eraTitle: string;
  description: string;
  milestones: Milestone[];
  machines: Machine[];
  capabilities: string[];
  certifications: string[];
  achievements: string[];
}

const ERA_DATA: EraDetails[] = [
  {
    id: 'foundation',
    number: '01',
    label: '2005 – 2010',
    icon: 'oem',
    eraTitle: 'Foundation & Conventional Machining',
    description:
      'Prema Engineering Works is established with a focus on high-durability tooling and manual precision turning, laying down core machining principles.',
    milestones: [
      { year: '2005', title: 'Workshop Establishment', description: 'Founding of the Prema workshop with conventional tooling lines.' },
      { year: '2007', title: 'First OEM Contract', description: 'Secured contract for heavy machinery bushings and shafts.' },
      { year: '2009', title: 'Conventional Capacity Peak', description: 'Expanded workshop to house 6 manual lathe workstations.' },
    ],
    machines: [
      { name: 'Conventional Heavy Lathe', specs: ['Max Swing: 500mm', 'Distance Between Centers: 1500mm'] },
      { name: 'Manual Indexing Milling Machine', specs: ['Table Size: 1200x300mm', 'Spindle Taper: ISO 40'] },
    ],
    capabilities: ['Manual precision turning', 'Conventional gear hobbing', 'High-accuracy boring & drilling'],
    certifications: ['Local factory safety approval', 'Regional supplier registration'],
    achievements: ['Supplied over 10,000 gear blanks with zero structural failures'],
  },
  {
    id: 'cnc-automation',
    number: '02',
    label: '2011 – 2015',
    icon: 'machining',
    eraTitle: 'CNC Automation & Standardization',
    description:
      'Introduction of computer numerical control (CNC) centers to automate precision replication, achieving repeatable tolerance limits.',
    milestones: [
      { year: '2011', title: 'CNC Integration', description: 'Acquisition of the first vertical milling center.' },
      { year: '2013', title: 'ISO 9001 Certification', description: 'Formally standardized QMS protocols under ISO 9001:2008.' },
      { year: '2015', title: 'Multi-Axis Deployment', description: 'Acquired dual-spindle turning centers.' },
    ],
    machines: [
      { name: 'Haas VF-3 3-Axis CNC', specs: ['Travel: 1016 x 508 x 635mm', 'Spindle Speed: 8100 RPM'] },
      { name: 'Mazak Quick Turn 250', specs: ['Max Diameter: 350mm', 'Spindle Power: 15 kW'] },
    ],
    capabilities: ['3-Axis CNC milling', 'High-repeatability turning', 'Standard heat treatment tempering'],
    certifications: ['ISO 9001:2008 Quality Management System'],
    achievements: ['Attained 99.2% on-time delivery rate across key industrial clients'],
  },
  {
    id: 'aerospace-precision',
    number: '03',
    label: '2016 – 2020',
    icon: 'precision',
    eraTitle: 'Aerospace Metrology & Wire-Cut EDM',
    description:
      'Migration into high-integrity alloy machining, extreme tolerance verification, and non-contact quality inspections.',
    milestones: [
      { year: '2016', title: 'Superalloy Machining', description: 'Machined first batches of Titanium Grade 5 and Inconel 718.' },
      { year: '2018', title: 'CMM Lab Construction', description: 'Commissioned temperature-controlled metrology clean room.' },
      { year: '2020', title: 'Wire EDM Launch', description: 'Integrated electrical discharge machining for micro-scale slots.' },
    ],
    machines: [
      { name: 'Fanuc Robocut C400iB EDM', specs: ['Precision: 2µm', 'Table Load: 500kg'] },
      { name: 'Zeiss Duramax CMM', specs: ['Accuracy: 2.4µm + L/300', 'Scanning Probe Technology'] },
    ],
    capabilities: ['Wire-cut electrical discharge machining', 'Titanium/Inconel tooling', 'CMM dimensional verification'],
    certifications: ['ISO 9001:2015 Quality Management System', 'Preparatory aerospace compliance pass'],
    achievements: ['Successfully manufactured defense component shafts holding ±0.005mm limits'],
  },
  {
    id: 'smart-factory',
    number: '04',
    label: '2021 – Present',
    icon: 'certification',
    eraTitle: 'Smart Factory & Defense Standards',
    description:
      'Simultaneous 5-axis machining capability under AS9100D aerospace and defense standard protocols, integrating telemetry.',
    milestones: [
      { year: '2021', title: 'AS9100D Certification', description: 'Passed comprehensive aerospace standard audit.' },
      { year: '2023', title: '5-Axis Simultaneous Mill', description: 'Integrated multi-tasking mill-turn center.' },
      { year: '2025', title: 'IoT Platform Live', description: 'Connected machine telemetry to central Operating System.' },
    ],
    machines: [
      { name: 'Mazak Integrex i-100', specs: ['5-Axis Simultaneous', 'Spindle Speed: 12000 RPM'] },
      { name: 'Collaborative Loader Arm', specs: ['Payload: 10kg', 'Pneumatic clamp integration'] },
    ],
    capabilities: ['5-Axis simultaneous milling', 'Real-time telemetry tracking', 'Cryptographic compliance records'],
    certifications: ['AS9100D Aerospace & Defense Standard', 'ISO 9001:2015 Quality Standard'],
    achievements: ['Shipped over 100,000 flight-ready components with 99.98% QA pass rate'],
  },
];

export default function EngineeringHistory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEra = ERA_DATA[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  // Convert icon string types safely for TimelineIndex component
  const timelineItems = ERA_DATA.map((era) => ({
    id: era.id,
    number: era.number,
    label: era.label,
    icon: era.icon,
  }));

  return (
    <section id="history" className="py-24 md:py-32 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 11 — Industrial Heritage
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Engineering Evolution & Timeline
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Our history is a progression of precision: evolving from manual tool-making to 
            smart-factory multi-axis CNC production. Explore our technical milestones, machine 
            acquisitions, and quality system progression below.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* History Console Layout */}
        <ConsolePanel>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left side timeline navigator */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6 bg-black/20">
              <TimelineIndex
                title="Evolution Eras"
                items={timelineItems}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                mobileLayout="scroll"
              />
            </div>

            {/* Right side era details */}
            <div className="lg:col-span-8 p-6 lg:p-12 relative flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra.id}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  {/* Era Title Block */}
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">
                      ERA {activeEra.number} / {String(ERA_DATA.length).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-none mb-4">
                      {activeEra.eraTitle}
                    </h3>
                    <p className="text-white/70 leading-relaxed max-w-2xl font-light">
                      {activeEra.description}
                    </p>
                  </div>

                  {/* Milestones grid */}
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-4">
                      Chronological Milestones
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {activeEra.milestones.map((m, i) => (
                        <div key={i} className="border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between h-full">
                          <span className="text-xs font-mono font-bold text-accent mb-2 block">{m.year}</span>
                          <div>
                            <h5 className="text-xs font-semibold text-white mb-1">{m.title}</h5>
                            <p className="text-[11px] text-white/60 leading-normal">{m.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs & Hardware Detail Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-6">
                    {/* Machine Acquisitions */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                        Machine Acquisitions
                      </h4>
                      <div className="space-y-3">
                        {activeEra.machines.map((mac, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/10 p-3">
                            <h5 className="text-xs font-medium text-white mb-1.5 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                              {mac.name}
                            </h5>
                            <ul className="space-y-0.5 pl-3.5">
                              {mac.specs.map((s, idx) => (
                                <li key={idx} className="text-[10px] text-white/50 font-mono">
                                  — {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities & Certifications */}
                    <div className="space-y-6">
                      {/* Capabilities */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                          Capabilities Unlocked
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeEra.capabilities.map((c, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] text-white/70">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                          QMS & Quality Standards
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeEra.certifications.map((cert, i) => (
                            <span key={i} className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-[10px] text-accent font-medium">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                          Manufacturing Achievement
                        </h4>
                        {activeEra.achievements.map((ach, i) => (
                          <p key={i} className="text-xs text-white/80 leading-normal italic pl-2.5 border-l-2 border-accent">
                            &ldquo;{ach}&rdquo;
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ConsolePanel>
      </div>
    </section>
  );
}
