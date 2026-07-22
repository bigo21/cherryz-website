import type { Metadata } from "next";
import type { SVGProps, ComponentType } from "react";
import Link from "next/link";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import Reveal from "@/components/site/Reveal";
import Image from "next/image";
import { CAL_WIFI } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "WiFi Zone monétisable clé en main — Cherryz",
  description:
    "Lancez votre business WiFi : immeuble, quartier, hôtel, campus, marché… Cherryz diagnostique, dimensionne, déploie et automatise la monétisation (vouchers, paiement mobile). Agrément ART, SAV de proximité.",
};

type Ic = ComponentType<SVGProps<SVGSVGElement>>;
const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const S = (d: string): Ic => {
  const C = (p: SVGProps<SVGSVGElement>) => (
    <svg {...l(p)} dangerouslySetInnerHTML={{ __html: d }} />
  );
  C.displayName = "Icon";
  return C;
};

const Building = S('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>');
const District = S('<path d="M3 21V11l5-4 5 4v10z"/><path d="M13 21V9l4-3 4 3v12"/><path d="M6.5 21v-4h3v4"/>');
const Hotel = S('<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 8l9-5 9 5M8 21v-4h8v4M7 12h.01M12 12h.01M17 12h.01"/>');
const Bulb = S('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.7.7-1 1.5-1 2.5H9c0-1-.3-1.8-1-2.5A6 6 0 0 1 12 3z"/>');
const Search = S('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>');
const Ruler = S('<path d="M3 17L17 3l4 4L7 21z"/><path d="M8 8l2 2M11 5l2 2M5 11l2 2"/>');
const Router = S('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10v4M18 10v4"/>');
const Magic = S('<path d="M14.5 6a3.5 3.5 0 0 0-4.6 4.6l-6 6L6 19l6-6a3.5 3.5 0 0 0 4.6-4.6l-2 2-2-.5-.5-2z"/>');
const Gear = S('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>');
const Shield = S('<path d="M12 3l8 3v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>');
const Dollar = S('<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>');
const Star = S('<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>');
const Bars = S('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>');
const Legal = S('<path d="M12 3v18M5 7l7-4 7 4M4 11h16M6 11v7M18 11v7"/>');
const Trending = S('<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>');
const ShieldCheck = S('<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>');

const zones: { img?: string; alt?: string; Icon?: Ic; t: string; sub: string; d: string; red?: boolean }[] = [
  { img: "/photos/zone-batiment.jpg", alt: "Immeuble résidentiel", t: "Bâtiment / Immeuble", sub: "Résidences, immeubles de bureaux, co-living", d: "Couverture intérieure multi-étages, portail captif par locataire." },
  { img: "/photos/zone-quartier.jpg", alt: "Quartier résidentiel", t: "Quartier", sub: "Zone résidentielle, cité, lotissement", d: "Antennes extérieures longue portée, distribution multi-foyers." },
  { img: "/photos/zone-hotel.jpg", alt: "Hôtel / Auberge", t: "Hôtel / Auberge", sub: "Hôtels, motels, maisons d'hôtes", d: "WiFi premium par chambre, gestion par vouchers." },
  { img: "/photos/zone-campus.jpg", alt: "Campus / École", t: "Campus / École", sub: "Universités, lycées, centres de formation", d: "Haute densité, gestion de bande passante par zone." },
  { img: "/photos/zone-marche.jpg", alt: "Marché / Zone commerciale", t: "Marché / Zone commerciale", sub: "Marchés, galeries marchandes, gares", d: "Points d'accès robustes, monétisation par session." },
  { img: "/photos/zone-industriel.jpg", alt: "Site industriel / Chantier", t: "Site industriel / Chantier", sub: "Usines, entrepôts, bases vie", d: "Couverture étendue, connexion stable pour opérations." },
  { img: "/photos/zone-clinique.jpg", alt: "Clinique / Centre de santé", t: "Clinique / Centre de santé", sub: "Hôpitaux, pharmacies, laboratoires", d: "Réseau sécurisé, séparation flux patients/staff." },
  { Icon: Bulb, t: "Votre idée", sub: "Tout autre espace", d: "On étudie, on propose, on déploie.", red: true },
];

