import type { CSSProperties } from "react";
import { CAMEROON_PATH, CITIES, MAP_HEIGHT, MAP_WIDTH, project } from "@/lib/site/coverage";

/**
 * Signature map, on navy: the outline of Cameroon, each covered city a dot with
 * the logo's rings, pulsing (2.4 s, shifted from one city to the next; still with
 * prefers-reduced-motion, paused off screen by WavesObserver).
 *
 * Purely decorative: the cities are listed as text next to it (CoverageSection).
 * A city whose list item is hovered gets `data-active` (CityHighlight) and glows.
 */
export default function CoverageMap({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div className={`waves ${className}`}>
      <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="block h-auto w-full" aria-hidden>
        <path d={CAMEROON_PATH} fill="none" className="stroke-line" strokeWidth="1" strokeLinejoin="round" />
        {CITIES.map((c, i) => {
          const { x, y } = project(c.lat, c.lon);
          return (
            <g key={c.name} data-city={c.name} className="group text-accent-on-dark">
              <circle cx={x} cy={y} r="14" fill="currentColor" fillOpacity="0.3" className="opacity-0 transition duration-200 group-data-active:opacity-100" />
              <circle
                cx={x}
                cy={y}
                r={compact ? 9 : 12}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="wave-ring"
                style={{ "--wave-delay": `${(i * 0.2).toFixed(1)}s` } as CSSProperties}
              />
              <circle cx={x} cy={y} r={compact ? 5 : 6.5} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
              <circle cx={x} cy={y} r={compact ? 2.5 : 3} fill="currentColor" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
