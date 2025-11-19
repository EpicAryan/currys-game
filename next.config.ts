import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zmcpuafumcwgueedzmrq.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      }
    ],
    qualities: [70, 75, 80, 85, 90, 100],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
