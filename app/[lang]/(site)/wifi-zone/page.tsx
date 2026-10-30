import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import InkHero, { btnCherry, inkLink } from "@/components/site/InkHero";
import QuoteSheet from "@/components/site/QuoteSheet";
import ContactClose from "@/components/site/ContactClose";
import Reveal from "@/components/site/Reveal";
import { ArrowRightIcon, ClipboardIcon } from "@/components/site/icons";
import { CAL_WIFI, QUOTE } from "@/lib/site/site";
import { getLocale, getTranslations } from "next-intl/server";
import { localize } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WifiZone.meta");
  return pageMetadata("/wifi-zone", { title: t("title"), description: t("description") });
}

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

// Listed entries of messages/*.json (WifiZone), in display order, with their icons.
const FACTS = ["art", "survey", "mobileMoney"] as const;
const ZONES: { key: "building" | "neighbourhood" | "hotel" | "campus" | "market" | "industrial" | "clinic" | "idea"; Icon: Ic }[] = [
  { key: "building", Icon: Building },
  { key: "neighbourhood", Icon: District },
  { key: "hotel", Icon: Hotel },
  { key: "campus", Icon: Campus },
  { key: "market", Icon: Market },
  { key: "industrial", Icon: Factory },
  { key: "clinic", Icon: Clinic },
  { key: "idea", Icon: Bulb },
];
const METHOD = ["survey", "sizing", "model", "deployment", "automation", "support"] as const;
const DIFFS: { key: "bandwidth" | "endToEnd" | "business" | "legal" | "scalable" | "support"; Icon: Ic }[] = [
  { key: "bandwidth", Icon: Coins },
  { key: "endToEnd", Icon: Star },
  { key: "business", Icon: Bars },
  { key: "legal", Icon: Legal },
  { key: "scalable", Icon: Trending },
  { key: "support", Icon: ShieldCheck },
];
const CASES: { key: "building" | "neighbourhood" | "hotel"; Icon: Ic }[] = [
  { key: "building", Icon: Building },
  { key: "neighbourhood", Icon: District },
  { key: "hotel", Icon: Hotel },
];

const h2 = "m-0 font-condensed text-[clamp(34px,4.2vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]";
const h3 = "m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]";
const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12";
const sheet = "sheet-perforated rounded-b-[14px] bg-paper";
const legend = "font-condensed text-[15px] font-semibold tracking-[0.06em] text-ink-soft";

