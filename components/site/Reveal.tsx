import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal-on-scroll wrapper. The animation is pure CSS (`.reveal` in globals.css,
 * scroll-driven), so the content is server-rendered visible and never waits for
 * JavaScript. `delay` (seconds in the original prototypes) offsets the entry range.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}) {
  return (
    <Tag
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? ({ "--reveal-delay": delay } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
