import Image from "next/image";
import Link from "next/link";
import LangSwitch from "@/components/site/LangSwitch";
import { chrome } from "@/content/chrome";
import { quote } from "@/content/quote";
import { localize } from "@/lib/i18n/config";
import { getLang } from "@/lib/i18n/server";

// Standalone "mini-site" chrome for the quote request flow (/demandes).
// Independent from the marketing nav/footer so it works even during maintenance.
export default async function DemandesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  const t = chrome[lang];
  return (
    <div className="min-h-screen bg-ground">
      <nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-navy">
        <div className="relative mx-auto flex max-w-[1280px] items-center justify-center px-4 py-[18px] sm:px-6 md:px-12">
          <Link href={localize(lang, "/")} aria-label={quote[lang].homeLabel}>
            <Image
              src="/brand/logo-white.png"
              alt="Cherryz"
              width={93}
              height={38}
              priority
              className="block h-[38px] w-auto"
            />
          </Link>
          <LangSwitch className="absolute right-4 font-condensed text-[15px] font-semibold tracking-[0.06em] text-white/72 underline decoration-white/30 underline-offset-4 hover:text-white sm:right-6 md:right-12" />
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-navy px-4 py-9 text-center">
        <span className="font-condensed text-[16px] font-semibold tracking-[0.02em] text-white">
          {t.footer.slogan}
        </span>
        <div className="mt-2 font-sans text-[13px] text-white/60">
          {t.footer.rights}
          <span aria-hidden> · </span>
          <Link href={localize(lang, "/mentions-legales")} className="hover:text-white">{t.footer.legal}</Link>
          <span aria-hidden> · </span>
          <Link href={localize(lang, "/confidentialite")} className="hover:text-white">{t.footer.privacyShort}</Link>
        </div>
      </footer>
    </div>
  );
}
