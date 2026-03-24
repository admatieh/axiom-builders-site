"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface PhilosophyProps {
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
}

export default function PhilosophySection({ mission, vision }: PhilosophyProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission Block */}
          <motion.div
            variants={cardReveal}
            className="group relative overflow-hidden border border-white/10 bg-black/30 p-8 backdrop-blur-xl md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_40%)]" />
            
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
              {mission.title}
            </span>
            <p className="mt-8 text-2xl font-light leading-relaxed text-white md:text-3xl">
              {mission.content}
            </p>
            
            <div className="mt-12 h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-20 group-hover:bg-cyan-300/60" />
          </motion.div>

          {/* Vision Block */}
          <motion.div
            variants={cardReveal}
            className="group relative overflow-hidden border border-white/10 bg-black/30 p-8 backdrop-blur-xl md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,164,58,0.05),_transparent_40%)]" />
            
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f0a43a]/90">
              {vision.title}
            </span>
            <p className="mt-8 text-2xl font-light leading-relaxed text-white md:text-3xl">
              {vision.content}
            </p>
            
            <div className="mt-12 h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-20 group-hover:bg-[#f0a43a]/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
