import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import InkHero, { btnCherry, inkLink } from "@/components/site/InkHero";
import QuoteSheet from "@/components/site/QuoteSheet";
import ContactClose from "@/components/site/ContactClose";
import Reveal from "@/components/site/Reveal";
import { ArrowRightIcon, ClipboardIcon } from "@/components/site/icons";
import { CAL_WIFI, QUOTE } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "WiFi Zone monétisable clé en main | Cherryz",
  description:
    "Lancez votre business WiFi : immeuble, quartier, hôtel, campus, marché… Cherryz diagnostique, dimensionne, déploie et automatise la monétisation (vouchers, paiement mobile). Agrément ART, SAV de proximité.",
};

type Ic = ComponentType<SVGProps<SVGSVGElement>>;
const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const Building = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" /></svg>);
const District = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 21V11l5-4 5 4v10z" /><path d="M13 21V9l4-3 4 3v12" /><path d="M6.5 21v-4h3v4" /></svg>);
const Hotel = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M3 8l9-5 9 5M8 21v-4h8v4M7 12h.01M12 12h.01M17 12h.01" /></svg>);
const Campus = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" /></svg>);
const Market = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 9l2-5h14l2 5" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v9h14v-9M10 21v-5h4v5" /></svg>);
const Factory = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 21V10l6 4v-4l6 4V5h4l2 16z" /><path d="M7 18h2M12 18h2" /></svg>);
const Clinic = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="4" y="4" width="16" height="17" rx="1.5" /><path d="M12 8v6M9 11h6M10 21v-3h4v3" /></svg>);
const Bulb = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.7.7-1 1.5-1 2.5H9c0-1-.3-1.8-1-2.5A6 6 0 0 1 12 3z" /></svg>);
const Coins = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3" /></svg>);
const Star = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>);
const Bars = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>);
const Legal = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 3v18M5 7l7-4 7 4M4 11h16M6 11v7M18 11v7" /></svg>);
const Trending = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>);
const ShieldCheck = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>);

const zones: { Icon: Ic; t: string; sub: string; d: string }[] = [
  { Icon: Building, t: "Bâtiment / Immeuble", sub: "Résidences, immeubles de bureaux, co-living", d: "Couverture intérieure multi-étages, portail captif par locataire." },
  { Icon: District, t: "Quartier", sub: "Zone résidentielle, cité, lotissement", d: "Antennes extérieures longue portée, distribution multi-foyers." },
  { Icon: Hotel, t: "Hôtel / Auberge", sub: "Hôtels, motels, maisons d'hôtes", d: "WiFi premium par chambre, gestion par vouchers." },
  { Icon: Campus, t: "Campus / École", sub: "Universités, lycées, centres de formation", d: "Haute densité, gestion de bande passante par zone." },
  { Icon: Market, t: "Marché / Zone commerciale", sub: "Marchés, galeries marchandes, gares", d: "Points d'accès robustes, monétisation par session." },
  { Icon: Factory, t: "Site industriel / Chantier", sub: "Usines, entrepôts, bases vie", d: "Couverture étendue, connexion stable pour opérations." },
  { Icon: Clinic, t: "Clinique / Centre de santé", sub: "Hôpitaux, pharmacies, laboratoires", d: "Réseau sécurisé, séparation flux patients/staff." },
  { Icon: Bulb, t: "Votre idée", sub: "Tout autre espace", d: "On étudie, on propose, on déploie." },
];

const method = [
  { t: "Diagnostic", d: "On visite votre site, on analyse l'environnement, la densité, le potentiel.", obtain: "Une vision claire de la faisabilité et du marché." },
  { t: "Dimensionnement", d: "On calcule la bande passante nécessaire, le nombre de points d'accès, la couverture.", obtain: "Un plan technique adapté à votre zone exacte." },
  { t: "Modèle économique", d: "On structure vos tarifs, vos offres (vouchers, abonnements, forfaits) et vos marges.", obtain: "Un business plan concret avec projection de revenus." },
  { t: "Déploiement", d: "On installe l'infrastructure complète : antennes, routeurs, câblage, portail captif.", obtain: "Une WiFi Zone opérationnelle, prête à vendre." },
  { t: "Automatisation", d: "On configure la monétisation automatique : paiement mobile, vouchers, portail.", obtain: "Vos clients paient et vous encaissez, sans intervention manuelle." },
  { t: "Suivi & SAV", d: "Monitoring à distance, maintenance, optimisation continue.", obtain: "Un business qui tourne, même quand vous dormez." },
];

