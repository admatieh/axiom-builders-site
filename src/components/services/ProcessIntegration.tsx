"use client";

import { motion } from "framer-motion";

interface ProcessIntegrationProps {
  title: string;
  content: string;
}

export default function ProcessIntegration({
  title,
  content,
}: ProcessIntegrationProps) {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-white/10 bg-black/40 px-8 py-16 text-center backdrop-blur-xl md:px-16 md:py-24"
        >
          {/* subtle pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

          <h2 className="text-2xl font-light tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          
          <div className="mx-auto mt-8 h-px w-16 bg-cyan-300/40" />

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
            {content}
          </p>

          <div className="mt-12 text-[10px] uppercase tracking-[0.4em] text-cyan-300/50">
            Integrated · Disciplined · Coordinated
          </div>

          {/* technical indicators */}
          <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-white/10" />
          <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-white/10" />
          <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-white/10" />
          <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
