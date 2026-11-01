import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NotFoundContent from "@/components/site/NotFoundContent";
import { LOCALE_HEADER, defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { fontVariables } from "@/lib/fonts";
import { clientMessages } from "@/lib/i18n/client-messages";
import "./globals.css";

// The site's 404, for every URL no page answers. It renders outside app/[lang]
// (see next.config.ts), so it sets its own locale, styles, fonts and chrome.
async function requestLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER) ?? "";
  return hasLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: await requestLocale(), namespace: "NotFound" });
  return { title: t("metaTitle") };
}

export default async function GlobalNotFound() {
  const locale = await requestLocale();
  setRequestLocale(locale);
  const t = await getTranslations("Chrome");
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider messages={await clientMessages("Chrome")}>
          <a
            href="#contenu"
            className="sr-only z-50 rounded-full bg-white px-5 py-3 font-condensed font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {t("skip")}
          </a>
          <SiteNav />
          <main id="contenu">
            <NotFoundContent />
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
