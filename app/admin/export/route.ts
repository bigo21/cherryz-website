import { requireMember } from "@/lib/admin/dal";
import { listerDemandes, lireFiltres, reponsesLisibles, villeDe } from "@/lib/admin/demandes";
import { ghlLabel, offreLabel, statutLabel } from "@/lib/admin/labels";

// CSV export of the dashboard's current filters, for Excel (French locale:
// « ; » separator, UTF-8 with BOM so accents open correctly).

/**
 * One cell: quoted, inner quotes doubled. A value starting with = + - @ is
 * prefixed with ' so a spreadsheet never runs it as a formula (the answers
 * come from public forms).
 */
function cellule(v: unknown): string {
  let s = String(v ?? "").replace(/\r?\n/g, " ");
  if (/^[=+\-@\t]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

const date = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Douala" }).format(new Date(iso));

export async function GET(req: Request) {
  const f = lireFiltres(Object.fromEntries(new URL(req.url).searchParams));
  const { supabase } = await requireMember("/admin");
  const demandes = await listerDemandes(supabase, f, 10000);

  const entetes = ["Reçue le", "Offre", "Statut", "Motif de perte", "Nom", "Entreprise", "E-mail", "Téléphone", "Ville", "GHL", "Réponses", "Page", "Source UTM", "Campagne UTM"];
  const lignes = demandes.map((d) => {
    const utm = (d.tracking?.utm ?? {}) as Record<string, string>;
    return [
      date(d.created_at),
      offreLabel(d.offre),
      statutLabel(d.statut),
      d.motif_perte,
      d.full_name,
      d.company,
      d.email,
      d.phone,
      villeDe(d),
      ghlLabel(d.ghl_status),
      reponsesLisibles(d).map((r) => `${r.label} : ${r.value}`).join(" | "),
      d.tracking?.page,
      utm.utm_source,
      utm.utm_campaign,
    ].map(cellule).join(";");
  });
  const csv = "﻿" + [entetes.map(cellule).join(";"), ...lignes].join("\r\n");

  const jour = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cherryz-demandes-${jour}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
