"use client";

import { motion, type Variants } from "framer-motion";

const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
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
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.4,
    },
  },
};

const modelReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.92,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ServicesHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
}

function ServiceLayer({
  title,
  accent = "cyan",
  delay = 0,
  className = "",
}: {
  title: string;
  accent?: "cyan" | "amber";
  delay?: number;
  className?: string;
}) {
  const accentClasses =
    accent === "amber"
      ? "border-[#f0a43a]/45 shadow-[0_0_30px_rgba(240,164,58,0.14)]"
      : "border-cyan-300/40 shadow-[0_0_30px_rgba(34,211,238,0.14)]";

  const dotClasses =
    accent === "amber" ? "bg-[#f0a43a]" : "bg-cyan-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-sm border bg-white/[0.03] backdrop-blur-md ${accentClasses} ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 rounded-sm bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
      <div className="absolute inset-0 rounded-sm bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:14px_14px] opacity-20" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 rounded-full ${dotClasses}`} />
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/80">
            {title}
          </span>
        </div>
        <div className="text-[10px] tracking-[0.24em] text-white/35">AXIOM</div>
      </div>

      <div className="relative z-10 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 rounded-sm border border-white/10 bg-white/[0.02]" />
          <div className="h-16 rounded-sm border border-white/10 bg-white/[0.02]" />
          <div className="col-span-2 h-10 rounded-sm border border-white/10 bg-white/[0.03]" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-white/20" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/20" />
    </motion.div>
  );
}

function ServicesArchitecturalModel() {
  return (
    <motion.div
      variants={modelReveal}
      className="relative mx-auto h-[360px] w-[320px] md:h-[500px] md:w-[480px]"
      style={{ perspective: 1800 }}
    >
      <motion.div
        animate={{
          rotateY: [0, 8, 0, -8, 0],
          rotateX: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(58deg) rotateZ(-36deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <ServiceLayer
            title="Concept Design"
            accent="cyan"
            delay={0.15}
            className="h-[84px]"
          />
          <ServiceLayer
            title="Engineering"
            accent="amber"
            delay={0.28}
            className="h-[84px]"
          // lifted
          />
          <div
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate(-50%, -50%) translateZ(38px)" }}
          >
            <ServiceLayer
              title="Execution Planning"
              accent="cyan"
              delay={0.4}
              className="h-[84px]"
            />
          </div>

          <div
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate(-50%, -50%) translateZ(76px)" }}
          >
            <ServiceLayer
              title="Build & Delivery"
              accent="amber"
              delay={0.52}
              className="h-[84px]"
            />
          </div>

          <div
            className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-sm border border-cyan-300/15"
            style={{ transform: "translate(-50%, -50%) translateZ(-18px)" }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-sm border border-white/10"
            style={{ transform: "translate(-50%, -50%) translateZ(-42px)" }}
          />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 md:h-[340px] md:w-[340px]"
        />

        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-[#f0a43a] shadow-[0_0_20px_rgba(240,164,58,0.7)]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function ServicesHero({
  badge,
  headline,
  subheadline,
}: ServicesHeroProps) {
  const words = headline.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        className="mx-auto grid max-w-7xl w-full items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
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
            className="mt-8 max-w-5xl text-5xl font-light tracking-tighter text-white md:text-8xl xl:text-9xl"
          >
            {firstPart} <br className="hidden md:block" />
            <span className="font-medium text-[#f0a43a]">{lastWord}</span>
          </motion.h1>

          <motion.div
            variants={lineReveal}
            className="mt-12 h-px w-32 origin-left bg-cyan-300/60"
          />

          <motion.p
            variants={revealUp}
            className="mt-12 max-w-2xl text-lg leading-8 text-white/70 md:text-xl md:leading-9"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <ServicesArchitecturalModel />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-6 top-32 h-12 w-12 border-l border-t border-white/10 md:left-10 md:top-48" />
      <div className="pointer-events-none absolute right-6 top-32 h-12 w-12 border-r border-t border-white/10 md:right-10 md:top-48" />
    </section>
  );
}