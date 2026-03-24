"use client";

import { motion } from "framer-motion";

interface SectorsSectionProps {
  badge: string;
  title: string;
  items: string[];
}

export default function SectorsSection({
  badge,
  title,
  items,
}: SectorsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Background glow shadow to homepage pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,_rgba(240,164,58,0.03),_transparent_40%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-24 items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
              {badge}
            </span>
            <h2 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
              {title}
            </h2>
            <p className="mt-8 text-lg leading-8 text-white/60">
              Axiom Builders operates across the primary sectors of modern urban
              development, applying the same disciplined delivery system to every program type.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((sector, idx) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex items-center justify-between border border-white/10 bg-black/40 px-6 py-8 backdrop-blur-sm transition-colors duration-300 hover:border-[#f0a43a]/40"
              >
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                  {sector}
                </span>
                <div className="h-1 w-1 rounded-full bg-[#f0a43a]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
