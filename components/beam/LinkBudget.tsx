"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useReducedMotion } from "motion/react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon, CheckLineIcon } from "@/components/site/icons";

// Current public price ranges (XAF per Mbps per month), shown as labelled estimates.
export const PRICE = { alone: [90_000, 180_000], cherryz: [45_000, 70_000] } as const;
export const MBPS = [10, 20, 50, 100] as const;
const IP_SCALE = PRICE.alone[1] * 100;
// The beam thickens with the bandwidth (px in the diagram's own units).
export const BEAM_WIDTH: Record<(typeof MBPS)[number], number> = { 10: 3, 20: 6, 50: 11, 100: 18 };

// WiFi Zone: plain arithmetic on the visitor's own assumptions, over 30 days.
const USERS = [30, 75, 150] as const;
const TICKETS = [100, 200, 500] as const;
const DAYS = 30;
const WIFI_SCALE = USERS[2] * TICKETS[2] * DAYS;
const REACH: Record<(typeof USERS)[number], number> = { 30: 46, 75: 72, 150: 98 };

const COMPARE_ROWS = ["price", "installation", "technology", "support", "flexibility", "trial"] as const;
const spring = { type: "spring", stiffness: 140, damping: 22 } as const;

/** A figure that runs to its new value (instantly under reduced motion). */
export function Ticker({ value }: { value: number }) {
  const format = useFormatter();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const controls = animate(from.current, value, {
      duration: reduce ? 0 : 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        from.current = v;
        setShown(v);
      },
    });
    return () => controls.stop();
  }, [value, reduce]);
  return <span className="tabular-nums">{format.number(Math.round(shown))}</span>;
}

/** One range bar on a shared axis: solid to the low end, lighter to the high end. */
function RangeBar({ low, high, scale, tone }: { low: number; high: number; scale: number; tone: "muted" | "live" }) {
  return (
    <div className="relative h-[22px] bg-night/[0.07]">
      <motion.div
        className={`absolute inset-y-0 left-0 ${tone === "live" ? "bg-cherry/30" : "bg-night/20"}`}
        initial={false}
        animate={{ width: `${(high / scale) * 100}%` }}
        transition={spring}
      />
      <motion.div
        className={`absolute inset-y-0 left-0 ${tone === "live" ? "bg-cherry" : "bg-night/55"}`}
        initial={false}
        animate={{ width: `${(low / scale) * 100}%` }}
        transition={spring}
      />
    </div>
  );
}

