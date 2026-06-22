/* PREMA ENGINEERING WORKS — Hero Section */
/* Design: Full-bleed component showcase with dramatic lighting */
/* Typography: Bold headline communicating core value proposition */
/* CTA: Minimal, direct action */

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/hero-precision-engineering-9qgwH2CgeeqL7web4Nou4X.webp)',
        }}
      >
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-2xl">
        <div className="space-y-6 md:space-y-8">
          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            When critical machinery stops, we manufacture the part that gets it running again.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 font-light max-w-xl">
            Precision shafts, custom gears, guide rails, and engineered components for factories that cannot afford downtime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#products"
              className="px-8 py-3.5 bg-accent text-accent-foreground font-medium transition-all duration-200 hover:shadow-lg active:scale-95 inline-block text-center"
            >
              Explore Products
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border-2 border-white text-white font-medium transition-all duration-200 hover:bg-white/10 active:scale-95 inline-block text-center"
            >
              Request Quote
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span>Baddi Industrial Belt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span>24/7 Manufacturing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/60 font-medium">Scroll to explore</span>
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
