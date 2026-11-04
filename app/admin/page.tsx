import Link from "next/link";
import { btnPrimary, btnSecondary, card, field, statutBadge } from "@/components/admin/ui";
import { requireMember } from "@/lib/admin/dal";
import { compterDemandes, listerDemandes, lireFiltres, versQuery, villeDe, type Filtres } from "@/lib/admin/demandes";
import { ghlLabel, OFFRES, offreLabel, STATUTS, statutLabel } from "@/lib/admin/labels";

const LIMITE = 300;

const date = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Douala" }).format(new Date(iso));

function Filtre({ href, actif, children }: { href: string; actif: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={[
        "inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 py-2 font-sans text-[14.5px] transition-colors",
        actif ? "border-cherry bg-cherry/[0.07] font-semibold text-cherry" : "border-navy/[0.14] bg-white text-navy/80 hover:border-navy/30",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

const Compte = ({ n }: { n: number }) => <span className="tabular-nums text-navy/50">{n}</span>;

function MessageVide({ f }: { f: Filtres }) {
  if (f.offre === "cybercafe" || f.offre === "apporteur") {
    return <>Le formulaire {offreLabel(f.offre)} n&apos;est pas encore en ligne : ses demandes apparaîtront ici.</>;
  }
  return <>Aucune demande ne correspond à ces filtres.</>;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const f = lireFiltres(await searchParams);
  const { supabase } = await requireMember(`/admin${versQuery(f)}`);
  const [demandes, comptes] = await Promise.all([listerDemandes(supabase, f, LIMITE), compterDemandes(supabase)]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 font-condensed text-[36px] font-bold leading-[1.05]">Demandes</h1>
          <p className="m-0 mt-1 font-sans text-[15.5px] text-navy/70">
            {comptes.total} demande{comptes.total > 1 ? "s" : ""} au total, tous formulaires du site confondus.
          </p>
        </div>
        <a href={`/admin/export${versQuery(f)}`} className={btnSecondary}>
          Exporter en CSV
        </a>
      </div>

      <form method="get" action="/admin" className="mt-7 flex max-w-[560px] gap-2" role="search">
        {f.offre && <input type="hidden" name="offre" value={f.offre} />}
        {f.statut && <input type="hidden" name="statut" value={f.statut} />}
        <label htmlFor="q" className="sr-only">Rechercher un nom, un e-mail, une entreprise ou un téléphone</label>
        <input id="q" name="q" type="search" defaultValue={f.q} placeholder="Nom, e-mail, entreprise, téléphone…" className={field} />
        <button type="submit" className={btnPrimary}>Rechercher</button>
      </form>

      <nav aria-label="Filtrer par offre" className="mt-6 flex flex-wrap gap-2">
        <Filtre href={`/admin${versQuery(f, { offre: undefined })}`} actif={!f.offre}>
          Toutes les offres <Compte n={comptes.total} />
        </Filtre>
        {OFFRES.map((o) => (
          <Filtre key={o.value} href={`/admin${versQuery(f, { offre: o.value })}`} actif={f.offre === o.value}>
            {o.label} <Compte n={comptes.parOffre[o.value] ?? 0} />
          </Filtre>
        ))}
      </nav>
      <nav aria-label="Filtrer par statut" className="mt-3 flex flex-wrap gap-2">
        <Filtre href={`/admin${versQuery(f, { statut: undefined })}`} actif={!f.statut}>
          Tous les statuts
        </Filtre>
        {STATUTS.map((s) => (
          <Filtre key={s.value} href={`/admin${versQuery(f, { statut: s.value })}`} actif={f.statut === s.value}>
            {s.label} <Compte n={comptes.parStatut[s.value] ?? 0} />
          </Filtre>
        ))}
      </nav>

      <section aria-label="Liste des demandes" className={`${card} mt-7 overflow-hidden`}>
        {demandes.length === 0 ? (
          <p className="m-0 px-6 py-10 text-center font-sans text-[15.5px] text-navy/70">
            <MessageVide f={f} />{" "}
            {(f.offre || f.statut || f.q) && (
              <Link href="/admin" className="font-semibold text-cherry underline underline-offset-4">Voir toutes les demandes</Link>
            )}
          </p>
        ) : (
          <>
            {/* Phones: one card per request. */}
            <ul className="m-0 list-none divide-y divide-navy/[0.08] p-0 md:hidden">
              {demandes.map((d) => (
                <li key={d.statut_id}>
                  <Link href={`/admin/demandes/${d.statut_id}`} className="block px-5 py-4 hover:bg-surface">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-condensed text-[18px] font-bold">{d.full_name || "Sans nom"}</span>
                      <span className={statutBadge(d.statut)}>{statutLabel(d.statut)}</span>
                    </div>
                    <div className="mt-1 font-sans text-[14.5px] text-navy/70">
                      {offreLabel(d.offre)} · {d.company || villeDe(d) || d.email} · {date(d.created_at)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {/* Larger screens: a table. */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left font-sans text-[14.5px]">
                <thead className="bg-surface font-condensed text-[13px] uppercase tracking-[1px] text-navy/60">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Reçue le</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Contact</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Entreprise</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Offre</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Statut</th>
                    <th scope="col" className="px-5 py-3 font-semibold">GHL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/[0.08]">
                  {demandes.map((d) => (
                    <tr key={d.statut_id} className="hover:bg-surface">
                      <td className="whitespace-nowrap px-5 py-3 tabular-nums text-navy/70">{date(d.created_at)}</td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/demandes/${d.statut_id}`} className="font-semibold text-navy underline-offset-4 hover:text-cherry hover:underline">
                          {d.full_name || "Sans nom"}
                        </Link>
                        <div className="text-[13.5px] text-navy/60">{d.phone || d.email}</div>
                      </td>
                      <td className="px-5 py-3 text-navy/80">{d.company || villeDe(d) || "—"}</td>
                      <td className="whitespace-nowrap px-5 py-3">{offreLabel(d.offre)}</td>
                      <td className="px-5 py-3"><span className={statutBadge(d.statut)}>{statutLabel(d.statut)}</span></td>
                      <td className="whitespace-nowrap px-5 py-3 text-navy/70">{ghlLabel(d.ghl_status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {demandes.length === LIMITE && (
              <p className="m-0 border-t border-navy/[0.08] px-5 py-3 font-sans text-[13.5px] text-navy/60">
                Les {LIMITE} demandes les plus récentes sont affichées. Affinez les filtres, ou exportez en CSV pour tout voir.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}