const method: { Icon: Ic; step: string; d: string; obtain: string }[] = [
  { Icon: Search, step: "ÉTAPE 1 · DIAGNOSTIC", d: "On visite votre site, on analyse l'environnement, la densité, le potentiel.", obtain: "Une vision claire de la faisabilité et du marché." },
  { Icon: Ruler, step: "ÉTAPE 2 · DIMENSIONNEMENT", d: "On calcule la bande passante nécessaire, le nombre de points d'accès, la couverture.", obtain: "Un plan technique adapté à votre zone exacte." },
  { Icon: Router, step: "ÉTAPE 3 · MODÈLE ÉCONOMIQUE", d: "On structure vos tarifs, vos offres (vouchers, abonnements, forfaits) et vos marges.", obtain: "Un business plan concret avec projection de revenus." },
  { Icon: Magic, step: "ÉTAPE 4 · DÉPLOIEMENT", d: "On installe l'infrastructure complète — antennes, routeurs, câblage, portail captif.", obtain: "Une WiFi Zone opérationnelle, prête à vendre." },
  { Icon: Gear, step: "ÉTAPE 5 · AUTOMATISATION", d: "On configure la monétisation automatique — paiement mobile, vouchers, portail.", obtain: "Vos clients paient, vous encaissez — sans intervention manuelle." },
  { Icon: Shield, step: "ÉTAPE 6 · SUIVI & SAV", d: "Monitoring à distance, maintenance, optimisation continue.", obtain: "Un business qui tourne, même quand vous dormez." },
];

const diffs: { Icon: Ic; t: string; d: string }[] = [
  { Icon: Star, t: "Accompagnement de A à Z", d: "Du diagnostic terrain jusqu'à l'automatisation de vos revenus." },
  { Icon: Bars, t: "Business structuré", d: "On ne vous laisse pas avec du matériel — on vous livre un business modèle clé en main." },
  { Icon: Legal, t: "100% légal", d: "Agrément installeur et revendeur ART — zéro risque juridique." },
  { Icon: Trending, t: "Scalable", d: "Commencez avec 1 antenne, étendez à tout un quartier — on grandit avec vous." },
  { Icon: ShieldCheck, t: "SAV de proximité", d: "Équipe technique réactive, monitoring continu, intervention rapide." },
];

const cases: { Icon: Ic; badge: string; place: string; desc: string; stat: string; suffix: string; img: string; alt: string }[] = [
  { Icon: Building, badge: "Propriétaire d'immeuble", place: "24 appartements, Yaoundé", desc: "WiFi par étage + vouchers mensuels.", stat: "+150 000 XAF", suffix: " /mois de revenu passif", img: "/photos/cas-immeuble.jpg", alt: "Immeuble à Yaoundé" },
  { Icon: District, badge: "Entrepreneur de quartier", place: "Zone résidentielle dense, Douala", desc: "3 antennes, couverture 500m.", stat: "+200 clients", suffix: " en 2 mois", img: "/photos/cas-quartier.jpg", alt: "Quartier à Douala" },
  { Icon: Hotel, badge: "Gérant d'hôtel", place: "Hôtel 30 chambres", desc: "WiFi premium inclus dans le tarif chambre.", stat: "+40%", suffix: " satisfaction client", img: "/photos/cas-hotel.jpg", alt: "Hôtel connecté" },
];

const featureCard =
  "rounded-2xl border border-navy/[0.07] bg-surface px-6 py-[26px] transition-all hover:-translate-y-[5px] hover:bg-white hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]";

