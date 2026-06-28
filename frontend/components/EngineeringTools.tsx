"use client";

import { useState, useMemo } from "react";
import TechnicalIcon from "./TechnicalIcon";
import type { IconType } from "@/types/engineering";
import {
    findBearingsByBore, findBearingByModel, recommendBearing,
    findThreads, getTorqueSpec,
    lookupTolerance,
    findFits,
    getSurfaceFinishRange,
    convertUnit, getUnitOptions,
    getMaterialRecommendations,
    calculateGear, getStandardModules,
    type UnitCategory,
} from "@/lib/engineering-calculators";

/* ─── Tool definitions ─── */
interface ToolDef {
    id: string;
    label: string;
    icon: IconType;
    description: string;
}

const TOOLS: ToolDef[] = [
    { id: "bearing", label: "Bearing Calculator", icon: "rail-part", description: "Find and recommend bearings by bore size or model number" },
    { id: "thread", label: "Thread Calculator", icon: "cad", description: "Metric thread lookup, tap drill sizes, and torque specs" },
    { id: "tolerance", label: "Tolerance Calculator", icon: "precision", description: "ISO tolerance grades IT6/IT7/IT8 lookup by nominal size" },
    { id: "fits", label: "Fits Calculator", icon: "shaft-part", description: "Shaft-hole fit selection: clearance, transition, interference" },
    { id: "surface", label: "Surface Finish", icon: "finishing", description: "Ra value to process mapping with cost factors" },
    { id: "units", label: "Unit Converter", icon: "measurement", description: "Convert engineering units: length, force, pressure, torque, temperature, speed" },
    { id: "material", label: "Material Assistant", icon: "material", description: "Material selection based on strength, corrosion, machinability requirements" },
    { id: "gear", label: "Gear Calculator", icon: "gear-part", description: "Gear geometry: pitch diameter, outside diameter, root diameter" },
    { id: "notes", label: "Engineering Notes", icon: "engineering", description: "Quick reference for machining formulas and DFM guidelines" },
    { id: "lookup", label: "Quick Lookup", icon: "inspection", description: "Fast reference panels for common engineering data" },
];

/* ─── Input Component ─── */
function Input({ label, value, onChange, unit, type = "number", placeholder }: {
    label: string; value: string; onChange: (v: string) => void; unit?: string; type?: string; placeholder?: string;
}) {
    return (
        <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">{label}</label>
            <div className="flex items-center gap-1 border border-white/10 bg-white/[0.02] focus-within:border-white/30 transition-colors">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/20"
                />
                {unit && <span className="pr-3 text-[10px] font-mono text-white/30">{unit}</span>}
            </div>
        </div>
    );
}

