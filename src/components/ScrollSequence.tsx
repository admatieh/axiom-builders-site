"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSequenceProps {
  frameCount: number;
}

export default function ScrollSequence({ frameCount }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 1. Preload all image frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Preload sequentially to ensure all frames are available
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format to 4 digits: 0001, 0002...
      const frameIndex = i.toString().padStart(4, "0");
      img.src = `/frames/frame_${frameIndex}.png`; // Adjust extension as needed

      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      // Handle missing images safely
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [frameCount]);

  // 2. Handle drawing and scroll progress
  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize performance
    if (!ctx) return;

    const drawImage = (img: HTMLImageElement) => {
      // Use devicePixelRatio for full quality rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      
      // Set physical canvas size
      const canvasWidth = window.innerWidth * dpr;
      const canvasHeight = window.innerHeight * dpr;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Ensure object-fit: cover equivalent in canvas
      const hRatio = canvasWidth / img.width;
      const vRatio = canvasHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvasWidth - img.width * ratio) / 2;
      const centerShift_y = (canvasHeight - img.height * ratio) / 2;

      // Draw the image onto the canvas smoothly at full physical resolution
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // Draw frame 0 immediately
    if (images[0] && images[0].complete) {
      drawImage(images[0]);
    }

    let animationFrameId: number;

    const onScroll = () => {
      // Map global scroll offset to frame index
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

      // Avoid division by zero
      if (maxScrollTop <= 0) return;

      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));

      // Determine the exact frame index based on scroll position
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      // Debounce and sync draw to monitor refresh rate using rAF
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        if (images[frameIndex] && images[frameIndex].complete) {
          drawImage(images[frameIndex]);
        }
      });
    };

    const onResize = () => {
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images, frameCount]);

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] -z-10 bg-black pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Simple loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black animate-pulse">
          <p className="text-white text-sm tracking-widest font-mono">LOADING SEQUENCE...</p>
        </div>
      )}
    </div>
  );
}
