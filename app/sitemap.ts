import type { MetadataRoute } from "next";
import { localize } from "@/lib/i18n/config";
import { QUOTE, SITE_URL } from "@/lib/site/site";

// Public pages, each listed in French with its English alternate.
const PAGES = [
  "/",
  "/internet-b2b",
  "/wifi-zone",
  "/contact",
  QUOTE.hub,
  QUOTE.ip,
  QUOTE.wifi,
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (lang: "fr" | "en", path: string) => `${SITE_URL}${localize(lang, path)}`;
  return PAGES.map((path) => ({
    url: url("fr", path),
    alternates: { languages: { fr: url("fr", path), en: url("en", path) } },
  }));
}
