"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NavbarProps {
  companyName: {
    first: string;
    last: string;
  };
  navItems: {
    label: string;
    href: string;
  }[];
}

export default function Navbar({ companyName, navItems }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8 md:py-6 pointer-events-auto">
      <motion.div
        initial={false}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-7xl"
      >
        <motion.nav
          initial={false}
          animate={{
            paddingTop: scrolled ? "0.85rem" : "1rem",
            paddingBottom: scrolled ? "0.85rem" : "1rem",
            paddingLeft: scrolled ? "1rem" : "1.25rem",
            paddingRight: scrolled ? "1rem" : "1.25rem",
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "relative flex items-center justify-between overflow-hidden border backdrop-blur-xl transition-colors duration-500",
            scrolled
              ? "border-white/12 bg-black/45 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
              : "border-white/8 bg-black/18",
          ].join(" ")}
        >
          {/* subtle blueprint texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:36px_36px]" />
          </div>

          {/* top accent rule */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0" />

          <Link
            href="/"
            className="relative z-10 flex items-center gap-3 text-white"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-300/80" />
            <span className="text-xl font-semibold uppercase tracking-[0.28em] md:text-2xl">
              {companyName.first}
              <span className="ml-1 font-light text-white/55">{companyName.last}</span>
            </span>
          </Link>

          <ul className="relative z-10 hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.24em] text-white/72 transition-colors duration-300 hover:text-cyan-300"
                >
                  <span className="text-white/28 transition-colors duration-300 group-hover:text-[#f0a43a]">
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-cyan-300/80 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* mobile button placeholder */}
          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-black/25 text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-300 md:hidden"
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
        </motion.nav>
      </motion.div>
    </header>
  );
}