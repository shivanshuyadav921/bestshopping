'use client';

import { useState } from 'react';
import * as React from 'react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/* PREMA ENGINEERING WORKS — Header Component */
/* Design: Minimal top bar, sticky during scroll, disappears on scroll-down */
/* Logo: Bold geometric symbol (precision shaft + gear) */

import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

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
    { label: 'Products & Components', href: '/products-and-components', isPage: true },
    { label: 'Gallery', href: '/gallery', isPage: true },
    { label: 'Products', href: '/#products' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Industries', href: '/#industries' },
    { label: 'Process', href: '/#process' },
    { label: 'Quality', href: '/#quality' },
    { label: 'Resources', href: '/#resources' },
    { label: 'Case Studies', href: '/#case-studies' },
    { label: 'Emergency', href: '/#emergency' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-background/98 backdrop-blur-lg border-b border-border shadow-md'
        : 'bg-background/80 backdrop-blur-sm border-b border-border/30'
      }`}>
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA ENGINEERING WORKS"
            width={40}
            height={40}
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
            priority
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
              className={`text-sm font-medium transition-colors duration-200 ${(item as { isPage?: boolean }).isPage
                  ? 'text-accent font-semibold hover:text-accent/80'
                  : 'text-foreground/80 hover:text-foreground'
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 border border-border bg-background hover:bg-secondary text-foreground rounded-none transition-colors"
                aria-label="Select theme"
              >
                {theme === "light" && <Sun className="w-4 h-4" />}
                {theme === "dark" && <Moon className="w-4 h-4" />}
                {theme === "system" && <Monitor className="w-4 h-4" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-card border-border">
              <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2 cursor-pointer">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <span>Light</span>
                {theme === "light" && <span className="ml-auto text-accent text-xs">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2 cursor-pointer">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <span>Dark</span>
                {theme === "dark" && <span className="ml-auto text-accent text-xs">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2 cursor-pointer">
                <Monitor className="w-4 h-4 text-muted-foreground" />
                <span>System</span>
                {theme === "system" && <span className="ml-auto text-accent text-xs">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <a
                href="/dashboard"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </a>
              <button
                onClick={logout}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer bg-transparent border-0"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth/login"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Login
              </a>
              <a
                href="/auth/register"
                className="px-4 py-2 border border-border text-foreground hover:bg-secondary font-medium text-sm transition-all duration-200 active:scale-95"
              >
                Sign Up
              </a>
            </>
          )}

          <a
            href="/#contact"
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
                className={`text-sm font-medium transition-colors ${(item as { isPage?: boolean }).isPage
                    ? 'text-accent font-semibold'
                    : 'text-foreground/80 hover:text-foreground'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2">
              <span className="text-sm font-medium text-foreground/80">Theme</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 border transition-all ${
                    theme === "light"
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-border bg-transparent text-muted-foreground"
                  }`}
                  aria-label="Light theme"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 border transition-all ${
                    theme === "dark"
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-border bg-transparent text-muted-foreground"
                  }`}
                  aria-label="Dark theme"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-2 border transition-all ${
                    theme === "system"
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-border bg-transparent text-muted-foreground"
                  }`}
                  aria-label="System theme"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 mt-2 flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="text-sm font-medium text-foreground/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-foreground/80 text-left cursor-pointer bg-transparent border-0"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/auth/login"
                    className="text-sm font-medium text-foreground/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/auth/register"
                    className="px-4 py-2 border border-border text-foreground hover:bg-secondary font-medium text-sm text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>

            <a
              href="/#contact"
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
