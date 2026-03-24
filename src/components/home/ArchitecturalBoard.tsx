"use client";

import { motion } from "framer-motion";
import Surface from "@/components/ui/Surface";

type Card = {
  num: string;
  title: string;
  desc: string;
  marginTop: string;
};

export default function ArchitecturalBoard() {
  const cards: Card[] = [
    {
      num: "01",
      title: "Interior Design",
      desc: "Crafting aesthetic and functional spaces tailored to each environment, user flow, and material language.",
      marginTop: "mt-0",
    },
    {
      num: "02",
      title: "Construction",
      desc: "Delivering complex builds with disciplined coordination, site control, and precision from start to finish.",
      marginTop: "mt-10 md:mt-20",
    },
    {
      num: "03",
      title: "Exterior Design",
      desc: "Shaping architectural identity through facade systems, structural expression, and durable finishing strategies.",
      marginTop: "mt-20 md:mt-40",
    },
  ];
  const boardVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.28,
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
        duration: 1.05,
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
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_35%),linear-gradient(to_bottom,_rgba(8,12,20,0.88),_rgba(4,8,14,0.96))]" />

      {/* Blueprint grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
            Core Expertise
          </span>

          <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-tight text-white md:text-6xl">
            Spatial Execution.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            A connected service board designed to present the construction
            workflow as an architectural system—layered, precise, and fully
            coordinated from interior planning to exterior identity.
          </p>
        </div>

        <motion.div
          className="relative"
          variants={boardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
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
            {cards.map((card, index) => (
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
                    className="mt-8 flex min-h-[110px] items-center justify-center border-y border-white/10 py-6"
                  >
                    {index === 0 && <InteriorIcon />}
                    {index === 1 && <ConstructionIcon />}
                    {index === 2 && <ExteriorIcon />}
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

function InteriorIcon() {
  return (
    <svg
      viewBox="0 0 220 120"
      className="h-[90px] w-full max-w-[180px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 68 L72 42 L112 62 L112 102 L68 78 Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path
        d="M72 42 L120 20 L164 42 L112 62 Z"
        fill="rgba(255,255,255,0.82)"
      />
      <path
        d="M112 62 L164 42 L164 82 L112 102 Z"
        fill="rgba(255,255,255,0.72)"
      />
      <rect x="78" y="68" width="10" height="18" fill="rgba(8,12,20,0.7)" />
      <rect x="132" y="58" width="14" height="18" fill="rgba(8,12,20,0.7)" />
      <rect x="149" y="58" width="8" height="18" fill="rgba(8,12,20,0.7)" />
      <rect x="34" y="74" width="10" height="10" fill="rgba(8,12,20,0.7)" />
      <path
        d="M98 69 C103 63, 112 63, 117 69"
        stroke="rgba(34,211,238,0.9)"
        strokeWidth="2"
      />
    </svg>
  );
}

function ConstructionIcon() {
  return (
    <svg
      viewBox="0 0 220 120"
      className="h-[90px] w-full max-w-[180px]"
      fill="none"
      aria-hidden="true"
    >
      <rect x="82" y="44" width="48" height="46" fill="rgba(255,255,255,0.9)" />
      <rect x="88" y="50" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <rect x="100" y="50" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <rect x="112" y="50" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <rect x="88" y="66" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <rect x="100" y="66" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <rect x="112" y="66" width="8" height="10" fill="rgba(8,12,20,0.72)" />
      <path
        d="M46 90 L46 18"
        stroke="#f0a43a"
        strokeWidth="4"
      />
      <path
        d="M46 22 L126 22"
        stroke="#f0a43a"
        strokeWidth="4"
      />
      <path
        d="M72 22 L60 38"
        stroke="#f0a43a"
        strokeWidth="2"
      />
      <rect x="116" y="24" width="16" height="8" fill="#f0a43a" />
      <rect x="134" y="82" width="38" height="8" rx="2" fill="#f0a43a" />
      <circle cx="144" cy="96" r="6" fill="#f0a43a" />
      <circle cx="166" cy="96" r="6" fill="#f0a43a" />
    </svg>
  );
}

function ExteriorIcon() {
  return (
    <svg
      viewBox="0 0 220 120"
      className="h-[90px] w-full max-w-[180px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M44 82 L94 56 L162 68 L118 94 Z"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M60 64 L116 34 L176 48 L122 76 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M76 48 L128 22 L188 36 L136 60 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M36 98 H168"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
      />
      <path
        d="M46 104 H178"
        stroke="rgba(34,211,238,0.45)"
        strokeWidth="1"
      />
    </svg>
  );
}