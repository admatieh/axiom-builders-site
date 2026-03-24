"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Surface from "@/components/ui/Surface";

type Card = {
  num: string;
  title: string;
  desc: string;
  icon: string;
  marginTop: string;
};

interface ArchitecturalBoardProps {
  badge: string;
  title: string;
  description: string;
  items: Card[];
}

export default function ArchitecturalBoard({
  badge,
  title,
  description,
  items,
}: ArchitecturalBoardProps) {
  const boardVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0.35,
      clipPath: "inset(38% 0 38% 0 round 16px)",
      filter: "blur(6px)",
      y: 28,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0 0% 0 round 16px)",
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const connectorVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 0.32,
      pathLength: 1,
      transition: {
        duration: 1.4,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };
  return (
    <section className="relative isolate w-full overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Center technical rule */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-white/10 opacity-[0.08]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
            {badge}
          </span>

          <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-tight text-white md:text-6xl">
            {title}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            {description}
          </p>
        </div>

        <motion.div
          className="relative"
          variants={boardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Desktop connector drawing */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <svg
              className="h-full w-full"
              viewBox="0 0 1200 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* soft blueprint traces */}
              <motion.path
                d="M235 170 L430 170 L510 255"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.2"
                variants={connectorVariants}
              />
              <motion.path
                d="M640 315 L810 315 L890 400"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.2"
                variants={connectorVariants}
              />

              <motion.path
                d="M235 185 L430 185 L510 270"
                fill="none"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="1.5"
                variants={connectorVariants}
              />
              <motion.path
                d="M640 330 L810 330 L890 415"
                fill="none"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="1.5"
                variants={connectorVariants}
              />

              {/* wireframe fill feeling */}
              <motion.path
                d="M235 170 L430 170 L510 255 M245 182 L420 182 L500 267 M255 194 L410 194 L490 279"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.8"
                variants={connectorVariants}
              />
              <motion.path
                d="M640 315 L810 315 L890 400 M650 327 L800 327 L880 412 M660 339 L790 339 L870 424"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.8"
                variants={connectorVariants}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {items.map((card) => (
              <motion.div
                key={card.num}
                variants={cardVariants}
                className={`relative ${card.marginTop}`}
              >
                <Surface
                  level={2}
                  className="group relative min-h-[340px] overflow-hidden rounded-none border border-white/10 bg-black/35 p-8 transition-all duration-500 hover:border-cyan-300/40 hover:bg-black/45 md:min-h-[390px] md:p-10"
                >
                  {/* subtle inner glow */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)] opacity-70" />

                  {/* index */}
                  <motion.div variants={contentVariants}>
                    <span className="text-4xl font-light tracking-tight text-white/28 transition-colors duration-500 group-hover:text-cyan-300/85 md:text-5xl">
                      {card.num}
                    </span>
                  </motion.div>

                  {/* icon area */}
                  <motion.div
                    variants={contentVariants}
                    className="mt-8 flex min-h-[140px] items-center justify-center border-y border-white/10 py-6"
                  >
                    <div className="relative h-24 w-40 opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 160px, 200px"
                      />
                    </div>
                  </motion.div>

                  {/* content */}
                  <motion.div
                    variants={contentVariants}
                    className="mt-8 flex flex-col"
                  >
                    <div className="mb-5 h-px w-10 bg-white/25 transition-colors duration-500 group-hover:bg-cyan-300/80" />

                    <h3 className="text-xl font-medium tracking-wide text-[#f0a43a] md:text-2xl">
                      {card.title}
                    </h3>

                    <p className="mt-4 max-w-[28ch] text-sm leading-7 text-white/70 md:text-[15px]">
                      {card.desc}
                    </p>
                  </motion.div>

                  {/* hover lift */}
                  <div className="pointer-events-none absolute inset-0 transition-transform duration-500 group-hover:-translate-y-1" />
                </Surface>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

}