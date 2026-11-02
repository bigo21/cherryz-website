import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import PlaceholderTag from "./PlaceholderTag";

const items = ["savings", "install", "wifi"] as const;

// Client testimonials, each titled by the result it got. Provisional until Cherryz has its clients' written consent.
export default async function Testimonials() {
  const t = await getTranslations("Home.testimonials");
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="m-0 font-condensed text-title-lg font-bold tracking-tight text-balance">{t("title")}</h2>
          <PlaceholderTag kind="testimonials" />
        </Reveal>
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-3" delay={0.05}>
          {items.map((k) => (
            <figure key={k} className="m-0 flex flex-col rounded-2xl border border-line bg-white p-8 shadow-card">
              <h3 className="m-0 font-condensed text-title-sm font-bold tabular-nums text-navy">{t(`${k}.result`)}</h3>
              <blockquote className="m-0 mt-4 flex-1 font-sans text-body text-ink-2">
                <p className="m-0">{t(`${k}.quote`)}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block font-condensed text-body font-bold text-navy">{t(`${k}.name`)}</span>
                <span className="block font-sans text-small text-ink-2">{t(`${k}.role`)}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
