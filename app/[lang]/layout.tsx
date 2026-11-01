import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/lib/i18n/config";
import { clientMessages } from "@/lib/i18n/client-messages";
import { SITE_URL } from "@/lib/site/site";
import { fontVariables } from "@/lib/fonts";
import RevealObserver from "@/components/site/RevealObserver";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Site.meta");
  return { metadataBase: new URL(SITE_URL), title: t("title"), description: t("description") };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        {/* Client components of the chrome (nav, mobile bar, language switch) only need Chrome. */}
        <NextIntlClientProvider messages={await clientMessages("Chrome")}>{children}</NextIntlClientProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
