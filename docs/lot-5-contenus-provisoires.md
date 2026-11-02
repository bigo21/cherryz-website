# Lot 5 · Identité

Branche `design/lot-5`, à partir de `design/lot-4`. Ce lot ajoute le nouveau hero, la bande de preuves, la carte « Partout au Cameroun » et les témoignages.

Cherryz n’a pas encore fourni ses contenus. Les villes, les chiffres, les témoignages et les photos sont donc **provisoires**. Chacun est signalé de trois façons :

- une étiquette visible sur la page, par exemple « Photo provisoire, à remplacer » (composant `PlaceholderTag`) ;
- un attribut `data-placeholder` dans le HTML ;
- une entrée dans la liste ci-dessous.

Rien de tout cela ne doit être mis en ligne en l’état.

## Contenus à remplacer

| Contenu | Où | Fichier | `data-placeholder` |
| --- | --- | --- | --- |
| Photo du hero de l’accueil | Accueil | `public/photos/provisoire/accueil-hero.jpg` | `photo` |
| Photo du hero d’Internet B2B | Internet B2B | `public/photos/provisoire/b2b-hero.jpg` | `photo` |
| Photo du hero de WiFi Zone | WiFi Zone | `public/photos/provisoire/wifi-hero.jpg` | `photo` |
| Les quatre chiffres de la bande de preuves | Accueil | `messages/*.json`, `Home.proof` | `figures` |
| Villes couvertes et opérateurs de chaque ville | Accueil (carte), Internet B2B et WiFi Zone (petite carte) | `lib/site/coverage.ts` | `cities` |
| Les trois témoignages | Accueil | `messages/*.json`, `Home.testimonials` | `testimonials` |

Pour remplacer un contenu, on change ses données, puis on retire son étiquette :

- **Photo** : déposer la photo de terrain, mettre à jour `lib/site/placeholders.ts`, puis retirer `PlaceholderTag` du hero (`components/site/PageHero.tsx`).
- **Chiffres** : `components/site/ProofBand.tsx`.
- **Villes** : `components/site/CoverageSection.tsx`.
- **Témoignages** : `components/site/Testimonials.tsx`.

`grep -rn "PlaceholderTag" app components` liste les étiquettes qui restent.

## Valeurs d’exemple

- **Chiffres** : « Dès 45 000 XAF/Mbps/mois » (le vrai prix d’appel), « 5 opérateurs partenaires », « 120 entreprises clientes », « 12 villes couvertes ».
- **Opérateurs** : Orange, MTN, Camtel, Nexttel, YooMee.
- **Villes** : Yaoundé, Douala, Bafoussam, Bamenda, Buea, Kribi, Ebolowa, Bertoua, Ngaoundéré, Garoua, Maroua, Nkongsamba. Les opérateurs attribués à chaque ville sont inventés.
- **Témoignages** : trois clients fictifs, présentés par prénom et initiale, sans nom d’entreprise réel :
  - Serge N., cabinet comptable, Yaoundé : « 40 % d’économie sur notre connexion » ;
  - Clarisse M., hôtel, Kribi : « Une IP fixe installée en 5 jours » ;
  - Aïcha B., restaurant, Garoua : « 150 000 XAF par mois avec notre WiFi Zone ».

Les vrais témoignages ont besoin de l’accord écrit des clients (brief, section « À fournir par Cherryz »).

## Photos : licence et crédits

Les trois photos viennent de Wikimedia Commons, sous licence **CC BY-SA 4.0**. Cette licence impose de créditer l’auteur et d’indiquer la licence. L’étiquette de chaque photo le fait, avec un lien vers la page source. Si une photo reste en ligne, son crédit doit rester visible.

