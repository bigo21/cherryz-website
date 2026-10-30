"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "./gsap";

const NODES = ["operators", "cherryz", "roof", "site"] as const;
const OPERATORS = [
  { name: "Camtel", logo: "/logos/trim/camtel.png" },
  { name: "Orange", logo: "/logos/trim/orange.png" },
  { name: "MTN", logo: "/logos/trim/mtn.png" },
] as const;

// One full-bleed photo per leg of the route.
const CHAPTERS = [
  { key: "operators", src: "/photos/b2b-hero.jpg", position: "50% 50%" },
  { key: "roof", src: "/photos/pourquoi-cherryz.jpg", position: "60% 35%" },
  { key: "online", src: "/photos/refonte/terrain-installation.jpg", position: "60% 50%" },
] as const;

/**
 * The broker mechanism as a route: operators → Cherryz → your roof → your site.
 * Wide screens with motion pin the section and let the beam advance node by node
 * while each leg's photo wipes in behind it; otherwise the legs simply stack, each
 * with the beam running down its left edge.
 */
export default function BeamRelay() {
  const t = useTranslations("Home");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = scope.current;
        if (!section) return;
        section.dataset.pinned = "";
        const chapters = gsap.utils.toArray<HTMLElement>(".relay-chapter", section);
        const texts = chapters.map((c) => c.querySelector("[data-copy]"));
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", section);

        gsap.set(chapters.slice(1), { clipPath: "inset(0 100% 0 0)" });
        gsap.set(texts.slice(1), { opacity: 0, y: 40 });
        gsap.set("[data-head]", { scaleX: 0 });

        // Leg i: the beam runs from node i to node i + 1; legs 2 and 3 bring their photo with it.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=260%", pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
        tl.to("[data-head]", { scaleX: 1 / 3, duration: 1 });
        [1, 2].forEach((i) => {
          tl.to(texts[i - 1], { opacity: 0, y: -30, duration: 0.35 })
            .to(chapters[i], { clipPath: "inset(0 0% 0 0)", duration: 1 }, "<")
            .to("[data-head]", { scaleX: (i + 1) / 3, duration: 1 }, "<")
            .to(texts[i], { opacity: 1, y: 0, duration: 0.45 }, ">-0.3");
        });
        tl.to({}, { duration: 0.4 });

        // Nodes light up as the beam reaches them, in both scroll directions.
        tl.eventCallback("onUpdate", () => {
          const reached = tl.progress() * 3.4;
          nodes.forEach((n, i) => n.toggleAttribute("data-on", i === 0 || reached >= i * 1.1));
        });

        return () => {
          delete section.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="beam-page relative bg-night text-white" aria-label={t("beam.relay.label")}>
      {/* The route, across the top of the pinned frame (wide screens) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[104px] z-20 hidden px-12 [[data-pinned]_&]:block">
        <div className="relative mx-auto h-[64px] max-w-[1264px]">
          <div className="absolute left-[6%] right-[6%] top-[9px] h-[3px] bg-white/20">
            <div data-head className="h-full origin-left bg-beam" />
          </div>
          <ol className="relative m-0 flex list-none justify-between p-0">
            {NODES.map((n, i) => (
              <li
                key={n}
                data-node
                data-on={i === 0 ? "" : undefined}
                className="group flex w-[12%] flex-col items-center gap-2 text-center"
              >
                <span className="h-[21px] w-[21px] rounded-full border-2 border-white/50 bg-night transition-colors duration-300 group-data-[on]:border-white group-data-[on]:bg-beam" />
                <span className="whitespace-nowrap bg-night/75 px-2 py-[2px] font-sans text-[13.5px] font-semibold text-haze/70 transition-colors group-data-[on]:text-white">
                  {t(`beam.relay.nodes.${n}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relay-frame">
        {CHAPTERS.map(({ key, src, position }, i) => (
          <article key={key} className="relay-chapter relative flex min-h-[86svh] items-end overflow-hidden bg-night">
            <Image
              src={src}
              alt={t(`beam.relay.chapters.${key}.alt`)}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: position }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10" />
            {/* Narrow screens: the beam runs down the left edge, one node per leg */}
            <div aria-hidden className="absolute bottom-0 left-4 top-0 w-[3px] bg-beam sm:left-6 [[data-pinned]_&]:hidden" />

            <div data-copy className="relative mx-auto w-full max-w-[1360px] px-4 pb-14 pl-10 pt-32 sm:px-6 sm:pl-14 md:px-12 md:pl-16 lg:pb-20">
              <p className="m-0 flex items-center gap-3 font-sans text-[14px] font-semibold text-haze">
                <span aria-hidden className="absolute left-[9px] h-[17px] w-[17px] rounded-full border-2 border-white bg-beam sm:left-[17px] [[data-pinned]_&]:hidden" />
                {t("beam.relay.progress", { current: i + 1, total: CHAPTERS.length })}
              </p>
              <h2 className="m-0 mt-3 max-w-[18ch] font-condensed text-[clamp(38px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
                {key === "operators" ? t("broker.title") : t(`beam.relay.chapters.${key}.title`)}
              </h2>
              <p className="m-0 mt-5 max-w-[56ch] font-sans text-[17.5px] leading-[1.6] text-haze">
                {key === "operators" ? t("broker.lead") : t(`beam.relay.chapters.${key}.text`)}
              </p>
              {key === "operators" && (
                <ul className="m-0 mt-7 flex list-none flex-wrap gap-[2px] p-0">
                  {OPERATORS.map((op) => (
                    <li key={op.name} className="flex h-14 items-center gap-3 bg-white px-4 text-night">
                      <Image src={op.logo} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                      <span className="font-condensed text-[18px] font-bold">{op.name}</span>
                    </li>
                  ))}
                  <li className="flex h-14 items-center bg-white/12 px-4 font-condensed text-[17px] font-bold text-white">
                    {t("broker.diagram.others")}
                  </li>
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
