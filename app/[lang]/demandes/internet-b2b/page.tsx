import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import QuoteWizard from "@/components/quote/QuoteWizard";
import { clientMessages } from "@/lib/i18n/client-messages";
import { ArrowLeftIcon, GlobeIcon } from "@/components/site/icons";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Quote.ip.meta");
  return pageMetadata(QUOTE.ip, { title: t("title"), description: t("description") });
}

export default async function DemandeInternetB2B() {
  const lang = await getLocale();
  const t = await getTranslations("Quote");
  return (
    <>
      <header className="relative overflow-hidden bg-navy pb-15 pt-35">
        <div className="absolute right-0 top-0 z-0 size-16 md:bottom-0 md:h-auto md:w-2/5 diagonal-cherry" />
        <div className="relative z-1 mx-auto max-w-4xl px-6">
          <Link
            href={localize(lang, QUOTE.hub)}
            className="mb-2 inline-flex min-h-11 items-center gap-2 font-condensed text-small font-semibold tracking-wide text-on-dark-2 transition-colors hover:text-white"
          >
            <ArrowLeftIcon />
            {t("back")}
          </Link>
          <p className="mb-4 flex items-center gap-2 font-condensed text-caption font-semibold uppercase text-on-dark-2">
            <GlobeIcon className="size-4" />
            {t("ip.eyebrow")}
          </p>
          <h1 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance text-white">
            {t("ip.title")}
          </h1>
          <p className="mt-3 font-sans text-lead text-on-dark-2">
            {[t("ip.facts.duration"), t("ip.facts.reply"), t("ip.facts.commitment")].join(" · ")}
          </p>
        </div>
      </header>

      <section className="pb-20 pt-12 md:pb-28">
        <div className="mx-auto -mt-10 max-w-2xl px-6">
          <NextIntlClientProvider messages={await clientMessages("Chrome", "Quote.wizard", "Questionnaire.ip", "Validation")}>
            <QuoteWizard type="ip" />
          </NextIntlClientProvider>
        </div>
      </section>
    </>
  );
}
