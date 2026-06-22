/* PREMA ENGINEERING WORKS — Exploded Assembly Visualization */
/* Interactive exploded view showing component assembly */

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AssemblyPart {
  name: string;
  description: string;
  material: string;
  position: { x: number; y: number; z: number };
  icon: string;
}

interface ExplodedAssemblyProps {
  productName: string;
  parts: AssemblyPart[];
}

export default function ExplodedAssembly({ productName, parts }: ExplodedAssemblyProps) {
  const [isExploded, setIsExploded] = useState(true);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Exploded Assembly View</h3>
          <p className="text-foreground/70">Understand every component of the assembly</p>
        </div>
        <button
          onClick={() => setIsExploded(!isExploded)}
          className="px-6 py-2 bg-accent/10 text-accent font-medium rounded-sm hover:bg-accent/20 transition-colors"
        >
          {isExploded ? 'Collapse' : 'Explode'} Assembly
        </button>
      </div>

      {/* 3D-like visualization container */}
      <div className="relative bg-black/30 rounded-lg p-12 min-h-96 flex items-center justify-center overflow-hidden border border-border">
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent" />
        </div>

        {/* Assembly parts visualization */}
        <div className="relative w-full h-96 flex items-center justify-center">
          {parts.map((part, idx) => {
            const angle = (idx / parts.length) * Math.PI * 2;
            const distance = isExploded ? 150 : 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.div
                key={idx}
                className={`absolute cursor-pointer transition-all ${
                  selectedPart === idx ? 'z-20' : 'z-10'
                }`}
                initial={{ x: 0, y: 0, scale: 0.8, opacity: 0 }}
                animate={{
                  x: isExploded ? x : 0,
                  y: isExploded ? y : 0,
                  scale: selectedPart === idx ? 1.1 : 1,
                  opacity: 1,
                }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setSelectedPart(selectedPart === idx ? null : idx)}
              >
                {/* Part container */}
                <div
                  className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl transition-all ${
                    selectedPart === idx
                      ? 'bg-accent/30 border-2 border-accent shadow-lg shadow-accent/50'
                      : 'bg-card border border-border hover:border-accent/50'
                  }`}
                >
                  {part.icon}
                </div>

                {/* Part label */}
                <motion.div
                  className="absolute top-full mt-2 text-center whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <p className="text-sm font-semibold text-foreground">{part.name}</p>
                </motion.div>

                {/* Connection line to center */}
                {isExploded && (
                  <motion.svg
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    width={distance * 2}
                    height={distance * 2}
                    style={{
                      x: -distance,
                      y: -distance,
                    }}
                  >
                    <line
                      x1={distance}
                      y1={distance}
                      x2={distance + x}
                      y2={distance + y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-foreground/20"
                      strokeDasharray="4 4"
                    />
                  </motion.svg>
                )}
              </motion.div>
            );
          })}

          {/* Center assembly point */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center"
            animate={{ scale: isExploded ? 0.8 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-xs font-bold text-accent">
              ⚙
            </div>
          </motion.div>
        </div>
      </div>

      {/* Part details */}
      {selectedPart !== null && (
        <motion.div
          className="bg-card rounded-lg p-8 border border-border space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">{parts[selectedPart].icon}</span>
                {parts[selectedPart].name}
              </h4>
              <p className="text-foreground/70">{parts[selectedPart].description}</p>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground/60 uppercase tracking-wide mb-1">Material</p>
              <p className="font-semibold text-foreground">{parts[selectedPart].material}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 uppercase tracking-wide mb-1">Position</p>
              <p className="font-semibold text-foreground">
                X: {parts[selectedPart].position.x}, Y: {parts[selectedPart].position.y}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Parts list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parts.map((part, idx) => (
          <motion.button
            key={idx}
            onClick={() => setSelectedPart(selectedPart === idx ? null : idx)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedPart === idx
                ? 'bg-accent/10 border-accent'
                : 'bg-card border-border hover:border-accent/50'
            }`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">{part.icon}</span>
              <div className="flex-grow">
                <p className="font-semibold text-foreground">{part.name}</p>
                <p className="text-sm text-foreground/70">{part.material}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
