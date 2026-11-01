import type { Metadata } from "next";
import type { SVGProps, ComponentType } from "react";
import Link from "next/link";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import Reveal from "@/components/site/Reveal";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/site/icons";
import ExternalLink from "@/components/site/ExternalLink";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { CAL_WIFI, QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/i18n/server";
import type messages from "@/messages/fr.json";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WifiZone.meta");
  return pageMetadata("/wifi-zone", { title: t("title"), description: t("description") });
}

type Ic = ComponentType<SVGProps<SVGSVGElement>>;
type Copy = (typeof messages)["WifiZone"];
const l = (p: SVGProps<SVGSVGElement>) => ({
  "aria-hidden": true, viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
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

// Copy of each list lives under `WifiZone.*` in messages, keyed like below.
const zones: { key: keyof Copy["zones"]["items"]; img?: string; Icon?: Ic; red?: boolean }[] = [
  { key: "building", img: "/photos/zone-batiment.jpg" },
  { key: "district", img: "/photos/zone-quartier.jpg" },
  { key: "hotel", img: "/photos/zone-hotel.jpg" },
  { key: "campus", img: "/photos/zone-campus.jpg" },
  { key: "market", img: "/photos/zone-marche.jpg" },
  { key: "industrial", img: "/photos/zone-industriel.jpg" },
  { key: "clinic", img: "/photos/zone-clinique.jpg" },
  { key: "idea", Icon: Bulb, red: true },
];

const method: { Icon: Ic; key: keyof Copy["method"]["steps"] }[] = [
  { Icon: Search, key: "diagnostic" },
  { Icon: Ruler, key: "sizing" },
  { Icon: Router, key: "model" },
  { Icon: Magic, key: "deploy" },
  { Icon: Gear, key: "automation" },
  { Icon: Shield, key: "support" },
];

const diffs: { Icon: Ic; key: keyof Copy["why"]["diffs"] }[] = [
  { Icon: Star, key: "az" },
  { Icon: Bars, key: "business" },
  { Icon: Legal, key: "legal" },
  { Icon: Trending, key: "scalable" },
  { Icon: ShieldCheck, key: "support" },
];

const cases: { Icon: Ic; key: keyof Copy["cases"]["items"]; img: string }[] = [
  { Icon: Building, key: "building", img: "/photos/cas-immeuble.jpg" },
  { Icon: District, key: "district", img: "/photos/cas-quartier.jpg" },
  { Icon: Hotel, key: "hotel", img: "/photos/cas-hotel.jpg" },
];

const featureCard =
  "rounded-2xl border border-line bg-surface px-6 py-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-card";

export default async function WifiZone() {
  const lang = await getLocale();
  const t = await getTranslations("WifiZone");
  const tc = await getTranslations("Chrome");
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        image="/photos/wifi-hero.jpg"
        imageAlt={t("hero.imageAlt")}
        title={t.rich("hero.title", rich)}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.wifi)} className={btnPrimary}>
              {tc("quoteFree")}<ArrowRightIcon className="ml-2" />
            </Link>
            <a href="#cas" className={btnGhost}>{t("hero.cases")}<ArrowDownIcon className="ml-2" /></a>
          </>
        }
      />

      {/* TYPES DE ZONES */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <SectionEyebrow label={t("zones.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t.rich("zones.title", rich)}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            {zones.map((z) =>
              z.red ? (
                <div
                  key={z.key}
                  className="relative overflow-hidden rounded-2xl bg-cherry px-6 py-6 text-white transition-all hover:-translate-y-1 hover:shadow-cherry"
                >
                  <div className="absolute -right-8 -top-8 h-30 w-30 rounded-full bg-white/10" />
                  <div className="relative">
                    {z.Icon && <z.Icon className="size-8 text-white" />}
                    <h3 className="mt-3 font-condensed text-title-sm font-bold">{t(`zones.items.${z.key}.t`)}</h3>
                    <div className="mt-1 font-sans text-small font-semibold text-on-dark-2">{t(`zones.items.${z.key}.sub`)}</div>
                    <p className="mt-2 border-t border-white/20 pt-2 font-sans text-small text-white">
                      {t(`zones.items.${z.key}.d`)}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={z.key}
                  className="overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative h-28">
                    <Image
                      src={z.img!}
                      alt={t(`zones.items.${z.key}.alt`)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 pb-6 pt-5">
                    <h3 className="font-condensed text-title-sm font-bold">{t(`zones.items.${z.key}.t`)}</h3>
                    <div className="mt-1 font-sans text-small font-semibold text-ink-2">{t(`zones.items.${z.key}.sub`)}</div>
                    <p className="mt-2 border-t border-line pt-2 font-sans text-small text-ink-2">
                      {t(`zones.items.${z.key}.d`)}
                    </p>
                  </div>
                </div>
              ),
            )}
          </Reveal>
          <Reveal className="mx-auto mt-9 max-w-xl text-center" delay={0.1}>
            <p className="font-sans text-lead font-medium text-navy">
              {t.rich("zones.ambition", { em: (c) => <span className="text-cherry">{c}</span> })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* NOTRE MÉTHODE */}
      <section className="bg-navy py-20 md:py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-white">
              {t.rich("method.title", rich)}
            </h2>
          </Reveal>
          <Reveal className="mx-auto flex max-w-5xl flex-col gap-3" delay={0.05}>
            {method.map((m) => (
              <div key={m.key} className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-white/10 px-6 py-6 md:grid-cols-12">
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-cherry text-title-sm text-white md:col-span-1">
                  <m.Icon />
                </div>
                <div className="md:col-span-6">
                  <div className="font-condensed text-caption font-bold uppercase text-accent-on-dark">{t(`method.steps.${m.key}.step`)}</div>
                  <p className="mt-1 font-sans text-body text-on-dark-2">{t(`method.steps.${m.key}.d`)}</p>
                </div>
                <div className="border-white/10 md:col-span-5 md:border-l md:pl-6">
                  <div className="font-condensed text-caption font-semibold uppercase text-on-dark-2">{t("method.obtain")}</div>
                  <p className="mt-1 font-sans text-body font-semibold text-white">{t(`method.steps.${m.key}.obtain`)}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-11 text-center" delay={0.1}>
            <p className="mx-auto mb-6 max-w-[65ch] font-sans text-lead text-on-dark-2">
              {t.rich("method.partner", { strong: (c) => <strong className="font-semibold text-white">{c}</strong> })}
            </p>
            <Link href={localize(lang, QUOTE.wifi)} className={btnPrimary}>
              {t("method.cta")}<ArrowRightIcon className="ml-2" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI CHERRYZ POUR WIFI */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t.rich("why.title", rich)}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
            {/* Highlighted card, first of six: the grid stays full on 2 and 3 columns. */}
            <div className="rounded-2xl border border-cherry/20 bg-cherry-tint px-6 py-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cherry">
                <Dollar className="size-6 text-white" />
              </div>
              <h3 className="m-0 font-condensed text-title-sm font-bold">{t("why.bandwidthTitle")}</h3>
              <p className="mt-2 font-sans text-small text-ink-2">{t("why.bandwidthBody")}</p>
            </div>
            {diffs.map((f) => (
              <div key={f.key} className={featureCard}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cherry/10">
                  <f.Icon className="size-6 text-cherry" />
                </div>
                <h3 className="m-0 font-condensed text-title-sm font-bold">{t(`why.diffs.${f.key}.t`)}</h3>
                <p className="mt-2 font-sans text-small text-ink-2">{t(`why.diffs.${f.key}.d`)}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAS D'USAGE */}
      <section id="cas" className="scroll-mt-20 bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight">
              {t("cases.title")}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-3" delay={0.05}>
            {cases.map((c) => (
              <div key={c.key} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className="relative h-45">
                  <Image
                    src={c.img}
                    alt={t(`cases.items.${c.key}.alt`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-navy/75 px-3 py-2 font-condensed text-small font-semibold tracking-wide text-white">
                    <c.Icon className="icon-inline" /> {t(`cases.items.${c.key}.badge`)}
                  </div>
                </div>
                <div className="px-6 pb-6 pt-6">
                  <div className="font-sans text-small font-semibold text-ink-3">{t(`cases.items.${c.key}.place`)}</div>
                  <p className="mt-2 font-sans text-body text-ink-2">{t(`cases.items.${c.key}.desc`)}</p>
                  <div className="mt-4 border-t border-line pt-4 font-condensed text-title-sm font-bold text-cherry">
                    {t(`cases.items.${c.key}.stat`)}
                    <span className="text-body font-semibold text-ink-3">{t(`cases.items.${c.key}.suffix`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <p className="mt-6 text-center font-sans text-caption tracking-normal text-ink-2">
            {t("cases.note")}
          </p>
        </div>
      </section>

      <FinalCta
        title={t.rich("final.title", rich)}
        subtitle={t("final.subtitle")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.wifi)} className={btnPrimary}>
              {t("final.cta")}<ArrowRightIcon className="ml-2" />
            </Link>
            <ExternalLink href={CAL_WIFI} className={btnGhost}>
              {tc("preferCall")}
            </ExternalLink>
          </>
        }
      />
    </>
  );
}
