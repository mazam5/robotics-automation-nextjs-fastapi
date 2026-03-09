import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'armatrix.in',
      },
    ],
  },
};

export default nextConfig;
