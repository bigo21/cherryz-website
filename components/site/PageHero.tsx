import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Dark, centered hero with a full-bleed photo background. The h1 and the
 * paragraph render without animation (LCP). `emphasis` (Accueil) sets the
 * paragraph in white for more contrast over the photo.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  imageAlt,
  emphasis = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  actions: ReactNode;
  image: string;
  imageAlt: string;
  emphasis?: boolean;
}) {
  return (
    <header
      className="relative flex min-h-180 items-center justify-center overflow-hidden bg-navy text-center"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        quality={50}
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 z-1 scrim-hero" />

      <div
        className="pointer-events-none relative z-2 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-24 pt-36 md:px-12"
      >
        <p className="mb-6 font-condensed text-caption font-semibold uppercase text-on-dark-2">{eyebrow}</p>

        <h1 className="m-0 font-condensed text-display font-bold tracking-tight text-balance text-white">{title}</h1>

        <p className={`mt-6 max-w-[65ch] font-sans text-lead ${emphasis ? "text-white" : "text-on-dark-2"}`}>{subtitle}</p>

        <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4 animate-fade">
          {actions}
        </div>
      </div>
    </header>
  );
}

// Shared hero/CTA button styles: hover and press in 150 ms (default transition).
export const btnPrimary =
  "inline-block rounded-full bg-cherry px-8 py-4 font-condensed text-lead font-semibold tracking-wide text-white shadow-cherry transition hover:bg-cherry-dark active:scale-[0.97] active:bg-cherry-dark";
export const btnGhost =
  "inline-block rounded-full border border-white/30 bg-white/5 px-8 py-4 font-condensed text-lead font-semibold tracking-wide text-white transition hover:bg-white/15 active:scale-[0.97]";
/** Slightly stronger contrast, used over the Accueil hero photo. */
export const btnGhostStrong =
  "inline-block rounded-full border border-white/30 bg-white/10 px-8 py-4 font-condensed text-lead font-semibold tracking-wide text-white transition hover:bg-white/20 active:scale-[0.97]";
