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

/** Validate a set of questions; returns { questionId: errorMessage }. */
export function validateQuestions(
  questions: Question[],
  answers: Answers,
): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const q of questions) {
    if (q.required && !present(q, answers)) {
      errs[q.id] = "Ce champ est obligatoire.";
      continue;
    }
    const raw = String(answers[q.id] ?? "").trim();
    if (q.type === "email" && raw && !EMAIL_RE.test(raw)) {
      errs[q.id] = "Adresse email invalide.";
    }
    if (q.type === "tel" && raw) {
      const digits = raw.replace(/\D/g, "");
      if (digits.length < 8) errs[q.id] = "Numéro invalide (format +237…).";
    }
    if (
      q.hasOther &&
      otherSelected(q, answers) &&
      !String(answers[`${q.id}__autre`] ?? "").trim()
    ) {
      errs[q.id] = "Merci de préciser « Autre ».";
    }
  }
  return errs;
}

/** Server-side: validate every visible question across the whole schema. */
export function validateSubmission(
  type: QuoteType,
  answers: Answers,
): Record<string, string> {
  const all = getSchema(type).flatMap((step) => visibleQuestions(step, answers));
  return validateQuestions(all, answers);
}
