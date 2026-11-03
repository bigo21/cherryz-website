import type { Metadata } from "next";
import type { ReactNode, SVGProps } from "react";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import Reveal from "@/components/site/Reveal";
import Countdown from "@/components/bizlink/Countdown";
import BizlinkForm from "@/components/bizlink/BizlinkForm";
import { CAMEROON, MAP_VIEWBOX, RELAYS } from "@/components/bizlink/cameroon";
import { CheckLineIcon, ClipboardIcon, PhoneIcon, WifiIcon } from "@/components/site/icons";
import { BIZLINK } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "BizLink : l'Internet professionnel par onde radio | Cherryz",
  description:
    "BizLink : jusqu'à 250 Mbps par onde radio, plus de 99 % de disponibilité et une adresse IP publique. Offre de lancement à 75 000 XAF par mois pour les écoles, microfinances et hôtels 1 à 2 étoiles. Étude de faisabilité gratuite.",
};

const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const Mast = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 21V9M8 21h8M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6.5 11a8 8 0 0 1 0-8M17.5 11a8 8 0 0 0 0-8" /></svg>);

const stats = [
  { v: "99 %+", t: "de disponibilité" },
  { v: "10 à 250", t: "Mbps selon le forfait" },
  { v: "IP publique", t: "pour contrôler votre réseau" },
  { v: "0 câble", t: "à tirer : tout passe par onde radio" },
];

const offerItems: ReactNode[] = [
  "De 10 à 250 Mbps, par onde radio",
  "Plus de 99 % de disponibilité",
  "Adresse IP publique incluse",
  "Installation après une étude de faisabilité gratuite",
  <strong key="engagement">Engagement de 3 ans</strong>,
];

const equipment = [
  { k: "Tout de suite", d: "275 000 XAF au départ (75 000 + 200 000), puis 75 000 par mois, sur 3 ans." },
  { k: "En 4 fois", d: "75 000 + 50 000 par mois pendant 4 mois, puis 75 000 par mois, sur 3 ans." },
  { k: "Pas payé", d: "75 000 par mois seulement. En cas de résiliation, les 200 000 XAF de matériel sont dus." },
];

const compare = [
  { k: "Chez certains fournisseurs", v: "Plusieurs millions", w: "w-full", cls: "bg-navy-deep/75 text-white" },
  { k: "BizLink hors promo", v: "150 000 à 1 500 000", w: "w-[46%]", cls: "bg-navy text-white" },
  { k: "BizLink Promo", v: "75 000", w: "w-[24%]", cls: "bg-white text-cherry-deep", strong: true },
];

const steps = [
  { Icon: ClipboardIcon, t: "Vous remplissez le formulaire", d: "Une minute suffit." },
  { Icon: PhoneIcon, t: "Un conseiller vous appelle", d: "Il vous explique BizLink et répond à vos questions." },
  { Icon: Mast, t: "Notre équipe fait l'étude sur place", d: "Votre étude de faisabilité, gratuite." },
  { Icon: WifiIcon, t: "Si votre site est éligible, c'est parti", d: "Vous signez, nous installons l'antenne et activons votre connexion." },
];

const plans = [
  { name: "Start", price: "150 000", debit: "2 à 40 Mbps" },
  { name: "Pro", price: "450 000", debit: "7 à 150 Mbps" },
  { name: "Premium", price: "750 000", debit: "10 à 250 Mbps", featured: true },
  { name: "Elite", price: "1 500 000", debit: "25 à 450 Mbps" },
];

const faq = [
  { q: "L'étude est-elle vraiment gratuite ?", a: "Oui. Nous venons sur place, sans frais, et vous saurez si votre site est éligible." },
  { q: "Mon site sera-t-il couvert ?", a: "Nous avons des points relais partout au Cameroun. L'étude gratuite confirme votre éligibilité." },
  { q: "Combien coûte le matériel ?", a: "200 000 XAF : payables tout de suite, en 4 fois, ou dus en cas de résiliation si non payés." },
  { q: "Y a-t-il un engagement ?", a: "Oui, 3 ans, en promo comme hors promo." },
  { q: "À quoi sert l'adresse IP publique ?", a: "Caméras, accès à distance, serveurs, VPN : un meilleur contrôle de votre réseau." },
];

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckLineIcon className="mt-[3px] flex-none text-[18px] text-accent-vivid" />
      <span>{children}</span>
    </li>
  );
}

