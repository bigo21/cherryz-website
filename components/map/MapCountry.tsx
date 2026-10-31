"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CAMEROON, CITIES, COAST, HOME, MAP_VIEWBOX, NEIGHBOURS } from "./cameroon";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

const OPERATORS = [
  { name: "Camtel", logo: "/logos/trim/camtel.png" },
  { name: "Orange", logo: "/logos/trim/orange.png" },
  { name: "MTN", logo: "/logos/trim/mtn.png" },
] as const;

const CHAPTERS = [
  { key: "country" },
  { key: "operators", src: "/photos/b2b-hero.jpg", lobe: "lobe" },
  { key: "roof", src: "/photos/pourquoi-cherryz.jpg", lobe: "lobe-b" },
  { key: "online", src: "/photos/refonte/terrain-installation.jpg", lobe: "lobe-c" },
] as const;

// Schematic operator networks reaching Yaoundé: from the sea, from the coast,
// from the North and from the East. Not a route map of any one operator.
const [hx, hy] = HOME;
const NETWORKS = [
  `M160,1010 Q330,1020 ${hx},${hy}`,
  `M370,935 Q450,880 ${hx},${hy}`,
  `M740,410 Q760,560 758,608 Q700,820 ${hx},${hy}`,
  `M768,882 Q660,900 ${hx},${hy}`,
];

/** Coverage around a place: three overlapping discs, like access points side by side. */
const lobe = ([x, y]: [number, number], s: number) => [
  { cx: x, cy: y, r: 34 * s },
  { cx: x + 26 * s, cy: y - 16 * s, r: 24 * s },
  { cx: x - 22 * s, cy: y + 18 * s, r: 22 * s },
];
const LOBES = [...lobe(HOME, 1.9), ...CITIES.flatMap((c) => lobe(c.at, 1))];

function CameroonMap() {
  const t = useTranslations("Home.map.country");
  return (
    <svg viewBox={MAP_VIEWBOX} className="block h-full max-h-full w-full" role="img" aria-label={t("label")}>
      {NEIGHBOURS.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#ffffff" strokeOpacity={0.22} strokeWidth={3} strokeDasharray="12 10" />
      ))}
      <path data-land d={CAMEROON} fill="#f5e2c8" />
      <path data-border d={CAMEROON} fill="none" stroke="#ead0ad" strokeWidth={4} strokeLinejoin="round" />
      <g data-lobes>
        {LOBES.map((d, i) => (
          <circle key={i} data-lobe data-r={d.r} cx={d.cx} cy={d.cy} r={d.r} fill="#a2032d" />
        ))}
      </g>
      {NETWORKS.map((d, i) => (
        <path key={i} data-network d={d} fill="none" stroke="#101b28" strokeWidth={5} strokeLinecap="round" />
      ))}
      {/* The littoral, drawn as the strongest line on the plan */}
      <path data-coast d={COAST} fill="none" stroke="#ffffff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      {CITIES.map((c) => (
        <g key={c.name} data-city>
          <circle cx={c.at[0]} cy={c.at[1]} r={9} fill="#101b28" stroke="#fff" strokeWidth={3} />
          <text x={c.at[0] + 16} y={c.at[1] + 6} fill="#101b28" fontSize={24} fontWeight={600} className="font-sans" paintOrder="stroke" stroke="#f5e2c8" strokeWidth={5}>
            {c.name}
          </text>
        </g>
      ))}
      <g data-home>
        <circle cx={hx} cy={hy} r={20} fill="#101b28" stroke="#fff" strokeWidth={5} />
        <circle cx={hx} cy={hy} r={7} fill="#fff" />
        <text x={hx + 30} y={hy + 9} fill="#fff" fontSize={30} fontWeight={700} className="font-condensed" paintOrder="stroke" stroke="#101b28" strokeWidth={7}>
          {t("home")} · Yaoundé
        </text>
      </g>
    </svg>
  );
}

/**
 * The whole country as a guide map: on wide screens the plan stays in view while
 * four chapters scroll past, and each chapter adds a layer to it (the coastline,
 * the operator networks, the covered areas, the visitor's site online).
 */
