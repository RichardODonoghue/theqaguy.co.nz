import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    webpackMemoryOptimizations: true,
    reactCompiler: true,
  },
};

export default nextConfig;
