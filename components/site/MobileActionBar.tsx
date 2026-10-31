"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CONTACT, quoteHrefFor } from "@/lib/site/site";
import { localize, splitLocale } from "@/lib/i18n/config";
import { WhatsAppIcon } from "./icons";

/**
 * Mobile-only bottom bar: the quote questionnaire for the current page + WhatsApp.
 * Slides in once the visitor has scrolled past the hero (whose own CTA covers the top).
 */
export default function MobileActionBar() {
  const { path } = splitLocale(usePathname());
  const lang = useLocale();
  const t = useTranslations("Chrome");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-navy/[0.97] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgba(0,0,0,.6)] transition-transform duration-300 ease-out md:hidden"
        style={{ transform: visible ? "none" : "translateY(110%)" }}
        aria-hidden={!visible}
        inert={!visible}
      >
        <div className="flex gap-3">
          <Link
            href={localize(lang, quoteHrefFor(path))}
            className="flex-1 rounded-full bg-cherry-alt px-5 py-[13px] text-center font-condensed text-[16px] font-semibold tracking-[0.5px] text-white"
          >
            {t("quoteLabel")} →
          </Link>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsappAria")}
            className="flex flex-none items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-[13px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-white"
          >
            <WhatsAppIcon className="h-[18px] w-[18px] text-whatsapp" />
            WhatsApp
          </a>
        </div>
      </div>
      {/* Keeps the footer's last line clear of the bar. */}
      <div aria-hidden className="h-[76px] bg-navy md:hidden" />
    </>
  );
}
