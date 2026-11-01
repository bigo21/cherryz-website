import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/site/Reveal";
import PageHero, { btnPrimary, btnGhostStrong, btnGhost } from "@/components/site/PageHero";
import ReassuranceBar from "@/components/site/ReassuranceBar";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import LogoMarquee, { type Logo } from "@/components/site/LogoMarquee";
import { ArrowRightIcon, CheckLineIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home.meta");
  return pageMetadata("/", { title: t("title"), description: t("description") });
}

// Comparison rows; their copy lives under `Home.compare.rows`.
const comparatif = [
  { key: "price" },
  { key: "install" },
  { key: "choice" },
  { key: "support" },
  { key: "flex" },
  { key: "test", check: true },
] as const;

const approche = [
  { n: "01", key: "listen", img: "/photos/approche-01-ecoute.jpg" },
  { n: "02", key: "study", img: "/photos/approche-02-etude.jpg" },
  { n: "03", key: "solution", img: "/photos/approche-03-solution.jpg" },
  { n: "04", key: "pricing", img: "/photos/approche-04-cotation.jpg" },
  { n: "05", key: "deploy", img: "/photos/approche-05-deploiement.jpg" },
  { n: "06", key: "followup", img: "/photos/approche-06-suivi.jpg" },
] as const;

const operators = [
  { src: "/logos/orange.png", alt: "Orange Cameroun", h: "h-38" },
  { src: "/logos/mtn.png", alt: "MTN Cameroon", h: "h-38" },
  { src: "/logos/camtel.png", alt: "Camtel", h: "h-40" },
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

export default async function Home() {
  const lang = await getLocale();
  const t = await getTranslations("Home");
  const tc = await getTranslations("Chrome");
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        image="/photos/accueil-hero.jpg"
        imageAlt={t("hero.imageAlt")}
        emphasis
        title={t.rich("hero.title", rich)}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.hub)} className={btnPrimary}>
              {tc("quoteFree")}<ArrowRightIcon className="ml-2" />
            </Link>
            <Link href={localize(lang, "/wifi-zone")} className={btnGhostStrong}>
              {t("hero.wifi")}<ArrowRightIcon className="ml-2" />
            </Link>
          </>
        }
      />
      <ReassuranceBar />

      {/* POURQUOI CHERRYZ */}
      <section id="pourquoi" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -left-6 -top-6 z-0 h-42 w-42 rounded-2xl bg-cherry" />
              <div className="absolute -bottom-4 -right-4 z-0 h-28 w-28 rounded-2xl border-2 border-cherry" />
              <div className="relative z-1 h-118 overflow-hidden rounded-2xl shadow-card">
                <Image
                  src="/photos/pourquoi-cherryz.jpg"
                  alt={t("why.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-4 bottom-8 z-2 rounded-2xl bg-navy px-5 py-4 text-white shadow-card">
                <div className="font-condensed text-title-md font-bold leading-none tabular-nums text-accent-on-dark">
                  {t("why.priceValue")}
                  <span className="text-body text-on-dark-2"> {t("why.priceUnit")}</span>
                </div>
                <div className="mt-1 font-sans text-small font-medium tabular-nums text-on-dark-2">
                  {t("why.priceInstead")}
                </div>
              </div>
            </div>
            <div>
              <SectionEyebrow label={t("why.eyebrow")} />
              <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
                {t.rich("why.title", rich)}
              </h2>
              <p className="mt-4 max-w-[65ch] font-sans text-body text-ink-2">
                {t("why.p1")}
              </p>
              <p className="mt-3 max-w-[65ch] font-sans text-body text-ink-2">
                {t.rich("why.p2", { strong: (c) => <strong className="font-semibold text-navy">{c}</strong> })}
              </p>
            </div>
          </Reveal>

          {/* Comparatif */}
          <Reveal className="mt-18" delay={0.05}>
            {/* Mobile: one card per criterion, Cherryz first, nothing scrolls sideways. */}
            <ul className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
              {comparatif.map((row) => (
                <li key={row.key} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="bg-surface px-5 py-3 font-sans text-body font-semibold text-navy">
                    {t(`compare.rows.${row.key}.label`)}
                  </div>
                  <dl className="m-0 grid grid-cols-label gap-x-4 gap-y-2 px-5 py-4 font-sans text-body">
                    <dt className="font-condensed text-small font-bold tracking-wide text-cherry">{t("compare.cherryShort")}</dt>
                    <dd className="m-0 font-semibold text-navy">
                      {"check" in row ? (
                        <span className="inline-flex items-center gap-2">
                          <CheckLineIcon className="icon-inline text-positive" />
                          {t(`compare.rows.${row.key}.cherry`)}
                        </span>
                      ) : (
                        t(`compare.rows.${row.key}.cherry`)
                      )}
                    </dd>
                    <dt className="font-condensed text-small font-semibold tracking-wide text-ink-2">{t("compare.aloneShort")}</dt>
                    <dd className="m-0 text-ink-2">{t(`compare.rows.${row.key}.alone`)}</dd>
                  </dl>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto rounded-2xl border border-line shadow-card md:block">
              <div className="grid min-w-160 grid-cols-3">
                <div className="bg-surface px-6 py-6 font-condensed text-small font-semibold uppercase tracking-widest text-ink-2">
                  {t("compare.head")}
                </div>
                <div className="border-l border-line bg-surface px-6 py-6 font-condensed text-lead font-bold text-navy">
                  {t("compare.alone")}
                </div>
                <div className="flex items-center gap-2 bg-cherry px-6 py-6 font-condensed text-lead font-bold text-white">
                  {t("compare.cherry")}
                </div>
                {comparatif.map((row) => (
                  <div key={row.key} className="contents">
                    <div className="border-t border-line px-6 py-5 font-sans text-body font-semibold">
                      {t(`compare.rows.${row.key}.label`)}
                    </div>
                    <div className="border-l border-t border-line px-6 py-5 font-sans text-body text-ink-2">
                      {t(`compare.rows.${row.key}.alone`)}
                    </div>
                    <div className="border-t border-line bg-cherry/5 px-6 py-5 font-sans text-body font-semibold text-navy">
                      {"check" in row ? (
                        <span className="inline-flex items-center gap-2">
                          <CheckLineIcon className="icon-inline text-positive" />
                          {t(`compare.rows.${row.key}.cherry`)}
                        </span>
                      ) : (
                        <span className={row.key === "price" ? "text-cherry" : ""}>
                          {t(`compare.rows.${row.key}.cherry`)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mx-1 mt-3 font-sans text-caption tracking-normal text-ink-2">
              {tc("testNote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* NOTRE APPROCHE */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t.rich("approach.title", rich)}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
            {approche.map((s) => (
              <div
                key={s.n}
                className="overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-38">
                  <Image
                    src={s.img}
                    alt={t(`approach.steps.${s.key}.alt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pb-6 pt-6">
                  <div className="font-condensed text-title-md font-bold leading-none tabular-nums text-accent">
                    {s.n}
                  </div>
                  <h3 className="mt-2 font-condensed text-title-sm font-bold">{t(`approach.steps.${s.key}.t`)}</h3>
                  <p className="mt-2 font-sans text-body text-ink-2">
                    {t(`approach.steps.${s.key}.d`)}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-11 text-center" delay={0.1}>
            <p className="mx-auto mb-6 max-w-[65ch] font-sans text-body text-ink-2">
              {t("approach.note")}
            </p>
            <Link
              href={localize(lang, QUOTE.hub)}
              className={btnPrimary}
            >
              {t("approach.cta")}<ArrowRightIcon className="ml-2" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* NOS SERVICES */}
      <section id="services" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t("services.title")}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-7 lg:grid-cols-2" delay={0.05}>
            {([
              { key: "ip", icon: <GlobeIcon className="size-6 text-white" />, image: "/photos/service-ip.jpg", href: "/internet-b2b" },
              { key: "wifi", icon: <WifiIcon className="size-6 text-white" />, image: "/photos/service-wifizone.jpg", href: "/wifi-zone" },
            ] as const).map((s) => (
              <ServiceCard
                key={s.key}
                badge={t(`services.${s.key}.badge`)}
                title={t(`services.${s.key}.title`)}
                icon={s.icon}
                image={s.image}
                imageAlt={t(`services.${s.key}.imageAlt`)}
                rows={[
                  [t("services.whom"), t(`services.${s.key}.whom`)],
                  [t("services.what"), t(`services.${s.key}.what`)],
                  [t("services.plus"), t(`services.${s.key}.plus`)],
                ]}
                href={localize(lang, s.href)}
                more={t(`services.${s.key}.more`)}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ILS NOUS FONT CONFIANCE */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mb-11 text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t("trust.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            {/* Opérateurs partenaires */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-14">
              {operators.map((o) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={o.src}
                  src={o.src}
                  loading="lazy"
                  decoding="async"
                  alt={o.alt}
                  className={`${o.h} w-auto object-contain`}
                />
              ))}
            </div>
            {/* Références clients : bandeaux défilants */}
            <div className="marquee flex flex-col gap-6" tabIndex={0} role="group" aria-label={t("trust.marqueeLabel")}>
              <LogoMarquee logos={clientsRow1} direction="left" />
              <LogoMarquee logos={clientsRow2} direction="right" />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={t.rich("final.title", rich)}
        subtitle={tc("visitLead")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.hub)} className={btnPrimary}>
              {tc("quoteLabel")}<ArrowRightIcon className="ml-2" />
            </Link>
            <Link href={localize(lang, "/contact")} className={btnGhost}>
              {tc("preferCall")}<ArrowRightIcon className="ml-2" />
            </Link>
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
  more,
}: {
  badge: string;
  title: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  rows: [string, string][];
  href: string;
  more: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1">
      <div className="relative h-62">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 scrim-bottom" />
        <div className="absolute left-0 top-5 rounded-r-md bg-cherry px-2 py-3 font-condensed text-caption font-semibold uppercase text-white text-vertical">
          {badge}
        </div>
        <div className="absolute bottom-5 left-6 flex items-center gap-3">
          {icon}
          <span className="font-condensed text-title-md font-bold text-white">{title}</span>
        </div>
      </div>
      <div className="px-8 pb-8 pt-7">
        <div className="grid grid-cols-label gap-x-4 gap-y-2 font-sans text-body">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <span className="font-condensed font-bold tracking-wide text-cherry">{k}</span>
              <span className="text-ink-2">{v}</span>
            </div>
          ))}
        </div>
        <Link
          href={href}
          className="mt-5 inline-block rounded-full bg-navy px-6 py-3 font-condensed text-body font-semibold tracking-wide text-white transition hover:bg-cherry active:scale-[0.97]"
        >
          {more}<ArrowRightIcon className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
