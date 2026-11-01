import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import { CalendarIcon, ClipboardIcon, ExternalIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/site/icons";
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
    { Icon: PinIcon, k: t("coords.address"), v: t("coords.addressValue"), href: undefined },
    { Icon: PhoneIcon, k: t("coords.phone"), v: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { Icon: WhatsAppIcon, k: t("coords.whatsapp"), v: CONTACT.phoneDisplay, href: CONTACT.whatsapp },
    { Icon: MailIcon, k: t("coords.email"), v: CONTACT.email, href: CONTACT.emailHref },
  ];
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-navy pb-[70px] pt-[150px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[42%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(160,4,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(42% 0,100% 0,100% 100%,14% 100%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-on-dark shadow-[0_0_10px_1px_var(--color-accent-on-dark)]" />
            <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">{t("hero.eyebrow")}</span>
          </div>
          <h1 className="m-0 font-condensed text-[clamp(42px,6vw,66px)] font-bold leading-[0.98] tracking-[-0.4px] text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-[18px] max-w-[560px] font-sans text-[19px] leading-[1.55] text-white/[0.78]">
            {t("hero.lead")}
          </p>
        </div>
      </header>

      {/* FORM + SIDEBAR */}
      <section className="bg-surface pb-[100px] pt-20">
        <div className="mx-auto mb-10 max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col gap-5 rounded-[20px] border border-navy/[0.08] bg-white px-[30px] py-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-[14px]">
              <ClipboardIcon className="mt-[2px] flex-none text-[26px] text-cherry" />
              <div>
                <h2 className="m-0 font-condensed text-[22px] font-bold">{t("price.title")}</h2>
                <p className="mt-1 font-sans text-[15.5px] text-navy/70">
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
                  className="rounded-full bg-cherry px-[22px] py-3 font-condensed text-[16px] font-semibold tracking-[0.5px] text-white transition-colors hover:bg-cherry-dark"
                >
                  {q.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-[1.35fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-[18px]">
            <div className="relative overflow-hidden rounded-[20px] bg-navy px-[30px] py-8 text-white">
              <div className="absolute -right-10 -top-10 h-[150px] w-[150px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.4),transparent 68%)" }} />
              <div className="relative">
                <h3 className="mb-5 font-condensed text-[24px] font-bold">{t("coords.title")}</h3>
                <div className="flex flex-col gap-4">
                  {coords.map((c) => (
                    <div key={c.k} className="flex items-start gap-[13px]">
                      <span className="text-[19px] leading-[1.3] text-white/80">
                        <c.Icon className="align-[-0.14em]" />
                      </span>
                      {/* A link wraps its label too: one touch target of at least 44px. */}
                      {c.href?.startsWith("http") ? (
                        <ExternalLink href={c.href} icon={false} className="group block min-h-11">
                          <span className="block font-condensed text-[13px] font-semibold tracking-[0.8px] text-white/50">{c.k}</span>
                          <span className="block font-sans text-[15.5px] text-white transition-colors group-hover:text-accent-on-dark">
                            {c.v}
                            <ExternalIcon className="ml-1 inline-block align-baseline text-small" />
                          </span>
                        </ExternalLink>
                      ) : c.href ? (
                        <a href={c.href} className="group block min-h-11">
                          <span className="block font-condensed text-[13px] font-semibold tracking-[0.8px] text-white/50">{c.k}</span>
                          <span className="block font-sans text-[15.5px] text-white transition-colors group-hover:text-accent-on-dark">{c.v}</span>
                        </a>
                      ) : (
                        <div>
                          <div className="font-condensed text-[13px] font-semibold tracking-[0.8px] text-white/50">{c.k}</div>
                          <div className="font-sans text-[15.5px] text-white">{c.v}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-navy/[0.08] bg-white px-[30px] py-7">
              <h3 className="mb-[6px] font-condensed text-[22px] font-bold">{t("booking.title")}</h3>
              <p className="mb-[18px] font-sans text-[14.5px] text-navy/60">
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
                  className={`flex items-center justify-between gap-3 rounded-xl border border-navy/[0.08] bg-surface px-[18px] py-4 transition-colors hover:border-cherry hover:bg-white ${i === 0 ? "mb-3" : ""}`}
                >
                  <span className="flex items-center gap-[11px]">
                    <CalendarIcon className="text-[20px] text-navy" />
                    <span className="font-condensed text-[17px] font-bold text-navy">{rdv.label}</span>
                  </span>
                  <ExternalIcon className="text-[18px] text-cherry" />
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
