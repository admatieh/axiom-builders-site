"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.12,
    },
  },
};

const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const valueReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    letterSpacing: "-0.08em",
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "-0.04em",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface StatsStripProps {
  badge: string;
  title: string;
  description: string;
  items: {
    value: string;
    suffix: string;
    label: string;
    description: string;
  }[];
}

export default function StatsStrip({
  badge,
  title,
  description,
  items,
}: StatsStripProps) {

  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-20 md:px-10 md:py-24">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={panelReveal}
          className="relative overflow-hidden border border-white/10 bg-black/35 px-6 py-8 backdrop-blur-xl md:px-10 md:py-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06),_transparent_35%)]" />

          {/* top technical rule */}
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
          />

          {/* bottom soft rule */}
          <motion.div
            variants={lineReveal}
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-white/0 via-white/15 to-white/0"
          />

          {/* header */}
          <motion.div
            variants={itemReveal}
            className="relative z-10 mb-8 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
                {badge}
              </span>
              <h3 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
                {title}
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/55 md:text-right">
              {description}
            </p>
          </motion.div>

          {/* stats */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemReveal}
                className="group relative overflow-hidden border border-white/10 bg-black/25 px-5 py-6 backdrop-blur-md transition-colors duration-300 hover:bg-black/32"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
                <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-white/8" />

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    0{index + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300/70 transition-colors duration-300 group-hover:bg-[#f0a43a]" />
                </div>

                <motion.div
                  variants={valueReveal}
                  className="flex items-end gap-1 leading-none"
                >
                  <span className="text-5xl font-light tracking-tight text-white md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="mb-1 text-2xl font-light text-cyan-300 md:text-3xl">
                    {stat.suffix}
                  </span>
                </motion.div>

                <div className="mt-4 h-px w-12 bg-white/18 transition-all duration-300 group-hover:w-16 group-hover:bg-cyan-300/70" />

                <h4 className="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/55">
                  {stat.label}
                </h4>

                <p className="mt-3 text-sm leading-6 text-white/52">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* footer strip */}
          <motion.div
            variants={itemReveal}
            className="relative z-10 mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.25em] text-white/30 md:flex-row md:items-center md:justify-between"
          >
            <span>Verified Performance Metrics</span>
            <span>Planning · Delivery · Quality Control · Execution</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}