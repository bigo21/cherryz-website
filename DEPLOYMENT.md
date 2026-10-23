# Déploiement — Cherryz

## Modèle 2 branches / 2 domaines (Vercel)

| Branche | Environnement Vercel | Domaine | `MAINTENANCE_MODE` | Visiteur voit |
|---|---|---|---|---|
| `main` | Production | `cherryz.tech` | `off` (site ouvert depuis le 23/10/2026) | Le site complet |
| `preview` | Preview | `preview.cherryz.tech` | *(non défini → OFF)* | Le site complet (WIP) |
| local | Development | `localhost` | *(non défini → OFF)* | Le site complet |

Le portier vit dans [`proxy.ts`](proxy.ts). Il est **fail-safe** : en Production Vercel,
la maintenance est active par défaut même si la variable est oubliée. Un
`MAINTENANCE_MODE` explicite (`on`/`off`) l'emporte toujours.
**Ne pas supprimer `MAINTENANCE_MODE=off` en Production** : sans la variable, le site
repasserait en maintenance au déploiement suivant.

## Mise en place (dashboard Vercel)

1. **Importer le repo** `github.com/bigo21/cherryz-website` dans Vercel.
2. **Production Branch** : Settings → Git → `main`.
3. **Domaine principal** : Settings → Domains → `cherryz.tech` (rattaché à Production).
4. **Domaine de préversion** : Settings → Domains → ajouter `preview.cherryz.tech`
   → l'assigner à la **branche Git `preview`** (sert toujours le dernier déploiement de `preview`).
5. **Variables d'environnement** (Settings → Environment Variables), à définir pour
   **Production ET Preview** sauf indication contraire :

   | Variable | Production | Preview | Note |
   |---|---|---|---|
   | `SUPABASE_URL` | ✓ | ✓ | serveur uniquement (pas de `NEXT_PUBLIC_`) |
   | `SUPABASE_PUBLISHABLE_KEY` | ✓ | ✓ | clé `sb_publishable_…`, serveur uniquement |
   | `RESEND_API_KEY` | ✓ | ✓ | secret (pas de `NEXT_PUBLIC_`) |
   | `RESEND_FROM` | ✓ | ✓ | `Cherryz <noreply@cherryz.tech>` |
   | `QUOTE_NOTIFY_EMAIL` | ✓ | ✓ | `support@cherryz.tech` |
   | `MAINTENANCE_MODE` | `off` | *(laisser vide)* | `on` en Production pour remettre la maintenance |
   | `PREVIEW_SECRET` | ✓ (optionnel) | — | pour prévisualiser une page sur le domaine prod via `?preview=<valeur>` |

6. **Protéger la préversion** : Settings → Deployment Protection → activer
   **Vercel Authentication** sur les déploiements *Preview*, afin que le site WIP ne soit
   visible que par l'équipe connectée (même si l'URL est devinée).

## Flux de travail

1. Développement local sur une branche de feature → site complet visible.
2. Merge dans `preview` → déploiement auto sur `preview.cherryz.tech` (derrière l'auth Vercel) → validation.
3. Merge `preview` → `main` → mise en ligne sur `cherryz.tech`.

## Remettre le site en maintenance

En cas de problème : définir `MAINTENANCE_MODE=on` en **Production** sur Vercel et redéployer
→ toutes les URL servent la page de maintenance (503), sans changement de code. Les
demandes de devis (`/demandes`) restent accessibles. Repasser à `off` + redéployer pour rouvrir.

## Base de données / emails

- Projet Supabase `avdglsgjilrxdiibndwn`, **partagé entre plusieurs projets** : tout ce qui
  concerne Cherryz vit dans le schéma **`cherryz`**, jamais dans `public`.
- Le schéma `cherryz` doit figurer dans Project Settings → Data API → **Exposed schemas**.
- Migrations : [`supabase/migrations`](supabase/migrations) (rejouables sans risque).
- Tables `cherryz.quote_requests` et `cherryz.contact_messages` : RLS insert-only pour `anon` (aucune lecture publique).
- Emails via Resend (domaine `cherryz.tech` vérifié) : notification équipe + confirmation prospect.
