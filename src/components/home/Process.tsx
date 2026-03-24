"use client";

import { motion, type Variants } from "framer-motion";
import Surface from "@/components/ui/Surface";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const headingReveal: Variants = {
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
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const wallReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.16,
    },
  },
};

const brickReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    clipPath: "inset(100% 0 0 0 round 14px)",
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0 0 0 round 14px)",
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const contentReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.18,
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
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ProcessProps {
  badge: string;
  title: string;
  description: string;
  steps: {
    num: string;
    title: string;
    desc: string;
    tone: string;
  }[];
}

export default function Process({
  badge,
  title,
  description,
  steps,
}: ProcessProps) {

  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Center technical rule */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-white/10 opacity-[0.08]" />

      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <motion.span
            variants={headingReveal}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
          >
            {badge}
          </motion.span>

          <motion.h2
            variants={headingReveal}
            className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl"
          >
            {title.split(" ").slice(0, -1).join(" ")}
            <span className="font-medium text-[#f0a43a]"> {title.split(" ").slice(-1)}</span>
          </motion.h2>

          <motion.p
            variants={headingReveal}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/58 md:text-base"
          >
            {description}
          </motion.p>
        </div>

        {/* Brick wall composition */}
        <motion.div
          variants={wallReveal}
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
        >
          {/* technical horizontal rules */}
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-[22%] hidden h-px origin-left bg-gradient-to-r from-transparent via-white/12 to-transparent md:block"
          />
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-[51%] hidden h-px origin-left bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent md:block"
          />
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-[80%] hidden h-px origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent md:block"
          />

          {steps.map((step, idx) => {
            const layout =
              idx === 0
                ? "md:col-span-7"
                : idx === 1
                  ? "md:col-span-5"
                  : idx === 2
                    ? "md:col-span-5"
                    : "md:col-span-7";

            return (
              <motion.div
                key={step.num}
                variants={brickReveal}
                className={`${layout} relative`}
              >
                <Surface
                  level={2}
                  className="group relative min-h-[240px] overflow-hidden border border-white/10 bg-black/35 p-6 backdrop-blur-xl transition-colors duration-500 hover:bg-black/42 md:min-h-[260px] md:p-8"
                >
                  {/* subtle masonry texture */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:36px_36px]" />
                  </div>

                  {/* ambient highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

                  {/* top accent strip */}
                  <motion.div
                    variants={lineReveal}
                    className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <motion.div
                      variants={contentReveal}
                      className="flex items-start justify-between gap-6"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                          {step.tone}
                        </p>
                        <h3 className="mt-4 text-2xl font-medium tracking-wide text-white md:text-[28px]">
                          {step.title}
                        </h3>
                      </div>

                      <span className="text-4xl font-light tracking-tight text-white/22 transition-colors duration-300 group-hover:text-cyan-300/80 md:text-5xl">
                        {step.num}
                      </span>
                    </motion.div>

                    <motion.div variants={contentReveal} className="mt-10">
                      <div className="mb-5 h-px w-12 bg-white/18 transition-all duration-300 group-hover:w-16 group-hover:bg-[#f0a43a]" />
                      <p className="max-w-[50ch] text-sm leading-7 text-white/65 md:text-[15px]">
                        {step.desc}
                      </p>
                    </motion.div>

                    {/* bottom mini footer */}
                    <motion.div
                      variants={contentReveal}
                      className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.26em] text-white/30"
                    >
                      <span>Phase {step.num}</span>
                      <span className="text-cyan-300/70">Locked Sequence</span>
                    </motion.div>
                  </div>
                </Surface>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}