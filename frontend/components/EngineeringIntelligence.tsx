'use client';

/* PREMA ENGINEERING WORKS — Engineering Intelligence Layer (Phase 4) */
/* Design: Same engineering-documentation language as Capabilities/Process. */
/* Cinematic scroll narrative: Broken → Analysis → Reverse Engineering → */
/* Manufacturing → Inspection → Finished Product.                         */
/* Driven by IntersectionObserver (matches ScrollAssembly's proven, */
/* non-scroll-jacking pattern) for guaranteed 60fps — no scroll-scrubbing. */
/* A single low-poly, shadowless Three.js canvas renders the centerpiece  */
/* component and is reused across stages (geometry/material swap only),  */
/* avoiding the cost of mounting multiple WebGL contexts. */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import TechnicalIcon from './TechnicalIcon';

/* Reuse actual manufactured-component imagery already shipped with the
   Product Museum (component-precision-shaft / component-gear /
   component-guide-rail) — no new visual assets introduced. */
const ASSET_BASE = '/images/products';

type StageId = 'broken' | 'analysis' | 'reverse' | 'manufacturing' | 'inspection' | 'finished';

interface Stage {
  id: StageId;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: 'inspection' | 'measurement' | 'design' | 'machining' | 'quality' | 'certification';
  image: string;
  /* Visual treatment of the still image beneath the 3D overlay */
  imageFilter: string;
  /* Low-poly geometry shown in the shared Three.js canvas for this stage */
  geometry: 'shard' | 'wire-cylinder' | 'wire-gear' | 'solid-gear' | 'solid-gear-clean' | 'solid-gear-final';
  accentLabel: string;
}

const STAGES: Stage[] = [
  {
    id: 'broken',
    number: '01',
    label: 'Field Failure',
    title: 'Broken Component',
    description:
      'A worn guide rail arrives from the production line. Surface fatigue and edge chipping have taken it out of tolerance — the line is down until it is replaced.',
    icon: 'inspection',
    image: `${ASSET_BASE}/component-guide-rail.webp`,
    imageFilter: 'grayscale(0.6) brightness(0.55) contrast(1.15)',
    geometry: 'shard',
    accentLabel: 'OUT OF TOLERANCE',
  },
  {
    id: 'analysis',
    number: '02',
    label: 'Diagnostics',
    title: 'Engineering Analysis',
    description:
      'Dimensional scanning and material analysis establish exactly why the part failed — wear pattern, load path, and the original design intent behind every surface.',
    icon: 'measurement',
    image: `${ASSET_BASE}/component-guide-rail.webp`,
    imageFilter: 'grayscale(0.3) brightness(0.7) contrast(1.1)',
    geometry: 'shard',
    accentLabel: 'SCANNING · ±0.005mm',
  },
  {
    id: 'reverse',
    number: '03',
    label: 'Reconstruction',
    title: 'Reverse Engineering',
    description:
      'No drawings, no problem. A complete CAD model is reconstructed from the physical part, restoring exact geometry, fits, and tolerances — improved where the original design allows.',
    icon: 'design',
    image: `${ASSET_BASE}/component-precision-shaft.webp`,
    imageFilter: 'grayscale(0.5) brightness(0.65)',
    geometry: 'wire-cylinder',
    accentLabel: 'CAD MODEL RESTORED',
  },
  {
    id: 'manufacturing',
    number: '04',
    title: 'Manufacturing',
    label: 'Production',
    description:
      'Multi-axis CNC machining brings the reconstructed design to life in the correct material — EN8, EN9, Alloy Steel, or Stainless 316 — built to print, not approximated.',
    icon: 'machining',
    image: `${ASSET_BASE}/component-gear.webp`,
    imageFilter: 'grayscale(0.2) brightness(0.8)',
    geometry: 'solid-gear',
    accentLabel: 'CNC · MULTI-AXIS',
  },
  {
    id: 'inspection',
    number: '05',
    label: 'Verification',
    title: 'Inspection',
    description:
      'Every dimension is verified on a CMM against the reconstructed model. Surface finish, hardness, and tolerance are confirmed before the part is cleared for delivery.',
    icon: 'quality',
    image: `${ASSET_BASE}/component-gear.webp`,
    imageFilter: 'grayscale(0) brightness(0.95)',
    geometry: 'solid-gear-clean',
    accentLabel: '100% VERIFIED',
  },
  {
    id: 'finished',
    number: '06',
    label: 'Delivery',
    title: 'Finished Product',
    description:
      'A certified, drop-in replacement — engineered, manufactured, and inspected end-to-end. The line restarts with a component built to outlast the one it replaced.',
    icon: 'certification',
    image: `${ASSET_BASE}/component-gear.webp`,
    imageFilter: 'none',
    geometry: 'solid-gear-final',
    accentLabel: 'READY FOR DEPLOYMENT',
  },
];

