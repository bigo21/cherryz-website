import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import LangSwitch from "@/components/site/LangSwitch";
import ExternalLink from "@/components/site/ExternalLink";
import { MailIcon, WhatsAppIcon } from "@/components/site/icons";
import { localize } from "@/lib/i18n/config";
import { CONTACT } from "@/lib/site/site";
import MaintenanceIllustration from "./MaintenanceIllustration";

export default async function MaintenanceScreen() {
  const lang = await getLocale();
  const t = await getTranslations("Maintenance");
  const tc = await getTranslations("Chrome");
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white">
      {/* Decorative halos + diagonal band */}
      <div className="absolute -right-35 -top-45 z-0 h-155 w-155 rounded-full opacity-80 glow-cherry" />
      <div className="absolute -bottom-55 -left-40 z-0 h-140 w-140 rounded-full opacity-40 glow-cherry" />
      <div className="absolute right-0 top-0 z-0 size-16 md:bottom-0 md:h-auto md:w-2/5 opacity-15 diagonal-cherry" />

      {/* Illustration : calque d'arrière-plan, anchored right, does not affect the text width */}
      <div className="pointer-events-none absolute inset-y-0 -right-10 z-1 hidden items-center lg:flex">
        <div className="w-160 animate-fade xl:w-240">
          <MaintenanceIllustration />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-2 flex flex-wrap items-center gap-4 px-6 md:px-12 pt-8">
        <Image
          src="/brand/cherryz-logo-blanc.svg"
          alt="Cherryz"
          width={100}
          height={36}
          loading="eager"
          unoptimized
          className="block h-9 w-auto"
        />
        <LangSwitch long className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center font-condensed text-body font-semibold tracking-wide text-on-dark-2 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white" />
      </header>

      {/* Content */}
      <div className="relative z-2 flex w-full flex-1 items-center px-6 md:px-12 py-10">
        <div className="w-full max-w-none lg:max-w-2xl">
          <h1 className="sr-only">{t("title")}</h1>
          <p className="mt-6 max-w-[65ch] font-sans text-lead text-on-dark-2">
            {t("body")}
          </p>

          <p className="mb-3 mt-8 font-condensed text-caption font-semibold uppercase text-on-dark-2">
            {t("wait")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={localize(lang, "/demandes/internet-b2b")}
              className="inline-flex items-center gap-2 rounded-full bg-cherry px-7 py-4 font-condensed text-lead font-bold tracking-wide text-white shadow-cherry transition hover:bg-cherry-dark active:scale-[0.97]"
            >
              {t("ip")}
            </Link>
            <Link
              href={localize(lang, "/demandes/wifi-zone")}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-7 py-4 font-condensed text-lead font-bold tracking-wide text-white transition hover:border-white hover:bg-white/10 active:scale-[0.97]"
            >
              {t("wifi")}
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="mb-3 font-condensed text-caption font-semibold uppercase text-on-dark-2">
              {t("direct")}
            </p>
            <div className="flex flex-wrap gap-3">
              <ExternalLink
                href={CONTACT.whatsapp}
                icon={false}
                className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-white transition hover:border-accent-on-dark hover:bg-white/10 active:scale-[0.97]"
              >
                <WhatsAppIcon className="size-7 text-whatsapp" />
                <span>
                  <span className="block font-condensed text-caption font-semibold uppercase text-on-dark-2">
                    {t("whatsappLabel")}
                  </span>
                  <span className="font-sans text-body font-semibold">
                    {CONTACT.phoneDisplay}
                  </span>
                </span>
              </ExternalLink>
              <a
                href={CONTACT.emailHref}
                className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-white transition hover:border-accent-on-dark hover:bg-white/10 active:scale-[0.97]"
              >
                <MailIcon className="size-7 text-accent-on-dark" />
                <span>
                  <span className="block font-condensed text-caption font-semibold uppercase text-on-dark-2">
                    {t("emailLabel")}
                  </span>
                  <span className="font-sans text-body font-semibold">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-2 px-6 md:px-12 pb-10 pt-6 text-center">
        <span className="font-condensed text-lead font-semibold tracking-wide text-accent-on-dark">
          {tc("footer.slogan")}
        </span>
      </footer>
    </main>
  );
}
