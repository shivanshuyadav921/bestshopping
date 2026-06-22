'use client';

import { useState } from 'react';
import * as React from 'react';
import { Menu, X } from 'lucide-react';

/* PREMA ENGINEERING WORKS — Header Component */
/* Design: Minimal top bar, sticky during scroll, disappears on scroll-down */
/* Logo: Bold geometric symbol (precision shaft + gear) */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Products', href: '#products' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Industries', href: '#industries' },
    { label: 'Process', href: '#process' },
    { label: 'Quality', href: '#quality' },
    { label: 'Resources', href: '#resources' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Emergency', href: '#emergency' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/98 backdrop-blur-lg border-b border-border shadow-md'
        : 'bg-background/80 backdrop-blur-sm border-b border-border/30'
    }`}>
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA ENGINEERING WORKS"
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-display font-bold text-lg tracking-tight hidden sm:inline">
            PREMA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-accent text-accent-foreground font-medium text-sm transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Request Quote
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded-none transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 bg-accent text-accent-foreground font-medium text-sm transition-all duration-200 hover:shadow-lg active:scale-95 w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
