import Image from "next/image";
import Link from "next/link";
import { CAL_IP, CAL_WIFI, CONTACT, NAV_LINKS, QUOTE } from "@/lib/site/site";
import { chrome } from "@/content/chrome";
import { localize } from "@/lib/i18n/config";
import { getLang } from "@/lib/i18n/server";
import {
  CalendarIcon,
  ClipboardIcon,
  FacebookIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const colTitle =
  "mb-4 font-condensed text-[15px] font-bold uppercase tracking-[1.4px] text-white/50";
const linkCls =
  "font-sans text-[15.5px] text-white/[0.78] transition-colors hover:text-white";

export default async function SiteFooter() {
  const lang = await getLang();
  const t = chrome[lang].footer;
  const nav = chrome[lang].nav;
  return (
    <footer className="bg-navy px-6 pb-8 pt-16 text-white md:px-0">
      <div className="mx-auto max-w-[1280px] px-0 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-11 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Cherryz"
              width={98}
              height={40}
              className="mb-4 block h-10 w-auto"
            />
            <p className="max-w-[280px] font-sans text-[15.5px] leading-[1.6] text-white/[0.62]">
              {t.tagline}
            </p>
            <p className="mt-[14px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-white">
              {t.slogan}
            </p>
          </div>

          <div>
            <div className={colTitle}>{t.navTitle}</div>
            <div className="flex flex-col gap-[11px]">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={localize(lang, l.href)} className={linkCls}>
                  {nav[l.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={colTitle}>{t.quotesTitle}</div>
            <div className="flex flex-col gap-[11px]">
              <Link href={localize(lang, QUOTE.ip)} className={linkCls}>
                <ClipboardIcon aria-hidden className="mr-1 inline-block align-[-0.14em]" /> {t.quoteIp}
              </Link>
              <Link href={localize(lang, QUOTE.wifi)} className={linkCls}>
                <ClipboardIcon aria-hidden className="mr-1 inline-block align-[-0.14em]" /> {t.quoteWifi}
              </Link>
              <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <CalendarIcon aria-hidden className="mr-1 inline-block align-[-0.14em]" /> {t.callIp}
              </a>
              <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <CalendarIcon aria-hidden className="mr-1 inline-block align-[-0.14em]" /> {t.callWifi}
              </a>
            </div>
          </div>

          <div>
            <div className={colTitle}>{t.contactTitle}</div>
            <div className="flex flex-col gap-[11px] font-sans text-[15px] leading-[1.4] text-white/[0.78]">
              <span>
                <PinIcon className="mr-1 inline-block align-[-0.14em]" /> {t.address}
              </span>
              <a href={CONTACT.phoneHref} className={linkCls}>
                <PhoneIcon className="mr-1 inline-block align-[-0.14em]" />{" "}
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className={linkCls}>
                <MailIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.email}
              </a>
              <a href={CONTACT.siteHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <GlobeIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.site}
              </a>
            </div>
            <div className="mt-4 flex gap-[14px]">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 transition-colors hover:text-white">
                <LinkedInIcon />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 transition-colors hover:text-white">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-5">
            <Link href={localize(lang, "/mentions-legales")} className="font-sans text-[14px] text-white/55 hover:text-white">
              {t.legal}
            </Link>
            <Link href={localize(lang, "/confidentialite")} className="font-sans text-[14px] text-white/55 hover:text-white">
              {t.privacy}
            </Link>
          </div>
          <div className="font-sans text-[14px] text-white/45">
            {t.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
