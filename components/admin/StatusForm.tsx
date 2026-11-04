"use client";

import { useActionState, useState } from "react";
import { updateStatus } from "@/app/admin/actions";
import { STATUTS } from "@/lib/admin/labels";
import { btnPrimary, field, label } from "./ui";

export function StatusForm({
  statutId,
  statut,
  motif,
  conseiller,
  equipe,
}: {
  statutId: string;
  statut: string;
  motif: string | null;
  conseiller: string | null;
  equipe: { userId: string; displayName: string }[];
}) {
  const [state, action, pending] = useActionState(updateStatus, {});
  const [current, setCurrent] = useState(statut);
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="statutId" value={statutId} />
      <div>
        <label htmlFor="statut" className={label}>Statut</label>
        <select id="statut" name="statut" value={current} onChange={(e) => setCurrent(e.target.value)} className={`${field} cursor-pointer`}>
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      {current === "perdu" && (
        <div>
          <label htmlFor="motif" className={label}>Motif de la perte</label>
          <textarea id="motif" name="motif" rows={3} maxLength={500} defaultValue={motif ?? ""} className={field} />
        </div>
      )}
      <div>
        <label htmlFor="conseiller" className={label}>Conseiller</label>
        <select id="conseiller" name="conseiller" defaultValue={conseiller ?? ""} className={`${field} cursor-pointer`}>
          <option value="">Personne</option>
          {equipe.map((m) => (
            <option key={m.userId} value={m.userId}>{m.displayName}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} aria-busy={pending || undefined} className={btnPrimary}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <p role="status" className="m-0 font-sans text-[14.5px] font-medium text-navy/70">
          {state.message}
        </p>
      </div>
    </form>
  );
}
