import type { Metadata } from "next";
import type { SVGProps } from "react";
import Link from "next/link";
import InkHero, { btnCherry, inkLink } from "@/components/site/InkHero";
import QuoteSheet from "@/components/site/QuoteSheet";
import ContactClose from "@/components/site/ContactClose";
import Reveal from "@/components/site/Reveal";
import { ArrowRightIcon, ClipboardIcon, GlobeIcon, PhoneIcon, PinIcon } from "@/components/site/icons";
import { CAL_IP, QUOTE } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Internet B2B avec IP publique dédiée | Cherryz",
  description:
    "Internet professionnel dédié avec IP fixe, à partir de 45 000 XAF/Mbps/mois. Multi-opérateurs (Camtel, Orange, MTN), installation rapide sans génie civil, IP dédiée incluse, test avant engagement.",
};

const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const Bolt = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>);
const Lock = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>);
const Flask = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M10 2h4v6l4 10a2 2 0 0 1-2 3H8a2 2 0 0 1-2-3l4-10z" /></svg>);
const ShieldCheck = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>);
const Users = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M16 3.1a4 4 0 0 1 0 7.8M8 3.1a4 4 0 0 0 0 7.8" /><circle cx="12" cy="16" r="4" /><path d="M4 21a6 6 0 0 1 16 0" /></svg>);
const Router = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 10v4M18 10v4" /></svg>);
const Server = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>);
const Camera = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 8l12-3 2 6-12 3z" /><path d="M17 11l4 1-1 4M5 14v6M3 20h4" /></svg>);
const Check = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M5 13l4 4L19 7" /></svg>);

const usages = [
  { Icon: Lock, t: "Sécuriser vos VPN inter-agences", d: "Reliez vos sites en toute confidentialité." },
  { Icon: Server, t: "Héberger vos serveurs internes", d: "Accessibles à distance, en toute sécurité." },
  { Icon: PhoneIcon, t: "Call centers & systèmes VoIP", d: "Une voix claire, sans coupure." },
  { Icon: ShieldCheck, t: "Conformité de vos transactions", d: "Indispensable pour vos flux financiers." },
  { Icon: Camera, t: "Vidéosurveillance en temps réel", d: "Vos caméras accessibles où que vous soyez." },
];

const features = [
  { Icon: Users, t: "Multi-opérateurs", d: "On choisit le meilleur réseau pour votre localisation, pas celui d'un fournisseur unique." },
  { Icon: Bolt, t: "Installation rapide", d: "Faisceaux hertziens : pas de génie civil, pas de tranchées." },
  { Icon: Lock, t: "IP dédiée incluse", d: "Votre adresse, rien qu'à vous. Personne d'autre ne la partage." },
  { Icon: Flask, t: "Test en parallèle", d: "Testez sans quitter votre opérateur actuel*." },
  { Icon: GlobeIcon, t: "Couverture nationale", d: "Partout au Cameroun via nos partenaires." },
  { Icon: ShieldCheck, t: "SAV de proximité", d: "Équipe technique réactive, pas un call center distant." },
];

const steps = [
  { Icon: ClipboardIcon, t: "Demande en ligne" },
  { Icon: PhoneIcon, t: "Contact sous 48h" },
  { Icon: PinIcon, t: "Descente gratuite" },
  { Icon: Router, t: "Cotation sur-mesure" },
  { Icon: Bolt, t: "Installation rapide" },
  { Icon: Check, t: "Connecté, vous économisez" },
];

const h2 = "m-0 font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]";
const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12";
const sheet = "sheet-perforated rounded-b-[14px] bg-paper";

export default function InternetB2B() {
  return (
    <>
      <InkHero
        title="Internet dédié. IP fixe."
        lead="Cherryz sélectionne pour vous la meilleure infrastructure parmi nos partenaires opérateurs (Camtel, Orange, MTN) et vous livre une connexion professionnelle avec IP dédiée, sans travaux et sans interruption."
        actions={
          <a href="#comment" className={inkLink}>
            Comment ça marche
          </a>
        }
        facts={["Régulée ART", "IP dédiée incluse", "Installation sans génie civil"]}
      >
        <QuoteSheet path="ip" />
      </InkHero>

      {/* QU'EST-CE QU'UNE IP PUBLIQUE DÉDIÉE */}
      <section className="bg-ground py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-5">
            <h2 className={h2}>Qu&apos;est-ce qu&apos;une IP publique dédiée ?</h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              Votre adresse IP publique, c&apos;est l&apos;identité de votre
              entreprise sur Internet. Elle est indispensable pour faire tourner
              vos outils métier les plus sensibles.
            </p>
            <p className="mt-6 max-w-[52ch] border-l-2 border-navy pl-5 font-sans text-[17.5px] font-semibold leading-[1.55] text-navy">
              Avec Cherryz, votre IP est dédiée : personne d&apos;autre ne la
              partage, et votre bande passante est garantie en permanence.
            </p>
          </Reveal>
          <Reveal className={`${sheet} px-5 pb-6 pt-9 sm:px-9 lg:col-span-7`} delay={0.05}>
            <h3 className="m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]">
              Ce qu&apos;elle vous permet
            </h3>
            <ul className="m-0 list-none p-0">
              {usages.map(({ Icon, t, d }) => (
                <li key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-[18px]">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{t}</div>
                    <p className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CE QUE CHERRYZ VOUS APPORTE */}
      <section className="bg-navy-deep py-20 text-white md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={`${h2} max-w-[22ch]`}>Une connexion pro, sans les contraintes d&apos;un opérateur.</h2>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-6 pt-9 text-navy sm:px-9`} delay={0.05}>
            <dl className="m-0 grid grid-cols-1 gap-x-12 border-t-2 border-navy md:grid-cols-2">
              {features.map(({ Icon, t, d }) => (
                <div key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-5">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <dt className="font-condensed text-[21px] font-bold leading-tight">{t}</dt>
                    <dd className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{d}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">
              *Contrat signé devant notaire requis avant le lancement du test.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="scroll-mt-24 bg-ground py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={h2}>Du premier contact à la connexion.</h2>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-7 pt-9 sm:px-9`} delay={0.05}>
            <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-navy p-0 sm:grid-cols-2 lg:grid-cols-6">
              {steps.map((s, i) => (
                <li key={s.t} className="flex items-center gap-3 border-b border-rule py-5 lg:flex-col lg:items-start lg:gap-4 lg:border-b-0 lg:border-r lg:px-4 lg:py-6 lg:first:pl-0 lg:last:border-r-0">
                  <span className="font-condensed text-[19px] font-bold tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <s.Icon aria-hidden className="text-[24px] text-navy" />
                  <span className="font-condensed text-[20px] font-bold leading-tight text-navy">{s.t}</span>
                </li>
              ))}
            </ol>
            <Link href={QUOTE.ip} className={`${btnCherry} mt-7`}>
              <ClipboardIcon aria-hidden className="text-[20px]" />
              Commencer ma demande
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactClose
        quoteHref={QUOTE.ip}
        callHref={CAL_IP}
        title="Un Internet pro, dédié, à partir de 45 000 XAF/Mbps."
      />
    </>
  );
}
