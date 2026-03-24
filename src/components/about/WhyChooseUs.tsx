"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface WhyChooseUsProps {
  badge: string;
  title: string;
  items: string[];
}

export default function WhyChooseUs({ badge, title, items }: WhyChooseUsProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Background glow shadow to homepage pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.03),_transparent_40%)]" />

      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
              {badge}
            </span>
            <h2 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl">
              Building Trust Through <span className="font-medium text-[#f0a43a]">Performance</span>
            </h2>
            <p className="mt-8 text-base leading-8 text-white/65 md:text-lg">
              Axiom Builders is selected by discerning developers and
              architectural firms who prioritize technical coordination and
              disciplined delivery over generic construction.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemReveal}
                  className="group flex items-center gap-6 border-b border-white/10 pb-6 transition-colors duration-300 hover:border-cyan-300/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-black/20 text-[10px] font-medium text-cyan-300/80 transition-all duration-300 group-hover:border-cyan-300 group-hover:text-cyan-300">
                    0{idx + 1}
                  </div>
                  <span className="text-base font-light tracking-wide text-white/85 md:text-lg">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