/* ---------------------------------------------------------------------- */
/* Shared low-poly Three.js centerpiece                                   */
/* One scene, one renderer, no shadow maps, capped pixel ratio.          */
/* Only geometry/material/rotation-speed change between stages.          */
/* ---------------------------------------------------------------------- */

function useEngineeringScene(
  containerRef: React.RefObject<HTMLDivElement | null>,
  activeStage: Stage,
  isInView: boolean
) {
  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh | THREE.Group;
    rafId: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    /* Cap pixel ratio — uncapped DPR on retina displays is the #1 cause of
       dropped frames in lightweight Three.js scenes. */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false; // no shadow maps — perf critical
    container.appendChild(renderer.domElement);

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff5a36, 0.5); // accent-red rim
    rim.position.set(-4, -2, -3);
    scene.add(rim);
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const placeholder = new THREE.Group();
    scene.add(placeholder);

    stateRef.current = { scene, camera, renderer, mesh: placeholder, rafId: 0 };

    let lastTime = performance.now();
    const animate = (t: number) => {
      const s = stateRef.current;
      if (!s) return;
      const dt = (t - lastTime) / 1000;
      lastTime = t;
      if (!prefersReducedMotion) {
        s.mesh.rotation.y += dt * 0.45;
        s.mesh.rotation.x = Math.sin(t / 4000) * 0.12;
      }
      s.renderer.render(s.scene, s.camera);
      s.rafId = requestAnimationFrame(animate);
    };
    stateRef.current.rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !stateRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.renderer.dispose();
        container.removeChild(stateRef.current.renderer.domElement);
        stateRef.current.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      }
      stateRef.current = null;
    };
    // Scene is created once; geometry updates happen in the effect below.
  }, [containerRef]);

  /* Swap geometry/material when the active stage changes — cheap relative
     to tearing down and rebuilding the renderer/scene. */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;

    s.scene.remove(s.mesh);
    if (s.mesh instanceof THREE.Mesh) {
      s.mesh.geometry.dispose();
      if (Array.isArray(s.mesh.material)) s.mesh.material.forEach((m) => m.dispose());
      else s.mesh.material.dispose();
    } else {
      s.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
    }

    const next = buildGeometryForStage(activeStage.geometry);
    s.scene.add(next);
    s.mesh = next;
  }, [activeStage]);

  /* Pause the render loop entirely when scrolled out of view. */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    if (!isInView && s.rafId) {
      cancelAnimationFrame(s.rafId);
      s.rafId = 0;
    } else if (isInView && !s.rafId) {
      let lastTime = performance.now();
      const animate = (t: number) => {
        const st = stateRef.current;
        if (!st) return;
        const dt = (t - lastTime) / 1000;
        lastTime = t;
        st.mesh.rotation.y += dt * 0.45;
        st.mesh.rotation.x = Math.sin(t / 4000) * 0.12;
        st.renderer.render(st.scene, st.camera);
        st.rafId = requestAnimationFrame(animate);
      };
      s.rafId = requestAnimationFrame(animate);
    }
  }, [isInView]);
}

/* Builds a low-poly THREE.Group/Mesh per narrative stage. All geometry is
   intentionally simple (icosahedron / cylinder / torus segments) — these
   are abstractions of the real component, not photoreal models, kept
   purely to register motion and material state behind the real product
   photography. */
