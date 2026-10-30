import type { Metadata } from "next";
import Link from "next/link";
import InkHero from "@/components/site/InkHero";
import { ArrowRightIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
import { CONTACT, QUOTE } from "@/lib/site/site";
import { getLocale, getTranslations } from "next-intl/server";
import { localize } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Quote.hub.meta");
  return pageMetadata("/demandes", { title: t("title"), description: t("description") });
}

const cards = [
  { key: "ip", href: QUOTE.ip, Icon: GlobeIcon },
  { key: "wifi", href: QUOTE.wifi, Icon: WifiIcon },
] as const;

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";

export default async function Demandes() {
  const lang = await getLocale();
  const t = await getTranslations("Quote.hub");
  return (
    <>
      <InkHero
        title={t("title")}
        lead={t("lead")}
        facts={(["duration", "reply", "commitment"] as const).map((k) => t(`facts.${k}`))}
      />

      <section className="pb-24 pt-16 md:pt-20">
        <ul className="mx-auto grid max-w-[1100px] list-none grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:px-12">
          {cards.map(({ key, href, Icon }) => (
            <li key={href}>
              <Link
                href={localize(lang, href)}
                className="group sheet-perforated flex h-full flex-col rounded-b-[14px] bg-paper px-6 pb-7 pt-10 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:px-9"
              >
                <h2 className="m-0 flex items-start gap-3 border-b-2 border-navy pb-4 font-condensed text-[28px] font-bold leading-[1.08] sm:text-[30px]">
                  <Icon aria-hidden className="mt-[3px] flex-none text-[26px]" />
                  {t(`${key}.title`)}
                </h2>
                <p className="m-0 mt-4 flex-1 font-sans text-[16.5px] leading-[1.55] text-ink-soft">{t(`${key}.desc`)}</p>
                <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-[10px] bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors group-hover:bg-cherry-dark">
                  {t("start")}
                  <ArrowRightIcon aria-hidden className="text-[19px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-[1100px] px-4 text-center font-sans text-[16px] text-ink-soft sm:px-6 md:px-12">
          {t("direct")}{" "}
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
            {t("whatsapp")}
          </a>{" "}
          {t("or")}{" "}
          <a href={CONTACT.emailHref} className={link}>
            {t("email")}
          </a>
          .
        </p>
      </section>
    </>
  );
}
