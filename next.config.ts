import type { NextConfig } from "next";

const repo = "axiom-builders-site";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;