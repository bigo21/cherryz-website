import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import InkHero from "@/components/site/InkHero";
import { ArrowRightIcon, CalendarIcon, ClipboardIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/site/icons";
import { CAL_IP, CAL_WIFI, CONTACT, QUOTE } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Contact | Cherryz",
  description:
    "Parlons de votre projet : devis Internet B2B, WiFi Zone ou toute autre demande. Réponse sous 24h, déplacement gratuit partout au Cameroun. Basés à Yaoundé.",
};

const coords = [
  { Icon: PinIcon, k: "Adresse", v: CONTACT.address, href: undefined },
  { Icon: PhoneIcon, k: "Téléphone", v: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { Icon: WhatsAppIcon, k: "WhatsApp", v: CONTACT.phoneDisplay, href: CONTACT.whatsapp },
  { Icon: MailIcon, k: "Email", v: CONTACT.email, href: CONTACT.emailHref },
  { Icon: GlobeIcon, k: "Site web", v: CONTACT.site, href: CONTACT.siteHref },
];

const quotes = [
  { label: "Devis Internet B2B", href: QUOTE.ip },
  { label: "Devis WiFi Zone", href: QUOTE.wifi },
];

const calls = [
  { label: "Internet B2B", href: CAL_IP },
  { label: "WiFi Zone", href: CAL_WIFI },
];

const sheet = "sheet-perforated rounded-b-[14px] bg-paper";
const h3 = "m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]";
const rowLink =
  "flex items-center justify-between gap-4 border-b border-rule py-4 font-condensed text-[20px] font-bold text-navy transition-colors hover:text-cherry focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export default function Contact() {
  return (
    <>
      <InkHero
        title="Parlons de votre projet."
        lead="Une question, un devis, une idée de WiFi Zone ? Notre équipe vous répond sous 24h et se déplace gratuitement, partout au Cameroun."
        facts={["Réponse sous 24h", "Déplacement gratuit", "Basés à Yaoundé"]}
      >
        <div className={`${sheet} px-5 pb-6 pt-9 text-navy sm:px-9 lg:mt-6`}>
          <h2 className={h3}>Besoin d&apos;un prix ?</h2>
          <p className="m-0 mt-4 font-sans text-[16.5px] leading-[1.55] text-ink-soft">
            Le questionnaire de devis prend 3 minutes et nous donne tout ce
            qu&apos;il faut pour vous chiffrer. Réponse sous 48h.
          </p>
          <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0 sm:flex-row">
            {quotes.map((q) => (
              <li key={q.href} className="sm:flex-1">
                <Link
                  href={q.href}
                  data-primary-cta
                  className="flex items-center justify-between gap-3 rounded-[10px] bg-cherry px-5 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardIcon aria-hidden className="text-[20px]" />
                    {q.label}
                  </span>
                  <ArrowRightIcon aria-hidden className="flex-none text-[18px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </InkHero>

      <section className="bg-ground py-20 md:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-4 sm:px-6 md:px-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className={`${sheet} px-5 pb-6 pt-9 sm:px-9 lg:col-span-5`}>
            <h2 className={h3}>Nos coordonnées</h2>
            <dl className="m-0">
              {coords.map(({ Icon, k, v, href }) => (
                <div key={k} className="grid grid-cols-[28px_1fr] items-start gap-x-3 border-b border-rule py-4">
                  <Icon aria-hidden className="mt-[3px] text-[19px] text-navy" />
                  <div>
                    <dt className="font-condensed text-[15px] font-semibold tracking-[0.06em] text-ink-soft">{k}</dt>
                    <dd className="m-0 mt-[2px] font-sans text-[16px] text-navy">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
                        >
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <h2 className={`${h3} mt-10`}>Réserver un créneau</h2>
            <p className="m-0 mt-4 font-sans text-[16px] text-ink-soft">
              Prenez rendez-vous en ligne, directement avec l&apos;équipe.
            </p>
            <ul className="m-0 mt-2 list-none p-0">
              {calls.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={rowLink}>
                    <span className="flex items-center gap-3">
                      <CalendarIcon aria-hidden className="text-[20px]" />
                      {c.label}
                    </span>
                    <ArrowRightIcon aria-hidden className="flex-none text-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
