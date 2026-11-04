"use client";

import { useEffect, useRef, useState } from "react";
import { BIZLINK_INDICATIFS, BIZLINK_OTHER, schemaBizlink, type Answers } from "@/lib/quote/schemas";
import { bizlinkPhone, validateQuestions } from "@/lib/quote/validation";
import { submitQuoteRequest } from "@/app/actions/quote";
import { chipClass, collectTracking, FieldError, inputClass } from "@/components/quote/QuoteWizard";
import { CheckLineIcon, WhatsAppIcon } from "@/components/site/icons";
import { BIZLINK } from "@/lib/site/site";

const questions = schemaBizlink[0].questions;
const CATEGORY = "q7";

const autoComplete: Record<string, string> = {
  q1: "name",
  q3: "organization",
  q4: "address-level2",
  q5: "tel-national",
  q6: "email",
};

/**
 * One-step BizLink request form (/bizlink#formulaire). Same fields and look as the
 * quote questionnaire, laid out as a single grid. Visiting #devis (the "Je demande
 * un devis" button under the plans) preselects the "Autre" category.
 */
export default function BizlinkForm() {
  const [answers, setAnswers] = useState<Answers>({ pays: BIZLINK_INDICATIFS[0].pays });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash !== "#devis") return;
      setAnswers((a) => ({ ...a, [CATEGORY]: BIZLINK_OTHER }));
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  const setAns = (id: string, val: unknown) => setAnswers((prev) => ({ ...prev, [id]: val }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateQuestions(questions, answers);
    if (!errs.q5) {
      const phone = bizlinkPhone(answers);
      if ("error" in phone) errs.q5 = phone.error;
    }
    const invalid = questions.find((q) => errs[q.id]);
    if (invalid) {
      setErrors(errs);
      setShowErrors(true);
      requestAnimationFrame(() => {
        const block = document.getElementById(`q-${invalid.id}`);
        block?.scrollIntoView({ behavior: "smooth", block: "center" });
        block?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
      });
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitQuoteRequest({ type: "bizlink", answers, tracking: collectTracking() });
      if (!res.ok) throw new Error(res.error ?? "unknown");
      setSent(true);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setSubmitError(
        "Votre demande n'a pas pu être envoyée. Vos réponses sont conservées : réessayez dans un instant, ou écrivez-nous sur WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        ref={rootRef}
        role="status"
        className="scroll-mt-28 rounded-[20px] border-[1.5px] border-cherry-alt bg-white px-6 py-[34px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] animate-pop sm:px-9"
      >
        <h3 ref={thanksRef} tabIndex={-1} className="m-0 font-condensed text-[30px] font-bold leading-[1.05] outline-none">
          Merci, votre demande est bien reçue.
        </h3>
        <p className="mt-3 font-sans text-[16.5px] leading-[1.55] text-navy/75">
          Un conseiller Cherryz vous appelle très vite. Gardez votre téléphone à portée de main.
        </p>
        {answers[CATEGORY] === BIZLINK_OTHER && (
          <p className="mt-3 font-sans text-[16.5px] leading-[1.55] text-navy/75">
            L&apos;offre promo est réservée à trois catégories, mais nos forfaits BizLink
            restent négociables selon vos besoins. Un conseiller vous propose un prix adapté.
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-28">
      <form
        noValidate
        onSubmit={submit}
        className="grid grid-cols-1 gap-x-[18px] gap-y-[20px] rounded-[20px] bg-white px-5 py-[30px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] sm:grid-cols-2 sm:px-8"
      >
        {questions.map((q) => {
          const err = showErrors ? errors[q.id] : undefined;
          const errId = err ? `e-${q.id}` : undefined;
          const label = (
            <>
              {q.label}
              <span className="text-cherry" aria-hidden> *</span>
            </>
          );
          if (q.type === "single") {
            return (
              <fieldset key={q.id} id={`q-${q.id}`} aria-describedby={errId} className="m-0 min-w-0 border-0 p-0 sm:col-span-2">
                <legend className="mb-[9px] p-0 font-sans text-[15px] font-semibold text-navy-alt">{label}</legend>
                <div className="flex flex-wrap gap-[9px]">
                  {q.options?.map((opt) => (
                    <label
                      key={opt}
                      className={`${chipClass(answers[q.id] === opt)} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cherry`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => setAns(q.id, opt)}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {err && <FieldError id={errId} message={err} />}
              </fieldset>
            );
          }
          return (
            // Phone and e-mail each take a full row, the e-mail under the phone.
            <div key={q.id} id={`q-${q.id}`} className={`min-w-0 ${q.id === "q5" || q.id === "q6" ? "sm:col-span-2" : ""}`}>
              <label htmlFor={`f-${q.id}`} className="mb-[7px] block font-sans text-[15px] font-semibold text-navy-alt">
                {label}
              </label>
              {(() => {
                const input = (
                  <input
                    id={`f-${q.id}`}
                    type={q.type === "text" ? "text" : q.type}
                    inputMode={q.type === "tel" ? "tel" : undefined}
                    autoComplete={autoComplete[q.id]}
                    value={String(answers[q.id] ?? "")}
                    onChange={(e) => setAns(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={errId}
                    aria-required
                    className={inputClass}
                  />
                );
                if (q.id !== "q5") return input;
                // The phone's country: its dial code, picked just before the number.
                return (
                  <div className="flex gap-2">
                    <select
                      aria-label="Indicatif pays"
                      value={String(answers.pays ?? "")}
                      onChange={(e) => setAns("pays", e.target.value)}
                      className={`${inputClass.replace("w-full", "")} w-auto flex-none cursor-pointer`}
                    >
                      {BIZLINK_INDICATIFS.map((c) => (
                        <option key={c.pays} value={c.pays}>
                          {c.drapeau} {c.indicatif}
                        </option>
                      ))}
                    </select>
                    {input}
                  </div>
                );
              })()}
              {err && <FieldError id={errId} message={err} />}
            </div>
          );
        })}

        <p className="m-0 flex items-center gap-2 font-condensed text-[17px] font-bold tracking-[0.3px] text-cherry-alt sm:col-span-2">
          <CheckLineIcon className="flex-none" />
          L&apos;étude est gratuite.
        </p>

        {submitError && (
          <div role="alert" className="rounded-[12px] border border-cherry/25 bg-cherry/[0.05] px-4 py-3 sm:col-span-2">
            <FieldError message={submitError} />
            <a
              href={BIZLINK.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-navy-alt underline underline-offset-4"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#128c4a]" />
              Écrire sur WhatsApp
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting || undefined}
          className="cursor-pointer rounded-full bg-cherry-alt px-[30px] py-[17px] font-condensed text-[18px] font-semibold tracking-[0.6px] text-white shadow-[0_18px_40px_-16px_rgba(160,4,45,.95)] transition-transform hover:-translate-y-[2px] hover:bg-[#c0093a] disabled:opacity-70 sm:col-span-2"
        >
          {submitting ? "Envoi en cours…" : `${BIZLINK.cta} →`}
        </button>
        <p className="m-0 font-sans text-[13.5px] text-navy/60 sm:col-span-2">
          Vos informations restent confidentielles et ne servent qu&apos;à vous contacter.
        </p>
      </form>
    </div>
  );
}
