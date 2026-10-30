"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import LinkLine from "./LinkLine";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

type Path = "ip" | "wifi";
type Unit = "mbps" | "latency" | "users" | "range";
type TileKey =
  | "datacenter" | "patch" | "office" | "deploy" | "antenna" | "noc" | "study"
  | "residence" | "market" | "hotel" | "campus" | "neighbourhood" | "lodge" | "building";

interface Tile {
  src: string;
  label: TileKey;
  value: number;
  unit: Unit;
  /** Where the photo's subject sits (percent), for the caption's leader line. */
  pin?: [number, number];
}

// Each path tunes the seven swappable tiles to its own places; the aerial view stays.
const SETS: Record<Path, Tile[]> = {
  ip: [
    { src: "/photos/b2b-hero.jpg", label: "datacenter", value: 100, unit: "mbps" },
    { src: "/photos/approche-02-etude.jpg", label: "patch", value: 12, unit: "latency", pin: [52, 42] },
    { src: "/photos/service-ip.jpg", label: "office", value: 50, unit: "mbps" },
    { src: "/photos/approche-05-deploiement.jpg", label: "deploy", value: 20, unit: "mbps" },
    { src: "/photos/pourquoi-cherryz.jpg", label: "antenna", value: 8, unit: "latency", pin: [34, 30] },
    { src: "/photos/approche-06-suivi.jpg", label: "noc", value: 14, unit: "latency" },
    { src: "/photos/approche-03-solution.jpg", label: "study", value: 30, unit: "mbps" },
  ],
  wifi: [
    { src: "/photos/wifi-hero.jpg", label: "residence", value: 120, unit: "users" },
    { src: "/photos/zone-marche.jpg", label: "market", value: 340, unit: "users" },
    { src: "/photos/service-wifizone.jpg", label: "hotel", value: 85, unit: "users", pin: [62, 18] },
    { src: "/photos/zone-campus.jpg", label: "campus", value: 600, unit: "users" },
    { src: "/photos/cas-quartier.jpg", label: "neighbourhood", value: 300, unit: "range" },
    { src: "/photos/zone-hotel.jpg", label: "lodge", value: 60, unit: "users" },
    { src: "/photos/zone-batiment.jpg", label: "building", value: 48, unit: "users" },
  ],
};

// Grid placement of the seven swappable slots on wide screens (12 columns × 4 rows).
const SLOTS = [
  "lg:col-[6/9] lg:row-[3/4]",
  "lg:col-[9/13] lg:row-[3/4]",
  "lg:col-[1/4] lg:row-[4/5]",
  "lg:col-[4/6] lg:row-[4/5]",
  "lg:col-[6/8] lg:row-[4/5]",
  "lg:col-[8/11] lg:row-[4/5]",
  "col-span-2 lg:col-[11/13] lg:row-[4/5]",
];

const UNIT_SUFFIX: Record<Unit, string | null> = { mbps: "Mbps", latency: null, users: null, range: null };

/**
 * The home's first viewport: a network operations wall. Every photo is a client
 * site; on arrival the tiles come online in a sweep from the control tile, and
 * the path switch retunes the whole wall to the other offer's places.
 */
