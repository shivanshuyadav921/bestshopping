"use client";

import { useState } from "react";
import {
    MACHINES,
    ACQUISITION_TIMELINE,
    CATEGORY_LABELS,
    CATEGORY_ICONS,
    type Machine,
} from "@/types/machines";

const CATEGORIES = ["ALL", "CNC_MILLING", "CNC_TURNING", "EDM", "INSPECTION"] as const;

/* ─── Spec Badge ─── */
function SpecBadge({ label, value, unit }: { label: string; value: string; unit?: string }) {
    return (
        <div className="flex flex-col border border-white/10 bg-white/[0.02] px-3 py-2 sm:px-4 sm:py-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">{label}</span>
            <span className="mt-1 text-sm sm:text-base font-semibold text-white">
                {value}
                {unit ? <span className="ml-1 text-xs text-white/50">{unit}</span> : null}
            </span>
        </div>
    );
}

/* ─── Machine Card ─── */
function MachineCard({
    machine,
    onSelect,
    isActive,
}: {
    machine: Machine;
    onSelect: (m: Machine) => void;
    isActive: boolean;
}) {
    return (
        <button
            onClick={() => onSelect(machine)}
            className={`w-full text-left border p-4 sm:p-5 transition-all duration-300 group ${isActive
                    ? "border-white/30 bg-white/[0.06]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span
                            className="inline-block w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: machine.color }}
                        />
                        <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                            {machine.brand} · {CATEGORY_LABELS[machine.category]}
                        </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{machine.name}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/50 line-clamp-2">{machine.tagline}</p>
                </div>
                <span className="text-[10px] font-mono text-white/30 shrink-0 mt-1">{machine.yearAcquired}</span>
            </div>
        </button>
    );
}

/* ─── Machine Detail Panel ─── */
function MachineDetail({ machine }: { machine: Machine }) {
    const [tab, setTab] = useState<"specs" | "features" | "applications">("specs");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: machine.color }}
                    />
                    <span className="text-xs font-mono tracking-wider text-white/40 uppercase">
                        {CATEGORY_ICONS[machine.category]} {CATEGORY_LABELS[machine.category]} · Acquired {machine.yearAcquired}
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{machine.name}</h2>
                <p className="mt-1 text-sm text-white/60">{machine.model}</p>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{machine.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-white/10 bg-white/[0.02] p-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Accuracy</span>
                    <p className="mt-1 text-sm font-semibold text-white">{machine.accuracy}</p>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Capacity</span>
                    <p className="mt-1 text-sm font-semibold text-white">{machine.capacity}</p>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Travel Range</span>
                    <p className="mt-1 text-sm font-semibold text-white">{machine.travelRange}</p>
                </div>
            </div>

            {/* SVG Machine Animation */}
            <div className="relative border border-white/10 bg-black/30 aspect-[2/1] sm:aspect-video flex items-center justify-center overflow-hidden">
                <MachineAnimation machine={machine} />
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-white/30">
                    LIVE SIMULATION
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono tracking-wider text-white/30">
                    {machine.brand.toUpperCase()} {machine.model}
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 border-b border-white/10">
                {(["specs", "features", "applications"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${tab === t
                                ? "border-b-2 text-white"
                                : "text-white/40 hover:text-white/60"
                            }`}
                        style={tab === t ? { borderColor: machine.color, color: machine.color } : undefined}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {tab === "specs" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {machine.specs.map((spec) => (
                        <SpecBadge key={spec.label} label={spec.label} value={spec.value} unit={spec.unit} />
                    ))}
                </div>
            )}

            {tab === "features" && (
                <ul className="space-y-2">
                    {machine.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: machine.color }} />
                            {f}
                        </li>
                    ))}
                </ul>
            )}

            {tab === "applications" && (
                <ul className="space-y-2">
                    {machine.applications.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-white/30" />
                            {a}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ─── SVG Machine Animation ─── */
function MachineAnimation({ machine }: { machine: Machine }) {
    if (machine.category === "CNC_MILLING") return <MillingAnimation color={machine.color} />;
    if (machine.category === "CNC_TURNING") return <TurningAnimation color={machine.color} />;
    if (machine.category === "EDM") return <EDMAnimation color={machine.color} />;
    return <InspectionAnimation color={machine.color} />;
}

function MillingAnimation({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md opacity-60">
            {/* Spindle */}
            <rect x="180" y="10" width="40" height="60" fill={color} opacity="0.3" rx="2" />
            <rect x="190" y="70" width="20" height="40" fill={color} opacity="0.5" rx="1" />
            <line x1="200" y1="110" x2="200" y2="140" stroke={color} strokeWidth="3" />
            {/* Tool */}
            <polygon points="195,140 205,140 200,160" fill={color} opacity="0.7">
                <animate attributeName="points" values="195,140 205,140 200,160;196,138 204,138 200,158;195,140 205,140 200,160" dur="0.3s" repeatCount="indefinite" />
            </polygon>
            {/* Table */}
            <rect x="60" y="165" width="280" height="8" fill="white" opacity="0.15" rx="1" />
            {/* Part */}
            <rect x="150" y="145" width="100" height="20" fill={color} opacity="0.15" rx="2" />
            {/* Axis arrows */}
            <text x="80" y="190" fill="white" opacity="0.2" fontSize="8" fontFamily="monospace">X</text>
            <text x="350" y="190" fill="white" opacity="0.2" fontSize="8" fontFamily="monospace">Y</text>
            {/* Coolant particles */}
            {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} r="1.5" fill={color} opacity="0.4">
                    <animate attributeName="cx" values={`${195 + i * 3};${190 + i * 5};${195 + i * 3}`} dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values="130;160;130" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
    );
}

function TurningAnimation({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md opacity-60">
            {/* Chuck */}
            <circle cx="100" cy="100" r="40" fill="none" stroke={color} strokeWidth="2" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="30" fill={color} opacity="0.1">
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Spindle lines */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
                <line
                    key={angle}
                    x1="100"
                    y1="100"
                    x2={100 + 28 * Math.cos((angle * Math.PI) / 180)}
                    y2={100 + 28 * Math.sin((angle * Math.PI) / 180)}
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.4"
                >
                    <animateTransform attributeName="transform" type="rotate" from={`0 100 100`} to={`360 100 100`} dur="2s" repeatCount="indefinite" />
                </line>
            ))}
            {/* Workpiece */}
            <rect x="130" y="85" width="120" height="30" fill={color} opacity="0.15" rx="3" />
            {/* Tool holder */}
            <rect x="260" y="70" width="8" height="60" fill="white" opacity="0.15" rx="1" />
            <polygon points="258,95 268,95 263,85" fill={color} opacity="0.5" />
            {/* Chips */}
            {[0, 1, 2].map((i) => (
                <circle key={i} r="1" fill={color} opacity="0.3">
                    <animate attributeName="cx" values="260;280;290" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values="90;80;95" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
            ))}
            <text x="300" y="190" fill="white" opacity="0.2" fontSize="8" fontFamily="monospace">Z →</text>
        </svg>
    );
}

