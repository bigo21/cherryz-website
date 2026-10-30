import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import type { Logo } from "@/components/site/LogoMarquee";
import HomeHero from "@/components/home/HomeHero";
import ContactClose from "@/components/site/ContactClose";
import { BrokerDiagramTall, BrokerDiagramWide } from "@/components/home/BrokerDiagram";
import { ArrowRightIcon, CheckLineIcon, ClipboardIcon, GlobeIcon, PhoneIcon, WhatsAppIcon, WifiIcon } from "@/components/site/icons";
import { CONTACT, QUOTE } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Cherryz | L'Internet professionnel au meilleur prix, partout au Cameroun",
  description:
    "Cherryz agrège les solutions des grands opérateurs (Camtel, Orange, MTN) pour une connexion dédiée, stable et jusqu'à 50% moins chère. Internet B2B avec IP publique et WiFi Zone monétisable.",
};

const comparatif: { label: string; alone: string; cherry: string; check?: boolean }[] = [
  { label: "Prix / Mbps / mois", alone: "90 000 – 180 000 XAF", cherry: "45 000 – 70 000 XAF" },
  { label: "Installation", alone: "Travaux lourds, délais longs", cherry: "Rapide, sans génie civil" },
  { label: "Choix technologique", alone: "Limité à 1 opérateur", cherry: "Multi-opérateurs, meilleure option" },
  { label: "Support", alone: "Standard, file d'attente", cherry: "Dédié, réactif, de proximité" },
  { label: "Flexibilité", alone: "Contrats rigides", cherry: "Sur-mesure, évolutif" },
  { label: "Test préalable", alone: "Rarement possible", cherry: "Test en parallèle disponible*", check: true },
];

const etapes = [
  { t: "Écoute", d: "On comprend votre activité, vos usages, vos contraintes." },
  { t: "Étude", d: "Descente gratuite sur site : analyse de faisabilité technique." },
  { t: "Solution", d: "On assemble la meilleure offre parmi nos partenaires opérateurs." },
  { t: "Cotation", d: "Prix transparent, adapté à votre budget réel." },
  { t: "Déploiement", d: "Installation rapide, sans interruption de votre activité." },
  { t: "Suivi", d: "SAV dédié, monitoring, intervention rapide." },
];

const offres = [
  {
    key: "ip",
    Icon: GlobeIcon,
    label: "Internet B2B",
    title: "Une connexion dédiée, avec IP publique fixe",
    rows: [
      ["Pour qui", "Entreprises, institutions, organisations"],
      ["Ce que vous obtenez", "Internet dédié avec IP fixe, bande passante garantie"],
      ["L'atout", "Performance pro à prix réduit"],
    ],
    page: "/internet-b2b",
    quote: QUOTE.ip,
  },
  {
    key: "wifi",
    Icon: WifiIcon,
    label: "WiFi Zone",
    title: "Un espace connecté qui vous rapporte",
    rows: [
      ["Pour qui", "Entrepreneurs, gestionnaires d'immeubles, investisseurs"],
      ["Ce que vous obtenez", "Point d'accès Internet partagé et monétisé"],
      ["L'atout", "Générer des revenus avec la connectivité"],
    ],
    page: "/wifi-zone",
    quote: QUOTE.wifi,
  },
] as const;


const clients: Logo[] = [
  { src: "/logos/trim/afriland-first-bank.png", alt: "Afriland First Bank" },
  { src: "/logos/trim/belgocam.png", alt: "Belgocam S.A." },
  { src: "/logos/trim/sudcam.png", alt: "Sud Cameroun Hevea (SUDCAM)" },
  { src: "/logos/trim/hotel-mansel.png", alt: "Hotel Mansel" },
  { src: "/logos/trim/vallee-des-princes-hotel.png", alt: "Vallée des Princes Hotel" },
  { src: "/logos/trim/jouvence-international-hotel.png", alt: "Jouvence International Hotel" },
  { src: "/logos/trim/star-land-hotel.png", alt: "Star Land Hotel" },
  { src: "/logos/trim/kny-groupe.png", alt: "KNY Groupe" },
  { src: "/logos/trim/inoni-tech.png", alt: "Inoni Tech" },
  { src: "/logos/trim/cinetpay.png", alt: "CinetPay" },
  { src: "/logos/trim/kalitas.png", alt: "Kalitas" },
  { src: "/logos/trim/socokem.png", alt: "Socokem" },
  { src: "/logos/trim/carlcare.png", alt: "Carlcare" },
  { src: "/logos/trim/best-dental.png", alt: "Best Dental" },
  { src: "/logos/trim/dpg-kennel.png", alt: "DPG Kennel" },
  { src: "/logos/trim/aaltelsolutions.png", alt: "AALTELSOLUTIONS" },
  { src: "/logos/trim/1xbet.png", alt: "1xBet" },
];

