import { useTranslations } from "next-intl";
import type { PlaceholderPhoto } from "@/lib/site/placeholders";
import ExternalLink from "./ExternalLink";

/**
 * Visible "à remplacer" tag on provisional content (lib/site/placeholders.ts).
 * A photo's tag also carries its credit, as its free licence requires.
 */
export default function PlaceholderTag({
  kind,
  photo,
  className = "",
}: {
  kind: "photo" | "figures" | "cities" | "testimonials";
  photo?: PlaceholderPhoto;
  className?: string;
}) {
  const t = useTranslations("Placeholder");
  return (
    <p
      data-placeholder={kind}
      className={`m-0 inline-flex flex-wrap items-center gap-x-2 rounded-full border border-white/20 bg-navy px-3 py-1 font-sans text-caption tracking-normal text-white ${className}`}
    >
      <span className="font-semibold">{t(kind)}</span>
      {photo && (
        <ExternalLink href={photo.source} className="text-on-dark-2 underline underline-offset-2 transition-colors hover:text-white">
          {photo.author}, {photo.license}
        </ExternalLink>
      )}
    </p>
  );
}
