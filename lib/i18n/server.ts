import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localize } from "./config";

/** Page metadata with the canonical URL and fr/en alternates. */
export async function pageMetadata(
  path: string,
  meta: { title: string; description: string },
): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Site.og");
  // A page's openGraph replaces its parents', so the share image is set here.
  const image = { url: localize(locale, "/opengraph-image"), width: 1200, height: 630, alt: t("alt") };
  return {
    ...meta,
    alternates: {
      canonical: localize(locale, path),
      languages: { fr: localize("fr", path), en: localize("en", path), "x-default": path },
    },
    openGraph: {
      ...meta,
      type: "website",
      siteName: "Cherryz",
      locale: locale === "en" ? "en_GB" : "fr_FR",
      url: localize(locale, path),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
