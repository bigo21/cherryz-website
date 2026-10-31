"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "../gsap";

const STEPS = ["request", "callback", "visit", "quote", "install", "connected"] as const;

/**
 * From the request to the connection: six nodes on one beam that fills as the
 * section scrolls by (across on wide screens, down on narrow ones), lighting each
 * node it reaches.
 */
export default function StepsBeam() {
  const t = useTranslations("InternetB2B");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: "(min-width: 1024px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const wide = ctx.conditions.wide;
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", scope.current);
        nodes.forEach((n) => n.removeAttribute("data-on"));
        gsap.fromTo(
          wide ? "[data-fill-x]" : "[data-fill-y]",
          wide ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: "[data-steps]",
              start: wide ? "top 75%" : "top 65%",
              end: wide ? "top 25%" : "bottom 65%",
              scrub: 0.4,
              onUpdate: (self) =>
                nodes.forEach((n, i) => n.toggleAttribute("data-on", self.progress >= i / (nodes.length - 1) - 0.001)),
            },
          },
        );
        return () => nodes.forEach((n) => n.setAttribute("data-on", ""));
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="comment" ref={scope} className="beam-page scroll-mt-24 bg-dawn py-20 text-night md:py-28" aria-labelledby="steps-title">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-12">
        <h2 id="steps-title" className="m-0 max-w-[18ch] font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
          {t("steps.title")}
        </h2>

        <div data-steps className="relative mt-14">
          <div aria-hidden className="absolute left-[10px] top-0 bottom-0 w-[3px] bg-night/12 lg:hidden">
            <div data-fill-y className="h-full origin-top bg-cherry" />
          </div>
          <div aria-hidden className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[10px] hidden h-[3px] bg-night/12 lg:block">
            <div data-fill-x className="h-full origin-left bg-cherry" />
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-9 p-0 lg:grid-cols-6 lg:gap-4" aria-label={t("stepsLabel")}>
            {STEPS.map((k, i) => (
              <li key={k} data-node data-on="" className="group relative pl-12 lg:pl-0 lg:pt-12 lg:text-center">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[23px] w-[23px] rounded-full border-[3px] border-cherry bg-dawn transition-colors duration-300 group-data-[on]:bg-cherry lg:left-1/2 lg:-translate-x-1/2"
                />
                <span className="block font-sans text-[14px] font-semibold tabular-nums text-cherry">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block font-condensed text-[23px] font-bold leading-tight">{t(`steps.items.${k}`)}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href={localize(lang, QUOTE.ip)}
          className="mt-14 inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
        >
          {t("steps.cta")}
          <ArrowRightIcon aria-hidden className="text-[19px]" />
        </Link>
      </div>
    </section>
  );
}
