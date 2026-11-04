import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusForm } from "@/components/admin/StatusForm";
import { card, statutBadge } from "@/components/admin/ui";
import { requireMember } from "@/lib/admin/dal";
import { reponsesLisibles, villeDe, type Demande } from "@/lib/admin/demandes";
import { ghlLabel, offreLabel, statutLabel } from "@/lib/admin/labels";

const date = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Douala" }).format(new Date(iso));

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface Historique {
  id: number;
  ancien_statut: string | null;
  nouveau_statut: string | null;
  champs_modifies: Record<string, { avant: unknown; apres: unknown }>;
  modifie_par: string | null;
  modifie_le: string;
}

function Ligne({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-navy/[0.08] py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
      <dt className="font-sans text-[14px] font-semibold text-navy/60">{label}</dt>
      <dd className="m-0 whitespace-pre-line break-words font-sans text-[15.5px] text-navy">{children}</dd>
    </div>
  );
}

export default async function DetailDemande({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireMember(`/admin/demandes/${id}`);
  if (!UUID.test(id)) notFound();

  const db = supabase.schema("cherryz");
  const [{ data: d }, { data: equipe }, { data: historique }] = await Promise.all([
    db.from("demandes").select("*").eq("statut_id", id).maybeSingle<Demande>(),
    db.from("team_members").select("user_id, display_name").order("display_name"),
    db
      .from("demande_statut_historique")
      .select("id, ancien_statut, nouveau_statut, champs_modifies, modifie_par, modifie_le")
      .eq("demande_statut_id", id)
      .order("modifie_le", { ascending: false })
      .returns<Historique[]>(),
  ]);
  if (!d) notFound();

  const noms = new Map((equipe ?? []).map((m) => [m.user_id as string, m.display_name as string]));
  const utm = (d.tracking?.utm ?? {}) as Record<string, string>;
  const origine = [d.tracking?.page, utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(" · ");

  return (
    <>
      <Link href="/admin" className="inline-flex min-h-11 items-center font-condensed text-[15px] font-semibold tracking-[0.4px] text-navy/70 hover:text-cherry">
        ← Toutes les demandes
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="m-0 font-condensed text-[36px] font-bold leading-[1.05]">{d.full_name || "Sans nom"}</h1>
        <span className={statutBadge(d.statut)}>{statutLabel(d.statut)}</span>
      </div>
      <p className="m-0 mt-1 font-sans text-[15.5px] text-navy/70">
        {offreLabel(d.offre)} · reçue le {date(d.created_at)}
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6">
          <section aria-labelledby="contact" className={`${card} px-6 py-5`}>
            <h2 id="contact" className="m-0 mb-2 font-condensed text-[22px] font-bold">Contact</h2>
            <dl className="m-0">
              <Ligne label="E-mail">
                {d.email ? <a href={`mailto:${d.email}`} className="text-cherry underline underline-offset-4">{d.email}</a> : "—"}
              </Ligne>
              <Ligne label="Téléphone">
                {d.phone ? <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="text-cherry underline underline-offset-4">{d.phone}</a> : "—"}
              </Ligne>
              <Ligne label="Entreprise">{d.company || "—"}</Ligne>
              {villeDe(d) && <Ligne label="Ville">{villeDe(d)}</Ligne>}
            </dl>
          </section>

          <section aria-labelledby="reponses" className={`${card} px-6 py-5`}>
            <h2 id="reponses" className="m-0 mb-2 font-condensed text-[22px] font-bold">Réponses</h2>
            <dl className="m-0">
              {reponsesLisibles(d).map((r) => (
                <Ligne key={r.label} label={r.label}>{r.value || "—"}</Ligne>
              ))}
            </dl>
          </section>

          <section aria-labelledby="origine" className={`${card} px-6 py-5`}>
            <h2 id="origine" className="m-0 mb-2 font-condensed text-[22px] font-bold">Origine et CRM</h2>
            <dl className="m-0">
              <Ligne label="Page et campagne">{origine || "—"}</Ligne>
              <Ligne label="GoHighLevel">{ghlLabel(d.ghl_status)}</Ligne>
            </dl>
          </section>
        </div>

        <div className="grid gap-6">
          <section aria-labelledby="suivi" className={`${card} px-6 py-5`}>
            <h2 id="suivi" className="m-0 mb-4 font-condensed text-[22px] font-bold">Suivi</h2>
            <StatusForm
              statutId={d.statut_id}
              statut={d.statut}
              motif={d.motif_perte}
              conseiller={d.conseiller}
              equipe={(equipe ?? []).map((m) => ({ userId: m.user_id, displayName: m.display_name }))}
            />
          </section>

          <section aria-labelledby="historique" className={`${card} px-6 py-5`}>
            <h2 id="historique" className="m-0 mb-2 font-condensed text-[22px] font-bold">Historique</h2>
            {historique?.length ? (
              <ol className="m-0 list-none p-0">
                {historique.map((h) => (
                  <li key={h.id} className="border-t border-navy/[0.08] py-3 font-sans text-[14.5px]">
                    <div className="text-navy">
                      {h.ancien_statut !== h.nouveau_statut
                        ? `${statutLabel(h.ancien_statut ?? "")} → ${statutLabel(h.nouveau_statut ?? "")}`
                        : "Suivi modifié"}
                      {"conseiller" in h.champs_modifies && " · conseiller changé"}
                      {"motif_perte" in h.champs_modifies && " · motif modifié"}
                    </div>
                    <div className="text-[13.5px] text-navy/60">
                      {date(h.modifie_le)} · {h.modifie_par ? noms.get(h.modifie_par) ?? "Ancien membre" : "Administration"}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="m-0 font-sans text-[14.5px] text-navy/60">Aucune modification depuis la réception.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
