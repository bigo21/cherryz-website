// Strict checks of what visitors type in the site's forms (quote questionnaires,
// BizLink, contact). Pure functions: the same rules run in the browser, for
// immediate messages, and in the Server Actions, which are reachable by direct
// POST and therefore never trust the browser. The database repeats the e-mail
// and length rules as CHECK constraints (cherryz schema).
//
// Each check returns an error message for the visitor, or null when the value
// is acceptable.

/** Control and invisible characters (zero-width, bidi marks…), removed from every text. */
const INVISIBLES = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤﻿]/g;

/** Trims, removes invisible characters and collapses runs of spaces (newlines kept). */
export function clean(value: unknown): string {
  return String(value ?? "")
    .replace(INVISIBLES, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}

/** A link or something that looks like one (spam in names and short fields). */
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(ru|xyz|top|info|biz|click|site|online|shop)\b)/i;
const LINKS_ALL = /(https?:\/\/|www\.)/gi;

// ---------- E-mail ----------

const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
const GMAIL = new Set(["gmail.com", "googlemail.com"]);

export const EMAIL_INVALIDE = "Adresse e-mail invalide. Vérifiez-la, par ex. nom@entreprise.cm.";

/**
 * Syntax that real mailboxes use: one @, no dot at either end of the name or
 * two in a row, a domain made of valid labels ending in a letter-only
 * extension. Gmail addresses follow Gmail's own rules (letters, digits and
 * dots, 6 to 30 characters): the spam received in November 2026 used Gmail
 * names packed with dots, which no Gmail account can have in such numbers.
 */
export function checkEmail(raw: unknown): string | null {
  const email = clean(raw).toLowerCase();
  if (!email) return "Indiquez votre adresse e-mail.";
  if (email.length > 254) return EMAIL_INVALIDE;
  const at = email.lastIndexOf("@");
  if (at < 1 || email.indexOf("@") !== at) return EMAIL_INVALIDE;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64 || !EMAIL_LOCAL.test(local)) return EMAIL_INVALIDE;
  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every((l) => DOMAIN_LABEL.test(l))) return EMAIL_INVALIDE;
  if (!/^[a-z]{2,24}$/.test(labels[labels.length - 1])) return EMAIL_INVALIDE;
  if (GMAIL.has(domain)) {
    const letters = local.replace(/\./g, "");
    const dots = local.length - letters.length;
    if (!/^[a-z0-9.]+$/.test(local) || letters.length < 6 || letters.length > 30 || dots > 3) return EMAIL_INVALIDE;
  }
  return null;
}

/** Normal form stored in the database: cleaned, lower case. */
export const normalizeEmail = (raw: unknown) => clean(raw).toLowerCase();

/** Common webmail domains, for typo suggestions. */
const COMMON_DOMAINS = [
  "gmail.com", "yahoo.com", "yahoo.fr", "hotmail.com", "hotmail.fr", "outlook.com",
  "outlook.fr", "live.com", "live.fr", "icloud.com", "aol.com", "protonmail.com", "orange.fr",
];

function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      // Swapped neighbours count as one typo (gmial → gmail).
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/**
 * "Did you mean …?" for a likely typo in a common webmail domain
 * (gmial.com, gmail.con, hotmial.fr…). Only a suggestion: the address is not
 * refused for it.
 */
export function suggestEmail(raw: unknown): string | null {
  const email = clean(raw).toLowerCase();
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const domain = email.slice(at + 1);
  if (!domain.includes(".") || COMMON_DOMAINS.includes(domain)) return null;
  let best: string | null = null;
  let bestScore = 3;
  for (const d of COMMON_DOMAINS) {
    const score = distance(domain, d);
    if (score < bestScore) {
      best = d;
      bestScore = score;
    }
  }
  return best && bestScore <= 2 ? `${email.slice(0, at)}@${best}` : null;
}

// ---------- Names and short texts ----------

/** Person's name: letters (any alphabet), spaces, apostrophes, hyphens, dots. */
export function checkName(raw: unknown, required = true): string | null {
  const v = clean(raw);
  if (!v) return required ? "Indiquez votre nom." : null;
  if (v.length < 2 || v.length > 80) return "Le nom doit compter de 2 à 80 caractères.";
  if (!/^[\p{L}\p{M}][\p{L}\p{M}' .’-]*$/u.test(v)) return "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets.";
  if ((v.match(/\p{L}/gu) ?? []).length < 2) return "Indiquez votre nom.";
  return null;
}

/** Company, city, job title, "Autre" details: some letters, no link, bounded length. */
export function checkShortText(raw: unknown, max: number, label: string, required = true): string | null {
  const v = clean(raw);
  if (!v) return required ? `Indiquez ${label}.` : null;
  if (v.length > max) return `${max} caractères au plus.`;
  if (!/\p{L}/u.test(v)) return `Indiquez ${label} en lettres.`;
  if (LINK.test(v)) return "Les liens ne sont pas acceptés dans ce champ.";
  return null;
}

/** Free messages: bounded length, at most two links. */
export function checkLongText(raw: unknown, max = 2000, required = false): string | null {
  const v = clean(raw);
  if (!v) return required ? "Ce champ est obligatoire." : null;
  if (v.length > max) return `${max} caractères au plus.`;
  if ((v.match(LINKS_ALL) ?? []).length > 2) return "Deux liens au plus dans le message.";
  return null;
}

// ---------- Phone ----------

/**
 * Cameroonian numbers have 9 digits (6… mobile, 2… fixed) after an optional
 * 237 / +237 / 00237. A number with another international prefix only needs a
 * plausible length (8 to 15 digits).
 */
export function checkPhone(raw: unknown, required = true): string | null {
  const v = clean(raw);
  if (!v) return required ? "Indiquez un numéro de téléphone." : null;
  if (!/^[+\d\s().-]+$/.test(v)) return "Numéro invalide : chiffres, espaces et + seulement.";
  const compact = v.replace(/[\s().-]/g, "");
  const digits = compact.replace(/\D/g, "");
  const foreign = /^(\+|00)/.test(compact) && !/^(\+|00)237/.test(compact);
  if (foreign) return digits.length >= 8 && digits.length <= 15 ? null : "Numéro incomplet.";
  return /^[26]\d{8}$/.test(digits.replace(/^(00)?237/, ""))
    ? null
    : "Numéro incomplet : 9 chiffres attendus, par ex. 6 77 12 34 56.";
}

// ---------- Anti-robot ----------

/** Name of the hidden field that only robots fill in (honeypot). */
export const HONEYPOT = "site_web";
/** A human needs at least this long to fill in a form (ms). */
export const MIN_FILL_MS = 3000;

/** True when the submission looks automated: honeypot filled, or sent too fast. */
export function looksLikeRobot(trap: unknown, elapsedMs: unknown): boolean {
  if (clean(trap)) return true;
  const t = Number(elapsedMs);
  return !Number.isFinite(t) || t < MIN_FILL_MS;
}
