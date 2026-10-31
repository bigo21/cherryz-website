"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

type Path = "ip" | "wifi";
type Disc = { cx: number; cy: number; r: number };

// The coverage lobe is the union of five discs, in units of its square box. One
// dedicated site reads as a single round district; a WiFi Zone as five access
// points whose reach overlaps. The same five discs move between the two.
const LOBES: Record<Path, Disc[]> = {
  ip: [
    { cx: 0.5, cy: 0.5, r: 0.34 },
    { cx: 0.7, cy: 0.34, r: 0.24 },
    { cx: 0.3, cy: 0.66, r: 0.22 },
    { cx: 0.66, cy: 0.7, r: 0.22 },
    { cx: 0.34, cy: 0.32, r: 0.2 },
  ],
  wifi: [
    { cx: 0.46, cy: 0.5, r: 0.22 },
    // On the residence's rooftop antenna in /photos/wifi-hero.jpg.
    { cx: 0.74, cy: 0.2, r: 0.2 },
    { cx: 0.24, cy: 0.72, r: 0.19 },
    { cx: 0.74, cy: 0.68, r: 0.2 },
    { cx: 0.24, cy: 0.28, r: 0.17 },
  ],
};
const HALO = 0.045;
const DEST: Record<Path, { photo: string; value: number; pin: [number, number] }> = {
  ip: { photo: "/photos/accueil-hero.jpg", value: 50, pin: [0.5, 0.5] },
  wifi: { photo: "/photos/wifi-hero.jpg", value: 120, pin: [0.46, 0.5] },
};
const spring = { type: "spring", stiffness: 90, damping: 18 } as const;

/**
 * First viewport on the navy sea: a cherry coverage lobe spills off the top and
 * right edges with the visitor's place cropped inside it. The path choice reshapes
 * the lobe, from one dedicated site to a WiFi Zone's overlapping access points.
 */
