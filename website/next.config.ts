import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
