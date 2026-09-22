import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hides the round "N" Next.js dev-tools button shown during `npm run dev`.
  // It never appears on the live (production) site.
  devIndicators: false,
  images: {
    // Every image is pre-generated as WebP at 400/800/1200px in /public and served with a
    // hand-built srcset (see components/pack-shot.tsx), so the runtime optimiser is off.
    // It was failing intermittently on mobile and would only re-encode files that are
    // already optimised.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/products/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
