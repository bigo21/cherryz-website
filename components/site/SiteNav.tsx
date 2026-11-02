"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, quoteHrefFor } from "@/lib/site/site";
import { useLocale, useTranslations } from "next-intl";
import { localize, splitLocale } from "@/lib/i18n/config";
import LangSwitch from "./LangSwitch";
import { ArrowRightIcon } from "./icons";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const lang = useLocale();
  const t = useTranslations("Chrome");
  const { path } = splitLocale(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = openOn === pathname;

  // Escape closes the mobile menu and gives the focus back to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const quoteHref = localize(lang, quoteHrefFor(path));

  return (
    <nav
      data-surface="dark"
      className={`fixed inset-x-0 top-0 z-100 border-b transition duration-300 ${solid ? "border-white/10 bg-navy shadow-card" : "border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <Link href={localize(lang, "/")} className="flex min-h-11 items-center" aria-label={t("homeLabel")}>
          <Image
            src="/brand/cherryz-logo-blanc.svg"
            alt=""
            aria-hidden
            width={89}
            height={32}
            loading="eager"
            unoptimized
            className="block h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const active = l.href === path;
            return (
              <Link
                key={l.href}
                href={localize(lang, l.href)}
                aria-current={active ? "page" : undefined}
                className="font-condensed text-body font-semibold tracking-wide text-on-dark-2 decoration-accent-on-dark decoration-2 underline-offset-8 transition-colors hover:text-white aria-current-page:text-white aria-current-page:underline"
              >
                {t(`nav.${l.key}`)}
              </Link>
            );
          })}
          <LangSwitch className="font-condensed text-body font-semibold tracking-wide text-on-dark-2 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white" />
          <Link
            href={quoteHref}
            className="rounded-full bg-cherry px-6 py-3 font-condensed text-body font-semibold tracking-wide text-white shadow-cherry transition hover:bg-cherry-dark active:scale-[0.97]"
          >
            {t("quoteLabel")}<ArrowRightIcon className="ml-2" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-label={open ? t("menuClose") : t("menuOpen")}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div id="menu-mobile" className="border-t border-white/10 bg-navy px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={localize(lang, l.href)}
                aria-current={l.href === path ? "page" : undefined}
                className="border-b border-white/5 py-3 font-condensed text-lead font-semibold tracking-wide text-on-dark-2"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
            <LangSwitch long className="border-b border-white/5 py-3 font-condensed text-lead font-semibold tracking-wide text-on-dark-2" />
            <Link
              href={quoteHref}
              className="mt-4 rounded-full bg-cherry px-6 py-3 text-center font-condensed text-body font-semibold tracking-wide text-white"
            >
              {t("quoteLabel")}<ArrowRightIcon className="ml-2" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
