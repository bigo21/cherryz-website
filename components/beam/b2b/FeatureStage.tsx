"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "../gsap";

const FEATURES = [
  { key: "multiOperator", src: "/photos/approche-03-solution.jpg" },
  { key: "fastInstall", src: "/photos/pourquoi-cherryz.jpg" },
  { key: "dedicatedIp", src: "/photos/refonte/terrain-installation.jpg" },
  { key: "trial", src: "/photos/approche-04-cotation.jpg" },
  { key: "coverage", src: "/photos/accueil-hero.jpg" },
  { key: "support", src: "/photos/approche-06-suivi.jpg" },
] as const;

const OPERATORS = [
  { name: "Camtel", logo: "/logos/trim/camtel.png" },
  { name: "Orange", logo: "/logos/trim/orange.png" },
  { name: "MTN", logo: "/logos/trim/mtn.png" },
] as const;

/**
 * The six reasons to go through Cherryz. On wide screens one photograph stays in
 * view and changes with the reason being read, while a beam runs down the list and
 * lights each reason it reaches; on narrow screens each reason carries its own photo.
 */
export default function FeatureStage() {
  const t = useTranslations("InternetB2B");
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Following the reading position is not motion: it also runs under reduced motion.
      // The current reason is the last one whose top has passed the reading line,
      // worked out on every update so fast scrolling never skips one.
      const items = gsap.utils.toArray<HTMLElement>("[data-feature]", scope.current);
      const pick = () => {
        const line = window.innerHeight * 0.55;
        setActive(Math.max(0, items.filter((el) => el.getBoundingClientRect().top <= line).length - 1));
      };
      ScrollTrigger.create({ trigger: "[data-features]", start: "top bottom", end: "bottom top", onUpdate: pick, onRefresh: pick });
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-features]", start: "top 55%", end: "bottom 55%", scrub: 0.4 } },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="beam-page bg-night text-white" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1360px] px-4 pt-20 sm:px-6 md:px-12 md:pt-28">
        <h2 id="features-title" className="m-0 max-w-[20ch] font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
          {t("features.title")}
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1360px] grid-cols-1 px-4 pb-20 sm:px-6 md:px-12 md:pb-28 lg:grid-cols-2 lg:gap-20">
        {/* The stage: one photograph per reason, the current one on top */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-svh items-center pb-10 pt-[100px]">
            <div className="relative h-full max-h-[640px] w-full overflow-hidden bg-dusk">
              {FEATURES.map((f, i) => (
                <Image
                  key={f.key}
                  src={f.src}
                  alt={i === active ? t(`featurePhotos.${f.key}`) : ""}
                  fill
                  sizes="45vw"
                  className={`object-cover transition-[opacity,transform] duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
                />
              ))}
              <p className="absolute bottom-0 left-0 m-0 bg-night/85 px-4 py-3 font-condensed text-[20px] font-bold">
                <span className="mr-3 font-sans text-[14px] font-semibold tabular-nums text-beam">
                  {active + 1} / {FEATURES.length}
                </span>
                {t(`features.items.${FEATURES[active].key}.title`)}
              </p>
            </div>
          </div>
        </div>

        <div data-features className="relative mt-12 lg:mt-0 lg:py-[22svh]">
          <div aria-hidden className="absolute bottom-0 left-[8px] top-0 w-[3px] bg-white/12 lg:bottom-[22svh] lg:top-[22svh]">
            <div data-fill className="h-full origin-top bg-beam" />
          </div>
          <ul className="m-0 flex list-none flex-col gap-16 p-0 lg:gap-[26svh]">
            {FEATURES.map((f, i) => (
              <li key={f.key} data-feature className="group relative pl-12" data-on={i <= active ? "" : undefined}>
                <span
                  aria-hidden
                  className="absolute left-0 top-[6px] h-[19px] w-[19px] rounded-full border-2 border-beam bg-night transition-colors duration-300 group-data-[on]:bg-beam"
                />
                <div className="relative aspect-[16/10] overflow-hidden bg-dusk lg:hidden">
                  <Image src={f.src} alt={t(`featurePhotos.${f.key}`)} fill sizes="92vw" className="object-cover" />
                </div>
                <h3 className="m-0 mt-5 font-condensed text-[clamp(30px,3vw,44px)] font-bold leading-none lg:mt-0">{t(`features.items.${f.key}.title`)}</h3>
                <p className="m-0 mt-3 max-w-[42ch] font-sans text-[17.5px] leading-[1.55] text-haze">{t(`features.items.${f.key}.text`)}</p>
                {f.key === "multiOperator" && (
                  <ul className="m-0 mt-5 flex list-none flex-wrap gap-[2px] p-0">
                    {OPERATORS.map((op) => (
                      <li key={op.name} className="flex h-12 items-center gap-3 bg-white px-4 text-night">
                        <Image src={op.logo} alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                        <span className="font-condensed text-[17px] font-bold">{op.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-12 pl-12 font-sans text-[13.5px] text-haze/70 lg:mt-[12svh]">{t("features.footnote")}</p>
        </div>
      </div>
    </section>
  );
}
