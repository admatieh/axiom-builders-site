"use client";

import { motion, type Variants } from "framer-motion";
import Surface from "@/components/ui/Surface";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    clipPath: "inset(0 0 100% 0 round 18px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0 round 18px)",
    transition: {
      duration: 0.95,
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
      duration: 0.75,
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

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface TrustedByProps {
  badge: string;
  title: string;
  description: string;
  sectors: string[];
}

export default function TrustedBy({
  badge,
  title,
  description,
  sectors,
}: TrustedByProps) {

  return (
    <section className="relative z-20 -mt-20 mb-24 w-full px-6 md:-mt-24 md:mb-32 md:px-10">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div variants={panelReveal}>
          <Surface
            level={2}
            className="relative overflow-hidden border border-white/10 bg-black/35 px-6 py-8 backdrop-blur-xl md:px-10 md:py-10"
          >
            {/* same atmospheric treatment */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />

            {/* subtle blueprint scan lines */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:46px_46px]" />
            </div>

            {/* connector rule */}
            <motion.div
              variants={lineReveal}
              className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
            />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
              <motion.div
                variants={fadeUp}
                className="md:w-[260px] md:flex-shrink-0"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
                  {badge}
                </span>

                <h3 className="mt-3 text-lg font-light tracking-wide text-white md:text-xl">
                  {title}
                </h3>
              </motion.div>

              <div className="flex-1">
                <motion.div
                  variants={lineReveal}
                  className="mb-6 hidden h-px origin-left bg-white/10 md:block"
                />

                <motion.div
                  className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end md:gap-x-10"
                  variants={sectionVariants}
                >
                  {sectors.map((client) => (
                    <motion.div
                      key={client}
                      variants={itemVariants}
                      className="group relative"
                    >
                      <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/55 transition-colors duration-300 group-hover:text-white/90 md:text-xs">
                        <span className="h-[5px] w-[5px] rounded-full bg-cyan-300/70 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#f0a43a]" />
                        {client}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* bottom technical footer strip */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.26em] text-white/30 md:flex-row md:items-center md:justify-between"
            >
              <span>Cross-Sector Delivery</span>
              <span>Commercial · Residential · Hospitality · Institutional</span>
            </motion.div>
          </Surface>
        </motion.div>
      </motion.div>
    </section>
  );
}