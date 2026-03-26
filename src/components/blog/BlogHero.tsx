"use client";

import { motion } from "framer-motion";

interface BlogHeroProps {
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function BlogHero({ hero }: BlogHeroProps) {
  return (
    <section className="relative w-full pt-[20vh] pb-[10vh] px-6 sm:px-12 md:px-20 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-cyan-500/50" />
            <span className="text-sm font-mono uppercase tracking-widest text-cyan-400">
              {hero?.eyebrow || "Journal"}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white drop-shadow-2xl mb-8 leading-[1.1]">
            {hero?.title || (
              <>
                Ideas, Process, <br />
                <span className="font-bold text-white/90">Project Perspective.</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-light leading-relaxed tracking-wide">
            {hero?.subtitle ||
              "A curated editorial space for construction insights, design-led thinking, project updates, and the principles that shape how Axiom Builders builds."}
          </p>
        </motion.div>
      </div>

      {/* Decorative Line Only */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent origin-left"
      />
    </section>
  );
}