| Photo | Auteur | Source |
| --- | --- | --- |
| Accueil : technicien télécom sur un poteau | Johnkekam | [Agent telecoms.jpg](https://commons.wikimedia.org/wiki/File:Agent_telecoms.jpg) |
| Internet B2B : espace de travail à Douala | Minette Lontsie | [Ernest Chi Masterclass…](https://commons.wikimedia.org/wiki/File:Ernest_Chi_Masterclass_Photograhie_au_cameroun_-_Projet_Nos_Jardins.jpg) |
| WiFi Zone : restaurant à Douala | Minette Lontsie | [Groupe de wikimédiens…](https://commons.wikimedia.org/wiki/File:Groupe_de_wikimediens_dans_un_restaurant_%C3%A0_Douala_apr%C3%A8s_sortie_photo_Wiki_Loves_Africa.jpg) |

Ces photos montrent des personnes reconnaissables, et celle d’Internet B2B montre les bannières d’un autre projet (Wiki Loves Africa). Elles conviennent pour une maquette, pas pour la mise en ligne. Elles remplacent les trois images générées des anciens heroes (`accueil-hero.jpg`, `b2b-hero.jpg`, `wifi-hero.jpg`), qui sont supprimées.

Le contour de la carte vient de Natural Earth (1:10m, domaine public). Il est simplifié et projeté dans `lib/site/coverage.ts`.

## Ce qui change à l’écran

- **Hero (accueil, Internet B2B, WiFi Zone)** :
  - le texte est aligné à gauche, et la photo reste visible sur la moitié droite, sous un voile marine qui va de gauche à droite (`scrim-hero-side`) ;
  - sur mobile, le voile couvre toute la photo, sous le texte ;
  - la photo est l’élément LCP : elle porte `preload`, `fetchPriority="high"` et `sizes="100vw"` (elle couvre toute la largeur).
- **Accueil, dans l’ordre du brief** :
  - hero ;
  - bande de preuves, qui remplace la barre de réassurance (celle-ci reste sur Internet B2B) ;
  - « Pourquoi Cherryz » et le comparatif ;
  - carte ;
  - « Notre approche », avec des cartes compactes sans photo sous 640 px ;
  - services ;
  - témoignages ;
  - références ;
  - appel final.
- **Carte** :
  - sur fond marine, avec un point par ville, les anneaux du logo et une onde de 2,4 s décalée de ville en ville ;
  - l’onde est figée avec `prefers-reduced-motion` et en pause hors de l’écran (`WavesObserver`, qui s’applique aussi aux ondes des appels finaux) ;
  - à partir de md, chaque ville est un bouton qui affiche son nom et ses opérateurs au survol et au focus ;
  - sous md, la même information est une liste sous la carte.
- **Petite carte** : sur Internet B2B, après « Ce que Cherryz vous apporte », et sur WiFi Zone, après « Pourquoi Cherryz ». Les villes sont citées dans le texte.

## Changements de contenu

1. **Titre du hero de l’accueil** : « Partout au Cameroun. » est retiré, et le titre devient « L’Internet professionnel au meilleur prix. » (EN : “Business Internet at the best price.”). C’est la carte qui porte désormais ce message, comme le demande le brief.
2. **Textes alternatifs des trois photos de hero** : ils décrivent les nouvelles photos.
3. **Nouveaux textes** :
   - `Home.proof` (bande de preuves) ;
   - `Coverage` (carte) ;
   - `Home.testimonials` (témoignages) ;
   - `Placeholder` (étiquettes).

## Questions pour l’audit

1. **Titre du hero d’Internet B2B** : « Internet dédié, IP fixe. Le meilleur du réseau camerounais, au meilleur prix. » tient sur quatre lignes à 1280 px, alors que le brief en veut deux au plus. Il faut le raccourcir, par exemple « Internet dédié, IP fixe, au meilleur prix. ». C’est un changement de contenu : je ne l’ai pas fait.
2. **Nombre d’opérateurs** : la bande de preuves dit « 5 opérateurs partenaires ». La barre de réassurance (« Partenaire Camtel · Orange · MTN ») et les logos de partenaires n’en montrent que trois. Il faut aligner les trois quand Cherryz donnera sa vraie liste.
3. **Étiquettes « à remplacer »** : elles sont visibles pour tout le monde. Faut-il les réserver aux préversions, avec une variable d’environnement ? Pour les photos, le crédit doit rester visible tant qu’elles sont en ligne.
