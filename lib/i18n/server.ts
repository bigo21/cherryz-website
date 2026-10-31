import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localize } from "./config";

/** Page metadata with the canonical URL and fr/en alternates. */
export async function pageMetadata(
  path: string,
  meta: { title: string; description: string },
): Promise<Metadata> {
  const locale = await getLocale();
  return {
    ...meta,
    alternates: {
      canonical: localize(locale, path),
      languages: { fr: localize("fr", path), en: localize("en", path), "x-default": path },
    },
    openGraph: { ...meta, locale: locale === "en" ? "en_GB" : "fr_FR", url: localize(locale, path) },
  };
}
