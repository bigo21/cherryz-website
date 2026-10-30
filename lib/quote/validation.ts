import type { Answers, Question, Step } from "./schemas";
import { getSchema, type QuoteType } from "./schemas";

export interface GeoValue {
  ok: boolean;
  coords?: string;
  denied?: boolean;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function visibleQuestions(step: Step, answers: Answers): Question[] {
  return step.questions.filter((q) => !q.cond || q.cond(answers));
}

export function otherSelected(q: Question, answers: Answers): boolean {
  const v = answers[q.id];
  if (q.type === "multi") return Array.isArray(v) && v.indexOf("Autre") >= 0;
  return v === "Autre";
}

/** Whether a question has a usable answer. */
export function present(q: Question, answers: Answers): boolean {
  const v = answers[q.id];
  if (q.type === "multi") return Array.isArray(v) && v.length > 0;
  if (q.type === "consent") return v === true;
  if (q.type === "geo") {
    const g = v as GeoValue | undefined;
    return Boolean(g?.ok) || String(answers[`${q.id}__text`] ?? "").trim() !== "";
  }
  return String(v ?? "").trim() !== "";
}

/** Why an answer is rejected; the text lives in the catalogs, under `Validation`. */
export type ValidationError =
  | "single"
  | "multi"
  | "consent"
  | "email"
  | "tel"
  | "geo"
  | "other"
  | "emailFormat"
  | "telFormat"
  | "otherText";

function requiredError(q: Question): ValidationError {
  switch (q.type) {
    case "single":
    case "scale":
      return "single";
    case "multi":
    case "consent":
    case "email":
    case "tel":
    case "geo":
      return q.type;
    default:
      return "other";
  }
}

/** Validate a set of questions; returns { questionId: error }. */
export function validateQuestions(
  questions: Question[],
  answers: Answers,
): Record<string, ValidationError> {
  const errs: Record<string, ValidationError> = {};
  for (const q of questions) {
    if (q.required && !present(q, answers)) {
      errs[q.id] = requiredError(q);
      continue;
    }
    const raw = String(answers[q.id] ?? "").trim();
    if (q.type === "email" && raw && !EMAIL_RE.test(raw)) {
      errs[q.id] = "emailFormat";
    }
    if (q.type === "tel" && raw) {
      const digits = raw.replace(/\D/g, "");
      // Cameroonian numbers have 9 digits, after an optional 237 / +237 / 00237 prefix.
      // A number written with another international prefix (+33…, 0033…) only
      // needs a plausible length.
      const compact = raw.replace(/[\s.-]/g, "");
      const foreign = /^(\+|00)/.test(compact) && !/^(\+|00)237/.test(compact);
      const ok = foreign
        ? digits.length >= 8 && digits.length <= 15
        : digits.replace(/^(00)?237/, "").length === 9;
      if (!ok) errs[q.id] = "telFormat";
    }
    if (
      q.hasOther &&
      otherSelected(q, answers) &&
      !String(answers[`${q.id}__autre`] ?? "").trim()
    ) {
      errs[q.id] = "otherText";
    }
  }
  return errs;
}

/** Server-side: validate every visible question across the whole schema. */
export function validateSubmission(
  type: QuoteType,
  answers: Answers,
): Record<string, ValidationError> {
  const all = getSchema(type).flatMap((step) => visibleQuestions(step, answers));
  return validateQuestions(all, answers);
}
