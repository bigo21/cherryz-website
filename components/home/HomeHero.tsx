"use client";

import { useState } from "react";
import QuoteSheet, { type SheetPath } from "@/components/site/QuoteSheet";
import type { home } from "@/content/home";

export type HomeHeroCopy = (typeof home)["fr"]["hero"];

export default function HomeHero({ t: COPY }: { t: HomeHeroCopy }) {
  const [path, setPath] = useState<SheetPath>("ip");
  const [stampKey, setStampKey] = useState(0);

  const choose = (p: SheetPath) => {
    if (p === path) return;
    setPath(p);
    setStampKey((k) => k + 1);
  };

  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-[118px] text-white md:pb-24 md:pt-[150px]">
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-6">
          <h1 className="m-0 max-w-[12ch] font-condensed text-[clamp(44px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.02em] [text-wrap:balance]">
            {COPY.title}
          </h1>
          <p className="mt-6 max-w-[46ch] font-sans text-[18px] leading-[1.55] text-white/80">
            {COPY.lead}
          </p>

          <fieldset className="mt-9 border-0 p-0">
            <legend className="mb-3 p-0 font-condensed text-[15px] font-semibold tracking-[0.06em] text-white/70 uppercase">
              {COPY.pathLabel}
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {(["ip", "wifi"] as const).map((p) => {
                const on = p === path;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={on}
                    aria-controls="devis-estimation"
                    onClick={() => choose(p)}
                    className={[
                      "flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border-[1.5px] px-5 py-4 text-left font-condensed text-[19px] font-semibold tracking-[0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      on
                        ? "border-white bg-white text-navy"
                        : "border-white/25 bg-transparent text-white hover:border-white/60",
                    ].join(" ")}
                  >
                    {COPY.tabs[p]}
                    <span
                      aria-hidden
                      className={[
                        "flex h-5 w-5 flex-none items-center justify-center rounded-full border-[1.5px]",
                        on ? "border-cherry bg-cherry" : "border-white/50",
                      ].join(" ")}
                    >
                      {on && <span className="h-[7px] w-[7px] rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-sans text-[14.5px] text-white/70">
            {COPY.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-white/45" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* The quote sheet */}
        <div className="lg:col-span-7">
          <QuoteSheet path={path} stampKey={stampKey} />
        </div>
      </div>
    </section>
  );
}
