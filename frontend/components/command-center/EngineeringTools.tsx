/* PREMA ENGINEERING WORKS — Engineering Intelligence Workbench */
/* Client Component: Housing interactive calculators, selectors, converters, and reference notes */

'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calculator, 
  Settings, 
  Info, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Cpu,
  Bookmark
} from 'lucide-react';
import TechnicalIcon from '@/components/TechnicalIcon';
import type { IconType } from '@/types/engineering';

/* ─── Shared Workbench Types ─── */

interface EngineeringToolsProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

/* ─── Fits Calculator Standards Lookup ─── */

const FIT_RANGES = [
  { min: 0, max: 3, h7: [10, 0], f7: [-6, -16], g6: [-2, -8], h6: [0, -6], k6: [6, 0], n6: [10, 4], p6: [12, 6], s6: [20, 14], u6: [24, 18] },
  { min: 3, max: 6, h7: [12, 0], f7: [-10, -22], g6: [-4, -12], h6: [0, -8], k6: [9, 1], n6: [16, 8], p6: [20, 12], s6: [27, 19], u6: [31, 23] },
  { min: 6, max: 10, h7: [15, 0], f7: [-13, -28], g6: [-5, -14], h6: [0, -9], k6: [10, 1], n6: [19, 10], p6: [24, 15], s6: [32, 23], u6: [38, 29] },
  { min: 10, max: 18, h7: [18, 0], f7: [-16, -34], g6: [-6, -17], h6: [0, -11], k6: [12, 1], n6: [23, 12], p6: [29, 18], s6: [39, 28], u6: [47, 36] },
  { min: 18, max: 30, h7: [21, 0], f7: [-20, -41], g6: [-7, -20], h6: [0, -13], k6: [15, 2], n6: [28, 15], p6: [35, 22], s6: [48, 35], u6: [54, 41] },
  { min: 30, max: 50, h7: [25, 0], f7: [-25, -50], g6: [-9, -25], h6: [0, -16], k6: [18, 2], n6: [33, 17], p6: [42, 26], s6: [59, 43], u6: [70, 54] },
  { min: 50, max: 80, h7: [30, 0], f7: [-30, -60], g6: [-10, -29], h6: [0, -19], k6: [21, 2], n6: [39, 20], p6: [51, 32], s6: [72, 53], u6: [87, 68] },
  { min: 80, max: 120, h7: [35, 0], f7: [-36, -71], g6: [-12, -34], h6: [0, -22], k6: [25, 3], n6: [45, 23], p6: [59, 37], s6: [90, 68], u6: [110, 88] }
];

/* ─── Thread Specifications Database ─── */

const THREADS_DB = [
  { size: 'M3', pitch: 0.5, stressArea: 5.03, major: 3.0 },
  { size: 'M4', pitch: 0.7, stressArea: 8.78, major: 4.0 },
  { size: 'M5', pitch: 0.8, stressArea: 14.20, major: 5.0 },
  { size: 'M6', pitch: 1.0, stressArea: 20.10, major: 6.0 },
  { size: 'M8', pitch: 1.25, stressArea: 36.60, major: 8.0 },
  { size: 'M10', pitch: 1.5, stressArea: 58.00, major: 10.0 },
  { size: 'M12', pitch: 1.75, stressArea: 84.30, major: 12.0 },
  { size: 'M16', pitch: 2.0, stressArea: 157.00, major: 16.0 },
  { size: 'M20', pitch: 2.5, stressArea: 245.00, major: 20.0 }
];

/* ─── Bearings Database ─── */

const BEARINGS_DB = [
  { model: '6000', c: 4.66, c0: 1.96, bore: 10, outer: 26, width: 8 },
  { model: '6005', c: 11.2, c0: 5.59, bore: 25, outer: 47, width: 12 },
  { model: '6205', c: 14.0, c0: 7.80, bore: 25, outer: 52, width: 15 },
  { model: '6206', c: 19.5, c0: 11.2, bore: 30, outer: 62, width: 16 },
  { model: '6308', c: 42.3, c0: 24.0, bore: 40, outer: 90, width: 23 },
  { model: '6310', c: 61.8, c0: 38.0, bore: 50, outer: 110, width: 27 }
];

/* ─── Component ─── */

