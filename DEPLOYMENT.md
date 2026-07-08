# Déploiement — Cherryz

## Modèle 2 branches / 2 domaines (Vercel)

| Branche | Environnement Vercel | Domaine | `MAINTENANCE_MODE` | Visiteur voit |
|---|---|---|---|---|
| `main` | Production | `cherryz.tech` | *(non défini → ON par défaut)* | **Uniquement la Maintenance** (503 partout) |
| `preview` | Preview | `preview.cherryz.tech` | *(non défini → OFF)* | Le site complet (WIP) |
| local | Development | `localhost` | *(non défini → OFF)* | Le site complet |

Le portier vit dans [`proxy.ts`](proxy.ts). Il est **fail-safe** : en Production Vercel,
la maintenance est active par défaut même si la variable est oubliée. Un
`MAINTENANCE_MODE` explicite (`on`/`off`) l'emporte toujours.

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
   | `NEXT_PUBLIC_SUPABASE_URL` | ✓ | ✓ | |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✓ | ✓ | clé `sb_publishable_…` |
   | `RESEND_API_KEY` | ✓ | ✓ | secret (pas de `NEXT_PUBLIC_`) |
   | `RESEND_FROM` | ✓ | ✓ | `Cherryz <noreply@cherryz.tech>` |
   | `QUOTE_NOTIFY_EMAIL` | ✓ | ✓ | `support@cherryz.tech` |
   | `MAINTENANCE_MODE` | *(laisser vide)* | *(laisser vide)* | Prod auto-gated, Preview ouvert |
   | `PREVIEW_SECRET` | ✓ (optionnel) | — | pour prévisualiser une page sur le domaine prod via `?preview=<valeur>` |

6. **Protéger la préversion** : Settings → Deployment Protection → activer
   **Vercel Authentication** sur les déploiements *Preview*, afin que le site WIP ne soit
   visible que par l'équipe connectée (même si l'URL est devinée).

## Flux de travail

1. Développement local sur une branche de feature → site complet visible.
2. Merge dans `preview` → déploiement auto sur `preview.cherryz.tech` (derrière l'auth Vercel) → validation.
3. Merge `preview` → `main` → `cherryz.tech` reste en maintenance (le public ne voit rien de neuf).
4. **Jour du lancement** : définir `MAINTENANCE_MODE=off` en **Production** sur Vercel et redéployer → le site s'ouvre, sans changement de code.

## Base de données / emails

- Migration Supabase : [`supabase/migrations`](supabase/migrations) (déjà appliquée au projet `avdglsgjilrxdiibndwn`).
- Table `quote_requests` : RLS insert-only pour `anon` (aucune lecture publique).
- Emails via Resend (domaine `cherryz.tech` vérifié) : notification équipe + confirmation prospect.