/** Rooftop antenna receiving the signal of the nearest relay point. */
function RadioArt() {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Antenne sur le toit d'une entreprise qui reçoit le signal d'un point relais par onde radio" className="block h-auto w-full">
      <defs>
        <linearGradient id="bz-d2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#101b28" /><stop offset="1" stopColor="#3a0a1c" /></linearGradient>
        <pattern id="bz-win2" width="16" height="22" patternUnits="userSpaceOnUse"><rect x="4" y="5" width="7" height="10" fill="#fff" /></pattern>
      </defs>
      <rect width="800" height="500" fill="url(#bz-d2)" />
      <path d="M0 420 Q 160 360 330 410 T 640 430 L800 430 L800 500 L0 500Z" fill="#0b131d" />
      <g stroke="#cfd3d9" strokeWidth="3" fill="none"><path d="M96 440 L112 300 L128 440" /><path d="M101 400 L123 400 M105 355 L119 355" /><path d="M101 400 L119 355 M123 400 L105 355" /></g>
      <circle cx="112" cy="292" r="5" fill="#ff254f" />
      <text x="112" y="474" fill="#cfd3d9" fontFamily="var(--font-barlow), sans-serif" fontSize="16" textAnchor="middle">Point relais</text>
      <rect x="470" y="330" width="290" height="140" fill="#0b131d" />
      <rect x="470" y="330" width="290" height="140" fill="url(#bz-win2)" opacity=".12" />
      <rect x="462" y="320" width="306" height="12" fill="#101b28" />
      <line x1="615" y1="320" x2="615" y2="230" stroke="#cfd3d9" strokeWidth="5" />
      <rect x="603" y="204" width="24" height="56" rx="4" fill="#e2e3e5" />
      <g fill="none" stroke="#ff254f" strokeWidth="3" strokeLinecap="round">
        <path d="M570 232 A46 46 0 0 0 570 278" opacity=".95" /><path d="M536 212 A90 90 0 0 0 536 298" opacity=".7" /><path d="M500 190 A140 140 0 0 0 500 318" opacity=".45" /><path d="M462 170 A190 190 0 0 0 462 340" opacity=".25" />
      </g>
      <path d="M590 236 Q 360 210 124 296" fill="none" stroke="#ff254f" strokeWidth="2" strokeDasharray="3 10" opacity=".8" />
      <text x="615" y="494" fill="#cfd3d9" fontFamily="var(--font-barlow), sans-serif" fontSize="16" textAnchor="middle">Votre entreprise</text>
    </svg>
  );
}

/** Cameroon with an illustrative network of relay points. */
function CoverageArt() {
  const [hx, hy] = RELAYS[0];
  return (
    <svg viewBox={MAP_VIEWBOX} role="img" aria-label="Carte stylisée du Cameroun avec un réseau de points relais" className="mx-auto block h-auto max-h-[520px] w-full p-8">
      <path d={CAMEROON} fill="#16253a" stroke="#3a4c66" strokeWidth="4" strokeLinejoin="round" />
      <g stroke="#ff254f" strokeWidth="3" opacity=".45" fill="none">
        {RELAYS.slice(1).map(([x, y]) => (
          <line key={`${x}-${y}`} x1={hx} y1={hy} x2={x} y2={y} />
        ))}
      </g>
      <g fill="#ff254f">
        {RELAYS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="14" />
        ))}
      </g>
    </svg>
  );
}

