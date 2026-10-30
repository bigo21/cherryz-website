"use client";

import { useState } from "react";
import { submitContactMessage } from "@/app/actions/contact";
import { Stamp } from "@/components/site/QuoteSheet";
import { ArrowRightIcon } from "@/components/site/icons";

const labelCls = "mb-[7px] block font-condensed text-[16px] font-semibold text-navy";
const fieldCls =
  "w-full rounded-[10px] border-[1.5px] border-navy/20 bg-paper px-[15px] py-[13px] font-sans text-[16px] text-navy transition-colors placeholder:text-ink-soft/80 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";
const sheetCls = "sheet-perforated rounded-b-[14px] bg-paper px-5 pb-8 pt-9 sm:px-9";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.full_name.trim() || !EMAIL_RE.test(form.email) || !form.besoin) {
      setError("Merci de renseigner votre nom, un email valide et votre besoin.");
      return;
    }
    setSubmitting(true);
    try {
      const tracking =
        typeof window !== "undefined"
          ? { referrer: document.referrer || null, page: window.location.pathname, submittedAt: new Date().toISOString() }
          : {};
      const res = await submitContactMessage({ ...form, tracking });
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
  }

  const firstName = form.full_name.trim().split(" ")[0];

  if (submitted) {
    return (
      <div className={sheetCls} role="status">
        <div className="py-8 text-center">
          <Stamp className="mx-auto mb-6 h-[104px] w-[104px] animate-stamp text-stamp" />
          <h2 className="m-0 font-condensed text-[34px] font-bold text-navy">Message envoyé.</h2>
          <p className="mx-auto mt-3 max-w-[400px] font-sans text-[16.5px] leading-[1.55] text-ink-soft">
            Merci {firstName}. Notre équipe vous recontacte sous 24h. Pour aller
            plus vite, réservez directement un créneau ci-contre.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-[10px] border-[1.5px] border-navy/25 bg-paper px-6 py-[13px] font-condensed text-[17px] font-semibold text-navy transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={sheetCls}>
      <h2 className="m-0 border-b-2 border-navy pb-4 font-condensed text-[24px] font-bold text-navy sm:text-[28px]">Écrivez-nous</h2>
      <p className="mb-[26px] mt-4 font-sans text-[15.5px] text-ink-soft">
        Les champs marqués d&apos;un * sont obligatoires.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelCls}>Nom complet *</label>
            <input id="c-name" autoComplete="name" type="text" required value={form.full_name} onChange={set("full_name")} placeholder="Votre nom" className={fieldCls} />
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>Email professionnel *</label>
            <input id="c-email" autoComplete="email" type="email" required value={form.email} onChange={set("email")} placeholder="vous@entreprise.com" className={fieldCls} />
          </div>
          <div>
            <label htmlFor="c-phone" className={labelCls}>Téléphone / WhatsApp</label>
            <input id="c-phone" autoComplete="tel" type="tel" value={form.phone} onChange={set("phone")} placeholder="+237 6 00 00 00 00" className={fieldCls} />
          </div>
          <div>
            <label htmlFor="c-company" className={labelCls}>Entreprise / organisation</label>
            <input id="c-company" autoComplete="organization" type="text" value={form.company} onChange={set("company")} placeholder="Nom de votre structure" className={fieldCls} />
          </div>
        </div>
        <div className="mt-[18px]">
          <label htmlFor="c-besoin" className={labelCls}>Votre besoin *</label>
          <select id="c-besoin" required value={form.besoin} onChange={set("besoin")} className={fieldCls}>
            <option value="">Sélectionnez…</option>
            <option value="Internet B2B">Internet B2B</option>
            <option value="WiFi Zone">WiFi Zone</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="mt-[18px]">
          <label htmlFor="c-message" className={labelCls}>Message</label>
          <textarea id="c-message" rows={4} value={form.message} onChange={set("message")} placeholder="Décrivez votre projet, votre localisation, vos besoins…" className={`${fieldCls} resize-y`} />
        </div>

        {error && (
          <p role="alert" className="mt-4 font-sans text-[14px] font-medium text-cherry">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border-none bg-cherry px-6 py-4 font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry disabled:opacity-70"
        >
          {submitting ? "Envoi en cours…" : (
            <>
              Envoyer mon message
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
