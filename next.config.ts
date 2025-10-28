import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
