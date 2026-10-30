import type { ReactNode } from "react";

/**
 * Opening band of a page in the quote-book world: navy ink field, the page's
 * claim on the left (5/12), and its working object on the right (7/12) — usually
 * a QuoteSheet. No photo, no eyebrow.
 */
export default function InkHero({
  title,
  lead,
  actions,
  facts,
  children,
}: {
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  facts?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-[118px] text-white md:pb-24 md:pt-[150px]">
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-10">
        <div className={children ? "lg:col-span-5 lg:pt-6" : "lg:col-span-9"}>
          <h1 className="m-0 max-w-[14ch] font-condensed text-[clamp(44px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.02em] [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-6 max-w-[48ch] font-sans text-[18px] leading-[1.55] text-white/80">{lead}</p>
          {actions && <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div>}
          {facts && (
            <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-sans text-[14.5px] text-white/70">
              {facts.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-white/45" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        {children && <div className="lg:col-span-7">{children}</div>}
      </div>
    </section>
  );
}

/** Text link on the navy field (secondary action next to a sheet's primary one). */
export const inkLink =
  "inline-flex items-center gap-2 font-sans text-[16px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Primary action button of the world: cherry, 10px rectangle. */
export const btnCherry =
  "inline-flex items-center justify-center gap-2 rounded-[10px] bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";
