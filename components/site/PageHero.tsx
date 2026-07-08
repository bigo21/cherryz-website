import type { ReactNode } from "react";
import ImageSlot from "./ImageSlot";

// Dark hero with gradient overlay + diagonal red band, shared across marketing pages.
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  imageLabel,
  minHeight = 720,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  actions: ReactNode;
  imageLabel: string;
  minHeight?: number;
}) {
  return (
    <header
      className="relative flex items-center overflow-hidden bg-navy-deep"
      style={{ minHeight }}
    >
      <div className="absolute inset-0 z-0">
        <ImageSlot label={imageLabel} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(90deg,rgba(11,19,29,.95) 0%,rgba(11,19,29,.84) 42%,rgba(11,19,29,.4) 100%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1] w-[46%] opacity-[0.92]"
        style={{ background: "linear-gradient(135deg,rgba(160,4,45,.92),rgba(125,3,35,.86))", clipPath: "polygon(38% 0,100% 0,100% 100%,10% 100%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1] hidden w-[46%] border-l-2 border-white/[0.14] lg:block"
        style={{ clipPath: "polygon(30% 0,32% 0,4% 100%,2% 100%)" }}
      />

      <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1280px] px-6 pb-[100px] pt-[150px] md:px-12">
        <div className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2 animate-fade [animation-delay:0.05s]">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-pink shadow-[0_0_10px_1px_#e11d63]" />
          <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">
            {eyebrow}
          </span>
        </div>
        <h1 className="m-0 max-w-[920px] font-condensed text-[clamp(46px,6.6vw,76px)] font-bold leading-[0.96] tracking-[-0.5px] text-white animate-fade [animation-delay:0.12s]">
          {title}
        </h1>
        <p className="mt-[26px] max-w-[620px] font-sans text-[20px] leading-[1.55] text-white/[0.78] animate-fade [animation-delay:0.22s]">
          {subtitle}
        </p>
        <div className="pointer-events-auto mt-[38px] flex flex-wrap gap-[15px] animate-fade [animation-delay:0.32s]">
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