export default function HeroCoverage() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const reduce = useReducedMotion();
  const [path, setPath] = useState<Path>("ip");
  const clip = useId().replace(/:/g, "");
  const scope = useRef<HTMLElement>(null);
  const dest = DEST[path];
  const discs = LOBES[path];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-rise]", { yPercent: 50, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.1)
          .from("[data-halo]", { attr: { r: 0 }, duration: 1.4, stagger: 0.09 }, 0.2)
          .from("[data-disc]", { attr: { r: 0 }, duration: 1.4, stagger: 0.09 }, 0.32)
          .from("[data-pin]", { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.05 }, 1.1)
          .from("[data-label]", { clipPath: "inset(0 100% 0 0)", duration: 0.8 }, 1.3)
          .from("[data-panel]", { y: 30, opacity: 0, duration: 1 }, 0.45);
      });
      // Leaving the hero, the lobe keeps spreading over the page.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        gsap.to("[data-stage]", {
          scale: 1.18,
          xPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  const at = ([x, y]: [number, number]) => ({ left: `${x * 100}%`, top: `${y * 100}%` });

  return (
    <section ref={scope} className="map-page relative overflow-hidden bg-navy text-white lg:min-h-[max(100svh,760px)]" aria-labelledby="hero-title">
      {/* The lobe: halo, cropped photo, access points, all in one square box */}
      <div
        data-stage
        className="pointer-events-none relative -mr-[34vw] -mt-[6vw] ml-auto aspect-square w-[128vw] origin-top-right sm:-mr-[22vw] sm:w-[104vw] lg:absolute lg:right-[-9vw] lg:top-[-13%] lg:m-0 lg:w-[min(66vw,122svh)]"
      >
        <svg viewBox="0 0 1 1" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <clipPath id={clip} clipPathUnits="objectBoundingBox">
              {discs.map((d, i) => (
                <motion.circle key={i} data-disc initial={false} animate={{ cx: d.cx, cy: d.cy, r: d.r }} transition={reduce ? { duration: 0 } : spring} />
              ))}
            </clipPath>
          </defs>
          {discs.map((d, i) => (
            <motion.circle key={i} data-halo fill="#a2032d" initial={false} animate={{ cx: d.cx, cy: d.cy, r: d.r + HALO }} transition={reduce ? { duration: 0 } : spring} />
          ))}
        </svg>

        <div className="absolute inset-0" style={{ clipPath: `url(#${clip})` }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={path}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.6 }}
            >
              <Image src={dest.photo} alt={t(`map.hero.${path}.alt`)} fill priority sizes="(max-width: 1024px) 128vw, 66vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Access points at the centre of each disc (WiFi Zone), or the one site (B2B) */}
        <AnimatePresence initial={false}>
          {(path === "wifi" ? discs.map((d) => [d.cx, d.cy] as [number, number]) : [dest.pin]).map((p, i) => (
            <motion.span
              key={`${path}-${i}`}
              data-pin
              aria-hidden
              className="absolute -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-navy bg-white lg:-ml-[11px] lg:-mt-[11px] lg:h-[22px] lg:w-[22px]"
              style={at(p)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, transition: { duration: 0.15 } }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.35 + i * 0.05 }}
            />
          ))}
        </AnimatePresence>

        {/* The place, labelled the way a guide map names a district */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.p
            key={path}
            data-label
            className="absolute m-0 -translate-x-1/2 translate-y-[22px] whitespace-nowrap bg-white px-3 py-2 text-navy lg:translate-y-[26px]"
            style={at(dest.pin)}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block font-condensed text-[17px] font-bold leading-tight lg:text-[20px]">{t(`map.hero.${path}.label`)}</span>
            <span className="block font-sans text-[13px] font-semibold tabular-nums text-cherry lg:text-[14px]">
              {path === "ip" ? t("map.hero.ip.readout", { mbps: dest.value }) : t("map.hero.wifi.readout", { users: dest.value })}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto max-w-[1360px] px-4 pb-10 sm:px-6 md:px-12 lg:pb-14 lg:pt-[150px]">
        <div className="-mt-[18vw] sm:-mt-[10vw] lg:mt-0 lg:max-w-[min(540px,42vw)]">
          <h1 id="hero-title" className="m-0 font-condensed text-[clamp(48px,6.4vw,98px)] font-bold leading-[0.9] tracking-[-0.025em] [text-wrap:balance]">
            <span data-rise className="block">
              {t("hero.title")}
            </span>
          </h1>

          <div data-panel className="mt-7">
            <p className="m-0 max-w-[46ch] font-sans text-[17.5px] leading-[1.55] text-white/80">{t("hero.lead")}</p>
            <fieldset className="m-0 mt-7 border-0 p-0">
              <legend className="mb-3 p-0 font-sans text-[14px] font-semibold text-white/65">{t("hero.pathLabel")}</legend>
              <div className="flex flex-wrap gap-2">
                {(["ip", "wifi"] as const).map((p) => {
                  const on = p === path;
                  return (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPath(p)}
                      className={[
                        "flex cursor-pointer items-center gap-[10px] rounded-full border-2 px-5 py-[11px] font-condensed text-[18px] font-semibold transition-colors",
                        on ? "border-white bg-white text-navy" : "border-white/30 text-white/85 hover:border-white/70 hover:text-white",
                      ].join(" ")}
                    >
                      <span aria-hidden className={`h-[10px] w-[10px] flex-none rounded-full ${on ? "bg-cherry" : "border-2 border-white/50"}`} />
                      {t(`hero.tabs.${p}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <Link
              href={localize(lang, path === "ip" ? QUOTE.ip : QUOTE.wifi)}
              data-primary-cta
              className="mt-6 inline-flex items-center gap-3 bg-cherry px-6 py-[17px] font-condensed text-[20px] font-semibold text-white transition-colors hover:bg-cherry-dark"
            >
              {t(path === "ip" ? "console.ctaIp" : "console.ctaWifi")}
              <ArrowRightIcon aria-hidden className="text-[20px]" />
            </Link>
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-[14px] text-white/70">
              {(["art", "partners", "survey"] as const).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-cherry ring-2 ring-white/40" />
                  {t(`hero.trust.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="relative m-0 mx-auto max-w-[1360px] px-4 pb-6 font-sans text-[13px] text-white/55 sm:px-6 md:px-12 lg:absolute lg:bottom-0 lg:right-0 lg:max-w-[48ch] lg:pb-5 lg:text-right">
        {t("map.caption")}
      </p>
    </section>
  );
}
