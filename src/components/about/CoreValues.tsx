"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const valueReveal: Variants = {
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

interface CoreValuesProps {
  badge: string;
  title: string;
  items: {
    title: string;
    description: string;
  }[];
}

export default function CoreValues({ badge, title, items }: CoreValuesProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mb-14 md:mb-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
            {badge}
          </span>
          <h2 className="mt-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((value, idx) => (
            <motion.div
              key={value.title}
              variants={valueReveal}
              className="group relative border border-white/10 bg-black/25 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:bg-black/40"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-cyan-300/60">
                  Value Block · 0{idx + 1}
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#f0a43a]" />
              </div>

              <h3 className="text-xl font-medium tracking-wide text-white md:text-2xl">
                {value.title}
              </h3>
              
              <div className="mt-4 mb-6 h-px w-8 bg-white/15 transition-all duration-300 group-hover:w-12 group-hover:bg-cyan-300/70" />

              <p className="text-sm leading-7 text-white/60 md:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