export default function WifiZone() {
  return (
    <>
      <PageHero
        eyebrow="WIFI ZONE · BUSINESS CLÉ EN MAIN"
        image="/photos/wifi-hero.jpg"
        imageAlt="Quartier camerounais connecté"
        minHeight={720}
        title={
          <>
            Lancez votre business Wifi.
            <br />
            On s&apos;occupe de <span className="text-accent-vivid">tout.</span>
          </>
        }
        subtitle="Bâtiment, quartier, résidence, campus, marché, hôtel — quel que soit votre espace, Cherryz vous accompagne de l'idée à la rentabilité. On diagnostique, on dimensionne, on déploie, et on automatise l'infrastructure réseau de votre business."
        actions={
          <>
            <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Parlez-nous de votre projet →
            </a>
            <a href="#cas" className={btnGhost}>Découvrir nos réalisations ↓</a>
          </>
        }
      />

      {/* TYPES DE ZONES */}
      <section className="bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[720px] text-center">
            <SectionEyebrow label="VOTRE PROJET. NOTRE EXPERTISE." centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Peu importe la taille. On construit
              <br />
              votre WiFi Zone sur-mesure.
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            {zones.map((z) =>
              z.red ? (
                <div
                  key={z.t}
                  className="relative overflow-hidden rounded-2xl bg-cherry-alt px-6 py-[26px] text-white transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-30px_rgba(160,4,45,.8)]"
                >
                  <div className="absolute -right-8 -top-8 h-[120px] w-[120px] rounded-full bg-white/10" />
                  <div className="relative">
                    {z.Icon && <z.Icon className="text-[30px] text-white" />}
                    <h4 className="mt-3 font-condensed text-[21px] font-bold">{z.t}</h4>
                    <div className="mt-1 font-sans text-[13px] font-semibold text-white/70">{z.sub}</div>
                    <p className="mt-[10px] border-t border-white/20 pt-[10px] font-sans text-[14.5px] leading-[1.5] text-white/90">
                      {z.d}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={z.t}
                  className="overflow-hidden rounded-2xl border border-navy/[0.07] bg-white transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]"
                >
                  <div className="relative h-[110px]">
                    <Image
                      src={z.img!}
                      alt={z.alt ?? z.t}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-[22px] pb-6 pt-5">
                    <h4 className="font-condensed text-[21px] font-bold">{z.t}</h4>
                    <div className="mt-1 font-sans text-[13px] font-semibold text-navy/50">{z.sub}</div>
                    <p className="mt-[10px] border-t border-navy/[0.08] pt-[10px] font-sans text-[14.5px] leading-[1.5] text-navy/[0.66]">
                      {z.d}
                    </p>
                  </div>
                </div>
              ),
            )}
          </Reveal>
          <Reveal className="mx-auto mt-9 max-w-[620px] text-center" delay={0.1}>
            <p className="font-sans text-[18px] font-medium leading-[1.5] text-navy">
              Vous avez une zone et une ambition ?{" "}
              <span className="text-cherry-alt">C&apos;est tout ce qu&apos;il nous faut pour commencer.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* NOTRE MÉTHODE */}
      <section className="bg-navy py-[104px] text-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-[58px] max-w-[720px] text-center">
            <div className="mb-[14px] inline-flex items-center gap-[9px]">
              <span className="inline-block h-[2px] w-[26px] bg-accent-vivid" />
              <span className="font-condensed text-[13px] font-semibold tracking-[2px] text-accent-vivid">NOTRE MÉTHODE</span>
              <span className="inline-block h-[2px] w-[26px] bg-accent-vivid" />
            </div>
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px] text-white">
              On ne vous vend pas du matériel.
              <br />
              On vous monte un business.
            </h2>
          </Reveal>
          <Reveal className="mx-auto flex max-w-[1000px] flex-col gap-[14px]" delay={0.05}>
            {method.map((m) => (
              <div key={m.step} className="grid grid-cols-1 items-center gap-[22px] rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-[26px] py-[22px] md:grid-cols-[64px_1.2fr_1fr]">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-cherry-alt text-[24px] text-white">
                  <m.Icon />
                </div>
                <div>
                  <div className="font-condensed text-[13px] font-bold tracking-[1px] text-accent-vivid">{m.step}</div>
                  <p className="mt-1 font-sans text-[15.5px] leading-[1.5] text-white/80">{m.d}</p>
                </div>
                <div className="border-white/[0.12] md:border-l md:pl-[22px]">
                  <div className="font-condensed text-[12px] font-semibold tracking-[1px] text-white/45">VOUS OBTENEZ</div>
                  <p className="mt-[3px] font-sans text-[15.5px] font-semibold leading-[1.4] text-white">{m.obtain}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-11 text-center" delay={0.1}>
            <p className="mx-auto mb-6 max-w-[620px] font-sans text-[17px] leading-[1.6] text-white/[0.72]">
              Vous n&apos;avez pas besoin d&apos;être technicien. Vous avez besoin
              d&apos;un partenaire. <strong className="text-white">C&apos;est exactement ce qu&apos;on est.</strong>
            </p>
            <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Réserver mon diagnostic gratuit →
            </a>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI CHERRYZ POUR WIFI */}
      <section className="bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[720px] text-center">
            <SectionEyebrow label="POURQUOI CHERRYZ" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Ce qui nous différencie ?
              <br />
              On reste après l&apos;installation.
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
            <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-navy/[0.07] bg-surface px-8 py-[30px] sm:col-span-2 lg:col-span-3">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[14px] bg-cherry-alt">
                <Dollar className="text-[26px] text-white" />
              </div>
              <div className="min-w-[280px] flex-1">
                <h4 className="m-0 font-condensed text-[24px] font-bold">Bande passante au meilleur prix</h4>
                <p className="mt-[6px] font-sans text-[15.5px] leading-[1.55] text-navy/[0.66]">
                  Vous avez le choix : apportez votre propre solution de
                  connectivité, ou laissez Cherryz s&apos;en occuper. On agrège
                  les meilleures offres Camtel, Orange et MTN — et votre marge est
                  maximisée dès le premier jour.
                </p>
              </div>
            </div>
            {diffs.map((f) => (
              <div key={f.t} className={featureCard}>
                <div className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-[11px] bg-cherry-alt/[0.08]">
                  <f.Icon className="text-[22px] text-cherry-alt" />
                </div>
                <h4 className="m-0 font-condensed text-[21px] font-bold">{f.t}</h4>
                <p className="mt-[6px] font-sans text-[14.5px] leading-[1.5] text-navy/[0.64]">{f.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAS D'USAGE */}
      <section id="cas" className="scroll-mt-20 bg-surface-alt py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionEyebrow label="CAS D'USAGE CONCRETS" centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              Ils l&apos;ont fait. Pourquoi pas vous ?
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-3" delay={0.05}>
            {cases.map((c) => (
              <div key={c.badge} className="overflow-hidden rounded-[18px] border border-navy/[0.07] bg-white shadow-[0_24px_50px_-36px_rgba(16,27,40,.45)]">
                <div className="relative h-[180px]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute left-[14px] top-[14px] inline-flex items-center gap-[6px] rounded-full bg-navy-deep/75 px-3 py-[6px] font-condensed text-[13px] font-semibold tracking-[0.5px] text-white">
                    <c.Icon className="align-[-0.14em]" /> {c.badge}
                  </div>
                </div>
                <div className="px-6 pb-[26px] pt-6">
                  <div className="font-sans text-[14px] font-semibold text-navy/55">{c.place}</div>
                  <p className="mt-2 font-sans text-[15px] leading-[1.5] text-navy/70">{c.desc}</p>
                  <div className="mt-4 border-t border-navy/[0.08] pt-4 font-condensed text-[24px] font-bold text-cherry-alt">
                    {c.stat}
                    <span className="text-[15px] font-semibold text-navy/50">{c.suffix}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <p className="mt-6 text-center font-sans text-[13px] text-navy/50">
            *Résultats indicatifs basés sur des projets types. Chaque projet est unique.
          </p>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Vous avez un espace.
            <br />
            Nous avons la méthode.
          </>
        }
        subtitle="Dites-nous où, dites-nous votre ambition — on s'occupe du reste. Diagnostic gratuit. Déplacement sur site. Partout au Cameroun."
        actions={
          <>
            <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Lancer mon projet WiFi Zone →
            </a>
            <Link href="/internet-b2b" className={btnGhost}>Besoin d&apos;Internet B2B plutôt ? →</Link>
          </>
        }
      />
    </>
  );
}