const h2 = "m-0 font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]";
const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12";
const sheet = "sheet-perforated rounded-b-[14px] bg-paper";
const arrow = <ArrowRightIcon aria-hidden className="flex-none text-[19px]" />;

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* LE MÉCANISME : un courtier, pas un opérateur */}
      <section className="bg-navy-deep py-20 text-white md:py-28">
        <div className={wrap}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className={h2}>Un courtier, pas un opérateur de plus.</h2>
              <p className="mt-6 max-w-[52ch] font-sans text-[17.5px] leading-[1.65] text-white/80">
                Les entreprises camerounaises paient entre 90 000 et 180 000
                XAF/Mbps/mois en allant directement chez un opérateur. Cherryz
                analyse votre besoin, met nos opérateurs partenaires en
                concurrence et vous livre la solution la plus adaptée,
                techniquement et financièrement.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.05}>
              <BrokerDiagramWide className="hidden h-auto w-full md:block" />
              <BrokerDiagramTall className="mx-auto h-auto w-full max-w-[360px] md:hidden" />
            </Reveal>
          </div>

          {/* La comparaison, posée comme une feuille du carnet */}
          <Reveal className={`${sheet} mt-16 px-5 pb-6 pt-9 text-navy sm:px-9`} delay={0.05}>
            <h3 className="m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold sm:text-[28px]">
              Seul chez un opérateur, ou avec Cherryz
            </h3>
            {/* Mobile : lignes réglées sur la même feuille */}
            <dl className="m-0 md:hidden">
              {comparatif.map((row) => (
                <div key={row.label} className="border-b border-rule py-4">
                  <dt className="font-sans text-[15px] font-semibold text-navy">{row.label}</dt>
                  <dd className="m-0 mt-2 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1 font-sans text-[15px]">
                    <span className="font-condensed font-bold text-navy">Cherryz</span>
                    <span className="font-semibold text-navy">{row.cherry}</span>
                    <span className="font-condensed font-semibold text-ink-soft">Seul</span>
                    <span className="text-ink-soft">{row.alone}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <table className="hidden w-full border-collapse font-sans text-[16px] md:table">
              <caption className="sr-only">Aller seul chez un opérateur, comparé à passer par Cherryz</caption>
              <thead>
                <tr className="font-condensed text-[18px]">
                  <th scope="col" className="w-[30%] border-b border-rule py-4 pr-6 text-left font-semibold text-ink-soft">
                    Critère
                  </th>
                  <th scope="col" className="border-b border-rule px-6 py-4 text-left font-bold text-ink-soft">
                    Seul, chez un opérateur
                  </th>
                  <th scope="col" className="border-b border-rule border-l-2 border-l-navy px-6 py-4 text-left font-bold text-navy">
                    Avec Cherryz
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-b border-rule py-[17px] pr-6 text-left font-semibold text-navy">
                      {row.label}
                    </th>
                    <td className="border-b border-rule px-6 py-[17px] text-ink-soft">{row.alone}</td>
                    <td className="border-b border-rule border-l-2 border-l-navy px-6 py-[17px] font-semibold text-navy">
                      {row.check ? (
                        <span className="inline-flex items-center gap-[6px]">
                          <CheckLineIcon className="text-positive" />
                          {row.cherry}
                        </span>
                      ) : (
                        <span className="tabular-nums">{row.cherry}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">
              *Contrat signé devant notaire requis avant le lancement du test.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SUR PLACE : de l'étude à l'installation */}
      <section className="bg-ground py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-5">
            <h2 className={h2}>Sur place, de l&apos;étude à l&apos;installation.</h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              Chaque projet est unique : nous ne publions pas de grille tarifaire
              figée. Votre prix se construit après avoir compris votre besoin,
              sur place, partout au Cameroun.
            </p>
            {/* Photo d'illustration (Pexels) : à remplacer par une vraie photo d'une installation Cherryz. */}
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[14px] bg-navy">
              <Image
                src="/photos/refonte/terrain-installation.jpg"
                alt="Technicien installant un équipement réseau dans une baie"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
          </Reveal>
          <Reveal className={`${sheet} px-5 pb-7 pt-9 sm:px-9 lg:col-span-7`} delay={0.05}>
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-navy pb-4">
              <h3 className="m-0 font-condensed text-[24px] font-bold text-navy sm:text-[28px]">Le déroulé</h3>
              <span className="font-sans text-[13.5px] text-ink-soft">Étude sur site gratuite</span>
            </div>
            <ol className="m-0 list-none p-0">
              {etapes.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[40px_1fr] items-baseline gap-x-3 border-b border-rule py-[18px] sm:grid-cols-[44px_150px_1fr] sm:gap-x-4">
                  <span className="font-condensed text-[19px] font-bold tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-condensed text-[21px] font-bold text-navy">{s.t}</span>
                  <span className="col-start-2 font-sans text-[16px] leading-[1.55] text-ink-soft sm:col-start-3">{s.d}</span>
                </li>
              ))}
            </ol>
            <Link
              href={QUOTE.hub}
              className="mt-7 inline-flex items-center gap-3 rounded-[10px] bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
            >
              <ClipboardIcon aria-hidden className="flex-none text-[20px]" />
              Commencer par le questionnaire
              {arrow}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LES DEUX OFFRES */}
      <section id="services" className="bg-paper py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={`${h2} max-w-[20ch]`}>Deux offres, un seul interlocuteur.</h2>
          </Reveal>
          <Reveal className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" delay={0.05}>
            {offres.map((o) => (
              <article key={o.key} className="flex flex-col rounded-[14px] border border-rule bg-paper px-6 pb-7 pt-7 sm:px-9">
                <h3 className="m-0 flex items-start gap-3 border-b-2 border-navy pb-4 font-condensed text-[28px] font-bold leading-[1.08] text-navy sm:text-[30px]">
                  <o.Icon aria-hidden className="mt-[3px] flex-none text-[26px]" />
                  <span>
                    {o.label}
                    <span className="block font-sans text-[17px] font-medium leading-[1.4] text-ink-soft">{o.title}</span>
                  </span>
                </h3>
                <dl className="m-0 mt-2 flex-1">
                  {o.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-1 gap-1 border-b border-rule py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                      <dt className="font-sans text-[14.5px] font-semibold text-navy">{k}</dt>
                      <dd className="m-0 font-sans text-[16px] text-ink-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={o.quote}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-cherry px-5 py-[14px] font-condensed text-[17px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
                  >
                    Obtenir mon devis
                    {arrow}
                  </Link>
                  <Link
                    href={o.page}
                    className="font-sans text-[16px] font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
                  >
                    Découvrir l&apos;offre {o.label}
                  </Link>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* RÉFÉRENCES */}
      <section className="bg-ground py-20 md:py-24">
        <div className={wrap}>
          <Reveal className={`${sheet} px-5 pb-8 pt-9 sm:px-9`}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-navy pb-4">
              <h2 className="m-0 font-condensed text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.05] text-navy">
                Ils nous font confiance
              </h2>
              <span className="font-sans text-[14px] text-ink-soft">Entreprises, hôtels, institutions</span>
            </div>
            <ul className="m-0 flex list-none flex-wrap justify-center p-0">
              {clients.map((c) => (
                <li key={c.src} className="flex h-[96px] w-1/2 items-center justify-center border-b border-rule px-4 sm:w-1/4 lg:w-[12.5%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" className="max-h-[44px] max-w-[112px] object-contain" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactClose quoteHref={QUOTE.hub} />
    </>
  );
}
