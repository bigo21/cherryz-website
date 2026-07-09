"use client";

import { useEffect, useRef, useState } from "react";
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

interface SavedState {
  step: number;
  answers: Answers;
  done: boolean;
}

const inputClass =
  "w-full rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[15px] py-[14px] text-[16px] text-navy-alt transition-colors placeholder:text-[#9aa2ad] focus:border-cherry focus:outline-none focus:shadow-[0_0_0_3px_rgba(162,3,45,0.13)]";

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
  const schema = getSchema(type);
  const total = schema.length;

  const [step, setStep] = useState(() => loadSaved(type)?.step ?? 1);
  const [answers, setAnswers] = useState<Answers>(() => loadSaved(type)?.answers ?? {});
  const [done, setDone] = useState(() => loadSaved(type)?.done ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hydrated = useRef(false);

  // Persist progress to sessionStorage (skip the very first render).
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      sessionStorage.setItem(storageKey(type), JSON.stringify({ step, answers, done }));
    } catch {
      /* private mode — ignore */
    }
  }, [type, step, answers, done]);

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

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitQuoteRequest({ type, answers, tracking: collectTracking() });
      if (!res.ok) throw new Error(res.error ?? "unknown");
      setDone(true);
      scrollTop();
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
    scrollTop();
  }

  function prev() {
    if (step <= 1) {
      router.push("/demandes");
      return;
    }
    setStep((s) => s - 1);
    setErrors({});
    setShowErrors(false);
    scrollTop();
  }

  const progressPct = total ? Math.round((step / total) * 100) : 0;
  const prospectName = String(answers.q16 ?? "").trim().split(" ")[0] || "";

  if (done) {
    return (
      <div className="rounded-[20px] bg-white px-10 py-[52px] text-center shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] animate-pop">
        <div className="mx-auto mb-6 flex h-[82px] w-[82px] items-center justify-center rounded-full bg-cherry shadow-[0_18px_36px_-16px_rgba(162,3,45,0.85)]">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="m-0 font-condensed text-[36px] font-bold leading-[1.02]">
          Merci{prospectName ? ` ${prospectName}` : ""} !
        </h1>
        <p className="mx-auto mt-[14px] max-w-[440px] font-sans text-[17px] leading-[1.55] text-[#4b5563]">
          Votre demande a bien été reçue. Notre équipe va l&apos;étudier et vous
          recontacter sous 48h. Un email de confirmation vient de vous être
          envoyé.
        </p>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/237242014664"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] rounded-full bg-cherry px-[26px] py-[14px] font-condensed text-[16px] font-bold tracking-[0.5px] text-white transition-colors hover:bg-cherry-dark"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.21-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.17 2.95.15.19 2.01 3.08 4.88 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
              <path d="M12 2a10 10 0 0 0-8.53 15.26L2 22l4.85-1.27A10 10 0 1 0 12 2zm0 18.2a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-cherry/[0.35] bg-white px-[26px] py-[14px] font-condensed text-[16px] font-bold tracking-[0.5px] text-cherry transition-colors hover:bg-cherry/[0.06]"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[20px] bg-white px-9 pb-[30px] pt-[34px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] animate-fade">
        {/* Progress */}
        <div className="mb-[26px]">
          <div className="mb-[9px] flex items-baseline justify-between">
            <span className="font-condensed text-[14px] font-bold tracking-[1px] text-cherry">
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

        <h2 className="mb-1 font-condensed text-[28px] font-bold leading-[1.05]">
          {currentStep.title}
        </h2>
        <p className="mb-[22px] font-sans text-[15.5px] text-[#6B7280]">
          {currentStep.subtitle}
        </p>

        {visible.map((q) => {
          const v = answers[q.id];
          const err = showErrors ? errors[q.id] : undefined;
          const showOther = q.hasOther && otherSelected(q, answers);
          return (
            <div key={q.id} className="mb-[22px] animate-step">
              <label className="mb-[3px] block font-sans text-[17px] font-semibold leading-[1.35] text-navy-alt">
                {q.label}
                {q.required ? <span className="text-cherry"> *</span> : null}
              </label>
              <div className="mb-[11px] font-sans text-[13px] font-medium text-[#9aa2ad]">
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
                          q.type === "multi" ? toggleMulti(q.id, opt) : setAns(q.id, opt)
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
                  <span className="font-sans text-[13px] font-medium text-[#9aa2ad]">Très insatisfait</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setAns(q.id, n)} className={scaleChipClass(v === n)}>
                      {n}
                    </button>
                  ))}
                  <span className="font-sans text-[13px] font-medium text-[#9aa2ad]">Très satisfait</span>
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

              {(q.type === "text" || q.type === "email" || q.type === "tel") && (
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
                    v === true ? "border-cherry" : "border-[rgba(16,27,43,0.14)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-6 w-6 flex-none items-center justify-center rounded-[6px] border-[1.5px] text-[15px] text-white",
                      v === true ? "border-cherry bg-cherry" : "border-[rgba(16,27,43,0.3)] bg-white",
                    ].join(" ")}
                  >
                    {v === true ? "✓" : ""}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.45] text-navy-alt">
                    J&apos;accepte que Cherryz utilise mes informations pour me
                    recontacter dans le cadre de ma demande.
                  </span>
                </label>
              )}

              {err && <FieldError message={err} />}
            </div>
          );
        })}

        {submitError && <FieldError message={submitError} />}

        <div className="mt-7 flex items-center justify-between gap-[14px] border-t border-[rgba(16,27,43,0.08)] pt-[22px]">
          <button
            type="button"
            onClick={prev}
            disabled={submitting}
            className="cursor-pointer rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-6 py-[14px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-[#6B7280] transition-colors hover:border-navy-alt hover:text-navy-alt disabled:opacity-50"
          >
            {step <= 1 ? "Annuler" : "← Précédent"}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="cursor-pointer rounded-[11px] border-none bg-cherry px-[30px] py-[14px] font-condensed text-[17px] font-bold tracking-[0.5px] text-white shadow-[0_14px_30px_-16px_rgba(162,3,45,0.85)] transition-colors hover:bg-cherry-dark disabled:opacity-70"
          >
            {submitting ? "Envoi…" : step >= total ? "Envoyer ma demande →" : "Suivant →"}
          </button>
        </div>
      </div>
      <p className="mt-4 text-center font-sans text-[13px] text-navy/45">
        🔒 Vos réponses sont enregistrées automatiquement sur cet appareil.
      </p>
    </>
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
          ok ? "border-cherry bg-cherry/[0.07] text-cherry" : "border-[rgba(16,27,43,0.2)] bg-white text-[#374151]",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {ok ? "Position détectée ✓" : "Utiliser ma position actuelle"}
      </button>
      <div className="my-[10px] font-sans text-[13.5px] font-medium text-[#6B7280]">{hint}</div>
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
    <div className="mt-2 flex items-center gap-[6px] font-sans text-[13.5px] font-medium text-cherry">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
        <path d="M12 3l9 16H3z" />
        <path d="M12 10v4M12 17h.01" />
      </svg>
      {message}
    </div>
  );
}
