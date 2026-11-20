import type { Answers, Question, Step } from "./schemas";
import { BIZLINK_INDICATIFS, getSchema, type QuoteType } from "./schemas";
import { checkEmail, checkLongText, checkName, checkPhone, checkShortText, clean, normalizeEmail } from "@/lib/forms/checks";

export interface GeoValue {
  ok: boolean;
  coords?: string;
  denied?: boolean;
}

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
    const raw = clean(answers[q.id]);
    // Strict content checks (lib/forms/checks.ts), only on what was answered:
    // a missing required answer was handled just above.
    const contentError = (() => {
      if (!raw) return null;
      if (q.type === "email") return checkEmail(raw);
      if (q.type === "tel") return checkPhone(raw);
      if (q.type === "textarea") return checkLongText(raw);
      if (q.type === "text") {
        if (q.kind === "name") return checkName(raw);
        if (q.kind === "company") return checkShortText(raw, 120, "le nom de l'entreprise");
        if (q.kind === "city") return checkShortText(raw, 120, "la ville");
        return checkShortText(raw, 120, "une réponse");
      }
      return null;
    })();
    if (contentError) {
      errs[q.id] = contentError;
      continue;
    }
    if (q.type === "geo" && !(answers[q.id] as GeoValue | undefined)?.ok) {
      const e = checkLongText(answers[`${q.id}__text`], 300);
      if (e) {
        errs[q.id] = e;
        continue;
      }
    }
    // Multiple choices must all be offered options, like single choices below.
    if (q.type === "multi" && q.options) {
      const v = answers[q.id];
      if (v !== undefined && (!Array.isArray(v) || v.some((x) => !q.options!.includes(String(x))))) {
        errs[q.id] = requiredMessage(q);
        continue;
      }
    }
    // A single choice must be one of the offered options: the server action
    // is reachable by direct POST, so the client's chips are no guarantee.
    if (q.type === "single" && q.options && raw && !q.options.includes(raw)) {
      errs[q.id] = requiredMessage(q);
      continue;
    }
    if (q.hasOther && otherSelected(q, answers)) {
      const autre = clean(answers[`${q.id}__autre`]);
      if (!autre) errs[q.id] = "Merci de préciser « Autre ».";
      else {
        const e = checkShortText(autre, 120, "une précision");
        if (e) errs[q.id] = e;
      }
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

/**
 * Cleans every text answer (trim, invisible characters, spaces) and puts
 * e-mail answers in lower case, before validation and storage.
 */
export function cleanAnswers(type: QuoteType, answers: Answers): Answers {
  const emails = new Set(getSchema(type).flatMap((s) => s.questions).filter((q) => q.type === "email").map((q) => q.id));
  const out: Answers = {};
  for (const [k, v] of Object.entries(answers ?? {})) {
    if (typeof v === "string") out[k] = emails.has(k) ? normalizeEmail(v) : clean(v);
    else if (Array.isArray(v)) out[k] = v.map((x) => (typeof x === "string" ? clean(x) : x));
    else out[k] = v;
  }
  return out;
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
