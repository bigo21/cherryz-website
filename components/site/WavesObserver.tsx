"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pauses the logo waves (`.waves` blocks: final calls, coverage map) while they
 * are off screen, by marking them `data-offscreen` (see globals.css).
 */
export default function WavesObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
    });
    for (const el of document.querySelectorAll(".waves")) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
