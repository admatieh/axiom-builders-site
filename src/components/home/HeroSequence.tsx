"use client";

import { useEffect, useRef, useState } from "react";

interface HeroSequenceProps {
  frameCount: number;
}

export default function HeroSequence({ frameCount }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Preload image frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(4, "0");
      img.src = `/frames/frame_${frameIndex}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, [frameCount]);

  // 2. Handle scroll math and canvas drawing local to this specific wrapper
  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const drawImage = (img: HTMLImageElement) => {
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = window.innerWidth * dpr;
      const canvasHeight = window.innerHeight * dpr;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const hRatio = canvasWidth / img.width;
      const vRatio = canvasHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvasWidth - img.width * ratio) / 2;
      const centerShift_y = (canvasHeight - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
      
      // We apply a soft gradient overlay mathematically to merge the bottom of the canvas into the black site structure
      const gradient = ctx.createLinearGradient(0, canvasHeight * 0.7, 0, canvasHeight);
      gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    if (images[0] && images[0].complete) drawImage(images[0]);

    let animationFrameId: number;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate how far we've scrolled inside THIS component wrapper
      const totalScrollable = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      const rawFraction = scrolled / totalScrollable;
      const fraction = Math.max(0, Math.min(1, rawFraction));
      
      setScrollProgress(fraction); // for typography fading

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(fraction * frameCount)
      );

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      animationFrameId = window.requestAnimationFrame(() => {
        if (images[frameIndex] && images[frameIndex].complete) {
          drawImage(images[frameIndex]);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => onScroll(), { passive: true });
    onScroll(); // initial trigger

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images, frameCount]);

  // Typography fade calculations based on scrub depth
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Sticky wrapper that stays locked until the sequence is finished */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505] animate-pulse">
            <p className="text-white text-sm tracking-widest font-mono">LOADING SEQUENCE...</p>
          </div>
        )}

        {/* Cinematic Overlay UI */}
        <div 
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="max-w-7xl mx-auto w-full pt-[10vh]">
            <h1 className="text-7xl md:text-9xl font-light tracking-tighter text-white drop-shadow-2xl">
              Build
              <br />
              <span className="font-bold tracking-tight text-[#00e5ff]">Beyond.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-200 font-light tracking-widest uppercase max-w-lg drop-shadow-lg bg-black/20 p-4 backdrop-blur-sm border-l border-[#00e5ff]">
              Precision engineering meets cinematic architectural execution.
            </p>
          </div>
          
          <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60">
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 mb-4 font-light">Scroll Sequence</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
