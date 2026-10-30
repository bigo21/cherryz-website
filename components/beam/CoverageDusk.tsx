"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

// The rooftop antenna on /photos/wifi-hero.jpg (1920 × 1200).
const PHOTO = { w: 1920, h: 1200 };
const ANTENNA = { x: 1253, y: 215 };
const RINGS = [180, 340, 520, 720, 940];

const ZONES = [
  { key: "building", src: "/photos/zone-batiment.jpg" },
  { key: "campus", src: "/photos/zone-campus.jpg" },
  { key: "clinic", src: "/photos/zone-clinique.jpg" },
  { key: "hotel", src: "/photos/zone-hotel.jpg" },
  { key: "industrial", src: "/photos/zone-industriel.jpg" },
  { key: "market", src: "/photos/zone-marche.jpg" },
  { key: "neighbourhood", src: "/photos/zone-quartier.jpg" },
] as const;

/**
 * WiFi coverage: a residence at dusk whose rooftop antenna spreads rings over the
 * city as you scroll, then the places a WiFi Zone can cover, linked by one beam.
 */
export default function CoverageDusk() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-ring]",
          { attr: { r: 0 }, opacity: 0.9 },
          {
            attr: { r: (_: number, el: SVGCircleElement) => Number(el.dataset.r) },
            opacity: 0.35,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: "[data-sky]", start: "top 75%", end: "bottom 30%", scrub: 0.6 },
          },
        );
        // Each place comes into coverage in turn: the photo rises, then its rings open.
        const zones = { trigger: "[data-zones]", start: "top 92%" };
        gsap.from("[data-zone]", { clipPath: "inset(100% 0 0 0)", duration: 0.8, stagger: 0.07, ease: "expo.out", scrollTrigger: zones });
        gsap.from("[data-zone-ring]", { scale: 0.3, opacity: 0, transformOrigin: "50% 50%", duration: 0.7, stagger: 0.04, delay: 0.35, ease: "power2.out", scrollTrigger: zones });
        gsap.fromTo("[data-link]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-zones]", start: "top 85%", end: "bottom 60%", scrub: 0.5 } });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="beam-page bg-night text-white" aria-labelledby="coverage-title">
      <div data-sky className="relative h-[78svh] min-h-[560px] overflow-hidden [container-type:size] lg:h-[104svh] lg:max-h-[1100px]">
        <div className="cover-stage" style={{ "--ar": PHOTO.w / PHOTO.h } as React.CSSProperties}>
          <Image src="/photos/wifi-hero.jpg" alt={t("beam.coverage.heroAlt")} fill sizes="100vw" className="object-cover" />
          <svg viewBox={`0 0 ${PHOTO.w} ${PHOTO.h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            {RINGS.map((r) => (
              <circle
                key={r}
                data-ring
                data-r={r}
                cx={ANTENNA.x}
                cy={ANTENNA.y}
                r={r}
                fill="none"
                stroke="#ff3d6a"
                strokeWidth={2}
                strokeOpacity={0.8}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <circle cx={ANTENNA.x} cy={ANTENNA.y} r={9} fill="#ff3d6a" stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent" />
        <div className="relative mx-auto max-w-[1360px] px-4 pt-24 sm:px-6 md:px-12 lg:pt-32">
          <h2 id="coverage-title" className="m-0 max-w-[13ch] font-condensed text-[clamp(40px,5.4vw,84px)] font-bold leading-[0.93] tracking-[-0.02em] [text-shadow:0_1px_24px_rgba(10,17,27,0.45)] [text-wrap:balance]">
            {t("coverage.title")}
          </h2>
          <p className="mt-5 max-w-[40ch] bg-night/55 font-sans text-[17.5px] leading-[1.6] text-white lg:bg-transparent">{t("coverage.lead")}</p>
          <Link
            href={localize(lang, "/wifi-zone")}
            className="mt-7 inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
          >
            {t("coverage.cta")}
            <ArrowRightIcon aria-hidden className="text-[19px]" />
          </Link>
        </div>
      </div>

      <div data-zones className="relative mx-auto max-w-[1360px] px-4 pb-20 pt-6 sm:px-6 md:px-12 md:pb-28">
        <div aria-hidden className="h-[3px] bg-white/12">
          <div data-link className="h-full origin-left bg-beam" />
        </div>
        <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-[3px] p-0 sm:grid-cols-4 lg:grid-cols-7">
          {ZONES.map((z) => (
            <li key={z.key} data-zone className="relative aspect-[3/4] overflow-hidden bg-dusk last:col-span-2 sm:last:col-span-1">
              <Image src={z.src} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw" className="object-cover" />
              <svg viewBox="0 0 100 100" className="absolute left-1/2 top-[14%] h-[44%] w-auto -translate-x-1/2 overflow-visible" aria-hidden>
                {[16, 30, 44].map((r, k) => (
                  <circle key={r} data-zone-ring cx={50} cy={50} r={r} fill="none" stroke="#fff" strokeOpacity={0.85 - k * 0.22} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                ))}
                <circle cx={50} cy={50} r={5} fill="#ff3d6a" stroke="#fff" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="absolute inset-x-0 bottom-0 bg-night/80 px-3 py-2 font-sans text-[14px] font-semibold">{t(`beam.coverage.zones.${z.key}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
