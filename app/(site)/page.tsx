import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import PageHero, { btnPrimary, btnGhostStrong, btnGhost } from "@/components/site/PageHero";
import ReassuranceBar from "@/components/site/ReassuranceBar";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import LogoMarquee, { type Logo } from "@/components/site/LogoMarquee";
import { CheckLineIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
import { CAL_IP, CAL_WIFI } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Cherryz — L'Internet professionnel au meilleur prix, partout au Cameroun",
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

const approche = [
  { n: "01", t: "Écoute", d: "On comprend votre activité, vos usages, vos contraintes.", img: "/photos/approche-01-ecoute.jpg", alt: "Échange client en bureau" },
  { n: "02", t: "Étude", d: "Descente gratuite sur site — analyse de faisabilité technique.", img: "/photos/approche-02-etude.jpg", alt: "Technicien en visite technique" },
  { n: "03", t: "Solution", d: "On assemble la meilleure offre parmi nos partenaires opérateurs.", img: "/photos/approche-03-solution.jpg", alt: "Équipe devant schéma réseau" },
  { n: "04", t: "Cotation", d: "Prix transparent, adapté à votre budget réel.", img: "/photos/approche-04-cotation.jpg", alt: "Remise de devis" },
  { n: "05", t: "Déploiement", d: "Installation rapide, sans interruption de votre activité.", img: "/photos/approche-05-deploiement.jpg", alt: "Installation d'équipement réseau" },
  { n: "06", t: "Suivi", d: "SAV dédié, monitoring, intervention rapide.", img: "/photos/approche-06-suivi.jpg", alt: "Écran de monitoring" },
];

const operators = [
  { src: "/logos/orange.png", alt: "Orange Cameroun", h: 150 },
  { src: "/logos/mtn.png", alt: "MTN Cameroon", h: 150 },
  { src: "/logos/camtel.png", alt: "Camtel", h: 162 },
];

const clientsRow1: Logo[] = [
  { src: "/logos/afriland-first-bank.png", alt: "Afriland First Bank" },
  { src: "/logos/belgocam.png", alt: "Belgocam S.A." },
  { src: "/logos/sudcam.png", alt: "Sud Cameroun Hevea (SUDCAM)" },
  { src: "/logos/hotel-mansel.png", alt: "Hotel Mansel" },
  { src: "/logos/vallee-des-princes-hotel.png", alt: "Vallée des Princes Hotel" },
  { src: "/logos/jouvence-international-hotel.png", alt: "Jouvence International Hotel" },
  { src: "/logos/star-land-hotel.png", alt: "Star Land Hotel" },
  { src: "/logos/kny-groupe.png", alt: "KNY Groupe" },
  { src: "/logos/inoni-tech.png", alt: "Inoni Tech" },
];

const clientsRow2: Logo[] = [
  { src: "/logos/cinetpay.png", alt: "CinetPay" },
  { src: "/logos/kalitas.png", alt: "Kalitas" },
  { src: "/logos/socokem.png", alt: "Socokem" },
  { src: "/logos/carlcare.png", alt: "Carlcare" },
  { src: "/logos/best-dental.png", alt: "Best Dental" },
  { src: "/logos/dpg-kennel.png", alt: "DPG Kennel" },
  { src: "/logos/aaltelsolutions.png", alt: "AALTELSOLUTIONS" },
  { src: "/logos/1xbet.png", alt: "1xBet" },
];

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="AGRÉGATEUR DE CONNECTIVITÉ · CAMEROUN"
        image="/photos/accueil-hero.jpg"
        imageAlt="Cherryz — réseau connecté"
        minHeight={780}
        contentMaxWidth={840}
        emphasis
        title={
          <>
            L&apos;Internet professionnel au{" "}
            <span className="text-accent-vivid">meilleur prix.</span>
            <br />
            Partout au Cameroun.
          </>
        }
        subtitle="Cherryz agrège les solutions des plus grands opérateurs — Camtel, Orange, MTN et bien d'autres — pour vous offrir une connexion dédiée, stable et jusqu'à 50% moins chère. Sans travaux. Sans coupure."
        actions={
          <>
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Demander un devis gratuit →
            </a>
            <Link href="/wifi-zone" className={btnGhostStrong}>
              Découvrir la WiFi Zone →
            </Link>
          </>
        }
      />
      <ReassuranceBar />

      {/* POURQUOI CHERRYZ */}
      <section id="pourquoi" className="bg-white pb-24 pt-[110px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative">
              <div className="absolute -left-[22px] -top-[22px] z-0 h-[170px] w-[170px] rounded-2xl bg-cherry-alt" />
              <div className="absolute -bottom-4 -right-4 z-0 h-[110px] w-[110px] rounded-2xl border-2 border-cherry-alt" />
              <div className="relative z-[1] h-[470px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-34px_rgba(16,27,40,.5)]">
                <Image
                  src="/photos/pourquoi-cherryz.jpg"
                  alt="Technicien Cherryz sur site"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-[18px] bottom-[34px] z-[2] rounded-[14px] bg-navy px-5 py-4 text-white shadow-[0_22px_46px_-20px_rgba(16,27,40,.6)] animate-float">
                <div className="font-condensed text-[32px] font-bold leading-none text-accent-vivid">
                  45 000
                  <span className="text-[15px] text-white/60"> XAF/Mbps</span>
                </div>
                <div className="mt-[2px] font-sans text-[13px] font-medium text-white/65">
                  au lieu de 90 000 – 180 000
                </div>
              </div>
            </div>
            <div>
              <SectionEyebrow label="POURQUOI CHERRYZ" />
              <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.03] tracking-[-0.3px]">
                Un seul interlocuteur.
                <br />
                Les meilleurs réseaux.
                <br />
                Le juste prix.
              </h2>
              <p className="mt-[18px] max-w-[560px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
                Les entreprises camerounaises paient entre 90 000 et 180 000
                XAF/Mbps/mois en allant directement chez un opérateur. Cherryz
                négocie pour vous auprès de plusieurs fournisseurs et vous
                propose la meilleure solution — à partir de 45 000 XAF/Mbps/mois.
              </p>
              <p className="mt-[14px] max-w-[560px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
                Nous ne sommes pas un opérateur de plus. Nous sommes votre{" "}
                <strong className="text-navy">courtier en connectivité</strong> :
                nous analysons votre besoin, comparons les options, et vous
                livrons la solution la plus adaptée — techniquement et
                financièrement.
              </p>
            </div>
          </Reveal>

          {/* Comparatif */}
          <Reveal className="mt-[70px]" delay={0.05}>
            <div className="overflow-x-auto rounded-2xl border border-navy/10 shadow-[0_30px_60px_-44px_rgba(16,27,40,.5)]">
              <div className="grid min-w-[640px] grid-cols-[1.4fr_1fr_1fr]">
                <div className="bg-surface px-[26px] py-[22px] font-condensed text-[14px] font-semibold uppercase tracking-[1px] text-navy/50">
                  Comparatif
                </div>
                <div className="border-l border-navy/[0.08] bg-surface px-[26px] py-[22px] font-condensed text-[18px] font-bold text-navy">
                  Aller seul chez un opérateur
                </div>
                <div className="flex items-center gap-[9px] bg-cherry-alt px-[26px] py-[22px] font-condensed text-[18px] font-bold text-white">
                  Passer par Cherryz
                </div>
                {comparatif.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="border-t border-navy/[0.08] px-[26px] py-5 font-sans text-[16px] font-semibold">
                      {row.label}
                    </div>
                    <div className="border-l border-t border-navy/[0.08] px-[26px] py-5 font-sans text-[16px] text-navy/60">
                      {row.alone}
                    </div>
                    <div className="border-t border-navy/[0.08] bg-cherry-alt/[0.04] px-[26px] py-5 font-sans text-[16px] font-semibold text-navy">
                      {row.check ? (
                        <span className="inline-flex items-center gap-[6px]">
                          <CheckLineIcon className="inline-block align-[-0.12em] text-positive" />
                          {row.cherry}
                        </span>
                      ) : (
                        <span className={row.label === "Prix / Mbps / mois" ? "text-cherry-alt" : ""}>
                          {row.cherry}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mx-1 mt-3 font-sans text-[13px] text-navy/50">
              *Contrat signé devant notaire requis avant le lancement du test.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NOTRE APPROCHE */}
      <section className="bg-surface-alt py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
            <SectionEyebrow label="NOTRE APPROCHE" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              On ne vend pas une connexion.
              <br />
              On résout un problème.
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
            {approche.map((s) => (
              <div
                key={s.n}
                className="overflow-hidden rounded-[14px] border border-navy/[0.06] bg-white transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]"
              >
                <div className="relative h-[150px]">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pb-[26px] pt-[22px]">
                  <div className="font-condensed text-[34px] font-bold leading-none text-cherry-alt opacity-[0.28]">
                    {s.n}
                  </div>
                  <h4 className="mt-[6px] font-condensed text-[22px] font-bold">{s.t}</h4>
                  <p className="mt-[6px] font-sans text-[15px] leading-[1.5] text-navy/[0.62]">
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-11 text-center" delay={0.1}>
            <p className="mx-auto mb-[22px] max-w-[640px] font-sans text-[16px] leading-[1.6] text-navy/[0.62]">
              Chaque projet est unique. C&apos;est pourquoi nous ne publions pas
              de grille tarifaire figée — nous construisons votre prix après
              avoir compris votre besoin.
            </p>
            <a
              href={CAL_IP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-cherry-alt px-7 py-4 font-condensed text-[17px] font-semibold tracking-[0.6px] text-white shadow-[0_16px_34px_-16px_rgba(160,4,45,.8)] transition-transform hover:-translate-y-[2px] hover:bg-[#c0093a]"
            >
              Parlez-nous de votre projet →
            </a>
          </Reveal>
        </div>
      </section>

      {/* NOS SERVICES */}
      <section id="services" className="bg-white pb-[100px] pt-[110px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-[58px] max-w-[640px] text-center">
            <SectionEyebrow label="NOS SERVICES" centered />
            <h2 className="m-0 font-condensed text-[48px] font-bold leading-[1.02] tracking-[-0.3px]">
              Deux façons de mieux vous connecter
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-7 lg:grid-cols-2" delay={0.05}>
            <ServiceCard
              badge="B2B"
              title="Adresse IP Publique"
              icon={<GlobeIcon className="text-[24px] text-white" />}
              image="/photos/service-ip.jpg"
              imageAlt="Bureau connecté"
              rows={[
                ["POUR QUI", "Entreprises, institutions, organisations"],
                ["QUOI", "Internet dédié avec IP fixe, bande passante garantie"],
                ["ATOUT", "Performance pro à prix réduit"],
              ]}
              href="/internet-b2b"
            />
            <ServiceCard
              badge="REVENUS"
              title="WiFi Zone"
              icon={<WifiIcon className="text-[24px] text-white" />}
              image="/photos/service-wifizone.jpg"
              imageAlt="Immeuble avec WiFi"
              rows={[
                ["POUR QUI", "Entrepreneurs, gestionnaires d'immeubles, investisseurs"],
                ["QUOI", "Point d'accès Internet partagé et monétisé"],
                ["ATOUT", "Générer des revenus avec la connectivité"],
              ]}
              href="/wifi-zone"
            />
          </Reveal>
        </div>
      </section>

      {/* ILS NOUS FONT CONFIANCE */}
      <section className="bg-surface py-[90px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mb-11 text-center">
            <SectionEyebrow label="ILS NOUS FONT CONFIANCE" centered />
            <h2 className="m-0 font-condensed text-[42px] font-bold leading-[1.02] tracking-[-0.3px]">
              Nos partenaires &amp; références
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            {/* Opérateurs partenaires */}
            <div className="mb-[50px] flex flex-wrap items-center justify-center gap-14">
              {operators.map((o) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={o.src}
                  src={o.src}
                  alt={o.alt}
                  style={{ height: o.h }}
                  className="w-auto object-contain"
                />
              ))}
            </div>
            {/* Références clients — bandeaux défilants */}
            <div className="flex flex-col gap-[22px]">
              <LogoMarquee logos={clientsRow1} direction="left" />
              <LogoMarquee logos={clientsRow2} direction="right" />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Prêt à payer moins pour
            <br />
            un Internet meilleur ?
          </>
        }
        subtitle="Notre équipe se déplace gratuitement pour étudier votre situation, partout au Cameroun."
        actions={
          <>
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Demander un devis →
            </a>
            <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              Lancer une WiFi Zone →
            </a>
          </>
        }
      />
    </>
  );
}

function ServiceCard({
  badge,
  title,
  icon,
  image,
  imageAlt,
  rows,
  href,
}: {
  badge: string;
  title: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  rows: [string, string][];
  href: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-navy/[0.09] bg-white shadow-[0_26px_54px_-36px_rgba(16,27,40,.45)] transition-all hover:-translate-y-[6px] hover:shadow-[0_38px_66px_-34px_rgba(16,27,40,.55)]">
      <div className="relative h-[250px]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(11,19,29,0) 40%,rgba(11,19,29,.72))" }} />
        <div className="absolute left-0 top-5 rounded-r-[7px] bg-cherry-alt px-2 py-[11px] font-condensed text-[12px] font-semibold tracking-[2px] text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
          {badge}
        </div>
        <div className="absolute bottom-5 left-[26px] flex items-center gap-[11px]">
          {icon}
          <span className="font-condensed text-[30px] font-bold text-white">{title}</span>
        </div>
      </div>
      <div className="px-[30px] pb-[30px] pt-7">
        <div className="grid grid-cols-[auto_1fr] gap-[8px_16px] font-sans text-[15.5px] leading-[1.45]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <span className="font-condensed font-bold tracking-[0.5px] text-cherry-alt">{k}</span>
              <span className="text-navy/70">{v}</span>
            </div>
          ))}
        </div>
        <Link
          href={href}
          className="mt-5 inline-block rounded-full bg-navy px-6 py-[13px] font-condensed text-[15px] font-semibold tracking-[0.5px] text-white transition-colors hover:bg-cherry-alt"
        >
          En savoir plus →
        </Link>
      </div>
    </div>
  );
}
