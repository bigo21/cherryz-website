"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CONTACT, QUOTE } from "@/lib/site/site";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/site/icons";

export type SheetPath = "ip" | "wifi";

// Copy lives here as data so the English dictionary can replace it later.
const COPY = {
  paths: {
    ip: { sheet: "Internet professionnel · IP dédiée", for: "Votre entreprise" },
    wifi: { sheet: "WiFi Zone · recette mensuelle", for: "Votre projet WiFi Zone" },
  },
  sheetFields: { number: "Devis n°", numberValue: "attribué à l'envoi", date: "Date", for: "Établi pour" },
  cta: "Recevoir mon devis détaillé",
  whatsapp: "Une question ? WhatsApp",
};

// Current public price ranges (XAF per Mbps per month), shown as labelled estimates.
const PRICE = { alone: [90_000, 180_000], cherryz: [45_000, 70_000] } as const;
const MBPS = [10, 20, 50, 100];

// WiFi Zone: plain arithmetic on the visitor's own assumptions.
const USERS = [
  { n: 30, q8: "20 – 50 utilisateurs" },
  { n: 75, q8: "50 – 100 utilisateurs" },
  { n: 150, q8: "Plus de 100 utilisateurs" },
];
const TICKETS = [100, 200, 500];
const DAYS = 30;

const noSubscribe = () => () => {};
const todayLabel = () =>
  new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Figures tick to their new value (skipped when reduced motion is requested). */
