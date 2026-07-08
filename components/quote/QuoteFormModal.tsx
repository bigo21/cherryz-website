"use client";

import { useEffect, useRef, useState } from "react";
import {
  getSchema,
  sessionKey,
  type Answers,
  type QuoteType,
} from "@/lib/quote/schemas";
import {
  otherSelected,
  present,
  validateQuestions,
  visibleQuestions,
  type GeoValue,
} from "@/lib/quote/validation";
import { submitQuoteRequest } from "@/app/actions/quote";

interface QuoteFormModalProps {
  type: QuoteType;
  onClose: () => void;
}

interface SavedState {
  step: number;
  answers: Answers;
  done: boolean;
}

const inputClass =
  "w-full border-[1.5px] border-[rgba(16,27,43,0.16)] rounded-[11px] px-[15px] py-[14px] text-[16px] text-navy-alt bg-white transition-colors placeholder:text-[#9aa2ad] focus:outline-none focus:border-cherry focus:shadow-[0_0_0_3px_rgba(162,3,45,0.13)]";

function chipClass(selected: boolean): string {
  return [
    "cursor-pointer font-sans text-[15px] px-[17px] py-[11px] rounded-full transition-all duration-150 border-[1.5px]",
    selected
      ? "border-cherry bg-cherry/[0.07] text-cherry font-semibold"
      : "border-[rgba(16,27,43,0.18)] bg-white text-[#374151] font-medium",
  ].join(" ");
}

function scaleChipClass(selected: boolean): string {
  return [
    "cursor-pointer w-[46px] h-[46px] rounded-[12px] font-condensed font-bold text-[18px] transition-all duration-150 border-[1.5px]",
    selected
      ? "border-cherry bg-cherry text-white"
      : "border-[rgba(16,27,43,0.18)] bg-white text-[#374151]",
  ].join(" ");
}

function loadSaved(type: QuoteType): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(sessionKey(type));
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<SavedState>;
    return {
      step: d.step ?? 1,
      answers: d.answers ?? {},
      done: Boolean(d.done),
    };
  } catch {
    return null;
  }
}

function collectTracking() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
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

