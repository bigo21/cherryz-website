"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site/site";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,border-color] duration-300"
      style={{
        background: solid ? "#101b28" : "transparent",
        boxShadow: solid ? "0 10px 30px -18px rgba(0,0,0,.7)" : "none",
        borderBottomColor: solid ? "rgba(255,255,255,.08)" : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-[18px] md:px-12">
        <Link href="/" className="flex items-center" aria-label="Cherryz, retour à l'accueil">
          <Image
            src="/brand/logo-white.png"
            alt="Cherryz"
            width={93}
            height={38}
            priority
            className="block h-[38px] w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-[34px] md:flex">
          {NAV_LINKS.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="font-condensed text-[15px] font-semibold tracking-[0.6px] transition-colors"
                style={{ color: active ? "#fff" : "rgba(255,255,255,.72)" }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-cherry-alt px-[22px] py-3 font-condensed text-[15px] font-semibold tracking-[0.6px] text-white shadow-[0_12px_28px_-14px_rgba(160,4,45,.9)] transition-transform hover:-translate-y-px hover:bg-[#c0093a]"
          >
            Demander un devis →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className="block h-[2px] w-6 bg-white transition-transform"
            style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-opacity"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-transform"
            style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-white/10 bg-navy px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-white/5 py-3 font-condensed text-[17px] font-semibold tracking-[0.6px] text-white/85"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 rounded-full bg-cherry-alt px-6 py-3 text-center font-condensed text-[16px] font-semibold tracking-[0.6px] text-white"
            >
              Demander un devis →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
