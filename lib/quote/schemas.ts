// Quote wizard schemas — ported from design_handoff_site_cherryz/Cherryz Maintenance.dc.html
// (DCLogic.schemaIP / schemaWifi). The conditional logic (`cond`) must also be
// enforced server-side before persisting.

export type QuoteType = "ip" | "wifi";

export type FieldType =
  | "single"
  | "multi"
  | "scale"
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "geo"
  | "consent";

export type Answers = Record<string, unknown>;

export interface Question {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hasOther?: boolean;
  options?: string[];
  placeholder?: string;
  /** When present, the question is only shown/validated if this returns true. */
  cond?: (a: Answers) => boolean;
}

export interface Step {
  title: string;
  subtitle: string;
  questions: Question[];
}

/** WiFi branch marker: "I already have a WiFi Zone to improve". */
export const WIFI_ALREADY =
  "J'ai déjà une WiFi Zone et je veux l'améliorer";

const hasExistingConnection = (a: Answers) =>
  a.q1 === "Oui, nous avons déjà un opérateur" ||
  a.q1 === "Nous avons une connexion mais elle est insuffisante";

export const schemaIP: Step[] = [
  {
    title: "Votre situation actuelle",
    subtitle: "Aidez-nous à comprendre votre point de départ.",
    questions: [
      { id: "q1", label: "Avez-vous déjà une connexion Internet ?", type: "single", required: true, options: ["Oui, nous avons déjà un opérateur", "Non, nous cherchons une première solution", "Nous avons une connexion mais elle est insuffisante"] },
      { id: "q2", label: "Quel est votre opérateur Internet actuel ?", type: "single", required: true, hasOther: true, cond: hasExistingConnection, options: ["Camtel", "Matrix Telecom", "Creolink", "MTN", "Orange", "Plusieurs opérateurs", "Je ne sais pas", "Autre"] },
      { id: "q3", label: "Êtes-vous satisfait de votre connexion actuelle ?", type: "scale", required: true, cond: hasExistingConnection },
      { id: "q4", label: "Qu'est-ce qui vous semble insuffisant ?", type: "multi", required: false, hasOther: true, cond: hasExistingConnection, options: ["Débit trop faible", "Coupures fréquentes / instabilité", "Latence élevée (visio, VPN...)", "Prix trop élevé", "Support technique insatisfaisant", "Adresse IP non fournie ou partagée", "Autre"] },
      { id: "q5", label: "Quel est votre débit Internet actuel approximatif ?", type: "single", required: true, cond: hasExistingConnection, options: ["Moins de 5 Mbps", "5 – 20 Mbps", "20 – 50 Mbps", "50 – 100 Mbps", "Plus de 100 Mbps", "Je ne connais pas mon débit"] },
      { id: "q6", label: "Combien payez-vous par mois pour votre connexion ?", type: "single", required: true, cond: hasExistingConnection, options: ["Moins de 500 000 XAF", "500 000 – 1 000 000 XAF", "1 000 000 – 2 000 000 XAF", "2 000 000 – 3 000 000 XAF", "Plus de 3 000 000 XAF", "Je préfère ne pas répondre"] },
    ],
  },
  {
    title: "Ce dont vous avez besoin",
    subtitle: "Décrivez vos usages et vos contraintes.",
    questions: [
      { id: "q7", label: "Combien d'utilisateurs / postes sont connectés ?", type: "single", required: true, options: ["1 – 10 postes", "11 – 30 postes", "31 – 50 postes", "51 – 100 postes", "Plus de 100 postes", "Je ne sais pas encore"] },
      { id: "q8", label: "Quel type de site souhaitez-vous connecter ?", type: "single", required: true, hasOther: true, options: ["Bureau / Siège administratif", "Agence bancaire / Guichet", "Data center / Salle serveur", "Site industriel / Usine", "Call center", "Autre"] },
      { id: "q9", label: "Quels sont vos principaux usages Internet ?", type: "multi", required: false, hasOther: true, options: ["Navigation web & emails", "Téléphonie IP / VoIP / Call Center", "VPN entre agences ou sites distants", "Vidéoconférence (Teams, Zoom, Meet...)", "Hébergement de serveurs internes", "Caméras de surveillance à distance", "Transactions bancaires / ERP / Logiciels métier", "Cloud / Sauvegarde en ligne", "Autre"] },
      { id: "q10", label: "Avez-vous besoin d'une adresse IP publique dédiée ?", type: "single", required: false, options: ["Oui, c'est indispensable pour nous", "Non, ce n'est pas notre priorité", "Je ne sais pas — j'aimerais en savoir plus"] },
      { id: "q11", label: "Des serveurs, caméras ou équipements à accéder à distance ?", type: "single", required: false, options: ["Oui", "Non", "Pas encore mais c'est prévu"] },
      { id: "q12", label: "Souhaitez-vous bénéficier du test du service ?", type: "single", required: false, options: ["Oui, je veux tester avant de décider", "Non, je suis prêt à migrer directement", "Je veux d'abord avoir plus d'informations"] },
    ],
  },
  {
    title: "Localisation",
    subtitle: "Où se trouve votre entreprise ?",
    questions: [
      { id: "q13", label: "Ville et quartier où se trouve votre entreprise", type: "text", required: true, placeholder: "Ex. Yaoundé, Bastos" },
      { id: "q14", label: "Région", type: "single", required: true, options: ["Centre", "Littoral", "Ouest", "Nord-Ouest", "Sud-Ouest", "Sud", "Est", "Adamaoua", "Nord", "Extrême-Nord"] },
      { id: "q15", label: "Localisation précise", type: "geo", required: true },
    ],
  },
  {
    title: "Vos coordonnées",
    subtitle: "Pour que notre équipe puisse vous recontacter.",
    questions: [
      { id: "q16", label: "Votre prénom et nom complet", type: "text", required: true, placeholder: "Prénom Nom" },
      { id: "q17", label: "Votre poste / fonction", type: "single", required: true, hasOther: true, options: ["Directeur Général (DG) / PDG", "Directeur Informatique (DSI)", "Responsable Système d'Information (RSI)", "Directeur Administratif et Financier (DAF)", "Responsable Achats / Logistique", "Gérant / Propriétaire", "Autre"] },
      { id: "q18", label: "Nom de votre entreprise ou organisation", type: "text", required: true, placeholder: "Nom de la structure" },
      { id: "q19", label: "Secteur d'activité", type: "single", required: true, hasOther: true, options: ["Banque / Assurance", "Microfinance (EMF)", "Call Center / Centre d'appels", "Hôtel / Restauration / Tourisme", "Clinique / Santé / Pharmacie", "Université / École / Formation", "ONG / Organisation Internationale", "Industrie / Production", "PME / Commerce / Distribution", "Administration publique / Parapublic", "Autre"] },
      { id: "q20", label: "Numéro WhatsApp / Téléphone", type: "tel", required: true, placeholder: "+237 6 00 00 00 00" },
      { id: "q21", label: "Adresse email professionnelle", type: "email", required: true, placeholder: "vous@entreprise.com" },
    ],
  },
  {
    title: "Dernière étape",
    subtitle: "Encore quelques mots, puis on y est.",
    questions: [
      { id: "q22", label: "Des informations complémentaires à partager ?", type: "textarea", required: false, placeholder: "Votre message (facultatif)" },
      { id: "q23", label: "On reste en contact ?", type: "consent", required: true },
    ],
  },
];

