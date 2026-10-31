"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

// Each place is a district on the plan: left, top and width in % of a square plate.
const ZONES = [
  { key: "building", src: "/photos/zone-batiment.jpg", lobe: "lobe", at: [0, 0, 38] },
  { key: "campus", src: "/photos/zone-campus.jpg", lobe: "lobe-c", at: [37, 3, 28] },
  { key: "clinic", src: "/photos/zone-clinique.jpg", lobe: "lobe-b", at: [67, 0, 31] },
  { key: "hotel", src: "/photos/zone-hotel.jpg", lobe: "lobe", at: [62, 36, 38] },
  { key: "industrial", src: "/photos/zone-industriel.jpg", lobe: "lobe-b", at: [0, 44, 30] },
  { key: "market", src: "/photos/zone-marche.jpg", lobe: "lobe-c", at: [28, 35, 34] },
  { key: "neighbourhood", src: "/photos/zone-quartier.jpg", lobe: "lobe-b", at: [31, 70, 28] },
] as const;

/**
 * The places a WiFi Zone can cover, drawn as the districts of a guide map: each
 * one a lobe ringed in cherry, numbered against the key, spreading in turn as the
 * plate comes into view.
 */
export default function CoverageZones() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const plate = { trigger: "[data-plate]", start: "top 75%", toggleActions: "play none none reverse" };
        gsap.fromTo(
          "[data-zone]",
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1, stagger: 0.09, ease: "expo.out", scrollTrigger: plate },
        );
        gsap.from("[data-zone-pin]", { scale: 0, duration: 0.5, stagger: 0.09, delay: 0.4, ease: "back.out(2)", scrollTrigger: { ...plate } });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="map-page bg-sand py-20 text-navy md:py-28" aria-labelledby="coverage-title">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="coverage-title" className="m-0 max-w-[13ch] font-condensed text-[clamp(40px,4.6vw,68px)] font-bold leading-[0.93] tracking-[-0.02em] [text-wrap:balance]">
            {t("coverage.title")}
          </h2>
          <p className="mt-5 max-w-[42ch] font-sans text-[17.5px] leading-[1.6] text-navy/80">{t("coverage.lead")}</p>
          <Link
            href={localize(lang, "/wifi-zone")}
            className="mt-7 inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
          >
            {t("coverage.cta")}
            <ArrowRightIcon aria-hidden className="text-[19px]" />
          </Link>

          {/* The plate's key, wide screens only (each district carries its own name otherwise) */}
          <div aria-hidden className="mt-10 hidden border-t-2 border-navy pt-4 lg:block">
            <p className="m-0 font-sans text-[14px] font-semibold text-navy/70">{t("map.zones.legend")}</p>
            <ol className="m-0 mt-3 grid list-none grid-cols-2 gap-x-4 gap-y-2 p-0 font-sans text-[15.5px] font-semibold">
              {ZONES.map((z, i) => (
                <li key={z.key} className="flex items-center gap-3">
                  <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-navy font-condensed text-[15px] font-bold text-white">{i + 1}</span>
                  {t(`map.zones.items.${z.key}`)}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul data-plate aria-label={t("map.zones.legend")} className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3 lg:relative lg:block lg:aspect-square">
            {ZONES.map((z, i) => {
              const [left, top, width] = z.at;
              return (
                <li
                  key={z.key}
                  className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
                  style={{ "--l": `${left}%`, "--t": `${top}%`, "--w": `${width}%` } as React.CSSProperties}
                >
                  <div data-zone className={`${z.lobe} relative aspect-square overflow-hidden border-[6px] border-cherry bg-sand-deep`}>
                    <Image src={z.src} alt="" fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw" className="object-cover" />
                  </div>
                  <span
                    data-zone-pin
                    aria-hidden
                    className="absolute left-[6%] top-[6%] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[3px] border-sand bg-navy font-condensed text-[18px] font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="mt-2 block text-center font-sans text-[15px] font-semibold lg:sr-only">{t(`map.zones.items.${z.key}`)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
