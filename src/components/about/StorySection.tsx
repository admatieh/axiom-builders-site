"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0.95,
    originX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface StorySectionProps {
  badge: string;
  title: string;
  content: string[];
}

export default function StorySection({
  badge,
  title,
  content,
}: StorySectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <motion.div variants={fadeUp}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
              {badge}
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-5xl">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={panelReveal}
            className="relative border-l border-white/10 bg-black/20 p-8 backdrop-blur-xl md:p-12"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300/40 to-transparent" />
            
            <div className="space-y-6">
              {content.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  variants={fadeUp}
                  className="text-base leading-8 text-white/75 md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Technical decoration */}
            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="h-1 w-1 rounded-full bg-cyan-300" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Institutional · Commercial · Residential
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
