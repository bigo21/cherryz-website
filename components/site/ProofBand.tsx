import { getTranslations } from "next-intl/server";
import PlaceholderTag from "./PlaceholderTag";

const items = ["price", "operators", "clients", "cities"] as const;

// Proof band under the Accueil hero: four large figures. Provisional until Cherryz confirms them.
export default async function ProofBand() {
  const t = await getTranslations("Home.proof");
  return (
    <section aria-label={t("label")} className="border-b border-line bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 lg:grid-cols-4">
          {items.map((k) => (
            <li key={k} className="flex flex-col gap-1">
              <span className="font-condensed text-title-md font-bold tabular-nums text-accent">{t(`${k}.value`)}</span>
              <span className="font-sans text-small text-ink-2">{t(`${k}.label`)}</span>
            </li>
          ))}
        </ul>
        <PlaceholderTag kind="figures" className="mt-8" />
      </div>
    </section>
  );
}
