import type { Localized } from "@/lib/i18n/config";

const fr = {
  meta: {
    title: "Contact | Cherryz",
    description:
      "Parlons de votre projet : devis Internet B2B, WiFi Zone ou toute autre demande. Réponse sous 24h, déplacement gratuit partout au Cameroun. Basés à Yaoundé.",
  },
  hero: {
    title: "Parlons de votre projet.",
    lead: "Une question, un devis, une idée de WiFi Zone ? Notre équipe vous répond sous 24h et se déplace gratuitement, partout au Cameroun.",
    facts: ["Réponse sous 24h", "Déplacement gratuit", "Basés à Yaoundé"],
  },
  price: {
    title: "Besoin d'un prix ?",
    lead: "Le questionnaire de devis prend 3 minutes et nous donne tout ce qu'il faut pour vous chiffrer. Réponse sous 48h.",
    ip: "Devis Internet B2B",
    wifi: "Devis WiFi Zone",
  },
  coords: {
    title: "Nos coordonnées",
    address: "Adresse",
    addressValue: "Yaoundé, Cameroun",
    phone: "Téléphone",
    whatsapp: "WhatsApp",
    email: "Email",
    site: "Site web",
  },
  booking: {
    title: "Réserver un créneau",
    lead: "Prenez rendez-vous en ligne, directement avec l'équipe.",
    ip: "Internet B2B",
    wifi: "WiFi Zone",
  },
  form: {
    title: "Écrivez-nous",
    required: "Les champs marqués d'un * sont obligatoires.",
    name: "Nom complet *",
    namePh: "Votre nom",
    email: "Email professionnel *",
    emailPh: "vous@entreprise.com",
    phone: "Téléphone / WhatsApp",
    phonePh: "+237 6 00 00 00 00",
    company: "Entreprise / organisation",
    companyPh: "Nom de votre structure",
    need: "Votre besoin *",
    needPh: "Sélectionnez…",
    // Option values are stored as-is: only the labels are translated.
    needs: { "Internet B2B": "Internet B2B", "WiFi Zone": "WiFi Zone", Autre: "Autre" },
    message: "Message",
    messagePh: "Décrivez votre projet, votre localisation, vos besoins…",
    errMissing: "Merci de renseigner votre nom, un email valide et votre besoin.",
    errSend: "Une erreur est survenue. Merci de réessayer ou de nous écrire à support@cherryz.tech.",
    sending: "Envoi en cours…",
    send: "Envoyer mon message",
    sentTitle: "Message envoyé.",
    sentBody: (name: string) =>
      `Merci ${name}. Notre équipe vous recontacte sous 24h. Pour aller plus vite, réservez directement un créneau ci-contre.`,
    again: "Envoyer un autre message",
  },
};

const en: typeof fr = {
  meta: {
    title: "Contact | Cherryz",
    description:
      "Tell us about your project: a business Internet quote, a WiFi Zone or anything else. Reply within 24 hours, free site visits anywhere in Cameroon. Based in Yaoundé.",
  },
  hero: {
    title: "Let's talk about your project.",
    lead: "A question, a quote, a WiFi Zone idea? Our team replies within 24 hours and comes to you free of charge, anywhere in Cameroon.",
    facts: ["Reply within 24h", "Free site visit", "Based in Yaoundé"],
  },
  price: {
    title: "Need a price?",
    lead: "The quote questionnaire takes 3 minutes and gives us everything we need to price your project. Reply within 48h.",
    ip: "Business Internet quote",
    wifi: "WiFi Zone quote",
  },
  coords: {
    title: "Our details",
    address: "Address",
    addressValue: "Yaoundé, Cameroon",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    site: "Website",
  },
  booking: {
    title: "Book a slot",
    lead: "Book a meeting online, directly with the team.",
    ip: "Business Internet",
    wifi: "WiFi Zone",
  },
  form: {
    title: "Write to us",
    required: "Fields marked with * are required.",
    name: "Full name *",
    namePh: "Your name",
    email: "Work email *",
    emailPh: "you@company.com",
    phone: "Phone / WhatsApp",
    phonePh: "+237 6 00 00 00 00",
    company: "Company / organisation",
    companyPh: "Name of your organisation",
    need: "What do you need? *",
    needPh: "Select…",
    needs: { "Internet B2B": "Business Internet", "WiFi Zone": "WiFi Zone", Autre: "Other" },
    message: "Message",
    messagePh: "Describe your project, your location, your needs…",
    errMissing: "Please enter your name, a valid email and what you need.",
    errSend: "Something went wrong. Please try again or write to us at support@cherryz.tech.",
    sending: "Sending…",
    send: "Send my message",
    sentTitle: "Message sent.",
    sentBody: (name: string) =>
      `Thank you ${name}. Our team will get back to you within 24 hours. To speed things up, book a slot directly alongside.`,
    again: "Send another message",
  },
};

export const contact: Localized<typeof fr> = { fr, en };
export type ContactFormCopy = (typeof fr)["form"];
