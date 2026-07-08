import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import ImageSlot from "@/components/site/ImageSlot";
import { CheckBadgeIcon, CheckLineIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
import { CAL_IP, CAL_WIFI } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Cherryz — L'Internet professionnel au meilleur prix, partout au Cameroun",
  description:
    "Cherryz agrège les solutions des grands opérateurs (Camtel, Orange, MTN) pour une connexion dédiée, stable et jusqu'à 50% moins chère. Internet B2B avec IP publique et WiFi Zone monétisable.",
};

const reassurance = [
  "Régulée ART",
  "Partenaire Camtel · Orange · MTN",
  "Jusqu'à -50%",
  "IP dédiée & sécurisée",
  "Test avant engagement",
];

const comparatif: { label: string; alone: string; cherry: string; check?: boolean }[] = [
  { label: "Prix / Mbps / mois", alone: "90 000 – 180 000 XAF", cherry: "45 000 – 70 000 XAF" },
  { label: "Installation", alone: "Travaux lourds, délais longs", cherry: "Rapide, sans génie civil" },
  { label: "Choix technologique", alone: "Limité à 1 opérateur", cherry: "Multi-opérateurs, meilleure option" },
  { label: "Support", alone: "Standard, file d'attente", cherry: "Dédié, réactif, de proximité" },
  { label: "Flexibilité", alone: "Contrats rigides", cherry: "Sur-mesure, évolutif" },
  { label: "Test préalable", alone: "Rarement possible", cherry: "Test en parallèle disponible*", check: true },
];

const approche = [
  { n: "01", t: "Écoute", d: "On comprend votre activité, vos usages, vos contraintes." },
  { n: "02", t: "Étude", d: "Descente gratuite sur site — analyse de faisabilité technique." },
  { n: "03", t: "Solution", d: "On assemble la meilleure offre parmi nos partenaires opérateurs." },
  { n: "04", t: "Cotation", d: "Prix transparent, adapté à votre budget réel." },
  { n: "05", t: "Déploiement", d: "Installation rapide, sans interruption de votre activité." },
  { n: "06", t: "Suivi", d: "SAV dédié, monitoring, intervention rapide." },
];

const partners = [
  { name: "Orange Cameroun", color: "#ff7900" },
  { name: "Camtel", color: "#0a3d91" },
  { name: "MTN Cameroon", color: "#ffcc00" },
];

const references = [
  "Afriland First Bank", "Belgocam S.A.", "Sud Cameroun Hevea (SUDCAM)", "Flow Factory",
  "Hotel Mansel", "Vallée des Princes Hotel", "Jouvence International Hotel", "KNY Groupe",
  "Inoni Tech", "Maplerad", "IziChange", "CinetPay", "Startup Academy", "Taptap Send",
  "Carlcare", "Best Dental", "Music",
];

const eyebrow =
  "font-condensed text-[13px] font-semibold tracking-[2px] text-cherry-alt";
const heroBtnPrimary =
  "rounded-full bg-cherry-alt px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white shadow-[0_18px_40px_-16px_rgba(160,4,45,.95)] transition-transform hover:-translate-y-[2px] hover:bg-[#c0093a]";
