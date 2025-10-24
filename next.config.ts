import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force the workspace root to this project to avoid scanning parent directories
    root: "./",
  },
};

export default nextConfig;
