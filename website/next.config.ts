import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/メインページ",
        permanent: true,
      },
    ];
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
