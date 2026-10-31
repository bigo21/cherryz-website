"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

const STEPS = [
  { key: "listening", src: "/photos/approche-01-ecoute.jpg", position: "50% 40%", lobe: "lobe" },
  { key: "survey", src: "/photos/approche-02-etude.jpg", position: "50% 30%", lobe: "lobe-b" },
  { key: "solution", src: "/photos/approche-03-solution.jpg", position: "50% 35%", lobe: "lobe-c" },
  { key: "quote", src: "/photos/approche-04-cotation.jpg", position: "50% 40%", lobe: "lobe-b" },
  { key: "deployment", src: "/photos/approche-05-deploiement.jpg", position: "60% 40%", lobe: "lobe" },
  { key: "followUp", src: "/photos/approche-06-suivi.jpg", position: "50% 40%", lobe: "lobe-c" },
] as const;

// The itinerary on wide screens, in a 100 × 600 box stretched over the six equal
// rows: it passes through each stop at the centre and sways between them.
const TRAIL = STEPS.reduce((d, _, i) => {
  const y = 100 * i;
  const a = i % 2 === 0 ? 5 : -5;
  return `${d} C${50 + a},${y + 20} ${50 + a},${y + 30} 50,${y + 50} C${50 - a},${y + 70} ${50 - a},${y + 80} 50,${y + 100}`;
}, "M50,0");

/**
 * The six field steps as numbered stops on a guide-map itinerary. The trail fills
 * in cherry as you scroll, each stop lights when reached, and each photo opens
 * like a coverage area spreading.
 */
export default function FieldTrail() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-fill]",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", ease: "none", scrollTrigger: { trigger: "[data-route]", start: "top 60%", end: "bottom 60%", scrub: 0.4 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]", scope.current).forEach((step) => {
          gsap.fromTo(
            step.querySelector("[data-photo]"),
            { clipPath: "circle(0% at 50% 50%)" },
            { clipPath: "circle(75% at 50% 50%)", ease: "power2.out", scrollTrigger: { trigger: step, start: "top 85%", end: "top 35%", scrub: 0.5 } },
          );
          gsap.from(step.querySelector("[data-copy]"), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
          });
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            onEnter: () => step.toggleAttribute("data-on", true),
            onLeaveBack: () => step.toggleAttribute("data-on", false),
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="map-page bg-white py-20 text-navy md:py-28" aria-labelledby="trail-title">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="trail-title" className="m-0 max-w-[18ch] font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
              {t("field.title")}
            </h2>
            <p className="mt-5 max-w-[56ch] font-sans text-[17.5px] leading-[1.6] text-ink-soft">{t("field.lead")}</p>
          </div>
          <Link
            href={localize(lang, QUOTE.hub)}
            className="inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
          >
            {t("field.cta")}
            <ArrowRightIcon aria-hidden className="text-[19px]" />
          </Link>
        </div>

        <div data-route className="relative mt-14 lg:mt-16">
          {/* The trail: a straight gutter on narrow screens, a swaying centre line on wide ones */}
          <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-[4px] lg:hidden">
            <div className="h-full bg-[repeating-linear-gradient(to_bottom,#ead0ad_0_10px,transparent_10px_18px)]" />
            <div data-fill className="absolute inset-0 bg-cherry" />
          </div>
          <svg viewBox="0 0 100 600" preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full lg:block" aria-hidden>
            <path d={TRAIL} fill="none" stroke="#ead0ad" strokeWidth={4} strokeDasharray="10 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <div data-fill aria-hidden className="absolute inset-0 hidden lg:block">
            <svg viewBox="0 0 100 600" preserveAspectRatio="none" className="h-full w-full">
              <path d={TRAIL} fill="none" stroke="#a2032d" strokeWidth={4} vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <ol className="m-0 flex list-none flex-col gap-14 p-0 lg:grid lg:auto-rows-fr lg:gap-0" aria-label={t("map.trail.label")}>
            {STEPS.map(({ key, src, position, lobe }, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={key} data-step className="group relative grid grid-cols-1 gap-6 pl-14 lg:grid-cols-2 lg:items-center lg:gap-32 lg:py-8 lg:pl-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[3px] border-white bg-navy font-condensed text-[20px] font-bold text-white transition-colors duration-300 group-data-[on]:bg-cherry lg:left-1/2 lg:top-1/2 lg:h-[52px] lg:w-[52px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-[24px]"
                  >
                    {i + 1}
                  </span>
                  <div data-photo className={`${lobe} relative aspect-[4/3] overflow-hidden bg-sand ${flip ? "lg:order-2" : ""}`}>
                    <Image src={src} alt="" fill sizes="(max-width: 1024px) 90vw, 44vw" className="object-cover" style={{ objectPosition: position }} />
                  </div>
                  <div data-copy className={flip ? "lg:order-1 lg:text-right" : ""}>
                    <p className="m-0 font-sans text-[14px] font-semibold tabular-nums text-cherry">
                      {t("field.progress", { current: i + 1, total: STEPS.length })}
                    </p>
                    <h3 className="m-0 mt-2 font-condensed text-[clamp(30px,3vw,44px)] font-bold leading-none">{t(`field.steps.${key}.title`)}</h3>
                    <p className={`m-0 mt-3 max-w-[40ch] font-sans text-[17px] leading-[1.55] text-ink-soft ${flip ? "lg:ml-auto" : ""}`}>
                      {t(`field.steps.${key}.text`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
