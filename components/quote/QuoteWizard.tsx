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
} from "@/lib/quote/validation";
import { submitQuoteRequest } from "@/app/actions/quote";
import { ArrowRightIcon, LockIcon, WhatsAppIcon } from "@/components/site/icons";
import { Stamp } from "@/components/site/QuoteSheet";
import { CONTACT } from "@/lib/site/site";
import { quote, schemaEn, type WizardCopy } from "@/content/quote";
import { useLang } from "@/lib/i18n/client";
import { localize } from "@/lib/i18n/config";

interface SavedState {
  step: number;
  answers: Answers;
  done: boolean;
}

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-navy/20 bg-paper px-[15px] py-[14px] font-sans text-[16px] text-navy transition-colors placeholder:text-ink-soft/80 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15 aria-[invalid=true]:border-cherry";

function chipClass(selected: boolean): string {
  return [
    "cursor-pointer text-left font-sans text-[15px] px-4 py-[10px] rounded-[8px] transition-colors duration-150 border-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
    selected
      ? "border-navy bg-navy text-paper font-semibold"
      : "border-navy/20 bg-paper text-navy font-medium hover:border-navy/50",
  ].join(" ");
}

function scaleChipClass(selected: boolean): string {
  return [
    "cursor-pointer w-[46px] h-[46px] rounded-[8px] font-condensed font-bold text-[18px] tabular-nums transition-colors duration-150 border-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
    selected
      ? "border-navy bg-navy text-paper"
      : "border-navy/20 bg-paper text-navy hover:border-navy/50",
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
  const lang = useLang();
  const t = quote[lang].wizard;
  // Questions are written (and answers stored) in French; English only changes what is shown.
  const tr = (s: string) => (lang === "en" ? (schemaEn[s] ?? s) : s);
  const schema = getSchema(type);
  const total = schema.length;

  const [step, setStep] = useState(() => loadSaved(type)?.step ?? 1);
  const [answers, setAnswers] = useState<Answers>(() => loadSaved(type)?.answers ?? {});
  const [done, setDone] = useState(() => loadSaved(type)?.done ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      setSubmitError(t.sendError);
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    const errs = validateQuestions(visible, answers, lang);
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
      <div className="sheet-perforated rounded-b-[14px] bg-paper px-6 pb-10 pt-12 text-center text-navy sm:px-10">
        <Stamp className="mx-auto mb-6 h-[104px] w-[104px] animate-stamp text-stamp" />
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-condensed text-[36px] font-bold leading-[1.02] outline-none"
        >
          {t.thanks(prospectName)}
        </h2>
        <p className="mx-auto mt-[14px] max-w-[440px] font-sans text-[17px] leading-[1.55] text-ink-soft">
          {t.received}
        </p>
        <ol className="mx-auto mt-8 max-w-[440px] list-none border-t-2 border-navy p-0 text-left font-sans text-[15.5px] leading-[1.45] text-navy">
          {t.after.map((line, i) => (
            <li key={line} className="flex gap-4 border-b border-rule py-3">
              <span className="flex-none font-condensed text-[17px] font-bold tabular-nums text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </li>
          ))}
        </ol>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] rounded-[10px] bg-cherry px-6 py-[14px] font-condensed text-[17px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
          >
            <WhatsAppIcon aria-hidden className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
          <Link
            href={localize(lang, "/")}
            className="inline-flex items-center gap-[9px] rounded-[10px] border-[1.5px] border-navy/25 bg-paper px-6 py-[14px] font-condensed text-[17px] font-semibold text-navy transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {t.home}
          </Link>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-6 cursor-pointer font-sans text-[15px] font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
        >
          {t.restart}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="sheet-perforated rounded-b-[14px] bg-paper px-5 pb-[30px] pt-10 text-navy animate-fade sm:px-9">
        {/* Progress */}
        <div className="mb-[26px]">
          <div className="mb-[9px] flex items-baseline justify-between gap-3">
            <span className="whitespace-nowrap font-condensed text-[15px] font-semibold tracking-[0.06em] tabular-nums text-navy">
              {t.stepOf(step, total)}
            </span>
            {step < total && (
              <span className="min-w-0 truncate text-right font-sans text-[13.5px] font-medium text-ink-soft">
                {t.next} {tr(schema[step].title)}
              </span>
            )}
          </div>
          <div
            role="progressbar"
            aria-label={t.progress}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={step - 1}
            aria-valuetext={t.stepOf(step, total)}
            className="h-[4px] overflow-hidden bg-rule"
          >
            <div
              className="h-full bg-navy transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mb-1 font-condensed text-[30px] font-bold leading-[1.05] outline-none"
        >
          {tr(currentStep.title)}
        </h2>
        <p className="mb-6 border-b-2 border-navy pb-4 font-sans text-[16px] text-ink-soft">
          {tr(currentStep.subtitle)}
        </p>

        <div role="status" aria-live="polite" className="sr-only">
          {errorCount
            ? t.missing(errorCount)
            : ""}
        </div>

        {visible.map((q) => {
          const v = answers[q.id];
          const err = showErrors ? errors[q.id] : undefined;
          const showOther = q.hasOther && otherSelected(q, answers);
          const fieldId = `f-${q.id}`;
          const errId = err ? `e-${q.id}` : undefined;
          const isGroup = q.type === "single" || q.type === "multi" || q.type === "scale" || q.type === "consent";
          const title = (
            <>
              {tr(q.label)}
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
                <div className="mb-[11px] font-sans text-[13.5px] font-medium text-ink-soft">
                  {q.required ? <span className="sr-only">{t.required}</span> : t.optional}
                </div>
              )}

              {(q.type === "single" || q.type === "multi") && (
                <div className="flex flex-wrap gap-[9px]">
                  {q.options?.map((opt) => {
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
                        {tr(opt)}
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
                        aria-label={t.scale(n)}
                        onClick={() => setAns(q.id, n)}
                        className={scaleChipClass(v === n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div aria-hidden className="mt-2 flex max-w-[270px] justify-between font-sans text-[13.5px] font-medium text-ink-soft">
                    <span>{t.scaleLow}</span>
                    <span>{t.scaleHigh}</span>
                  </div>
                </div>
              )}

              {showOther && (
                <input
                  type="text"
                  aria-label={t.otherAria(tr(q.label))}
                  value={String(answers[`${q.id}__autre`] ?? "")}
                  onChange={(e) => setAns(`${q.id}__autre`, e.target.value)}
                  placeholder={t.otherPh}
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
                  placeholder={q.placeholder && tr(q.placeholder)}
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
                  placeholder={q.placeholder && tr(q.placeholder)}
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
                  t={t.geo}
                />
              )}

              {q.type === "consent" && (
                <label
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-[10px] border-[1.5px] bg-ground px-[18px] py-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                    v === true ? "border-navy" : err ? "border-cherry/60" : "border-navy/15",
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
                      v === true ? "border-navy bg-navy" : "border-navy/30 bg-paper",
                    ].join(" ")}
                  >
                    {v === true ? <CheckMark /> : null}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.45] text-navy">
                    {t.consent}
                    <span className="text-cherry" aria-hidden> *</span>
                  </span>
                </label>
              )}
              {q.type === "consent" && (
                <p className="mb-0 mt-2 font-sans text-[13.5px] text-ink-soft">
                  {t.consentDetails}{" "}
                  <Link href={localize(lang, "/confidentialite")} target="_blank" className="font-semibold text-navy underline underline-offset-4">
                    {t.consentLink}
                  </Link>
                  .
                </p>
              )}

              {err && <FieldError id={errId} message={err} />}
            </Field>
          );
        })}

        {submitError && (
          <div role="alert" className="mt-2 rounded-[10px] border border-cherry/25 bg-cherry/[0.05] px-4 py-3">
            <FieldError message={submitError} />
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-navy underline underline-offset-4"
            >
              <WhatsAppIcon aria-hidden className="h-4 w-4 text-[#128c4a]" />
              {t.writeWhatsapp}
            </a>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-rule pt-[22px]">
          <button
            type="button"
            onClick={prev}
            disabled={submitting}
            className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[10px] border-[1.5px] border-navy/20 bg-paper px-4 py-[14px] font-condensed text-[17px] font-semibold text-ink-soft transition-colors hover:border-navy hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:opacity-50 sm:px-6"
          >
            {step <= 1 ? t.cancel : (
              <>
                <ArrowRightIcon aria-hidden className="rotate-180 text-[17px]" />
                {t.prev}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            aria-busy={submitting || undefined}
            className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[10px] border-none bg-cherry px-5 py-[14px] font-condensed text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-cherry-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry disabled:opacity-70 sm:px-7"
          >
            {submitting ? t.sending : (
              <>
                {step >= total ? t.send : t.nextBtn}
                <ArrowRightIcon aria-hidden className="text-[18px]" />
              </>
            )}
          </button>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-[6px] text-center font-sans text-[13.5px] text-ink-soft">
        <LockIcon className="flex-none" aria-hidden />
        {t.saved}
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
  t,
}: {
  inputId: string;
  value: GeoValue | undefined;
  locating: boolean;
  textValue: string;
  onDetect: () => void;
  onText: (val: string) => void;
  t: WizardCopy["geo"];
}) {
  const ok = Boolean(value?.ok);
  const hint = locating
    ? t.hintLocating
    : ok
      ? t.hintFound(value?.coords ?? "")
      : value?.denied
        ? t.hintDenied
        : t.hintIdle;
  return (
    <div>
      <button
        type="button"
        onClick={onDetect}
        disabled={locating}
        className={[
          "inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] px-5 py-[13px] font-sans text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-wait disabled:opacity-70",
          ok ? "border-navy bg-navy text-paper" : "border-navy/20 bg-paper text-navy hover:border-navy/50",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {locating ? t.locating : ok ? t.found : t.use}
        {ok && !locating ? <CheckMark /> : null}
      </button>
      <div aria-live="polite" className="my-[10px] font-sans text-[13.5px] font-medium text-ink-soft">
        {hint}
      </div>
      <input
        id={inputId}
        type="text"
        value={textValue}
        onChange={(e) => onText(e.target.value)}
        placeholder={t.placeholder}
        className={inputClass}
      />
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message: string }) {
  return (
    <div id={id} className="mt-2 flex items-center gap-[6px] font-sans text-[13.5px] font-medium text-cherry">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden>
        <path d="M12 3l9 16H3z" />
        <path d="M12 10v4M12 17h.01" />
      </svg>
      {message}
    </div>
  );
}
