import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { GlobeIcon, WifiIcon } from "@/components/site/icons";
import ExternalLink from "@/components/site/ExternalLink";
import { CONTACT, QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Quote.hub.meta");
  return pageMetadata(QUOTE.hub, { title: t("title"), description: t("description") });
}

// Copy of each card lives under `Quote.hub.<key>` in messages.
const cards = [
  { key: "ip", href: QUOTE.ip, Icon: GlobeIcon },
  { key: "wifi", href: QUOTE.wifi, Icon: WifiIcon },
] as const;

export default async function Demandes() {
  const lang = await getLocale();
  const t = await getTranslations("Quote.hub");
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-navy pb-[90px] pt-[150px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[42%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(162,3,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(42% 0,100% 0,100% 100%,14% 100%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-on-dark shadow-[0_0_10px_1px_#e11d63]" />
            <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">
              {t("eyebrow")}
            </span>
          </div>
          <h1 className="m-0 max-w-[760px] font-condensed text-[clamp(38px,5.5vw,56px)] font-bold leading-[1.02] tracking-[-0.4px] text-white">
            {t("title")}
          </h1>
          <p className="mt-[18px] max-w-[600px] font-sans text-[19px] leading-[1.55] text-white/[0.78]">
            {t("lead")}
          </p>
        </div>
      </header>

      {/* CHOIX */}
      <section className="bg-surface pb-[110px] pt-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-7 px-6 md:grid-cols-2 md:px-12">
          {cards.map((c) => (
            <Link
              key={c.key}
              href={localize(lang, c.href)}
              className="block rounded-[20px] border border-navy/[0.08] bg-white px-[34px] py-10 text-navy shadow-[0_26px_54px_-38px_rgba(16,27,40,.4)] transition-all hover:-translate-y-[6px] hover:shadow-[0_38px_66px_-34px_rgba(16,27,40,.5)]"
            >
              <div className="mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-[15px] bg-cherry/[0.08]">
                <c.Icon className="text-[28px] text-cherry" />
              </div>
              <div className="mb-2 font-condensed text-[12.5px] font-semibold tracking-[1.4px] text-cherry">
                {t(`${c.key}.eyebrow`)}
              </div>
              <h2 className="m-0 font-condensed text-[30px] font-bold leading-[1.08]">{t(`${c.key}.title`)}</h2>
              <p className="mt-3 font-sans text-[16px] leading-[1.55] text-navy/[0.62]">{t(`${c.key}.desc`)}</p>
              <span className="mt-[22px] inline-flex items-center gap-2 font-condensed text-[16px] font-bold tracking-[0.5px] text-cherry">
                {t("start")} →
              </span>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-9 max-w-[1100px] px-6 text-center md:px-12">
          <p className="font-sans text-[15px] text-navy/50">
            {t("direct")}{" "}
            <ExternalLink href={CONTACT.whatsapp} className="font-semibold text-cherry">
              {t("whatsapp")}
            </ExternalLink>{" "}
            {t("or")}{" "}
            <a href={CONTACT.emailHref} className="font-semibold text-cherry">
              {t("email")}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
