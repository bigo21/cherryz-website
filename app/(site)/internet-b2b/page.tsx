import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import ReassuranceBar from "@/components/site/ReassuranceBar";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import Reveal from "@/components/site/Reveal";
import { CalendarIcon, GlobeIcon, PhoneIcon, PinIcon } from "@/components/site/icons";
import { CAL_IP } from "@/lib/site/site";

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
const Sparkle = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 3l1.7 4.5L18 9l-4.3 1.5L12 15l-1.7-4.5L6 9l4.3-1.5z" /><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></svg>);

const usages = [
  { img: "/photos/fond-vpn.jpg", alt: "VPN inter-agences", t: "Sécuriser vos VPN inter-agences", d: "Reliez vos sites en toute confidentialité." },
  { img: "/photos/fond-serveurs.jpg", alt: "Serveurs internes", t: "Héberger vos serveurs internes", d: "Accessibles à distance, en toute sécurité." },
  { img: "/photos/fond-callcenter.jpg", alt: "Call center VoIP", t: "Call centers & systèmes VoIP", d: "Une voix claire, sans coupure." },
  { img: "/photos/fond-conformite.jpg", alt: "Conformité des transactions", t: "Conformité de vos transactions", d: "Indispensable pour vos flux financiers." },
  { img: "/photos/fond-video.jpg", alt: "Vidéosurveillance", t: "Vidéosurveillance en temps réel", d: "Vos caméras accessibles où que vous soyez." },
];

const features = [
  { Icon: Bolt, t: "Installation rapide", d: "Faisceaux hertziens : pas de génie civil, pas de tranchées." },
  { Icon: Lock, t: "IP dédiée incluse", d: "Votre adresse, rien qu'à vous." },
  { Icon: Flask, t: "Test en parallèle", d: "Testez sans quitter votre opérateur actuel*." },
  { Icon: GlobeIcon, t: "Couverture nationale", d: "Partout au Cameroun via nos partenaires." },
  { Icon: ShieldCheck, t: "SAV de proximité", d: "Équipe technique réactive, pas un call center distant." },
];

const steps = [
  { Icon: CalendarIcon, k: "ÉTAPE 1", t: "RDV en ligne" },
  { Icon: PhoneIcon, k: "ÉTAPE 2", t: "Contact sous 24h" },
  { Icon: PinIcon, k: "ÉTAPE 3", t: "Descente gratuite" },
  { Icon: Router, k: "ÉTAPE 4", t: "Cotation sur-mesure" },
  { Icon: Sparkle, k: "ÉTAPE 5", t: "Installation rapide" },
  { Icon: Sparkle, k: "RÉSULTAT", t: "Connecté & vous économisez", result: true },
];

