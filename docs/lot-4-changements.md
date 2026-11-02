# Lot 4 · Migration vers le système

Branche `design/lot-4`, à partir de `design/lot-3`. Ce document liste ce qui change à l’écran et dans le contenu. Le reste est une migration sans effet voulu sur le rendu : toutes les valeurs entre crochets et tous les styles inline passent par les tokens de `app/globals.css`.

## Vérifications

- `grep -rn "\-\[" app components` ne trouve que `max-w-[65ch]` et `active:scale-[0.97]`.
- `grep -rn "style=" app components` ne trouve que des variables CSS (`--progress`, `--reveal-delay`, couleurs de l’illustration de maintenance). Seule l’image de partage (`opengraph-image.tsx`) garde des styles inline : son moteur (Satori) n’accepte que ceux-là.
- Plus aucune couleur hexadécimale dans les composants, sauf le teint de peau de l’illustration de maintenance (`#B87B52`), seule couleur hors palette, gardé comme exception documentée.

## Système

- **Tailles de texte** : correspondances du CLAUDE.md. `text-caption` est réservé aux surtitres et aux mentions. Les textes d’aide du questionnaire et le « au lieu de 90 000 – 180 000 » de l’accueil passent en `text-small`.
- **Espacements** : multiples de 4 px. Toutes les sections passent en `py-20 md:py-28`.
- **Formes** : tous les boutons sont en `rounded-full`. Ceux de la page maintenance et du questionnaire étaient en `rounded-xl`.
- **Ombres** : seulement `shadow-card` et `shadow-cherry`. Les ombres de texte du hero et le halo du logo de l’appel final sont retirés.
- **Grilles sans case vide** :
  - Internet B2B, « Ce que Cherryz vous apporte » : la carte Multi-opérateurs occupe une colonne au lieu de deux, ce qui fait 8 cases pleines sur 2 et sur 4 colonnes.
  - WiFi Zone, « Pourquoi Cherryz » : la carte « bande passante » devient la première de 6 cartes, sur fond `cherry-tint`. L’exception `sm:min-w-[280px]` n’est plus utilisée et sort du CLAUDE.md.
- **Surfaces décoratives** : la diagonale cerise des en-têtes devient un aplat `cherry` (sans dégradé), d’une seule forme sur toutes les pages. Les halos et les voiles sur photo sont des utilitaires de `globals.css`.
- **Contrastes** :
  - Les textes `navy/xx` deviennent `ink-2`, et les textes `white/xx` deviennent `on-dark-2`.
  - La phrase « Vous préférez nous parler directement ? » de /demandes passe en `text-ink-2`.
  - Les numéros 01 à 06 de « Notre approche » passent de `cherry` à 30 % (moins de 3:1) à `accent`.
  - Les bordures des champs passent en `field`, voir les retours de l’audit plus bas.

## États et motion

- **Appui** : `active:scale-[0.97]` sur tous les boutons. **Désactivé** : opacité 60 % et `cursor-not-allowed`. Les survols qui faisaient monter les boutons sont retirés : le survol change la couleur, l’appui réduit le bouton.
- **Focus** : les surcharges locales sont retirées (`focus:outline-none`, `focus-visible:outline-cherry`, `outline-none` des titres qui reçoivent le focus). Le style global s’applique partout.
- **Transitions** : 150 ms par défaut, sur la courbe `ease-out-quint`.
- **Entrées** :
  - Petits éléments : 200 ms et 8 px.
  - Panneaux : 300 ms et 12 px. Le panneau de succès glisse au lieu de grossir.
  - Décalages en cascade du hero et de la page maintenance : retirés.
- **Apparitions au défilement** : 400 ms et 12 px, à la première entrée à l’écran. Le petit composant `RevealObserver` déclenche l’animation au lieu de l’animation liée au défilement. Les blocs déjà visibles au chargement ne clignotent pas, et le contenu reste visible sans JavaScript.
- **Animations** :
  - Le badge « Dès 45 000 » ne flotte plus.
  - Le bandeau de logos clients se met en pause au survol et au focus. Le groupe peut recevoir le focus au clavier et porte un libellé.
  - Les ondes de l’appel final utilisent la courbe du site.

## Changements de contenu

Les mots des textes restants ne changent pas. Ces changements viennent des interdits du CLAUDE.md :

