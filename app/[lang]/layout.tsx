import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { htmlLang, locales } from "@/lib/i18n/config";
import { LangProvider } from "@/lib/i18n/client";
import { getLang } from "@/lib/i18n/server";
import "../globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const META = {
  fr: {
    title: "Cherryz — Vous connecte !",
    description:
      "Cherryz, votre courtier en connectivité Internet au Cameroun : Internet professionnel avec IP publique dédiée et WiFi Zone monétisable, au meilleur prix.",
  },
  en: {
    title: "Cherryz — Gets you connected!",
    description:
      "Cherryz, your Internet connectivity broker in Cameroon: business Internet with a dedicated public IP and revenue-generating WiFi Zones, at the best price.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return { metadataBase: new URL("https://cherryz.tech"), ...META[await getLang()] };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  return (
    <html lang={htmlLang[lang]} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
