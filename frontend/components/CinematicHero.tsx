'use client';

/* PREMA ENGINEERING WORKS — Cinematic Hero Experience */
/* Design: Premium product-launch cinematography with animated opening sequence */
/* Black screen → industrial sound → metallic particles → rotating shaft → light sweep → text reveal */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Particle animation for metallic dust effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }

    const particles: Particle[] = [];
    let animationFrameId: number;
    let frameCount = 0;

    // Create particles during opening sequence (first 2 seconds)
    const createParticles = () => {
      if (frameCount < 120) {
        // 2 seconds at 60fps
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.3, // Top portion
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 1 + 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            life: 1,
          });
        }
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create particles in opening sequence
      createParticles();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        p.opacity = p.life * 0.8;

        // Draw particle (metallic silver)
        ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      frameCount++;

      // Continue animation for opening sequence + some buffer
      if (frameCount < 200 || particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
      }
    };

    // Start animation after brief delay
    const startDelay = setTimeout(() => {
      animate();
      // Show text after 1.5 seconds
      const textDelay = setTimeout(() => {
        setShowText(true);
      }, 1500);
      return () => clearTimeout(textDelay);
    }, 300);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Play industrial sound on mount
  useEffect(() => {
    const playSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const now = audioContext.currentTime;

        // Create low frequency rumble (industrial base tone)
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        osc1.frequency.value = 60;
        osc1.type = 'sine';
        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.08, now + 0.3);
        gain1.gain.linearRampToValueAtTime(0.04, now + 1.5);
        gain1.gain.linearRampToValueAtTime(0, now + 2.2);

        // Create mid-range tone (machinery resonance)
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 120;
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.04, now + 0.5);
        gain2.gain.linearRampToValueAtTime(0.02, now + 1.8);
        gain2.gain.linearRampToValueAtTime(0, now + 2.2);

        osc1.start(now);
        osc1.stop(now + 2.2);
        osc2.start(now + 0.2);
        osc2.stop(now + 2.2);
      } catch (e) {
        // Audio context not available or blocked
      }
    };

    // Play sound after brief delay
    const timer = setTimeout(playSound, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Background shaft image with light sweep effect */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/products/hero-precision-engineering.webp"
          alt="Precision shaft"
          className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          style={{
            animation: 'fadeInSlow 3s ease-in-out forwards',
          }}
        />

        {/* Light sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Rotating shaft visualization (SVG-based) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="drop-shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          {/* Shaft body */}
          <defs>
            <linearGradient id="shaftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 0.8 }} />
            </linearGradient>
            <filter id="metalShine">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>

          {/* Main shaft cylinder */}
          <ellipse cx="150" cy="80" rx="40" ry="15" fill="url(#shaftGradient)" filter="url(#metalShine)" />
          <rect x="110" y="80" width="80" height="140" fill="url(#shaftGradient)" filter="url(#metalShine)" />
          <ellipse cx="150" cy="220" rx="40" ry="15" fill="url(#shaftGradient)" filter="url(#metalShine)" />

          {/* Shaft ridges/threading */}
          {[0, 30, 60, 90, 120].map((offset) => (
            <line
              key={offset}
              x1="110"
              y1={100 + offset}
              x2="190"
              y2={100 + offset}
              stroke="#9ca3af"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Highlight reflection */}
          <ellipse cx="135" cy="150" rx="8" ry="50" fill="white" opacity="0.3" filter="url(#metalShine)" />
        </motion.svg>
      </motion.div>

      {/* Hero text with staggered reveal */}
      {showText && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-6 px-6">
            {/* Main headline - split into lines for staggered animation */}
            <div className="space-y-2">
              {['PRECISION', 'ENGINEERED'].map((word, idx) => (
                <motion.h1
                  key={idx}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.8 }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            {/* Subheading */}
            <motion.div
              className="space-y-1 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {['WHEN PRODUCTION', 'CANNOT WAIT'].map((line, idx) => (
                <p key={idx} className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                  {line}
                </p>
              ))}
            </motion.div>

            {/* Divider line */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-32 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />

            {/* CTA buttons */}
            <motion.div
              className="flex gap-6 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a
                href="/products"
                className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors duration-200 active:scale-95"
              >
                Explore Products
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white/10 transition-colors duration-200 active:scale-95"
              >
                Request Quote
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator - appears after animation */}
      {animationComplete && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes fadeInSlow {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
