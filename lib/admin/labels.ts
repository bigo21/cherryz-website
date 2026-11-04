// Labels of the team dashboard (/admin). The stored values are those of the
// cherryz schema (cherryz.demandes.offre, cherryz.demande_statut.statut).

/**
 * Offers, in filter order. Cybercafé 2.0 and Apporteurs d'Affaires have no form
 * yet: their filters are shown (empty) so the team sees them coming.
 */
export const OFFRES = [
  { value: "ip", label: "IP dédiée" },
  { value: "wifi", label: "WiFi Zone" },
  { value: "bizlink", label: "BizLink" },
  { value: "cybercafe", label: "Cybercafé 2.0" },
  { value: "apporteur", label: "Apporteurs d'Affaires" },
  { value: "contact", label: "Contact" },
] as const;

export const STATUTS = [
  { value: "nouveau", label: "Nouveau" },
  { value: "contacte", label: "Contacté" },
  { value: "etude_planifiee", label: "Étude planifiée" },
  { value: "devis_envoye", label: "Devis envoyé" },
  { value: "client", label: "Client" },
  { value: "perdu", label: "Perdu" },
] as const;

export type Offre = (typeof OFFRES)[number]["value"];
export type Statut = (typeof STATUTS)[number]["value"];

export const offreLabel = (v: string) => OFFRES.find((o) => o.value === v)?.label ?? v;
export const statutLabel = (v: string) => STATUTS.find((s) => s.value === v)?.label ?? v;
export const isStatut = (v: unknown): v is Statut => STATUTS.some((s) => s.value === v);
export const isOffre = (v: unknown): v is Offre => OFFRES.some((o) => o.value === v);

/** State of the request's push to GoHighLevel (cherryz.ghl_sync.status). */
export function ghlLabel(status: string | null): string {
  if (status === "synced") return "Envoyé";
  if (status === "failed") return "Échec, relance prévue";
  if (status === "pending") return "En attente";
  return "Hors GHL";
}