const diffs: { Icon: Ic; t: string; d: string }[] = [
  { Icon: Coins, t: "Bande passante au meilleur prix", d: "Apportez votre propre connectivité, ou laissez Cherryz s'en occuper : on agrège les meilleures offres Camtel, Orange et MTN, et votre marge est maximisée dès le premier jour." },
  { Icon: Star, t: "Accompagnement de A à Z", d: "Du diagnostic terrain jusqu'à l'automatisation de vos revenus." },
  { Icon: Bars, t: "Business structuré", d: "On ne vous laisse pas avec du matériel, on vous livre un modèle économique clé en main." },
  { Icon: Legal, t: "100% légal", d: "Agrément installeur et revendeur ART : zéro risque juridique." },
  { Icon: Trending, t: "Évolutif", d: "Commencez avec 1 antenne, étendez à tout un quartier, on grandit avec vous." },
  { Icon: ShieldCheck, t: "SAV de proximité", d: "Équipe technique réactive, monitoring continu, intervention rapide." },
];

const cases: { Icon: Ic; who: string; place: string; setup: string; stat: string; unit: string }[] = [
  { Icon: Building, who: "Propriétaire d'immeuble", place: "24 appartements, Yaoundé", setup: "WiFi par étage + vouchers mensuels", stat: "+150 000 XAF", unit: "de revenu par mois" },
  { Icon: District, who: "Entrepreneur de quartier", place: "Zone résidentielle dense, Douala", setup: "3 antennes, couverture 500 m", stat: "+200 clients", unit: "en 2 mois" },
  { Icon: Hotel, who: "Gérant d'hôtel", place: "Hôtel 30 chambres", setup: "WiFi premium inclus dans le tarif chambre", stat: "+40 %", unit: "de satisfaction client" },
];

const h2 = "m-0 font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]";
const h3 = "m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]";
const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12";
const sheet = "sheet-perforated rounded-b-[14px] bg-paper";
const legend = "font-condensed text-[15px] font-semibold tracking-[0.06em] text-ink-soft";

