import Image from "next/image";
import type { Logo } from "@/lib/site/logos";

/**
 * Infinite auto-scrolling logo strip. The set is rendered twice so the
 * translateX(-50%) loop is seamless. Logos come cropped, with their balanced
 * display size (lib/site/logos.ts); next/image loads them lazily, so they never
 * compete with the hero (LCP).
 */
export default function LogoMarquee({
  logos,
  direction = "left",
}: {
  logos: Logo[];
  direction?: "left" | "right";
}) {
  const row = (labelled: boolean) => (
    <div className="flex h-16 flex-none items-center gap-14">
      {logos.map((l) => (
        <Image
          key={`${labelled ? "a" : "b"}-${l.src}`}
          src={l.src}
          alt={labelled ? l.alt : ""}
          aria-hidden={labelled ? undefined : true}
          width={l.width}
          height={l.height}
          className="opacity-90 grayscale"
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
