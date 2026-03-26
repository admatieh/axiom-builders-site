"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

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
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ComingSoonProps {
  badge: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function ComingSoon({
  badge,
  title,
  message,
  buttonLabel,
  buttonHref,
}: ComingSoonProps) {
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center bg-black">
      {/* Background depth matched to the site DNA */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04),transparent_50%)]" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <motion.span
          variants={revealUp}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/80"
        >
          {badge}
        </motion.span>

        <motion.h1
          variants={revealUp}
          className="mt-8 text-4xl font-light tracking-tighter text-white md:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.div
          variants={revealUp}
          className="mx-auto mt-10 h-px w-16 bg-white/20"
        />

        <motion.p
          variants={revealUp}
          className="mt-10 text-lg leading-8 text-white/50 md:text-xl md:leading-9"
        >
          {message}
        </motion.p>

        <motion.div variants={revealUp} className="mt-12">
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center border border-white/10 bg-white/3 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300 hover:text-black"
          >
            {buttonLabel}
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative architectural marks */}
      <div className="pointer-events-none absolute left-10 top-1/2 h-32 w-px -translate-y-1/2 bg-linear-to-b from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-32 w-px -translate-y-1/2 bg-linear-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
