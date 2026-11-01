"use client";

import { useState } from "react";
import FieldError from "@/components/site/FieldError";
import { useLocale, useTranslations } from "next-intl";
import { submitContactMessage } from "@/app/actions/contact";
import { ArrowRightIcon } from "@/components/site/icons";

const labelCls =
  "mb-2 block font-condensed text-small font-semibold uppercase tracking-wide text-navy";
const fieldCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors placeholder:text-ink-3 focus:border-cherry";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Required fields, in page order (the first invalid one gets the focus), with
// the input id and the message keys: Validation.* for email, Contact.form.errors.* otherwise.
type Required = "full_name" | "email" | "besoin";
const FIELD_IDS: Record<Required, string> = { full_name: "c-name", email: "c-email", besoin: "c-besoin" };
type ErrorKey = "name" | "need" | "email" | "emailFormat";

function check(k: Required, value: string): ErrorKey | null {
  if (k === "full_name") return value.trim() ? null : "name";
  if (k === "besoin") return value ? null : "need";
  if (!value.trim()) return "email";
  return EMAIL_RE.test(value.trim()) ? null : "emailFormat";
}

// Stored values of the "need" select (as the team reads them), with their catalog keys.
const NEEDS = [
  { key: "ip", value: "Internet B2B" },
  { key: "wifi", value: "WiFi Zone" },
  { key: "other", value: "Autre" },
] as const;

export default function ContactForm() {
  const lang = useLocale();
  const t = useTranslations("Contact.form");
  const tv = useTranslations("Validation");
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
  const [errors, setErrors] = useState<Partial<Record<Required, ErrorKey>>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    // An error shown under a field goes away as soon as the field is fixed.
    if (k in errors) setErrors((errs) => ({ ...errs, [k]: check(k as Required, value) ?? undefined }));
  };

  const message = (key: ErrorKey) => (key === "email" || key === "emailFormat" ? tv(key) : t(`errors.${key}`));
  /** Accessibility props of a required field, and its error under it. */
  const field = (k: Required) => {
    const err = errors[k];
    const errId = `${FIELD_IDS[k]}-err`;
    return {
      props: { "aria-required": true, "aria-invalid": err ? true : undefined, "aria-describedby": err ? errId : undefined },
      error: err ? <FieldError id={errId} message={message(err)} /> : null,
    };
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const found = Object.fromEntries(
      (Object.keys(FIELD_IDS) as Required[]).map((k) => [k, check(k, form[k]) ?? undefined]),
    ) as Partial<Record<Required, ErrorKey>>;
    setErrors(found);
    const first = (Object.keys(FIELD_IDS) as Required[]).find((k) => found[k]);
    if (first) {
      document.getElementById(FIELD_IDS[first])?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const tracking =
        typeof window !== "undefined"
          ? { referrer: document.referrer || null, page: window.location.pathname, submittedAt: new Date().toISOString() }
          : {};
      const res = await submitContactMessage({ ...form, tracking: { ...tracking, lang }, lang });
      if (!res.ok) throw new Error(res.error);
      setSubmitted(true);
    } catch {
      setError(t("errSend"));
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setForm({ full_name: "", email: "", phone: "", company: "", besoin: "", message: "" });
    setSubmitted(false);
    setError(null);
    setErrors({});
  }

  const firstName = form.full_name.trim().split(" ")[0];

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-10 shadow-card">
        <div className="py-10 text-center animate-pop">
          <div className="mx-auto mb-6 flex h-19 w-19 items-center justify-center rounded-full bg-cherry shadow-cherry">
            <svg aria-hidden width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="m-0 font-condensed text-title-md font-bold">{t("sentTitle")}</h3>
          <p className="mx-auto mt-3 max-w-md font-sans text-body text-ink-2">
            {t("sentBody", { name: firstName })}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-full border border-cherry/30 bg-white px-6 py-3 font-condensed text-body font-semibold tracking-wide text-cherry transition hover:bg-cherry/5 active:scale-[0.97]"
          >
            {t("again")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
      <h2 className="mb-2 font-condensed text-title-md font-bold">{t("title")}</h2>
      <p className="mb-6 font-sans text-body text-ink-2">
        {t("required")}
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelCls}>{t("name")}</label>
            <input id="c-name" autoComplete="name" type="text" {...field("full_name").props} value={form.full_name} onChange={set("full_name")} placeholder={t("namePh")} className={fieldCls} />
            {field("full_name").error}
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>{t("email")}</label>
            <input id="c-email" autoComplete="email" type="email" {...field("email").props} value={form.email} onChange={set("email")} placeholder={t("emailPh")} className={fieldCls} />
            {field("email").error}
          </div>
          <div>
            <label htmlFor="c-phone" className={labelCls}>{t("phone")}</label>
            <input id="c-phone" autoComplete="tel" type="tel" value={form.phone} onChange={set("phone")} placeholder={t("phonePh")} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="c-company" className={labelCls}>{t("company")}</label>
            <input id="c-company" autoComplete="organization" type="text" value={form.company} onChange={set("company")} placeholder={t("companyPh")} className={fieldCls} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="c-besoin" className={labelCls}>{t("need")}</label>
          <select id="c-besoin" {...field("besoin").props} value={form.besoin} onChange={set("besoin")} className={fieldCls}>
            <option value="">{t("needPh")}</option>
            {NEEDS.map(({ key, value }) => (
              <option key={key} value={value}>{t(`needs.${key}`)}</option>
            ))}
          </select>
          {field("besoin").error}
        </div>
        <div className="mt-4">
          <label htmlFor="c-message" className={labelCls}>{t("message")}</label>
          <textarea id="c-message" rows={4} value={form.message} onChange={set("message")} placeholder={t("messagePh")} className={`${fieldCls} resize-y`} />
        </div>

        {error && (
          <p role="alert" className="mt-4 font-sans text-small font-medium text-cherry">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full cursor-pointer rounded-full bg-cherry px-8 py-4 font-condensed text-lead font-semibold tracking-wide text-white shadow-cherry transition hover:bg-cherry-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t("sending") : (
            <>
              {t("send")}
              <ArrowRightIcon className="ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
