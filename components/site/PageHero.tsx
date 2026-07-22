import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Dark, centered hero with a full-bleed photo background.
 * `emphasis` applies the stronger Accueil treatment (navy badge + text shadows).
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  imageAlt,
  minHeight = 720,
  contentMaxWidth = 900,
  emphasis = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  actions: ReactNode;
  image: string;
  imageAlt: string;
  minHeight?: number;
  contentMaxWidth?: number;
  emphasis?: boolean;
}) {
  return (
    <header
      className="relative flex items-center justify-center overflow-hidden bg-navy-deep text-center"
      style={{ minHeight }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg,rgba(11,19,29,.72) 0%,rgba(11,19,29,.58) 45%,rgba(11,19,29,.8) 100%)",
        }}
      />

      <div
        className="pointer-events-none relative z-[2] mx-auto flex w-full flex-col items-center px-6 pb-[100px] pt-[150px] md:px-12"
        style={{ maxWidth: contentMaxWidth }}
      >
        <div
          className={[
            "mb-[26px] inline-flex items-center gap-[9px] rounded-full border px-[15px] py-2 animate-fade [animation-delay:0.05s]",
            emphasis
              ? "border-white/[0.28] bg-navy-deep/[0.35]"
              : "border-white/[0.22] bg-white/[0.04]",
          ].join(" ")}
        >
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-pink shadow-[0_0_10px_1px_#e11d63]" />
          <span
            className={`font-condensed text-[12.5px] font-semibold tracking-[1.6px] ${emphasis ? "text-white/95" : "text-white/90"}`}
          >
            {eyebrow}
          </span>
        </div>

        <h1
          className="m-0 font-condensed text-[clamp(46px,6.6vw,82px)] font-bold leading-[0.95] tracking-[-0.5px] text-white animate-fade [animation-delay:0.12s]"
          style={emphasis ? { textShadow: "0 4px 24px rgba(0,0,0,.5)" } : undefined}
        >
          {title}
        </h1>

        <p
          className={`mt-[26px] max-w-[620px] font-sans text-[20px] leading-[1.55] animate-fade [animation-delay:0.22s] ${emphasis ? "text-white/90" : "text-white/[0.78]"}`}
          style={emphasis ? { textShadow: "0 2px 12px rgba(0,0,0,.5)" } : undefined}
        >
          {subtitle}
        </p>

        <div className="pointer-events-auto mt-[38px] flex flex-wrap justify-center gap-[15px] animate-fade [animation-delay:0.32s]">
          {actions}
        </div>
      </div>
    </header>
  );
}

// Shared hero/CTA button styles.
export const btnPrimary =
  "inline-block rounded-full bg-cherry-alt px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white shadow-[0_18px_40px_-16px_rgba(160,4,45,.95)] transition-transform hover:-translate-y-[2px] hover:bg-[#c0093a]";
export const btnGhost =
  "inline-block rounded-full border-[1.5px] border-white/[0.28] bg-white/[0.06] px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white transition-colors hover:bg-white/[0.14]";
/** Slightly stronger contrast, used over the Accueil hero photo. */
export const btnGhostStrong =
  "inline-block rounded-full border-[1.5px] border-white/[0.32] bg-white/[0.10] px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white transition-colors hover:bg-white/[0.18]";