export default function HeroWall() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const format = useFormatter();
  const [path, setPath] = useState<Path>("ip");
  const scope = useRef<HTMLElement>(null);

  const unitLabel = (u: Unit) => UNIT_SUFFIX[u] ?? t(`wall.units.${u as "latency" | "users" | "range"}`);

  // "Mise en ligne": server-rendered online; once hydrated, the wall drops offline
  // and comes back tile by tile, nearest to the control tile first.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", scope.current);
        const order = (el: HTMLElement) => Number(el.dataset.order ?? 0);
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tiles.forEach((el) => {
          el.dataset.link = "offline";
          const img = el.querySelector("img");
          const readout = el.querySelector<HTMLElement>("[data-readout]");
          const at = 0.25 + order(el) * 0.13;
          if (img) tl.fromTo(img, { filter: "grayscale(1) brightness(0.45)" }, { filter: "grayscale(0) brightness(1)", duration: 1.1 }, at);
          tl.call(() => void (el.dataset.link = "negotiating"), [], at);
          tl.call(() => void (el.dataset.link = "online"), [], at + 0.55);
          if (readout) {
            const to = Number(readout.dataset.readout);
            const n = { v: 0 };
            tl.to(n, { v: to, duration: 1.2, ease: "power3.out", onUpdate: () => void (readout.textContent = format.number(Math.round(n.v))) }, at + 0.35);
          }
        });
        return () => tl.kill();
      });
      return () => mm.revert();
    },
    { scope },
  );

  const tiles = SETS[path];

  return (
    <section ref={scope} className="wall-page bg-seam pt-[76px] text-white" aria-labelledby="hero-title">
      <div className="grid grid-cols-2 gap-[2px] lg:h-[calc(100svh-76px)] lg:min-h-[640px] lg:max-h-[980px] lg:grid-cols-12 lg:grid-rows-[1fr_1fr_1fr_0.82fr]">
        {/* Control tile */}
        <div className="col-span-2 flex flex-col justify-between bg-tile px-5 pb-8 pt-10 sm:px-8 lg:col-[1/6] lg:row-[1/4] lg:px-12 lg:pb-10 lg:pt-12">
          <div>
            <h1 id="hero-title" className="m-0 max-w-[12ch] font-condensed text-[clamp(44px,5.4vw,82px)] font-bold leading-[0.94] tracking-[-0.02em] [text-wrap:balance]">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-[44ch] font-sans text-[17.5px] leading-[1.55] text-readout/80">{t("hero.lead")}</p>
          </div>

          <div className="mt-8">
            <fieldset className="m-0 border-0 p-0">
              <legend className="sr-only">{t("hero.pathLabel")}</legend>
              <div className="grid grid-cols-1 gap-[2px] bg-seam p-[2px] sm:grid-cols-2">
                {(["ip", "wifi"] as const).map((p) => {
                  const on = p === path;
                  return (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPath(p)}
                      data-link={on ? "online" : "offline"}
                      className={[
                        "flex cursor-pointer items-center gap-3 px-4 py-[14px] text-left font-condensed text-[19px] font-semibold tracking-[0.01em] transition-colors",
                        on ? "bg-white text-navy" : "bg-tile-up text-white/80 hover:text-white",
                      ].join(" ")}
                    >
                      <LinkLine className={on ? "text-cherry" : "text-white/45"} />
                      {t(`hero.tabs.${p}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <Link
              href={localize(lang, path === "ip" ? QUOTE.ip : QUOTE.wifi)}
              data-primary-cta
              className="mt-4 flex items-center justify-between gap-3 bg-cherry px-5 py-[17px] font-condensed text-[20px] font-semibold tracking-[0.01em] text-white transition-colors hover:bg-cherry-dark"
            >
              {t(path === "ip" ? "console.ctaIp" : "console.ctaWifi")}
              <ArrowRightIcon aria-hidden className="text-[20px]" />
            </Link>
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-[14px] text-readout/70" data-link="online">
              {(["art", "partners", "survey"] as const).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <LinkLine className="text-readout/50" />
                  {t(`hero.trust.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The aerial view stays whatever the path. */}
        <figure data-tile data-order={0} data-link="online" className="relative col-span-2 m-0 aspect-[16/10] overflow-hidden bg-tile lg:col-[6/13] lg:row-[1/3] lg:aspect-auto">
          <Image src="/photos/accueil-hero.jpg" alt={t("wall.aerial")} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          <Strip label={t("wall.aerial")} status={t("wall.status.online")} />
        </figure>

        {SLOTS.map((slot, i) => (
          <div key={slot} className={`relative aspect-[4/3] overflow-hidden bg-tile lg:aspect-auto ${slot}`}>
            <AnimatePresence initial={false} mode="popLayout">
              <TileView
                key={tiles[i].src}
                tile={tiles[i]}
                order={i + 1}
                delay={i * 0.06}
                label={t(`wall.tiles.${tiles[i].label}`)}
                unit={unitLabel(tiles[i].unit)}
                status={t("wall.status.online")}
                value={format.number(tiles[i].value)}
              />
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="m-0 bg-seam px-5 py-3 font-sans text-[13px] text-readout/60 sm:px-8 lg:px-12">{t("wall.caption")}</p>
    </section>
  );
}

function TileView({
  tile,
  order,
  delay,
  label,
  unit,
  status,
  value,
}: {
  tile: Tile;
  order: number;
  delay: number;
  label: string;
  unit: string;
  status: string;
  value: string;
}) {
  const [link, setLink] = useState<"negotiating" | "online">("online");
  return (
    <motion.figure
      data-tile
      data-order={order}
      data-link={link}
      className="absolute inset-0 m-0"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onAnimationStart={() => setLink("negotiating")}
      onAnimationComplete={() => setLink("online")}
    >
      <Image src={tile.src} alt={label} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
      {tile.pin && <Pin at={tile.pin} />}
      <Strip label={label} status={status} readout={{ raw: tile.value, text: value, unit }} />
    </motion.figure>
  );
}

/** A ring on the photo's subject, tied to the caption strip by a leader line. */
function Pin({ at: [x, y] }: { at: [number, number] }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90" style={{ left: `${x}%`, top: `${y}%` }} />
      <span className="absolute w-px bg-white/70" style={{ left: `${x}%`, top: `calc(${y}% + 9px)`, bottom: 34 }} />
    </span>
  );
}

function Strip({
  label,
  status,
  readout,
}: {
  label: string;
  status: string;
  readout?: { raw: number; text: string; unit: string };
}) {
  return (
    <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-seam/85 px-3 py-[7px] text-[13px] leading-tight">
      <LinkLine className="text-signal" />
      <span className="min-w-0 truncate font-sans font-semibold text-white">{label}</span>
      <span className="sr-only">{status}</span>
      {readout && (
        <span className="ml-auto whitespace-nowrap font-mono text-[12.5px] font-medium tabular-nums text-readout">
          <span data-readout={readout.raw}>{readout.text}</span> {readout.unit}
        </span>
      )}
    </figcaption>
  );
}
