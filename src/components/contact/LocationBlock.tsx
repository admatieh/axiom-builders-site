"use client";

import { motion } from "framer-motion";

interface LocationBlockProps {
  badge: string;
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

export default function LocationBlock({
  badge,
  title,
  description,
  coordinates,
}: LocationBlockProps) {
  return (
    <section className="relative w-full px-6 py-24 md:px-10 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
              {badge}
            </span>
            <h2 className="mt-8 text-3xl font-light tracking-tight text-white md:text-5xl">
              {title}
            </h2>
            <div className="mt-10 h-px w-20 bg-white/20" />
            <p className="mt-10 text-lg leading-8 text-white/50">
              {description}
            </p>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Latitude</span>
                <span className="text-sm font-medium text-white/80">{coordinates.lat}° N</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Longitude</span>
                <span className="text-sm font-medium text-white/80">{coordinates.lng}° W</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl lg:aspect-square">
            {/* Visual placeholder for map/globe */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_70%)]" />
            
            {/* Architectural Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-3/4 w-3/4 border border-white/5">
                {/* Simulated coordinate scanner */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-400/5"
                />
                
                {/* Targeting crosshair */}
                <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-cyan-300/40" />
                  <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-cyan-300/40" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
                  />
                </div>

                <div className="absolute bottom-6 left-6 text-[8px] uppercase tracking-[0.4em] text-white/20">
                  Site Data Lock · Active
                </div>
              </div>
            </div>

            {/* Scale markings */}
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/40">
              1:500 SCALE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
