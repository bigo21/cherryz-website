import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

/**
 * The part of the catalog client components need, to pass to
 * NextIntlClientProvider (by default it would ship the whole catalog, legal
 * pages and questionnaires included, in every page's HTML).
 * Paths are dotted: "Chrome", "Quote.wizard", "Questionnaire.ip".
 */
export async function clientMessages(...paths: string[]): Promise<AbstractIntlMessages> {
  const all = (await getMessages()) as AbstractIntlMessages;
  const out: AbstractIntlMessages = {};
  for (const path of paths) {
    const keys = path.split(".");
    let from: AbstractIntlMessages = all;
    let to: AbstractIntlMessages = out;
    keys.forEach((key, i) => {
      const value = from[key];
      if (i === keys.length - 1) to[key] = value;
      else {
        to = (to[key] ??= {}) as AbstractIntlMessages;
        from = value as AbstractIntlMessages;
      }
    });
  }
  return out;
}
