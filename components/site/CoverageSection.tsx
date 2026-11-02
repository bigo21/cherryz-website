import { getTranslations } from "next-intl/server";
import { CITIES } from "@/lib/site/coverage";
import CoverageMap from "./CoverageMap";
import PlaceholderTag from "./PlaceholderTag";
import Reveal from "./Reveal";

/**
 * « Partout au Cameroun » on navy. Full map on Accueil; `compact` on Internet B2B
 * and WiFi Zone: a smaller drawing, the cities named in the text.
 */
export default async function CoverageSection({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations("Coverage");
  const names = CITIES.map((c) => c.name);
  return (
    <section className="bg-navy py-20 text-white md:py-28">
      <div className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 ${compact ? "md:grid-cols-3" : "lg:grid-cols-2"}`}>
        <Reveal className={compact ? "md:col-span-2" : ""}>
          <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance">{t("title")}</h2>
          <p className="mt-4 max-w-[65ch] font-sans text-lead text-on-dark-2">{t("lead", { count: names.length })}</p>
          {compact && (
            <p className="mt-4 max-w-[65ch] font-sans text-body text-on-dark-2">
              {t("cityList", { cities: names.join(", ") })}
            </p>
          )}
          <PlaceholderTag kind="cities" className="mt-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <CoverageMap compact={compact} className={compact ? "mx-auto max-w-56" : ""} />
        </Reveal>
      </div>
    </section>
  );
}
