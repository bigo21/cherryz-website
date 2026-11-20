"use client";

import { useState } from "react";
import { submitContactMessage } from "@/app/actions/contact";
import { EmailSuggestion, useAntiRobot } from "@/components/forms/FormGuards";
import { FieldError } from "@/components/quote/QuoteWizard";
import { BESOINS, cleanContact, validateContact, type ContactErrors } from "@/lib/forms/contact";

const labelCls =
  "mb-[7px] block font-condensed text-[14px] font-semibold tracking-[0.6px] text-navy";
const fieldCls =
  "w-full rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[15px] py-[13px] text-[16px] text-navy-alt transition-colors placeholder:text-[#6b7280] focus:border-cherry-alt focus:outline-none focus:shadow-[0_0_0_3px_rgba(162,3,45,0.22)]";

/** Field order, to focus the first one in error. */
const ORDER = ["full_name", "email", "phone", "company", "besoin", "message"] as const;
const IDS: Record<(typeof ORDER)[number], string> = {
  full_name: "c-name", email: "c-email", phone: "c-phone", company: "c-company", besoin: "c-besoin", message: "c-message",
};

export default function ContactForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    besoin: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const guard = useAntiRobot();

  function showErrors(errs: ContactErrors) {
    setFieldErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (!first) return false;
    requestAnimationFrame(() => document.getElementById(IDS[first])?.focus());
    return true;
  }

  /** aria wiring and message of one field. */
  const errorOf = (k: (typeof ORDER)[number]) => {
    const message = fieldErrors[k];
    return {
      props: { "aria-invalid": message ? true : undefined, "aria-describedby": message ? `${IDS[k]}-err` : undefined },
      node: message ? <FieldError id={`${IDS[k]}-err`} message={message} /> : null,
    };
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (showErrors(validateContact(cleanContact(form)))) return;
    setSubmitting(true);
    try {
      const tracking =
        typeof window !== "undefined"
          ? { referrer: document.referrer || null, page: window.location.pathname, submittedAt: new Date().toISOString() }
          : {};
      const res = await submitContactMessage({ ...form, tracking, ...guard.read() });
      // The server refused a value (e.g. an e-mail domain that receives no mail).
      if (!res.ok && res.fields && showErrors(res.fields)) return;
      if (!res.ok) throw new Error(res.error);
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer ou de nous écrire à support@cherryz.tech.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setForm({ full_name: "", email: "", phone: "", company: "", besoin: "", message: "" });
    setSubmitted(false);
    setError(null);
    setFieldErrors({});
  }

  const firstName = form.full_name.trim().split(" ")[0];

  if (submitted) {
    return (
      <div className="rounded-[20px] border border-navy/[0.08] bg-white p-10 shadow-[0_30px_60px_-44px_rgba(16,27,40,.5)]">
        <div className="py-10 text-center animate-pop">
          <div className="mx-auto mb-[22px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-cherry-alt shadow-[0_18px_34px_-16px_rgba(160,4,45,.8)]">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="m-0 font-condensed text-[34px] font-bold">Message envoyé !</h3>
          <p className="mx-auto mt-3 max-w-[400px] font-sans text-[16.5px] leading-[1.55] text-navy/65">
            Merci {firstName}. Notre équipe vous recontacte sous 24h. Pour aller
            plus vite, réservez directement un créneau ci-contre.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-full border-[1.5px] border-cherry-alt/[0.35] bg-white px-6 py-[13px] font-condensed text-[15px] font-semibold tracking-[0.5px] text-cherry-alt transition-colors hover:bg-cherry-alt/[0.06]"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-navy/[0.08] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(16,27,40,.5)] sm:p-10">
      <h2 className="mb-[6px] font-condensed text-[30px] font-bold">Écrivez-nous</h2>
      <p className="mb-[26px] font-sans text-[15.5px] text-navy/60">
        Les champs marqués d&apos;un * sont obligatoires.
      </p>
      <form onSubmit={onSubmit} noValidate className="relative">
        {guard.field}
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelCls}>NOM COMPLET *</label>
            <input id="c-name" autoComplete="name" type="text" required maxLength={80} value={form.full_name} onChange={set("full_name")} placeholder="Votre nom" className={fieldCls} {...errorOf("full_name").props} />
            {errorOf("full_name").node}
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>EMAIL PROFESSIONNEL *</label>
            <input id="c-email" autoComplete="email" type="email" required maxLength={254} value={form.email} onChange={set("email")} placeholder="vous@entreprise.com" className={fieldCls} {...errorOf("email").props} />
            <EmailSuggestion value={form.email} onApply={(email) => setForm((f) => ({ ...f, email }))} />
            {errorOf("email").node}
          </div>
          <div>
            <label htmlFor="c-phone" className={labelCls}>TÉLÉPHONE / WHATSAPP</label>
            <input id="c-phone" autoComplete="tel" type="tel" inputMode="tel" maxLength={25} value={form.phone} onChange={set("phone")} placeholder="+237 6 00 00 00 00" className={fieldCls} {...errorOf("phone").props} />
            {errorOf("phone").node}
          </div>
          <div>
            <label htmlFor="c-company" className={labelCls}>ENTREPRISE / ORGANISATION</label>
            <input id="c-company" autoComplete="organization" type="text" maxLength={120} value={form.company} onChange={set("company")} placeholder="Nom de votre structure" className={fieldCls} {...errorOf("company").props} />
            {errorOf("company").node}
          </div>
        </div>
        <div className="mt-[18px]">
          <label htmlFor="c-besoin" className={labelCls}>VOTRE BESOIN *</label>
          <select id="c-besoin" required value={form.besoin} onChange={set("besoin")} className={fieldCls} {...errorOf("besoin").props}>
            <option value="">Sélectionnez…</option>
            {BESOINS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errorOf("besoin").node}
        </div>
        <div className="mt-[18px]">
          <label htmlFor="c-message" className={labelCls}>MESSAGE</label>
          <textarea id="c-message" rows={4} maxLength={2000} value={form.message} onChange={set("message")} placeholder="Décrivez votre projet, votre localisation, vos besoins…" className={`${fieldCls} resize-y`} {...errorOf("message").props} />
          {errorOf("message").node}
        </div>

        {error && (
          <p role="alert" className="mt-4 font-sans text-[14px] font-medium text-cherry-alt">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full cursor-pointer rounded-xl border-none bg-cherry-alt px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white shadow-[0_16px_34px_-16px_rgba(160,4,45,.8)] transition-colors hover:bg-[#c0093a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry-alt disabled:opacity-70"
        >
          {submitting ? "Envoi en cours…" : "Envoyer mon message →"}
        </button>
      </form>
    </div>
  );
}
