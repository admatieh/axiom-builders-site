"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const revealUp: Variants = {
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
      duration: 0.85,
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

interface FooterProps {
  companyName: {
    first: string;
    last: string;
  };
  description: string;
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
  contact: {
    email: string;
    phone: string;
    address: string[];
    status: string;
  };
}

export default function Footer({
  companyName,
  description,
  metrics,
  links,
  contact,
}: FooterProps) {
  return (
    <footer className="relative isolate w-full overflow-hidden px-6 pb-10 pt-24 md:px-10 md:pb-12 md:pt-28">
      {/* Same background system */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_35%),linear-gradient(to_top,rgba(4,8,14,0.98),rgba(8,12,20,0.94),rgba(8,12,20,0.88))]" />

      {/* Same blueprint grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[70px_70px]" />
      </div>

      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* top label */}
        <motion.div variants={revealUp} className="mb-10 md:mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
            Final Registry
          </span>
        </motion.div>

        {/* main footer panel */}
        <div className="relative overflow-hidden border border-white/10 bg-black/35 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%)]" />

          {/* top technical line */}
          <motion.div
            variants={lineReveal}
            className="absolute left-0 right-0 top-0 h-px origin-left bg-linear-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
          />

          <div className="relative z-10 px-6 py-10 md:px-10 md:py-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              {/* brand */}
              <motion.div variants={revealUp} className="md:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-300/80" />
                  <h2 className="text-2xl font-semibold uppercase tracking-[0.28em] text-white md:text-3xl">
                    {companyName.first}
                    <span className="ml-1 font-light text-white/55">{companyName.last}</span>
                  </h2>
                </div>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/60 md:text-[15px]">
                  {description}
                </p>

                <div className="mt-8 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
                  {metrics.map((item) => (
                    <div
                      key={item.label}
                      className="border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="text-xl font-light tracking-tight text-white">
                        {item.value}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/38">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* company links */}
              <motion.div variants={revealUp} className="md:col-span-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                  Company
                </p>

                <div className="mt-6 flex flex-col gap-4 text-sm uppercase tracking-[0.18em] text-white/72">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* contact */}
              <motion.div variants={revealUp} className="md:col-span-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                  Contact Registry
                </p>

                <div className="mt-6 space-y-4 text-sm text-white/72">
                  <a
                    href={`mailto:${contact.email}`}
                    className="block transition-colors hover:text-cyan-300"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="block transition-colors hover:text-cyan-300"
                  >
                    {contact.phone}
                  </a>
                  <p className="pt-2 leading-7 text-white/50">
                    {contact.address.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < contact.address.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <div className="mt-8 inline-flex items-center gap-3 border border-white/10 bg-black/20 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[#f0a43a]" />
                  {contact.status}
                </div>
              </motion.div>
            </div>

            {/* middle rule */}
            <motion.div
              variants={lineReveal}
              className="mt-10 h-px origin-left bg-white/10"
            />

            {/* bottom strip */}
            <motion.div
              variants={revealUp}
              className="mt-6 flex flex-col gap-4 text-[10px] uppercase tracking-[0.25em] text-white/30 md:flex-row md:items-center md:justify-between"
            >
              <span>© {new Date().getFullYear()} Axiom Builders</span>
              <span>Precision · Delivery · Structural Clarity · Long-Term Value</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}