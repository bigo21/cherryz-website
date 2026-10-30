import type { Localized } from "@/lib/i18n/config";

const fr = {
  meta: {
    title: "Cherryz | L'Internet professionnel au meilleur prix, partout au Cameroun",
    description:
      "Cherryz agrège les solutions des grands opérateurs (Camtel, Orange, MTN) pour une connexion dédiée, stable et jusqu'à 50% moins chère. Internet B2B avec IP publique et WiFi Zone monétisable.",
  },
  hero: {
    title: "On compare les opérateurs pour vous.",
    lead: "Internet professionnel moins cher ou WiFi Zone rentable : Cherryz met Camtel, Orange, MTN et d'autres en concurrence, puis vous livre la meilleure solution, partout au Cameroun.",
    pathLabel: "Votre projet",
    tabs: { ip: "Connecter mon entreprise", wifi: "Lancer une WiFi Zone" },
    trust: ["Régulée ART", "Partenaire Camtel · Orange · MTN", "Visite technique gratuite"],
  },
  broker: {
    title: "Un courtier, pas un opérateur de plus.",
    lead: "Les entreprises camerounaises paient entre 90 000 et 180 000 XAF/Mbps/mois en allant directement chez un opérateur. Cherryz analyse votre besoin, met nos opérateurs partenaires en concurrence et vous livre la solution la plus adaptée, techniquement et financièrement.",
    diagram: {
      label:
        "Schéma : Camtel, Orange, MTN et d'autres opérateurs proposent leurs offres à Cherryz, qui compare, négocie et livre une seule connexion à votre site.",
      others: "Autres opérateurs",
      hub: "compare · négocie",
      connection: "1 CONNEXION",
      site: "Votre site",
      siteSub: "1 contrat · 1 interlocuteur",
    },
  },
  compare: {
    title: "Seul chez un opérateur, ou avec Cherryz",
    caption: "Aller seul chez un opérateur, comparé à passer par Cherryz",
    criterion: "Critère",
    alone: "Seul, chez un opérateur",
    aloneShort: "Seul",
    cherryz: "Avec Cherryz",
    rows: [
      { label: "Prix / Mbps / mois", alone: "90 000 – 180 000 XAF", cherry: "45 000 – 70 000 XAF", check: false },
      { label: "Installation", alone: "Travaux lourds, délais longs", cherry: "Rapide, sans génie civil", check: false },
      { label: "Choix technologique", alone: "Limité à 1 opérateur", cherry: "Multi-opérateurs, meilleure option", check: false },
      { label: "Support", alone: "Standard, file d'attente", cherry: "Dédié, réactif, de proximité", check: false },
      { label: "Flexibilité", alone: "Contrats rigides", cherry: "Sur-mesure, évolutif", check: false },
      { label: "Test préalable", alone: "Rarement possible", cherry: "Test en parallèle disponible*", check: true },
    ],
    footnote: "*Contrat signé devant notaire requis avant le lancement du test.",
  },
  field: {
    title: "Sur place, de l'étude à l'installation.",
    lead: "Chaque projet est unique : nous ne publions pas de grille tarifaire figée. Votre prix se construit après avoir compris votre besoin, sur place, partout au Cameroun.",
    photoAlt: "Technicien installant un équipement réseau dans une baie",
    sheet: "Le déroulé",
    sheetNote: "Étude sur site gratuite",
    steps: [
      { t: "Écoute", d: "On comprend votre activité, vos usages, vos contraintes." },
      { t: "Étude", d: "Descente gratuite sur site : analyse de faisabilité technique." },
      { t: "Solution", d: "On assemble la meilleure offre parmi nos partenaires opérateurs." },
      { t: "Cotation", d: "Prix transparent, adapté à votre budget réel." },
      { t: "Déploiement", d: "Installation rapide, sans interruption de votre activité." },
      { t: "Suivi", d: "SAV dédié, monitoring, intervention rapide." },
    ],
    cta: "Commencer par le questionnaire",
  },
  offers: {
    title: "Deux offres, un seul interlocuteur.",
    quote: "Obtenir mon devis",
    discover: (label: string) => `Découvrir l'offre ${label}`,
    ip: {
      label: "Internet B2B",
      title: "Une connexion dédiée, avec IP publique fixe",
      rows: [
        ["Pour qui", "Entreprises, institutions, organisations"],
        ["Ce que vous obtenez", "Internet dédié avec IP fixe, bande passante garantie"],
        ["L'atout", "Performance pro à prix réduit"],
      ],
    },
    wifi: {
      label: "WiFi Zone",
      title: "Un espace connecté qui vous rapporte",
      rows: [
        ["Pour qui", "Entrepreneurs, gestionnaires d'immeubles, investisseurs"],
        ["Ce que vous obtenez", "Point d'accès Internet partagé et monétisé"],
        ["L'atout", "Générer des revenus avec la connectivité"],
      ],
    },
  },
  clients: { title: "Ils nous font confiance", note: "Entreprises, hôtels, institutions" },
};

