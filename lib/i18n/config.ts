// Locales of the site. French is served at the root (/internet-b2b), English
// under /en (/en/internet-b2b); proxy.ts rewrites French URLs to /fr internally.

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Copy for one piece of UI, in every locale. English must mirror the French shape. */
export type Localized<T> = Record<Locale, T>;

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

export const htmlLang: Record<Locale, string> = { fr: "fr", en: "en" };
