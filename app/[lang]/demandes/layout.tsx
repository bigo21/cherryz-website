import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LangSwitch from "@/components/site/LangSwitch";
import { localize } from "@/lib/i18n/config";

// Standalone "mini-site" chrome for the quote request flow (/demandes).
// Independent from the marketing nav/footer so it works even during maintenance.
export default async function DemandesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLocale();
  const t = await getTranslations("Chrome");
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed inset-x-0 top-0 z-100 border-b border-white/10 bg-navy shadow-card">
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-4 md:px-12">
          <Link href={localize(lang, "/")} aria-label={t("homeLabel")} className="flex min-h-11 items-center">
            <Image
              src="/brand/cherryz-logo-blanc.svg"
              alt=""
              aria-hidden
              width={89}
              height={32}
              loading="eager"
              unoptimized
              className="block h-8 w-auto"
            />
          </Link>
          <LangSwitch className="absolute right-6 inline-flex min-h-11 min-w-11 items-center justify-center font-condensed text-body font-semibold tracking-wide text-on-dark-2 underline decoration-white/30 underline-offset-4 hover:text-white md:right-12" />
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-navy py-9 text-center">
        <span className="font-condensed text-body font-semibold tracking-wide text-accent-on-dark">
          {t("footer.slogan")}
        </span>
        <div className="mt-2 font-sans text-caption tracking-normal text-on-dark-2">
          {t("footer.rights")}
          <span aria-hidden> · </span>
          <Link href={localize(lang, "/mentions-legales")} className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-white">{t("footer.legal")}</Link>
          <span aria-hidden> · </span>
          <Link href={localize(lang, "/confidentialite")} className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-white">{t("footer.privacyShort")}</Link>
        </div>
      </footer>
    </div>
  );
}