export default function InternetB2B() {
  return (
    <>
      <PageHero
        eyebrow="CONNEXION IP PUBLIQUE · B2B"
        image="/photos/b2b-hero.jpg"
        imageAlt="Datacenter Cherryz"
        title={
          <>
            Internet Dédié. IP Fixe.
            <br />
            Le meilleur du réseau camerounais, au{" "}
            <span className="text-accent-vivid">meilleur prix.</span>
          </>
        }
        subtitle="Cherryz sélectionne pour vous la meilleure infrastructure parmi nos partenaires opérateurs (Camtel, Orange, MTN) et vous livre une connexion professionnelle avec IP dédiée, sans travaux et sans interruption."
        actions={
          <>
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Demander un devis →
            </a>
            <a href="#comment" className={btnGhost}>Comment ça marche ↓</a>
          </>
        }
      />
      <ReassuranceBar />

      {/* QU'EST-CE QU'UNE IP DÉDIÉE */}
      <section className="bg-white pb-24 pt-[104px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-[60px] px-6 md:px-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <SectionEyebrow label="LES FONDAMENTAUX" />
            <h2 className="m-0 font-condensed text-[44px] font-bold leading-[1.03] tracking-[-0.3px]">
              Qu&apos;est-ce qu&apos;une IP
              <br />
              publique dédiée ?
            </h2>
            <p className="mt-[18px] max-w-[520px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
              Votre adresse IP publique, c&apos;est l&apos;identité de votre
              entreprise sur Internet. Elle est indispensable pour faire tourner
              vos outils métier les plus sensibles.
            </p>
            <div className="relative mt-[26px] overflow-hidden rounded-2xl bg-navy px-7 py-[26px]">
              <div className="absolute -right-10 -top-10 h-[150px] w-[150px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.4),transparent 68%)" }} />
              <div className="relative">
                <div className="flex items-center gap-[10px]">
                  <Lock className="text-[22px] text-accent-vivid" />
                  <span className="font-condensed text-[22px] font-bold text-white">
                    Avec Cherryz, votre IP est dédiée
                  </span>
                </div>
                <p className="mt-[9px] font-sans text-[15.5px] leading-[1.55] text-white/[0.72]">
                  Personne d&apos;autre ne la partage. Votre bande passante est
                  garantie, en permanence.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-[14px]" delay={0.08}>
            {usages.map(({ img, alt, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-[14px] border border-navy/[0.07] bg-surface px-[22px] py-5 transition-all hover:translate-x-1 hover:border-cherry-alt/30">
                <div className="relative h-[46px] w-[46px] flex-none overflow-hidden rounded-xl">
                  <Image src={img} alt={alt} fill sizes="46px" className="object-cover" />
                </div>
                <div>
                  <h4 className="m-0 font-condensed text-[20px] font-bold">{t}</h4>
                  <p className="mt-[3px] font-sans text-[14.5px] leading-[1.45] text-navy/60">{d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CE QUE CHERRYZ VOUS APPORTE */}
      <section className="bg-surface-alt py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
            <SectionEyebrow label="CE QUE CHERRYZ VOUS APPORTE" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Une connexion pro, sans
              <br />
              les contraintes d&apos;un opérateur
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-cherry-alt p-[30px] text-white sm:col-span-2">
              <div className="absolute -right-8 -top-10 h-[170px] w-[170px] rounded-full bg-white/[0.08]" />
              <div className="relative">
                <div className="font-condensed text-[13px] font-semibold tracking-[1.4px] text-white/75">PRIX NÉGOCIÉ</div>
                <div className="mt-1 font-condensed text-[46px] font-bold leading-none">
                  70 000 <span className="text-[22px] font-semibold">XAF/Mbps/mois</span>
                </div>
                <p className="mt-[10px] max-w-[360px] font-sans text-[15.5px] leading-[1.5] text-white/85">
                  Grâce à notre pouvoir d&apos;agrégation auprès des opérateurs.
                </p>
              </div>
            </div>
            {features.map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-navy/[0.06] bg-white px-6 py-[26px] transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]">
                <div className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-[11px] bg-cherry-alt/[0.08]">
                  <Icon className="text-[22px] text-cherry-alt" />
                </div>
                <h4 className="m-0 font-condensed text-[20px] font-bold">{t}</h4>
                <p className="mt-[5px] font-sans text-[14.5px] leading-[1.5] text-navy/[0.62]">{d}</p>
              </div>
            ))}
            <div className="relative flex items-center gap-[22px] overflow-hidden rounded-2xl bg-navy p-[30px] text-white sm:col-span-2">
              <div className="absolute -bottom-[50px] -left-8 h-[170px] w-[170px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.35),transparent 68%)" }} />
              <div className="relative flex h-[58px] w-[58px] flex-none items-center justify-center rounded-[14px] bg-white/[0.08]">
                <Users className="text-[28px] text-accent-vivid" />
              </div>
              <div className="relative">
                <h4 className="m-0 font-condensed text-[24px] font-bold">Multi-opérateurs</h4>
                <p className="mt-[5px] max-w-[340px] font-sans text-[15.5px] leading-[1.5] text-white/75">
                  On choisit le meilleur réseau pour <strong className="text-white">votre</strong> localisation, pas celui d&apos;un fournisseur unique.
                </p>
              </div>
            </div>
          </Reveal>
          <p className="mx-1 mt-4 font-sans text-[13px] text-navy/50">
            *Contrat signé devant notaire requis avant le lancement du test.
          </p>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="scroll-mt-20 bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionEyebrow label="COMMENT ÇA MARCHE" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Du premier contact à la connexion
            </h2>
          </Reveal>
          <Reveal className="relative grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-6" delay={0.05}>
            <div className="absolute left-[8%] right-[8%] top-[26px] z-0 hidden h-[2px] lg:block" style={{ background: "repeating-linear-gradient(90deg,rgba(160,4,45,.35) 0 10px,transparent 10px 18px)" }} />
            {steps.map((s) => (
              <div key={s.k} className="relative z-[1] text-center">
                <div
                  className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full text-[22px] text-white"
                  style={{
                    background: s.result ? "#101b28" : "#a0042d",
                    boxShadow: s.result ? "0 12px 24px -12px rgba(16,27,40,.6)" : "0 12px 24px -12px rgba(160,4,45,.9)",
                  }}
                >
                  <s.Icon />
                </div>
                <div className="mt-3 font-condensed text-[12px] font-semibold tracking-[1px]" style={{ color: s.result ? "#101b28" : "#a0042d" }}>
                  {s.k}
                </div>
                <div className="mt-[2px] font-condensed text-[17px] font-bold">{s.t}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-[52px] text-center" delay={0.1}>
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Prendre RDV maintenant →
            </a>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Un Internet pro, dédié,
            <br />à partir de 45 000 XAF/Mbps.
          </>
        }
        subtitle="Notre équipe se déplace gratuitement pour étudier votre situation, partout au Cameroun."
        actions={
          <>
            <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Demander un devis →
            </a>
            <Link href="/wifi-zone" className={btnGhost}>Voir la WiFi Zone →</Link>
          </>
        }
      />
    </>
  );
}
