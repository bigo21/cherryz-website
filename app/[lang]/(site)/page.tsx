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
import { CheckLineIcon, GlobeIcon, WifiIcon } from "@/components/site/icons";
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
        minHeight={780}
        contentMaxWidth={840}
        emphasis
        title={t.rich("hero.title", rich)}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.hub)} className={btnPrimary}>
              {tc("quoteFree")} →
            </Link>
            <Link href={localize(lang, "/wifi-zone")} className={btnGhostStrong}>
              {t("hero.wifi")} →
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
              <div className="absolute -left-[22px] -top-[22px] z-0 h-[170px] w-[170px] rounded-2xl bg-cherry" />
              <div className="absolute -bottom-4 -right-4 z-0 h-[110px] w-[110px] rounded-2xl border-2 border-cherry" />
              <div className="relative z-[1] h-[470px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-34px_rgba(16,27,40,.5)]">
                <Image
                  src="/photos/pourquoi-cherryz.jpg"
                  alt={t("why.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-[18px] bottom-[34px] z-[2] rounded-[14px] bg-navy px-5 py-4 text-white shadow-[0_22px_46px_-20px_rgba(16,27,40,.6)] animate-float">
                <div className="font-condensed text-[32px] font-bold leading-none text-accent-on-dark">
                  {t("why.priceValue")}
                  <span className="text-[15px] text-white/60"> {t("why.priceUnit")}</span>
                </div>
                <div className="mt-[2px] font-sans text-[13px] font-medium text-white/65">
                  {t("why.priceInstead")}
                </div>
              </div>
            </div>
            <div>
              <SectionEyebrow label={t("why.eyebrow")} />
              <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.03] tracking-[-0.3px]">
                {t.rich("why.title", rich)}
              </h2>
              <p className="mt-[18px] max-w-[560px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
                {t("why.p1")}
              </p>
              <p className="mt-[14px] max-w-[560px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
                {t.rich("why.p2", { strong: (c) => <strong className="text-navy">{c}</strong> })}
              </p>
            </div>
          </Reveal>

          {/* Comparatif */}
          <Reveal className="mt-[70px]" delay={0.05}>
            {/* Mobile: one card per criterion, Cherryz first, nothing scrolls sideways. */}
            <ul className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
              {comparatif.map((row) => (
                <li key={row.key} className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
                  <div className="bg-surface px-5 py-3 font-sans text-[15px] font-semibold text-navy">
                    {t(`compare.rows.${row.key}.label`)}
                  </div>
                  <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 px-5 py-4 font-sans text-[15px]">
                    <dt className="font-condensed text-[14px] font-bold tracking-[0.4px] text-cherry">{t("compare.cherryShort")}</dt>
                    <dd className="m-0 font-semibold text-navy">
                      {"check" in row ? (
                        <span className="inline-flex items-center gap-[6px]">
                          <CheckLineIcon className="inline-block align-[-0.12em] text-positive" />
                          {t(`compare.rows.${row.key}.cherry`)}
                        </span>
                      ) : (
                        t(`compare.rows.${row.key}.cherry`)
                      )}
                    </dd>
                    <dt className="font-condensed text-[14px] font-semibold tracking-[0.4px] text-navy/70">{t("compare.aloneShort")}</dt>
                    <dd className="m-0 text-navy/70">{t(`compare.rows.${row.key}.alone`)}</dd>
                  </dl>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto rounded-2xl border border-navy/10 shadow-[0_30px_60px_-44px_rgba(16,27,40,.5)] md:block">
              <div className="grid min-w-[640px] grid-cols-[1.4fr_1fr_1fr]">
                <div className="bg-surface px-[26px] py-[22px] font-condensed text-[14px] font-semibold uppercase tracking-[1px] text-navy/50">
                  {t("compare.head")}
                </div>
                <div className="border-l border-navy/[0.08] bg-surface px-[26px] py-[22px] font-condensed text-[18px] font-bold text-navy">
                  {t("compare.alone")}
                </div>
                <div className="flex items-center gap-[9px] bg-cherry px-[26px] py-[22px] font-condensed text-[18px] font-bold text-white">
                  {t("compare.cherry")}
                </div>
                {comparatif.map((row) => (
                  <div key={row.key} className="contents">
                    <div className="border-t border-navy/[0.08] px-[26px] py-5 font-sans text-[16px] font-semibold">
                      {t(`compare.rows.${row.key}.label`)}
                    </div>
                    <div className="border-l border-t border-navy/[0.08] px-[26px] py-5 font-sans text-[16px] text-navy/60">
                      {t(`compare.rows.${row.key}.alone`)}
                    </div>
                    <div className="border-t border-navy/[0.08] bg-cherry/[0.04] px-[26px] py-5 font-sans text-[16px] font-semibold text-navy">
                      {"check" in row ? (
                        <span className="inline-flex items-center gap-[6px]">
                          <CheckLineIcon className="inline-block align-[-0.12em] text-positive" />
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
            <p className="mx-1 mt-3 font-sans text-[13px] text-navy/50">
              {tc("testNote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* NOTRE APPROCHE */}
      <section className="bg-surface py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
            <SectionEyebrow label={t("approach.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              {t.rich("approach.title", rich)}
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
                    alt={t(`approach.steps.${s.key}.alt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pb-[26px] pt-[22px]">
                  <div className="font-condensed text-[34px] font-bold leading-none text-cherry opacity-[0.28]">
                    {s.n}
                  </div>
                  <h4 className="mt-[6px] font-condensed text-[22px] font-bold">{t(`approach.steps.${s.key}.t`)}</h4>
                  <p className="mt-[6px] font-sans text-[15px] leading-[1.5] text-navy/[0.62]">
                    {t(`approach.steps.${s.key}.d`)}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-11 text-center" delay={0.1}>
            <p className="mx-auto mb-[22px] max-w-[640px] font-sans text-[16px] leading-[1.6] text-navy/[0.62]">
              {t("approach.note")}
            </p>
            <Link
              href={localize(lang, QUOTE.hub)}
              className="inline-block rounded-full bg-cherry px-7 py-4 font-condensed text-[17px] font-semibold tracking-[0.6px] text-white shadow-[0_16px_34px_-16px_rgba(160,4,45,.8)] transition-transform hover:-translate-y-[2px] hover:bg-cherry-dark"
            >
              {t("approach.cta")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* NOS SERVICES */}
      <section id="services" className="bg-white pb-[100px] pt-[110px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-[58px] max-w-[640px] text-center">
            <SectionEyebrow label={t("services.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-[48px] font-bold leading-[1.02] tracking-[-0.3px]">
              {t("services.title")}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-7 lg:grid-cols-2" delay={0.05}>
            {([
              { key: "ip", icon: <GlobeIcon className="text-[24px] text-white" />, image: "/photos/service-ip.jpg", href: "/internet-b2b" },
              { key: "wifi", icon: <WifiIcon className="text-[24px] text-white" />, image: "/photos/service-wifizone.jpg", href: "/wifi-zone" },
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
      <section className="bg-surface py-[90px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mb-11 text-center">
            <SectionEyebrow label={t("trust.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-[42px] font-bold leading-[1.02] tracking-[-0.3px]">
              {t("trust.title")}
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
            {/* Références clients : bandeaux défilants */}
            <div className="flex flex-col gap-[22px]">
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
              {tc("quoteLabel")} →
            </Link>
            <Link href={localize(lang, "/contact")} className={btnGhost}>
              {tc("preferCall")} →
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
    <div className="relative overflow-hidden rounded-[18px] border border-navy/[0.09] bg-white shadow-[0_26px_54px_-36px_rgba(16,27,40,.45)] transition-all hover:-translate-y-[6px] hover:shadow-[0_38px_66px_-34px_rgba(16,27,40,.55)]">
      <div className="relative h-[250px]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(11,19,29,0) 40%,rgba(11,19,29,.72))" }} />
        <div className="absolute left-0 top-5 rounded-r-[7px] bg-cherry px-2 py-[11px] font-condensed text-[12px] font-semibold tracking-[2px] text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
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
              <span className="font-condensed font-bold tracking-[0.5px] text-cherry">{k}</span>
              <span className="text-navy/70">{v}</span>
            </div>
          ))}
        </div>
        <Link
          href={href}
          className="mt-5 inline-block rounded-full bg-navy px-6 py-[13px] font-condensed text-[15px] font-semibold tracking-[0.5px] text-white transition-colors hover:bg-cherry"
        >
          {more} →
        </Link>
      </div>
    </div>
  );
}
