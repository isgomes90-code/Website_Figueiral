import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [68, 72, 75, 82],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  async redirects() {
    return [
      {
        source: "/lp/figueiral-lda/reservas-pt",
        destination: "/pt/reservations",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
