import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // output: "export", // Disabled to allow dynamic API routes with MongoDB
  images: {
    unoptimized: true,
  },
};

export default nextConfig;