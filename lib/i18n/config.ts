// Locales of the site. French is served at the root (/internet-b2b), English
// under /en (/en/internet-b2b); proxy.ts rewrites French URLs to /fr internally.

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Request header set by proxy.ts with the locale of the URL (read by the global 404). */
export const LOCALE_HEADER = "x-chz-locale";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Public URL of an internal path in a locale: "/contact" → "/en/contact" in English. */
export function localize(lang: Locale, path: string): string {
  if (lang === defaultLocale || !path.startsWith("/")) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Split a pathname (public or rewritten) into its locale and the locale-free path. */
export function splitLocale(pathname: string | null): { lang: Locale; path: string } {
  const p = pathname || "/";
  for (const l of locales) {
    if (p === `/${l}`) return { lang: l, path: "/" };
    if (p.startsWith(`/${l}/`)) return { lang: l, path: p.slice(l.length + 1) };
  }
  return { lang: defaultLocale, path: p };
}
