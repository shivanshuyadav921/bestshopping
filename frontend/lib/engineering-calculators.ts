export type UnitCategory = "length" | "force" | "pressure" | "torque" | "temperature" | "speed";

// ─── BEARING CALCULATOR DATA & LOGIC ───

export interface Bearing {
  modelNumber: string;
  type: string;
  bore: number;
  od: number;
  width: number;
  dynamicLoad: number; // in kN
  staticLoad: number;  // in kN
  loadCapabilities: ("radial" | "axial" | "combined")[];
}

const BEARINGS_DB: Bearing[] = [
  { modelNumber: "6200", type: "Deep Groove Ball Bearing", bore: 10, od: 30, width: 9, dynamicLoad: 5.4, staticLoad: 2.39, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6201", type: "Deep Groove Ball Bearing", bore: 12, od: 32, width: 10, dynamicLoad: 7.28, staticLoad: 3.1, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6202", type: "Deep Groove Ball Bearing", bore: 15, od: 35, width: 11, dynamicLoad: 8.06, staticLoad: 3.75, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6203", type: "Deep Groove Ball Bearing", bore: 17, od: 40, width: 12, dynamicLoad: 9.95, staticLoad: 4.75, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6204", type: "Deep Groove Ball Bearing", bore: 20, od: 47, width: 14, dynamicLoad: 13.5, staticLoad: 6.55, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6205", type: "Deep Groove Ball Bearing", bore: 25, od: 52, width: 15, dynamicLoad: 14.8, staticLoad: 7.8, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6206", type: "Deep Groove Ball Bearing", bore: 30, od: 62, width: 16, dynamicLoad: 20.3, staticLoad: 11.2, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6207", type: "Deep Groove Ball Bearing", bore: 35, od: 72, width: 17, dynamicLoad: 27.0, staticLoad: 15.3, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6208", type: "Deep Groove Ball Bearing", bore: 40, od: 80, width: 18, dynamicLoad: 32.5, staticLoad: 19.0, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6209", type: "Deep Groove Ball Bearing", bore: 45, od: 85, width: 19, dynamicLoad: 35.1, staticLoad: 21.6, loadCapabilities: ["radial", "combined"] },
  { modelNumber: "6210", type: "Deep Groove Ball Bearing", bore: 50, od: 90, width: 20, dynamicLoad: 37.1, staticLoad: 23.2, loadCapabilities: ["radial", "combined"] },
  
  { modelNumber: "30205", type: "Tapered Roller Bearing", bore: 25, od: 52, width: 16.25, dynamicLoad: 32.5, staticLoad: 34.0, loadCapabilities: ["radial", "axial", "combined"] },
  { modelNumber: "30206", type: "Tapered Roller Bearing", bore: 30, od: 62, width: 17.25, dynamicLoad: 43.5, staticLoad: 45.0, loadCapabilities: ["radial", "axial", "combined"] },
  { modelNumber: "30207", type: "Tapered Roller Bearing", bore: 35, od: 72, width: 18.25, dynamicLoad: 56.1, staticLoad: 57.0, loadCapabilities: ["radial", "axial", "combined"] },
  
  { modelNumber: "51105", type: "Thrust Ball Bearing", bore: 25, od: 47, width: 15, dynamicLoad: 27.0, staticLoad: 39.0, loadCapabilities: ["axial"] },
  { modelNumber: "51106", type: "Thrust Ball Bearing", bore: 30, od: 52, width: 16, dynamicLoad: 28.1, staticLoad: 43.0, loadCapabilities: ["axial"] }
];

export function findBearingsByBore(bore: number): Bearing[] {
  return BEARINGS_DB.filter(b => b.bore === bore);
}

export function findBearingByModel(model: string): Bearing | undefined {
  const normModel = model.trim().toUpperCase();
  return BEARINGS_DB.find(b => b.modelNumber.toUpperCase() === normModel || b.modelNumber.includes(normModel));
}

export function recommendBearing(bore: number, loadType: "radial" | "axial" | "combined"): Bearing[] {
  return BEARINGS_DB.filter(b => b.bore === bore && b.loadCapabilities.includes(loadType));
}

// ─── THREAD CALCULATOR DATA & LOGIC ───

export interface Thread {
  designation: string;
  type: string;
  pitch: number;
  majorDia: number;
  tapDrill: number;
}

const THREADS_DB: Thread[] = [
  { designation: "M3", type: "Metric Coarse", pitch: 0.5, majorDia: 3.0, tapDrill: 2.5 },
  { designation: "M4", type: "Metric Coarse", pitch: 0.7, majorDia: 4.0, tapDrill: 3.3 },
  { designation: "M5", type: "Metric Coarse", pitch: 0.8, majorDia: 5.0, tapDrill: 4.2 },
  { designation: "M6", type: "Metric Coarse", pitch: 1.0, majorDia: 6.0, tapDrill: 5.0 },
  { designation: "M8", type: "Metric Coarse", pitch: 1.25, majorDia: 8.0, tapDrill: 6.8 },
  { designation: "M8x1", type: "Metric Fine", pitch: 1.0, majorDia: 8.0, tapDrill: 7.0 },
  { designation: "M10", type: "Metric Coarse", pitch: 1.5, majorDia: 10.0, tapDrill: 8.5 },
  { designation: "M10x1.25", type: "Metric Fine", pitch: 1.25, majorDia: 10.0, tapDrill: 8.8 },
  { designation: "M12", type: "Metric Coarse", pitch: 1.75, majorDia: 12.0, tapDrill: 10.2 },
  { designation: "M12x1.25", type: "Metric Fine", pitch: 1.25, majorDia: 12.0, tapDrill: 10.8 },
  { designation: "M12x1.5", type: "Metric Fine", pitch: 1.5, majorDia: 12.0, tapDrill: 10.5 },
  { designation: "M16", type: "Metric Coarse", pitch: 2.0, majorDia: 16.0, tapDrill: 14.0 },
  { designation: "M20", type: "Metric Coarse", pitch: 2.5, majorDia: 20.0, tapDrill: 17.5 }
];

export function findThreads(search: string): Thread[] {
  const query = search.trim().toLowerCase();
  if (!query) return [];
  return THREADS_DB.filter(t => t.designation.toLowerCase().includes(query));
}

// Approximate tightening torque spec calculation: T = K * D * F
// where F is preload (based on proof load of bolt class)
// Torque Spec = Pitch/geometry factors. We will output pre-calculated torque values in Nm
export function getTorqueSpec(designation: string, grade: string): number {
  const thread = THREADS_DB.find(t => t.designation.toLowerCase() === designation.toLowerCase());
  if (!thread) return 0;
  
  const d = thread.majorDia;
  
  // Base torque coefficient factor based on bolt grade
  let gradeFactor = 1.0;
  switch (grade) {
    case "4.6": gradeFactor = 0.35; break;
    case "5.8": gradeFactor = 0.55; break;
    case "8.8": gradeFactor = 1.0; break;
    case "10.9": gradeFactor = 1.4; break;
    case "12.9": gradeFactor = 1.7; break;
  }
  
  // Approximate standard dry assembly torque in Nm for grade 8.8
  const baseTorqueMap: Record<string, number> = {
    "M3": 1.2,
    "M4": 2.9,
    "M5": 5.7,
    "M6": 9.8,
    "M8": 24,
    "M8x1": 26,
    "M10": 47,
    "M10x1.25": 51,
    "M12": 81,
    "M12x1.25": 89,
    "M12x1.5": 85,
    "M16": 197,
    "M20": 385
  };
  
  const baseTorque = baseTorqueMap[thread.designation] || (0.17 * d * d); // Fallback estimate
  return Math.round(baseTorque * gradeFactor * 10) / 10;
}

// ─── ISO TOLERANCE GRADE LOOKUP ───

export interface ToleranceResult {
  sizeRange: string;
  tolerance: number; // total tolerance in mm
  upperDeviation: number; // in mm
  lowerDeviation: number; // in mm
}

export function lookupTolerance(size: number, grade: string): ToleranceResult | undefined {
  if (size <= 0 || size > 120) return undefined;
  
  let sizeRange = "";
  let baseIT6 = 0.009; // IT6 standard values in mm
  let baseIT7 = 0.013; // IT7 standard values in mm
  let baseIT8 = 0.022; // IT8 standard values in mm
  
  if (size <= 3) {
    sizeRange = "0–3mm";
    baseIT6 = 0.006; baseIT7 = 0.010; baseIT8 = 0.014;
  } else if (size <= 6) {
    sizeRange = "3–6mm";
    baseIT6 = 0.008; baseIT7 = 0.012; baseIT8 = 0.018;
  } else if (size <= 10) {
    sizeRange = "6–10mm";
    baseIT6 = 0.009; baseIT7 = 0.015; baseIT8 = 0.022;
  } else if (size <= 18) {
    sizeRange = "10–18mm";
    baseIT6 = 0.011; baseIT7 = 0.018; baseIT8 = 0.027;
  } else if (size <= 30) {
    sizeRange = "18–30mm";
    baseIT6 = 0.013; baseIT7 = 0.021; baseIT8 = 0.033;
  } else if (size <= 50) {
    sizeRange = "30–50mm";
    baseIT6 = 0.016; baseIT7 = 0.025; baseIT8 = 0.039;
  } else if (size <= 80) {
    sizeRange = "50–80mm";
    baseIT6 = 0.019; baseIT7 = 0.030; baseIT8 = 0.046;
  } else {
    sizeRange = "80–120mm";
    baseIT6 = 0.022; baseIT7 = 0.035; baseIT8 = 0.054;
  }
  
  let tolerance = baseIT7;
  if (grade === "IT6") tolerance = baseIT6;
  if (grade === "IT8") tolerance = baseIT8;
  
  // Symmetrical IT tolerance block
  return {
    sizeRange,
    tolerance,
    upperDeviation: tolerance / 2,
    lowerDeviation: -(tolerance / 2)
  };
}

// ─── FITS CALCULATOR ───

export interface Fit {
  fitCode: string;
  fitType: "Clearance" | "Transition" | "Interference";
  description: string;
  holeDeviation: string;
  shaftDeviation: string;
  minClearance: number; // in mm
  maxClearance: number; // in mm
}

const FITS_DB: Fit[] = [
  { fitCode: "H7/g6", fitType: "Clearance", description: "Precision running fit. Free-running gear hubs, machine tool spindles, slide fits.", holeDeviation: "0 / +0.021", shaftDeviation: "-0.007 / -0.020", minClearance: 0.007, maxClearance: 0.041 },
  { fitCode: "H7/h6", fitType: "Clearance", description: "Standard locating clearance fit. Precision guided shafts, spacers, locating pins.", holeDeviation: "0 / +0.021", shaftDeviation: "0 / -0.013", minClearance: 0.000, maxClearance: 0.034 },
  { fitCode: "H7/f7", fitType: "Clearance", description: "Close running fit. Bearings in pumps, internal combustion engines, gearboxes.", holeDeviation: "0 / +0.021", shaftDeviation: "-0.016 / -0.034", minClearance: 0.016, maxClearance: 0.055 },
  { fitCode: "H7/js6", fitType: "Transition", description: "Symmetric locating transition fit. High locating accuracy. Easily assembled with mallet.", holeDeviation: "0 / +0.021", shaftDeviation: "+0.006 / -0.006", minClearance: -0.006, maxClearance: 0.027 },
  { fitCode: "H7/n6", fitType: "Transition", description: "Tight transition fit. Tight locating precision, assembly requires arbor press.", holeDeviation: "0 / +0.021", shaftDeviation: "+0.015 / +0.002", minClearance: -0.015, maxClearance: 0.019 },
  { fitCode: "H7/p6", fitType: "Interference", description: "Medium press fit. Standard interference. Gears and bearings on shafts, requires heavy press.", holeDeviation: "0 / +0.021", shaftDeviation: "+0.022 / +0.009", minClearance: -0.022, maxClearance: 0.012 },
  { fitCode: "H7/s6", fitType: "Interference", description: "Heavy press fit. Highly permanent assembly. Steel collar hubs, permanent shafts.", holeDeviation: "0 / +0.021", shaftDeviation: "+0.035 / +0.022", minClearance: -0.035, maxClearance: -0.001 }
];

export function findFits(filter: string): Fit[] {
  const term = filter.trim().toLowerCase();
  if (!term) return FITS_DB;
  return FITS_DB.filter(f => 
    f.fitCode.toLowerCase().includes(term) || 
    f.fitType.toLowerCase().includes(term) || 
    f.description.toLowerCase().includes(term)
  );
}

// ─── SURFACE FINISH RANGE ───

export interface SurfaceFinish {
  ra: number; // in micrometers (µm)
  process: string;
  costFactor: number; // comparative factor multiplier (e.g. 1.0, 2.5)
  typicalUse: string;
}

export function getSurfaceFinishRange(): SurfaceFinish[] {
  return [
    { ra: 12.5, process: "Sawing / Heavy Milling", costFactor: 1.0, typicalUse: "Non-matching clearance plates, structural frames." },
    { ra: 6.3, process: "Standard Turning / Milling", costFactor: 1.2, typicalUse: "Bolting flange surfaces, generic mating faces." },
    { ra: 3.2, process: "Fine Milling / Turning", costFactor: 1.6, typicalUse: "Gear housing seals, standard shafts, keys and keyways." },
    { ra: 1.6, process: "Precision Turning / Smooth Mill", costFactor: 2.2, typicalUse: "Journal bearings, general sliding surfaces." },
    { ra: 0.8, process: "Cylindrical Grinding", costFactor: 3.5, typicalUse: "High-speed shaft journals, standard rolling bearing bores." },
    { ra: 0.4, process: "Fine Grinding / Lapping", costFactor: 5.0, typicalUse: "Aerospace hydraulics, mirror-polished rotor shafts." },
    { ra: 0.2, process: "Superfinishing / Honing", costFactor: 8.0, typicalUse: "Ultra-high-speed spindles, fuel injectors, metrology pins." }
  ];
}

// ─── UNIT CONVERTER DATA & LOGIC ───

const CONVERSIONS: Record<UnitCategory, Record<string, number>> = {
  length: {
    mm: 1.0,
    in: 25.4,
    m: 1000.0,
    cm: 10.0
  },
  force: {
    N: 1.0,
    kN: 1000.0,
    lbf: 4.44822
  },
  pressure: {
    bar: 1.0,
    MPa: 10.0,
    psi: 0.0689476,
    Pa: 0.00001
  },
  torque: {
    "Nm": 1.0,
    "ft-lb": 1.355818,
    "in-lb": 0.1129848
  },
  temperature: {
    C: 1.0,
    F: 1.0, // Special conversion logic
    K: 1.0
  },
  speed: {
    "m/s": 1.0,
    "mm/min": 1 / 60000,
    "in/s": 0.0254,
    "m/min": 1 / 60
  }
};

export function getUnitOptions(category: UnitCategory): string[] {
  return Object.keys(CONVERSIONS[category]);
}

export function convertUnit(value: number, from: string, to: string, category: UnitCategory): number {
  if (from === to) return value;
  
  if (category === "temperature") {
    let celsiusVal = value;
    if (from === "F") celsiusVal = (value - 32) * (5 / 9);
    else if (from === "K") celsiusVal = value - 273.15;
    
    if (to === "C") return celsiusVal;
    if (to === "F") return celsiusVal * (9 / 5) + 32;
    if (to === "K") return celsiusVal + 273.15;
    return value;
  }
  
  const factors = CONVERSIONS[category];
  const valueInBase = value * factors[from];
  return valueInBase / factors[to];
}

// ─── MATERIAL RECOMMENDATIONS ───

export interface Material {
  code: string;
  name: string;
  grade: string;
  tensileStrength: string;
  hardness: string;
  machinability: string;
  cost: string;
  bestFor: string[];
  properties: {
    corrosion: "standard" | "high";
    machinability: "good" | "excellent";
  };
}

const MATERIALS_DB: Material[] = [
  { code: "EN8", name: "Medium Carbon Steel", grade: "080M40", tensileStrength: "550–700 MPa", hardness: "150–200 HB", machinability: "Good", cost: "Low", bestFor: ["Generial shafts", "Pins", "Keyways", "Structural brackets"], properties: { corrosion: "standard", machinability: "good" } },
  { code: "EN19", name: "Alloy Steel (Chrome-Moly)", grade: "709M40 / 4140", tensileStrength: "700–850 MPa", hardness: "200–250 HB", machinability: "Fair", cost: "Medium", bestFor: ["Gears", "Load-bearing axles", "Engine crankshafts"], properties: { corrosion: "standard", machinability: "good" } },
  { code: "EN24", name: "High Tensile Alloy Steel", grade: "817M40 / 4340", tensileStrength: "850–1000 MPa", hardness: "250–300 HB", machinability: "Moderate", cost: "High", bestFor: ["Heavy-duty gears", "Turbine shafts", "High-stress drill rods"], properties: { corrosion: "standard", machinability: "good" } },
  { code: "SS304", name: "Austenitic Stainless Steel", grade: "1.4301", tensileStrength: "500–700 MPa", hardness: "150–200 HB", machinability: "Fair", cost: "Medium", bestFor: ["Food-processing components", "Chemical valve bodies", "Kitchen hardware"], properties: { corrosion: "high", machinability: "good" } },
  { code: "SS316", name: "Marine-Grade Stainless Steel", grade: "1.4401", tensileStrength: "500–700 MPa", hardness: "150–200 HB", machinability: "Fair", cost: "High", bestFor: ["Marine shafts", "Chemical piping flanges", "Pharma implants"], properties: { corrosion: "high", machinability: "good" } },
  { code: "AL6082", name: "Structural Aluminum Alloy", grade: "6082-T6", tensileStrength: "290–310 MPa", hardness: "90–95 HB", machinability: "Excellent", cost: "Low", bestFor: ["High-speed indexing plates", "Lightweight machine brackets", "Sensor housings"], properties: { corrosion: "high", machinability: "excellent" } },
  { code: "Brass", name: "Free-Cutting Brass", grade: "CZ121 / C360", tensileStrength: "350–400 MPa", hardness: "110–130 HB", machinability: "Excellent", cost: "Medium", bestFor: ["Threaded nuts", "Bushings", "Pneumatic fittings", "Lock barrels"], properties: { corrosion: "high", machinability: "excellent" } }
];

export function getMaterialRecommendations(filters: { corrosion?: "high"; machinability?: "excellent" }): Material[] {
  return MATERIALS_DB.filter(m => {
    if (filters.corrosion === "high" && m.properties.corrosion !== "high") return false;
    if (filters.machinability === "excellent" && m.properties.machinability !== "excellent") return false;
    return true;
  });
}

// ─── GEAR GEOMETRY CALCULATOR ───

export interface GearParameters {
  pitchDia: number;      // in mm
  outsideDia: number;    // in mm
  rootDia: number;       // in mm
  circularPitch: number; // in mm
  module: number;
  teethCount: number;
}

export function getStandardModules(): number[] {
  return [0.5, 0.8, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0];
}

export function calculateGear(module: number, teeth: number, pressureAngle: number): GearParameters {
  const pitchDia = module * teeth;
  const outsideDia = pitchDia + (2 * module);
  const rootDia = pitchDia - (2.5 * module);
  const circularPitch = Math.PI * module;
  
  return {
    pitchDia,
    outsideDia,
    rootDia,
    circularPitch,
    module,
    teethCount: teeth
  };
}
