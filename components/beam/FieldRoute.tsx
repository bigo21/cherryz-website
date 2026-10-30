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
  { key: "listening", src: "/photos/approche-01-ecoute.jpg", position: "50% 40%" },
  { key: "survey", src: "/photos/approche-02-etude.jpg", position: "50% 30%" },
  { key: "solution", src: "/photos/approche-03-solution.jpg", position: "50% 35%" },
  { key: "quote", src: "/photos/approche-04-cotation.jpg", position: "50% 40%" },
  { key: "deployment", src: "/photos/approche-05-deploiement.jpg", position: "60% 40%" },
  { key: "followUp", src: "/photos/approche-06-suivi.jpg", position: "50% 40%" },
] as const;

/**
 * The six field steps hung on one beam that runs down the page: it fills as you
 * scroll, each node lights when reached, and each photo opens from the beam outwards.
 */
export default function FieldRoute() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: "(min-width: 1024px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const wide = ctx.conditions.wide;
        gsap.fromTo(
          "[data-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-route]", start: "top 60%", end: "bottom 60%", scrub: 0.4 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]", scope.current).forEach((step, i) => {
          const photo = step.querySelector("[data-photo]");
          // The photo opens from the side that faces the beam.
          const closed = wide && i % 2 === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
          gsap.fromTo(
            photo,
            { clipPath: closed },
            { clipPath: "inset(0 0% 0 0%)", ease: "power2.out", scrollTrigger: { trigger: step, start: "top 85%", end: "top 40%", scrub: 0.5 } },
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
    <section ref={scope} className="beam-page bg-white py-20 text-night md:py-28" aria-labelledby="route-title">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="route-title" className="m-0 max-w-[18ch] font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
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

        <div data-route className="relative mt-14 lg:mt-20">
          {/* The beam: left gutter on narrow screens, centre line on wide ones */}
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-[3px] bg-night/12 lg:left-1/2 lg:-translate-x-1/2">
            <div data-fill className="h-full origin-top bg-cherry" />
          </div>

          <ol className="m-0 flex list-none flex-col gap-14 p-0 lg:gap-6" aria-label={t("beam.route.label")}>
            {STEPS.map(({ key, src, position }, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={key} data-step className="group relative grid grid-cols-1 gap-6 pl-9 lg:grid-cols-2 lg:items-center lg:gap-24 lg:pl-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[17px] w-[17px] rounded-full border-2 border-cherry bg-white transition-colors duration-300 group-data-[on]:bg-cherry lg:left-1/2 lg:top-1/2 lg:h-[21px] lg:w-[21px] lg:-translate-x-1/2 lg:-translate-y-1/2"
                  />
                  <div data-photo className={`relative aspect-[4/3] overflow-hidden bg-night ${flip ? "lg:order-2" : ""}`}>
                    <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" style={{ objectPosition: position }} />
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
