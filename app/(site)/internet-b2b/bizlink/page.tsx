import type { Metadata } from "next";
import type { SVGProps } from "react";
import Link from "next/link";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import Reveal from "@/components/site/Reveal";
import QuoteWizard from "@/components/quote/QuoteWizard";
import { ClipboardIcon, PinIcon, WhatsAppIcon } from "@/components/site/icons";
import { BIZLINK, CONTACT } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Promo BizLink : Internet entreprises à 75 000 FCFA/mois | Cherryz",
  description:
    "BizLink, l'offre Internet pensée pour les entreprises, au prix promo : 75 000 FCFA/mois TTC, jusqu'à 250 Mbps, adresse IP publique, matériel offert. Pour les écoles, hôtels 1 et 2 étoiles et microfinances.",
};

const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const Flask = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M10 2h4v6l4 10a2 2 0 0 1-2 3H8a2 2 0 0 1-2-3l4-10z" /></svg>);
const Router = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 10v4M18 10v4" /></svg>);

const highlights = [
  { v: "0 F", t: "Matériel offert" },
  { v: "250", t: "Utilisateurs connectés" },
  { v: "IP", t: "Adresse IP publique" },
];

// Wording to be validated by Yvan (not on the promo visual).
const steps = [
  { Icon: ClipboardIcon, k: "ÉTAPE 1", t: "Demande en ligne" },
  { Icon: PinIcon, k: "ÉTAPE 2", t: "Étude de faisabilité" },
  { Icon: Flask, k: "ÉTAPE 3", t: "Test gratuit" },
  { Icon: Router, k: "ÉTAPE 4", t: "Installation & connexion" },
];

export default function Bizlink() {
  return (
    <>
      <PageHero
        eyebrow="ÉCOLES · HÔTELS · MICROFINANCES"
        image="/photos/approche-04-cotation.jpg"
        imageAlt="Un homme et une femme souriants devant une tablette"
        title={
          <>
            Votre connexion ne vous satisfait plus ?{" "}
            <span className="whitespace-nowrap text-accent-vivid">Passez à BizLink.</span>
          </>
        }
        subtitle="L'offre Internet pensée pour les entreprises, au prix promo."
        actions={
          <>
            <a href="#formulaire" className={btnPrimary}>
              {BIZLINK.cta} →
            </a>
            <a href={BIZLINK.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <WhatsAppIcon className="mr-2 inline-block h-[18px] w-[18px] align-[-3px] text-whatsapp" />
              WhatsApp
            </a>
          </>
        }
      />

      {/* L'OFFRE */}
      <section className="bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
            <SectionEyebrow label="L'OFFRE PROMO" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              BizLink en un coup d&apos;œil
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-3" delay={0.05}>
            <div className="relative overflow-hidden rounded-2xl bg-cherry-alt p-[30px] text-white sm:col-span-3 md:px-10 md:py-9">
              <div className="absolute -right-8 -top-10 h-[170px] w-[170px] rounded-full bg-white/[0.08]" />
              <div className="relative">
                <span className="inline-block rounded-full bg-white px-[15px] py-[6px] font-condensed text-[13px] font-semibold tracking-[1.4px] text-cherry-alt">
                  OFFRE PROMO
                </span>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 font-condensed font-bold leading-none">
                  <span className="text-[clamp(64px,10vw,110px)]">75 000</span>
                  <span className="text-[clamp(22px,2.6vw,32px)] font-semibold">FCFA / mois TTC</span>
                </div>
                <p className="mt-4 font-condensed text-[clamp(22px,2.4vw,28px)] font-bold text-white/90">
                  Jusqu&apos;à 250 Mbps
                </p>
              </div>
            </div>
            {highlights.map(({ v, t }) => (
              <div key={t} className="rounded-2xl border border-navy/[0.06] bg-surface px-6 py-[26px] transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]">
                <div className="font-condensed text-[46px] font-bold leading-none text-cherry-alt">{v}</div>
                <h3 className="m-0 mt-2 font-condensed text-[20px] font-bold">{t}</h3>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-5 flex flex-col items-start gap-4 rounded-2xl border-[1.5px] border-dashed border-cherry-alt/40 px-6 py-[22px] sm:flex-row sm:items-center sm:gap-6 sm:px-7" delay={0.1}>
            <span className="flex-none rounded-btn bg-cherry-alt px-4 py-[10px] font-condensed text-[17px] font-bold leading-[1.1] tracking-[1px] text-white">
              TEST GRATUIT
            </span>
            <p className="m-0 font-sans text-[16.5px] leading-[1.55] text-navy/80">
              Yaoundé, Douala ou partout au Cameroun. Contactez-nous, et si vous
              êtes éligible, profitez de la promo.
            </p>
          </Reveal>
          <p className="mx-1 mt-4 font-sans text-[13px] text-navy/60">
            Offre réservée aux écoles, hôtels 1 et 2 étoiles et microfinances
            éligibles, sur étude de faisabilité. Conditions d&apos;engagement à
            préciser.
          </p>
        </div>
      </section>

      {/* COMMENT EN PROFITER */}
      <section className="bg-surface-alt py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionEyebrow label="COMMENT EN PROFITER" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              De la demande à la connexion
            </h2>
          </Reveal>
          <Reveal className="relative grid grid-cols-2 gap-[14px] lg:grid-cols-4" delay={0.05}>
            <div className="absolute left-[12%] right-[12%] top-[26px] z-0 hidden h-[2px] lg:block" style={{ background: "repeating-linear-gradient(90deg,rgba(160,4,45,.35) 0 10px,transparent 10px 18px)" }} />
            {steps.map((s) => (
              <div key={s.k} className="relative z-[1] text-center">
                <div className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-cherry-alt text-[22px] text-white shadow-[0_12px_24px_-12px_rgba(160,4,45,.9)]">
                  <s.Icon />
                </div>
                <div className="mt-3 font-condensed text-[12px] font-semibold tracking-[1px] text-cherry-alt">
                  {s.k}
                </div>
                <div className="mt-[2px] font-condensed text-[17px] font-bold">{s.t}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-[52px] text-center" delay={0.1}>
            <a href="#formulaire" className={btnPrimary}>
              {BIZLINK.cta} →
            </a>
          </Reveal>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="scroll-mt-20 bg-surface pb-[100px] pt-[104px]">
        <div className="mx-auto max-w-[700px] px-6">
          <div className="mb-10 text-center">
            <SectionEyebrow label="PROMO BIZLINK" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Profitez de la promo
            </h2>
            <p className="mt-[14px] font-sans text-[17px] leading-[1.55] text-navy/70">
              ± 2 minutes · Vérification de votre éligibilité · Test gratuit
            </p>
          </div>
          <QuoteWizard type="bizlink" embedded />
          <p className="mt-8 text-center font-sans text-[15px] text-navy/70">
            Votre structure n&apos;est pas concernée ?{" "}
            <Link href="/internet-b2b" className="font-semibold text-cherry-alt underline underline-offset-4">
              Découvrez Internet B2B
            </Link>
          </p>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Fini les tracas
            <br />
            de connexion.
          </>
        }
        subtitle={`WhatsApp : ${BIZLINK.whatsappDisplay} · ${CONTACT.email} · ${CONTACT.site}`}
        actions={
          <>
            <a href="#formulaire" className={btnPrimary}>
              {BIZLINK.cta} →
            </a>
            <a href={BIZLINK.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              Écrire sur WhatsApp →
            </a>
          </>
        }
      />
    </>
  );
}