export const schemaWifi: Step[] = [
  {
    title: "Où en êtes-vous",
    subtitle: "Parlez-nous de l'avancement de votre projet.",
    questions: [
      { id: "q1", label: "Où en êtes-vous dans votre projet ?", type: "single", required: true, options: ["Idée en cours de réflexion", "J'ai identifié un emplacement", "J'ai déjà un accord avec un bailleur", "Je suis prêt à démarrer", WIFI_ALREADY] },
      { id: "q2", label: "Quel est votre budget de démarrage estimé ?", type: "single", required: true, options: ["Moins de 500 000 XAF", "500 000 – 1 000 000 XAF", "1 000 000 – 2 000 000 XAF", "À définir avec l'équipe Cherryz"] },
      { id: "q3", label: "Avez-vous entendu parler des agréments ART requis ?", type: "single", required: true, options: ["Oui, je sais ce que c'est", "J'en ai entendu parler mais je ne connais pas les détails", "Non, c'est la première fois que j'en entends parler"] },
      { id: "q4", label: "Avez-vous suivi la formation gratuite Cherryz ?", type: "single", required: true, options: ["Oui, je l'ai suivie", "Je suis en train de la suivre", "Non, pas encore", "Je ne savais pas qu'elle existait"] },
    ],
  },
  {
    title: "Votre projet WiFi Zone",
    subtitle: "Les détails de la zone à couvrir.",
    questions: [
      { id: "q6", label: "Où souhaitez-vous déployer votre WiFi Zone ?", type: "multi", required: true, hasOther: true, options: ["Quartier résidentiel", "Immeuble / Résidence", "Marché / Zone commerciale", "Campus / École", "Clinique / Centre de santé", "Restaurant / Café / Espace public", "Autre"] },
      { id: "q7", label: "Avez-vous un espace ou un accord avec un bailleur ?", type: "single", required: true, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà un accord", "En cours de négociation", "Non, pas encore", "C'est mon propre espace"] },
      { id: "q8", label: "Combien d'utilisateurs potentiels estimez-vous ?", type: "single", required: true, options: ["Moins de 20 utilisateurs", "20 – 50 utilisateurs", "50 – 100 utilisateurs", "Plus de 100 utilisateurs", "Je ne sais pas encore"] },
      { id: "q9", label: "Avez-vous déjà une connexion Internet sur place ?", type: "single", required: true, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà une connexion", "Non, pas encore", "En cours d'installation"] },
      { id: "q10", label: "Avez-vous déjà des équipements réseau ?", type: "single", required: false, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà du matériel", "Partiellement (quelques équipements)", "Non, je pars de zéro"] },
      { id: "q11b", label: "Qu'aimeriez-vous améliorer dans votre WiFi Zone actuelle ?", type: "multi", required: true, hasOther: true, cond: (a) => a.q1 === WIFI_ALREADY, options: ["Débit / capacité", "Couverture de la zone", "Système de paiement / tickets", "Stabilité de la connexion", "Ajout d'équipements", "Autre"] },
      { id: "q11", label: "Quel(s) modèle(s) de monétisation envisagez-vous ?", type: "multi", required: false, options: ["Vente de tickets / vouchers prépayés", "Abonnement mensuel aux utilisateurs", "Gratuit, financé par la publicité", "Gratuit, service offert (immeuble, hôtel...)", "Je ne sais pas encore, j'aimerais des conseils"] },
      { id: "q12", label: "Disposez-vous d'une source d'électricité stable sur le site ?", type: "single", required: false, options: ["Oui, électricité stable (ENEO fiable)", "Oui mais avec coupures fréquentes", "Non, pas encore d'électricité sur site", "J'ai un groupe électrogène / solaire en secours"] },
    ],
  },
  {
    title: "Localisation",
    subtitle: "Où se trouve votre projet ?",
    questions: [
      { id: "q13", label: "Ville et quartier où se trouve votre projet", type: "text", required: true, placeholder: "Ex. Douala, Bonaberi" },
      { id: "q14", label: "Région", type: "single", required: true, options: ["Centre", "Littoral", "Ouest", "Nord-Ouest", "Sud-Ouest", "Sud", "Est", "Adamaoua", "Nord", "Extrême-Nord"] },
      { id: "q15", label: "Localisation précise", type: "geo", required: true },
    ],
  },
  {
    title: "Vos coordonnées",
    subtitle: "Pour que notre équipe puisse vous recontacter.",
    questions: [
      { id: "q16", label: "Votre prénom et nom complet", type: "text", required: true, placeholder: "Prénom Nom" },
      { id: "q17", label: "Numéro WhatsApp / Téléphone", type: "tel", required: true, placeholder: "+237 6 00 00 00 00" },
      { id: "q18", label: "Adresse email professionnelle", type: "email", required: true, placeholder: "vous@email.com" },
      { id: "q19", label: "Nom de votre entreprise ou organisation", type: "text", required: false, placeholder: "Facultatif — laissez vide si vous êtes un particulier" },
      { id: "q5", label: "Un message ou une question pour notre équipe ?", type: "textarea", required: false, placeholder: "Votre message (facultatif)" },
    ],
  },
  {
    title: "Dernière étape",
    subtitle: "Un dernier accord, puis on y est.",
    questions: [{ id: "q20", label: "On reste en contact ?", type: "consent", required: true }],
  },
];

export function getSchema(type: QuoteType): Step[] {
  return type === "wifi" ? schemaWifi : schemaIP;
}

export const sessionKey = (type: QuoteType) =>
  type === "ip" ? "chz_form_ip_v2" : "chz_form_wifi_v2";
