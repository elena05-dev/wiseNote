import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'ac.goit.global' }],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};
export default nextConfig;
