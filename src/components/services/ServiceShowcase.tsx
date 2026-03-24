"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

const panelReveal: Variants = {
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

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    clipPath: "inset(0% 100% 0% 0%)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  intro: string;
  description: string;
  deliverables: string[];
  image: string;
}

interface ServiceShowcaseProps {
  services: ServiceDetail[];
}

export default function ServiceShowcase({ services }: ServiceShowcaseProps) {
  return (
    <section className="relative w-full py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-32 md:gap-56">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24 ${
                  isEven ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Content Side */}
                <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <motion.span
                    variants={panelReveal}
                    className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-300/80"
                  >
                    Service {service.num}
                  </motion.span>
                  
                  <motion.h3
                    variants={panelReveal}
                    className="mt-6 text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl"
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    variants={panelReveal}
                    className="mt-8 text-base font-medium tracking-wide text-[#f0a43a]"
                  >
                    {service.intro}
                  </motion.p>

                  <motion.p
                    variants={panelReveal}
                    className="mt-6 text-lg leading-8 text-white/60"
                  >
                    {service.description}
                  </motion.p>

                  <motion.div
                    variants={panelReveal}
                    className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="group flex items-start gap-4">
                        <div className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300/40 transition-colors group-hover:bg-cyan-300" />
                        <span className="text-sm tracking-wide text-white/50 transition-colors group-hover:text-white/80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Decorative Visual Side */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <motion.div
                    variants={imageReveal}
                    className="group relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl md:aspect-square"
                  >
                    {/* Real Image Layer */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    </div>

                    {/* Framing Layer */}
                    <div className="absolute inset-0 z-10 p-8 md:p-12">
                      <div className="relative h-full w-full border border-white/10 transition-colors duration-500 group-hover:border-cyan-300/30">
                        <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-cyan-300/30 transition-all duration-500 group-hover:h-16 group-hover:w-16 group-hover:border-cyan-300/60" />
                        <div className="absolute right-6 bottom-6 h-12 w-12 border-r border-b border-[#f0a43a]/30 transition-all duration-500 group-hover:h-16 group-hover:w-16 group-hover:border-[#f0a43a]/60" />
                        
                        {/* Technical markings */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.5em] text-white/10 transition-colors duration-500 group-hover:text-cyan-300/30">
                          Axiom · System · {service.id}
                        </div>

                        {/* Status chip */}
                        <div className="absolute right-6 top-6 border border-white/10 bg-black/60 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/40 backdrop-blur-md">
                          Verified Site Data
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
