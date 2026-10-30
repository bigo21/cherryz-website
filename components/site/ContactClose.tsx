import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/site/site";
import { chrome } from "@/content/chrome";
import { localize } from "@/lib/i18n/config";
import { getLang } from "@/lib/i18n/server";
import { Stamp } from "./QuoteSheet";
import { ArrowRightIcon, CalendarIcon, ClipboardIcon, PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Closing band shared by every page: Yaoundé photo, the stamp as countersign,
 * and the three ways to reach a person (questionnaire, WhatsApp, phone).
 */
export default async function ContactClose({
  quoteHref,
  callHref,
  title,
  lead,
}: {
  quoteHref: string;
  callHref?: string;
  title?: string;
  lead?: string;
}) {
  const lang = await getLang();
  const t = chrome[lang].close;
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[300px] lg:min-h-[600px]">
          <Image
            src="/photos/refonte/yaounde-nlongkak.jpg"
            alt={t.photoAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="px-4 py-16 sm:px-6 md:px-12 lg:py-20 lg:pr-16 xl:pr-[calc((100vw-1280px)/2+48px)] 2xl:pr-[128px]">
          <div className="max-w-[560px]">
            <div className="flex items-start justify-between gap-6">
              <h2 className="m-0 max-w-[17ch] font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] text-white [text-wrap:balance]">{title ?? t.title}</h2>
              <Stamp className="hidden h-[92px] w-[92px] flex-none text-white/85 sm:block" />
            </div>
            <p className="mt-6 max-w-[48ch] font-sans text-[17.5px] leading-[1.6] text-white/80">{lead ?? t.lead}</p>
            <div className="mt-10 flex flex-col gap-3">
              <Link
                href={localize(lang, quoteHref)}
                data-primary-cta
                className="flex items-center justify-between gap-4 rounded-[10px] bg-cherry px-6 py-5 font-condensed text-[20px] font-semibold tracking-[0.01em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="flex items-center gap-3">
                  <ClipboardIcon aria-hidden className="text-[22px]" /> {t.quote}
                </span>
                <ArrowRightIcon aria-hidden className="flex-none text-[19px]" />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-primary-cta
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-[10px] border-[1.5px] border-white/25 px-6 py-5 font-condensed text-[20px] font-semibold text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="flex items-center gap-3">
                  <WhatsAppIcon aria-hidden className="text-[22px] text-whatsapp" /> {t.whatsapp}
                </span>
                <span className="font-sans text-[16px] font-medium tabular-nums text-white/75">{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT.phoneHref}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-[10px] border-[1.5px] border-white/25 px-6 py-5 font-condensed text-[20px] font-semibold text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="flex items-center gap-3">
                  <PhoneIcon aria-hidden className="text-[22px]" /> {t.call}
                </span>
                <span className="font-sans text-[16px] font-medium tabular-nums text-white/75">{CONTACT.phoneDisplay}</span>
              </a>
            </div>
            {callHref && (
              <a
                href={callHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-sans text-[15.5px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
              >
                <CalendarIcon aria-hidden className="text-[18px]" />
                {t.booking}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
