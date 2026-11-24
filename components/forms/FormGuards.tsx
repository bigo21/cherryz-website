"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT, MIN_FILL_MS, suggestEmail } from "@/lib/forms/checks";

/**
 * Anti-robot guard of a form: a field hidden from people and from assistive
 * technology (robots fill every field), and the time since the form appeared.
 * Both go with the submission. `read` waits out the minimal time itself, so a
 * visitor who is quick (saved answers, autofill) is never refused for it.
 */
export function useAntiRobot() {
  const trap = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const field = (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir
        <input ref={trap} type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
  const read = async () => {
    const wait = startedAt.current + MIN_FILL_MS + 100 - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    return { trap: trap.current?.value ?? "", elapsedMs: Date.now() - startedAt.current };
  };
  return { field, read };
}

/** "Did you mean …?" under an e-mail field, for a typo in a common webmail domain. */
export function EmailSuggestion({ value, onApply }: { value: string; onApply: (email: string) => void }) {
  const suggestion = suggestEmail(value);
  if (!suggestion) return null;
  return (
    <p className="m-0 mt-2 font-sans text-[14.5px] text-navy/80">
      Vouliez-vous dire{" "}
      <button
        type="button"
        onClick={() => onApply(suggestion)}
        className="cursor-pointer font-semibold text-cherry underline underline-offset-4"
      >
        {suggestion}
      </button>{" "}
      ?
    </p>
  );
}
