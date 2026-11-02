import { getTranslations } from "next-intl/server";
import { CITIES } from "@/lib/site/coverage";
import CityHighlight from "./CityHighlight";
import CoverageMap from "./CoverageMap";
import PlaceholderTag from "./PlaceholderTag";
import Reveal from "./Reveal";

/**
 * « Partout au Cameroun » on navy. Accueil: the map with the list of cities and
 * their operators next to it (two columns, from 375 px). `compact` on Internet
 * B2B and WiFi Zone: a smaller drawing, the cities named in the text.
 */
export default async function CoverageSection({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations("Coverage");
  const names = CITIES.map((c) => c.name);

  if (compact) {
    return (
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-3 md:px-12">
          <Reveal className="md:col-span-2">
            <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance">{t("title")}</h2>
            <p className="mt-4 max-w-[65ch] font-sans text-lead text-on-dark-2">{t("lead", { count: names.length })}</p>
            <p className="mt-4 max-w-[65ch] font-sans text-body text-on-dark-2">
              {t("cityList", { cities: names.join(", ") })}
            </p>
            <PlaceholderTag kind="cities" className="mt-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <CoverageMap compact className="mx-auto max-w-56" />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-navy py-20 text-white md:py-28">
      <CityHighlight className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-12">
        <Reveal>
          <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance">{t("title")}</h2>
          <p className="mt-4 max-w-[65ch] font-sans text-lead text-on-dark-2">{t("lead", { count: names.length })}</p>
          <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0">
            {CITIES.map((c) => (
              <li key={c.name} data-city={c.name} className="group">
                <span className="block font-condensed text-body font-bold text-white transition-colors group-hover:text-accent-on-dark">{c.name}</span>
                <span className="sr-only">{t("operators")} </span>
                <span className="block font-sans text-small text-on-dark-2">{c.operators.join(" · ")}</span>
              </li>
            ))}
          </ul>
          <PlaceholderTag kind="cities" className="mt-8" />
        </Reveal>
        <Reveal delay={0.05}>
          <CoverageMap className="mx-auto w-full max-w-lg md:mx-0" />
        </Reveal>
      </CityHighlight>
    </section>
  );
}