function useTicking(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    // Reduced motion: a zero-length tick lands on the target in one frame.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = duration ? Math.min(1, (t - t0) / duration) : 1;
      const eased = 1 - Math.pow(1 - k, 3);
      const v = start + (target - start) * eased;
      from.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

function Figure({ value, className }: { value: number; className?: string }) {
  const v = useTicking(value);
  return <span className={`tabular-nums ${className ?? ""}`}>{fmt(v)}</span>;
}

/**
 * The live quote sheet: the Cherryz world's signature object. It estimates the
 * visitor's figures for one path and hands them to the matching questionnaire.
 * `stampKey` re-presses the stamp (the home page bumps it when the path changes).
 */
export default function QuoteSheet({ path, stampKey = 0 }: { path: SheetPath; stampKey?: number }) {
  const [mbps, setMbps] = useState(20);
  const [users, setUsers] = useState(USERS[1]);
  const [ticket, setTicket] = useState(200);
  // The visitor's own date; null on the server so hydration never mismatches.
  const today = useSyncExternalStore(noSubscribe, todayLabel, () => null);

  // Carry what the visitor already told us into the WiFi questionnaire,
  // unless they already have a questionnaire in progress.
  const prefillWifi = () => {
    try {
      const key = "chz_demande_wifi_v1";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, JSON.stringify({ step: 1, answers: { q8: users.q8 }, done: false }));
      }
    } catch {
      /* private mode: the questionnaire simply starts empty */
    }
  };

  const href = path === "ip" ? QUOTE.ip : QUOTE.wifi;

  return (
    <div
      id="devis-estimation"
      aria-live="polite"
      className="sheet-perforated relative rounded-b-[14px] bg-paper px-5 pb-6 pt-8 text-navy shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:px-9 sm:pb-8 sm:pt-10"
    >
      <div className="flex items-start justify-between gap-4 border-b-2 border-navy pb-4">
        <div className="min-w-0">
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-[2px] font-sans text-[13.5px] sm:grid-cols-[auto_auto_auto_auto] sm:gap-x-4">
            <dt className="text-ink-soft">{COPY.sheetFields.number}</dt>
            <dd className="m-0 font-semibold text-navy">{COPY.sheetFields.numberValue}</dd>
            <dt className="text-ink-soft">{COPY.sheetFields.date}</dt>
            <dd className="m-0 font-semibold tabular-nums text-navy">{today ?? "\u00a0"}</dd>
            <dt className="text-ink-soft sm:col-start-1">{COPY.sheetFields.for}</dt>
            <dd className="m-0 font-semibold text-navy sm:col-span-3">{COPY.paths[path].for}</dd>
          </dl>
          <div className="mt-3 font-condensed text-[24px] font-bold leading-tight sm:text-[28px]">
            {COPY.paths[path].sheet}
          </div>
        </div>
        <Stamp key={stampKey} />
      </div>

      {path === "ip" ? (
        <IpLines mbps={mbps} setMbps={setMbps} />
      ) : (
        <WifiLines users={users} setUsers={setUsers} ticket={ticket} setTicket={setTicket} />
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={href}
          data-primary-cta
          onClick={path === "wifi" ? prefillWifi : undefined}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
        >
          {COPY.cta}
          <ArrowRightIcon aria-hidden className="text-[19px]" />
        </Link>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[15.5px] font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
        >
          <WhatsAppIcon className="text-[18px] text-[#128c4a]" />
          {COPY.whatsapp}
        </a>
      </div>
    </div>
  );
}

function Row({ label, children, strong }: { label: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-b border-rule py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <span className={`font-sans text-[15.5px] ${strong ? "font-semibold text-navy" : "text-ink-soft"}`}>{label}</span>
      <span className={`whitespace-nowrap font-sans text-[16px] sm:text-right ${strong ? "font-semibold" : ""}`}>{children}</span>
    </div>
  );
}

function Choice<T extends string | number>({
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
    <fieldset className="mt-5 border-0 p-0">
      <legend className="mb-2 p-0 font-sans text-[14.5px] font-semibold text-navy">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={String(o)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={[
                "min-w-[64px] cursor-pointer rounded-[8px] border-[1.5px] px-4 py-[9px] font-sans text-[15px] font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry",
                on ? "border-navy bg-navy text-white" : "border-rule bg-paper text-navy hover:border-navy/50",
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

function IpLines({ mbps, setMbps }: { mbps: number; setMbps: (n: number) => void }) {
  return (
    <>
      <Choice legend="Débit souhaité" options={MBPS} value={mbps} onChange={setMbps} render={(n) => `${n} Mbps`} />
      <div className="mt-4">
        <Row label="Seul, chez un opérateur, par mois">
          <span className="text-ink-soft">
            <Figure value={PRICE.alone[0] * mbps} /> – <Figure value={PRICE.alone[1] * mbps} /> XAF
          </span>
        </Row>
        <Row label="Économie estimée, par mois" strong>
          <span className="text-positive">
            <Figure value={(PRICE.alone[0] - PRICE.cherryz[1]) * mbps} /> – <Figure value={(PRICE.alone[1] - PRICE.cherryz[0]) * mbps} /> XAF
          </span>
        </Row>
      </div>
      <Total
        label="Avec Cherryz, par mois"
        value={
          <>
            <Figure value={PRICE.cherryz[0] * mbps} />
            <span className="mx-1 text-navy/40">–</span>
            <Figure value={PRICE.cherryz[1] * mbps} />
          </>
        }
        note={`Base : ${fmt(PRICE.cherryz[0])} – ${fmt(PRICE.cherryz[1])} XAF par Mbps et par mois via Cherryz, contre ${fmt(PRICE.alone[0])} – ${fmt(PRICE.alone[1])} XAF en direct. Estimation indicative : le prix exact est fixé après l'étude de votre site.`}
      />
    </>
  );
}

function WifiLines({
  users,
  setUsers,
  ticket,
  setTicket,
}: {
  users: (typeof USERS)[number];
  setUsers: (u: (typeof USERS)[number]) => void;
  ticket: number;
  setTicket: (n: number) => void;
}) {
  const daily = users.n * ticket;
  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Choice
          legend="Utilisateurs par jour"
          options={USERS.map((u) => u.n)}
          value={users.n}
          onChange={(n) => setUsers(USERS.find((u) => u.n === n) ?? USERS[1])}
          render={(n) => `≈ ${n}`}
        />
        <Choice legend="Prix du ticket journée" options={TICKETS} value={ticket} onChange={setTicket} render={(n) => `${n} XAF`} />
      </div>
      <div className="mt-4">
        <Row label="Recette par jour">
          <Figure value={daily} /> XAF
        </Row>
        <Row label="Jours d'activité">{DAYS}</Row>
      </div>
      <Total
        label="Recette brute, par mois"
        value={<Figure value={daily * DAYS} />}
        note="Simulation sur vos propres hypothèses, avant coûts de connexion et d'équipement. Cherryz les chiffre dans votre devis."
      />
    </>
  );
}

function Total({ label, value, note }: { label: string; value: React.ReactNode; note: string }) {
  return (
    <div className="mt-5 border-t-2 border-navy pt-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="font-condensed text-[18px] font-bold">{label}</span>
        <span className="font-condensed text-[clamp(30px,4vw,44px)] font-bold leading-none text-cherry">
          {value}
          <span className="ml-2 font-sans text-[16px] font-semibold text-navy">XAF</span>
        </span>
      </div>
      <p className="mt-3 max-w-[62ch] font-sans text-[13.5px] leading-[1.5] text-ink-soft">{note}</p>
    </div>
  );
}

/** Round rubber stamp. Defaults to the sheet's cherry ink with its press-in motion. */
export function Stamp({ className }: { className?: string }) {
  const ring = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className ?? "h-[78px] w-[78px] flex-none animate-stamp text-stamp opacity-90 sm:h-[96px] sm:w-[96px]"}
    >
      <defs>
        <path id={ring} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontSize="12" fontWeight="700" style={{ fontFamily: "var(--font-condensed)" }}>
        <textPath href={`#${ring}`} textLength="272" lengthAdjust="spacing">
          ESTIMATION · INDICATIVE · CHERRYZ ·
        </textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="17" fontWeight="800" style={{ fontFamily: "var(--font-condensed)" }}>
        CHZ
      </text>
    </svg>
  );
}
