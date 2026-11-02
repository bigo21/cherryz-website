import { useTranslations } from "next-intl";
import { IS_PRODUCTION, type PlaceholderKind, type PlaceholderPhoto } from "@/lib/site/placeholders";
import ExternalLink from "./ExternalLink";

/**
 * Visible "à remplacer" tag on provisional content (lib/site/placeholders.ts),
 * shown in previews only. A photo's tag also carries its credit, as its free
 * licence requires. Rendering one in production throws, so the build fails
 * while a placeholder remains.
 */
export default function PlaceholderTag({
  kind,
  photo,
  className = "",
}: {
  kind: PlaceholderKind;
  photo?: PlaceholderPhoto;
  className?: string;
}) {
  const t = useTranslations("Placeholder");
  if (IS_PRODUCTION) throw new Error(`Contenu provisoire en production (${kind}${photo ? ` : ${photo.src}` : ""}) : voir docs/lot-5-contenus-provisoires.md`);
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
