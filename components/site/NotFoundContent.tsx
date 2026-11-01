import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, ClipboardIcon, GlobeIcon, MailIcon, WifiIcon } from "@/components/site/icons";
import { localize } from "@/lib/i18n/config";
import { QUOTE } from "@/lib/site/site";

// Where a lost visitor most likely wanted to go.
const LINKS = [
  { key: "ip", href: "/internet-b2b", Icon: GlobeIcon },
  { key: "wifi", href: "/wifi-zone", Icon: WifiIcon },
  { key: "quote", href: QUOTE.hub, Icon: ClipboardIcon },
  { key: "contact", href: "/contact", Icon: MailIcon },
] as const;

/** Body of the site's 404 (app/global-not-found.tsx), between the nav and the footer. */
export default async function NotFoundContent() {
  const lang = await getLocale();
  const t = await getTranslations("NotFound");
  return (
    <>
      <header className="bg-navy pb-20 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="m-0 font-condensed text-caption font-semibold uppercase text-on-dark-2">{t("code")}</p>
          <h1 className="mt-3 font-condensed text-display font-bold tracking-tight text-balance">{t("title")}</h1>
          <p className="mt-6 max-w-[65ch] text-lead text-on-dark-2">{t("lead")}</p>
          <Link
            href={localize(lang, "/")}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-cherry px-8 py-4 font-condensed text-lead font-semibold text-white shadow-cherry transition-colors duration-150 ease-out-quint hover:bg-cherry-dark active:scale-[0.97]"
          >
            {t("home")}
            <ArrowRightIcon />
          </Link>
        </div>
      </header>
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance text-navy">{t("linksTitle")}</h2>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map(({ key, href, Icon }) => (
              <li key={key}>
                <Link
                  href={localize(lang, href)}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 text-navy shadow-card transition-colors duration-150 ease-out-quint hover:border-cherry active:scale-[0.97]"
                >
                  <Icon aria-hidden className="text-title-sm text-cherry" />
                  <span className="font-condensed text-title-sm font-semibold">{t(`links.${key}.title`)}</span>
                  <span className="text-small text-ink-2">{t(`links.${key}.desc`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