export default function Bizlink() {
  return (
    <>
      <PageHero
        eyebrow="OFFRE DE LANCEMENT · ANTENNES EN NOMBRE LIMITÉ"
        image="/illustrations/bizlink-hero.svg"
        imageAlt=""
        minHeight={780}
        imageOpacity="opacity-80"
        title={
          <>
            L&apos;Internet professionnel ultra haut débit
            <br />
            <span className="text-accent-vivid">75 000 XAF par mois.</span>
          </>
        }
        subtitle="BizLink c'est jusqu'à 250 Mbps à votre entreprise par onde radio, avec plus de 99 % de disponibilité et une adresse IP publique. Offre réservée aux écoles, microfinances et hôtels 1 à 2 étoiles."
        beforeActions={
          <div className="mt-[30px]">
            <Countdown />
            <p className="mt-[22px] flex items-center justify-center gap-2 font-condensed text-[17px] font-bold tracking-[0.3px] text-white">
              <CheckLineIcon className="flex-none text-accent-vivid" />
              L&apos;étude est gratuite.
            </p>
          </div>
        }
        actions={
          <>
            <a href="#formulaire" className={btnPrimary}>
              Demandez votre étude →
            </a>
            <a href="#forfaits" className={btnGhost}>
              Voir toutes les offres ↓
            </a>
          </>
        }
        afterActions={
          <p className="mx-auto mt-[22px] max-w-[520px] font-sans text-[15px] leading-[1.55] text-white/70">
            Des points relais partout au Cameroun. Étude de faisabilité gratuite
            sur place : vous saurez rapidement si vous êtes éligible.
          </p>
        }
      />

      {/* CHIFFRES CLÉS */}
      <section aria-label="Chiffres clés" className="bg-navy">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-6 md:px-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.v}
              className={`py-7 pr-5 ${i % 2 ? "border-l border-white/[0.1] pl-5" : ""} ${i === 2 ? "lg:border-l lg:border-white/[0.1] lg:pl-5" : ""}`}
            >
              <b className="block font-condensed text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] text-white">{s.v}</b>
              <span className="font-sans text-[15px] text-white/70">{s.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="scroll-mt-20 bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="max-w-[760px]">
            <SectionEyebrow label="BIZLINK" />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Une connexion pour les entreprises exigeantes.
            </h2>
            <p className="mt-[18px] max-w-[620px] font-sans text-[18px] leading-[1.6] text-navy/[0.68]">
              Call centers, hôtels, microfinances, écoles : BizLink est faite pour
              les usages où chaque coupure coûte de l&apos;argent.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 items-center gap-[56px] lg:grid-cols-[1.15fr_1fr]">
            <Reveal className="overflow-hidden rounded-2xl shadow-[0_24px_50px_-34px_rgba(16,27,40,0.4)]">
              <RadioArt />
            </Reveal>
            <Reveal delay={0.08}>
              <SectionEyebrow label="PAR ONDE RADIO" />
              <h3 className="m-0 font-condensed text-[clamp(28px,3vw,38px)] font-bold leading-[1.08]">
                Pas de câble à tirer, pas de câble qui se coupe.
              </h3>
              <p className="mt-4 font-sans text-[17px] leading-[1.6] text-navy/[0.68]">
                Une antenne sur votre toit suffit : pas de travaux lourds, pas de
                dérangement dans vos locaux. Le signal arrive du point relais le
                plus proche, directement jusqu&apos;à vous.
              </p>
              <ul className="mt-5 grid list-none gap-[10px] p-0 font-sans text-[16.5px] text-navy">
                <Check>Installation de l&apos;antenne sur votre toit</Check>
                <Check>Aucun câble au sol qui peut être coupé</Check>
                <Check>Étude de faisabilité gratuite avant toute installation</Check>
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-[56px] lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="lg:order-2 overflow-hidden rounded-2xl bg-navy shadow-[0_24px_50px_-34px_rgba(16,27,40,0.4)]">
              <CoverageArt />
            </Reveal>
            <Reveal delay={0.08}>
              <SectionEyebrow label="COUVERTURE" />
              <h3 className="m-0 font-condensed text-[clamp(28px,3vw,38px)] font-bold leading-[1.08]">
                Des points relais partout au Cameroun.
              </h3>
              <p className="mt-4 font-sans text-[17px] leading-[1.6] text-navy/[0.68]">
                Nous avons des points relais répartis dans tout le pays pour
                transmettre le signal. Faites votre étude gratuite et vous saurez
                si votre site est éligible.
              </p>
              <a href="#formulaire" className={`${btnPrimary} mt-7`}>
                {BIZLINK.cta} →
              </a>
            </Reveal>
          </div>

          <Reveal className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3" delay={0.05}>
            <div className="flex flex-col gap-[14px] rounded-2xl border border-navy/[0.06] bg-surface p-7">
              <div className="flex h-[120px] items-center" aria-hidden>
                <div className="flex w-full items-end gap-[5px]">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="h-16 min-w-0 flex-1 rounded-[2px] bg-cherry-alt" />
                  ))}
                </div>
              </div>
              <h3 className="m-0 font-condensed text-[24px] font-bold leading-[1.15]">Plus de 99 % de disponibilité</h3>
              <p className="m-0 font-sans text-[15.5px] leading-[1.55] text-navy/[0.62]">
                Votre connexion reste en ligne quand votre activité en a besoin :
                appels, paiements, réservations, logiciels en ligne.
              </p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-2xl border border-navy/[0.06] bg-surface p-7">
              <div className="flex h-[120px] items-center" aria-hidden>
                <svg width="100%" height="100" viewBox="0 0 260 100" fill="none" stroke="#101b28" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="26" width="64" height="40" rx="8" /><circle cx="38" cy="46" r="10" /><path d="M70 40 L90 30 L90 62 L70 52" />
                  <rect x="108" y="24" width="56" height="52" rx="6" /><path d="M118 40h36M118 52h36M118 64h20" />
                  <rect x="196" y="48" width="56" height="40" rx="8" stroke="#a0042d" /><path d="M210 48 V38 a14 14 0 0 1 28 0 V48" stroke="#a0042d" /><circle cx="224" cy="68" r="4" fill="#a0042d" stroke="none" />
                  <path d="M70 46 H108 M164 50 H196" stroke="#70767e" strokeDasharray="4 6" />
                </svg>
              </div>
              <h3 className="m-0 font-condensed text-[24px] font-bold leading-[1.15]">Adresse IP publique</h3>
              <p className="m-0 font-sans text-[15.5px] leading-[1.55] text-navy/[0.62]">
                Une adresse IP à vous, pour mieux contrôler votre réseau : caméras,
                accès à distance, serveurs, VPN, services en ligne.
              </p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-2xl border border-navy/[0.06] bg-surface p-7">
              <div className="flex h-[120px] items-center">
                <svg width="100%" height="110" viewBox="0 0 200 116" role="img" aria-label="Débit de 10 à 250 Mbps">
                  <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#e2e3e5" strokeWidth="12" strokeLinecap="round" />
                  <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#a0042d" strokeWidth="12" strokeLinecap="round" strokeDasharray="214 252" />
                  <text x="100" y="86" textAnchor="middle" fill="#101b28" fontFamily="var(--font-barlow-condensed), sans-serif" fontWeight="700" fontSize="32">250</text>
                  <text x="100" y="106" textAnchor="middle" fill="#404953" fontFamily="var(--font-barlow), sans-serif" fontSize="13">Mbps maximum</text>
                  <text x="20" y="116" textAnchor="middle" fill="#404953" fontFamily="var(--font-barlow), sans-serif" fontSize="12">10</text>
                </svg>
              </div>
              <h3 className="m-0 font-condensed text-[24px] font-bold leading-[1.15]">De 10 à 250 Mbps</h3>
              <p className="m-0 font-sans text-[15.5px] leading-[1.55] text-navy/[0.62]">
                Un débit stable pour toute l&apos;équipe, du petit bureau à l&apos;hôtel complet.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFFRE DE LANCEMENT */}
      <section id="offre" className="scroll-mt-20 bg-gradient-to-br from-cherry-deep via-cherry-alt to-accent py-[90px] text-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-[56px] px-6 md:px-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-[14px] inline-flex items-center gap-[9px]">
              <span className="inline-block h-[2px] w-[26px] bg-white/80" />
              <span className="font-condensed text-[13px] font-semibold tracking-[2px] text-white/90">OFFRE DE LANCEMENT</span>
            </div>
            <h2 className="m-0 font-condensed text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.3px]">
              Ailleurs, plusieurs millions par mois. Ici, l&apos;offre de lancement.
            </h2>
            <p className="mt-[18px] max-w-[560px] font-sans text-[18px] leading-[1.6] text-white/85">
              Certains fournisseurs vendent cette même connexion plusieurs millions
              de XAF par mois. Pour notre lancement, les écoles, microfinances et
              hôtels 1 à 2 étoiles en profitent à prix réduit.
            </p>
            <div
              role="img"
              aria-label="Comparaison de prix par mois : plusieurs millions chez certains fournisseurs, 150 000 à 1 500 000 hors promo, 75 000 en promo"
              className="mt-[34px] grid gap-[14px]"
            >
              {compare.map((c) => (
                <div key={c.k} className="grid grid-cols-1 items-center gap-[6px] font-sans text-[14.5px] sm:grid-cols-[170px_1fr] sm:gap-[14px]">
                  <span className={c.strong ? "font-bold" : "text-white/85"}>{c.k}</span>
                  <div className="h-[36px] overflow-hidden rounded-full bg-navy-deep/30">
                    <div className={`flex h-full min-w-fit items-center whitespace-nowrap rounded-full px-[14px] font-condensed text-[16px] font-bold tabular-nums ${c.w} ${c.cls}`}>
                      {c.v}
                    </div>
                  </div>
                </div>
              ))}
              <p className="m-0 font-sans text-[13px] text-white/75">Prix en XAF par mois. Échelle indicative.</p>
            </div>
            <div className="mt-9">
              <Countdown tone="cherry" />
            </div>
          </div>

          <div className="rounded-2xl bg-navy-deep p-[30px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:p-9">
            <span className="inline-block rounded-full bg-white/[0.08] px-[14px] py-[6px] font-condensed text-[14px] font-semibold tracking-[1px] text-accent-vivid">
              BizLink Promo
            </span>
            <p className="m-0 mt-4 font-condensed text-[64px] font-bold leading-none tabular-nums">
              75 000 <span className="whitespace-nowrap text-[22px] font-semibold text-white/70">XAF / mois</span>
            </p>
            <p className="mt-2 font-sans text-[15px] text-white/70">
              Réservé aux écoles, microfinances et hôtels 1 à 2 étoiles.
            </p>
            <ul className="mt-5 grid list-none gap-[10px] p-0 font-sans text-[16px] text-white">
              {offerItems.map((item, i) => (
                <Check key={i}>{item}</Check>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/[0.12] pt-5">
              <h3 className="m-0 mb-3 font-condensed text-[19px] font-bold leading-[1.25]">
                Le matériel coûte 200 000 XAF. Vous le payez comme vous voulez.
              </h3>
              <dl className="m-0">
                {equipment.map((e) => (
                  <div key={e.k} className="grid grid-cols-1 gap-1 border-t border-white/[0.12] py-[10px] font-sans text-[14.5px] sm:grid-cols-[120px_1fr] sm:gap-3">
                    <dt className="font-bold text-white">{e.k}</dt>
                    <dd className="m-0 text-white/70">{e.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-5 flex items-center gap-2 font-condensed text-[17px] font-bold tracking-[0.3px]">
              <CheckLineIcon className="flex-none text-accent-vivid" />
              L&apos;étude est gratuite.
            </p>
            <a href="#formulaire" className={`${btnPrimary} mt-4 w-full text-center`}>
              {BIZLINK.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="scroll-mt-20 bg-surface pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="max-w-[760px]">
            <SectionEyebrow label="ÉTUDE GRATUITE" />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Faites votre étude gratuite avant la fin de l&apos;offre.
            </h2>
            <p className="mt-[18px] max-w-[620px] font-sans text-[18px] leading-[1.6] text-navy/[0.68]">
              Remplissez ce formulaire. Un conseiller Cherryz vous appelle sous 24 h
              pour vous expliquer l&apos;offre et organiser votre étude de
              faisabilité gratuite.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 items-start gap-[56px] lg:grid-cols-[1.2fr_1fr]">
            <BizlinkForm />
            <ol className="m-0 list-none p-0">
              {steps.map((s, i) => (
                <li key={s.t} className={`grid grid-cols-[48px_1fr] gap-4 py-[22px] ${i ? "border-t border-navy/[0.1]" : "pt-0"}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cherry-alt/[0.08] text-[22px] text-cherry-alt">
                    <s.Icon />
                  </span>
                  <div>
                    <b className="block font-condensed text-[20px] font-bold">{s.t}</b>
                    <span className="font-sans text-[15.5px] text-navy/[0.62]">{s.d}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* AUTRES FORFAITS */}
      <section id="forfaits" className="scroll-mt-20 bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="max-w-[760px]">
            <SectionEyebrow label="HORS PROMO" />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Non éligible à la promo ? Découvrez nos autres forfaits.
            </h2>
            <p className="mt-[18px] max-w-[620px] font-sans text-[18px] leading-[1.6] text-navy/[0.68]">
              Pour toutes les autres entreprises. Tout est flexible selon vos besoins.
            </p>
          </Reveal>
          <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            {plans.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col gap-[10px] rounded-2xl border p-[26px] ${p.featured ? "border-cherry-alt bg-cherry-alt/[0.04] shadow-[0_24px_50px_-34px_rgba(160,4,45,.6)]" : "border-navy/[0.08] bg-surface"}`}
              >
                <h3 className="m-0 font-condensed text-[24px] font-bold">{p.name}</h3>
                <p className="m-0 font-condensed text-[34px] font-bold leading-[1.1] tabular-nums">
                  {p.price} XAF
                  <small className="block font-sans text-[14px] font-medium text-navy/60">par mois, TTC</small>
                </p>
                <p className="m-0 font-condensed text-[18px] font-bold text-cherry-alt">{p.debit}</p>
                <ul className="mt-2 grid list-none gap-2 p-0 font-sans text-[14.5px] text-navy/70">
                  <Check>Supervision, priorisation, cybersécurité</Check>
                  <Check>Adresse IP publique</Check>
                </ul>
              </div>
            ))}
          </Reveal>
          <p className="mt-[22px] font-sans text-[15px] text-navy/60">
            Équipement de 200 000 XAF payable en 4 fois. Engagement de 3 ans. Tarifs TTC.
          </p>
          <div className="mt-[26px] rounded-2xl border-[1.5px] border-dashed border-navy/20 px-[26px] py-[22px]">
            <p className="m-0 max-w-[720px] font-sans text-[16px] leading-[1.55] text-navy/80">
              <strong className="text-navy">Besoin d&apos;une bande passante dédiée ?</strong>{" "}
              Elle est disponible à partir de 50 000 XAF par Mbps et par mois à
              Douala. Dans les autres villes, le prix est établi après étude.
            </p>
          </div>
          <div className="mt-8">
            <a href="#devis" className={btnPrimary}>
              Je demande un devis →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-surface-alt py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="max-w-[760px]">
            <SectionEyebrow label="QUESTIONS FRÉQUENTES" />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Vous avez encore des questions ?
            </h2>
          </Reveal>
          <div className="mt-8 max-w-[820px] border-t border-navy/[0.12]">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-navy/[0.12]">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-condensed text-[19px] font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-[22px] text-cherry-alt group-open:hidden">+</span>
                  <span aria-hidden className="hidden text-[22px] text-cherry-alt group-open:inline">−</span>
                </summary>
                <p className="m-0 max-w-[760px] pb-4 font-sans text-[16px] leading-[1.55] text-navy/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
