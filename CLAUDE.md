@AGENTS.md

# Règles de design Cherryz

Ces règles viennent du brief de design du 31 octobre 2026. Elles s'appliquent à chaque modification de l'interface. En cas de doute, choisis la solution la plus simple qui respecte ces règles, et signale le doute.

## Principes

- Cherryz est un courtier en connectivité : solide, direct, proche du terrain. Pas une startup générique.
- Toute valeur visuelle vient d'un token déclaré dans `app/globals.css` (`@theme`). Jamais de valeur improvisée.
- Le questionnaire de devis (`components/quote/QuoteWizard.tsx`) est le modèle de qualité pour l'accessibilité et les états.

## Site bilingue (FR / EN)

- Français à la racine, anglais sous `/en`. Les pages vivent dans `app/[lang]/` ; le layout racine est `app/[lang]/layout.tsx`.
- Aucun texte affiché n'est écrit dans un composant : tout passe par les catalogues next-intl `messages/fr.json` (référence) et `messages/en.json`, au format ICU. Les deux fichiers ont exactement les mêmes clés.
- Un changement de texte se fait dans les deux langues à la fois. `npm run i18n:check` doit passer.
- Les règles de typographie de la section Contenu valent pour le français. L'anglais suit les siennes : apostrophe ’, pas d'espace avant ? ! : ;, guillemets “ ”, majuscule au premier mot d'un titre.
- Les liens internes passent par `localize(lang, path)` (`lib/i18n/config.ts`).
- Les pages ajoutées (404, sitemap, etc.) existent dans les deux langues.

## Palette (aucune autre couleur)

| Token | Valeur | Rôle |
| --- | --- | --- |
| `cherry` | #a0042d | Dominante : boutons principaux, prix, marque |
| `cherry-dark` | #7c0530 | Survol et appui des boutons cerise |
| `accent` | #c50c4f | Accent unique sur fond clair : chiffres clés, détails |
| `accent-on-dark` | #ea4883 | Accent sur fond marine uniquement |
| `navy` | #101b28 | Sections sombres, texte principal sur fond clair |
| `ink-2` | #404953 | Texte secondaire sur fond clair |
| `ink-3` | #70767e | Texte tertiaire, sur blanc pur uniquement |
| `on-dark-2` | #cfd1d4 | Texte secondaire sur marine |
| `line` | #e2e3e5 | Bordures, séparateurs |
| `surface` | #f6f5f3 | Fond clair secondaire |
| `cherry-tint` | #f4e1e6 | Fond léger d'un élément mis en avant |

Couleurs de fonction autorisées : vert de confirmation #1f8a5b, vert WhatsApp pour le seul bouton WhatsApp.

À supprimer partout : #a2032d, #101b2b, #e11d63, #ff254f, #c0093a, #6b7280, #4b5563, #374151.

Règles :

- Jamais de texte `cherry` ou `accent` sur fond `navy` (contraste 2.1:1 et 2.9:1). Sur marine : blanc, `on-dark-2` ou `accent-on-dark`.
- L'accent colore des chiffres et des détails, jamais un mot dans un titre.

## Typographie

Barlow Condensed (`font-condensed`) pour titres, chiffres, boutons, libellés. Barlow (`font-sans`) pour le texte à lire. Graisses chargées : Barlow 400, 500, 600 ; Condensed 600, 700.

| Token | Taille | Interlignage | Usage |
| --- | --- | --- | --- |
| `text-display` | clamp(44px, 6.4vw, 84px) | 0.98 | h1 du hero, un seul par page |
| `text-title-lg` | clamp(32px, 4vw, 46px) | 1.05 | h2 de section |
| `text-title-md` | 30px | 1.1 | Grands chiffres, sous-titres |
| `text-title-sm` | 22px | 1.2 | h3 de carte |
| `text-lead` | 18px | 1.6 | Introduction sous un titre |
| `text-body` | 16px | 1.6 | Texte courant, champs |
| `text-small` | 14px | 1.5 | Secondaire, libellés, petits boutons |
| `text-caption` | 13px | 1.4 | Surtitres (majuscules, tracking 0.08em) et mentions légales uniquement |

Correspondances pour migrer l'existant : 15, 15.5, 16.5 px → `text-body` ; 13.5, 14, 14.5 px → `text-small` ; 11 à 12.5 px → `text-caption`, ou `text-small` si le texte doit être lu.

- `display` et `title-lg` : `tracking-tight` et `text-balance`.
- Paragraphes : `max-w-[65ch]`.
- Prix et chiffres : `tabular-nums`.

## Espacement, formes, ombres

