"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const lineDraw: Variants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 0.7,
    pathLength: 1,
    transition: {
      duration: 1.4,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const statVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface AboutPreviewProps {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  metrics: { label: string; value: string }[];
  ctaText: string;
}

export default function AboutPreview({
  badge,
  title,
  description1,
  description2,
  metrics,
  ctaText,
}: AboutPreviewProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Content grid */}
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Left side: animated blueprint massing */}
        <motion.div
          variants={panelReveal}
          className="relative min-h-[420px] overflow-hidden border border-white/10 bg-black/30 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

          <div className="absolute inset-0">
            <svg
              viewBox="0 0 700 500"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* ground lines */}
              <motion.path
                d="M70 390 H620"
                fill="none"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1"
                variants={lineDraw}
              />
              <motion.path
                d="M95 410 H645"
                fill="none"
                stroke="rgba(34,211,238,0.40)"
                strokeWidth="1"
                variants={lineDraw}
              />

              {/* blueprint guides */}
              <motion.path
                d="M120 110 V390 M200 90 V390 M290 120 V390 M390 80 V390 M500 130 V390"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                variants={lineDraw}
              />

              {/* building wireframe */}
              <motion.path
                d="M140 320 L240 250 L380 280 L290 350 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.path
                d="M240 250 L240 170 L380 200 L380 280"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.path
                d="M140 320 L140 240 L240 170 L240 250"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />

              {/* tower volume */}
              <motion.path
                d="M390 280 L480 220 L560 245 L470 308 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.path
                d="M480 220 L480 120 L560 145 L560 245"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.path
                d="M390 280 L390 180 L480 120 L480 220"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                variants={lineDraw}
              />

              {/* cyan emphasis lines */}
              <motion.path
                d="M140 320 L240 250 L380 280"
                fill="none"
                stroke="rgba(34,211,238,0.65)"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.path
                d="M390 280 L480 220 L560 245"
                fill="none"
                stroke="rgba(34,211,238,0.65)"
                strokeWidth="1.5"
                variants={lineDraw}
              />

              {/* facade rhythm */}
              <motion.path
                d="M168 292 L168 225 M194 276 L194 209 M220 260 L220 193 M272 255 L272 183 M302 262 L302 190 M332 268 L332 196"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                variants={lineDraw}
              />
              <motion.path
                d="M420 252 L420 160 M447 238 L447 146 M474 224 L474 132 M505 231 L505 139 M532 237 L532 145"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                variants={lineDraw}
              />
            </svg>
          </div>

          {/* bottom caption */}
          <motion.div
            variants={fadeUp}
            className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 px-6 py-5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
                  Design-Led Delivery
                </p>
                <p className="mt-2 text-sm text-white/65">
                  A spatial philosophy shaped through structure, material
                  discipline, and long-range planning.
                </p>
              </div>

              <div className="hidden h-10 w-px bg-white/10 md:block" />

              <div className="hidden md:block text-right">
                <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                  Blueprint Study
                </p>
                <p className="mt-2 text-sm text-white/60">Concept → Form → Delivery</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side: content */}
        <div className="flex items-center">
          <div className="w-full">
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
            >
              {badge}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl"
            >
              {title.split(" ").slice(0, -2).join(" ")}{" "}
              <br />
              <span className="font-medium text-[#f0a43a]">
                {title.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-8 border-l border-cyan-300/40 bg-black/25 p-6 backdrop-blur-md md:p-8"
            >
              <p className="text-base leading-8 text-white/78 md:text-lg">
                {description1}
              </p>

              <p className="mt-5 text-sm leading-7 text-white/60 md:text-[15px]">
                {description2}
              </p>
            </motion.div>

            {/* stats */}
            <motion.div
              variants={sectionVariants}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {metrics.map((item) => (
                <motion.div
                  key={item.label}
                  variants={statVariants}
                  className="border border-white/10 bg-black/25 px-5 py-5 backdrop-blur-md"
                >
                  <div className="text-2xl font-light tracking-tight text-white">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/45">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 border-b border-white/20 pb-2 text-sm uppercase tracking-[0.24em] text-white/82 transition-colors duration-300 hover:border-cyan-300/70 hover:text-cyan-300"
              >
                {ctaText}
                <span className="inline-block h-px w-8 bg-white/30 transition-all duration-300 group-hover:w-12 group-hover:bg-cyan-300/80" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}