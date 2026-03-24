import { ReactNode } from "react";

interface SurfaceProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}

export default function Surface({ level = 2, children, className = "" }: SurfaceProps) {
  // Surface 1: Clear Glass (Calm areas)
  // Surface 2: Supported Glass (Standard cards)
  // Surface 3: Solid Premium Panel (Noisy background overlay)
  
  const baseClasses = "relative overflow-hidden transition-all duration-500 rounded-sm";
  
  const levelClasses = {
    1: "bg-white/5 backdrop-blur-sm border border-white/10 text-white shadow-lg",
    2: "bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-xl",
    3: "bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 text-white shadow-2xl",
  };

  return (
    <div className={`${baseClasses} ${levelClasses[level]} ${className}`}>
      {children}
    </div>
  );
}
