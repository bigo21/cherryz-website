import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ContactForm from "@/components/contact/ContactForm";
import { clientMessages } from "@/lib/i18n/client-messages";
import { ArrowRightIcon, CalendarIcon, ClipboardIcon, ExternalIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/site/icons";
import ExternalLink from "@/components/site/ExternalLink";
import { CAL_IP, CAL_WIFI, CONTACT, QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact.meta");
  return pageMetadata("/contact", { title: t("title"), description: t("description") });
}


export default async function Contact() {
  const lang = await getLocale();
  const t = await getTranslations("Contact");
  const coords = [
    { Icon: PinIcon, k: t("coords.address"), v: t("coords.addressValue"), href: CONTACT.mapHref },
    { Icon: PhoneIcon, k: t("coords.phone"), v: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { Icon: WhatsAppIcon, k: t("coords.whatsapp"), v: CONTACT.phoneDisplay, href: CONTACT.whatsapp },
    { Icon: MailIcon, k: t("coords.email"), v: CONTACT.email, href: CONTACT.emailHref },
  ];
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-navy pb-18 pt-38">
        <div className="absolute right-0 top-0 z-0 size-16 md:bottom-0 md:h-auto md:w-2/5 diagonal-cherry" />
        <div className="relative z-1 mx-auto max-w-7xl px-6 md:px-12">
          <p className="mb-6 font-condensed text-caption font-semibold uppercase text-on-dark-2">{t("hero.eyebrow")}</p>
          <h1 className="m-0 font-condensed text-display font-bold tracking-tight text-balance text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-[65ch] font-sans text-lead text-on-dark-2">
            {t("hero.lead")}
          </p>
        </div>
      </header>

      {/* FORM + SIDEBAR */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto mb-10 max-w-7xl px-6 md:px-12">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white px-8 py-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ClipboardIcon className="mt-1 flex-none size-6 text-cherry" />
              <div>
                <h2 className="m-0 font-condensed text-title-sm font-bold">{t("price.title")}</h2>
                <p className="mt-1 max-w-[65ch] font-sans text-body text-ink-2">
                  {t("price.lead")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: t("price.ip"), href: QUOTE.ip },
                { label: t("price.wifi"), href: QUOTE.wifi },
              ].map((q) => (
                <Link
                  key={q.href}
                  href={localize(lang, q.href)}
                  className="rounded-full bg-cherry px-6 py-3 font-condensed text-body font-semibold tracking-wide text-white transition hover:bg-cherry-dark active:scale-[0.97]"
                >
                  {q.label}<ArrowRightIcon className="ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <NextIntlClientProvider messages={await clientMessages("Chrome", "Contact.form", "Validation")}>
              <ContactForm />
            </NextIntlClientProvider>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-navy px-8 py-8 text-white">
              <div className="absolute -right-10 -top-10 h-38 w-38 rounded-full glow-cherry" />
              <div className="relative">
                <h3 className="mb-5 font-condensed text-title-sm font-bold">{t("coords.title")}</h3>
                <div className="flex flex-col gap-4">
                  {coords.map((c) => (
                    <div key={c.k} className="flex items-start gap-3">
                      <span className="text-lead text-on-dark-2">
                        <c.Icon className="icon-inline" />
                      </span>
                      {/* A link wraps its label too: one touch target of at least 44px. */}
                      {c.href.startsWith("http") ? (
                        <ExternalLink href={c.href} icon={false} className="group block min-h-11">
                          <span className="block font-condensed text-small font-semibold tracking-wide text-on-dark-2">{c.k}</span>
                          <span className="block font-sans text-body text-white transition-colors group-hover:text-accent-on-dark">
                            {c.v}
                            <ExternalIcon className="ml-1 icon-inline text-small" />
                          </span>
                        </ExternalLink>
                      ) : (
                        <a href={c.href} className="group block min-h-11">
                          <span className="block font-condensed text-small font-semibold tracking-wide text-on-dark-2">{c.k}</span>
                          <span className="block font-sans text-body text-white transition-colors group-hover:text-accent-on-dark">{c.v}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white px-8 py-7">
              <h3 className="mb-2 font-condensed text-title-sm font-bold">{t("booking.title")}</h3>
              <p className="mb-4 font-sans text-small text-ink-2">
                {t("booking.lead")}
              </p>
              {[
                { label: t("booking.ip"), href: CAL_IP },
                { label: t("booking.wifi"), href: CAL_WIFI },
              ].map((rdv, i) => (
                <ExternalLink
                  key={rdv.label}
                  href={rdv.href}
                  icon={false}
                  className={`flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-4 transition-colors hover:border-cherry hover:bg-white ${i === 0 ? "mb-3" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <CalendarIcon className="size-5 text-navy" />
                    <span className="font-condensed text-lead font-bold text-navy">{rdv.label}</span>
                  </span>
                  <ExternalIcon className="size-4 text-cherry" />
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