export default function MapCountry() {
  const t = useTranslations("Home");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: "(min-width: 1024px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const trigger = ctx.conditions.wide
          ? { trigger: "[data-chapters]", start: "top 70%", end: "bottom bottom", scrub: 0.6 }
          : { trigger: "[data-plan]", start: "top 80%", end: "bottom 35%", scrub: 0.6 };
        gsap
          .timeline({ scrollTrigger: trigger, defaults: { ease: "none" } })
          .from("[data-land]", { opacity: 0, duration: 0.6 }, 0)
          .from("[data-border]", { drawSVG: 0, duration: 1 }, 0)
          .from("[data-coast]", { drawSVG: 0, duration: 1 }, 0.1)
          .from("[data-city]", { opacity: 0, duration: 0.2, stagger: 0.05 }, 0.5)
          .from("[data-network]", { drawSVG: 0, duration: 0.9, stagger: 0.12 }, 1.2)
          .from("[data-lobe]", { attr: { r: 0 }, duration: 0.6, stagger: 0.02 }, 2.4)
          .from("[data-home]", { scale: 0.4, opacity: 0, transformOrigin: `${hx}px ${hy}px`, duration: 0.4 }, 3.4);
        // Each chapter's photo opens like a coverage area spreading.
        gsap.utils.toArray<HTMLElement>("[data-photo]", scope.current).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "circle(0% at 50% 50%)" },
            {
              clipPath: "circle(75% at 50% 50%)",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="map-page relative bg-navy text-white" aria-labelledby="country-title">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 px-4 pb-20 pt-16 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:pb-0 lg:pt-0">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:pb-8 lg:pt-[112px]">
          <div data-plan className="mx-auto aspect-[980/1220] w-full max-w-[520px] lg:h-full lg:w-auto lg:max-w-full">
            <CameroonMap />
          </div>
        </div>

        <div data-chapters className="flex flex-col gap-20 lg:gap-0">
          {CHAPTERS.map((c, i) => (
            <article key={c.key} className="flex flex-col justify-center lg:min-h-svh lg:py-24">
              <p className="m-0 font-sans text-[14px] font-semibold tabular-nums text-white/60">
                {t("map.country.progress", { current: i + 1, total: CHAPTERS.length })}
              </p>
              {c.key === "country" ? (
                <>
                  <h2 id="country-title" className="m-0 mt-3 max-w-[16ch] font-condensed text-[clamp(40px,4.8vw,72px)] font-bold leading-[0.93] tracking-[-0.02em] [text-wrap:balance]">
                    {t("map.country.title")}
                  </h2>
                  <p className="m-0 mt-5 max-w-[46ch] font-sans text-[17.5px] leading-[1.6] text-white/80">{t("map.country.lead")}</p>
                  <dl className="m-0 mt-8 grid max-w-[440px] grid-cols-1 gap-3 border-t border-white/15 pt-6 font-sans text-[15px] sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <dt aria-hidden className="h-[22px] w-[22px] flex-none rounded-full border-[4px] border-white bg-navy" />
                      <dd className="m-0">{t("map.country.legend.home")}</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt aria-hidden className="mx-[4px] h-[14px] w-[14px] flex-none rounded-full border-2 border-white bg-navy" />
                      <dd className="m-0">{t("map.country.legend.city")}</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt aria-hidden className="flex h-[16px] w-[26px] flex-none items-center bg-sand px-[3px]"><span className="block h-[4px] w-full bg-navy" /></dt>
                      <dd className="m-0">{t("map.country.legend.network")}</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt aria-hidden className="lobe h-[20px] w-[24px] flex-none bg-cherry ring-2 ring-white/30" />
                      <dd className="m-0">{t("map.country.legend.covered")}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <>
                  <h3 className="m-0 mt-3 max-w-[18ch] font-condensed text-[clamp(34px,3.8vw,56px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
                    {c.key === "operators" ? t("broker.title") : t(`map.country.chapters.${c.key}.title`)}
                  </h3>
                  <p className="m-0 mt-5 max-w-[50ch] font-sans text-[17px] leading-[1.6] text-white/80">
                    {c.key === "operators" ? t("broker.lead") : t(`map.country.chapters.${c.key}.text`)}
                  </p>
                  {c.key === "operators" && (
                    <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                      {OPERATORS.map((op) => (
                        <li key={op.name} className="flex h-12 items-center gap-3 rounded-full bg-white pl-2 pr-5 text-navy">
                          <Image src={op.logo} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                          <span className="font-condensed text-[18px] font-bold">{op.name}</span>
                        </li>
                      ))}
                      <li className="flex h-12 items-center rounded-full border-2 border-white/30 px-5 font-condensed text-[17px] font-bold">
                        {t("broker.diagram.others")}
                      </li>
                    </ul>
                  )}
                  <div data-photo className={`${c.lobe} relative mt-9 aspect-[4/3] w-full max-w-[560px] overflow-hidden bg-[#1a2738]`}>
                    <Image src={c.src} alt={t(`map.country.chapters.${c.key}.alt`)} fill sizes="(max-width: 1024px) 92vw, 560px" className="object-cover" />
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