export default async function WifiZone() {
  const lang = await getLocale();
  const t = await getTranslations("WifiZone");
  return (
    <>
      <InkHero
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={
          <a href="#methode" className={inkLink}>
            {t("hero.method")}
          </a>
        }
        facts={FACTS.map((k) => t(`hero.facts.${k}`))}
      >
        <QuoteSheet path="wifi" />
      </InkHero>

      {/* TYPES DE ZONES */}
      <section className="bg-ground py-20 md:py-28">
        <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-4">
            <h2 className={h2}>{t("zones.title")}</h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              {t("zones.lead")}
            </p>
            <p className="mt-6 max-w-[44ch] border-l-2 border-navy pl-5 font-sans text-[17.5px] font-semibold leading-[1.55] text-navy">
              {t("zones.point")}
            </p>
          </Reveal>
          <Reveal className={`${sheet} px-5 pb-6 pt-9 sm:px-9 lg:col-span-8`} delay={0.05}>
            <h3 className={h3}>{t("zones.sheet")}</h3>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-10 p-0 md:grid-cols-2">
              {ZONES.map(({ key, Icon }) => (
                <li key={key} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-[18px]">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{t(`zones.items.${key}.title`)}</div>
                    <div className="mt-[2px] font-sans text-[14px] font-medium text-ink-soft">{t(`zones.items.${key}.sub`)}</div>
                    <p className="m-0 mt-2 font-sans text-[16px] leading-[1.5] text-navy">{t(`zones.items.${key}.text`)}</p>
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
            <h2 className={`${h2} lg:col-span-7`}>{t("method.title")}</h2>
            <p className="m-0 max-w-[48ch] font-sans text-[17.5px] leading-[1.6] text-white/75 lg:col-span-5">
              {t("method.lead")}
            </p>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-7 pt-9 text-navy sm:px-9`} delay={0.05}>
            <div aria-hidden className={`hidden grid-cols-[56px_1.15fr_1fr] gap-x-8 border-b-2 border-navy pb-3 md:grid ${legend}`}>
              <span>{t("method.cols.step")}</span>
              <span>{t("method.cols.do")}</span>
              <span>{t("method.cols.get")}</span>
            </div>
            <ol className="m-0 list-none border-t-2 border-navy p-0 md:border-t-0">
              {METHOD.map((m, i) => (
                <li key={m} className="grid grid-cols-[44px_1fr] gap-x-3 border-b border-rule py-5 md:grid-cols-[56px_1.15fr_1fr] md:gap-x-8">
                  <span className="font-condensed text-[22px] font-bold tabular-nums text-ink-soft md:row-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight">{t(`method.items.${m}.title`)}</div>
                    <p className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{t(`method.items.${m}.text`)}</p>
                  </div>
                  <p className="col-start-2 m-0 mt-3 font-sans text-[16px] font-semibold leading-[1.45] md:col-start-auto md:mt-0">
                    <span className="mr-2 font-condensed text-[14px] font-semibold tracking-[0.06em] text-ink-soft md:hidden">{t("method.getShort")}</span>
                    {t(`method.items.${m}.outcome`)}
                  </p>
                </li>
              ))}
            </ol>
            <Link href={localize(lang, QUOTE.wifi)} className={`${btnCherry} mt-7`}>
              <ClipboardIcon aria-hidden className="text-[20px]" />
              {t("method.cta")}
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI CHERRYZ */}
      <section className="bg-paper py-20 md:py-28">
        <div className={wrap}>
          <Reveal>
            <h2 className={`${h2} max-w-[20ch]`}>{t("diffs.title")}</h2>
          </Reveal>
          <Reveal className="mt-12" delay={0.05}>
            <dl className="m-0 grid grid-cols-1 gap-x-12 border-t-2 border-navy md:grid-cols-2">
              {DIFFS.map(({ key, Icon }) => (
                <div key={key} className="grid grid-cols-[32px_1fr] items-start gap-x-3 border-b border-rule py-5">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy" />
                  <div>
                    <dt className="font-condensed text-[21px] font-bold leading-tight text-navy">{t(`diffs.items.${key}.title`)}</dt>
                    <dd className="m-0 mt-1 font-sans text-[16px] leading-[1.5] text-ink-soft">{t(`diffs.items.${key}.text`)}</dd>
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
            <h2 className={h2}>{t("cases.title")}</h2>
            <p className="mt-6 max-w-[56ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">
              {t("cases.lead")}
            </p>
          </Reveal>
          <Reveal className={`${sheet} mt-12 px-5 pb-6 pt-9 sm:px-9`} delay={0.05}>
            <h3 className={h3}>{t("cases.sheet")}</h3>
            <ul className="m-0 list-none p-0">
              {CASES.map(({ key, Icon }) => (
                <li key={key} className="grid grid-cols-[32px_1fr] items-start gap-x-3 gap-y-3 border-b border-rule py-5 md:grid-cols-[32px_1fr_1fr_auto] md:items-baseline md:gap-x-8">
                  <Icon aria-hidden className="mt-[3px] text-[22px] text-navy md:self-start" />
                  <div>
                    <div className="font-condensed text-[21px] font-bold leading-tight text-navy">{t(`cases.items.${key}.who`)}</div>
                    <div className="mt-[2px] font-sans text-[15px] text-ink-soft">{t(`cases.items.${key}.place`)}</div>
                  </div>
                  <p className="col-start-2 m-0 font-sans text-[16px] leading-[1.5] text-navy md:col-start-auto">{t(`cases.items.${key}.setup`)}</p>
                  <div className="col-start-2 md:col-start-auto md:text-right">
                    <div className="font-condensed text-[clamp(26px,3vw,32px)] font-bold leading-none tabular-nums text-navy">{t(`cases.items.${key}.stat`)}</div>
                    <div className="mt-1 font-sans text-[14px] text-ink-soft">{t(`cases.items.${key}.unit`)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">
              {t("cases.footnote")}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactClose
        quoteHref={QUOTE.wifi}
        callHref={CAL_WIFI}
        title={t("close.title")}
        lead={t("close.lead")}
      />
    </>
  );
}
