import type { Metadata } from "next";
import type { SVGProps } from "react";
import Link from "next/link";
import InkHero, { btnCherry, inkLink } from "@/components/site/InkHero";
import QuoteSheet from "@/components/site/QuoteSheet";
import ContactClose from "@/components/site/ContactClose";
import Reveal from "@/components/site/Reveal";
import { ArrowRightIcon, ClipboardIcon, GlobeIcon, PhoneIcon, PinIcon } from "@/components/site/icons";
import { CAL_IP, QUOTE } from "@/lib/site/site";
import { internetB2B } from "@/content/internet-b2b";
import { localize } from "@/lib/i18n/config";
import { getLang, pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata(lang, "/internet-b2b", internetB2B[lang].meta);
}

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
const Server = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>);
const Camera = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M3 8l12-3 2 6-12 3z" /><path d="M17 11l4 1-1 4M5 14v6M3 20h4" /></svg>);
const Check = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M5 13l4 4L19 7" /></svg>);

// Icons, in the order of the items in content/internet-b2b.ts.
const usageIcons = [Lock, Server, PhoneIcon, ShieldCheck, Camera];
const featureIcons = [Users, Bolt, Lock, Flask, GlobeIcon, ShieldCheck];
const stepIcons = [ClipboardIcon, PhoneIcon, PinIcon, Router, Bolt, Check];

const h2 = "m-0 font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]";
const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12";
const sheet = "sheet-perforated rounded-b-[14px] bg-paper";

export default async function InternetB2B() {
  const lang = await getLang();
  const t = internetB2B[lang];
  return (
    <>
      <InkHero
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <a href="#comment" className={inkLink}>
            {t.hero.how}
          </a>
        }
        facts={t.hero.facts}
      >
        <QuoteSheet path="ip" />
      </InkHero>

      {/* QU'EST-CE QU'UNE IP PUBLIQUE DÉDIÉE */}
      <section className="bg-ground py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-5">
            <h2 className={h2}>{t.ip.title}</h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              {t.ip.lead}
            </p>
            <p className="mt-6 max-w-[52ch] border-l-2 border-navy pl-5 font-sans text-[17.5px] font-semibold leading-[1.55] text-navy">
              {t.ip.point}
            </p>
          </Reveal>
          <Reveal className={`${sheet} px-5 pb-6 pt-9 sm:px-9 lg:col-span-7`} delay={0.05}>
            <h3 className="m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]">
              {t.ip.sheet}
            </h3>
            <ul className="m-0 list-none p-0">
              {t.ip.usages.map(({ t, d }, i) => {
                const Icon = usageIcons[i];
                return (
                <li key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-[18px]">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{t}</div>
                    <p className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{d}</p>
                  </div>
                </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CE QUE CHERRYZ VOUS APPORTE */}
      <section className="bg-navy-deep py-20 text-white md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={`${h2} max-w-[22ch]`}>{t.features.title}</h2>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-6 pt-9 text-navy sm:px-9`} delay={0.05}>
            <dl className="m-0 grid grid-cols-1 gap-x-12 border-t-2 border-navy md:grid-cols-2">
              {t.features.items.map(({ t, d }, i) => {
                const Icon = featureIcons[i];
                return (
                <div key={t} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-5">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <dt className="font-condensed text-[21px] font-bold leading-tight">{t}</dt>
                    <dd className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{d}</dd>
                  </div>
                </div>
                );
              })}
            </dl>
            <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">
              {t.features.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="scroll-mt-24 bg-ground py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={h2}>{t.steps.title}</h2>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-7 pt-9 sm:px-9`} delay={0.05}>
            <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-navy p-0 sm:grid-cols-2 lg:grid-cols-6">
              {t.steps.items.map((label, i) => {
                const Icon = stepIcons[i];
                return (
                <li key={label} className="flex items-center gap-3 border-b border-rule py-5 lg:flex-col lg:items-start lg:gap-4 lg:border-b-0 lg:border-r lg:px-4 lg:py-6 lg:first:pl-0 lg:last:border-r-0">
                  <span className="font-condensed text-[19px] font-bold tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden className="text-[24px] text-navy" />
                  <span className="font-condensed text-[20px] font-bold leading-tight text-navy">{label}</span>
                </li>
                );
              })}
            </ol>
            <Link href={localize(lang, QUOTE.ip)} className={`${btnCherry} mt-7`}>
              <ClipboardIcon aria-hidden className="text-[20px]" />
              {t.steps.cta}
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactClose
        quoteHref={QUOTE.ip}
        callHref={CAL_IP}
        title={t.close}
      />
    </>
  );
}
