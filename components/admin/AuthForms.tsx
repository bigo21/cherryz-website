"use client";

import { useActionState } from "react";
import { signIn, verifyCode, type FormState } from "@/app/admin/actions";
import { btnPrimary, field, label } from "./ui";

function Message({ state }: { state: FormState }) {
  return state.message ? (
    <p role="alert" className="m-0 font-sans text-[14.5px] font-medium text-cherry">
      {state.message}
    </p>
  ) : null;
}

export function LoginForm({ suite }: { suite: string }) {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="suite" value={suite} />
      <div>
        <label htmlFor="email" className={label}>E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.email} className={field} />
      </div>
      <div>
        <label htmlFor="password" className={label}>Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      </div>
      <Message state={state} />
      <button type="submit" disabled={pending} aria-busy={pending || undefined} className={btnPrimary}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

/** The 6-digit code of the authenticator app. `factorId` only on first set-up. */
export function CodeForm({ suite, factorId }: { suite: string; factorId?: string }) {
  const [state, action, pending] = useActionState(verifyCode, {});
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="suite" value={suite} />
      {factorId && <input type="hidden" name="factorId" value={factorId} />}
      <div>
        <label htmlFor="code" className={label}>Code à 6 chiffres</label>
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          required
          autoFocus
          className={`${field} font-condensed text-[22px] tracking-[6px]`}
        />
      </div>
      <Message state={state} />
      <button type="submit" disabled={pending} aria-busy={pending || undefined} className={btnPrimary}>
        {pending ? "Vérification…" : "Valider"}
      </button>
    </form>
  );
}
