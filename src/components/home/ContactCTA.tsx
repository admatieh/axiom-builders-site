"use client";

import Link from "next/link";
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
    y: 28,
    scale: 0.985,
    clipPath: "inset(8% 8% 8% 8% round 18px)",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 18px)",
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ContactCTA() {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Same background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_32%),linear-gradient(to_bottom,_rgba(8,12,20,0.9),_rgba(4,8,14,0.98))]" />

      {/* Same blueprint grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* soft center spotlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_30%)]" />

      <motion.div
        className="mx-auto max-w-5xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={panelReveal}
          className="relative overflow-hidden border border-white/10 bg-black/35 px-6 py-14 text-center backdrop-blur-xl md:px-12 md:py-20"
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

          {/* scan line */}
          <motion.div
            initial={{ x: "-120%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 0.16, 0] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent blur-xl"
          />

          {/* top rule */}
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
          />

          {/* corner technical marks */}
          <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-white/12" />
          <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-white/12" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-white/12" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-white/12" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
            >
              Project Inquiry
            </motion.span>

            <motion.div
              variants={lineReveal}
              className="mt-6 h-px w-16 origin-center bg-white/25"
            />

            <motion.h2
              variants={fadeUp}
              className="mt-8 text-4xl font-light tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              Initiate
              <br />
              <span className="font-medium text-[#f0a43a]">Project.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-sm leading-7 text-white/62 md:text-base"
            >
              Partner with Axiom Builders to develop your next commercial,
              residential, or mixed-use project through a process defined by
              structural clarity, delivery control, and design-led execution.
            </motion.p>

            {/* micro data row */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.26em] text-white/35 md:gap-x-8"
            >
              <span>Commercial</span>
              <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
              <span>Residential</span>
              <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
              <span>Mixed-Use</span>
              <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
              <span>Fit-Out</span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/12 bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-cyan-300 hover:text-black"
              >
                Contact Firm
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-3 border border-white/12 bg-black/25 px-8 py-4 text-sm uppercase tracking-[0.22em] text-white/82 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-300"
              >
                View Work
                <span className="h-px w-6 bg-white/30" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.24em] text-white/30"
            >
              Response Window · 24–48 Hours · Project Discussions & Consultations
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}