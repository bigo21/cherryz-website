import type { ReactNode } from "react";
import { getMessages, getTranslations } from "next-intl/server";
import ExternalLink from "./ExternalLink";
import { LEGAL, isMarker } from "@/lib/site/legal";
import { CONTACT } from "@/lib/site/site";

type Doc = "notice" | "privacy";
type Block = string | Record<string, string> | { head: Record<string, string>; rows: Record<string, Record<string, string>> };
type Section = Record<string, Block> & { title: string };

const link = "font-semibold text-navy underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-navy";

/** A company fact from lib/site/legal.ts; a marker shows what is still missing. */
async function Fact({ value }: { value: string }) {
  const t = await getTranslations("Legal");
  return isMarker(value) ? <mark className="rounded-sm bg-cherry-tint px-1 text-cherry">[{t(value)}]</mark> : <>{value}</>;
}

/**
 * A legal page (Legal.notice or Legal.privacy in messages): its sections are read
 * in catalog order; in each, `p…` keys are paragraphs, `list` a bulleted list and
 * `table` a table. Company facts and links are tags inside the messages.
 */
export default async function LegalPage({ doc }: { doc: Doc }) {
  const t = await getTranslations("Legal");
  const copy = (await getMessages()).Legal[doc] as { lead?: string; sections: Record<string, Section> };
  const fact = (value: string) => {
    const FactTag = () => <Fact value={value} />;
    return FactTag;
  };
  const tags = {
    strong: (chunks: ReactNode) => <strong className="font-semibold text-navy">{chunks}</strong>,
    legalForm: fact(LEGAL.legalForm),
    capital: fact(LEGAL.capital),
    rccm: fact(LEGAL.rccm),
    niu: fact(LEGAL.niu),
    address: fact(LEGAL.address),
    director: fact(LEGAL.publicationDirector),
    artLicence: fact(LEGAL.artLicence),
    artNumber: fact(LEGAL.artNumber),
    retention: fact(LEGAL.retention),
    rightsDelay: fact(LEGAL.rightsDelay),
    vercelRegion: fact(LEGAL.vercelRegion),
    supabaseRegion: fact(LEGAL.supabaseRegion),
    resendRegion: fact(LEGAL.resendRegion),
    transfers: fact(LEGAL.transfers),
    email: () => <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>,
    phone: () => <a className={`${link} whitespace-nowrap`} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>,
    vercel: (chunks: ReactNode) => <ExternalLink className={link} href="https://vercel.com">{chunks}</ExternalLink>,
  };
  // Keys are walked from the catalog itself, so they are only known as strings here.
  const richT = t.rich as unknown as (key: string, values: typeof tags) => ReactNode;
  const rich = (key: string) => richT(`${doc}.${key}`, tags);

  return (
    <>
      <header className="bg-navy pb-16 pt-36 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="m-0 font-condensed text-display font-bold tracking-tight text-balance">{rich("title")}</h1>
          <p className="mt-4 text-body text-on-dark-2">{t("updated", { date: new Date(`${LEGAL.updatedAt}T12:00:00Z`) })}</p>
          {t("en") && <p className="mt-2 text-small text-on-dark-2">{t("en")}</p>}
        </div>
      </header>
      <div className="bg-white py-16 md:py-20">
        <article className="mx-auto max-w-4xl px-6 text-body text-ink-2">
          {copy.lead && <p className="m-0 mb-10 max-w-[65ch] text-lead text-navy">{rich("lead")}</p>}
          {Object.entries(copy.sections).map(([id, section]) => (
            <section key={id} className="border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="m-0 mb-4 font-condensed text-title-sm font-bold text-navy">{section.title}</h2>
              <div className="flex flex-col gap-3">
                {Object.entries(section).map(([key, block]) => {
                  const path = `sections.${id}.${key}`;
                  if (key === "title") return null;
                  if (key === "list" && typeof block === "object") {
                    return (
                      <ul key={key} className="m-0 flex max-w-[65ch] list-disc flex-col gap-1 pl-5">
                        {Object.keys(block).map((item) => <li key={item}>{rich(`${path}.${item}`)}</li>)}
                      </ul>
                    );
                  }
                  if (key === "table" && typeof block === "object" && "rows" in block) {
                    const cols = Object.keys(block.head);
                    return (
                      <div key={key}>
                        {/* Phones: one card per row, the column names as labels. */}
                        <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:hidden">
                          {Object.keys(block.rows).map((row) => (
                            <li key={row} className="rounded-2xl border border-line p-4 text-small">
                              <p className="m-0 font-semibold text-navy">{rich(`${path}.rows.${row}.${cols[0]}`)}</p>
                              <dl className="m-0 mt-2 flex flex-col gap-2">
                                {cols.slice(1).map((c) => (
                                  <div key={c}>
                                    <dt className="font-condensed font-semibold text-navy">{rich(`${path}.head.${c}`)}</dt>
                                    <dd className="m-0">{rich(`${path}.rows.${row}.${c}`)}</dd>
                                  </div>
                                ))}
                              </dl>
                            </li>
                          ))}
                        </ul>
                        <table className="hidden w-full border-collapse text-left text-small sm:table">
                          <thead>
                            <tr>
                              {cols.map((c) => (
                                <th key={c} scope="col" className="border-b border-navy px-3 py-2 font-condensed font-semibold text-navy first:pl-0">
                                  {rich(`${path}.head.${c}`)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(block.rows).map((row) => (
                              <tr key={row} className="border-b border-line align-top">
                                {cols.map((c, i) =>
                                  i === 0 ? (
                                    <th key={c} scope="row" className="px-3 py-3 font-semibold text-navy first:pl-0">{rich(`${path}.rows.${row}.${c}`)}</th>
                                  ) : (
                                    <td key={c} className="px-3 py-3">{rich(`${path}.rows.${row}.${c}`)}</td>
                                  ),
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return <p key={key} className="m-0 max-w-[65ch]">{rich(path)}</p>;
                })}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
