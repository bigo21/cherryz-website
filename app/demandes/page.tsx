import type { Metadata } from "next";
import Link from "next/link";
import { GlobeIcon, WifiIcon } from "@/components/site/icons";
import { CONTACT } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Demande de cotation | Cherryz",
  description:
    "Choisissez votre demande : cotation Internet B2B avec IP publique dédiée, ou cotation WiFi Zone. Formulaire en 3 minutes, réponse sous 48h.",
};

const cards = [
  {
    href: "/demandes/internet-b2b",
    Icon: GlobeIcon,
    eyebrow: "INTERNET · B2B",
    title: "Cotation IP Publique Dédiée",
    desc: "Une connexion Internet dédiée pour votre entreprise, avec adresse IP fixe et bande passante garantie.",
  },
  {
    href: "/demandes/wifi-zone",
    Icon: WifiIcon,
    eyebrow: "INTERNET · REVENUS",
    title: "Cotation WiFi Zone",
    desc: "Transformez votre immeuble, hôtel ou quartier en point d'accès Internet rentable, clé en main.",
  },
];

export default function Demandes() {
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-navy-deep pb-[90px] pt-[150px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[42%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(162,3,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(42% 0,100% 0,100% 100%,14% 100%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-pink shadow-[0_0_10px_1px_#e11d63]" />
            <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">
              DEMANDE DE COTATION
            </span>
          </div>
          <h1 className="m-0 max-w-[760px] font-condensed text-[clamp(38px,5.5vw,56px)] font-bold leading-[1.02] tracking-[-0.4px] text-white">
            Quelle demande souhaitez-vous faire ?
          </h1>
          <p className="mt-[18px] max-w-[600px] font-sans text-[19px] leading-[1.55] text-white/[0.78]">
            Choisissez le service qui correspond à votre besoin. Le formulaire
            prend environ 3 minutes, notre équipe vous recontacte sous 48h.
          </p>
        </div>
      </header>

      {/* CHOIX */}
      <section className="bg-surface pb-[110px] pt-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-7 px-6 md:grid-cols-2 md:px-12">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-[20px] border border-navy/[0.08] bg-white px-[34px] py-10 text-navy shadow-[0_26px_54px_-38px_rgba(16,27,40,.4)] transition-all hover:-translate-y-[6px] hover:shadow-[0_38px_66px_-34px_rgba(16,27,40,.5)]"
            >
              <div className="mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-[15px] bg-cherry/[0.08]">
                <c.Icon className="text-[28px] text-cherry" />
              </div>
              <div className="mb-2 font-condensed text-[12.5px] font-semibold tracking-[1.4px] text-cherry">
                {c.eyebrow}
              </div>
              <h2 className="m-0 font-condensed text-[30px] font-bold leading-[1.08]">{c.title}</h2>
              <p className="mt-3 font-sans text-[16px] leading-[1.55] text-navy/[0.62]">{c.desc}</p>
              <span className="mt-[22px] inline-flex items-center gap-2 font-condensed text-[16px] font-bold tracking-[0.5px] text-cherry">
                Commencer ma demande →
              </span>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-9 max-w-[1100px] px-6 text-center md:px-12">
          <p className="font-sans text-[15px] text-navy/50">
            Vous préférez nous parler directement ?{" "}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-cherry">
              Écrivez-nous sur WhatsApp
            </a>{" "}
            ou{" "}
            <a href={CONTACT.emailHref} className="font-semibold text-cherry">
              envoyez un email
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
