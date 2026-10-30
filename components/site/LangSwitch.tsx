"use client";

import { usePathname } from "next/navigation";
import { chrome } from "@/content/chrome";
import { useLang } from "@/lib/i18n/client";
import { localize, splitLocale } from "@/lib/i18n/config";

/**
 * Link to the current page in the other language. A plain <a>: each language has
 * its own root layout, so the switch is a full page load, never a client
 * transition (a prefetching <Link> across root layouts re-fetches endlessly).
 */
export default function LangSwitch({ className, long = false }: { className?: string; long?: boolean }) {
  const lang = useLang();
  const other = lang === "fr" ? "en" : "fr";
  const t = chrome[lang].switchLang;
  const { path } = splitLocale(usePathname());
  return (
    <a
      href={localize(other, path)}
      hrefLang={other}
      lang={other}
      aria-label={long ? undefined : t.aria}
      className={className}
    >
      {long ? t.label : t.short}
    </a>
  );
}
