"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

type Path = "ip" | "wifi";

// Points on /photos/accueil-hero.jpg (1920 × 1072): the red-and-white mast on the
// left, the round office tower, and the tall residential block at the bottom.
const PHOTO = { w: 1920, h: 1072 };
const MAST: [number, number] = [375, 478];
const DEST: Record<Path, { at: [number, number]; photo: string; value: number }> = {
  ip: { at: [1112, 612], photo: "/photos/service-ip.jpg", value: 50 },
  wifi: { at: [1368, 878], photo: "/photos/cas-immeuble.jpg", value: 120 },
};
const pct = ([x, y]: [number, number]) => ({ left: `${(x / PHOTO.w) * 100}%`, top: `${(y / PHOTO.h) * 100}%` });

/** The line of sight between two points, with its Fresnel zone drawn around it. */
function fresnel([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx: len / 2, angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI };
}

/**
 * First viewport: Yaoundé at dusk, full bleed. A microwave beam leaves an operator
 * mast and lands on the visitor's rooftop; the path switch re-aims it at the other
 * offer's building. Title on the sky, controls bottom left.
 */
export default function HeroBeam() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const reduce = useReducedMotion();
  const [path, setPath] = useState<Path>("ip");
  const scope = useRef<HTMLElement>(null);
  const dest = DEST[path];
  const zone = fresnel(MAST, dest.at);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-rise]", { yPercent: 60, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.1)
          .from("[data-mast]", { scale: 0, transformOrigin: "50% 50%", duration: 0.6 }, 0.35)
          .fromTo("[data-beam]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" }, 0.55)
          .from("[data-zone]", { opacity: 0, duration: 0.8 }, 1.4)
          .from("[data-dest]", { scale: 0, transformOrigin: "50% 50%", duration: 0.7 }, 1.6)
          .from("[data-callout]", { clipPath: "inset(0 100% 0 0)", duration: 0.9 }, 1.7)
          .from("[data-panel]", { y: 40, opacity: 0, duration: 1 }, 0.5);
      });
      // Leaving the hero: the city drifts closer while the title lifts away.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const st = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-stage]", { scale: 1.08, yPercent: 6, ease: "none", scrollTrigger: st });
        gsap.to("[data-title]", { yPercent: -40, opacity: 0.2, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="beam-page relative overflow-hidden bg-night text-white lg:h-svh lg:min-h-[680px] lg:max-h-[1100px]"
      aria-labelledby="hero-title"
    >
      {/* Title on the sky */}
      <div data-title className="relative z-10 mx-auto max-w-[1360px] px-4 pb-8 pt-[104px] sm:px-6 md:px-12 lg:absolute lg:inset-x-0 lg:top-0 lg:pb-0 lg:pt-[118px]">
        <h1 id="hero-title" className="m-0 max-w-[14ch] overflow-hidden font-condensed text-[clamp(46px,6.4vw,104px)] font-bold leading-[0.92] tracking-[-0.02em] [text-wrap:balance]">
          <span data-rise className="block">
            {t("hero.title")}
          </span>
        </h1>
      </div>

      {/* The city, with the link drawn on its rooftops */}
      <div className="relative aspect-[16/11] overflow-hidden [container-type:size] lg:absolute lg:inset-0 lg:aspect-auto">
        <div data-stage className="cover-stage" style={{ "--ar": PHOTO.w / PHOTO.h } as React.CSSProperties}>
          <Image src="/photos/accueil-hero.jpg" alt={t("beam.skyAlt")} fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-x-0 top-0 hidden h-[52%] bg-gradient-to-b from-night/80 via-night/35 to-transparent lg:block" />

          <svg viewBox={`0 0 ${PHOTO.w} ${PHOTO.h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.g key={path} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                <motion.ellipse
                  data-zone
                  cx={zone.cx}
                  cy={zone.cy}
                  rx={zone.rx}
                  ry={30}
                  transform={`rotate(${zone.angle} ${zone.cx} ${zone.cy})`}
                  fill="none"
                  stroke="#ff3d6a"
                  strokeOpacity={0.55}
                  strokeWidth={1.25}
                  strokeDasharray="3 7"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
                {/* A dark casing under the beam keeps it legible on bright roofs. */}
                {[
                  { stroke: "#0a111b", width: 7, opacity: 0.45 },
                  { stroke: "#ff3d6a", width: 3, opacity: 1 },
                ].map((s) => (
                  <motion.line
                    key={s.stroke}
                    data-beam
                    x1={MAST[0]}
                    y1={MAST[1]}
                    x2={dest.at[0]}
                    y2={dest.at[1]}
                    stroke={s.stroke}
                    strokeOpacity={s.opacity}
                    strokeWidth={s.width}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    strokeDasharray="1 1"
                    initial={{ strokeDashoffset: 1 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
                  />
                ))}
                <g data-dest>
                  {path === "wifi" &&
                    [0, 1, 2].map((i) => (
                      <motion.circle
                        key={i}
                        cx={dest.at[0]}
                        cy={dest.at[1]}
                        fill="none"
                        stroke="#ff3d6a"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                        initial={false}
                        animate={reduce ? { r: 30 + i * 28, opacity: 0.5 } : { r: [10, 110], opacity: [0.8, 0] }}
                        transition={reduce ? undefined : { duration: 2.6, delay: i * 0.85, repeat: Infinity, ease: "easeOut" }}
                      />
                    ))}
                  <circle cx={dest.at[0]} cy={dest.at[1]} r={11} fill="#ff3d6a" stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
                </g>
              </motion.g>
            </AnimatePresence>
            <g data-mast>
              <circle cx={MAST[0]} cy={MAST[1]} r={13} fill="none" stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
              <circle cx={MAST[0]} cy={MAST[1]} r={5} fill="#fff" />
            </g>
          </svg>

          <span
            className="absolute -translate-x-1/2 translate-y-[20px] whitespace-nowrap bg-night/80 px-2 py-[3px] font-sans text-[12.5px] font-semibold text-haze lg:text-[13.5px]"
            style={pct(MAST)}
          >
            {t("beam.mast")}
          </span>

          {/* The rooftop the beam lands on */}
          <AnimatePresence initial={false} mode="popLayout">
            <motion.figure
              key={path}
              data-callout
              className="absolute m-0 w-[min(250px,34cqw)] -translate-x-[calc(100%+22px)] -translate-y-[calc(100%+22px)] bg-night text-white lg:translate-x-[22px]"
              style={pct(dest.at)}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative hidden aspect-[16/10] sm:block">
                <Image src={dest.photo} alt={t(`beam.dest.${path}.alt`)} fill sizes="250px" className="object-cover" />
              </div>
              <figcaption className="px-3 py-2">
                <span className="block font-condensed text-[17px] font-bold leading-tight lg:text-[19px]">{t(`beam.dest.${path}.label`)}</span>
                <span className="block font-sans text-[12.5px] font-medium tabular-nums text-haze lg:text-[13.5px]">
                  {path === "ip" ? t("beam.dest.ip.readout", { mbps: dest.value }) : t("beam.dest.wifi.readout", { users: dest.value })}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls, bottom left */}
      <div className="relative z-10 mx-auto max-w-[1360px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-12 lg:pb-10">
        <div data-panel className="bg-night px-4 pb-8 pt-7 sm:px-6 lg:max-w-[600px] lg:px-8 lg:pt-8">
          <p className="m-0 max-w-[48ch] font-sans text-[17px] leading-[1.55] text-haze">{t("hero.lead")}</p>
          <fieldset className="m-0 mt-6 border-0 p-0">
            <legend className="sr-only">{t("hero.pathLabel")}</legend>
            <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
              {(["ip", "wifi"] as const).map((p) => {
                const on = p === path;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPath(p)}
                    className={[
                      "relative flex cursor-pointer items-center gap-3 px-4 py-[14px] text-left font-condensed text-[19px] font-semibold tracking-[0.01em] transition-colors",
                      on ? "bg-white text-night" : "bg-dusk text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    <span aria-hidden className={`h-[3px] w-6 flex-none ${on ? "bg-cherry" : "bg-white/30"}`} />
                    {t(`hero.tabs.${p}`)}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <Link
            href={localize(lang, path === "ip" ? QUOTE.ip : QUOTE.wifi)}
            data-primary-cta
            className="mt-3 flex items-center justify-between gap-3 bg-cherry px-5 py-[17px] font-condensed text-[20px] font-semibold tracking-[0.01em] text-white transition-colors hover:bg-cherry-dark"
          >
            {t(path === "ip" ? "console.ctaIp" : "console.ctaWifi")}
            <ArrowRightIcon aria-hidden className="text-[20px]" />
          </Link>
          <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-[14px] text-haze/80">
            {(["art", "partners", "survey"] as const).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-beam" />
                {t(`hero.trust.${k}`)}
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
