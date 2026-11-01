import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // app/global-not-found.tsx: the root layout is the dynamic app/[lang], so the
  // site's 404 has to be rendered at the routing level.
  experimental: { globalNotFound: true },
  images: {
    // AVIF first (smaller), WebP for older browsers. 50 is for photos shown
    // under a veil (hero backgrounds), 75 is Next's default.
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75],
  },
};

export default createNextIntlPlugin()(nextConfig);
