import type { ReactNode } from "react";

// Dark final CTA band with diagonal red wedge + rippling pictogram.
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
    <section className="relative overflow-hidden bg-navy-deep py-[100px]">
      <div
        className="absolute bottom-0 right-0 top-0 z-0 w-[44%] opacity-90"
        style={{ background: "linear-gradient(135deg,rgba(160,4,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(40% 0,100% 0,100% 100%,12% 100%)" }}
      />
      <div
        className="absolute -bottom-[120px] -left-[120px] z-0 h-[360px] w-[360px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(160,4,45,.28),transparent 68%)" }}
      />
      <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-10 px-6 md:px-12">
        <div className="max-w-[640px]">
          <h2 className="m-0 font-condensed text-[clamp(38px,5vw,54px)] font-bold leading-none tracking-[-0.4px] text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-[520px] font-sans text-[18.5px] leading-[1.55] text-white/[0.78]">
            {subtitle}
          </p>
          <div className="mt-[34px] flex flex-wrap gap-[15px]">{actions}</div>
        </div>
        <div className="relative hidden h-[240px] w-[240px] flex-none items-center justify-center lg:flex">
          <span className="absolute h-[120px] w-[120px] rounded-full border-2 border-white/45 animate-ripple" />
          <span className="absolute h-[120px] w-[120px] rounded-full border-2 border-white/45 animate-ripple [animation-delay:1.7s]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/pictogram.png"
            alt="Cherryz"
            className="relative w-[130px] [filter:drop-shadow(0_0_26px_rgba(255,255,255,.35))]"
          />
        </div>
      </div>
    </section>
  );
}