const heroBtnGhost =
  "rounded-full border-[1.5px] border-white/[0.28] bg-white/[0.06] px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white transition-colors hover:bg-white/[0.14]";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="relative flex min-h-[780px] items-center overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 z-0">
          <ImageSlot label="Photo — installation réseau / antenne" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(90deg,rgba(11,19,29,.95) 0%,rgba(11,19,29,.84) 42%,rgba(11,19,29,.4) 100%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1] w-[46%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(160,4,45,.92),rgba(125,3,35,.86))", clipPath: "polygon(38% 0,100% 0,100% 100%,10% 100%)" }}
        />
        <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1280px] px-6 pb-[110px] pt-[150px] md:px-12">
          <div className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2 animate-fade [animation-delay:0.05s]">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-pink shadow-[0_0_10px_1px_#e11d63]" />
            <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">
              AGRÉGATEUR DE CONNECTIVITÉ · CAMEROUN
            </span>
          </div>
          <h1 className="m-0 max-w-[920px] font-condensed text-[clamp(48px,7vw,82px)] font-bold leading-[0.94] tracking-[-0.5px] text-white animate-fade [animation-delay:0.12s]">
            L&apos;Internet professionnel au{" "}
            <span className="text-accent-vivid">meilleur prix.</span>
            <br />
            Partout au Cameroun.
          </h1>
          <p className="mt-[26px] max-w-[600px] font-sans text-[20px] leading-[1.55] text-white/[0.78] animate-fade [animation-delay:0.22s]">
            Cherryz agrège les solutions des plus grands opérateurs — Camtel,
            Orange, MTN et bien d&apos;autres — pour vous offrir une connexion
            dédiée, stable et jusqu&apos;à 50% moins chère. Sans travaux. Sans
            coupure.
          </p>
          <div className="pointer-events-auto mt-[38px] flex flex-wrap gap-[15px] animate-fade [animation-delay:0.32s]">
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={heroBtnPrimary}>
              Demander un devis gratuit →
            </a>
            <Link href="/wifi-zone" className={heroBtnGhost}>
              Découvrir la WiFi Zone →
            </Link>
          </div>
        </div>
      </header>

      {/* RÉASSURANCE */}
      <section className="bg-navy py-6">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[18px] px-6 md:px-12">
          {reassurance.map((item, i) => (
            <div key={item} className="flex items-center gap-[11px]">
              {i > 0 && (
                <span className="mr-[18px] hidden h-[22px] w-px bg-white/[0.14] lg:inline-block" />
              )}
              <CheckBadgeIcon />
              <span className="font-condensed text-[15.5px] font-semibold tracking-[0.4px] text-white">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI CHERRYZ */}
      <section id="pourquoi" className="bg-white pb-24 pt-[110px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative">
              <div className="absolute -left-[22px] -top-[22px] z-0 h-[170px] w-[170px] rounded-2xl bg-cherry-alt" />
              <div className="absolute -bottom-4 -right-4 z-0 h-[110px] w-[110px] rounded-2xl border-2 border-cherry-alt" />
              <div className="relative z-[1] h-[470px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-34px_rgba(16,27,40,.5)]">
                <ImageSlot label="Photo — technicien Cherryz sur site" />
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
              <div className="mb-[14px] inline-flex items-center gap-[9px]">
                <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
                <span className={eyebrow}>POURQUOI CHERRYZ</span>
              </div>
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
            <div className="mb-[14px] inline-flex items-center gap-[9px]">
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
              <span className={eyebrow}>NOTRE APPROCHE</span>
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
            </div>
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
                className="rounded-[14px] border border-navy/[0.06] bg-white px-[26px] py-7 transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]"
              >
                <div className="font-condensed text-[34px] font-bold leading-none text-cherry-alt opacity-[0.28]">
                  {s.n}
                </div>
                <h4 className="mt-[6px] font-condensed text-[22px] font-bold">{s.t}</h4>
                <p className="mt-[6px] font-sans text-[15px] leading-[1.5] text-navy/[0.62]">
                  {s.d}
                </p>
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
            <div className="mb-[14px] inline-flex items-center gap-[9px]">
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
              <span className={eyebrow}>NOS SERVICES</span>
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
            </div>
            <h2 className="m-0 font-condensed text-[48px] font-bold leading-[1.02] tracking-[-0.3px]">
              Deux façons de mieux vous connecter
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-7 lg:grid-cols-2" delay={0.05}>
            <ServiceCard
              badge="B2B"
              title="Adresse IP Publique"
              icon={<GlobeIcon className="text-[24px] text-white" />}
              imageLabel="Photo — bureau / datacenter"
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
              imageLabel="Photo — hôtel / immeuble / hotspot"
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
            <div className="mb-[14px] inline-flex items-center gap-[9px]">
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
              <span className={eyebrow}>ILS NOUS FONT CONFIANCE</span>
              <span className="inline-block h-[2px] w-[26px] bg-cherry-alt" />
            </div>
            <h2 className="m-0 font-condensed text-[42px] font-bold leading-[1.02] tracking-[-0.3px]">
              Nos partenaires &amp; références
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mb-[34px] flex flex-wrap justify-center gap-4">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-[10px] rounded-xl border border-navy/10 bg-white px-[26px] py-[14px]">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ background: p.color }} />
                  <span className="font-condensed text-[20px] font-bold text-navy">{p.name}</span>
                </div>
              ))}
            </div>
            <div className="mx-auto flex max-w-[960px] flex-wrap justify-center gap-[10px_12px]">
              {references.map((r) => (
                <span key={r} className="rounded-full border border-navy/[0.08] bg-white px-4 py-[9px] font-sans text-[15px] font-semibold text-navy/50">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-navy-deep py-[104px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[44%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(160,4,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(40% 0,100% 0,100% 100%,12% 100%)" }}
        />
        <div
          className="absolute -bottom-[120px] -left-[120px] z-0 h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(160,4,45,.28),transparent 68%)" }}
        />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-10 px-6 md:px-12">
          <div className="max-w-[640px]">
            <h2 className="m-0 font-condensed text-[54px] font-bold leading-none tracking-[-0.4px] text-white">
              Prêt à payer moins pour
              <br />
              un Internet meilleur ?
            </h2>
            <p className="mt-5 max-w-[520px] font-sans text-[18.5px] leading-[1.55] text-white/[0.78]">
              Notre équipe se déplace gratuitement pour étudier votre situation,
              partout au Cameroun.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[15px]">
              <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={heroBtnPrimary}>
                Demander un devis →
              </a>
              <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={heroBtnGhost}>
                Lancer une WiFi Zone →
              </a>
            </div>
          </div>
          <div className="relative flex h-[240px] w-[240px] flex-none items-center justify-center">
            <span className="absolute h-[120px] w-[120px] rounded-full border-2 border-white/45 animate-ripple" />
            <span className="absolute h-[120px] w-[120px] rounded-full border-2 border-white/45 animate-ripple [animation-delay:1.7s]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/pictogram.png"
              alt="Cherryz"
              className="relative w-[130px] [filter:drop-shadow(0_0_26px_rgba(255,255,255,.35))]"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  badge,
  title,
  icon,
  imageLabel,
  rows,
  href,
}: {
  badge: string;
  title: string;
  icon: React.ReactNode;
  imageLabel: string;
  rows: [string, string][];
  href: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-navy/[0.09] bg-white shadow-[0_26px_54px_-36px_rgba(16,27,40,.45)] transition-all hover:-translate-y-[6px] hover:shadow-[0_38px_66px_-34px_rgba(16,27,40,.55)]">
      <div className="relative h-[250px]">
        <ImageSlot label={imageLabel} />
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
