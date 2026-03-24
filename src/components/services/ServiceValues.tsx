"use client";

import { motion, type Variants } from "framer-motion";

const revealUp: Variants = {
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

interface ServiceValuesProps {
  headline: string;
  items: {
    title: string;
    description: string;
  }[];
}

export default function ServiceValues({ headline, items }: ServiceValuesProps) {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-3xl font-light tracking-tight text-white md:text-5xl"
        >
          {headline}
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group border border-white/5 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-cyan-300/20 hover:bg-white/[0.04]"
            >
              <div className="mb-6 text-[10px] uppercase tracking-[0.3em] text-cyan-300/60">
                Benefit 0{idx + 1}
              </div>
              <h3 className="text-xl font-medium tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/50 transition-colors duration-300 group-hover:text-white/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
