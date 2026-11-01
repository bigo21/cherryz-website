"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives `.reveal` blocks (components/site/Reveal.tsx): 400 ms fade and 12px rise
 * the first time each one enters the viewport. Content is server-rendered visible;
 * blocks already on screen are marked shown before hiding starts, so nothing flashes.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>(".reveal:not([data-shown])")];
    const show = (el: Element) => el.setAttribute("data-shown", "");
    for (const el of blocks) if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    document.documentElement.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of blocks) if (!el.hasAttribute("data-shown")) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
