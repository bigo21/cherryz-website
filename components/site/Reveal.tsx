import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal-on-scroll wrapper: 400 ms, 12px (`.reveal` in globals.css, driven by
 * RevealObserver). The content is server-rendered visible. `delay` is in seconds.
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