function EDMAnimation({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md opacity-60">
            {/* Wire */}
            <line x1="200" y1="10" x2="200" y2="190" stroke={color} strokeWidth="1" opacity="0.5" />
            {/* Sparks */}
            {/* Pre-computed random values for spark animation stability */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const sparkOffsets = [
                    { x1: 0.5, x2: 2.1 },
                    { x1: 3.2, x2: 0.8 },
                    { x1: 1.7, x2: 3.5 },
                    { x1: 2.9, x2: 1.2 },
                    { x1: 0.3, x2: 4.1 },
                    { x1: 3.8, x2: 0.4 },
                    { x1: 1.1, x2: 2.8 },
                    { x1: 2.5, x2: 1.9 },
                ];
                const offset = sparkOffsets[i];
                return (
                    <circle key={i} r="2" fill={color} opacity="0">
                    <animate attributeName="cx" values={`${198 + offset.x1};${195 + offset.x2};${200}`} dur="0.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values="100;95;100" dur="0.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="0.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                </circle>
                );
            })}
            {/* Workpiece */}
            <rect x="150" y="70" width="100" height="60" fill="white" opacity="0.08" rx="2" />
            <rect x="150" y="70" width="50" height="60" fill={color} opacity="0.12" rx="2">
                <animate attributeName="width" values="50;48;50" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* Sparks glow */}
            <circle cx="200" cy="100" r="8" fill={color} opacity="0.1">
                <animate attributeName="r" values="6;10;6" dur="0.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.2;0.1" dur="0.3s" repeatCount="indefinite" />
            </circle>
            <text x="30" y="195" fill="white" opacity="0.2" fontSize="8" fontFamily="monospace">WIRE EDM</text>
        </svg>
    );
}

