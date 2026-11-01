"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, quoteHrefFor } from "@/lib/site/site";
import { useLocale, useTranslations } from "next-intl";
import { localize, splitLocale } from "@/lib/i18n/config";
import LangSwitch from "./LangSwitch";

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
      className="fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,border-color] duration-300"
      style={{
        background: solid ? "#101b28" : "transparent",
        boxShadow: solid ? "0 10px 30px -18px rgba(0,0,0,.7)" : "none",
        borderBottomColor: solid ? "rgba(255,255,255,.08)" : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-[18px] md:px-12">
        <Link href={localize(lang, "/")} className="flex items-center" aria-label={t("homeLabel")}>
          <Image
            src="/brand/logo-white@2x.png"
            alt="Cherryz"
            width={91}
            height={32}
            priority
            unoptimized
            className="block h-8 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-[34px] md:flex">
          {NAV_LINKS.map((l) => {
            const active = l.href === path;
            return (
              <Link
                key={l.href}
                href={localize(lang, l.href)}
                aria-current={active ? "page" : undefined}
                className="font-condensed text-[15px] font-semibold tracking-[0.6px] transition-colors"
                style={{ color: active ? "#fff" : "rgba(255,255,255,.72)" }}
              >
                {t(`nav.${l.key}`)}
              </Link>
            );
          })}
          <LangSwitch className="font-condensed text-[15px] font-semibold tracking-[0.6px] text-white/72 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white" />
          <Link
            href={quoteHref}
            className="rounded-full bg-cherry px-[22px] py-3 font-condensed text-[15px] font-semibold tracking-[0.6px] text-white shadow-[0_12px_28px_-14px_rgba(160,4,45,.9)] transition-transform hover:-translate-y-px hover:bg-cherry-dark"
          >
            {t("quoteLabel")} →
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
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className="block h-[2px] w-6 bg-white transition-transform"
            style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-opacity"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-transform"
            style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
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
                className="border-b border-white/5 py-3 font-condensed text-[17px] font-semibold tracking-[0.6px] text-white/85"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
            <LangSwitch long className="border-b border-white/5 py-3 font-condensed text-[17px] font-semibold tracking-[0.6px] text-white/85" />
            <Link
              href={quoteHref}
              className="mt-4 rounded-full bg-cherry px-6 py-3 text-center font-condensed text-[16px] font-semibold tracking-[0.6px] text-white"
            >
              {t("quoteLabel")} →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
