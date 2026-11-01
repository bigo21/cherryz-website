"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CONTACT, quoteHrefFor } from "@/lib/site/site";
import { localize, splitLocale } from "@/lib/i18n/config";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";
import ExternalLink from "./ExternalLink";

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
        data-surface="dark"
        className={`fixed inset-x-0 bottom-0 z-90 border-t border-white/10 bg-navy/95 px-4 pb-safe pt-3 shadow-card transition-transform duration-300 md:hidden ${visible ? "" : "translate-y-full"}`}
        aria-hidden={!visible}
        inert={!visible}
      >
        <div className="flex gap-3">
          <Link
            href={localize(lang, quoteHrefFor(path))}
            className="flex-1 rounded-full bg-cherry px-5 py-3 text-center font-condensed text-body font-semibold tracking-wide text-white"
          >
            {t("quoteLabel")}<ArrowRightIcon className="ml-2" />
          </Link>
          <ExternalLink
            href={CONTACT.whatsapp}
            aria-label={t("whatsappAria")}
            className="flex flex-none items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 font-condensed text-body font-semibold tracking-wide text-white"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            WhatsApp
          </ExternalLink>
        </div>
      </div>
      {/* Keeps the footer's last line clear of the bar. */}
      <div aria-hidden className="h-19 bg-navy md:hidden" />
    </>
  );
}
