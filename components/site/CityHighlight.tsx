"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Links the city list to the coverage map: hovering a list item marks the map
 * dot with the same `data-city` as `data-active`, which makes it glow.
 */
export default function CityHighlight({ children, className }: { children: ReactNode; className?: string }) {
  const mark = (e: PointerEvent<HTMLDivElement>, on: boolean) => {
    const city = (e.target as Element).closest("li[data-city]")?.getAttribute("data-city");
    if (!city) return;
    for (const g of e.currentTarget.querySelectorAll(`g[data-city="${CSS.escape(city)}"]`)) g.toggleAttribute("data-active", on);
  };
  return (
    <div className={className} onPointerOver={(e) => mark(e, true)} onPointerOut={(e) => mark(e, false)}>
      {children}
    </div>
  );
}
