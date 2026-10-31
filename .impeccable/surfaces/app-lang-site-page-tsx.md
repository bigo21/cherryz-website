---
version: 1
slug: "app-lang-site-page-tsx"
primary_target: "app/[lang]/(site)/page.tsx"
related_targets: []
---

# Accueil (/) — surface brief

Scope: home page of the public site, mode **Persuade**. Pilot of the "connectivity, image-rich" exploration, version 3 of 3 on branch `refonte-couverture` (version 1: `refonte-mur`; version 2: `refonte-faisceaux`). Other pages follow once a version is chosen.
Audience: Cameroonian decision makers for both offers, equal weight (DG/DSI for Internet B2B; entrepreneurs, owners, investors for WiFi Zone). Often on mobile, sometimes on slow connections.
Job / action: pick a path within seconds, read coverage at a glance, see the broker logic on real figures, open the matching quote questionnaire or WhatsApp.
Proof on hand: operator partners, client logos, ART regulation, price ranges as labelled estimates. Photos are illustrative: captioned as such. The map is schematic (Natural Earth outline, regional capitals), not a coverage survey.
Constraints (user, 2026-10-30): image-rich, every photo of the original site used; the quote-book / ticket / stamp world is rejected; GSAP and Motion, scroll-scripted, content readable without them; `fond-*` photos only as small thumbnails; logo, cherry/navy, two offers, questionnaires and FR/EN unchanged.

## Direction contract

THESIS: A guide map of coverage. Every covered place is a flat cherry lobe (the union of access points' discs) with its photograph cropped inside; Cameroon itself is the plan the story is drawn on. It refuses the operator default of a stock hero and a row of equal offer cards.

OWN-WORLD: Flat colour, no grain, no shadow, no gradient. Navy sea (#101b28), sand land (#f5e2c8, edge #ead0ad), cherry coverage (#a2032d), pale sea (#e9eef3) for reading passages, white. White littoral as the strongest line; dashed white borders for neighbours. Lobes as SVG disc unions (hero, map, diagrams) or CSS organic radii (`.lobe`, `.lobe-b`, `.lobe-c`). Numbered navy pins and a map key. Barlow Condensed display, Barlow body. Pills for the path choice; square buttons for actions.

STORY: The visitor's place sits inside a coverage lobe; the map shows Cherryz in Yaoundé serving the country (coast, operator networks, covered areas); they set their bandwidth (road thickness, price bars) or their WiFi reach (lobe size); follow six numbered stops; read the two offers as two districts; see seven places a WiFi Zone covers; open the questionnaire.

FIRST VIEWPORT: Navy ground. A cherry-ringed lobe spills off the top and right edges with Yaoundé at dusk inside (B2B) or the residence with its rooftop antenna (WiFi Zone), labelled like a district. Title, lead, path pills, cherry quote button and trust line on the left. Caption bottom right.

SIGNATURE: Lobes inflate on arrival and re-form between one dedicated site and five overlapping access points on path switch (Motion springs on the clip discs). Scroll: sticky map on wide screens where the coastline and border draw, then the operator networks, then the coverage lobes around every regional capital (GSAP scrub, DrawSVG); chapter and step photos open as a circle spreading; the six-stop itinerary fills in cherry; the seven districts open in turn. Off under reduced motion; all content readable without JavaScript.

FORM: A real country outline (Natural Earth 1:10m, equirectangular, simplified) as the stage; coverage expressed as discs, never as gradients or glows.

FINISH: unreviewed and undocumented is unfinished; the chosen version ends with the finish review, the verdict and DESIGN.md.
