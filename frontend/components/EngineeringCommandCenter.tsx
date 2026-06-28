/* PREMA ENGINEERING WORKS — Engineering Command Center (Phase 12) */
/* Design: Industrial document browser. Charcoal dark theme, signal-red accents, */
/* monospaced spec values, advanced fuzzy search from database, and reactive     */
/* quick-lookup panels.                                                          */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Loader2, BookOpen, AlertTriangle, Layers, Disc, Settings, Sliders, Thermometer, ShieldAlert } from 'lucide-react';
import TechnicalIcon from './TechnicalIcon';
import { ConsolePanel } from '@/components/engineering';

interface SearchResult {
  type: "MATERIAL" | "FIT" | "SURFACE_FINISH" | "HEAT_TREATMENT" | "BEARING" | "THREAD" | "ORDER" | "RFQ";
  title: string;
  subtitle: string;
  score: number;
  metadata: any;
}

interface Material {
  id: string;
  code: string;
  name: string;
  grade: string | null;
  properties: any;
}

export default function EngineeringCommandCenter() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'materials' | 'fits' | 'threads' | 'bearings' | 'tolerances'>('search');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Fetch materials for materials reference tab
  const fetchMaterials = () => {
    setIsLoadingMaterials(true);
    setErrorMsg(null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/materials`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load materials catalog');
        return res.json();
      })
      .then((data) => {
        setMaterials(data);
        setIsLoadingMaterials(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message);
        setIsLoadingMaterials(false);
      });
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'materials' && materials.length === 0 && !isLoadingMaterials) {
      fetchMaterials();
    }
  };

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
    }
  }

  // Handle live search
  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const delayDebounce = setTimeout(() => {
      setIsSearching(true);
      setErrorMsg(null);
      fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Search failed');
          return res.json();
        })
        .then((data) => {
          setSearchResults(data);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorMsg('Error performing fuzzy search');
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Default hardcoded references for instant lookup
  const FITS_PREVIEW = [
    { code: 'H7/g6', type: 'Clearance', hole: '+21 / 0 µm', shaft: '-7 / -20 µm', use: 'Rotating shafts, bushings' },
    { code: 'H7/k6', type: 'Transition', hole: '+21 / 0 µm', shaft: '+15 / +2 µm', use: 'Pulleys, locating gears' },
    { code: 'H7/p6', type: 'Interference', hole: '+21 / 0 µm', shaft: '+42 / +29 µm', use: 'Bearing seats, press-fit assemblies' },
  ];

  const THREADS_PREVIEW = [
    { size: 'M6', pitch: '1.0 mm', major: '6.0 mm', type: 'Metric Coarse', drill: '⌀5.0 mm' },
    { size: 'M8', pitch: '1.25 mm', major: '8.0 mm', type: 'Metric Coarse', drill: '⌀6.8 mm' },
    { size: 'M10', pitch: '1.5 mm', major: '10.0 mm', type: 'Metric Coarse', drill: '⌀8.5 mm' },
    { size: 'M12', pitch: '1.75 mm', major: '12.0 mm', type: 'Metric Coarse', drill: '⌀10.2 mm' },
  ];

  const BEARINGS_PREVIEW = [
    { model: '6205', type: 'Deep Groove Ball', d: '25 mm', D: '52 mm', B: '15 mm', dynLoad: '14.0 kN' },
    { model: '6206', type: 'Deep Groove Ball', d: '30 mm', D: '62 mm', B: '16 mm', dynLoad: '19.5 kN' },
    { model: '6308', type: 'Deep Groove Ball', d: '40 mm', D: '90 mm', B: '23 mm', dynLoad: '42.3 kN' },
  ];

  const TOLERANCES_PREVIEW = [
    { range: '0.5 – 3.0 mm', fine: '±0.05 mm', medium: '±0.1 mm', coarse: '±0.2 mm' },
    { range: '3.0 – 6.0 mm', fine: '±0.05 mm', medium: '±0.1 mm', coarse: '±0.3 mm' },
    { range: '6.0 – 30.0 mm', fine: '±0.1 mm', medium: '±0.2 mm', coarse: '±0.5 mm' },
    { range: '30.0 – 120.0 mm', fine: '±0.15 mm', medium: '±0.3 mm', coarse: '±0.8 mm' },
  ];

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      <div className="container relative z-10 space-y-12">
        {/* Title */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">
            Phase 12 — Engineer Console
          </p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Engineering Command Center
          </h2>
          <p className="text-foreground/70">
            Advanced search engine and cross-referencing console for engineering materials, tolerance limits, thread standards, and bearing seat layouts.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-2">
          {(['search', 'materials', 'fits', 'threads', 'bearings', 'tolerances'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-3.5 border-b-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'border-accent text-accent bg-white/[0.02]'
                  : 'border-transparent text-foreground/50 hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Console Panel */}
        <ConsolePanel>
          <div className="p-6 md:p-10 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'search' && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-8"
                >
                  {/* Search input */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Fuzzy search (e.g. EN19, H7/g6, 6205, Ra0.8)..."
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white rounded-none placeholder-white/30 focus:outline-none focus:border-accent text-sm font-mono transition-colors"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    {isSearching && (
                      <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
                    )}
                  </div>

                  {errorMsg && (
                    <div className="p-4 border border-accent/20 bg-accent/5 text-accent text-xs flex items-center gap-2 max-w-2xl mx-auto">
                      <ShieldAlert className="w-4 h-4" />
                      {errorMsg}
                    </div>
                  )}

                  {/* Search Results */}
                  <div className="max-w-4xl mx-auto space-y-4">
                    <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      Ranked Results ({searchResults.length})
                    </p>

                    {searchResults.length === 0 ? (
                      <div className="text-center py-12 border border-white/5 bg-white/[0.01]">
                        <BookOpen className="w-8 h-8 text-white/20 mx-auto mb-3" />
                        <p className="text-xs text-white/50">
                          {query.trim().length < 2 ? 'Type at least 2 characters to search the engineering catalog.' : 'No matching specifications found.'}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map((result, idx) => (
                          <div
                            key={idx}
                            className="p-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative flex flex-col justify-between"
                          >
                            <span className="absolute top-4 right-4 text-[9px] font-mono bg-accent/15 text-accent px-2 py-0.5">
                              {result.type}
                            </span>
                            <div className="space-y-2 mb-4">
                              <h4 className="text-sm font-bold text-white">{result.title}</h4>
                              <p className="text-xs text-white/60">{result.subtitle}</p>
                            </div>
                            
                            {/* Result details conditional by type */}
                            <div className="border-t border-white/5 pt-3 mt-auto">
                              {result.type === 'MATERIAL' && result.metadata && (
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40">
                                  <div>GRADE: <span className="text-white/80">{result.metadata.grade || 'N/A'}</span></div>
                                  <div>YIELD: <span className="text-white/80">{result.metadata.properties?.yieldStrength || 'N/A'}</span></div>
                                </div>
                              )}
                              {result.type === 'FIT' && result.metadata && (
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40">
                                  <div>HOLE: <span className="text-white/80">{result.metadata.holeLimit}</span></div>
                                  <div>SHAFT: <span className="text-white/80">{result.metadata.shaftLimit}</span></div>
                                </div>
                              )}
                              {result.type === 'BEARING' && result.metadata && (
                                <div className="grid grid-cols-3 gap-1 text-[9px] font-mono text-white/40">
                                  <div>d: <span className="text-white/80">{result.metadata.innerDiameter}mm</span></div>
                                  <div>D: <span className="text-white/80">{result.metadata.outerDiameter}mm</span></div>
                                  <div>B: <span className="text-white/80">{result.metadata.width}mm</span></div>
                                </div>
                              )}
                              {result.type === 'THREAD' && result.metadata && (
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40">
                                  <div>PITCH: <span className="text-white/80">{result.metadata.pitch}mm</span></div>
                                  <div>TYPE: <span className="text-white/80">{result.metadata.type}</span></div>
                                </div>
                              )}
                              {result.type === 'SURFACE_FINISH' && result.metadata && (
                                <div className="text-[10px] font-mono text-white/40">
                                  VALUE: <span className="text-white/80">Ra {result.metadata.valueRa} µm</span>
                                </div>
                              )}
                              {result.type === 'HEAT_TREATMENT' && result.metadata && (
                                <div className="text-[10px] font-mono text-white/40">
                                  PARAMS: <span className="text-white/80">{JSON.stringify(result.metadata.parameters)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'materials' && (
                <motion.div
                  key="materials"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Materials Database</h3>
                    <Layers className="w-4 h-4 text-white/40" />
                  </div>
                  {isLoadingMaterials ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-6 h-6 text-accent animate-spin mx-auto mb-3" />
                      <p className="text-xs text-white/40">Loading materials catalog...</p>
                    </div>
                  ) : errorMsg ? (
                    <div className="p-4 border border-accent/20 bg-accent/5 text-accent text-xs">
                      {errorMsg}
                    </div>
                  ) : (
                    <div className="border border-white/10 overflow-x-auto">
                      <table className="w-full border-collapse text-left min-w-[500px]">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Code</th>
                            <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Name</th>
                            <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Grade Reference</th>
                            <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Properties</th>
                          </tr>
                        </thead>
                        <tbody>
                          {materials.map((m) => (
                            <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.01]">
                              <td className="p-3 text-xs font-bold text-white font-mono">{m.code}</td>
                              <td className="p-3 text-xs text-white/80">{m.name}</td>
                              <td className="p-3 text-xs text-white/60 font-mono">{m.grade || '—'}</td>
                              <td className="p-3 text-xs text-white/50 font-mono">
                                {m.properties ? Object.entries(m.properties).map(([k, v]) => `${k}:${v}`).join(', ') : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'fits' && (
                <motion.div
                  key="fits"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">ISO Fits & Tolerances</h3>
                    <Sliders className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="border border-white/10 overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Fit Code</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Fit Class</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Hole limits</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Shaft limits</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Primary Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FITS_PREVIEW.map((fit, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                            <td className="p-3 text-xs font-bold text-white font-mono">{fit.code}</td>
                            <td className="p-3 text-xs text-accent font-semibold">{fit.type}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{fit.hole}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{fit.shaft}</td>
                            <td className="p-3 text-xs text-white/80">{fit.use}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'threads' && (
                <motion.div
                  key="threads"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Fastener Thread Guidelines</h3>
                    <Settings className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="border border-white/10 overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Thread Size</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Pitch</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Major Diameter</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Type</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Tap Drill size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {THREADS_PREVIEW.map((t, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                            <td className="p-3 text-xs font-bold text-white font-mono">{t.size}</td>
                            <td className="p-3 text-xs text-white/80 font-mono">{t.pitch}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{t.major}</td>
                            <td className="p-3 text-xs text-white/60">{t.type}</td>
                            <td className="p-3 text-xs text-accent font-mono">{t.drill}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bearings' && (
                <motion.div
                  key="bearings"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Bearings Specifications</h3>
                    <Disc className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="border border-white/10 overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Model Number</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Type</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Bore (d)</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Outer (D)</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Width (B)</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Dynamic Load</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BEARINGS_PREVIEW.map((b, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                            <td className="p-3 text-xs font-bold text-white font-mono">{b.model}</td>
                            <td className="p-3 text-xs text-white/80">{b.type}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{b.d}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{b.D}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{b.B}</td>
                            <td className="p-3 text-xs text-accent font-mono">{b.dynLoad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tolerances' && (
                <motion.div
                  key="tolerances"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">General Machining Tolerances (ISO 2768)</h3>
                    <Sliders className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="border border-white/10 overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40">Dimensional Range</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Fine (f)</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Medium (m)</th>
                          <th className="p-3 text-[10px] font-bold tracking-widest uppercase text-white/40 font-mono">Coarse (c)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOLERANCES_PREVIEW.map((t, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01]">
                            <td className="p-3 text-xs font-bold text-white font-mono">{t.range}</td>
                            <td className="p-3 text-xs text-white/60 font-mono">{t.fine}</td>
                            <td className="p-3 text-xs text-accent font-mono">{t.medium}</td>
                            <td className="p-3 text-xs text-white/40 font-mono">{t.coarse}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ConsolePanel>
      </div>
    </section>
  );
}
