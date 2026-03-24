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

interface ContactHeroProps {
  badge: string;
  title: string;
  subheadline: string;
}

export default function ContactHero({
  badge,
  title,
  subheadline,
}: ContactHeroProps) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <section className="relative flex min-h-[60vh] w-full flex-col justify-center overflow-hidden px-6 pt-32 pb-20 md:px-10 md:pt-48 md:pb-32 bg-black">
      {/* Background depth */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_35%),linear-gradient(to_bottom,_#05070b_0%,_#0a1120_18%,_#0a1422_45%,_#08101b_100%)]" />
      
      <motion.div
        className="mx-auto max-w-7xl w-full text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span
          variants={revealUp}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90"
        >
          {badge}
        </motion.span>

        <motion.h1
          variants={revealUp}
          className="mt-8 text-4xl font-light tracking-tighter text-white md:text-7xl xl:text-8xl"
        >
          {firstPart}{" "}
          <span className="font-medium text-[#f0a43a]">{lastWord}</span>
        </motion.h1>

        <motion.p
          variants={revealUp}
          className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-white/60 md:text-xl md:leading-9"
        >
          {subheadline}
        </motion.p>
      </motion.div>

      {/* Blueprint grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
    </section>
  );
}
