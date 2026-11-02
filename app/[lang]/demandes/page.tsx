import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
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
      <header className="relative overflow-hidden bg-navy pb-22 pt-38">
        <div className="absolute right-0 top-0 z-0 size-16 md:bottom-0 md:h-auto md:w-2/5 diagonal-cherry" />
        <div className="relative z-1 mx-auto max-w-7xl px-6 md:px-12">
          <p className="mb-6 font-condensed text-caption font-semibold uppercase text-on-dark-2">{t("eyebrow")}</p>
          <h1 className="m-0 max-w-3xl font-condensed text-title-lg font-bold tracking-tight text-balance text-white">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl font-sans text-lead text-on-dark-2">
            {t("lead")}
          </p>
        </div>
      </header>

      {/* CHOIX */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-6 md:grid-cols-2 md:px-12">
          {cards.map((c) => (
            <Link
              key={c.key}
              href={localize(lang, c.href)}
              className="block rounded-2xl border border-line bg-white px-8 py-10 text-navy shadow-card transition-all hover:-translate-y-1 active:scale-[0.97]"
            >
              <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-2xl bg-cherry/10">
                <c.Icon className="size-7 text-cherry" />
              </div>
              <div className="mb-2 font-condensed text-caption font-semibold uppercase text-cherry">
                {t(`${c.key}.eyebrow`)}
              </div>
              <h2 className="m-0 font-condensed text-title-md font-bold">{t(`${c.key}.title`)}</h2>
              <p className="mt-3 font-sans text-body text-ink-2">{t(`${c.key}.desc`)}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-condensed text-body font-bold tracking-wide text-cherry">
                {t("start")}<ArrowRightIcon />
              </span>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-9 max-w-6xl px-6 text-center md:px-12">
          <p className="font-sans text-body text-ink-2">
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