- Multiples de 4 px, avec les classes standard uniquement. Dans un élément : 4, 8, 12 (`gap-1` à `gap-3`). Dans un groupe : 16, 20, 24. Entre groupes : 32, 40, 48. Entre sections : `py-20 md:py-28`.
- Correspondances : 9 et 10 px → 8 ; 11, 13, 14 px → 12 ; 17, 18 px → 16 ; 22, 26 px → 24 ; 30, 34 px → 32.
- Proximité : l'espace dans un groupe est toujours plus petit que l'espace entre deux groupes.
- Boutons et badges `rounded-full`, cartes `rounded-2xl`, champs `rounded-xl`. Les grands aplats décoratifs (diagonale cerise) gardent des angles vifs.
- Ombres : `shadow-card` et `shadow-cherry`, rien d'autre.

## Motion

- Courbe unique : `--ease-out-quint` = cubic-bezier(0.22, 1, 0.36, 1).
- Survol et appui : 150 ms. Petits éléments qui entrent : 200 ms, opacité + 8 px. Panneaux : 300 ms (sortie 200 ms), opacité + 12 px. Apparitions au défilement : 400 ms, 12 px.
- Le h1 et le paragraphe du hero s'affichent sans animation (LCP).
- Mouvements permanents autorisés : les ondes du logo (appels finaux, carte de couverture) et le bandeau de logos clients (pause au survol et au focus). Tous s'arrêtent avec `prefers-reduced-motion`.
- Aucune autre animation infinie.

## États et accessibilité (obligatoires)

- Survol en classes Tailwind, jamais en style inline. Appui : `active:scale-[0.97]`. Désactivé : opacité 60 %, `cursor-not-allowed`.
- Focus : le style global (contour 2 px, décalage 2 px, `accent` sur fond clair, `accent-on-dark` sur marine). Ne jamais le retirer.
- Erreurs de formulaire : message sous le champ, `aria-invalid`, `aria-describedby`, focus sur le premier champ en erreur.
- Contraste ≥ 4.5:1 pour le texte, ≥ 3:1 pour les grands titres et icônes utiles.
- Cibles tactiles ≥ 44 × 44 px.
- Un h1 par page, puis h2, puis h3. Jamais de h4 sous un h2.
- `aria-current="page"` sur le lien actif. Menu mobile fermé par Échap, focus rendu au bouton.
- Liens au libellé explicite (pas « En savoir plus »). Lien vers un nouvel onglet : icône + texte masqué « (nouvel onglet) ».

## Contenu (formulations qui font foi)

- Prix : « de 45 000 à 70 000 XAF/Mbps/mois » ; accroche : « dès 45 000 XAF/Mbps ».
- Délais : « premier appel sous 24h » et « devis sous 48h, ou après la descente sur site ».
- Cas WiFi Zone : titre « Ce que votre WiFi Zone pourrait rapporter ».
- Adresse : « Quartier Fouda, Yaoundé ».
- Le processus de l'accueil (général) et ceux de chaque offre (spécifiques) restent différents volontairement.
- Typographie française : apostrophe ’, espace insécable avant ? ! : ; et dans « », majuscule au premier mot d'un titre seulement, « WiFi ».
- Pas de flèche « → » tapée : icône SVG avec `aria-hidden`.
- Nombres en français : espace fine insécable (U+202F) pour les milliers (« 45 000 »), espace insécable avant « % » (« 50 % »), vrai signe moins U+2212 (« −50 % »). Exception : l’image de partage (`opengraph-image.tsx`, rendue par Satori) n’a pas le glyphe U+202F, ses textes gardent U+00A0.
- Toute icône décorative (dans un lien ou un bouton qui a déjà un texte ou un `aria-label`) porte `aria-hidden`. Les icônes de `components/site/icons.tsx` l’ont par défaut ; une icône SVG écrite ailleurs l’ajoute elle-même.
- Ne modifie jamais un texte de contenu sans le signaler.

## Interdits

- Valeurs entre crochets pour une taille, un espacement, une couleur, une ombre ou une durée. Exceptions : `max-w-[65ch]`, `active:scale-[0.97]`, `sm:min-w-[280px]` (cartes de la page WiFi Zone).
- Styles inline, sauf une variable CSS pour une valeur calculée.
- Couleur hexadécimale dans un composant.
- Badge pilule au-dessus d'un h1, mot coloré dans un titre, surtitre dans chaque section (deux par page au plus).
- Grille avec une case vide : nombre de cartes = multiple du nombre de colonnes.
- Photos génériques de bureau ; emojis ; dégradés violets ; illustrations 3D.
- Logo en PNG lourd : SVG, ou PNG à 2× de moins de 10 Ko.

## Vérifications avant chaque commit

- `npm run lint`, `npm run i18n:check` et `npm run build` passent.
- `grep -rn "\-\[" app components` ne trouve que les exceptions autorisées.
- `grep -rn "style=" app components` ne trouve que des variables CSS.
- Captures à 375 et 1280 px des pages modifiées.