function buildGeometryForStage(kind: Stage['geometry']): THREE.Group {
  const group = new THREE.Group();

  if (kind === 'shard') {
    const geo = new THREE.IcosahedronGeometry(1.6, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.85,
      metalness: 0.3,
      wireframe: false,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xff5a36, transparent: true, opacity: 0.35 })
    );
    group.add(wire);
  } else if (kind === 'wire-cylinder') {
    const geo = new THREE.CylinderGeometry(0.9, 0.9, 2.6, 16, 4, true);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xd1d5db, transparent: true, opacity: 0.85 })
    );
    group.add(wire);
    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 2.5, 16),
      new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.6,
        metalness: 0.5,
        transparent: true,
        opacity: 0.25,
      })
    );
    group.add(core);
  } else if (kind === 'wire-gear' || kind === 'solid-gear' || kind === 'solid-gear-clean' || kind === 'solid-gear-final') {
    const teeth = 12;
    const radius = 1.4;
    const depth = 0.55;
    const bodyGeo = new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, depth, 24);
    const isWire = kind === 'wire-gear';
    const polished = kind === 'solid-gear-clean' || kind === 'solid-gear-final';
    const bodyMat = new THREE.MeshStandardMaterial({
      color: polished ? 0xe8e8e8 : 0x707070,
      roughness: polished ? 0.25 : 0.7,
      metalness: polished ? 0.85 : 0.4,
      wireframe: isWire,
      flatShading: !polished,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    group.add(body);

    const toothGeo = new THREE.BoxGeometry(0.22, depth, 0.32);
    const toothMat = bodyMat;
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      tooth.rotation.y = -angle;
      tooth.rotation.x = Math.PI / 2;
      group.add(tooth);
    }

    if (kind === 'solid-gear-final') {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 0.78, 0.025, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0xff5a36 })
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }
  }

  return group;
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function EngineeringIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);

  /* Track which narrative stage is centered in the viewport. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-stage-index'));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.55, rootMargin: '-10% 0px -10% 0px' }
    );

    stageRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Pause the WebGL render loop entirely while the section is off-screen. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setSectionInView(e.isIntersecting)),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeStage = STAGES[activeIndex];
  useEngineeringScene(canvasContainerRef, activeStage, sectionInView);

  return (
    <section
      id="engineering-intelligence"
      ref={sectionRef}
      className="relative bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* Faint engineering grid background — consistent with .grid-pattern token */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        {/* Section header — matches Capabilities/Process header pattern */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Phase 04 — Engineering Intelligence
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            From Failure to Finished Part
          </h2>
          <p className="text-lg text-white/70">
            Every replacement component follows the same disciplined sequence —
            no guesswork, no approximation. Scroll to follow one part through
            the full engineering lifecycle.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Sticky centerpiece visual */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-square border border-white/10 bg-white/[0.02] overflow-hidden">
                {/* Component photography layer */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStage.id}
                    src={activeStage.image}
                    alt={activeStage.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: activeStage.imageFilter }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Three.js centerpiece overlay */}
                <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

                {/* Status readout — engineering HUD, monochrome + accent only */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-white/50">
                  <span>STAGE {activeStage.number}/06</span>
                  <span className="text-accent">{activeStage.accentLabel}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-px w-full bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-accent"
                      animate={{ width: `${((activeIndex + 1) / STAGES.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Stage dots — tappable on mobile, mirrors active state */}
              <div className="flex items-center gap-2 mt-6 justify-center lg:justify-start">
                {STAGES.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-8 bg-accent' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Narrative stages */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-[40vh] lg:space-y-[50vh] pb-[20vh]">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                data-stage-index={idx}
                ref={(el) => {
                  if (el) stageRefs.current.set(idx, el);
                  else stageRefs.current.delete(idx);
                }}
                className="min-h-[40vh] lg:min-h-0 flex flex-col justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`relative p-8 border bg-white/[0.02] transition-colors duration-500 ${
                    idx === activeIndex ? 'border-accent' : 'border-white/10'
                  }`}
                >
                  <div className="absolute -top-1 -left-1 w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm leading-none">
                    {stage.number}
                  </div>

                  <div className="flex items-center justify-between mb-6 pt-2">
                    <p className="text-xs font-bold tracking-widest text-white/50 uppercase">
                      {stage.label}
                    </p>
                    <div className={`text-white/60 ${idx === activeIndex ? 'text-accent' : ''}`}>
                      <TechnicalIcon type={stage.icon} className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white">
                    {stage.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    {stage.description}
                  </p>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 transition-opacity duration-500 ${
                      idx === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing stat strip — mirrors Process.tsx key-stats pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/10">
          <div className="p-8 border border-white/10 bg-white/[0.02]">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Lifecycle</p>
            <p className="text-4xl font-bold text-accent mb-2">6 Stages</p>
            <p className="text-sm text-white/70">Every failed component, the same disciplined sequence</p>
          </div>
          <div className="p-8 border border-white/10 bg-white/[0.02]">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Reconstruction</p>
            <p className="text-4xl font-bold text-accent mb-2">No Drawings</p>
            <p className="text-sm text-white/70">Needed — full reverse engineering from the physical part</p>
          </div>
          <div className="p-8 border border-white/10 bg-white/[0.02]">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Verification</p>
            <p className="text-4xl font-bold text-accent mb-2">100%</p>
            <p className="text-sm text-white/70">CMM-inspected before any part leaves the floor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
