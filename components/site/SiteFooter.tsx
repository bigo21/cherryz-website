import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { CAL_IP, CAL_WIFI, CONTACT, NAV_LINKS, QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import LangSwitch from "./LangSwitch";
import ExternalLink from "./ExternalLink";
import {
  CalendarIcon,
  ClipboardIcon,
  FacebookIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const colTitle =
  "mb-4 font-condensed text-body font-bold uppercase tracking-widest text-on-dark-2";
// min-h-11: every footer link is a 44px touch target.
const linkCls =
  "inline-flex min-h-11 items-center font-sans text-body text-on-dark-2 transition-colors hover:text-white";

export default async function SiteFooter() {
  const lang = await getLocale();
  const t = await getTranslations("Chrome");
  return (
    <footer className="bg-navy px-6 pb-8 pt-16 text-white md:px-0">
      <div className="mx-auto max-w-7xl px-0 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-11 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/cherryz-logo-blanc.svg"
              alt="Cherryz"
              width={89}
              height={32}
              unoptimized
              className="mb-4 block h-8 w-auto"
            />
            <p className="max-w-md font-sans text-body text-on-dark-2">
              {t("footer.tagline")}
            </p>
            <p className="mt-3 font-condensed text-body font-semibold tracking-wide text-accent-on-dark">
              {t("footer.slogan")}
            </p>
          </div>

          <div>
            <div className={colTitle}>{t("footer.navTitle")}</div>
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={localize(lang, l.href)} className={linkCls}>
                  {t(`nav.${l.key}`)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={colTitle}>{t("footer.quotesTitle")}</div>
            <div className="flex flex-col">
              <Link href={localize(lang, QUOTE.ip)} className={linkCls}>
                <ClipboardIcon className="mr-1 inline-block icon-inline" /> {t("footer.quoteIp")}
              </Link>
              <Link href={localize(lang, QUOTE.wifi)} className={linkCls}>
                <ClipboardIcon className="mr-1 inline-block icon-inline" /> {t("footer.quoteWifi")}
              </Link>
              <ExternalLink href={CAL_IP} className={linkCls}>
                <CalendarIcon className="mr-1 inline-block icon-inline" /> {t("footer.callIp")}
              </ExternalLink>
              <ExternalLink href={CAL_WIFI} className={linkCls}>
                <CalendarIcon className="mr-1 inline-block icon-inline" /> {t("footer.callWifi")}
              </ExternalLink>
            </div>
          </div>

          <div>
            <div className={colTitle}>{t("footer.contactTitle")}</div>
            <div className="flex flex-col font-sans text-body text-on-dark-2">
              <ExternalLink href={CONTACT.mapHref} className={linkCls}>
                <PinIcon className="mr-1 inline-block icon-inline" /> {t("footer.address")}
              </ExternalLink>
              <a href={CONTACT.phoneHref} className={linkCls}>
                <PhoneIcon className="mr-1 inline-block icon-inline" />{" "}
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className={linkCls}>
                <MailIcon className="mr-1 inline-block icon-inline" /> {CONTACT.email}
              </a>
            </div>
            <div className="-ml-3 mt-2 flex gap-1">
              <ExternalLink href={CONTACT.linkedin} icon={false} aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center text-on-dark-2 transition-colors hover:text-white">
                <LinkedInIcon />
              </ExternalLink>
              <ExternalLink href={CONTACT.facebook} icon={false} aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center text-on-dark-2 transition-colors hover:text-white">
                <FacebookIcon />
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-5">
            <Link href={localize(lang, "/mentions-legales")} className="inline-flex min-h-11 items-center font-sans text-small text-on-dark-2 hover:text-white">
              {t("footer.legal")}
            </Link>
            <Link href={localize(lang, "/confidentialite")} className="inline-flex min-h-11 items-center font-sans text-small text-on-dark-2 hover:text-white">
              {t("footer.privacy")}
            </Link>
            <LangSwitch long className="inline-flex min-h-11 items-center font-sans text-small text-on-dark-2 hover:text-white" />
          </div>
          <div className="font-sans text-small text-on-dark-2">
            {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
