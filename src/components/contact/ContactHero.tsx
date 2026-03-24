"use client";

import { motion, type Variants } from "framer-motion";

const revealUp: Variants = {
    hidden: {
        opacity: 0,
        y: 36,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.1,
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
            duration: 1.3,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

interface ContactHeroProps {
    badge: string;
    title: string;
    subheadline: string;
}

function ContactGlobe() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.65, x: 60, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
                duration: 1.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[320px] w-[320px] md:h-[440px] md:w-[440px]"
        >
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl" />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[7%] rounded-full border border-cyan-300/15"
            />

            <motion.div
                animate={{ rotate: [0, -8, 0, 8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[12%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.05) 22%, rgba(6,12,24,0.95) 58%, rgba(3,7,14,1) 100%)",
                    boxShadow:
                        "inset -30px -40px 80px rgba(0,0,0,0.55), inset 18px 18px 40px rgba(120,220,255,0.08), 0 0 50px rgba(34,211,238,0.08)",
                }}
            >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:34px_34px]" />
                    <div className="absolute inset-[8%] rounded-full border border-white/10" />
                    <div className="absolute inset-[18%] rounded-full border border-white/10" />
                    <div className="absolute inset-[30%] rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
                    <div className="absolute left-[32%] top-0 h-full w-px bg-white/10" />
                    <div className="absolute left-[68%] top-0 h-full w-px bg-white/10" />
                </div>

                <div
                    className="absolute h-[34%] w-[24%] rounded-[45%_55%_40%_60%/40%_55%_45%_60%] bg-cyan-300/8 blur-[1px]"
                    style={{ left: "58%", top: "26%" }}
                />
                <div
                    className="absolute h-[18%] w-[14%] rounded-[50%] bg-cyan-300/8 blur-[1px]"
                    style={{ left: "52%", top: "48%" }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute"
                    style={{ left: "64%", top: "38%" }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.7, 1], opacity: [0.65, 0, 0.65] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0a43a]/45"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-3.5 w-3.5 rounded-full bg-[#f0a43a] shadow-[0_0_20px_rgba(240,164,58,0.9)]"
                    />
                    <div className="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 translate-y-2 bg-gradient-to-b from-[#f0a43a]/80 to-transparent" />
                </motion.div>

                <motion.div
                    animate={{ x: ["-140%", "140%"] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-[22%] rotate-[12deg] bg-white/10 blur-xl"
                />
            </motion.div>
        </motion.div>
    );
}

export default function ContactHero({
    badge,
    title,
    subheadline,
}: ContactHeroProps) {
    const words = title.split(" ");
    const lastWord = words.pop() ?? "";
    const firstPart = words.join(" ");

    return (
        <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-48">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <motion.div
                className="mx-auto grid max-w-7xl w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
            >
                <div>
                    <motion.span
                        variants={revealUp}
                        className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90"
                    >
                        {badge}
                    </motion.span>

                    <motion.h1
                        variants={revealUp}
                        className="mt-8 max-w-5xl text-5xl font-light tracking-tighter text-white md:text-8xl xl:text-9xl"
                    >
                        {firstPart} <br className="hidden md:block" />
                        <span className="font-medium text-[#f0a43a]">{lastWord}</span>
                    </motion.h1>

                    <motion.div
                        variants={lineReveal}
                        className="mt-12 h-px w-32 origin-left bg-cyan-300/60"
                    />

                    <motion.p
                        variants={revealUp}
                        className="mt-12 max-w-2xl text-lg leading-8 text-white/70 md:text-xl md:leading-9"
                    >
                        {subheadline}
                    </motion.p>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                    <ContactGlobe />
                </div>
            </motion.div>

            <div className="pointer-events-none absolute left-6 top-32 h-12 w-12 border-l border-t border-white/10 md:left-10 md:top-48" />
            <div className="pointer-events-none absolute right-6 top-32 h-12 w-12 border-r border-t border-white/10 md:right-10 md:top-48" />
        </section>
    );
}