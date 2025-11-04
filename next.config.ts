import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'ac.goit.global' }],
  },
  reactStrictMode: true,
};

export default nextConfig;
