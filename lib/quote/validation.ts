import type { Answers, Question, Step } from "./schemas";
import { BIZLINK_INDICATIFS, getSchema, type QuoteType } from "./schemas";

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

function requiredMessage(q: Question): string {
  switch (q.type) {
    case "single":
    case "scale":
      return "Choisissez une réponse.";
    case "multi":
      return "Choisissez au moins une réponse.";
    case "consent":
      return "Cochez la case pour que nous puissions vous recontacter.";
    case "email":
      return "Indiquez votre adresse email.";
    case "tel":
      return "Indiquez un numéro de téléphone.";
    case "geo":
      return "Indiquez où se trouve le site (position ou description).";
    default:
      return "Ce champ est obligatoire.";
  }
}

/** Validate a set of questions; returns { questionId: errorMessage }. */
export function validateQuestions(
  questions: Question[],
  answers: Answers,
): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const q of questions) {
    if (q.required && !present(q, answers)) {
      errs[q.id] = requiredMessage(q);
      continue;
    }
    const raw = String(answers[q.id] ?? "").trim();
    if (q.type === "email" && raw && !EMAIL_RE.test(raw)) {
      errs[q.id] = "Adresse email incomplète, par ex. nom@entreprise.cm.";
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
      if (!ok) errs[q.id] = "Numéro incomplet : 9 chiffres attendus, par ex. 6 77 12 34 56.";
    }
    // A single choice must be one of the offered options: the server action
    // is reachable by direct POST, so the client's chips are no guarantee.
    if (q.type === "single" && q.options && raw && !q.options.includes(raw)) {
      errs[q.id] = requiredMessage(q);
      continue;
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

/**
 * BizLink phone: the dial code must be one we offer, and the number typed
 * after it valid for that country. Returns the E.164 number, or an error.
 */
export function bizlinkPhone(answers: Answers): { e164: string; pays: string } | { error: string } {
  const code = BIZLINK_INDICATIFS.find((c) => c.pays === answers.pays);
  if (!code) return { error: "Choisissez l'indicatif du pays." };
  // Accept the number with or without the code typed again (237…, +237…, 00237…).
  const prefix = code.indicatif.slice(1);
  const digits = String(answers.q5 ?? "").replace(/\D/g, "").replace(new RegExp(`^(00)?${prefix}`), "");
  if (!code.national.test(digits)) {
    return { error: `Numéro du ${code.nom} attendu : 9 chiffres, par ex. 6 77 12 34 56.` };
  }
  return { e164: `${code.indicatif}${digits}`, pays: code.pays };
}

/** Server-side: validate every visible question across the whole schema. */
export function validateSubmission(
  type: QuoteType,
  answers: Answers,
): Record<string, string> {
  const all = getSchema(type).flatMap((step) => visibleQuestions(step, answers));
  const errs = validateQuestions(all, answers);
  if (type === "bizlink" && !errs.q5) {
    const phone = bizlinkPhone(answers);
    if ("error" in phone) errs.q5 = phone.error;
  }
  return errs;
}
