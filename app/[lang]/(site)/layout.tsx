import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import MobileActionBar from "@/components/site/MobileActionBar";
import { chrome } from "@/content/chrome";
import { getLang } from "@/lib/i18n/server";

// Shared chrome for the public marketing site (Accueil, Internet B2B, WiFi Zone, Contact).
// The nav is fixed/transparent and overlays each page's dark hero.
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = chrome[await getLang()];
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[200] rounded-[10px] bg-white px-5 py-3 font-condensed font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skip}
      </a>
      <SiteNav />
      <main id="contenu">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