const en: typeof fr = {
  meta: {
    title: "Cherryz | Business Internet at the best price, everywhere in Cameroon",
    description:
      "Cherryz brings together the offers of the major operators (Camtel, Orange, MTN) for a dedicated, stable connection at up to 50% less. Business Internet with a public IP, and revenue-generating WiFi Zones.",
  },
  hero: {
    title: "We compare the operators for you.",
    lead: "Cheaper business Internet or a profitable WiFi Zone: Cherryz puts Camtel, Orange, MTN and others in competition, then delivers the best solution, anywhere in Cameroon.",
    pathLabel: "Your project",
    tabs: { ip: "Connect my business", wifi: "Launch a WiFi Zone" },
    trust: ["ART-licensed", "Camtel · Orange · MTN partner", "Free site survey"],
  },
  broker: {
    title: "A broker, not one more operator.",
    lead: "Cameroonian businesses pay between 90,000 and 180,000 XAF per Mbps per month when they go straight to an operator. Cherryz studies your needs, puts our partner operators in competition and delivers the best-suited solution, technically and financially.",
    diagram: {
      label:
        "Diagram: Camtel, Orange, MTN and other operators submit their offers to Cherryz, which compares, negotiates and delivers a single connection to your site.",
      others: "Other operators",
      hub: "compare · negotiate",
      connection: "1 CONNECTION",
      site: "Your site",
      siteSub: "1 contract · 1 contact",
    },
  },
  compare: {
    title: "On your own with an operator, or with Cherryz",
    caption: "Going straight to an operator, compared with going through Cherryz",
    criterion: "Criterion",
    alone: "On your own, with an operator",
    aloneShort: "Alone",
    cherryz: "With Cherryz",
    rows: [
      { label: "Price / Mbps / month", alone: "90,000 – 180,000 XAF", cherry: "45,000 – 70,000 XAF", check: false },
      { label: "Installation", alone: "Heavy works, long lead times", cherry: "Fast, no civil works", check: false },
      { label: "Choice of technology", alone: "Limited to 1 operator", cherry: "Multi-operator, best option", check: false },
      { label: "Support", alone: "Standard, call queue", cherry: "Dedicated, responsive, local", check: false },
      { label: "Flexibility", alone: "Rigid contracts", cherry: "Tailored, scalable", check: false },
      { label: "Trial", alone: "Rarely possible", cherry: "Side-by-side trial available*", check: true },
    ],
    footnote: "*A contract signed before a notary is required before the trial starts.",
  },
  field: {
    title: "On site, from survey to installation.",
    lead: "Every project is different: we don't publish a fixed price list. Your price is built once we understand your needs, on site, anywhere in Cameroon.",
    photoAlt: "Technician installing network equipment in a rack",
    sheet: "How it goes",
    sheetNote: "Free site survey",
    steps: [
      { t: "Listening", d: "We get to know your business, your uses and your constraints." },
      { t: "Survey", d: "Free visit to your site: technical feasibility study." },
      { t: "Solution", d: "We put together the best offer from our partner operators." },
      { t: "Quote", d: "Transparent pricing, matched to your real budget." },
      { t: "Deployment", d: "Fast installation, without interrupting your business." },
      { t: "Follow-up", d: "Dedicated after-sales support, monitoring, fast response." },
    ],
    cta: "Start with the questionnaire",
  },
  offers: {
    title: "Two offers, one single contact.",
    quote: "Get my quote",
    discover: (label: string) => `Explore the ${label} offer`,
    ip: {
      label: "Business Internet",
      title: "A dedicated connection, with a fixed public IP",
      rows: [
        ["For", "Companies, institutions, organisations"],
        ["What you get", "Dedicated Internet with a fixed IP, guaranteed bandwidth"],
        ["The edge", "Professional performance at a lower price"],
      ],
    },
    wifi: {
      label: "WiFi Zone",
      title: "A connected space that earns you money",
      rows: [
        ["For", "Entrepreneurs, building managers, investors"],
        ["What you get", "A shared, monetised Internet access point"],
        ["The edge", "Turning connectivity into revenue"],
      ],
    },
  },
  clients: { title: "They trust us", note: "Companies, hotels, institutions" },
};

export const home: Localized<typeof fr> = { fr, en };
