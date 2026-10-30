import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { hasLocale, localize, type Locale } from "./config";

/** The current locale, read from the [lang] root segment. */
export async function getLang(): Promise<Locale> {
  const l = await rootLang();
  if (!hasLocale(l)) notFound();
  return l;
}

/** Page metadata with canonical URL and fr/en alternates. */
export function pageMetadata(
  lang: Locale,
  path: string,
  meta: { title: string; description: string },
): Metadata {
  return {
    ...meta,
    alternates: {
      canonical: localize(lang, path),
      languages: { fr: localize("fr", path), en: localize("en", path), "x-default": path },
    },
    openGraph: { ...meta, locale: lang === "en" ? "en_GB" : "fr_FR", url: localize(lang, path) },
  };
}
