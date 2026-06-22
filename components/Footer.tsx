/* PREMA ENGINEERING WORKS — Footer Component */
/* Design: Minimal, professional, trust-building */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
                alt="PREMA"
                className="h-8 w-8"
              />
              <span className="font-display font-bold">PREMA</span>
            </div>
            <p className="text-sm text-foreground/60">
              Precision engineering for critical manufacturing.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-widest uppercase">Products</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Precision Shafts
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Custom Gears
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Guide Rails
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-widest uppercase">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#capabilities" className="hover:text-foreground transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-widest uppercase">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-precision mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} PREMA ENGINEERING WORKS. All rights reserved.</p>
          <p>Precision Manufacturing • Baddi Industrial Belt • ISO 9001 Certified</p>
        </div>
      </div>
    </footer>
  );
}
