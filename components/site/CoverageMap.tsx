import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { CAMEROON_PATH, CITIES, MAP_HEIGHT, MAP_WIDTH, project } from "@/lib/site/coverage";

const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(2)}%`;

/**
 * Signature map, on navy: the outline of Cameroon, each covered city a dot with
 * the logo's rings, pulsing (2.4 s, shifted from one city to the next; still with
 * prefers-reduced-motion, paused off screen by WavesObserver).
 *
 * Full version: from md, each city is a button whose name and operators show on
 * hover and focus; below md, the same information is a list under the map.
 * `compact`: the drawing only, the page around it names the cities.
 */
export default function CoverageMap({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const t = useTranslations("Coverage");
  const cities = CITIES.map((c, i) => ({ ...c, ...project(c.lat, c.lon), delay: `${(i * 0.2).toFixed(1)}s` }));
  return (
    <div className={className}>
      <div className="waves relative mx-auto w-full max-w-sm">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="block h-auto w-full" aria-hidden>
          <path d={CAMEROON_PATH} fill="none" className="stroke-line" strokeWidth="1" strokeLinejoin="round" />
          {cities.map((c) => (
            <g key={c.name} className="text-accent-on-dark">
              <circle
                cx={c.x}
                cy={c.y}
                r={compact ? 9 : 12}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="wave-ring"
                style={{ "--wave-delay": c.delay } as CSSProperties}
              />
              <circle cx={c.x} cy={c.y} r={compact ? 5 : 6.5} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
              <circle cx={c.x} cy={c.y} r={compact ? 2.5 : 3} fill="currentColor" />
            </g>
          ))}
        </svg>

        {!compact &&
          cities.map((c) => (
            <button
              key={c.name}
              type="button"
              className="group absolute hidden size-11 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full left-(--x) top-(--y) md:flex"
              style={{ "--x": pct(c.x, MAP_WIDTH), "--y": pct(c.y, MAP_HEIGHT) } as CSSProperties}
            >
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 w-max -translate-x-1/2 translate-y-2 rounded-xl border border-white/15 bg-navy px-3 py-2 text-left opacity-0 shadow-card transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block font-condensed text-body font-bold text-white">{c.name}</span>
                <span className="sr-only">{t("operators")} </span>
                <span className="block font-sans text-small text-on-dark-2">{c.operators.join(" · ")}</span>
              </span>
            </button>
          ))}
      </div>

      {!compact && (
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:hidden">
          {cities.map((c) => (
            <li key={c.name} className="rounded-xl border border-white/10 px-4 py-3">
              <span className="block font-condensed text-body font-bold text-white">{c.name}</span>
              <span className="sr-only">{t("operators")} </span>
              <span className="block font-sans text-small text-on-dark-2">{c.operators.join(" · ")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
