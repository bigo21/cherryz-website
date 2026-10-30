"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import LinkLine from "./LinkLine";
import { gsap, useGSAP } from "./gsap";

const STEPS = [
  { key: "listening", src: "/photos/approche-01-ecoute.jpg" },
  { key: "survey", src: "/photos/approche-02-etude.jpg" },
  { key: "solution", src: "/photos/approche-03-solution.jpg" },
  { key: "quote", src: "/photos/approche-04-cotation.jpg" },
  { key: "deployment", src: "/photos/approche-05-deploiement.jpg" },
  { key: "followUp", src: "/photos/approche-06-suivi.jpg" },
] as const;

/**
 * The six field steps as a wall that slides past while the section holds still,
 * a transfer bar filling above it. Narrow screens and reduced motion get the
 * same panels as a plain stack / scroller.
 */
export default function StepsRail() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const scope = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        const vp = viewport.current;
        if (!el || !vp) return;
        vp.style.overflow = "visible";
        const distance = () => el.scrollWidth - vp.clientWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              if (bar.current) bar.current.style.transform = `scaleX(${st.progress})`;
            },
          },
        });
        return () => {
          vp.style.overflow = "";
        };
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="wall-page overflow-hidden bg-tile text-white lg:flex lg:h-svh lg:flex-col" aria-labelledby="steps-title">
      <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-6 px-4 pb-8 pt-20 sm:px-6 md:px-12 lg:pt-[110px]">
        <div>
          <h2 id="steps-title" className="m-0 max-w-[18ch] font-condensed text-[clamp(36px,4.2vw,56px)] font-bold leading-[0.98] tracking-[-0.015em] [text-wrap:balance]">
            {t("steps.title")}
          </h2>
          <p className="mt-5 max-w-[56ch] font-sans text-[17.5px] leading-[1.6] text-readout/80">{t("steps.lead")}</p>
        </div>
        <Link
          href={localize(lang, QUOTE.hub)}
          className="inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
        >
          {t("steps.cta")}
          <ArrowRightIcon aria-hidden className="text-[19px]" />
        </Link>
      </div>

      {/* Transfer bar: fills as the steps go by (wide screens with motion). */}
      <div aria-hidden className="hidden h-[3px] bg-white/10 lg:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-signal" />
      </div>

      <div ref={viewport} className="lg:flex-1 lg:overflow-x-auto">
        <ol ref={track} className="m-0 flex list-none flex-col gap-[2px] bg-seam p-0 lg:h-full lg:w-max lg:flex-row">
          {STEPS.map(({ key, src }, i) => (
            <li key={key} data-link="online" className="relative min-h-[420px] w-full bg-tile lg:h-full lg:min-h-0 lg:w-[min(56vw,860px)]">
              <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-seam/90 px-5 pb-6 pt-4 sm:px-7">
                <p className="m-0 flex items-center gap-2 font-mono text-[13px] font-medium text-readout/75">
                  <LinkLine className="text-signal" />
                  {t("steps.progress", { current: i + 1, total: STEPS.length })}
                </p>
                <h3 className="m-0 mt-2 font-condensed text-[clamp(26px,2.6vw,36px)] font-bold leading-tight">{t(`field.steps.${key}.title`)}</h3>
                <p className="m-0 mt-1 max-w-[52ch] font-sans text-[16.5px] leading-[1.5] text-readout/85">{t(`field.steps.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
