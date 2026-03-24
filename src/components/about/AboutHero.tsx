"use client";

import { motion, type Variants } from "framer-motion";

const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.5,
    },
  },
};

const modelWrap: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
    rotateY: -18,
    scale: 0.9,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.25,
    },
  },
};

interface AboutHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
}

function ArchitecturalModel() {
  return (
    <motion.div
      variants={modelWrap}
      className="relative mx-auto h-[340px] w-[340px] md:h-[460px] md:w-[460px]"
      style={{ perspective: 1600 }}
    >
      <motion.div
        animate={{
          rotateY: [0, 8, 0, -8, 0],
          rotateX: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Outer glow */}
        <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Main 3D slab */}
        <div
          className="absolute left-1/2 top-1/2 h-[220px] w-[220px] md:h-[290px] md:w-[290px]"
          style={{
            transform:
              "translate(-50%, -50%) rotateX(64deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top face */}
          <div className="absolute inset-0 rounded-sm border border-cyan-300/40 bg-white/[0.025] backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            {/* Large grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:44px_44px]" />

            {/* Fine grid */}
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:11px_11px]" />

            {/* Inner construction blocks */}
            <div className="absolute left-[12%] top-[15%] h-[28%] w-[24%] border border-[#f0a43a]/50 bg-[#f0a43a]/5" />
            <div className="absolute left-[42%] top-[15%] h-[18%] w-[32%] border border-cyan-300/45 bg-cyan-300/5" />
            <div className="absolute left-[24%] top-[48%] h-[24%] w-[22%] border border-white/30 bg-white/[0.03]" />
            <div className="absolute left-[52%] top-[42%] h-[30%] w-[20%] border border-[#f0a43a]/40 bg-[#f0a43a]/5" />

            {/* Measured lines */}
            <div className="absolute left-[10%] right-[10%] top-[38%] h-px bg-cyan-300/30" />
            <div className="absolute bottom-[18%] top-[12%] left-[36%] w-px bg-cyan-300/20" />

            {/* Corner markers */}
            <div className="absolute left-3 top-3 h-7 w-7 border-l border-t border-white/30" />
            <div className="absolute right-3 top-3 h-7 w-7 border-r border-t border-white/30" />
            <div className="absolute bottom-3 left-3 h-7 w-7 border-b border-l border-white/30" />
            <div className="absolute bottom-3 right-3 h-7 w-7 border-b border-r border-white/30" />
          </div>

          {/* Depth face 1 */}
          <div
            className="absolute left-0 top-0 h-full w-full rounded-sm border border-cyan-300/15 bg-cyan-400/[0.03]"
            style={{ transform: "translateZ(-26px)" }}
          />

          {/* Vertical side */}
          <div
            className="absolute right-0 top-0 h-full w-[26px] origin-right border border-cyan-300/20 bg-white/[0.03]"
            style={{
              transform: "rotateY(90deg) translateX(13px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:100%_16px]" />
          </div>

          {/* Bottom side */}
          <div
            className="absolute bottom-0 left-0 h-[26px] w-full origin-bottom border border-cyan-300/20 bg-white/[0.02]"
            style={{
              transform: "rotateX(-90deg) translateY(13px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:16px_100%]" />
          </div>
        </div>

        {/* Floating accent ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 md:h-[340px] md:w-[340px]"
        />

        {/* Floating amber marker */}
        <motion.div
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[18%] top-[24%] h-3 w-3 rounded-full bg-[#f0a43a] shadow-[0_0_20px_rgba(240,164,58,0.7)]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function AboutHero({
  badge,
  headline,
  subheadline,
}: AboutHeroProps) {
  const words = headline.split(" ");
  const lastWord = words.slice(-1).join(" ");
  const firstWords = words.slice(0, -1).join(" ");

  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-48">
      {/* Blueprint grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        className="mx-auto grid max-w-7xl w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div>
          <motion.span
            variants={revealUp}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90"
          >
            {badge}
          </motion.span>

          <motion.h1
            variants={revealUp}
            className="mt-8 max-w-4xl text-5xl font-light tracking-tighter text-white md:text-8xl xl:text-9xl"
          >
            {firstWords} <br className="hidden md:block" />
            <span className="font-medium text-[#f0a43a]">{lastWord}</span>
          </motion.h1>

          <motion.div
            variants={lineReveal}
            className="mt-12 h-px w-24 origin-left bg-cyan-300/60"
          />

          <motion.p
            variants={revealUp}
            className="mt-12 max-w-2xl text-lg leading-8 text-white/70 md:text-xl md:leading-9"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <ArchitecturalModel />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-6 top-32 h-12 w-12 border-l border-t border-white/10 md:left-10 md:top-48" />
      <div className="pointer-events-none absolute right-6 top-32 h-12 w-12 border-r border-t border-white/10 md:right-10 md:top-48" />
    </section>
  );
}