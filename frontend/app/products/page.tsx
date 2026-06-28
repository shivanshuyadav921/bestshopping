/* PREMA ENGINEERING WORKS — Product Museum Gallery */
/* Interactive gallery showcasing all precision engineering exhibits */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PRODUCT_EXHIBITS } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function ProductMuseum() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 };
  const initialY = prefersReducedMotion ? 0 : 20;
  const initialX = (idx: number) => prefersReducedMotion ? 0 : (idx % 2 === 0 ? 20 : -20);
  const hoverScale = prefersReducedMotion ? 1 : 1.02;
  const buttonHoverX = prefersReducedMotion ? 0 : 4;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container py-4">
          <h1 className="text-lg font-semibold tracking-tight">Product Museum</h1>
        </div>
      </header>

      <main className="container py-16 space-y-24">
        {/* Intro Section */}
        <motion.section
          className="max-w-3xl space-y-6"
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Engineering Excellence on Display
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Explore our collection of precision-engineered components. Each exhibit showcases the craftsmanship, 
            technical expertise, and uncompromising quality that defines PREMA ENGINEERING WORKS.
          </p>
        </motion.section>

        {/* Museum Gallery */}
        <section className="space-y-16">
          {PRODUCT_EXHIBITS.map((product, idx) => (
            <motion.div
              key={product.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
              initial={{ opacity: 0, y: initialY }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transition}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Image */}
              <motion.div
                className={`relative group ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}
                whileHover={{ scale: hoverScale }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-black/50 border border-border">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category badge */}
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="px-3 py-1 bg-accent/90 text-white text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={`space-y-6 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ opacity: 0, x: initialX(idx) }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0.01 : 0.8 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                {/* Title and tagline */}
                <div className="space-y-3">
                  <h2 className="text-4xl font-bold tracking-tight leading-tight">{product.name}</h2>
                  <p className="text-lg text-accent font-medium">{product.tagline}</p>
                </div>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed text-lg">{product.description}</p>

                {/* Key specs preview */}
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.slice(0, 4).map((spec, sidx) => (
                    <motion.div
                      key={sidx}
                      className="bg-card rounded-lg p-4 border border-border"
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : (0.3 + sidx * 0.05) }}
                      viewport={{ once: true }}
                    >
                      <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">{spec.label}</p>
                      <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-white font-medium rounded-sm hover:bg-accent/90 transition-colors group"
                  whileHover={{ x: buttonHoverX }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                >
                  View Full Exhibit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </section>

        {/* Museum Stats */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-border"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { label: 'Precision Components', value: '12+' },
            { label: 'Industries Served', value: '25+' },
            { label: 'Years of Excellence', value: '20+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : (idx * 0.1) }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-foreground/5 rounded-lg p-12 text-center space-y-6"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl font-bold">Need a Custom Component?</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our engineering team specializes in custom solutions. Whether you need a modification to an existing design 
            {"or a completely new component, we\u2019re ready to help."}
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => {
                const element = document.getElementById('rfq');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors rounded-sm"
            >
              Request Custom Quote
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors rounded-sm"
            >
              Contact Engineering
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
