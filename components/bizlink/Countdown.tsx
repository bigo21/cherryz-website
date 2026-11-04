"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// Cameroon time (UTC+1, no daylight saving): the deadline is the same for every visitor.
const DOUALA_OFFSET = 3600 * 1000;

/** Seconds left until Sunday 23:59:59, Cameroon time, of the current week. */
function secondsLeft(now: Date): number {
  const local = new Date(now.getTime() + DOUALA_OFFSET);
  const add = (7 - local.getUTCDay()) % 7;
  const end =
    Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() + add, 23, 59, 59) -
    DOUALA_OFFSET;
  return Math.max(0, Math.floor((end - now.getTime()) / 1000));
}

/**
 * "L'offre se termine dans" countdown of the BizLink launch offer. The page is
 * static, so it stays hidden (space kept) until mounted rather than showing "--".
 * `tone`: "dark" over the navy hero, "cherry" over the cherry offer band.
 */
export default function Countdown({ tone = "dark" }: { tone?: "dark" | "cherry" }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(secondsLeft(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units =
    left === null
      ? ["--", "--", "--", "--"]
      : [
          pad(Math.floor(left / 86400)),
          pad(Math.floor((left % 86400) / 3600)),
          pad(Math.floor((left % 3600) / 60)),
          pad(left % 60),
        ];
  const labels = ["jours", "heures", "min", "sec"];

  return (
    <div className={left === null ? "invisible" : undefined}>
      <p
        className={`m-0 font-condensed text-[16px] font-semibold tracking-[0.5px] ${tone === "cherry" ? "text-white/90" : "text-white"}`}
      >
        L&apos;offre se termine dans
      </p>
      <div
        role="timer"
        aria-label="Compte à rebours de l'offre"
        className={`mt-[10px] flex flex-wrap gap-[10px] ${tone === "dark" ? "justify-center" : ""}`}
      >
        {units.map((v, i) => (
          <div
            key={labels[i]}
            className={`min-w-[72px] rounded-[12px] border px-3 py-[10px] text-center sm:min-w-[84px] ${tone === "cherry" ? "border-white/20 bg-navy-deep/30" : "border-white/[0.14] bg-navy/85"}`}
          >
            <b className="block font-condensed text-[30px] font-bold leading-[1.1] tabular-nums text-white sm:text-[36px]">
              {v}
            </b>
            <span className="font-condensed text-[12px] font-semibold tracking-[1px] text-white/70 uppercase">
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