function InspectionAnimation({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md opacity-60">
            {/* CMM Column */}
            <rect x="180" y="10" width="15" height="100" fill="white" opacity="0.1" rx="2" />
            {/* Probe arm */}
            <rect x="195" y="60" width="80" height="6" fill="white" opacity="0.1" rx="1" />
            {/* Probe */}
            <line x1="275" y1="63" x2="275" y2="100" stroke={color} strokeWidth="2" opacity="0.5" />
            <circle cx="275" cy="103" r="3" fill={color} opacity="0.7">
                <animate attributeName="cy" values="103;100;103" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Part on table */}
            <rect x="220" y="110" width="110" height="35" fill={color} opacity="0.1" rx="2" />
            {/* Measurement points */}
            {[240, 260, 280, 300].map((x) => (
                <circle key={x} cx={x} cy="115" r="1.5" fill={color} opacity="0.5">
                    <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin={`${(x - 240) * 0.1}s`} repeatCount="indefinite" />
                </circle>
            ))}
            {/* Table */}
            <rect x="100" y="155" width="250" height="6" fill="white" opacity="0.1" rx="1" />
            {/* Grid lines */}
            {[120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320].map((x) => (
                <line key={x} x1={x} y1="160" x2={x} y2="190" stroke="white" strokeWidth="0.5" opacity="0.05" />
            ))}
            <text x="30" y="195" fill="white" opacity="0.2" fontSize="8" fontFamily="monospace">CMM SCAN</text>
        </svg>
    );
}

/* ─── Acquisition Timeline ─── */
function AcquisitionTimeline() {
    const years = [...new Set(ACQUISITION_TIMELINE.map((e) => e.year))].sort();

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Machine Acquisition Timeline</h3>
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />

                {years.map((year) => {
                    const events = ACQUISITION_TIMELINE.filter((e) => e.year === year);
                    return (
                        <div key={year} className="relative mb-6 last:mb-0">
                            {/* Year dot */}
                            <div className="absolute -left-6 top-1 w-4 h-4 border-2 border-white/20 bg-black rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            </div>
                            <div className="ml-2">
                                <span className="text-sm font-mono font-bold text-white/70">{year}</span>
                                {events.map((event) => (
                                    <div key={event.machine} className="mt-2 border border-white/10 bg-white/[0.02] p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-white/50">{CATEGORY_ICONS[event.category]}</span>
                                            <span className="text-sm font-semibold text-white">{event.machine}</span>
                                        </div>
                                        <p className="mt-1 text-xs text-white/50">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── Main MachineShowcase Component ─── */
export default function MachineShowcase() {
    const [activeCategory, setActiveCategory] = useState<string>("ALL");
    const [selectedMachine, setSelectedMachine] = useState<Machine>(MACHINES[0]);

    const filtered =
        activeCategory === "ALL"
            ? MACHINES
            : MACHINES.filter((m) => m.category === activeCategory);

    return (
        <section className="w-full">
            {/* Hero */}
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Machine Showcase
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/50 max-w-2xl">
                    Our fleet of precision CNC machines, EDM systems, and metrology equipment — engineered for sub-micron accuracy across aerospace, medical, and automotive components.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${activeCategory === cat
                                ? "border-white/30 bg-white/[0.08] text-white"
                                : "border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
                            }`}
                    >
                        {cat === "ALL" ? "All Machines" : `${CATEGORY_ICONS[cat]} ${CATEGORY_LABELS[cat]}`}
                    </button>
                ))}
            </div>

            {/* Machine List + Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* Left: Machine Cards */}
                <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                    {filtered.map((m) => (
                        <MachineCard
                            key={m.id}
                            machine={m}
                            onSelect={setSelectedMachine}
                            isActive={selectedMachine.id === m.id}
                        />
                    ))}
                </div>

                {/* Right: Detail Panel */}
                <div className="lg:col-span-8 border border-white/10 bg-white/[0.01] p-4 sm:p-6">
                    <MachineDetail machine={selectedMachine} />
                </div>
            </div>

            {/* Acquisition Timeline */}
            <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8 sm:pt-12">
                <AcquisitionTimeline />
            </div>
        </section>
    );
}