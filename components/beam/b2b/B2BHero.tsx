"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { BEAM_WIDTH, MBPS, PRICE, Ticker } from "../LinkBudget";
import { gsap, MOTION_OK, useGSAP } from "../gsap";

// Points on /photos/b2b-hero.jpg (1920 × 1200): the red-lit operator rack, and the
// lone cabinet on the left that stands for the visitor's own rack on narrow screens.
const PHOTO = { w: 1920, h: 1200 };
const RACK: [number, number] = [1222, 520];
const CABINET: [number, number] = [458, 560];
const pct = ([x, y]: [number, number]) => ({ left: `${(x / PHOTO.w) * 100}%`, top: `${(y / PHOTO.h) * 100}%` });
const FACTS = ["art", "ip", "works"] as const;
const spring = { type: "spring", stiffness: 140, damping: 22 } as const;

type Geo = { w: number; h: number; x1: number; y1: number; x2: number; y2: number };
type Mbps = (typeof MBPS)[number];

/**
 * First viewport of the Internet B2B page: the operator's server room, full bleed.
 * A cherry beam leaves the lit rack and lands on the visitor's estimate (on the
 * lone cabinet on narrow screens); its thickness follows the chosen bandwidth.
 */
export default function B2BHero() {
  const t = useTranslations("InternetB2B");
  const tc = useTranslations("Home.console");
  const lang = useLocale();
  const reduce = useReducedMotion();
  const [mbps, setMbps] = useState<Mbps>(20);
  const [geo, setGeo] = useState<Geo | null>(null);
  const scope = useRef<HTMLElement>(null);
  const from = useRef<HTMLSpanElement>(null);
  const toWide = useRef<HTMLSpanElement>(null);
  const toNarrow = useRef<HTMLSpanElement>(null);

  // The beam crosses from the photo into the layout, so its ends are measured.
  useEffect(() => {
    const section = scope.current;
    if (!section) return;
    const measure = () => {
      const to = window.matchMedia("(min-width: 1024px)").matches ? toWide.current : toNarrow.current;
      if (!from.current || !to) return;
      const s = section.getBoundingClientRect();
      const a = from.current.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      setGeo({ w: s.width, h: s.height, x1: a.left - s.left, y1: a.top - s.top, x2: b.left + b.width / 2 - s.left, y2: b.top + b.height / 2 - s.top });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-rise]", { yPercent: 60, opacity: 0, duration: 1.1 }, 0.1)
          .from("[data-panel] > *", { opacity: 0, duration: 0.9, stagger: 0.07 }, 0.35);
      });
      return () => mm.revert();
    },
    { scope },
  );

  const alone = [PRICE.alone[0] * mbps, PRICE.alone[1] * mbps];
  const cherryz = [PRICE.cherryz[0] * mbps, PRICE.cherryz[1] * mbps];
  const w = BEAM_WIDTH[mbps];
  const len = geo ? Math.hypot(geo.x2 - geo.x1, geo.y2 - geo.y1) : 0;
  const angle = geo ? (Math.atan2(geo.y2 - geo.y1, geo.x2 - geo.x1) * 180) / Math.PI : 0;

  return (
    <section ref={scope} className="beam-page relative overflow-hidden bg-night text-white lg:min-h-svh" aria-labelledby="hero-title">
      <div className="relative z-10 mx-auto max-w-[1360px] px-4 pb-8 pt-[104px] sm:px-6 md:px-12 lg:pb-0 lg:pt-[118px]">
        <h1 id="hero-title" className="m-0 max-w-[11ch] overflow-hidden font-condensed text-[clamp(46px,6vw,96px)] font-bold leading-[0.92] tracking-[-0.02em] [text-wrap:balance]">
          <span data-rise className="block">
            {t("hero.title")}
          </span>
        </h1>
      </div>

      {/* The server room, with the operator rack and the lone cabinet pinned */}
      <div className="relative aspect-[16/11] overflow-hidden [container-type:size] lg:absolute lg:inset-0 lg:aspect-auto">
        <div className="cover-stage" style={{ "--ar": PHOTO.w / PHOTO.h } as React.CSSProperties}>
          <Image src="/photos/b2b-hero.jpg" alt={t("beam.photoAlt")} fill priority sizes="100vw" className="object-cover" />
          <span ref={from} aria-hidden className="absolute" style={pct(RACK)} />
          <span ref={toNarrow} aria-hidden className="absolute h-0 w-0" style={pct(CABINET)} />
          <span
            className="absolute translate-x-[14px] -translate-y-1/2 whitespace-nowrap bg-night/80 px-2 py-[3px] font-sans text-[12.5px] font-semibold text-haze lg:text-[13.5px]"
            style={pct(RACK)}
          >
            {t("beam.rack")}
          </span>
          <span
            className="absolute -translate-x-1/2 translate-y-[18px] whitespace-nowrap bg-night/80 px-2 py-[3px] font-sans text-[12.5px] font-semibold text-haze lg:hidden"
            style={pct(CABINET)}
          >
            {t("beam.site")}
          </span>
        </div>
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-night via-night/80 to-transparent lg:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night to-transparent lg:hidden" />
      </div>

      {/* The beam, from the rack to the visitor's estimate */}
      {geo && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
        >
          <motion.ellipse
            cx={(geo.x1 + geo.x2) / 2}
            cy={(geo.y1 + geo.y2) / 2}
            rx={len / 2}
            transform={`rotate(${angle} ${(geo.x1 + geo.x2) / 2} ${(geo.y1 + geo.y2) / 2})`}
            fill="none"
            stroke="#ff3d6a"
            strokeOpacity={0.5}
            strokeWidth={1.25}
            strokeDasharray="3 7"
            initial={{ ry: 10 + w * 1.4, opacity: reduce ? 1 : 0 }}
            animate={{ ry: 10 + w * 1.4, opacity: 1 }}
            transition={{ ry: spring, opacity: { delay: reduce ? 0 : 1, duration: 0.5 } }}
          />
          {[
            { stroke: "#0a111b", extra: 4, opacity: 0.5 },
            { stroke: "#ff3d6a", extra: 0, opacity: 1 },
          ].map((s) => (
            <motion.line
              key={s.stroke}
              x1={geo.x1}
              y1={geo.y1}
              x2={geo.x2}
              y2={geo.y2}
              stroke={s.stroke}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0, strokeWidth: w + s.extra }}
              animate={{ pathLength: 1, strokeWidth: w + s.extra }}
              transition={{ pathLength: { duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.5, ease: [0.65, 0, 0.35, 1] }, strokeWidth: spring }}
            />
          ))}
          {[
            [geo.x1, geo.y1],
            [geo.x2, geo.y2],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={12} fill="#0a111b" stroke="#fff" strokeWidth={2} />
              <circle cx={x} cy={y} r={5} fill="#ff3d6a" />
            </g>
          ))}
        </svg>
      )}

      {/* Controls: bandwidth, the estimate the beam lands on, the questionnaire */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-4 pb-10 sm:px-6 md:px-12 lg:pb-14 lg:pt-7">
        <div data-panel className="lg:max-w-[540px]">
          <p className="m-0 max-w-[48ch] font-sans text-[17.5px] leading-[1.55] text-haze">{t("hero.lead")}</p>

          <fieldset className="m-0 mt-7 border-0 p-0">
            <legend className="mb-2 p-0 font-sans text-[14.5px] font-semibold text-haze/80">{t("beam.speed")}</legend>
            <div className="grid grid-cols-4 gap-[2px] bg-white/15 p-[2px] sm:inline-grid">
              {MBPS.map((m) => {
                const on = m === mbps;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMbps(m)}
                    className={[
                      "cursor-pointer px-3 py-[11px] font-sans text-[15px] font-semibold tabular-nums transition-colors sm:min-w-[92px] sm:px-4",
                      on ? "bg-white text-night" : "bg-dusk text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    {m} Mbps
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div aria-live="polite" className="relative mt-3 bg-dusk/90 px-4 py-4 sm:px-5">
            <p className="m-0 flex items-center justify-between gap-4 pr-6 font-sans text-[14.5px] font-semibold text-haze/80">
              <span>
                <span className="font-condensed text-[19px] font-bold text-white">{t("beam.site")}</span>
                <span className="ml-2 tabular-nums">{t("beam.readout", { mbps })}</span>
              </span>
            </p>
            <span ref={toWide} aria-hidden className="absolute right-0 top-[26px] h-0 w-0" />
            <p className="m-0 mt-3 font-sans text-[14px] text-haze/75">{t("beam.estimate")}</p>
            <p className="m-0 mt-1 font-condensed text-[clamp(28px,3vw,38px)] font-bold leading-none text-white">
              <Ticker value={cherryz[0]} /> – <Ticker value={cherryz[1]} /> <span className="text-[0.55em] text-haze">XAF</span>
            </p>
            <p className="m-0 mt-2 font-sans text-[14px] text-haze/75">
              {tc("alone")} : <Ticker value={alone[0]} /> – <Ticker value={alone[1]} /> XAF
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={localize(lang, QUOTE.ip)}
              data-primary-cta
              className="inline-flex items-center gap-3 bg-cherry px-6 py-[17px] font-condensed text-[20px] font-semibold text-white transition-colors hover:bg-cherry-dark"
            >
              {tc("ctaIp")}
              <ArrowRightIcon aria-hidden className="text-[20px]" />
            </Link>
            <a href="#comment" className="font-sans text-[16px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
              {t("hero.how")}
            </a>
          </div>
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-[14px] text-haze/80">
            {FACTS.map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-beam" />
                {t(`hero.facts.${k}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="relative z-10 m-0 px-4 pb-5 font-sans text-[13px] text-haze/65 sm:px-6 lg:absolute lg:bottom-4 lg:right-12 lg:max-w-[46ch] lg:bg-night/70 lg:px-3 lg:py-2 lg:text-right">
        {t("beam.caption")}
      </p>
    </section>
  );
}
