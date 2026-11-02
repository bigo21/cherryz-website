import type { ReactNode } from "react";
import Image from "next/image";
import type { PlaceholderPhoto } from "@/lib/site/placeholders";
import PlaceholderTag from "./PlaceholderTag";

/**
 * Dark hero with a full-bleed field photo: text on the left half, the photo
 * visible on the right half (left-to-right navy veil). The photo is the LCP
 * element, so it loads first; the h1 and the paragraph render without
 * animation. `emphasis` (Accueil) sets the paragraph in white.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  photo,
  imageAlt,
  emphasis = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  actions: ReactNode;
  photo: PlaceholderPhoto;
  imageAlt: string;
  emphasis?: boolean;
}) {
  return (
    <header className="relative flex min-h-180 items-center overflow-hidden bg-navy">
      <Image
        src={photo.src}
        alt={imageAlt}
        fill
        preload
        fetchPriority="high"
        quality={50}
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="pointer-events-none absolute inset-0 z-1 scrim-hero-side" />

      <div className="relative z-2 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 md:px-12">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="mb-6 font-condensed text-caption font-semibold uppercase text-on-dark-2">{eyebrow}</p>

          <h1 className="m-0 font-condensed text-display font-bold tracking-tight text-balance text-white">{title}</h1>

          <p className={`mt-6 max-w-[65ch] font-sans text-lead ${emphasis ? "text-white" : "text-on-dark-2"}`}>{subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade">
            {actions}
          </div>
        </div>
      </div>

      <PlaceholderTag kind="photo" photo={photo} className="absolute inset-x-4 bottom-4 z-2 ml-auto w-fit" />
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
