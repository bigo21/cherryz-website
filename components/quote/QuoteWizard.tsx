"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon, LockIcon, WhatsAppIcon } from "@/components/site/icons";
import { CONTACT } from "@/lib/site/site";
import FieldError from "@/components/site/FieldError";
import ExternalLink from "@/components/site/ExternalLink";
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
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors placeholder:text-ink-3 focus:border-cherry aria-invalid:border-cherry";

function chipClass(selected: boolean): string {
  return [
    "cursor-pointer font-sans text-body px-4 py-3 rounded-full transition border active:scale-[0.97]",
    selected
      ? "border-cherry bg-cherry/5 text-cherry font-semibold"
      : "border-line bg-white text-ink-2 font-medium",
  ].join(" ");
}

function scaleChipClass(selected: boolean): string {
  return [
    "cursor-pointer w-12 h-12 rounded-full font-condensed font-bold text-lead tabular-nums transition border active:scale-[0.97]",
    selected
      ? "border-cherry bg-cherry text-white"
      : "border-line bg-white text-ink-2",
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
  const tc = useTranslations("Chrome");
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
      <div className="rounded-2xl bg-white px-6 py-13 text-center shadow-card animate-pop sm:px-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cherry shadow-cherry">
          <svg aria-hidden width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-condensed text-title-lg font-bold"
        >
          {prospectName ? t("thanks", { name: prospectName }) : t("thanksAnonymous")}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-sans text-lead text-ink-2">
          {t("received")}
        </p>
        <ol className="mx-auto mt-7 max-w-md space-y-3 text-left font-sans text-body text-navy">
          {(["review", "callback", "visit"] as const).map((line, i) => (
            <li key={line} className="flex gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cherry/10 font-condensed text-small font-bold text-cherry">
                {i + 1}
              </span>
              {t(`after.${line}`)}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ExternalLink
            href={CONTACT.whatsapp}
            icon={false}
            className="inline-flex items-center gap-2 rounded-full bg-cherry px-6 py-3 font-condensed text-body font-bold tracking-wide text-white transition-colors hover:bg-cherry-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </ExternalLink>
          <Link
            href={localize(lang, "/")}
            className="inline-flex items-center gap-2 rounded-full border border-cherry/30 bg-white px-6 py-3 font-condensed text-body font-bold tracking-wide text-cherry transition-colors hover:bg-cherry/5"
          >
            {t("home")}
          </Link>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-6 cursor-pointer font-sans text-body font-semibold text-cherry underline underline-offset-4"
        >
          {t("restart")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white px-5 pb-8 pt-8 shadow-card animate-fade sm:px-9">
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="whitespace-nowrap font-condensed text-small font-bold tracking-widest text-cherry uppercase">
              {t("stepOf", { step, total })}
            </span>
            {step < total && (
              <span className="min-w-0 truncate text-right font-sans text-small font-medium text-ink-3">
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
            className="h-2 overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full w-(--progress) rounded-full bg-cherry transition-all duration-300"
              style={{ "--progress": `${Math.max(progressPct, 4)}%` } as CSSProperties}
            />
          </div>
        </div>

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mb-1 font-condensed text-title-md font-bold"
        >
          {copy.steps[step - 1].title}
        </h2>
        <p className="mb-6 font-sans text-body text-ink-3">
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
                <div className="mb-3 font-sans text-small font-medium text-ink-3">
                  {q.required ? <span className="sr-only">{t("required")}</span> : t("optional")}
                </div>
              )}

              {(q.type === "single" || q.type === "multi") && (
                <div className="flex flex-wrap gap-2">
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
                  <div className="flex flex-wrap gap-2">
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
                  <div aria-hidden className="mt-2 flex max-w-md justify-between font-sans text-small font-medium text-ink-3">
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
                  className={`${inputClass} mt-2`}
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
                    "flex cursor-pointer items-start gap-3 rounded-xl border bg-surface px-4 py-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent",
                    v === true ? "border-cherry" : err ? "border-cherry/60" : "border-line",
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
                      "flex h-6 w-6 flex-none items-center justify-center rounded-md border text-white",
                      v === true ? "border-cherry bg-cherry" : "border-line bg-white",
                    ].join(" ")}
                  >
                    {v === true ? <CheckMark /> : null}
                  </span>
                  <span className="font-sans text-body text-navy">
                    {t("consent")}
                    <span className="text-cherry" aria-hidden> *</span>
                  </span>
                </label>
              )}
              {q.type === "consent" && (
                <p className="mb-0 mt-2 font-sans text-small text-ink-2">
                  {t("consentDetails")}{" "}
                  <Link href={localize(lang, "/confidentialite")} target="_blank" className="font-semibold text-navy underline underline-offset-4">
                    {t("consentLink")}
                    <ExternalIcon className="ml-1 inline-block align-baseline" />
                    <span className="sr-only"> {tc("newTab")}</span>
                  </Link>
                  .
                </p>
              )}

              {err && <FieldError id={errId} message={err} />}
            </Field>
          );
        })}

        {submitError && (
          <div role="alert" className="mt-2 rounded-xl border border-cherry/25 bg-cherry/5 px-4 py-3">
            <FieldError message={submitError} />
            <ExternalLink
              href={CONTACT.whatsapp}
              icon={false}
              className="mt-2 inline-flex items-center gap-2 font-sans text-small font-semibold text-navy underline underline-offset-4"
            >
              <WhatsAppIcon className="size-4 text-positive" />
              {t("writeWhatsapp")}
            </ExternalLink>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={prev}
            disabled={submitting}
            className="cursor-pointer whitespace-nowrap rounded-full border border-line bg-white px-4 py-3 font-condensed text-body font-semibold tracking-wide text-ink-2 transition hover:border-navy hover:text-navy active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
          >
            {step <= 1 ? t("cancel") : (
              <>
                <ArrowLeftIcon className="mr-2" />
                {t("prev")}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            aria-busy={submitting || undefined}
            className="cursor-pointer whitespace-nowrap rounded-full bg-cherry px-5 py-3 font-condensed text-lead font-bold tracking-wide text-white shadow-cherry transition hover:bg-cherry-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
          >
            {submitting ? t("sending") : (
              <>
                {step >= total ? t("send") : t("nextBtn")}
                <ArrowRightIcon className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-center font-sans text-small text-ink-2">
        <LockIcon className="flex-none" aria-hidden />
        {t("saved")}
      </p>
    </>
  );
}

const labelClass =
  "mb-1 block p-0 font-sans text-lead font-semibold  text-navy";

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
  const cls = "mb-6 min-w-0 border-0 p-0 animate-step";
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
          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 font-sans text-body font-semibold transition active:scale-[0.97] disabled:cursor-wait disabled:opacity-60",
          ok ? "border-cherry bg-cherry/5 text-cherry" : "border-line bg-white text-ink-2",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {locating ? t("locating") : ok ? t("found") : t("use")}
        {ok && !locating ? <CheckMark /> : null}
      </button>
      <div aria-live="polite" className="my-2 font-sans text-small font-medium text-ink-2">
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
