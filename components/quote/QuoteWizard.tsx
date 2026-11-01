"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSchema, type Answers, type QuoteType } from "@/lib/quote/schemas";
import {
  otherSelected,
  validateQuestions,
  visibleQuestions,
  type GeoValue,
  type ValidationError,
} from "@/lib/quote/validation";
import { submitQuoteRequest } from "@/app/actions/quote";
import { LockIcon, WhatsAppIcon } from "@/components/site/icons";
import { CONTACT } from "@/lib/site/site";
import FieldError from "@/components/site/FieldError";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { localize } from "@/lib/i18n/config";

/**
 * What the visitor reads for one questionnaire (messages: `Questionnaire.<type>`).
 * Steps and option labels are keyed by their position in the schema.
 */
interface QuestionnaireCopy {
  steps: Record<string, { title: string; subtitle: string }>;
  questions: Record<string, { label: string; placeholder?: string; options?: Record<string, string> }>;
}

interface SavedState {
  step: number;
  answers: Answers;
  done: boolean;
}

const inputClass =
  "w-full rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[15px] py-[14px] text-[16px] text-navy transition-colors placeholder:text-[#6b7280] focus:border-cherry focus:outline-none focus:shadow-[0_0_0_3px_rgba(162,3,45,0.22)] aria-[invalid=true]:border-cherry";

function chipClass(selected: boolean): string {
  return [
    "cursor-pointer font-sans text-[15px] px-[17px] py-[11px] rounded-full transition-all duration-150 border-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry",
    selected
      ? "border-cherry bg-cherry/[0.07] text-cherry font-semibold"
      : "border-[rgba(16,27,43,0.18)] bg-white text-[#374151] font-medium",
  ].join(" ");
}

function scaleChipClass(selected: boolean): string {
  return [
    "cursor-pointer w-[46px] h-[46px] rounded-[12px] font-condensed font-bold text-[18px] transition-all duration-150 border-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry",
    selected
      ? "border-cherry bg-cherry text-white"
      : "border-[rgba(16,27,43,0.18)] bg-white text-[#374151]",
  ].join(" ");
}

const storageKey = (type: QuoteType) =>
  type === "ip" ? "chz_demande_ip_v1" : "chz_demande_wifi_v1";

function loadSaved(type: QuoteType): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey(type));
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<SavedState>;
    return { step: d.step ?? 1, answers: d.answers ?? {}, done: Boolean(d.done) };
  } catch {
    return null;
  }
}

function collectTracking() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(k);
    if (v) utm[k] = v;
  }
  return {
    utm,
    referrer: document.referrer || null,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    submittedAt: new Date().toISOString(),
  };
}

