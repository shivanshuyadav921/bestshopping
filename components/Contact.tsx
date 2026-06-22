/* PREMA ENGINEERING WORKS — Contact Section */
/* Design: Minimal, direct call-to-action */
/* Focus: Trust, reliability, immediate action */

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Get Your Line Running?
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/90">
            Contact us for custom quotes, technical specifications, or emergency manufacturing requests. We respond within 24 hours.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-primary-foreground/20">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-70">Email</p>
              <a
                href="mailto:info@prema-engineering.com"
                className="text-lg font-medium hover:opacity-80 transition-opacity"
              >
                info@prema-engineering.com
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-70">Phone</p>
              <a
                href="tel:+919999999999"
                className="text-lg font-medium hover:opacity-80 transition-opacity"
              >
                +91 9999 999 999
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-widest uppercase opacity-70">Location</p>
              <p className="text-lg font-medium">Baddi, Himachal Pradesh</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="mailto:info@prema-engineering.com"
              className="px-8 py-3.5 bg-accent text-accent-foreground font-medium transition-all duration-200 hover:shadow-lg active:scale-95 text-center"
            >
              Send Inquiry
            </a>
            <a
              href="tel:+919999999999"
              className="px-8 py-3.5 border-2 border-primary-foreground text-primary-foreground font-medium transition-all duration-200 hover:bg-primary-foreground/10 active:scale-95 text-center"
            >
              Call Now
            </a>
          </div>

          {/* Trust Statement */}
          <div className="pt-8 text-sm text-primary-foreground/70">
            <p>ISO 9001 Certified • 24/7 Manufacturing • Baddi Industrial Belt</p>
          </div>
        </div>
      </div>
    </section>
  );
}
