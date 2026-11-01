import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // app/global-not-found.tsx: the root layout is the dynamic app/[lang], so the
  // site's 404 has to be rendered at the routing level.
  experimental: { globalNotFound: true },
};

export default createNextIntlPlugin()(nextConfig);