export default function QuoteWizard({ type }: { type: QuoteType }) {
  const router = useRouter();
  const lang = useLocale();
  const t = useTranslations("Quote.wizard");
  const tv = useTranslations("Validation");
  // Answers are stored as the schema's (French) values; the catalog only changes what is shown.
  const copy: QuestionnaireCopy = useMessages().Questionnaire[type];
  const schema = getSchema(type);
  const total = schema.length;

  const [step, setStep] = useState(() => loadSaved(type)?.step ?? 1);
  const [answers, setAnswers] = useState<Answers>(() => loadSaved(type)?.answers ?? {});
  const [done, setDone] = useState(() => loadSaved(type)?.done ?? false);
  const [errors, setErrors] = useState<Record<string, ValidationError>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const hydrated = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Persist progress to sessionStorage (skip the very first render).
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      sessionStorage.setItem(storageKey(type), JSON.stringify({ step, answers, done }));
    } catch {
      /* private mode, ignore */
    }
  }, [type, step, answers, done]);

  // After a step change (not on first load), move focus to the new step's heading
  // so keyboard and screen-reader users start at the top of the new questions.
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const currentStep = schema[step - 1];
  const visible = visibleQuestions(currentStep, answers);

  const setAns = (id: string, val: unknown) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  function toggleMulti(id: string, val: string) {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      const i = cur.indexOf(val);
      if (i >= 0) cur.splice(i, 1);
      else cur.push(val);
      return { ...prev, [id]: cur };
    });
  }

  function detectGeo(id: string) {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocating(false);
          setAns(id, {
            ok: true,
            coords: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
          } satisfies GeoValue);
        },
        () => {
          setLocating(false);
          setAns(id, { ok: false, denied: true } satisfies GeoValue);
        },
        { timeout: 15000 },
      );
    } else {
      setAns(id, { ok: false, denied: true } satisfies GeoValue);
    }
  }

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitQuoteRequest({ type, answers, tracking: { ...collectTracking(), lang }, lang });
      if (!res.ok) throw new Error(res.error ?? "unknown");
      moved.current = true;
      setDone(true);
      scrollTop();
    } catch {
      setSubmitError(t("sendError"));
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    const errs = validateQuestions(visible, answers);
    const invalid = visible.find((q) => errs[q.id]);
    if (invalid) {
      setErrors(errs);
      setShowErrors(true);
      // Bring the first problem into view and put the keyboard on it.
      requestAnimationFrame(() => {
        const block = document.getElementById(`q-${invalid.id}`);
        block?.scrollIntoView({ behavior: "smooth", block: "center" });
        block?.querySelector<HTMLElement>("input, textarea, button")?.focus({ preventScroll: true });
      });
      return;
    }
    if (step >= total) {
      void submit();
      return;
    }
    moved.current = true;
    setStep((s) => s + 1);
    setErrors({});
    setShowErrors(false);
    scrollTop();
  }

  function prev() {
    if (step <= 1) {
      router.push(localize(lang, "/demandes"));
      return;
    }
    moved.current = true;
    setStep((s) => s - 1);
    setErrors({});
    setShowErrors(false);
    scrollTop();
  }

  function restart() {
    moved.current = true;
    setAnswers({});
    setStep(1);
    setDone(false);
    setErrors({});
    setShowErrors(false);
    setSubmitError(null);
    scrollTop();
  }

  // Share of the questionnaire already completed (0% on step 1, not 1/total).
  const progressPct = total ? Math.round(((step - 1) / total) * 100) : 0;
  const errorCount = showErrors ? Object.keys(errors).length : 0;
  const prospectName = String(answers.q16 ?? "").trim().split(" ")[0] || "";

  if (done) {
    return (
      <div className="rounded-[20px] bg-white px-6 py-[52px] text-center shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] animate-pop sm:px-10">
        <div className="mx-auto mb-6 flex h-[82px] w-[82px] items-center justify-center rounded-full bg-cherry shadow-[0_18px_36px_-16px_rgba(162,3,45,0.85)]">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-condensed text-[36px] font-bold leading-[1.02] outline-none"
        >
          {prospectName ? t("thanks", { name: prospectName }) : t("thanksAnonymous")}
        </h2>
        <p className="mx-auto mt-[14px] max-w-[440px] font-sans text-[17px] leading-[1.55] text-[#4b5563]">
          {t("received")}
        </p>
        <ol className="mx-auto mt-7 max-w-[400px] space-y-3 text-left font-sans text-[15.5px] leading-[1.45] text-navy">
          {(["review", "callback", "visit"] as const).map((line, i) => (
            <li key={line} className="flex gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cherry/[0.09] font-condensed text-[14px] font-bold text-cherry">
                {i + 1}
              </span>
              {t(`after.${line}`)}
            </li>
          ))}
        </ol>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] rounded-full bg-cherry px-[26px] py-[14px] font-condensed text-[16px] font-bold tracking-[0.5px] text-white transition-colors hover:bg-cherry-dark"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
          <Link
            href={localize(lang, "/")}
            className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-cherry/[0.35] bg-white px-[26px] py-[14px] font-condensed text-[16px] font-bold tracking-[0.5px] text-cherry transition-colors hover:bg-cherry/[0.06]"
          >
            {t("home")}
          </Link>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-6 cursor-pointer font-sans text-[15px] font-semibold text-cherry underline underline-offset-4"
        >
          {t("restart")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[20px] bg-white px-5 pb-[30px] pt-[34px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] animate-fade sm:px-9">
        {/* Progress */}
        <div className="mb-[26px]">
          <div className="mb-[9px] flex items-baseline justify-between gap-3">
            <span className="whitespace-nowrap font-condensed text-[14px] font-bold tracking-[1px] text-cherry uppercase">
              {t("stepOf", { step, total })}
            </span>
            {step < total && (
              <span className="min-w-0 truncate text-right font-sans text-[13px] font-medium text-[#6b7280]">
                {t("next")} {copy.steps[step].title}
              </span>
            )}
          </div>
          <div
            role="progressbar"
            aria-label={t("progress")}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={step - 1}
            aria-valuetext={t("stepOf", { step, total })}
            className="h-[7px] overflow-hidden rounded-full bg-[#eceef1]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cherry to-cherry-dark transition-[width] duration-300"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mb-1 font-condensed text-[28px] font-bold leading-[1.05] outline-none"
        >
          {copy.steps[step - 1].title}
        </h2>
        <p className="mb-[22px] font-sans text-[15.5px] text-[#6B7280]">
          {copy.steps[step - 1].subtitle}
        </p>

        <div role="status" aria-live="polite" className="sr-only">
          {errorCount ? t("missing", { count: errorCount }) : ""}
        </div>

        {visible.map((q) => {
          const v = answers[q.id];
          const code = showErrors ? errors[q.id] : undefined;
          const err = code && tv(code);
          const qc = copy.questions[q.id];
          const showOther = q.hasOther && otherSelected(q, answers);
          const fieldId = `f-${q.id}`;
          const errId = err ? `e-${q.id}` : undefined;
          const isGroup = q.type === "single" || q.type === "multi" || q.type === "scale" || q.type === "consent";
          const title = (
            <>
              {qc.label}
              {q.required ? (
                <span className="text-cherry" aria-hidden>
                  {" "}*
                </span>
              ) : null}
            </>
          );
          return (
            <Field key={q.id} id={`q-${q.id}`} group={isGroup} errorId={errId}>
              {q.type === "consent" ? null : isGroup ? (
                <legend className={labelClass}>{title}</legend>
              ) : (
                <label htmlFor={fieldId} className={labelClass}>
                  {title}
                </label>
              )}
              {q.type !== "consent" && (
                <div className="mb-[11px] font-sans text-[13px] font-medium text-[#6b7280]">
                  {q.required ? <span className="sr-only">{t("required")}</span> : t("optional")}
                </div>
              )}

              {(q.type === "single" || q.type === "multi") && (
                <div className="flex flex-wrap gap-[9px]">
                  {q.options?.map((opt, i) => {
                    const selected =
                      q.type === "multi"
                        ? Array.isArray(v) && (v as string[]).includes(opt)
                        : v === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          q.type === "multi" ? toggleMulti(q.id, opt) : setAns(q.id, opt)
                        }
                        className={chipClass(selected)}
                      >
                        {qc.options?.[i] ?? opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "scale" && (
                <div>
                  <div className="flex flex-wrap gap-[10px]">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={v === n}
                        aria-label={t("scale", { value: n })}
                        onClick={() => setAns(q.id, n)}
                        className={scaleChipClass(v === n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div aria-hidden className="mt-2 flex max-w-[270px] justify-between font-sans text-[13px] font-medium text-[#6b7280]">
                    <span>{t("scaleLow")}</span>
                    <span>{t("scaleHigh")}</span>
                  </div>
                </div>
              )}

              {showOther && (
                <input
                  type="text"
                  aria-label={t("otherAria", { label: qc.label })}
                  value={String(answers[`${q.id}__autre`] ?? "")}
                  onChange={(e) => setAns(`${q.id}__autre`, e.target.value)}
                  placeholder={t("otherPh")}
                  className={`${inputClass} mt-[10px]`}
                />
              )}

              {(q.type === "text" || q.type === "email" || q.type === "tel") && (
                <input
                  id={fieldId}
                  type={q.type === "text" ? "text" : q.type}
                  inputMode={q.type === "tel" ? "tel" : undefined}
                  autoComplete={autoCompleteFor(q.id, q.type)}
                  value={String(v ?? "")}
                  onChange={(e) => setAns(q.id, e.target.value)}
                  placeholder={qc.placeholder}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={errId}
                  aria-required={q.required || undefined}
                  className={inputClass}
                />
              )}

              {q.type === "textarea" && (
                <textarea
                  id={fieldId}
                  rows={4}
                  value={String(v ?? "")}
                  onChange={(e) => setAns(q.id, e.target.value)}
                  placeholder={qc.placeholder}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={errId}
                  aria-required={q.required || undefined}
                  className={`${inputClass} resize-y`}
                />
              )}

              {q.type === "geo" && (
                <GeoField
                  inputId={fieldId}
                  value={v as GeoValue | undefined}
                  locating={locating}
                  textValue={String(answers[`${q.id}__text`] ?? "")}
                  onDetect={() => detectGeo(q.id)}
                  onText={(val) => setAns(`${q.id}__text`, val)}
                />
              )}

              {q.type === "consent" && (
                <label
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-[12px] border-[1.5px] bg-[#f7f7f8] px-[18px] py-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cherry",
                    v === true ? "border-cherry" : err ? "border-cherry/60" : "border-[rgba(16,27,43,0.14)]",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={v === true}
                    onChange={(e) => setAns(q.id, e.target.checked)}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={errId}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={[
                      "flex h-6 w-6 flex-none items-center justify-center rounded-[6px] border-[1.5px] text-white",
                      v === true ? "border-cherry bg-cherry" : "border-[rgba(16,27,43,0.3)] bg-white",
                    ].join(" ")}
                  >
                    {v === true ? <CheckMark /> : null}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.45] text-navy">
                    {t("consent")}
                    <span className="text-cherry" aria-hidden> *</span>
                  </span>
                </label>
              )}
              {q.type === "consent" && (
                <p className="mb-0 mt-2 font-sans text-[13.5px] text-[#4b5563]">
                  {t("consentDetails")}{" "}
                  <Link href={localize(lang, "/confidentialite")} target="_blank" className="font-semibold text-navy underline underline-offset-4">
                    {t("consentLink")}
                  </Link>
                  .
                </p>
              )}

              {err && <FieldError id={errId} message={err} />}
            </Field>
          );
        })}

        {submitError && (
          <div role="alert" className="mt-2 rounded-[12px] border border-cherry/25 bg-cherry/[0.05] px-4 py-3">
            <FieldError message={submitError} />
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-navy underline underline-offset-4"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#128c4a]" />
              {t("writeWhatsapp")}
            </a>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-[rgba(16,27,43,0.08)] pt-[22px]">
          <button
            type="button"
            onClick={prev}
            disabled={submitting}
            className="cursor-pointer whitespace-nowrap rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-4 py-[14px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-[#4b5563] transition-colors hover:border-navy hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry disabled:opacity-50 sm:px-6"
          >
            {step <= 1 ? t("cancel") : `← ${t("prev")}`}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            aria-busy={submitting || undefined}
            className="cursor-pointer whitespace-nowrap rounded-[11px] border-none bg-cherry px-5 py-[14px] font-condensed text-[17px] font-bold tracking-[0.5px] text-white shadow-[0_14px_30px_-16px_rgba(162,3,45,0.85)] transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry disabled:opacity-70 sm:px-[30px]"
          >
            {submitting ? t("sending") : `${step >= total ? t("send") : t("nextBtn")} →`}
          </button>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-[6px] text-center font-sans text-[13px] text-navy/70">
        <LockIcon className="flex-none" aria-hidden />
        {t("saved")}
      </p>
    </>
  );
}

const labelClass =
  "mb-[3px] block p-0 font-sans text-[17px] font-semibold leading-[1.35] text-navy";

/** Question wrapper: a fieldset for choice groups, a plain block for text fields. */
function Field({
  id,
  group,
  errorId,
  children,
}: {
  id: string;
  group: boolean;
  errorId?: string;
  children: ReactNode;
}) {
  const cls = "mb-[22px] min-w-0 border-0 p-0 animate-step";
  return group ? (
    <fieldset id={id} aria-describedby={errorId} className={cls}>
      {children}
    </fieldset>
  ) : (
    <div id={id} className={cls}>
      {children}
    </div>
  );
}

function autoCompleteFor(id: string, type: string): string | undefined {
  if (type === "email") return "email";
  if (type === "tel") return "tel";
  if (id === "q16") return "name";
  if (id === "q18" && type === "text") return "organization";
  return undefined;
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function GeoField({
  inputId,
  value,
  locating,
  textValue,
  onDetect,
  onText,
}: {
  inputId: string;
  value: GeoValue | undefined;
  locating: boolean;
  textValue: string;
  onDetect: () => void;
  onText: (val: string) => void;
}) {
  const t = useTranslations("Quote.wizard.geo");
  const ok = Boolean(value?.ok);
  const hint = locating
    ? t("hintLocating")
    : ok
      ? t("hintFound", { coords: value?.coords ?? "" })
      : value?.denied
        ? t("hintDenied")
        : t("hintIdle");
  return (
    <div>
      <button
        type="button"
        onClick={onDetect}
        disabled={locating}
        className={[
          "inline-flex cursor-pointer items-center gap-2 rounded-[11px] border-[1.5px] px-5 py-[13px] font-sans text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry disabled:cursor-wait disabled:opacity-70",
          ok ? "border-cherry bg-cherry/[0.07] text-cherry" : "border-[rgba(16,27,43,0.2)] bg-white text-[#374151]",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {locating ? t("locating") : ok ? t("found") : t("use")}
        {ok && !locating ? <CheckMark /> : null}
      </button>
      <div aria-live="polite" className="my-[10px] font-sans text-[13.5px] font-medium text-[#4b5563]">
        {hint}
      </div>
      <input
        id={inputId}
        type="text"
        value={textValue}
        onChange={(e) => onText(e.target.value)}
        placeholder={t("placeholder")}
        className={inputClass}
      />
    </div>
  );
}
