import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { IS_PRODUCTION, remainingPlaceholders } from "./lib/site/placeholders";

// No provisional content in production (lib/site/placeholders.ts, docs/lot-5-contenus-provisoires.md).
if (IS_PRODUCTION && remainingPlaceholders().length > 0) {
  throw new Error(`Contenus provisoires restants, build de production refusé :\n- ${remainingPlaceholders().join("\n- ")}`);
}

const nextConfig: NextConfig = {
  // app/global-not-found.tsx: the root layout is the dynamic app/[lang], so the
  // site's 404 has to be rendered at the routing level.
  experimental: { globalNotFound: true },
  images: {
    // AVIF first (smaller), WebP for older browsers. 50 is for photos shown
    // under a veil (hero backgrounds), 75 is Next's default.
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75],
    // Next's defaults, plus 1280 and 1440 for full-width heroes on laptops, without
    // 3840: no source photo is wider than 1920px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1440, 1920, 2048],
  },
};

export default createNextIntlPlugin()(nextConfig);
