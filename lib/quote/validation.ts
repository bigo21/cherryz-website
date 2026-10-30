import type { Answers, Question, Step } from "./schemas";
import { getSchema, type QuoteType } from "./schemas";
import type { Locale } from "@/lib/i18n/config";

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

const MESSAGES = {
  fr: {
    single: "Choisissez une réponse.",
    multi: "Choisissez au moins une réponse.",
    consent: "Cochez la case pour que nous puissions vous recontacter.",
    email: "Indiquez votre adresse email.",
    tel: "Indiquez un numéro de téléphone.",
    geo: "Indiquez où se trouve le site (position ou description).",
    other: "Ce champ est obligatoire.",
    emailFormat: "Adresse email incomplète, par ex. nom@entreprise.cm.",
    telFormat: "Numéro incomplet : 9 chiffres attendus, par ex. 6 77 12 34 56.",
    otherText: "Merci de préciser « Autre ».",
  },
  en: {
    single: "Choose an answer.",
    multi: "Choose at least one answer.",
    consent: "Tick the box so that we can get back to you.",
    email: "Enter your email address.",
    tel: "Enter a phone number.",
    geo: "Tell us where the site is (location or description).",
    other: "This field is required.",
    emailFormat: "Incomplete email address, e.g. name@company.cm.",
    telFormat: "Incomplete number: 9 digits expected, e.g. 6 77 12 34 56.",
    otherText: "Please specify \"Other\".",
  },
} satisfies Record<Locale, Record<string, string>>;

function requiredMessage(q: Question, m: (typeof MESSAGES)[Locale]): string {
  switch (q.type) {
    case "single":
    case "scale":
      return m.single;
    case "multi":
      return m.multi;
    case "consent":
      return m.consent;
    case "email":
      return m.email;
    case "tel":
      return m.tel;
    case "geo":
      return m.geo;
    default:
      return m.other;
  }
}

/** Validate a set of questions; returns { questionId: errorMessage }. */
export function validateQuestions(
  questions: Question[],
  answers: Answers,
  lang: Locale = "fr",
): Record<string, string> {
  const m = MESSAGES[lang];
  const errs: Record<string, string> = {};
  for (const q of questions) {
    if (q.required && !present(q, answers)) {
      errs[q.id] = requiredMessage(q, m);
      continue;
    }
    const raw = String(answers[q.id] ?? "").trim();
    if (q.type === "email" && raw && !EMAIL_RE.test(raw)) {
      errs[q.id] = m.emailFormat;
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
      if (!ok) errs[q.id] = m.telFormat;
    }
    if (
      q.hasOther &&
      otherSelected(q, answers) &&
      !String(answers[`${q.id}__autre`] ?? "").trim()
    ) {
      errs[q.id] = m.otherText;
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
