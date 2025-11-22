import type { NextConfig } from "next";
import { withPlausibleProxy } from 'next-plausible'

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
    qualities: [70, 75, 80, 85, 90, 95, 100],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default withPlausibleProxy()(nextConfig);
