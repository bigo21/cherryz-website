"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import LinkLine from "./LinkLine";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

gsap.registerPlugin(MotionPathPlugin);

const OPERATORS = [
  { name: "Camtel", logo: "/logos/trim/camtel.png" },
  { name: "Orange", logo: "/logos/trim/orange.png" },
  { name: "MTN", logo: "/logos/trim/mtn.png" },
  { name: null, logo: null },
] as const;

// Diagram coordinates (viewBox 800 × 440); tiles are placed in % of the same box.
const W = 800;
const H = 440;
const OP = { x: 0, w: 190, h: 82, ys: [12, 120, 228, 336] };
const HUB = { x: 330, y: 150, w: 150, h: 140 };
const SITE = { x: 580, y: 70, w: 220, h: 300 };
const feed = (i: number) => {
  const y = OP.ys[i] + OP.h / 2;
  return `M${OP.x + OP.w} ${y} C ${OP.x + OP.w + 80} ${y}, ${HUB.x - 80} ${HUB.y + HUB.h / 2}, ${HUB.x} ${HUB.y + HUB.h / 2}`;
};
const OUT = `M${HUB.x + HUB.w} ${HUB.y + HUB.h / 2} H ${SITE.x}`;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The broker mechanism as a feed diagram: operator feeds (dashed, still being
 * negotiated) converge into Cherryz, and one solid link leaves for the client's
 * site. Scrolling draws the links; packets then travel them while in view.
 */
export default function BrokerFlow() {
  const t = useTranslations("Home");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reveal = scope.current?.querySelector("#flow-reveal");
        if (reveal) {
          gsap.fromTo(
            reveal,
            { attr: { width: 0 } },
            { attr: { width: W }, ease: "none", scrollTrigger: { trigger: scope.current, start: "top 75%", end: "center 55%", scrub: 0.6 } },
          );
        }
        const packets = gsap.utils.toArray<SVGCircleElement>("[data-packet]", scope.current);
        const loop = gsap.timeline({ repeat: -1, paused: true });
        packets.forEach((p, i) => {
          const route = p.dataset.packet === "out" ? "#flow-out" : `#flow-feed-${p.dataset.packet}`;
          loop.fromTo(
            p,
            { opacity: 1 },
            { duration: p.dataset.packet === "out" ? 0.9 : 1.6, ease: "none", motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] } },
            (i % 4) * 0.4,
          );
        });
        gsap.timeline({ scrollTrigger: { trigger: scope.current, start: "center 60%", end: "bottom top", onToggle: (st) => (st.isActive ? loop.play() : loop.pause()) } });
        return () => loop.kill();
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="wall-page bg-seam py-20 text-white md:py-28" aria-labelledby="flow-title">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="flow-title" className="m-0 max-w-[14ch] font-condensed text-[clamp(36px,4.2vw,56px)] font-bold leading-[0.98] tracking-[-0.015em] [text-wrap:balance]">
            {t("flow.title")}
          </h2>
          <p className="mt-6 max-w-[46ch] font-sans text-[17.5px] leading-[1.6] text-readout/80">{t("flow.lead")}</p>
        </div>

        <div ref={scope} className="lg:col-span-8">
          {/* Wide: the feed diagram */}
          <div className="relative hidden md:block" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <clipPath id="flow-clip">
                  <rect id="flow-reveal" x="0" y="0" width={W} height={H} />
                </clipPath>
              </defs>
              <g clipPath="url(#flow-clip)" fill="none" strokeLinecap="round">
                {OP.ys.map((_, i) => (
                  <path key={i} id={`flow-feed-${i}`} d={feed(i)} stroke="#dfe7f0" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="5 6" />
                ))}
                <path id="flow-out" d={OUT} stroke="#ff5a7e" strokeWidth="5" />
              </g>
              {OP.ys.map((_, i) => (
                <circle key={i} data-packet={i} r="4" fill="#dfe7f0" opacity="0" />
              ))}
              <circle data-packet="out" r="5" fill="#fff" opacity="0" />
            </svg>

            {OPERATORS.map((op, i) => (
              <div
                key={i}
                data-link="negotiating"
                className="absolute flex items-center gap-3 bg-white px-4 text-navy"
                style={{ left: pct(OP.x, W), top: pct(OP.ys[i], H), width: pct(OP.w, W), height: pct(OP.h, H) }}
              >
                {op.logo ? (
                  <>
                    <Image src={op.logo} alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
                    <span className="font-condensed text-[19px] font-bold">{op.name}</span>
                  </>
                ) : (
                  <span className="font-condensed text-[17px] font-bold">{t("broker.diagram.others")}</span>
                )}
                <LinkLine className="ml-auto text-navy/50" />
              </div>
            ))}

            <div
              className="absolute flex flex-col items-center justify-center gap-1 bg-cherry text-center"
              style={{ left: pct(HUB.x, W), top: pct(HUB.y, H), width: pct(HUB.w, W), height: pct(HUB.h, H) }}
            >
              <Image src="/brand/logo-white.png" alt="Cherryz" width={98} height={40} className="h-9 w-auto" />
              <span className="font-sans text-[13px] font-semibold text-white/90">{t("flow.cherryz")}</span>
            </div>

            <figure
              data-link="online"
              className="absolute m-0 overflow-hidden bg-tile"
              style={{ left: pct(SITE.x, W), top: pct(SITE.y, H), width: pct(SITE.w, W), height: pct(SITE.h, H) }}
            >
              <Image src="/photos/refonte/terrain-installation.jpg" alt={t("flow.photoAlt")} fill sizes="300px" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-seam/90 px-3 py-2">
                <span className="flex items-center gap-2 font-condensed text-[18px] font-bold">
                  <LinkLine className="text-signal" /> {t("flow.site")}
                </span>
                <span className="font-sans text-[13px] text-readout/75">{t("flow.siteSub")}</span>
              </figcaption>
            </figure>
          </div>

          {/* Narrow: the same chain, stacked */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-[2px] bg-seam">
              {OPERATORS.map((op, i) => (
                <div key={i} data-link="negotiating" className="flex h-16 items-center gap-2 bg-white px-3 text-navy">
                  {op.logo && <Image src={op.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />}
                  <span className="font-condensed text-[17px] font-bold">{op.name ?? t("broker.diagram.others")}</span>
                </div>
              ))}
            </div>
            <div aria-hidden className="mx-auto h-10 w-0 border-l-2 border-dashed border-readout/50" />
            <div className="flex flex-col items-center gap-1 bg-cherry py-5">
              <Image src="/brand/logo-white.png" alt="Cherryz" width={98} height={40} className="h-8 w-auto" />
              <span className="font-sans text-[13px] font-semibold text-white/90">{t("flow.cherryz")}</span>
            </div>
            <div aria-hidden className="mx-auto h-10 w-[5px] bg-signal" />
            <figure data-link="online" className="relative m-0 aspect-[4/3] overflow-hidden">
              <Image src="/photos/refonte/terrain-installation.jpg" alt={t("flow.photoAlt")} fill sizes="100vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-seam/90 px-3 py-2">
                <span className="flex items-center gap-2 font-condensed text-[18px] font-bold">
                  <LinkLine className="text-signal" /> {t("flow.site")}
                </span>
                <span className="font-sans text-[13px] text-readout/75">{t("flow.siteSub")}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
