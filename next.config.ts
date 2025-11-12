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
    ]
  }
};

export default nextConfig;
