import type { Localized } from "@/lib/i18n/config";

const fr = {
  meta: {
    title: "Internet B2B avec IP publique dédiée | Cherryz",
    description:
      "Internet professionnel dédié avec IP fixe, à partir de 45 000 XAF/Mbps/mois. Multi-opérateurs (Camtel, Orange, MTN), installation rapide sans génie civil, IP dédiée incluse, test avant engagement.",
  },
  hero: {
    title: "Internet dédié. IP fixe.",
    lead: "Cherryz sélectionne pour vous la meilleure infrastructure parmi nos partenaires opérateurs (Camtel, Orange, MTN) et vous livre une connexion professionnelle avec IP dédiée, sans travaux et sans interruption.",
    how: "Comment ça marche",
    facts: ["Régulée ART", "IP dédiée incluse", "Installation sans génie civil"],
  },
  ip: {
    title: "Qu'est-ce qu'une IP publique dédiée ?",
    lead: "Votre adresse IP publique, c'est l'identité de votre entreprise sur Internet. Elle est indispensable pour faire tourner vos outils métier les plus sensibles.",
    point: "Avec Cherryz, votre IP est dédiée : personne d'autre ne la partage, et votre bande passante est garantie en permanence.",
    sheet: "Ce qu'elle vous permet",
    usages: [
      { t: "Sécuriser vos VPN inter-agences", d: "Reliez vos sites en toute confidentialité." },
      { t: "Héberger vos serveurs internes", d: "Accessibles à distance, en toute sécurité." },
      { t: "Call centers & systèmes VoIP", d: "Une voix claire, sans coupure." },
      { t: "Conformité de vos transactions", d: "Indispensable pour vos flux financiers." },
      { t: "Vidéosurveillance en temps réel", d: "Vos caméras accessibles où que vous soyez." },
    ],
  },
  features: {
    title: "Une connexion pro, sans les contraintes d'un opérateur.",
    items: [
      { t: "Multi-opérateurs", d: "On choisit le meilleur réseau pour votre localisation, pas celui d'un fournisseur unique." },
      { t: "Installation rapide", d: "Faisceaux hertziens : pas de génie civil, pas de tranchées." },
      { t: "IP dédiée incluse", d: "Votre adresse, rien qu'à vous. Personne d'autre ne la partage." },
      { t: "Test en parallèle", d: "Testez sans quitter votre opérateur actuel*." },
      { t: "Couverture nationale", d: "Partout au Cameroun via nos partenaires." },
      { t: "SAV de proximité", d: "Équipe technique réactive, pas un call center distant." },
    ],
    footnote: "*Contrat signé devant notaire requis avant le lancement du test.",
  },
  steps: {
    title: "Du premier contact à la connexion.",
    items: [
      "Demande en ligne",
      "Contact sous 48h",
      "Descente gratuite",
      "Cotation sur-mesure",
      "Installation rapide",
      "Connecté, vous économisez",
    ],
    cta: "Commencer ma demande",
  },
  close: "Un Internet pro, dédié, à partir de 45 000 XAF/Mbps.",
};

const en: typeof fr = {
  meta: {
    title: "Business Internet with a dedicated public IP | Cherryz",
    description:
      "Dedicated business Internet with a fixed IP, from 45,000 XAF per Mbps per month. Multi-operator (Camtel, Orange, MTN), fast installation with no civil works, dedicated IP included, trial before you commit.",
  },
  hero: {
    title: "Dedicated Internet. Fixed IP.",
    lead: "Cherryz picks the best infrastructure for you among our partner operators (Camtel, Orange, MTN) and delivers a business connection with a dedicated IP, with no works and no downtime.",
    how: "How it works",
    facts: ["ART-licensed", "Dedicated IP included", "No civil works"],
  },
  ip: {
    title: "What is a dedicated public IP?",
    lead: "Your public IP address is your company's identity on the Internet. You need it to run your most sensitive business tools.",
    point: "With Cherryz, your IP is dedicated: nobody else shares it, and your bandwidth is guaranteed at all times.",
    sheet: "What it lets you do",
    usages: [
      { t: "Secure VPNs between branches", d: "Link your sites in complete confidentiality." },
      { t: "Host your internal servers", d: "Reachable remotely, securely." },
      { t: "Call centres & VoIP systems", d: "Clear voice, no drop-outs." },
      { t: "Compliant transactions", d: "Essential for your financial flows." },
      { t: "Real-time video surveillance", d: "Your cameras, viewable wherever you are." },
    ],
  },
  features: {
    title: "A business connection, without an operator's constraints.",
    items: [
      { t: "Multi-operator", d: "We choose the best network for your location, not the one of a single provider." },
      { t: "Fast installation", d: "Microwave links: no civil works, no trenches." },
      { t: "Dedicated IP included", d: "Your own address. Nobody else shares it." },
      { t: "Side-by-side trial", d: "Test us without leaving your current operator*." },
      { t: "Nationwide coverage", d: "Everywhere in Cameroon through our partners." },
      { t: "Local after-sales support", d: "A responsive technical team, not a distant call centre." },
    ],
    footnote: "*A contract signed before a notary is required before the trial starts.",
  },
  steps: {
    title: "From first contact to connection.",
    items: [
      "Online request",
      "We call you within 48h",
      "Free site visit",
      "Tailored quote",
      "Fast installation",
      "Connected, and saving",
    ],
    cta: "Start my request",
  },
  close: "Dedicated business Internet, from 45,000 XAF per Mbps.",
};

export const internetB2B: Localized<typeof fr> = { fr, en };
