import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Cherryz — Vous connecte !",
  description:
    "Cherryz, votre courtier en connectivité Internet au Cameroun : Internet professionnel avec IP publique dédiée et WiFi Zone monétisable, au meilleur prix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
