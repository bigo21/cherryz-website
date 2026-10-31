"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitContactMessage } from "@/app/actions/contact";

const labelCls =
  "mb-[7px] block font-condensed text-[14px] font-semibold uppercase tracking-[0.6px] text-navy";
const fieldCls =
  "w-full rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[15px] py-[13px] text-[16px] text-navy-alt transition-colors placeholder:text-[#6b7280] focus:border-cherry-alt focus:outline-none focus:shadow-[0_0_0_3px_rgba(162,3,45,0.22)]";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Stored values of the "need" select (as the team reads them), with their catalog keys.
const NEEDS = [
  { key: "ip", value: "Internet B2B" },
  { key: "wifi", value: "WiFi Zone" },
  { key: "other", value: "Autre" },
] as const;

export default function ContactForm() {
  const lang = useLocale();
  const t = useTranslations("Contact.form");
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
      setError(t("errMissing"));
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
          <h3 className="m-0 font-condensed text-[34px] font-bold">{t("sentTitle")}</h3>
          <p className="mx-auto mt-3 max-w-[400px] font-sans text-[16.5px] leading-[1.55] text-navy/65">
            {t("sentBody", { name: firstName })}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-full border-[1.5px] border-cherry-alt/[0.35] bg-white px-6 py-[13px] font-condensed text-[15px] font-semibold tracking-[0.5px] text-cherry-alt transition-colors hover:bg-cherry-alt/[0.06]"
          >
            {t("again")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-navy/[0.08] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(16,27,40,.5)] sm:p-10">
      <h2 className="mb-[6px] font-condensed text-[30px] font-bold">{t("title")}</h2>
      <p className="mb-[26px] font-sans text-[15.5px] text-navy/60">
        {t("required")}
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelCls}>{t("name")}</label>
            <input id="c-name" autoComplete="name" type="text" required value={form.full_name} onChange={set("full_name")} placeholder={t("namePh")} className={fieldCls} />
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>{t("email")}</label>
            <input id="c-email" autoComplete="email" type="email" required value={form.email} onChange={set("email")} placeholder={t("emailPh")} className={fieldCls} />
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
        <div className="mt-[18px]">
          <label htmlFor="c-besoin" className={labelCls}>{t("need")}</label>
          <select id="c-besoin" required value={form.besoin} onChange={set("besoin")} className={fieldCls}>
            <option value="">{t("needPh")}</option>
            {NEEDS.map(({ key, value }) => (
              <option key={key} value={value}>{t(`needs.${key}`)}</option>
            ))}
          </select>
        </div>
        <div className="mt-[18px]">
          <label htmlFor="c-message" className={labelCls}>{t("message")}</label>
          <textarea id="c-message" rows={4} value={form.message} onChange={set("message")} placeholder={t("messagePh")} className={`${fieldCls} resize-y`} />
        </div>

        {error && (
          <p role="alert" className="mt-4 font-sans text-[14px] font-medium text-cherry-alt">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full cursor-pointer rounded-xl border-none bg-cherry-alt px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white shadow-[0_16px_34px_-16px_rgba(160,4,45,.8)] transition-colors hover:bg-[#c0093a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry-alt disabled:opacity-70"
        >
          {submitting ? t("sending") : `${t("send")} →`}
        </button>
      </form>
    </div>
  );
}