export default function QuoteFormModal({ type, onClose }: QuoteFormModalProps) {
  const schema = getSchema(type);
  const total = schema.length;
  const isWifi = type === "wifi";

  const [step, setStep] = useState(() => loadSaved(type)?.step ?? 1);
  const [answers, setAnswers] = useState<Answers>(
    () => loadSaved(type)?.answers ?? {},
  );
  const [done, setDone] = useState(() => loadSaved(type)?.done ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persist to sessionStorage so a reopened form is rehydrated.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        sessionKey(type),
        JSON.stringify({ step, answers, done }),
      );
    } catch {
      // sessionStorage unavailable (private mode) — ignore.
    }
  }, [type, step, answers, done]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const currentStep = schema[step - 1];
  const visible = visibleQuestions(currentStep, answers);

  function setAns(id: string, val: unknown) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

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
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setAns(id, {
            ok: true,
            coords: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
          } satisfies GeoValue),
        () => setAns(id, { ok: false, denied: true } satisfies GeoValue),
      );
    } else {
      setAns(id, { ok: false, denied: true } satisfies GeoValue);
    }
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitQuoteRequest({
        type,
        answers,
        tracking: collectTracking(),
      });
      if (!res.ok) throw new Error(res.error ?? "unknown");
      setDone(true);
      const sc = scrollRef.current;
      if (sc) sc.scrollTop = 0;
    } catch {
      setSubmitError(
        "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    const errs = validateQuestions(visible, answers);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setShowErrors(true);
      return;
    }
    if (step >= total) {
      void submit();
      return;
    }
    setStep((s) => s + 1);
    setErrors({});
    setShowErrors(false);
    const sc = scrollRef.current;
    if (sc) sc.scrollTop = 0;
  }

  function prev() {
    if (step <= 1) {
      onClose();
      return;
    }
    setStep((s) => s - 1);
    setErrors({});
    setShowErrors(false);
  }

  const progressPct = total ? Math.round((step / total) * 100) : 0;
  const prospectName = String(answers.q16 ?? "").trim().split(" ")[0] || "";
  const eyebrow = isWifi
    ? "INTERNET · WIFI ZONE"
    : "INTERNET · IP PUBLIQUE DÉDIÉE";
  const formTitle = isWifi
    ? "Je veux lancer ma WiFi Zone"
    : "Demande de devis Internet avec IP Publique Dédiée";

  return (
    <div
      ref={scrollRef}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-auto bg-[rgba(11,19,29,0.74)] px-[18px] py-[28px] backdrop-blur-[4px] animate-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={formTitle}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-full max-w-[660px] rounded-[20px] bg-white text-navy-alt shadow-modal animate-modal"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-[3] flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border-none bg-[#f1f2f4] text-[20px] leading-none text-navy-alt transition-colors hover:bg-[#e2e4e7]"
        >
          ✕
        </button>

        {!done ? (
          <div className="px-9 pb-[30px] pt-[34px]">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cherry/[0.08] px-[13px] py-[6px]">
              <span className="inline-flex text-cherry text-[16px]">
                {isWifi ? <WifiIcon /> : <GlobeIcon />}
              </span>
              <span className="font-condensed text-[12px] font-semibold tracking-[1.2px] text-cherry">
                {eyebrow}
              </span>
            </div>

            <h2 className="mb-1 font-condensed text-[27px] font-bold leading-[1.05]">
              {formTitle}
            </h2>
            <p className="mb-5 font-sans text-[15px] text-[#6B7280]">
              Remplissez ce formulaire en 3 minutes, notre équipe vous contacte
              sous 48h.
            </p>

            {/* Progress */}
            <div className="mb-6">
              <div className="mb-[9px] flex items-baseline justify-between">
                <span className="font-condensed text-[13.5px] font-bold tracking-[1px] text-cherry">
                  ÉTAPE {step} SUR {total}
                </span>
                <span className="font-sans text-[13px] font-medium text-[#9aa2ad]">
                  {currentStep.title}
                </span>
              </div>
              <div className="h-[7px] overflow-hidden rounded-full bg-[#eceef1]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cherry to-cherry-dark transition-[width] duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <h3 className="mb-1 font-condensed text-[24px] font-bold leading-[1.05]">
              {currentStep.title}
            </h3>
            <p className="mb-5 font-sans text-[15px] text-[#6B7280]">
              {currentStep.subtitle}
            </p>

            {/* Questions */}
            {visible.map((q) => {
              const v = answers[q.id];
              const err = showErrors ? errors[q.id] : undefined;
              const showOther = q.hasOther && otherSelected(q, answers);
              return (
                <div key={q.id} className="mb-[22px] animate-step">
                  <label className="mb-[3px] block font-sans text-[16.5px] font-semibold leading-[1.35] text-navy-alt">
                    {q.label}
                    {q.required ? <span className="text-cherry"> *</span> : null}
                  </label>
                  <div className="mb-[11px] font-sans text-[12.5px] font-medium text-[#9aa2ad]">
                    {q.required ? "" : "Facultatif"}
                  </div>

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
                            onClick={() =>
                              q.type === "multi"
                                ? toggleMulti(q.id, opt)
                                : setAns(q.id, opt)
                            }
                            className={chipClass(selected)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === "scale" && (
                    <div className="flex flex-wrap items-center gap-[10px]">
                      <span className="font-sans text-[12.5px] font-medium text-[#9aa2ad]">
                        Très insatisfait
                      </span>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAns(q.id, n)}
                          className={scaleChipClass(v === n)}
                        >
                          {n}
                        </button>
                      ))}
                      <span className="font-sans text-[12.5px] font-medium text-[#9aa2ad]">
                        Très satisfait
                      </span>
                    </div>
                  )}

                  {showOther && (
                    <input
                      type="text"
                      value={String(answers[`${q.id}__autre`] ?? "")}
                      onChange={(e) => setAns(`${q.id}__autre`, e.target.value)}
                      placeholder="Précisez…"
                      className={`${inputClass} mt-[10px]`}
                    />
                  )}

                  {(q.type === "text" ||
                    q.type === "email" ||
                    q.type === "tel") && (
                    <input
                      type={q.type === "text" ? "text" : q.type}
                      value={String(v ?? "")}
                      onChange={(e) => setAns(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className={inputClass}
                    />
                  )}

                  {q.type === "textarea" && (
                    <textarea
                      rows={4}
                      value={String(v ?? "")}
                      onChange={(e) => setAns(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className={`${inputClass} resize-y`}
                    />
                  )}

                  {q.type === "geo" && (
                    <GeoField
                      value={v as GeoValue | undefined}
                      textValue={String(answers[`${q.id}__text`] ?? "")}
                      onDetect={() => detectGeo(q.id)}
                      onText={(val) => setAns(`${q.id}__text`, val)}
                    />
                  )}

                  {q.type === "consent" && (
                    <label
                      onClick={(e) => {
                        e.preventDefault();
                        setAns(q.id, v !== true);
                      }}
                      className={[
                        "flex cursor-pointer items-start gap-3 rounded-[12px] border-[1.5px] bg-[#f7f7f8] px-[18px] py-4",
                        v === true
                          ? "border-cherry"
                          : "border-[rgba(16,27,43,0.14)]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-6 w-6 flex-none items-center justify-center rounded-[6px] border-[1.5px] text-[15px] text-white",
                          v === true
                            ? "border-cherry bg-cherry"
                            : "border-[rgba(16,27,43,0.3)] bg-white",
                        ].join(" ")}
                      >
                        {v === true ? "✓" : ""}
                      </span>
                      <span className="font-sans text-[14.5px] leading-[1.45] text-navy-alt">
                        J&apos;accepte que Cherryz utilise mes informations pour
                        me recontacter dans le cadre de ma demande.
                      </span>
                    </label>
                  )}

                  {err && <FieldError message={err} />}
                </div>
              );
            })}

            {submitError && <FieldError message={submitError} />}

            {/* Footer nav */}
            <div className="mt-[26px] flex items-center justify-between gap-[14px] border-t border-[rgba(16,27,43,0.08)] pt-5">
              <button
                type="button"
                onClick={prev}
                disabled={submitting}
                className="cursor-pointer rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[22px] py-[13px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-[#6B7280] transition-colors hover:border-navy-alt hover:text-navy-alt disabled:opacity-50"
              >
                {step <= 1 ? "Annuler" : "← Précédent"}
              </button>
              <button
                type="button"
                onClick={next}
                disabled={submitting}
                className="cursor-pointer rounded-[11px] border-none bg-cherry px-7 py-[13px] font-condensed text-[17px] font-bold tracking-[0.5px] text-white shadow-[0_14px_30px_-16px_rgba(162,3,45,0.85)] transition-colors hover:bg-cherry-dark disabled:opacity-70"
              >
                {submitting
                  ? "Envoi…"
                  : step >= total
                    ? "Envoyer ma demande →"
                    : "Suivant →"}
              </button>
            </div>
          </div>
        ) : (
          <div className="px-10 py-[54px] text-center animate-pop">
            <div className="mx-auto mb-[22px] flex h-20 w-20 items-center justify-center rounded-full bg-cherry shadow-[0_18px_36px_-16px_rgba(162,3,45,0.85)]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-condensed text-[34px] font-bold leading-[1.02]">
              Merci{prospectName ? ` ${prospectName}` : ""} !
            </h2>
            <p className="mx-auto mt-[14px] max-w-[420px] font-sans text-[16.5px] leading-[1.55] text-[#4b5563]">
              Votre demande a bien été reçue. Notre équipe va l&apos;étudier et
              vous recontacter sous 48h. Un email de confirmation vient de vous
              être envoyé.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/237242014664"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[9px] rounded-full bg-cherry px-6 py-[13px] font-condensed text-[16px] font-bold tracking-[0.5px] text-white transition-colors hover:bg-cherry-dark"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none"
                >
                  <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z" />
                </svg>
                WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex cursor-pointer items-center gap-[9px] rounded-full border-[1.5px] border-cherry/[0.35] bg-white px-6 py-[13px] font-condensed text-[16px] font-bold tracking-[0.5px] text-cherry transition-colors hover:bg-cherry/[0.06]"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GeoField({
  value,
  textValue,
  onDetect,
  onText,
}: {
  value: GeoValue | undefined;
  textValue: string;
  onDetect: () => void;
  onText: (val: string) => void;
}) {
  const ok = Boolean(value?.ok);
  const hint = ok
    ? `Position détectée : ${value?.coords}. Vous pouvez préciser ci-dessous si besoin.`
    : value?.denied
      ? "Localisation non disponible — décrivez-la manuellement ci-dessous."
      : "Ou décrivez votre localisation manuellement :";
  return (
    <div>
      <button
        type="button"
        onClick={onDetect}
        className={[
          "inline-flex cursor-pointer items-center gap-2 rounded-[11px] border-[1.5px] px-5 py-[13px] font-sans text-[15px] font-semibold",
          ok
            ? "border-cherry bg-cherry/[0.07] text-cherry"
            : "border-[rgba(16,27,43,0.2)] bg-white text-[#374151]",
        ].join(" ")}
      >
        <span className="inline-flex text-[16px]">
          <PinIcon />
        </span>
        {ok ? "Position détectée ✓" : "Utiliser ma position actuelle"}
      </button>
      <div className="my-[10px] font-sans text-[13px] font-medium text-[#6B7280]">
        {hint}
      </div>
      <input
        type="text"
        value={textValue}
        onChange={(e) => onText(e.target.value)}
        placeholder="Décrivez votre localisation (quartier, points de repère)"
        className={inputClass}
      />
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <div className="mt-2 flex items-center gap-[6px] font-sans text-[13px] font-medium text-cherry">
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-none"
      >
        <path d="M12 3l9 16H3z" />
        <path d="M12 10v4M12 17h.01" />
      </svg>
      {message}
    </div>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 15.5a5.5 5.5 0 0 1 7 0" />
      <path d="M2 9.5a15 15 0 0 1 20 0" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
