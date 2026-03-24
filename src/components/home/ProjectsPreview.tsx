"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Surface from "@/components/ui/Surface";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(6px)",
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
    clipPath: "inset(0 100% 0 0 round 18px)",
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0 round 18px)",
    scale: 1,
    transition: {
      duration: 1.1,
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
    opacity: 0.75,
    pathLength: 1,
    transition: {
      duration: 1.35,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

const statReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ProjectsPreviewProps {
  badge: string;
  name: string;
  tagline: string;
  description: string;
  description2: string;
  metrics: { label: string; value: string }[];
  id: string;
  assetName: string;
  status: string;
  category: string;
  tags: string[];
}

export default function ProjectsPreview({
  badge,
  name,
  tagline,
  description,
  description2,
  metrics,
  id,
  assetName,
  status,
  category,
  tags,
}: ProjectsPreviewProps) {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Center technical rule */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-white/10 opacity-[0.08]" />

      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-[0.95fr_1.05fr] md:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Left: project narrative */}
        <div className="order-2 md:order-1">
          <motion.span
            variants={fadeLeft}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
          >
            {badge}
          </motion.span>

          <motion.h2
            variants={fadeLeft}
            className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl"
          >
            {name.split(" ").slice(0, -1).join(" ")}
            <br />
            <span className="font-medium text-[#f0a43a]">
              {name.split(" ").slice(-1)}
            </span>
          </motion.h2>

          <motion.div
            variants={fadeLeft}
            className="mt-8 max-w-xl border-l border-cyan-300/35 bg-black/25 p-6 backdrop-blur-md md:p-8"
          >
            <p className="text-base leading-8 text-white/78 md:text-lg">
              {description}
            </p>

            <p className="mt-5 text-sm leading-7 text-white/60 md:text-[15px]">
              {description2}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {metrics.map((item) => (
              <motion.div
                key={item.label}
                variants={statReveal}
                className="border border-white/10 bg-black/25 px-5 py-5 backdrop-blur-md"
              >
                <div className="text-xl font-light tracking-tight text-white">
                  {item.value}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/42">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeLeft} className="mt-10">
            <Link
              href={`/projects/${id.toLowerCase().replace(/_/g, "-")}`}
              className="group inline-flex items-center gap-4 border-b border-white/20 pb-2 text-sm uppercase tracking-[0.24em] text-white/82 transition-colors duration-300 hover:border-cyan-300/70 hover:text-cyan-300"
            >
              View Project
              <span className="inline-block h-px w-8 bg-white/30 transition-all duration-300 group-hover:w-12 group-hover:bg-cyan-300/80" />
            </Link>
          </motion.div>
        </div>

        {/* Right: project visual panel */}
        <motion.div variants={panelReveal} className="order-1 md:order-2">
          <Surface
            level={2}
            className="group relative overflow-hidden border border-white/10 bg-black/35 p-6 backdrop-blur-xl md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

            {/* top technical header */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
                  Project Registry
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/35">
                  Mixed-Use Development
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </motion.div>

            {/* main project massing panel */}
            <div className="relative z-10 mt-6 aspect-[1/1] overflow-hidden border border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
              {/* internal grid */}
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:42px_42px]" />
              </div>

              {/* subtle scan beam */}
              <motion.div
                initial={{ x: "-110%", opacity: 0 }}
                whileInView={{ x: "110%", opacity: [0, 0.16, 0] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent blur-xl"
              />

              {/* SVG tower drawing */}
              <div className="absolute inset-0">
                <svg
                  viewBox="0 0 520 520"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  {/* ground */}
                  <motion.path
                    d="M70 420 H440"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                    variants={lineDraw}
                  />
                  <motion.path
                    d="M95 438 H462"
                    fill="none"
                    stroke="rgba(34,211,238,0.42)"
                    strokeWidth="1"
                    variants={lineDraw}
                  />

                  {/* guide lines */}
                  <motion.path
                    d="M145 90 V420 M195 70 V420 M250 58 V420 M305 72 V420 M360 94 V420"
                    fill="none"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1"
                    variants={lineDraw}
                  />

                  {/* tower body */}
                  <motion.path
                    d="M180 390 L180 130 L264 92 L340 130 L340 390 Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.72)"
                    strokeWidth="1.6"
                    variants={lineDraw}
                  />

                  {/* podium */}
                  <motion.path
                    d="M130 390 L130 310 L180 286 L340 286 L390 310 L390 390 Z"
                    fill="rgba(255,255,255,0.04)"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="1.5"
                    variants={lineDraw}
                  />

                  {/* facade rhythm */}
                  <motion.path
                    d="M200 142 V388 M220 132 V388 M240 122 V388 M260 114 V388 M280 122 V388 M300 132 V388 M320 142 V388"
                    fill="none"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1"
                    variants={lineDraw}
                  />
                  <motion.path
                    d="M180 178 H340 M180 214 H340 M180 250 H340 M180 286 H340 M180 322 H340 M180 358 H340"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1"
                    variants={lineDraw}
                  />

                  {/* cyan accent edges */}
                  <motion.path
                    d="M180 130 L264 92 L340 130"
                    fill="none"
                    stroke="rgba(34,211,238,0.72)"
                    strokeWidth="1.8"
                    variants={lineDraw}
                  />
                  <motion.path
                    d="M130 390 L390 390"
                    fill="none"
                    stroke="rgba(240,164,58,0.75)"
                    strokeWidth="1.8"
                    variants={lineDraw}
                  />
                </svg>
              </div>

              {/* overlay details */}
              <motion.div
                variants={fadeUp}
                className="absolute left-4 top-4 border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md"
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">
                  Project ID
                </p>
                <p className="mt-1 text-xs tracking-[0.2em] text-white/78">
                  PROJECT_0942
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4"
              >
                <div className="border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">
                    Asset Name
                  </p>
                  <p className="mt-1 text-lg font-light tracking-wide text-white">
                    {assetName}
                  </p>
                </div>

                <div className="hidden border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md sm:block">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">
                    Status
                  </p>
                  <p className="mt-1 text-sm tracking-[0.18em] text-cyan-300/90">
                    {status}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* footer strip */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.25em] text-white/30"
            >
              <span>{category}</span>
              <span className="hidden md:inline">
                {tags.join(" · ")}
              </span>
            </motion.div>
          </Surface>
        </motion.div>
      </motion.div>
    </section>
  );
}