export default function EngineeringTools({ activeView, setActiveView }: EngineeringToolsProps) {
  // Translate view names
  const initialTab = useMemo(() => {
    if (activeView === 'assistant') return 'assistant';
    if (activeView === 'materials' || activeView === 'material-lookup') return 'material';
    if (activeView === 'fits') return 'fits';
    if (activeView === 'tolerance-lookup') return 'tolerance';
    if (activeView === 'thread-calc') return 'thread';
    if (activeView === 'bearing-finder') return 'bearing';
    if (activeView === 'surface-sel' || activeView === 'surface') return 'surface';
    if (activeView === 'reference' || activeView === 'unit-converter') return 'unit';
    if (activeView === 'notes') return 'notes';
    if (activeView === 'gears') return 'gears';
    return 'fits';
  }, [activeView]);

  const [activeTab, setLocalTab] = useState<string>(initialTab);

  /* ────────── AI Assistant State ────────── */
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'assistant', text: string, category?: string, ragTrace?: any }>>([
    {
      sender: 'assistant',
      text: `### PREMA Engineering Intelligence Assistant

Welcome to the technical workbench assistant. I have real-time access to the local database, containing:
*   **Alloy Materials** (EN24, EN19, EN8, SS316, SS304 properties)
*   **ISO Fits & Tolerances** (e.g. H7/g6, H7/k6 clearance classifications)
*   **Deep Groove Bearings** (e.g. 6205, 6206 boundary dimensions)
*   **Metric Coarse Threads** (major diameters, pitches, tap drill formulas)

*Ask me questions like:*
*   "What is the yield strength of EN24?"
*   "Recommend a fit for a rotating shaft"
*   "Suggest a bearing for a 25mm shaft journal"
*   "What is the thread pitch for M12 screws?"`,
      category: 'KNOWLEDGE'
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeRagTraceIndex, setActiveRagTraceIndex] = useState<number | null>(null);

  const handleSendChat = useCallback(async (messageText: string) => {
    const queryStr = messageText.trim();
    if (!queryStr) return;

    // Avoid double posting
    if (chatLoading) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: queryStr }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/ai/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryStr })
      });
      const data = await res.json();
      if (res.ok) {
        setChatHistory(prev => [...prev, {
          sender: 'assistant',
          text: data.answer,
          category: data.category,
          ragTrace: data.ragTrace
        }]);
      } else {
        setChatHistory(prev => [...prev, {
          sender: 'assistant',
          text: `Error: ${data.error || 'Failed to fetch AI response.'}`,
          category: 'GENERAL'
        }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, {
        sender: 'assistant',
        text: 'Network error. Failed to reach the engineering AI agent.',
        category: 'GENERAL'
      }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatLoading]);

  // Sync state tab on activeView change
  useEffect(() => {
    Promise.resolve().then(() => {
      setLocalTab(initialTab);
    });
  }, [initialTab]);

  // Listen for queries forwarded from search area redirect
  useEffect(() => {
    if (activeTab === 'assistant' && typeof window !== 'undefined') {
      const q = sessionStorage.getItem('prema-assistant-query');
      if (q) {
        sessionStorage.removeItem('prema-assistant-query');
        Promise.resolve().then(() => {
          handleSendChat(q);
        });
      }
    }
  }, [activeTab, handleSendChat]);

  /* ────────── Fits Calculator State ────────── */
  const [fitDiameter, setFitDiameter] = useState<number>(20);
  const [shaftFitClass, setShaftFitClass] = useState<string>('g6');

  /* ────────── Tolerance Calculator State ────────── */
  const [tolDimension, setTolDimension] = useState<number>(45);
  const [tolClass, setTolClass] = useState<'fine' | 'medium' | 'coarse' | 'veryCoarse'>('medium');

  /* ────────── Thread Calculator State ────────── */
  const [selectedThread, setSelectedThread] = useState<string>('M8');
  const [boltGrade, setBoltGrade] = useState<number>(8.8);
  const [tighteningCondition, setTighteningCondition] = useState<'lubricated' | 'zinc' | 'dry'>('lubricated');

  /* ────────── Bearing Calculator State ────────── */
  const [bearingPreset, setBearingPreset] = useState<string>('6205');
  const [bearingType, setBearingType] = useState<'ball' | 'roller'>('ball');
  const [bearingC, setBearingC] = useState<number>(14.0); // kN
  const [bearingC0, setBearingC0] = useState<number>(7.8); // kN
  const [radialLoad, setRadialLoad] = useState<number>(2.5); // kN
  const [axialLoad, setAxialLoad] = useState<number>(0.8); // kN
  const [bearingSpeed, setBearingSpeed] = useState<number>(1500); // RPM

  /* ────────── Surface Finish State ────────── */
  const [targetRa, setTargetRa] = useState<number>(0.8);

  /* ────────── Unit Converter State ────────── */
  const [convCategory, setConvCategory] = useState<'length' | 'force' | 'mass' | 'torque' | 'temp'>('length');
  const [convVal, setConvVal] = useState<number>(10);
  const [convFrom, setConvFrom] = useState<string>('mm');
  const [convTo, setConvTo] = useState<string>('inch');

  /* ────────── Material Selector State ────────── */
  const [matLoad, setMatLoad] = useState<string>('moderate');
  const [matCorrosion, setMatCorrosion] = useState<string>('mild');
  const [matHardness, setMatHardness] = useState<string>('medium');
  const [matMachinability, setMatMachinability] = useState<string>('moderate');

  /* ────────── Gear Calculator State ────────── */
  const [gearModule, setGearModule] = useState<number>(2);
  const [gearTeeth, setGearTeeth] = useState<number>(24);

  // Tabs definitions
  const tabs = [
    { id: 'assistant', label: 'AI Assistant', icon: 'precision' },
    { id: 'fits', label: 'Fits Calculator', icon: 'measurement' },
    { id: 'tolerance', label: 'Tolerance Calculator', icon: 'measurement' },
    { id: 'thread', label: 'Thread Calculator', icon: 'gear-part' },
    { id: 'bearing', label: 'Bearing Calculator', icon: 'machining' },
    { id: 'surface', label: 'Surface Finish', icon: 'finishing' },
    { id: 'material', label: 'Material Assistant', icon: 'material' },
    { id: 'unit', label: 'Unit Converter', icon: 'engineering' },
    { id: 'gears', label: 'Gear Calculator', icon: 'gear-part' },
    { id: 'notes', label: 'Engineering Notes', icon: 'drawing' },
  ];

  /* ─── Fits Calculation ─── */
  const fitsResult = useMemo(() => {
    const d = Math.max(0.5, Math.min(120, fitDiameter));
    const range = FIT_RANGES.find(r => d > r.min && d <= r.max) || FIT_RANGES[4]; // default 18-30
    const h7 = range.h7;
    const shaftVal = range[shaftFitClass as keyof typeof range];
    const shaft = Array.isArray(shaftVal) ? (shaftVal as number[]) : [0, 0];

    const holeMin = d;
    const holeMax = d + h7[0] / 1000;
    const shaftMin = d + shaft[1] / 1000;
    const shaftMax = d + shaft[0] / 1000;

    let fitType = 'Transition';
    if (h7[1] >= shaft[0]) {
      fitType = 'Clearance';
    } else if (h7[0] <= shaft[1]) {
      fitType = 'Interference';
    }

    const maxClearance = Math.max(0, holeMax - shaftMin);
    const minClearance = Math.max(0, holeMin - shaftMax);
    const maxInterference = Math.max(0, shaftMax - holeMin);
    const minInterference = Math.max(0, shaftMin - holeMax);

    return {
      holeLower: h7[1],
      holeUpper: h7[0],
      holeMin,
      holeMax,
      shaftLower: shaft[1],
      shaftUpper: shaft[0],
      shaftMin,
      shaftMax,
      fitType,
      maxClearance: maxClearance * 1000, // µm
      minClearance: minClearance * 1000,
      maxInterference: maxInterference * 1000,
      minInterference: minInterference * 1000,
    };
  }, [fitDiameter, shaftFitClass]);

  /* ─── Tolerance Calculation ─── */
  const toleranceResult = useMemo(() => {
    const dim = Math.max(0.5, Math.min(1000, tolDimension));
    let deviation = 0.1; // default fallback

    if (dim >= 0.5 && dim <= 3) {
      deviation = tolClass === 'fine' ? 0.05 : tolClass === 'medium' ? 0.1 : tolClass === 'coarse' ? 0.2 : 0.3;
    } else if (dim > 3 && dim <= 6) {
      deviation = tolClass === 'fine' ? 0.05 : tolClass === 'medium' ? 0.1 : tolClass === 'coarse' ? 0.3 : 0.5;
    } else if (dim > 6 && dim <= 30) {
      deviation = tolClass === 'fine' ? 0.1 : tolClass === 'medium' ? 0.2 : tolClass === 'coarse' ? 0.5 : 1.0;
    } else if (dim > 30 && dim <= 120) {
      deviation = tolClass === 'fine' ? 0.15 : tolClass === 'medium' ? 0.3 : tolClass === 'coarse' ? 0.8 : 1.5;
    } else if (dim > 120 && dim <= 400) {
      deviation = tolClass === 'fine' ? 0.2 : tolClass === 'medium' ? 0.5 : tolClass === 'coarse' ? 1.2 : 2.5;
    } else {
      deviation = tolClass === 'fine' ? 0.3 : tolClass === 'medium' ? 0.8 : tolClass === 'coarse' ? 2.0 : 4.0;
    }

    return {
      deviation,
      min: dim - deviation,
      max: dim + deviation,
    };
  }, [tolDimension, tolClass]);

  /* ─── Thread Calculation ─── */
  const threadResult = useMemo(() => {
    const thread = THREADS_DB.find(t => t.size === selectedThread) || THREADS_DB[4];
    const tapDrill = thread.major - thread.pitch;

    // Bolt preload & torque calculations
    const yieldStrength = boltGrade === 8.8 ? 640 : boltGrade === 10.9 ? 940 : 1080; // MPa
    const preload = 0.75 * thread.stressArea * yieldStrength; // N

    const kVal = tighteningCondition === 'lubricated' ? 0.15 : tighteningCondition === 'zinc' ? 0.18 : 0.20;
    const torque = kVal * (thread.major / 1000) * preload; // N·m

    return {
      pitch: thread.pitch,
      major: thread.major,
      stressArea: thread.stressArea,
      tapDrill,
      preload: preload / 1000, // kN
      torque,
    };
  }, [selectedThread, boltGrade, tighteningCondition]);

  /* ─── Bearing Calculation ─── */
  const bearingResult = useMemo(() => {
    // Equivalent dynamic load P = X*Fr + Y*Fa
    // Simple deep groove ball logic
    const ratio = axialLoad / radialLoad;
    let x = 1.0;
    let y = 0.0;
    if (bearingType === 'ball' && ratio > 0.3) {
      x = 0.56;
      y = 1.4;
    } else if (bearingType === 'roller' && ratio > 0.15) {
      x = 0.67;
      y = 1.1;
    }

    const pLoad = x * radialLoad + y * axialLoad; // kN

    // Life rating in million revolutions L10
    const pPower = bearingType === 'ball' ? 3.0 : 10.0 / 3.0;
    const l10 = Math.pow(bearingC / Math.max(0.01, pLoad), pPower); // million revs

    // Life in hours L10h
    const l10h = (l10 * 1000000) / (60 * Math.max(1, bearingSpeed));

    // Static safety factor
    const p0Load = Math.max(radialLoad, 0.6 * radialLoad + 0.5 * axialLoad);
    const staticSafety = bearingC0 / Math.max(0.01, p0Load);

    let status = 'Satisfactory';
    let statusColor = 'text-emerald-500';
    if (staticSafety < 1.0 || l10h < 500) {
      status = 'Critical / Redesign Recommended';
      statusColor = 'text-rose-500';
    } else if (staticSafety < 1.5 || l10h < 2000) {
      status = 'Borderline / Moderate Risk';
      statusColor = 'text-amber-500';
    }

    return {
      equivalentLoad: pLoad,
      lifeRevs: l10,
      lifeHours: l10h,
      staticSafety,
      status,
      statusColor,
    };
  }, [bearingType, bearingC, bearingC0, radialLoad, axialLoad, bearingSpeed]);

  const handleBearingPresetChange = (model: string) => {
    setBearingPreset(model);
    const found = BEARINGS_DB.find(b => b.model === model);
    if (found) {
      setBearingC(found.c);
      setBearingC0(found.c0);
    }
  };

  /* ─── Surface Finish Mapping ─── */
  const surfaceResult = useMemo(() => {
    const ra = targetRa;
    
    const checkProcess = (min: number, max: number, economical: number) => {
      if (ra >= min && ra <= max) {
        if (ra >= economical) return 'Economical';
        return 'Feasible';
      }
      return 'Impractical';
    };

    const processes = [
      { name: 'Turning', rating: checkProcess(0.4, 6.3, 1.6), range: '0.4 – 6.3 µm' },
      { name: 'Milling', rating: checkProcess(0.8, 6.3, 1.6), range: '0.8 – 6.3 µm' },
      { name: 'Grinding', rating: checkProcess(0.1, 1.6, 0.4), range: '0.1 – 1.6 µm' },
      { name: 'Lapping', rating: checkProcess(0.025, 0.2, 0.05), range: '0.025 – 0.2 µm' },
      { name: 'EDM', rating: checkProcess(0.8, 12.5, 3.2), range: '0.8 – 12.5 µm' },
      { name: 'Sand Casting', rating: checkProcess(6.3, 25.0, 12.5), range: '6.3 – 25.0 µm' },
    ];

    let application = 'General mating surfaces, structural flanges';
    if (ra <= 0.1) {
      application = 'High-pressure dynamic seal journals, gage blocks, engine cylinder bores';
    } else if (ra <= 0.2) {
      application = 'Ball bearing seats, crankshaft journals, slide valves';
    } else if (ra <= 0.4) {
      application = 'Gears, hydraulic seal surfaces, sliding shaft connections';
    } else if (ra <= 0.8) {
      application = 'Precision engine block faces, high-speed gear teeth, keyways';
    } else if (ra <= 1.6) {
      application = 'Gear housings, shaft couplings, pump casings, general brackets';
    }

    return {
      processes,
      application,
    };
  }, [targetRa]);

  /* ─── Unit Conversion ─── */
  const unitResult = useMemo(() => {
    const val = convVal;
    let converted = val;

    if (convCategory === 'length') {
      // from/to mm, m, inch, ft
      let inMm = val;
      if (convFrom === 'm') inMm = val * 1000;
      else if (convFrom === 'inch') inMm = val * 25.4;
      else if (convFrom === 'ft') inMm = val * 304.8;

      if (convTo === 'mm') converted = inMm;
      else if (convTo === 'm') converted = inMm / 1000;
      else if (convTo === 'inch') converted = inMm / 25.4;
      else if (convTo === 'ft') converted = inMm / 304.8;
    } else if (convCategory === 'force') {
      // N, kN, kgf, lbf
      let inN = val;
      if (convFrom === 'kN') inN = val * 1000;
      else if (convFrom === 'kgf') inN = val * 9.80665;
      else if (convFrom === 'lbf') inN = val * 4.44822;

      if (convTo === 'N') converted = inN;
      else if (convTo === 'kN') converted = inN / 1000;
      else if (convTo === 'kgf') converted = inN / 9.80665;
      else if (convTo === 'lbf') converted = inN / 4.44822;
    } else if (convCategory === 'mass') {
      // kg, g, lb, oz
      let inKg = val;
      if (convFrom === 'g') inKg = val / 1000;
      else if (convFrom === 'lb') inKg = val * 0.45359237;
      else if (convFrom === 'oz') inKg = val * 0.028349523;

      if (convTo === 'kg') converted = inKg;
      else if (convTo === 'g') converted = inKg * 1000;
      else if (convTo === 'lb') converted = inKg / 0.45359237;
      else if (convTo === 'oz') converted = inKg / 0.028349523;
    } else if (convCategory === 'torque') {
      // N·m, N·cm, lb·ft, lb·in
      let inNm = val;
      if (convFrom === 'Ncm') inNm = val / 100;
      else if (convFrom === 'lbft') inNm = val * 1.355818;
      else if (convFrom === 'lbin') inNm = val * 0.1129848;

      if (convTo === 'Nm') converted = inNm;
      else if (convTo === 'Ncm') converted = inNm * 100;
      else if (convTo === 'lbft') converted = inNm / 1.355818;
      else if (convTo === 'lbin') converted = inNm / 0.1129848;
    } else if (convCategory === 'temp') {
      // C, F, K
      let inC = val;
      if (convFrom === 'F') inC = (val - 32) * 5 / 9;
      else if (convFrom === 'K') inC = val - 273.15;

      if (convTo === 'C') converted = inC;
      else if (convTo === 'F') converted = (inC * 9 / 5) + 32;
      else if (convTo === 'K') converted = inC + 273.15;
    }

    return converted;
  }, [convCategory, convVal, convFrom, convTo]);

  // Adjust categories on unit change
  const handleUnitCategoryChange = (cat: 'length' | 'force' | 'mass' | 'torque' | 'temp') => {
    setConvCategory(cat);
    if (cat === 'length') {
      setConvFrom('mm'); setConvTo('inch');
    } else if (cat === 'force') {
      setConvFrom('N'); setConvTo('lbf');
    } else if (cat === 'mass') {
      setConvFrom('kg'); setConvTo('lb');
    } else if (cat === 'torque') {
      setConvFrom('Nm'); setConvTo('lbft');
    } else if (cat === 'temp') {
      setConvFrom('C'); setConvTo('F');
    }
  };

  /* ─── Material Recommendation Logic ─── */
  const recommendedMaterials = useMemo(() => {
    interface MaterialRecommendation {
      grade: string;
      category: string;
      strength: string;
      hardness: string;
      machinability: string;
      corrosion: string;
      reason: string;
    }

    const list: MaterialRecommendation[] = [
      {
        grade: 'SS316 Stainless Steel',
        category: 'Corrosion-Resistant Steel',
        strength: 'Yield: 290 MPa, Tensile: 580 MPa',
        hardness: '170 HB',
        machinability: 'Moderate (45%)',
        corrosion: 'Outstanding (marine & acid grade)',
        reason: 'Recommended for harsh chemical or saltwater environments.'
      },
      {
        grade: 'SS304 Stainless Steel',
        category: 'Standard Stainless Steel',
        strength: 'Yield: 215 MPa, Tensile: 505 MPa',
        hardness: '150 HB',
        machinability: 'Moderate (55%)',
        corrosion: 'Excellent (food/indoor hygiene)',
        reason: 'Recommended for structural food-grade components with moderate stress.'
      },
      {
        grade: 'EN24 Alloy Steel',
        category: 'High-Tensile Strength Steel',
        strength: 'Yield: 680 MPa, Tensile: 850-1000 MPa',
        hardness: '280-320 HB (hardenable to 55 HRC)',
        machinability: 'Low-Medium (35%)',
        corrosion: 'Low (requires oil or plating)',
        reason: 'Recommended for gears, heavy-duty shafts, and highly stressed parts.'
      },
      {
        grade: 'EN8 Carbon Steel',
        category: 'Medium Carbon Steel',
        strength: 'Yield: 460 MPa, Tensile: 650 MPa',
        hardness: '200 HB',
        machinability: 'Excellent (65%)',
        corrosion: 'Low (requires rust treatment)',
        reason: 'Recommended for shafts, hubs, keys, and general machinery frames.'
      },
      {
        grade: 'Aluminium 6061-T6',
        category: 'Structural Light Alloy',
        strength: 'Yield: 276 MPa, Tensile: 310 MPa',
        hardness: '95 HB',
        machinability: 'Outstanding (90%)',
        corrosion: 'Good (anodizes beautifully)',
        reason: 'Recommended for lightweight housings, brackets, and robotic parts.'
      },
      {
        grade: 'Mild Steel C15',
        category: 'Low Carbon Case-Hardening',
        strength: 'Yield: 210 MPa, Tensile: 410 MPa',
        hardness: '120 HB (表面 HRC 60 after carburizing)',
        machinability: 'Outstanding (85%)',
        corrosion: 'Low',
        reason: 'Recommended for case-hardened pins, bushings, and low-cost structural brackets.'
      }
    ];

    // Simple matching matrix based on questionnaire inputs
    return list.filter(mat => {
      let score = 0;
      if (matCorrosion === 'harsh' && !mat.grade.includes('SS')) return false;
      if (matLoad === 'high' && mat.grade.includes('Mild Steel')) return false;
      
      if (matLoad === 'high' && mat.grade.includes('EN24')) score += 3;
      if (matCorrosion === 'harsh' && mat.grade.includes('SS316')) score += 3;
      if (matMachinability === 'critical' && (mat.grade.includes('Aluminium') || mat.grade.includes('C15'))) score += 3;
      if (matHardness === 'high' && (mat.grade.includes('EN24') || mat.grade.includes('C15'))) score += 3;

      return score >= 0;
    });
  }, [matLoad, matCorrosion, matHardness, matMachinability]);

  /* ─── Gear Calculation ─── */
  const gearResult = useMemo(() => {
    const m = Math.max(0.1, gearModule);
    const z = Math.max(4, gearTeeth);
    const pa = 20; // 20 degrees pressure angle
    const paRad = (pa * Math.PI) / 180;

    const d = m * z;
    const addendum = m;
    const dedendum = 1.25 * m;
    const depth = 2.25 * m;
    const tipDia = d + 2 * addendum;
    const rootDia = d - 2 * dedendum;
    const baseDia = d * Math.cos(paRad);
    const pitchVal = Math.PI * m;

    return {
      d,
      addendum,
      dedendum,
      depth,
      tipDia,
      rootDia,
      baseDia,
      pitchVal,
    };
  }, [gearModule, gearTeeth]);

  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      {/* Premium Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-6 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className="p-2 border border-border bg-card text-muted-foreground hover:text-foreground transition-colors hover:border-accent/40"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                Engineering Intelligence
              </p>
            </div>
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] mt-1">
              Technical Workbench
            </h1>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none max-w-full p-1 bg-secondary/30 border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setLocalTab(tab.id)}
              className={`px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase border-r last:border-r-0 border-border/40 transition-all duration-150 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Workspace Area */}
      <main className="grid grid-cols-1 gap-8">
        {/* AI ENGINEERING ASSISTANT */}
        {activeTab === 'assistant' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quick Prompts Panel */}
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="precision" className="w-5 h-5 text-accent" />
                  Preset Prompts
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Click a preset query to consult the local engineering database and RAG reference models.
                </p>
                
                <div className="space-y-3 mt-6">
                  {[
                    "What is the yield strength of EN24?",
                    "Recommend fit for shaft rotating",
                    "Suggest bearing for 25mm shaft",
                    "M12 thread pitch specifications",
                    "DFM internal corners guidelines"
                  ].map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleSendChat(promptText)}
                      disabled={chatLoading}
                      className="w-full text-left p-3 text-[11px] font-mono border border-border hover:border-accent/40 bg-secondary/15 hover:bg-secondary/35 text-foreground transition-all duration-200"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border pt-4 text-[10px] text-muted-foreground/80 space-y-2">
                <span className="font-bold uppercase tracking-wider block">Modular RAG Architecture</span>
                <p className="leading-relaxed">
                  This system maps natural language queries to relational models via a rule-based compiler, simulating vector database lookups.
                </p>
              </div>
            </div>

            {/* Chat Console Panel */}
            <div className="lg:col-span-8 border border-border bg-card flex flex-col min-h-[580px]">
              {/* Terminal Header */}
              <div className="px-6 py-4 border-b border-border/80 bg-secondary/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">PREMA_INTEL_SHELL // ONLINE</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                  RAG V2.1
                </span>
              </div>

              {/* Message Board */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[440px] scrollbar-thin">
                {chatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-2xl p-4 font-mono text-xs leading-relaxed ${
                        chat.sender === 'user'
                          ? 'bg-accent text-accent-foreground border border-accent text-white'
                          : 'bg-black/35 text-foreground border border-border/70'
                      }`}
                    >
                      {chat.sender === 'user' ? (
                        <p>{chat.text}</p>
                      ) : (
                        <div className="space-y-3">
                          {chat.text.split('\n').map((line, lIdx) => {
                            if (line.startsWith('### ')) {
                              return <h4 key={lIdx} className="text-sm font-bold text-accent uppercase tracking-wide mt-2 border-b border-border/40 pb-1">{line.replace('### ', '')}</h4>;
                            }
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <p key={lIdx} className="font-bold text-accent">{line.replace(/\*\*/g, '')}</p>;
                            }
                            if (line.startsWith('*   ') || line.startsWith('-   ')) {
                              return <li key={lIdx} className="ml-4 list-disc text-muted-foreground">{line.replace(/^(\*\s+|\-\s+)/, '')}</li>;
                            }
                            if (line.startsWith('#### ')) {
                              return <h5 key={lIdx} className="text-[11px] font-bold text-foreground uppercase tracking-wider mt-2">{line.replace('#### ', '')}</h5>;
                            }
                            return <p key={lIdx} className="text-muted-foreground">{line}</p>;
                          })}
                        </div>
                      )}
                    </div>

                    {chat.sender === 'assistant' && chat.ragTrace && (
                      <div className="mt-2 w-full max-w-2xl">
                        <button
                          type="button"
                          onClick={() => setActiveRagTraceIndex(activeRagTraceIndex === idx ? null : idx)}
                          className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors bg-transparent border-0 cursor-pointer"
                        >
                          {activeRagTraceIndex === idx ? '[-] Hide RAG Retrieval Details' : '[+] View RAG Retrieval Details & Embeddings'}
                        </button>

                        {activeRagTraceIndex === idx && (
                          <div className="mt-2 p-3 bg-secondary/15 border border-border/80 font-mono text-[9px] text-muted-foreground/90 space-y-2.5">
                            <div className="flex justify-between border-b border-border/40 pb-1.5">
                              <span>Embedding Query:</span>
                              <span className="text-accent italic font-bold">&quot;{chat.ragTrace.vectorQuery}&quot;</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Retrieval Metric:</span>
                              <span>Cosine Distance: <span className="text-emerald-500 font-bold">{chat.ragTrace.cosineDistance}</span></span>
                            </div>
                            <div className="space-y-1.5 mt-2">
                              <span className="font-bold text-foreground block">Reference Sources matched:</span>
                              {chat.ragTrace.sourceDocuments.map((doc: any, dIdx: number) => (
                                <div key={dIdx} className="p-2 bg-black/25 border border-border/40 space-y-1">
                                  <div className="flex justify-between text-[8px] font-bold text-accent">
                                    <span>{doc.title} \ {doc.section}</span>
                                    <span>Ref ID: {doc.standardId}</span>
                                  </div>
                                  <p className="italic text-[8px]">&quot;{doc.contentSnippet}&quot;</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground italic">
                    <span className="h-1.5 w-1.5 bg-accent animate-ping rounded-full" />
                    <span>Resolving compliance models and computing preloads...</span>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat(chatInput);
                }}
                className="p-4 border-t border-border bg-secondary/5 flex gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={chatLoading}
                  placeholder="Ask a technical question (e.g. EN24 yield strength, rotating fit)..."
                  className="flex-1 bg-background border border-border px-4 py-3 text-xs text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-secondary/40 disabled:text-muted-foreground text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200"
                >
                  Query
                </button>
              </form>
            </div>
          </section>
        )}

        {/* FITS CALCULATOR */}
        {activeTab === 'fits' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="measurement" className="w-5 h-5 text-accent" />
                  Fits Parameters
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Lookup hole basis limits for ISO 286-1 combinations.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Nominal Diameter (mm)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="120"
                    step="0.5"
                    value={fitDiameter}
                    onChange={(e) => setFitDiameter(parseFloat(e.target.value) || 20)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Accepts dimensions from 0.5 to 120 mm.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Hole Tolerance Basis
                  </label>
                  <div className="bg-secondary/40 border border-border px-3 py-2 text-xs text-foreground font-mono">
                    H7 (Standard Precision Hole)
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Shaft Class
                  </label>
                  <select
                    value={shaftFitClass}
                    onChange={(e) => setShaftFitClass(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    <option value="f7">f7 (Loose Rotation Fit)</option>
                    <option value="g6">g6 (Precision Slider Fit)</option>
                    <option value="h6">h6 (Locating Fit / Slip)</option>
                    <option value="k6">k6 (Transition / Tap fit)</option>
                    <option value="n6">n6 (Transition / Tight locate)</option>
                    <option value="p6">p6 (Light Interference Press)</option>
                    <option value="s6">s6 (Medium Interference Press)</option>
                    <option value="u6">u6 (Heavy Interference Press)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">ISO Fits Output</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Computed limit deviations and fit type clearance metrics.
                </p>
              </div>

              {/* Fit Type Badge */}
              <div className="flex items-center justify-between p-4 border border-border bg-secondary/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Computed Fit Class</span>
                <span className={`text-xs font-bold font-mono px-3 py-1 uppercase tracking-widest ${
                  fitsResult.fitType === 'Clearance' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                  fitsResult.fitType === 'Interference' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                  'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                  {fitsResult.fitType} Fit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hole specifications */}
                <div className="border border-border p-4 bg-secondary/15 space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent">Hole Limits (H7)</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Nominal size:</span>
                      <span>{fitDiameter.toFixed(3)} mm</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Deviations:</span>
                      <span className="text-emerald-500">+{fitsResult.holeUpper} / {fitsResult.holeLower} µm</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Max limit:</span>
                      <span>{fitsResult.holeMax.toFixed(3)} mm</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Min limit:</span>
                      <span>{fitsResult.holeMin.toFixed(3)} mm</span>
                    </div>
                  </div>
                </div>

                {/* Shaft specifications */}
                <div className="border border-border p-4 bg-secondary/15 space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent">Shaft Limits ({shaftFitClass})</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Nominal size:</span>
                      <span>{fitDiameter.toFixed(3)} mm</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Deviations:</span>
                      <span className={fitsResult.shaftUpper >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                        {fitsResult.shaftUpper >= 0 ? '+' : ''}{fitsResult.shaftUpper} / {fitsResult.shaftLower} µm
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Max limit:</span>
                      <span>{fitsResult.shaftMax.toFixed(3)} mm</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Min limit:</span>
                      <span>{fitsResult.shaftMin.toFixed(3)} mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clearance Details */}
              <div className="border border-border p-4 bg-secondary/5 space-y-3 font-mono text-xs">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Calculated Fit Clearance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Max Clearance</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{fitsResult.maxClearance.toFixed(1)} µm</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Min Clearance</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{fitsResult.minClearance.toFixed(1)} µm</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Max Interference</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{fitsResult.maxInterference.toFixed(1)} µm</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Min Interference</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{fitsResult.minInterference.toFixed(1)} µm</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TOLERANCE CALCULATOR */}
        {activeTab === 'tolerance' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="measurement" className="w-5 h-5 text-accent" />
                  Linear Tolerances
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Compute dimensional bounds per ISO 2768-1.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Linear Dimension (mm)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="1000"
                    step="0.1"
                    value={tolDimension}
                    onChange={(e) => setTolDimension(parseFloat(e.target.value) || 45)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Accepts sizes from 0.5 to 1000 mm.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Tolerance Class
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['fine', 'medium', 'coarse', 'veryCoarse'] as const).map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setTolClass(cls)}
                        className={`py-2 text-[10px] font-bold tracking-wider uppercase border font-mono transition-colors ${
                          tolClass === cls
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                        }`}
                      >
                        {cls === 'veryCoarse' ? 'v. coarse' : cls}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">ISO 2768-1 General Limits</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Standard deviations for linear machining sizes without custom drawing tolerances.
                </p>
              </div>

              {/* Graphic/Stat display */}
              <div className="flex flex-col items-center justify-center p-8 bg-secondary/10 border border-border space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tolerance Limit Range</span>
                <span className="text-3xl font-bold font-mono text-foreground tracking-tight">
                  {tolDimension.toFixed(2)} ± {toleranceResult.deviation.toFixed(2)} mm
                </span>
                <div className="w-full flex items-center justify-between text-xs font-mono max-w-sm pt-4 border-t border-border/50 text-muted-foreground">
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider">Min Material Limit</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{toleranceResult.min.toFixed(2)} mm</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider">Max Material Limit</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{toleranceResult.max.toFixed(2)} mm</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-secondary/5 border border-border text-[11px] text-muted-foreground leading-relaxed flex gap-3">
                <Info className="w-4 h-4 text-accent flex-shrink-0" />
                <p>
                  ISO 2768 simplifies drawing requirements by establishing general tolerance limits. Class <strong>{tolClass}</strong> is typically utilized for {tolClass === 'fine' ? 'precision toolrooms' : tolClass === 'medium' ? 'standard CNC machining' : 'coarse structure fabrications'}.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* THREAD CALCULATOR */}
        {activeTab === 'thread' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="gear-part" className="w-5 h-5 text-accent" />
                  Thread Selector
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Metric coarse thread specifications and installation torque.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Nominal Size
                  </label>
                  <select
                    value={selectedThread}
                    onChange={(e) => setSelectedThread(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    {THREADS_DB.map((t) => (
                      <option key={t.size} value={t.size}>{t.size} × {t.pitch} (Coarse)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Fastener Yield Class (Property Class)
                  </label>
                  <select
                    value={boltGrade}
                    onChange={(e) => setBoltGrade(parseFloat(e.target.value))}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    <option value={8.8}>Property Class 8.8 (Medium Carbon Steel)</option>
                    <option value={10.9}>Property Class 10.9 (Alloy Steel, Quenched)</option>
                    <option value={12.9}>Property Class 12.9 (High-tensile Alloy)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Tightening Friction Condition
                  </label>
                  <select
                    value={tighteningCondition}
                    onChange={(e) => setTighteningCondition(e.target.value as any)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    <option value="lubricated">Lubricated (K = 0.15)</option>
                    <option value="zinc">Zinc Plated (K = 0.18)</option>
                    <option value="dry">Dry Steel-on-Steel (K = 0.20)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">Installation Specs</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Derived guidelines for drilling and tightening preload.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Drill Output */}
                <div className="border border-border p-4 bg-secondary/15 space-y-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Tap Drill size</span>
                  <p className="text-3xl font-bold font-mono">Ø {threadResult.tapDrill.toFixed(1)} mm</p>
                  <p className="text-[10px] text-muted-foreground">Standard drill bit required for thread engagement.</p>
                </div>

                {/* Preload Output */}
                <div className="border border-border p-4 bg-secondary/15 space-y-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Yield Tightening Preload</span>
                  <p className="text-3xl font-bold font-mono">{threadResult.preload.toFixed(1)} kN</p>
                  <p className="text-[10px] text-muted-foreground">Calculated at 75% proof load factor.</p>
                </div>
              </div>

              <div className="p-4 border border-accent/20 bg-accent/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Tightening Torque</span>
                  <h4 className="text-2xl font-bold font-mono text-accent mt-0.5">{threadResult.torque.toFixed(1)} N·m</h4>
                </div>
                <p className="text-[10px] text-muted-foreground/80 max-w-xs text-right">
                  Target assembly torque. Exceeding this value risks thread stripping or fastener failure.
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wide mb-2">Geometric Properties</h4>
                <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Major Dia (d)</span>
                    <span>{threadResult.major.toFixed(3)} mm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Pitch (P)</span>
                    <span>{threadResult.pitch.toFixed(2)} mm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Tensile Area (As)</span>
                    <span>{threadResult.stressArea.toFixed(2)} mm²</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BEARING CALCULATOR */}
        {activeTab === 'bearing' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="machining" className="w-5 h-5 text-accent" />
                  Load & Speed Inputs
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Auto-fill rating capacities from catalogs or input custom values.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Catalog Presets
                  </label>
                  <select
                    value={bearingPreset}
                    onChange={(e) => handleBearingPresetChange(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    <option value="custom">Custom Bearing Profile</option>
                    {BEARINGS_DB.map((b) => (
                      <option key={b.model} value={b.model}>
                        SKF {b.model} (Bore Ø{b.bore} / Outer Ø{b.outer})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Dynamic Load C (kN)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={bearingC}
                      onChange={(e) => setBearingC(parseFloat(e.target.value) || 10.0)}
                      disabled={bearingPreset !== 'custom'}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Static Load C0 (kN)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={bearingC0}
                      onChange={(e) => setBearingC0(parseFloat(e.target.value) || 5.0)}
                      disabled={bearingPreset !== 'custom'}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Radial Load Fr (kN)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={radialLoad}
                      onChange={(e) => setRadialLoad(parseFloat(e.target.value) || 1.0)}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Axial Load Fa (kN)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={axialLoad}
                      onChange={(e) => setAxialLoad(parseFloat(e.target.value) || 0.0)}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Operation Speed (RPM)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20000"
                      value={bearingSpeed}
                      onChange={(e) => setBearingSpeed(parseInt(e.target.value) || 1000)}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Rolling Element
                    </label>
                    <select
                      value={bearingType}
                      onChange={(e) => setBearingType(e.target.value as any)}
                      className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                    >
                      <option value="ball">Ball Bearing (p = 3.0)</option>
                      <option value="roller">Roller Bearing (p = 3.33)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">ISO 281 L10 Bearing Life</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Expected fatigue life limits for the selected dynamic application load.
                </p>
              </div>

              {/* Status Banner */}
              <div className="p-4 border border-border bg-secondary/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Safety Index Status</span>
                <span className={`text-xs font-bold font-mono uppercase tracking-widest ${bearingResult.statusColor}`}>
                  {bearingResult.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* L10 Hours */}
                <div className="border border-border p-4 bg-secondary/15 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">L10h Nominal Life</span>
                  <p className="text-2xl font-bold font-mono text-foreground mt-1">
                    {bearingResult.lifeHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <span className="text-[9px] text-muted-foreground">hours of continuous operation</span>
                </div>

                {/* L10 Revolutions */}
                <div className="border border-border p-4 bg-secondary/15 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">L10 Fatigue Life</span>
                  <p className="text-2xl font-bold font-mono text-foreground mt-1">
                    {bearingResult.lifeRevs.toFixed(2)}
                  </p>
                  <span className="text-[9px] text-muted-foreground">million revolutions</span>
                </div>

                {/* Static Safety */}
                <div className="border border-border p-4 bg-secondary/15 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Static Safety factor (S0)</span>
                  <p className="text-2xl font-bold font-mono text-foreground mt-1">
                    {bearingResult.staticSafety.toFixed(2)}
                  </p>
                  <span className="text-[9px] text-muted-foreground">recommended S0 &gt; 1.5</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Equivalent Dynamic Load (P):</span>
                  <span>{bearingResult.equivalentLoad.toFixed(2)} kN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Catalog Dynamic Rating (C):</span>
                  <span>{bearingC.toFixed(2)} kN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Catalog Static Rating (C0):</span>
                  <span>{bearingC0.toFixed(2)} kN</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SURFACE FINISH */}
        {activeTab === 'surface' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="finishing" className="w-5 h-5 text-accent" />
                  Roughness Intake
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Define desired surface finish to view manufacturing process options.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Target Roughness Ra (µm)
                  </label>
                  <input
                    type="range"
                    min="0.025"
                    max="12.5"
                    step="0.025"
                    value={targetRa}
                    onChange={(e) => setTargetRa(parseFloat(e.target.value))}
                    className="w-full accent-accent bg-secondary"
                  />
                  <div className="flex justify-between text-xs font-mono mt-2">
                    <span>Ra {targetRa.toFixed(3)} µm</span>
                    <span className="text-muted-foreground">{(targetRa * 39.37).toFixed(1)} µinch</span>
                  </div>
                </div>

                <div className="bg-secondary/20 border border-border p-4 space-y-2 text-[11px]">
                  <h4 className="font-bold uppercase text-[9px] text-muted-foreground tracking-wider">Common Presets</h4>
                  <div className="grid grid-cols-3 gap-1">
                    {[0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.3].map((val) => (
                      <button
                        key={val}
                        onClick={() => setTargetRa(val)}
                        className="py-1 border border-border bg-background hover:border-accent text-xs font-mono font-bold text-foreground"
                      >
                        {val} µm
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">Process Achievability Matrix</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  How manufacturing operations correspond to target Ra.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processesListMap()}
              </div>

              <div className="border-t border-border pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Application Suitability</span>
                <p className="text-xs text-foreground/80 font-mono mt-1.5 leading-relaxed bg-secondary/15 p-3 border border-border/50">
                  {surfaceResult.application}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* MATERIAL ASSISTANT */}
        {activeTab === 'material' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="material" className="w-5 h-5 text-accent" />
                  Selection Questionnaire
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Dynamic selection questionnaire to filter steel and alloy materials.
                </p>
              </div>

              <div className="space-y-4">
                {/* Load */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    1. Application Load Type
                  </label>
                  <select
                    value={matLoad}
                    onChange={(e) => setMatLoad(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="low">Low/Static Structural</option>
                    <option value="moderate">Moderate Torsional/Bending</option>
                    <option value="high">High Structural / Gears</option>
                  </select>
                </div>

                {/* Corrosion */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    2. Corrosion Environment
                  </label>
                  <select
                    value={matCorrosion}
                    onChange={(e) => setMatCorrosion(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="mild">Mild (Indoor / Lubricated machinery)</option>
                    <option value="outdoor">Outdoor Atmosphere</option>
                    <option value="harsh">Harsh Chemical / Marine / Washdown</option>
                  </select>
                </div>

                {/* Hardness */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    3. Target Surface Hardness
                  </label>
                  <select
                    value={matHardness}
                    onChange={(e) => setMatHardness(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="none">No specific hardness requirement (ductile)</option>
                    <option value="medium">Medium surface wear (approx. 20-30 HRC)</option>
                    <option value="high">High wear resistance (case hardening &gt; 55 HRC)</option>
                  </select>
                </div>

                {/* Machinability */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    4. Machinability Importance
                  </label>
                  <select
                    value={matMachinability}
                    onChange={(e) => setMatMachinability(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="moderate">Moderate machining needed</option>
                    <option value="critical">Critical (high-speed volume machining / turning)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">Recommended Materials</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Grade matching results from the active selection criteria.
                </p>
              </div>

              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                {recommendedMaterials.map((mat) => (
                  <article key={mat.grade} className="border border-border p-4 bg-secondary/15 hover:border-accent/40 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-accent">{mat.grade}</h4>
                        <span className="text-[9px] text-muted-foreground font-mono block">{mat.category}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-secondary text-foreground">Matched</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3 text-[11px] font-mono border-t border-border/40 pt-2 text-muted-foreground">
                      <div>
                        <span className="text-[9px] block text-foreground/80">Strength:</span>
                        {mat.strength}
                      </div>
                      <div>
                        <span className="text-[9px] block text-foreground/80">Machinability:</span>
                        {mat.machinability}
                      </div>
                      <div>
                        <span className="text-[9px] block text-foreground/80">Corrosion:</span>
                        {mat.corrosion}
                      </div>
                      <div>
                        <span className="text-[9px] block text-foreground/80">Hardness:</span>
                        {mat.hardness}
                      </div>
                    </div>

                    <p className="text-[10px] text-foreground/90 leading-relaxed mt-2.5 pt-2 border-t border-border/20 italic">
                      {mat.reason}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* UNIT CONVERTER */}
        {activeTab === 'unit' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="engineering" className="w-5 h-5 text-accent" />
                  Units Category
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Select a category and input values to convert.
                </p>
              </div>

              <div className="space-y-3">
                {([
                  { id: 'length', label: 'Length / Dimensions' },
                  { id: 'force', label: 'Force / Loads' },
                  { id: 'mass', label: 'Mass / Weight' },
                  { id: 'torque', label: 'Torque / Tightening' },
                  { id: 'temp', label: 'Temperature' },
                ] as const).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleUnitCategoryChange(cat.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider border font-mono transition-colors ${
                      convCategory === cat.id
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">High Precision Conversion</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Enter value, specify inputs, and view calculation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                {/* From value */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Source Input</label>
                  <input
                    type="number"
                    value={convVal}
                    onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
                    className="w-full bg-background border border-border px-4 py-3 text-lg text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                  <select
                    value={convFrom}
                    onChange={(e) => setConvFrom(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    {getUnitOptions(convCategory).map((opt) => (
                      <option key={opt.val} value={opt.val}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* To value */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Output</label>
                  <div className="w-full bg-secondary/15 border border-border px-4 py-3 text-lg font-mono text-accent font-bold h-[50px] flex items-center">
                    {unitResult.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                  </div>
                  <select
                    value={convTo}
                    onChange={(e) => setConvTo(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  >
                    {getUnitOptions(convCategory).map((opt) => (
                      <option key={opt.val} value={opt.val}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground/80 bg-secondary/10 p-3 border border-border/50 text-center font-mono">
                Standard SI conversion factors applied. Output calibrated to 5 decimal places.
              </p>
            </div>
          </section>
        )}

        {/* GEAR CALCULATOR */}
        {activeTab === 'gears' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="gear-part" className="w-5 h-5 text-accent" />
                  Gear Module & Teeth
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Calculate spur gear geometric sizes using standard metric modules.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Module (m)
                  </label>
                  <input
                    type="number"
                    min="0.3"
                    max="20"
                    step="0.1"
                    value={gearModule}
                    onChange={(e) => setGearModule(parseFloat(e.target.value) || 2)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Standard modular system (e.g. 1.0, 1.5, 2.0, 3.0, etc.).
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Number of Teeth (z)
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="200"
                    value={gearTeeth}
                    onChange={(e) => setGearTeeth(parseInt(e.target.value) || 24)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 border border-border bg-card p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase">Computed Geometry</h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Derived dimensions for standard 20-degree pressure angle spur gear.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-center">
                <div className="border border-border p-3 bg-secondary/10">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Pitch Diameter (d)</p>
                  <p className="text-sm font-bold text-foreground mt-1">{gearResult.d.toFixed(2)} mm</p>
                </div>
                <div className="border border-border p-3 bg-secondary/10">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Addendum (ha)</p>
                  <p className="text-sm font-bold text-foreground mt-1">{gearResult.addendum.toFixed(2)} mm</p>
                </div>
                <div className="border border-border p-3 bg-secondary/10">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Dedendum (hf)</p>
                  <p className="text-sm font-bold text-foreground mt-1">{gearResult.dedendum.toFixed(2)} mm</p>
                </div>
                <div className="border border-border p-3 bg-secondary/10">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Circular Pitch (p)</p>
                  <p className="text-sm font-bold text-foreground mt-1">{gearResult.pitchVal.toFixed(2)} mm</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border p-4 bg-secondary/15 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Outer Diameter (Tip Dia - da)</span>
                  <p className="text-lg font-bold font-mono">{gearResult.tipDia.toFixed(2)} mm</p>
                </div>
                <div className="border border-border p-4 bg-secondary/15 space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Base circle Diameter (db)</span>
                  <p className="text-lg font-bold font-mono">{gearResult.baseDia.toFixed(2)} mm</p>
                </div>
              </div>

              {/* Reference Standards Info */}
              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wide mb-2.5">Gear Standards Reference</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[10px] font-mono">
                    <thead>
                      <tr className="border-b border-border/80 text-muted-foreground">
                        <th className="pb-2">Gear Type</th>
                        <th className="pb-2">Key Parameter</th>
                        <th className="pb-2">Pressure Angle</th>
                        <th className="pb-2">Typical Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-foreground/80">
                      <tr>
                        <td className="py-2">Spur Gear</td>
                        <td>Module (m)</td>
                        <td>20° standard</td>
                        <td>Parallel shaft transmission (heavy load/low speed)</td>
                      </tr>
                      <tr>
                        <td className="py-2">Helical Gear</td>
                        <td>Helix Angle (ß) 15-30°</td>
                        <td>20° normal</td>
                        <td>High-speed parallel shafts (quiet/smooth)</td>
                      </tr>
                      <tr>
                        <td className="py-2">Worm & Wheel</td>
                        <td>Lead Angle (y)</td>
                        <td>14.5° or 20°</td>
                        <td>Right-angle speed reduction (self-locking)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ENGINEERING NOTES */}
        {activeTab === 'notes' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-2">
                  <TechnicalIcon type="drawing" className="w-5 h-5 text-accent" />
                  Engineering Standard Guidelines
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Quick references for DFM (Design for Manufacturing) and GD&T compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CNC DFM */}
                <div className="border border-border bg-card p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-border/60 pb-2">CNC Machining DFM</h4>
                  <ul className="space-y-2.5 text-[11px] text-muted-foreground leading-relaxed">
                    <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-accent">
                      <strong className="text-foreground">Internal Corners</strong>: Specify a radius rather than sharp 90-degree corners to allow tool access (minimum tool radius).
                    </li>
                    <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-accent">
                      <strong className="text-foreground">Cavity Depth</strong>: Restrict slot/cavity depths to 4x the tool diameter to prevent tool deflection.
                    </li>
                    <li className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-accent">
                      <strong className="text-foreground">Blind Holes</strong>: Specify an extra depth margin at the bottom of blind hole taps to allow chip collection.
                    </li>
                  </ul>
                </div>

                {/* GD&T Overview */}
                <div className="border border-border bg-card p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-border/60 pb-2">GD&T Symbols Quick Reference</h4>
                  <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-muted-foreground">
                    <div>
                      <span className="text-foreground font-bold">⌖ Position</span>
                      <p className="text-[9px] mt-0.5">Locates center point / hole layout envelope.</p>
                    </div>
                    <div>
                      <span className="text-foreground font-bold">⏏ Flatness</span>
                      <p className="text-[9px] mt-0.5">Controls surface variations relative to a plane.</p>
                    </div>
                    <div>
                      <span className="text-foreground font-bold">⌰ Perpendicularity</span>
                      <p className="text-[9px] mt-0.5">Controls variation of 90-degree angular surfaces.</p>
                    </div>
                    <div>
                      <span className="text-foreground font-bold">◎ Concentricity</span>
                      <p className="text-[9px] mt-0.5">Controls axis alignment of coaxial profiles.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );

  // Helper functions for surface roughness matrix mapping
  function processesListMap() {
    return surfaceResult.processes.map((proc) => {
      let ratingColor = 'text-muted-foreground border-border';
      if (proc.rating === 'Economical') ratingColor = 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5';
      else if (proc.rating === 'Feasible') ratingColor = 'text-amber-500 border-amber-500/30 bg-amber-500/5';

      return (
        <div key={proc.name} className={`p-4 border font-mono text-xs flex items-center justify-between ${ratingColor}`}>
          <div>
            <span className="font-bold block text-foreground">{proc.name}</span>
            <span className="text-[10px] text-muted-foreground/80">Limits: {proc.range}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{proc.rating}</span>
        </div>
      );
    });
  }

  // Get options for selected conversion category
  function getUnitOptions(cat: string) {
    if (cat === 'length') {
      return [
        { val: 'mm', label: 'Millimeters (mm)' },
        { val: 'm', label: 'Meters (m)' },
        { val: 'inch', label: 'Inches (in)' },
        { val: 'ft', label: 'Feet (ft)' },
      ];
    }
    if (cat === 'force') {
      return [
        { val: 'N', label: 'Newtons (N)' },
        { val: 'kN', label: 'Kilonewtons (kN)' },
        { val: 'kgf', label: 'Kilograms Force (kgf)' },
        { val: 'lbf', label: 'Pounds Force (lbf)' },
      ];
    }
    if (cat === 'mass') {
      return [
        { val: 'kg', label: 'Kilograms (kg)' },
        { val: 'g', label: 'Grams (g)' },
        { val: 'lb', label: 'Pounds (lb)' },
        { val: 'oz', label: 'Ounces (oz)' },
      ];
    }
    if (cat === 'torque') {
      return [
        { val: 'Nm', label: 'Newton-meters (N·m)' },
        { val: 'Ncm', label: 'Newton-centimeters (N·cm)' },
        { val: 'lbft', label: 'Foot-pounds (lb·ft)' },
        { val: 'lbin', label: 'Inch-pounds (lb·in)' },
      ];
    }
    return [
      { val: 'C', label: 'Celsius (°C)' },
      { val: 'F', label: 'Fahrenheit (°F)' },
      { val: 'K', label: 'Kelvin (K)' },
    ];
  }
}
