"use client";

import { motion } from "framer-motion";

interface ServicesIntroProps {
  badge: string;
  title: string;
  content: string;
}

export default function ServicesIntro({
  badge,
  title,
  content,
}: ServicesIntroProps) {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
          >
            {badge}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-3xl font-light tracking-tight text-white md:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 h-px w-20 origin-left bg-white/20"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-xl leading-9 text-white/70"
          >
            {content}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
