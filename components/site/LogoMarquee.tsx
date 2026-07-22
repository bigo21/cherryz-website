/* eslint-disable @next/next/no-img-element */
// Logos are already optimised (≤15 KB each), so plain <img> keeps the intrinsic
// aspect ratio without needing per-file dimensions.

export interface Logo {
  src: string;
  alt: string;
}

/**
 * Infinite auto-scrolling logo strip. The set is rendered twice so the
 * translateX(-50%) loop is seamless.
 */
export default function LogoMarquee({
  logos,
  direction = "left",
}: {
  logos: Logo[];
  direction?: "left" | "right";
}) {
  const row = (labelled: boolean) => (
    <div className="flex flex-none items-center gap-14">
      {logos.map((l) => (
        <img
          key={`${labelled ? "a" : "b"}-${l.src}`}
          src={l.src}
          alt={labelled ? l.alt : ""}
          aria-hidden={labelled ? undefined : true}
          className="h-[118px] w-auto object-contain opacity-90 grayscale"
        />
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-14 ${direction === "left" ? "animate-marquee-l" : "animate-marquee-r"}`}
      >
        {row(true)}
        {row(false)}
      </div>
    </div>
  );
}