1. **Badge pilule au-dessus du h1** : retiré sur l’accueil, Internet B2B, WiFi Zone, Contact et /demandes, ainsi que dans le questionnaire IP et WiFi. Le surtitre reste, en texte simple.
2. **Mot coloré dans un titre** : « meilleur prix. » (accueil, Internet B2B) et « tout. » (WiFi Zone) ne sont plus colorés. La balise `<accent>` est retirée des catalogues.
3. **Deux surtitres par page au plus** : on garde celui du hero et celui de la première section. Les surtitres retirés (clés supprimées des deux catalogues) :
   - `Home.approach.eyebrow` : NOTRE APPROCHE / OUR APPROACH
   - `Home.services.eyebrow` : NOS SERVICES / OUR SERVICES
   - `Home.trust.eyebrow` : ILS NOUS FONT CONFIANCE / THEY TRUST US
   - `InternetB2B.brings.eyebrow` : CE QUE CHERRYZ VOUS APPORTE / WHAT CHERRYZ BRINGS YOU
   - `InternetB2B.how.eyebrow` : COMMENT ÇA MARCHE / HOW IT WORKS
   - `WifiZone.method.eyebrow` : NOTRE MÉTHODE / OUR METHOD
   - `WifiZone.why.eyebrow` : POURQUOI CHERRYZ / WHY CHERRYZ
   - `WifiZone.cases.eyebrow` : CAS D’USAGE CONCRETS / REAL-WORLD USE CASES
4. **Textes ajoutés aux catalogues** (ils étaient écrits dans les composants, ou n’existaient pas) :
   - `Maintenance.whatsappLabel` : WhatsApp / WhatsApp (affiché en majuscules, comme avant)
   - `Maintenance.emailLabel` : E-mail / Email (avant : « EMAIL » écrit dans le composant)
   - `Home.trust.marqueeLabel` : « Logos de nos clients (défilement en pause au survol ou au focus) » / “Our clients’ logos (scrolling pauses on hover or focus)”, lu par les lecteurs d’écran seulement

## Retours de l’audit

1. **Pictogramme des appels finaux** : sur l’aplat cerise, le pictogramme en couleur n’avait plus que 1.3:1 de contraste. Il passe en version monochrome blanche, `public/brand/cherryz-pictogramme-blanc.svg`.
5. **Logos en SVG** : `cherryz-logo-blanc.svg` remplace `logo-white@2x.png` dans le menu, le pied de page, la page de maintenance, l’en-tête des questionnaires et l’image de partage. Dans le menu et l’en-tête des questionnaires, le lien porte déjà son `aria-label` : le logo y est `aria-hidden`, avec `alt=""`. Le manifeste de provenance C2PA (`<metadata>`) est retiré des quatre SVG, ce qui divise leur poids par deux à quatre. Les PNG inutilisés sont supprimés (`logo-color.png`, `logo-white.png`, `logo-white@2x.png`, `pictogram.png`, `pictogram-white@2x.png`). `cherryz-logo-couleur.svg` n’a pas encore d’usage : aucun logo n’est affiché sur fond clair aujourd’hui. `cherryz-pictogramme.svg` est gardé pour le futur favicon.
2. **Teint de peau** (`#B87B52`) : gardé, documenté comme exception dans CLAUDE.md.
3. **Bordures de champ** : nouveau token `field` (#70767e, 4.6:1 sur blanc). Il s’applique aux champs du formulaire de contact et du questionnaire, aux options du questionnaire (choix, échelle 1 à 5, case de consentement) et au bouton de géolocalisation. `line` reste pour les cartes et les séparateurs. Le bouton « Précédent » garde `line`, comme les autres boutons secondaires.
4. **Diagonale sur mobile** : sous md, elle devient un triangle de 64 px dans le coin supérieur droit, sans texte dessus. Le changement est dans l’utilitaire `diagonal-cherry`, donc il vaut pour tous les en-têtes qui l’utilisent : Contact, appels finaux, /demandes et ses deux questionnaires, page de maintenance.

## Questions pour l’audit (répondues)

1. Le teint de peau de l’illustration de maintenance (`#B87B52`) est hors palette. Faut-il le garder comme exception, le remplacer par un gris de la palette, ou changer d’illustration ?
2. Les bordures des champs sont en `line` (#e2e3e5, 1.3:1 sur blanc). Pour atteindre 3:1 (WCAG 1.4.11), il faudrait `ink-3`, ce qui détourne un token de texte. Faut-il un token de bordure de champ ?
3. Sur mobile, la diagonale cerise de l’appel final et de l’en-tête de Contact passe sous le paragraphe. Le contraste reste suffisant (`on-dark-2` sur `cherry` : 5.3:1), mais la lecture est moins confortable. C’était déjà le cas avant le lot.
