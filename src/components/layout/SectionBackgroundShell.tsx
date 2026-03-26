"use client";

import React from "react";

export default function SectionBackgroundShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate w-full overflow-hidden bg-black">
      {/* Top transition */}
      <div className="absolute inset-x-0 top-0 h-32 -z-30 pointer-events-none bg-linear-to-b from-black via-[#070b12] to-transparent" />

      {/* Main background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(to_bottom,#05070b_0%,#0a1120_18%,#0a1422_45%,#08101b_100%)]" />

      {/* Depth */}
      <div className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.22)_100%)]" />

      {/* Strong construction-plan square system */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large outer squares */}
        <div className="absolute inset-0 opacity-[0.20] bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1.5px,transparent_1.5px)] bg-size-[120px_120px]" />

        {/* Medium planning grid */}
        <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Fine drafting grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.11)_1px,transparent_1px)] bg-size-[20px_20px]" />

        {/* Faint square fills to make tiles feel more present */}
        <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[240px_240px]" />

        {/* Top blend */}
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/55 to-transparent" />
      </div>

      {children}
    </div>
  );
}