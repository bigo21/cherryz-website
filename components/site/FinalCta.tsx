import type { ReactNode } from "react";
import Image from "next/image";

// Dark final CTA band with diagonal red wedge + rippling pictogram. The pictogram
// sits on the cherry wedge, so it uses the white monochrome version of the charte.
export default function FinalCta({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div className="absolute right-0 top-0 z-0 size-16 md:bottom-0 md:h-auto md:w-2/5 diagonal-cherry" />
      <div className="absolute -bottom-30 -left-30 z-0 h-90 w-90 rounded-full opacity-70 glow-cherry" />
      <div className="relative z-1 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-10 px-6 md:px-12">
        <div className="max-w-2xl">
          <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-[65ch] font-sans text-lead text-on-dark-2">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
        </div>
        <div className="relative hidden h-60 w-60 flex-none items-center justify-center lg:flex">
          <span className="absolute h-30 w-30 rounded-full border-2 border-white/45 animate-ripple" />
          <span className="absolute h-30 w-30 rounded-full border-2 border-white/45 animate-ripple-late" />
          {/* Lazy-loaded: the block is hidden below lg, so mobile never fetches it. */}
          <Image
            src="/brand/cherryz-pictogramme-blanc.svg"
            alt=""
            width={80}
            height={104}
            unoptimized
            className="relative h-auto w-20"
          />
        </div>
      </div>
    </section>
  );
}