function Segmented<T extends number>({
  legend,
  options,
  value,
  onChange,
  render,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render: (v: T) => string;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2 p-0 font-sans text-[14.5px] font-semibold text-night">{legend}</legend>
      <div className="inline-grid auto-cols-fr grid-flow-col gap-[2px] bg-night/15 p-[2px]">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={[
                "min-w-[72px] cursor-pointer px-4 py-[10px] font-sans text-[15px] font-semibold tabular-nums transition-colors",
                on ? "bg-night text-white" : "bg-white text-night hover:bg-dawn",
              ].join(" ")}
            >
              {render(o)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** The link drawn at the chosen bandwidth: operator network → beam → your site. */
function LinkDiagram({ mbps }: { mbps: (typeof MBPS)[number] }) {
  const t = useTranslations("Home.beam.budget");
  const w = BEAM_WIDTH[mbps];
  return (
    <figure className="m-0">
      <figcaption className="text-center font-sans text-[18px] font-bold tabular-nums text-night">{t("beamLabel", { mbps })}</figcaption>
      <svg viewBox="0 0 640 110" className="mt-1 block h-auto w-full" aria-hidden>
        <motion.ellipse cx={320} cy={55} rx={232} fill="none" stroke="#a2032d" strokeOpacity={0.45} strokeWidth={1.25} strokeDasharray="3 6" vectorEffect="non-scaling-stroke" initial={false} animate={{ ry: 16 + w * 1.6 }} transition={spring} />
        <motion.line x1={88} y1={55} x2={552} y2={55} stroke="#a2032d" strokeLinecap="round" initial={false} animate={{ strokeWidth: w }} transition={spring} />
        {[88, 552].map((x) => (
          <g key={x}>
            <circle cx={x} cy={55} r={15} fill="#0a111b" />
            <circle cx={x} cy={55} r={5} fill="#fff" />
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between font-sans text-[13.5px] font-semibold text-ink-soft">
        <span className="w-[28%] text-center">{t("operator")}</span>
        <span className="w-[28%] text-center">{t("site")}</span>
      </div>
    </figure>
  );
}

/** The access point's reach grows with the expected daily users. */
function CoverageDiagram({ users }: { users: (typeof USERS)[number] }) {
  const t = useTranslations("Home.beam.budget");
  const r = REACH[users];
  return (
    <figure className="m-0">
      <figcaption className="text-center font-sans text-[18px] font-bold tabular-nums text-night">{t("reach", { users })}</figcaption>
      <svg viewBox="0 0 640 200" className="mt-1 block h-auto w-full" aria-hidden>
        {[1, 0.66, 0.33].map((k) => (
          <motion.circle key={k} cx={320} cy={100} fill="#a2032d" fillOpacity={0.07} stroke="#a2032d" strokeOpacity={0.5} strokeWidth={1.25} vectorEffect="non-scaling-stroke" initial={false} animate={{ r: r * k }} transition={spring} />
        ))}
        <circle cx={320} cy={100} r={13} fill="#0a111b" />
        <circle cx={320} cy={100} r={5} fill="#fff" />
      </svg>
      <p className="m-0 mt-1 text-center font-sans text-[13.5px] font-semibold text-ink-soft">{t("ap")}</p>
    </figure>
  );
}

/**
 * Reading passage on the light ground: the visitor's bandwidth sets the beam's
 * thickness and the price bars on one shared axis; the WiFi Zone tab sizes the
 * coverage and the monthly takings. The operator-versus-Cherryz comparison sits beside.
 */
export default function LinkBudget() {
  const t = useTranslations("Home");
  const lang = useLocale();
  const [tab, setTab] = useState<"ip" | "wifi">("ip");
  const [mbps, setMbps] = useState<(typeof MBPS)[number]>(20);
  const [users, setUsers] = useState<(typeof USERS)[number]>(75);
  const [ticket, setTicket] = useState<(typeof TICKETS)[number]>(200);

  const alone = [PRICE.alone[0] * mbps, PRICE.alone[1] * mbps];
  const cherryz = [PRICE.cherryz[0] * mbps, PRICE.cherryz[1] * mbps];
  const revenue = users * ticket * DAYS;

  return (
    <section className="beam-page bg-dawn py-20 text-night md:py-28" aria-labelledby="console-title">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="console-title" className="m-0 font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em]">
            {t("console.title")}
          </h2>
          <p className="mt-5 max-w-[52ch] font-sans text-[17.5px] leading-[1.6] text-ink-soft">{t("console.lead")}</p>

          <div role="tablist" aria-label={t("hero.pathLabel")} className="mt-8 flex gap-6 border-b-2 border-night/15">
            {(["ip", "wifi"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={tab === k}
                aria-controls="console-panel"
                onClick={() => setTab(k)}
                className={[
                  "-mb-[2px] cursor-pointer border-b-[3px] pb-3 font-condensed text-[20px] font-semibold transition-colors",
                  tab === k ? "border-cherry text-night" : "border-transparent text-ink-soft hover:text-night",
                ].join(" ")}
              >
                {t(`console.tabs.${k}`)}
              </button>
            ))}
          </div>

          <div id="console-panel" role="tabpanel" aria-live="polite" className="mt-7 bg-white px-5 py-6 sm:px-8 sm:py-8">
            {tab === "ip" ? (
              <>
                <Segmented legend={t("console.speed")} options={MBPS} value={mbps} onChange={setMbps} render={(n) => `${n} Mbps`} />
                <div className="mt-6">
                  <LinkDiagram mbps={mbps} />
                </div>
                <div className="mt-4 grid gap-5">
                  <div>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 font-sans text-[15px]">
                      <span className="text-ink-soft">{t("console.alone")}</span>
                      <span className="font-semibold text-ink-soft">
                        <Ticker value={alone[0]} /> – <Ticker value={alone[1]} /> XAF
                      </span>
                    </div>
                    <RangeBar low={alone[0]} high={alone[1]} scale={IP_SCALE} tone="muted" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 font-sans text-[15px]">
                      <span className="font-semibold text-night">{t("console.cherryz")}</span>
                      <span className="font-condensed text-[clamp(24px,2.6vw,34px)] font-bold text-cherry">
                        <Ticker value={cherryz[0]} /> – <Ticker value={cherryz[1]} /> <span className="text-[0.6em] text-night">XAF</span>
                      </span>
                    </div>
                    <RangeBar low={cherryz[0]} high={cherryz[1]} scale={IP_SCALE} tone="live" />
                  </div>
                </div>
                <p className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 border-t border-night/12 pt-4 font-sans text-[15.5px] font-semibold">
                  <span>
                    {t("console.saving")}, {t("console.perMonth")}
                  </span>
                  <span className="text-positive">
                    <Ticker value={alone[0] - cherryz[1]} /> – <Ticker value={alone[1] - cherryz[0]} /> XAF
                  </span>
                </p>
                <p className="mb-0 mt-3 max-w-[64ch] font-sans text-[13.5px] leading-[1.5] text-ink-soft">
                  {t("console.note", { cherryzMin: PRICE.cherryz[0], cherryzMax: PRICE.cherryz[1], aloneMin: PRICE.alone[0], aloneMax: PRICE.alone[1] })}
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-6">
                  <Segmented legend={t("console.users")} options={USERS} value={users} onChange={setUsers} render={(n) => `≈ ${n}`} />
                  <Segmented legend={t("console.ticket")} options={TICKETS} value={ticket} onChange={setTicket} render={(n) => `${n} XAF`} />
                </div>
                <div className="mt-6">
                  <CoverageDiagram users={users} />
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 font-sans text-[15px]">
                    <span className="font-semibold text-night">
                      {t("console.revenue")}, {t("console.perMonth")}
                    </span>
                    <span className="font-condensed text-[clamp(24px,2.6vw,34px)] font-bold text-cherry">
                      <Ticker value={revenue} /> <span className="text-[0.6em] text-night">XAF</span>
                    </span>
                  </div>
                  <RangeBar low={revenue} high={revenue} scale={WIFI_SCALE} tone="live" />
                </div>
                <p className="mb-0 mt-5 max-w-[64ch] font-sans text-[13.5px] leading-[1.5] text-ink-soft">{t("console.wifiNote")}</p>
              </>
            )}
            <Link
              href={localize(lang, tab === "ip" ? QUOTE.ip : QUOTE.wifi)}
              className="mt-7 inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
            >
              {t(tab === "ip" ? "console.ctaIp" : "console.ctaWifi")}
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-3">
          <h3 className="m-0 border-b-2 border-night pb-3 font-condensed text-[26px] font-bold">{t("console.compareTitle")}</h3>
          <dl className="m-0">
            {COMPARE_ROWS.map((row) => (
              <div key={row} className="border-b border-night/12 py-4">
                <dt className="font-sans text-[15px] font-semibold text-night">{t(`compare.rows.${row}.label`)}</dt>
                <dd className="m-0 mt-2 grid grid-cols-[92px_1fr] gap-x-3 gap-y-1 font-sans text-[15px]">
                  <span className="font-condensed font-semibold text-ink-soft">{t("compare.aloneShort")}</span>
                  <span className="text-ink-soft">{t(`compare.rows.${row}.alone`)}</span>
                  <span className="font-condensed font-bold text-cherry">Cherryz</span>
                  <span className="flex items-center gap-[6px] font-semibold text-night">
                    {row === "trial" && <CheckLineIcon aria-hidden className="flex-none text-positive" />}
                    {t(`compare.rows.${row}.cherry`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mb-0 mt-4 font-sans text-[13.5px] text-ink-soft">{t("compare.footnote")}</p>
        </div>
      </div>
    </section>
  );
}
