import { getSchema, type Answers, type QuoteType } from "./schemas";
import { otherSelected, visibleQuestions, type GeoValue } from "./validation";

export interface SummaryItem {
  label: string;
  value: string;
}

function formatValue(
  q: { id: string; type: string; hasOther?: boolean },
  answers: Answers,
): string {
  const v = answers[q.id];

  let base: string;
  switch (q.type) {
    case "multi":
      base = Array.isArray(v) ? (v as string[]).join(", ") : "";
      break;
    case "scale":
      base = typeof v === "number" ? `${v} / 5` : "";
      break;
    case "consent":
      base = v === true ? "Oui" : "Non";
      break;
    case "geo": {
      const g = v as GeoValue | undefined;
      const parts: string[] = [];
      if (g?.ok && g.coords) parts.push(`Coordonnées : ${g.coords}`);
      const text = String(answers[`${q.id}__text`] ?? "").trim();
      if (text) parts.push(text);
      base = parts.join(" — ");
      break;
    }
    default:
      base = String(v ?? "").trim();
  }

  if (q.hasOther && otherSelected(q as never, answers)) {
    const precision = String(answers[`${q.id}__autre`] ?? "").trim();
    if (precision) base = base ? `${base} (${precision})` : precision;
  }

  return base;
}

/** Flatten the answers into labelled, human-readable Q/A pairs (visible questions only). */
export function summarizeAnswers(
  type: QuoteType,
  answers: Answers,
): SummaryItem[] {
  const items: SummaryItem[] = [];
  for (const step of getSchema(type)) {
    for (const q of visibleQuestions(step, answers)) {
      const value = formatValue(q, answers);
      if (value) items.push({ label: q.label, value });
    }
  }
  return items;
}

export const quoteTypeLabel = (type: QuoteType) =>
  type === "wifi" ? "WiFi Zone" : "IP Publique Dédiée";
