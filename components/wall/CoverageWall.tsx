"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import LinkLine from "./LinkLine";

type Zone = "building" | "neighbourhood" | "hotel" | "campus" | "market" | "industrial" | "clinic";

// Eight places, each with the point its access point would cover from (percent).
const TILES: { src: string; zone: Zone; at: [number, number]; span: string }[] = [
  { src: "/photos/zone-quartier.jpg", zone: "neighbourhood", at: [48, 38], span: "lg:col-span-6 lg:row-span-2" },
  { src: "/photos/zone-batiment.jpg", zone: "building", at: [55, 30], span: "lg:col-span-3" },
  { src: "/photos/zone-hotel.jpg", zone: "hotel", at: [42, 40], span: "lg:col-span-3" },
  { src: "/photos/zone-campus.jpg", zone: "campus", at: [40, 45], span: "lg:col-span-3" },
  { src: "/photos/zone-marche.jpg", zone: "market", at: [60, 32], span: "lg:col-span-3" },
  { src: "/photos/zone-industriel.jpg", zone: "industrial", at: [45, 40], span: "lg:col-span-4" },
  { src: "/photos/zone-clinique.jpg", zone: "clinic", at: [50, 42], span: "lg:col-span-4" },
  { src: "/photos/service-wifizone.jpg", zone: "hotel", at: [62, 12], span: "lg:col-span-4 col-span-2" },
];

/** Coverage rings opening from the access point, three waves, once the tile is in view. */
function Rings({ at: [x, y], big }: { at: [number, number]; big: boolean }) {
  const reduce = useReducedMotion();
  const size = big ? 420 : 240;
  return (
    <span aria-hidden className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border-2 border-white"
          style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
          initial={reduce ? { scale: 0.35 + i * 0.3, opacity: 0.55 - i * 0.15 } : { scale: 0.1, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: [0.1, 1], opacity: [0.85, 0] }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 2.6, delay: i * 0.85, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full border-2 border-white bg-cherry" />
    </span>
  );
}

export default function CoverageWall() {
  const t = useTranslations("Home.coverage");
  const tz = useTranslations("WifiZone.zones.items");
  const lang = useLocale();
  return (
    <section className="wall-page bg-seam text-white" aria-labelledby="coverage-title">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-4 pb-10 pt-20 sm:px-6 md:px-12 md:pt-28">
        <div>
          <h2 id="coverage-title" className="m-0 max-w-[16ch] font-condensed text-[clamp(36px,4.2vw,56px)] font-bold leading-[0.98] tracking-[-0.015em] [text-wrap:balance]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[56ch] font-sans text-[17.5px] leading-[1.6] text-readout/80">{t("lead")}</p>
        </div>
        <Link href={localize(lang, "/wifi-zone")} className="inline-flex items-center gap-2 font-sans text-[16.5px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
          {t("cta")}
          <ArrowRightIcon aria-hidden className="text-[17px]" />
        </Link>
      </div>
      <ul className="m-0 grid list-none grid-cols-2 gap-[2px] p-0 lg:auto-rows-[260px] lg:grid-cols-12">
        {TILES.map((tile, i) => (
          <li key={tile.src} data-link="online" className={`relative aspect-[4/3] overflow-hidden bg-tile lg:aspect-auto ${i === 0 ? "col-span-2" : ""} ${tile.span}`}>
            <Image src={tile.src} alt="" fill sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"} className="object-cover" />
            <Rings at={tile.at} big={i === 0} />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-seam/85 px-3 py-[7px] font-sans text-[13.5px] font-semibold">
              <LinkLine className="text-signal" /> {tz(`${tile.zone}.title`)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
