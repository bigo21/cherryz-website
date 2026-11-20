// Rules of the contact form (/contact), shared by the browser and the Server
// Action. Same checks as the questionnaires (lib/forms/checks.ts).
import { checkEmail, checkLongText, checkName, checkPhone, checkShortText, clean, normalizeEmail } from "./checks";

/** Needs offered in the form; any other value is refused. */
export const BESOINS = ["Internet B2B", "WiFi Zone", "Autre"] as const;

export interface ContactFields {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  besoin: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

/** Cleaned values, as stored: texts trimmed and stripped of invisible characters, e-mail in lower case. */
export function cleanContact(input: Partial<Record<keyof ContactFields, unknown>>): ContactFields {
  return {
    full_name: clean(input.full_name),
    email: normalizeEmail(input.email),
    phone: clean(input.phone),
    company: clean(input.company),
    besoin: clean(input.besoin),
    message: clean(input.message),
  };
}

export function validateContact(f: ContactFields): ContactErrors {
  const errs: ContactErrors = {};
  const set = (k: keyof ContactFields, e: string | null) => {
    if (e) errs[k] = e;
  };
  set("full_name", checkName(f.full_name));
  set("email", checkEmail(f.email));
  set("phone", checkPhone(f.phone, false));
  set("company", checkShortText(f.company, 120, "le nom de l'entreprise", false));
  set("besoin", (BESOINS as readonly string[]).includes(f.besoin) ? null : "Choisissez votre besoin.");
  set("message", checkLongText(f.message, 2000));
  return errs;
}