export default function WifiZone() {
  return (
    <>
      <InkHero
        title="Lancez votre business WiFi."
        lead="Bâtiment, quartier, hôtel, campus, marché : Cherryz vous accompagne de l'idée à la rentabilité. On diagnostique, on dimensionne, on déploie et on automatise l'encaissement."
        actions={
          <a href="#methode" className={inkLink}>
            Voir la méthode
          </a>
        }
        facts={["Agrément ART installeur et revendeur", "Diagnostic sur site gratuit", "Paiement mobile intégré"]}
      >
        <QuoteSheet path="wifi" />
      </InkHero>

      {/* TYPES DE ZONES */}
      <section className="bg-ground py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-4">
            <h2 className={h2}>Peu importe la taille. On la dimensionne.</h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              Chaque espace a sa densité, sa portée et sa façon de payer. On
              conçoit la WiFi Zone pour le vôtre.
            </p>
            <p className="mt-6 max-w-[44ch] border-l-2 border-navy pl-5 font-sans text-[17.5px] font-semibold leading-[1.55] text-navy">
              Vous avez une zone et une ambition ? C&apos;est tout ce qu&apos;il
              nous faut pour commencer.
            </p>
          </Reveal>
          <Reveal className={`${sheet} px-5 pb-6 pt-9 sm:px-9 lg:col-span-8`} delay={0.05}>
            <h3 className={h3}>Les espaces qu&apos;on équipe</h3>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 md:grid-cols-2">
              {zones.map(({ Icon, t, sub, d }) => (
                <li key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-[18px]">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{t}</div>
                    <div className="mt-[2px] font-sans text-[14px] font-medium text-ink-soft">{sub}</div>
                    <p className="m-0 mt-2 font-sans text-[16px] leading-[1.5] text-navy">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* NOTRE MÉTHODE */}
      <section id="methode" className="scroll-mt-24 bg-navy-deep py-20 text-white md:py-28">
        <div className={wrap}>
          <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className={`${h2} lg:col-span-7`}>On ne vous vend pas du matériel. On vous monte un business.</h2>
            <p className="m-0 max-w-[48ch] font-sans text-[17.5px] leading-[1.6] text-white/75 lg:col-span-5">
              Vous n&apos;avez pas besoin d&apos;être technicien. Vous avez besoin
              d&apos;un partenaire, et c&apos;est exactement ce qu&apos;on est.
            </p>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-7 pt-9 text-navy sm:px-9`} delay={0.05}>
            <div aria-hidden className={`hidden grid-cols-[56px_1.15fr_1fr] gap-x-8 border-b-2 border-navy pb-3 md:grid ${legend}`}>
              <span>Étape</span>
              <span>Ce qu&apos;on fait</span>
              <span>Ce que vous obtenez</span>
            </div>
            <ol className="m-0 list-none border-t-2 border-navy p-0 md:border-t-0">
              {method.map((m, i) => (
                <li key={m.t} className="grid grid-cols-[44px_1fr] gap-x-3 border-b border-rule py-5 md:grid-cols-[56px_1.15fr_1fr] md:gap-x-8">
                  <span className="font-condensed text-[22px] font-bold tabular-nums text-ink-soft md:row-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight">{m.t}</div>
                    <p className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{m.d}</p>
                  </div>
                  <p className="col-start-2 m-0 mt-3 font-sans text-[16px] font-semibold leading-[1.45] md:col-start-auto md:mt-0">
                    <span className="mr-2 font-condensed text-[14px] font-semibold tracking-[0.06em] text-ink-soft md:hidden">Vous obtenez</span>
                    {m.obtain}
                  </p>
                </li>
              ))}
            </ol>
            <Link href={QUOTE.wifi} className={`${btnCherry} mt-7`}>
              <ClipboardIcon aria-hidden className="text-[20px]" />
              Demander mon diagnostic gratuit
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI CHERRYZ */}
      <section className="bg-paper py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={`${h2} max-w-[20ch]`}>Ce qui nous différencie ? On reste après l&apos;installation.</h2>
          </Reveal>
          <Reveal className="mt-12" delay={0.05}>
            <dl className="m-0 grid grid-cols-1 gap-x-12 border-t-2 border-navy md:grid-cols-2">
              {diffs.map(({ Icon, t, d }) => (
                <div key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-5">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <dt className="font-condensed text-[21px] font-bold leading-tight text-navy">{t}</dt>
                    <dd className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{d}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* PROJETS TYPES */}
      <section id="cas" className="scroll-mt-24 bg-ground py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={h2}>Ce que ça peut donner.</h2>
            <p className="mt-6 max-w-[56ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              Trois projets types, pour situer l&apos;ordre de grandeur. Le vôtre
              sera chiffré après le diagnostic sur site.
            </p>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-6 pt-9 sm:px-9`} delay={0.05}>
            <h3 className={h3}>Projets types</h3>
            <ul className="m-0 list-none p-0">
              {cases.map(({ Icon, who, place, setup, stat, unit }) => (
                <li key={who} className="grid grid-cols-[32px_1fr] items-start gap-x-3 gap-y-3 border-b border-rule py-5 md:grid-cols-[32px_1fr_1fr_auto] md:items-baseline md:gap-x-8">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy md:self-start" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{who}</div>
                    <div className="mt-[2px] font-sans text-[15px] text-ink-soft">{place}</div>
                  </div>
                  <p className="col-start-2 m-0 font-sans text-[16px] leading-[1.5] text-navy md:col-start-auto">{setup}</p>
                  <div className="col-start-2 md:col-start-auto md:text-right">
                    <div className="font-condensed text-[clamp(26px,3vw,32px)] font-bold leading-none tabular-nums text-navy">{stat}</div>
                    <div className="mt-1 font-sans text-[14px] text-ink-soft">{unit}</div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">
              Résultats indicatifs basés sur des projets types. Chaque projet est unique.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactClose
        quoteHref={QUOTE.wifi}
        callHref={CAL_WIFI}
        title="Vous avez un espace. Nous avons la méthode."
        lead="Dites-nous où, dites-nous votre ambition, on s'occupe du reste. Diagnostic gratuit, déplacement sur site, partout au Cameroun."
      />
    </>
  );
}