/* ─── Select Component ─── */
function Select({ label, value, onChange, options }: {
    label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
    return (
        <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white outline-none appearance-none"
            >
                {options.map((o) => <option key={o} value={o} className="bg-[#0c0c0e]">{o}</option>)}
            </select>
        </div>
    );
}

/* ─── Result Card ─── */
function ResultCard({ children, accent }: { children: React.ReactNode; accent?: string }) {
    return (
        <div className="border border-white/10 bg-white/[0.02] p-4" style={accent ? { borderColor: accent + "40" } : undefined}>
            {children}
        </div>
    );
}

/* ─── Bearing Tool ─── */
function BearingTool() {
    const [bore, setBore] = useState("25");
    const [loadType, setLoadType] = useState<"radial" | "axial" | "combined">("radial");
    const [modelSearch, setModelSearch] = useState("");

    const boreNum = parseFloat(bore) || 0;
    const byBore = useMemo(() => boreNum > 0 ? recommendBearing(boreNum, loadType) : [], [boreNum, loadType]);
    const byModel = useMemo(() => modelSearch ? findBearingByModel(modelSearch) : undefined, [modelSearch]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Shaft Bore Diameter" value={bore} onChange={setBore} unit="mm" />
                <Select label="Load Type" value={loadType} onChange={(v) => setLoadType(v as any)} options={["radial", "axial", "combined"]} />
            </div>
            <Input label="Or Search by Model Number" value={modelSearch} onChange={setModelSearch} type="text" placeholder="e.g. 6205" />

            {byModel && (
                <ResultCard accent="#ef4444">
                    <p className="text-[10px] font-mono text-accent mb-2">MODEL MATCH</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                        <div><span className="text-white/40 text-xs">Type:</span> <span className="text-white">{byModel.type}</span></div>
                        <div><span className="text-white/40 text-xs">Bore:</span> <span className="text-white">{byModel.bore}mm</span></div>
                        <div><span className="text-white/40 text-xs">OD:</span> <span className="text-white">{byModel.od}mm</span></div>
                        <div><span className="text-white/40 text-xs">Width:</span> <span className="text-white">{byModel.width}mm</span></div>
                        <div><span className="text-white/40 text-xs">Dynamic Load:</span> <span className="text-white">{byModel.dynamicLoad} kN</span></div>
                        <div><span className="text-white/40 text-xs">Static Load:</span> <span className="text-white">{byModel.staticLoad} kN</span></div>
                    </div>
                </ResultCard>
            )}

            {byBore.length > 0 && (
                <div className="space-y-2">
                    <p className="text-[10px] font-mono text-white/40">{byBore.length} BEARING(S) FOR {bore}mm BORE — {loadType.toUpperCase()} LOAD</p>
                    {byBore.map((b) => (
                        <ResultCard key={b.modelNumber}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-white font-semibold">{b.modelNumber}</span>
                                    <span className="ml-2 text-xs text-white/40">{b.type}</span>
                                </div>
                                <span className="text-xs font-mono text-white/50">{b.od}×{b.width}mm</span>
                            </div>
                            <div className="mt-1 text-xs text-white/50">
                                C={b.dynamicLoad} kN dynamic · C₀={b.staticLoad} kN static
                            </div>
                        </ResultCard>
                    ))}
                </div>
            )}
            {boreNum > 0 && byBore.length === 0 && !byModel && (
                <p className="text-sm text-white/40">No bearings found for {bore}mm bore. Try common sizes: 10, 12, 15, 17, 20, 25, 30, 35, 40, 45, 50.</p>
            )}
        </div>
    );
}

/* ─── Thread Tool ─── */
function ThreadTool() {
    const [search, setSearch] = useState("M12");
    const [grade, setGrade] = useState("8.8");
    const results = useMemo(() => findThreads(search), [search]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Search Thread" value={search} onChange={setSearch} type="text" placeholder="e.g. M12, M8x1" />
                <Select label="Bolt Grade" value={grade} onChange={setGrade} options={["4.6", "5.8", "8.8", "10.9", "12.9"]} />
            </div>
            {results.length > 0 ? (
                <div className="space-y-2">
                    {results.map((t) => {
                        const torque = getTorqueSpec(t.designation, grade);
                        return (
                            <ResultCard key={t.designation}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white font-semibold">{t.designation}</span>
                                    <span className="text-[10px] font-mono text-white/40">{t.type}</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-white/60">
                                    <div>Pitch: <span className="text-white">{t.pitch}mm</span></div>
                                    <div>Major Ø: <span className="text-white">{t.majorDia}mm</span></div>
                                    <div>Tap Drill: <span className="text-white">{t.tapDrill}mm</span></div>
                                    <div>Torque ({grade}): <span className="text-accent">{torque} Nm</span></div>
                                </div>
                            </ResultCard>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-white/40">{`No threads matching "${search}".`}</p>
            )}
        </div>
    );
}

/* ─── Tolerance Tool ─── */
function ToleranceTool() {
    const [size, setSize] = useState("25");
    const [grade, setGrade] = useState("IT7");
    const result = useMemo(() => lookupTolerance(parseFloat(size) || 0, grade), [size, grade]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Nominal Size" value={size} onChange={setSize} unit="mm" />
                <Select label="IT Grade" value={grade} onChange={setGrade} options={["IT6", "IT7", "IT8"]} />
            </div>
            {result ? (
                <ResultCard accent="#3b82f6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-white/40 text-xs">Size Range:</span><br /><span className="text-white font-semibold">{result.sizeRange}</span></div>
                        <div><span className="text-white/40 text-xs">Tolerance:</span><br /><span className="text-white font-semibold">±{(result.tolerance / 2).toFixed(3)}mm</span></div>
                        <div><span className="text-white/40 text-xs">Upper Deviation:</span><br /><span className="text-white font-semibold">+{result.upperDeviation.toFixed(3)}mm</span></div>
                        <div><span className="text-white/40 text-xs">Lower Deviation:</span><br /><span className="text-white font-semibold">{result.lowerDeviation.toFixed(3)}mm</span></div>
                    </div>
                </ResultCard>
            ) : (
                <p className="text-sm text-white/40">Enter a size between 1–120mm.</p>
            )}
        </div>
    );
}

/* ─── Fits Tool ─── */
function FitsTool() {
    const [filter, setFilter] = useState("");
    const results = useMemo(() => findFits(filter), [filter]);

    return (
        <div className="space-y-4">
            <Input label="Search Fits" value={filter} onChange={setFilter} type="text" placeholder="e.g. H7/g6 or clearance" />
            <div className="space-y-2">
                {results.map((f) => {
                    const color = f.fitType === "Clearance" ? "#22c55e" : f.fitType === "Transition" ? "#f59e0b" : "#ef4444";
                    return (
                        <ResultCard key={f.fitCode} accent={color}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-white font-semibold font-mono">{f.fitCode}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5" style={{ color, borderColor: color + "40", borderWidth: 1 }}>{f.fitType}</span>
                            </div>
                            <p className="text-xs text-white/60 mb-2">{f.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                                <div>Hole: <span className="text-white">{f.holeDeviation}</span></div>
                                <div>Shaft: <span className="text-white">{f.shaftDeviation}</span></div>
                                <div>Min Clearance: <span className="text-white">{f.minClearance.toFixed(3)}mm</span></div>
                                <div>Max Clearance: <span className="text-white">{f.maxClearance.toFixed(3)}mm</span></div>
                            </div>
                        </ResultCard>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── Surface Finish Tool ─── */
function SurfaceFinishTool() {
    const finishes = getSurfaceFinishRange();
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {finishes.map((sf) => (
                    <ResultCard key={sf.ra}>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-white font-semibold font-mono">Ra {sf.ra} µm</span>
                                <span className="ml-3 text-xs text-white/50">{sf.process}</span>
                            </div>
                            <span className="text-xs font-mono text-white/40">{sf.costFactor}x</span>
                        </div>
                        <p className="text-xs text-white/50 mt-1">{sf.typicalUse}</p>
                    </ResultCard>
                ))}
            </div>
        </div>
    );
}

/* ─── Unit Converter Tool ─── */
function UnitConverterTool() {
    const categories: UnitCategory[] = ["length", "force", "pressure", "torque", "temperature", "speed"];
    const [cat, setCat] = useState<UnitCategory>("length");
    const [val, setVal] = useState("100");
    const [from, setFrom] = useState("mm");
    const [to, setTo] = useState("in");

    const options = useMemo(() => getUnitOptions(cat), [cat]);
    const result = useMemo(() => {
        const numVal = parseFloat(val) || 0;
        return convertUnit(numVal, from, to, cat);
    }, [val, from, to, cat]);

    return (
        <div className="space-y-4">
            <Select label="Category" value={cat} onChange={(v) => { setCat(v as UnitCategory); setFrom(getUnitOptions(v as UnitCategory)[0]); setTo(getUnitOptions(v as UnitCategory)[1]); }} options={categories} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <Input label="Value" value={val} onChange={setVal} type="number" />
                <Select label="From" value={from} onChange={setFrom} options={options} />
                <Select label="To" value={to} onChange={setTo} options={options} />
            </div>
            {val && (
                <ResultCard accent="#a855f7">
                    <p className="text-2xl font-bold text-white">
                        {parseFloat(val) || 0} {from} = <span className="text-accent">{result.toFixed(4)}</span> {to}
                    </p>
                </ResultCard>
            )}
        </div>
    );
}

/* ─── Material Assistant Tool ─── */
function MaterialAssistantTool() {
    const [corrosion, setCorrosion] = useState("any");
    const [machinability, setMachinability] = useState("any");
    const results = useMemo(() => getMaterialRecommendations({
        corrosion: corrosion === "any" ? undefined : corrosion as any,
        machinability: machinability === "any" ? undefined : machinability as any,
    }), [corrosion, machinability]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select label="Corrosion Resistance" value={corrosion} onChange={setCorrosion} options={["any", "high"]} />
                <Select label="Machinability" value={machinability} onChange={setMachinability} options={["any", "excellent"]} />
            </div>
            <div className="space-y-2">
                {results.map((m) => (
                    <ResultCard key={m.code}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-semibold">{m.code} — {m.name}</span>
                            <span className="text-[10px] font-mono text-white/40">{m.grade}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-white/50">
                            <div>Strength: <span className="text-white">{m.tensileStrength}</span></div>
                            <div>Hardness: <span className="text-white">{m.hardness}</span></div>
                            <div>Machinability: <span className="text-white">{m.machinability}</span></div>
                            <div>Cost: <span className="text-white">{m.cost}</span></div>
                        </div>
                        <div className="mt-2 text-xs text-white/40">Best for: {m.bestFor.join(", ")}</div>
                    </ResultCard>
                ))}
            </div>
        </div>
    );
}

/* ─── Gear Calculator Tool ─── */
function GearCalculatorTool() {
    const modules = getStandardModules();
    const [mod, setMod] = useState("2.5");
    const [teeth, setTeeth] = useState("40");
    const [pa, setPa] = useState("20");

    const result = useMemo(() => {
        const m = parseFloat(mod) || 1;
        const t = parseInt(teeth) || 20;
        const p = parseFloat(pa) || 20;
        return calculateGear(m, t, p);
    }, [mod, teeth, pa]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Select label="Module (mm)" value={mod} onChange={setMod} options={modules.map(String)} />
                <Input label="Number of Teeth" value={teeth} onChange={setTeeth} />
                <Input label="Pressure Angle" value={pa} onChange={setPa} unit="°" />
            </div>
            <ResultCard accent="#f59e0b">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-white/40 text-xs">Pitch Diameter:</span><br /><span className="text-white font-semibold">{result.pitchDia.toFixed(2)}mm</span></div>
                    <div><span className="text-white/40 text-xs">Outside Diameter:</span><br /><span className="text-white font-semibold">{result.outsideDia.toFixed(2)}mm</span></div>
                    <div><span className="text-white/40 text-xs">Root Diameter:</span><br /><span className="text-white font-semibold">{result.rootDia.toFixed(2)}mm</span></div>
                    <div><span className="text-white/40 text-xs">Circular Pitch:</span><br /><span className="text-white font-semibold">{result.circularPitch.toFixed(3)}mm</span></div>
                    <div><span className="text-white/40 text-xs">Module:</span><br /><span className="text-white font-semibold">{result.module}mm</span></div>
                    <div><span className="text-white/40 text-xs">Teeth:</span><br /><span className="text-white font-semibold">{result.teethCount}</span></div>
                </div>
            </ResultCard>
        </div>
    );
}

/* ─── Engineering Notes Tool ─── */
function EngineeringNotesTool() {
    const notes = [
        { title: "RPM from Surface Speed", formula: "N = (Vc × 1000) / (π × D)", desc: "Vc = cutting speed (m/min), D = diameter (mm)" },
        { title: "Feed Rate", formula: "Vf = f × N", desc: "f = feed per revolution (mm/rev), N = RPM" },
        { title: "Torque", formula: "T = (P × 60) / (2π × N)", desc: "P = power (W), N = RPM" },
        { title: "Power Required", formula: "P = (Fc × Vc) / (60 × 1000)", desc: "Fc = cutting force (N), Vc = surface speed (m/min)" },
        { title: "MRR (Material Removal Rate)", formula: "MRR = D × W × f × N", desc: "D = depth of cut, W = width, f = feed, N = RPM" },
        { title: "Tap Drill Size", formula: "Drill = Major Dia − Pitch", desc: "For standard metric coarse threads" },
    ];

    const dfmRules = [
        "Internal corner radii ≥ 1.15× tool radius",
        "Pocket depth ≤ 4× tool diameter (steel), 6× (aluminum)",
        "Blind hole depth = thread engagement + 3× pitch",
        "Minimum wall thickness: 1.5mm (steel), 0.8mm (aluminum)",
        "Avoid undercuts where possible — they require EDM or special tooling",
    ];

    return (
        <div className="space-y-6">
            <div>
                <p className="text-[10px] font-mono text-accent mb-3">MACHINING FORMULAS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {notes.map((n) => (
                        <ResultCard key={n.title}>
                            <p className="text-xs font-semibold text-white mb-1">{n.title}</p>
                            <p className="text-sm font-mono text-accent">{n.formula}</p>
                            <p className="text-[10px] text-white/40 mt-1">{n.desc}</p>
                        </ResultCard>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-mono text-accent mb-3">DFM GUIDELINES</p>
                <ul className="space-y-1.5">
                    {dfmRules.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-white/60">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{r}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ─── Quick Lookup Tool ─── */
const MATERIAL_DATA = [
    { name: "EN8", hardness: "150–200 HB", tensile: "550–700 MPa", use: "Shafts, pins" },
    { name: "EN19", hardness: "200–250 HB", tensile: "700–850 MPa", use: "Gears, load shafts" },
    { name: "EN24", hardness: "250–300 HB", tensile: "850–1000 MPa", use: "Heavy-duty gears" },
    { name: "SS304", hardness: "150–200 HB", tensile: "500–700 MPa", use: "Food/pharma" },
    { name: "SS316", hardness: "150–200 HB", tensile: "500–700 MPa", use: "Marine, chemical" },
];

const GRADE_DATA = [
    { grade: "4.6", tensile: "400 MPa", yield: "240 MPa", use: "Non-critical" },
    { grade: "8.8", tensile: "800 MPa", yield: "640 MPa", use: "Structural" },
    { grade: "10.9", tensile: "1040 MPa", yield: "940 MPa", use: "High-load" },
    { grade: "12.9", tensile: "1220 MPa", yield: "1100 MPa", use: "Critical" },
];

function QuickLookupTool() {
    const [tab, setTab] = useState<"materials" | "finishes" | "grades">("materials");

    return (
        <div className="space-y-4">
            <div className="flex gap-1 border-b border-white/10">
                {(["materials", "finishes", "grades"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider ${tab === t ? "border-b-2 border-accent text-white" : "text-white/40"}`}>{t}</button>
                ))}
            </div>
            {tab === "materials" && (
                <div className="space-y-1">
                    {MATERIAL_DATA.map((m) => (
                        <ResultCard key={m.name}>
                            <div className="flex justify-between text-xs">
                                <span className="text-white font-semibold">{m.name}</span>
                                <span className="text-white/50">{m.hardness} · {m.tensile}</span>
                            </div>
                            <p className="text-[10px] text-white/40 mt-0.5">{m.use}</p>
                        </ResultCard>
                    ))}
                </div>
            )}
            {tab === "finishes" && (
                <div className="space-y-1">
                    {getSurfaceFinishRange().map((sf) => (
                        <ResultCard key={sf.ra}>
                            <div className="flex justify-between text-xs">
                                <span className="text-white font-mono">Ra {sf.ra} µm</span>
                                <span className="text-white/50">{sf.process}</span>
                            </div>
                        </ResultCard>
                    ))}
                </div>
            )}
            {tab === "grades" && (
                <div className="space-y-1">
                    {GRADE_DATA.map((g) => (
                        <ResultCard key={g.grade}>
                            <div className="flex justify-between text-xs">
                                <span className="text-white font-semibold">Grade {g.grade}</span>
                                <span className="text-white/50">Tensile: {g.tensile} · Yield: {g.yield}</span>
                            </div>
                            <p className="text-[10px] text-white/40 mt-0.5">{g.use}</p>
                        </ResultCard>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Tool Content Router ─── */
function ToolContent({ toolId }: { toolId: string }) {
    switch (toolId) {
        case "bearing": return <BearingTool />;
        case "thread": return <ThreadTool />;
        case "tolerance": return <ToleranceTool />;
        case "fits": return <FitsTool />;
        case "surface": return <SurfaceFinishTool />;
        case "units": return <UnitConverterTool />;
        case "material": return <MaterialAssistantTool />;
        case "gear": return <GearCalculatorTool />;
        case "notes": return <EngineeringNotesTool />;
        case "lookup": return <QuickLookupTool />;
        default: return null;
    }
}

/* ─── Main Component ─── */
export default function EngineeringTools() {
    const [activeTool, setActiveTool] = useState(TOOLS[0].id);
    const currentTool = TOOLS.find((t) => t.id === activeTool)!;

    return (
        <section className="w-full">
            {/* Hero */}
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Engineering Intelligence Tools
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/50 max-w-2xl">
                    Interactive calculators and reference tools for precision manufacturing — bearing selection, thread specs, tolerance lookups, fits, surface finish, unit conversion, material selection, and gear geometry.
                </p>
            </div>

            {/* Tool Grid + Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* Tool Selector — Left Panel */}
                <div className="lg:col-span-4 space-y-1">
                    {TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`w-full text-left flex items-center gap-3 p-3 transition-all ${activeTool === tool.id
                                    ? "border border-white/20 bg-white/[0.06]"
                                    : "border border-transparent hover:bg-white/[0.03]"
                                }`}
                        >
                            <TechnicalIcon type={tool.icon} className="w-5 h-5 shrink-0 text-white/50" />
                            <div className="min-w-0">
                                <p className={`text-sm font-semibold ${activeTool === tool.id ? "text-white" : "text-white/70"}`}>{tool.label}</p>
                                <p className="text-[10px] text-white/40 truncate">{tool.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Tool Content — Right Panel */}
                <div className="lg:col-span-8 border border-white/10 bg-white/[0.01] p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TechnicalIcon type={currentTool.icon} className="w-5 h-5 text-accent" />
                        <h2 className="text-lg font-bold text-white">{currentTool.label}</h2>
                    </div>
                    <p className="text-xs text-white/50 mb-4">{currentTool.description}</p>
                    <ToolContent toolId={activeTool} />
                </div>
            </div>
        </section>
    );
}