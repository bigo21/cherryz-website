import type { Metadata } from "next";
import Link from "next/link";
import InkHero from "@/components/site/InkHero";
import { ArrowRightIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
import { CONTACT, QUOTE } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Demande de cotation | Cherryz",
  description:
    "Choisissez votre demande : cotation Internet B2B avec IP publique dédiée, ou cotation WiFi Zone. Formulaire en 3 minutes, réponse sous 48h.",
};

const cards = [
  {
    href: QUOTE.ip,
    Icon: GlobeIcon,
    title: "Internet B2B, IP publique dédiée",
    desc: "Une connexion Internet dédiée pour votre entreprise, avec adresse IP fixe et bande passante garantie.",
  },
  {
    href: QUOTE.wifi,
    Icon: WifiIcon,
    title: "WiFi Zone",
    desc: "Transformez votre immeuble, hôtel ou quartier en point d'accès Internet rentable, clé en main.",
  },
];

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";

export default function Demandes() {
  return (
    <>
      <InkHero
        title="Quelle demande souhaitez-vous faire ?"
        lead="Choisissez le service qui correspond à votre besoin. Le questionnaire prend environ 3 minutes, notre équipe vous recontacte sous 48h."
        facts={["± 3 minutes", "Réponse sous 48h", "Sans engagement"]}
      />

      <section className="pb-24 pt-16 md:pt-20">
        <ul className="mx-auto grid max-w-[1100px] list-none grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:px-12">
          {cards.map(({ href, Icon, title, desc }) => (
            <li key={href}>
              <Link
                href={href}
                className="group sheet-perforated flex h-full flex-col rounded-b-[14px] bg-paper px-6 pb-7 pt-10 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:px-9"
              >
                <h2 className="m-0 flex items-start gap-3 border-b-2 border-navy pb-4 font-condensed text-[28px] font-bold leading-[1.08] sm:text-[30px]">
                  <Icon aria-hidden className="mt-[3px] flex-none text-[26px]" />
                  {title}
                </h2>
                <p className="m-0 mt-4 flex-1 font-sans text-[16.5px] leading-[1.55] text-ink-soft">{desc}</p>
                <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-[10px] bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors group-hover:bg-cherry-dark">
                  Commencer ma demande
                  <ArrowRightIcon aria-hidden className="text-[19px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-[1100px] px-4 text-center font-sans text-[16px] text-ink-soft sm:px-6 md:px-12">
          Vous préférez nous parler directement ?{" "}
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
            Écrivez-nous sur WhatsApp
          </a>{" "}
          ou{" "}
          <a href={CONTACT.emailHref} className={link}>
            envoyez un email
          </a>
          .
        </p>
      </section>
    </>
  );
}
