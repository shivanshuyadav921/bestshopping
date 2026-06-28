'use client';

/**
 * ⚠️ DEMO COMPONENT NOTICE:
 * These testimonials represent fictional client accounts created for UI/UX demonstration purposes.
 * Before deploying to production, this data array must be replaced with verified customer reviews.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CornerBrackets } from '@/components/engineering';

interface Testimonial {
  id: number;
  company: string;
  initials: string;
  reviewer: string;
  role: string;
  location: string;
  rating: number;
  content: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    company: "Apex Industrial Solutions",
    initials: "AIS",
    reviewer: "Marcus Vance",
    role: "Production Manager",
    location: "Munich, Germany",
    rating: 5,
    content: "PREMA has become our primary partner for emergency breakdown components. Their ability to reverse-engineer complex splined shafts and deliver CMM-certified replacements in under a week is unmatched. Our downtime has decreased by 40%."
  },
  {
    id: 2,
    company: "Nova Precision Systems",
    initials: "NPS",
    reviewer: "Elena Rostova",
    role: "Procurement Head",
    location: "Gothenburg, Sweden",
    rating: 5,
    content: "Uncompromising quality and exceptional engineering support. When we struggled with repeating timing gear failures, their team analyzed the wear pattern and recommended a superior alloy. The new gears have outlasted the OEM parts."
  },
  {
    id: 3,
    company: "Titan Manufacturing Group",
    initials: "TMG",
    reviewer: "Sarah Jenkins",
    role: "Plant Director",
    location: "Ohio, USA",
    rating: 5,
    content: "Outstanding turnaround times and transparent communication. We needed a batch of custom linear guide rails machined to ±0.005mm tolerances. PREMA delivered them ahead of schedule, with full material traceability certificates."
  },
  {
    id: 4,
    company: "Vertex Engineering Works",
    initials: "VEW",
    reviewer: "Rajesh Kumar",
    role: "Quality Engineer",
    location: "Pune, India",
    rating: 5,
    content: "We audit all our vendors strictly, and PREMA consistently scores 100% on dimensional accuracy. Their CMM inspection reports are incredibly detailed. They are a reliable partner for high-precision components."
  },
  {
    id: 5,
    company: "Orion Motion Technologies",
    initials: "OMT",
    reviewer: "Kenji Takahashi",
    role: "Operations Lead",
    location: "Tokyo, Japan",
    rating: 5,
    content: "Their custom gearbox subassemblies are exceptionally well-crafted. The team's deep understanding of backlash tolerances and surface finishes resolved our high-speed conveyor vibration problems. Highly recommended."
  },
  {
    id: 6,
    company: "Sterling Heavy Industries",
    initials: "SHI",
    reviewer: "Jean-Pierre Dubois",
    role: "Maintenance Chief",
    location: "Lyon, France",
    rating: 5,
    content: "PREMA stands out for their responsiveness and long-term partnership commitment. They don't just execute drawings; they understand the application context and help optimize the component design for durability."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Reset autoplay timer when index or hover state changes
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    if (!isHovered) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, isHovered, handleNext]);

  // Framer Motion slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 md:py-32 bg-secondary/10 border-t border-border overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid Blueprint Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4">
            Partner Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-foreground/60">
            What our clients say about working with us. Fostering engineering excellence and long-term industrial partnerships.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Carousel Frame */}
        <div className="relative max-w-4xl mx-auto border border-border bg-background p-8 md:p-12 min-h-[380px] md:min-h-[320px] flex flex-col justify-between shadow-sm">
          <CornerBrackets />

          {/* Testimonial Quote Icon */}
          <div className="absolute top-6 right-8 text-foreground/5 opacity-10 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          {/* Slide Content with AnimatePresence */}
          <div className="relative overflow-hidden flex-1 flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-6"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) {
                    handleNext();
                  } else if (swipe > 50) {
                    handlePrev();
                  }
                }}
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Body */}
                <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/80 italic">
                  "{active.content}"
                </p>

                {/* Reviewer Details */}
                <div className="flex items-center gap-4 pt-4">
                  {/* Circular Avatar */}
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-sm tracking-wider select-none">
                    {active.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{active.reviewer}</h4>
                    <p className="text-xs text-foreground/50">
                      {active.role} &middot; <span className="font-medium text-foreground/70">{active.company}</span>
                    </p>
                    <p className="text-[10px] text-foreground/40 font-mono mt-0.5">{active.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 transition-all duration-300 rounded-none ${
                    idx === currentIndex ? 'bg-accent w-6' : 'bg-foreground/20 hover:bg-foreground/45'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Industry Reviewers Quick Grid */}
        <div className="mt-16 md:mt-24">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-foreground/40 uppercase mb-8">
            Featured Industry Reviewers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => handleDotClick(idx)}
                className={`flex flex-col items-center text-center p-6 border transition-all duration-300 group hover:border-accent cursor-pointer ${
                  idx === currentIndex ? 'border-accent bg-accent/5' : 'border-border bg-background'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm tracking-wider mb-3 select-none transition-colors ${
                  idx === currentIndex ? 'bg-accent text-accent-foreground' : 'bg-secondary/15 text-foreground/70 group-hover:bg-accent/10 group-hover:text-accent'
                }`}>
                  {t.initials}
                </div>
                <h4 className="font-bold text-xs text-foreground line-clamp-1">{t.reviewer}</h4>
                <p className="text-[10px] text-foreground/50 line-clamp-1 mt-0.5">{t.role}</p>
                <p className="text-[9px] text-foreground/70 font-medium line-clamp-1 mt-1">{t.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
