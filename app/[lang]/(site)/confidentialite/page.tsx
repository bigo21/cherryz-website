import type { Metadata } from "next";
import LegalPage, { Fact, Section } from "@/components/site/LegalPage";
import { HOST, LEGAL } from "@/lib/site/legal";
import { CONTACT } from "@/lib/site/site";
import { getLang, pageMetadata } from "@/lib/i18n/server";

const META = {
  fr: {
    title: "Politique de confidentialité | Cherryz",
    description: "Quelles données Cherryz collecte via ses formulaires, pourquoi, avec qui elles sont partagées, combien de temps elles sont conservées et comment exercer vos droits.",
  },
  en: {
    title: "Privacy policy | Cherryz",
    description: "What data Cherryz collects through its forms, why, who it is shared with, how long it is kept and how to exercise your rights.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata(lang, "/confidentialite", META[lang]);
}

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";
const list = "m-0 flex list-disc flex-col gap-1 pl-5";

export default async function Confidentialite() {
  return (await getLang()) === "en" ? <ConfidentialiteEn /> : <ConfidentialiteFr />;
}

function ConfidentialiteFr() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt={LEGAL.updatedAt}>
      <Section title="Qui est responsable de vos données">
        <p className="m-0">
          <Fact value={LEGAL.companyName} /> (Cherryz), dont le siège est situé{" "}
          <Fact value={LEGAL.address} />, Yaoundé, Cameroun, est responsable des
          traitements décrits ici. Pour toute question :{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>.
        </p>
        <p className="m-0">
          Cette politique s&apos;applique dans le cadre de la loi n° 2024/017 du
          23 décembre 2024 relative à la protection des données à caractère
          personnel au Cameroun.
        </p>
      </Section>

      <Section title="Les données que nous collectons">
        <p className="m-0">
          Nous ne collectons que ce que vous nous transmettez volontairement :
        </p>
        <ul className={list}>
          <li>
            <strong>Questionnaire de devis</strong> (Internet B2B ou WiFi Zone) : nom,
            fonction, entreprise, email, téléphone, ville et quartier, et vos
            réponses sur votre projet (connexion actuelle, besoins, budget,
            site à équiper…).
          </li>
          <li>
            <strong>Localisation précise</strong>, uniquement si vous cliquez sur
            « Utiliser ma position actuelle » et l&apos;autorisez dans votre
            navigateur ; sinon, la description que vous saisissez.
          </li>
          <li>
            <strong>Formulaire de contact</strong> : nom, email, téléphone,
            entreprise, besoin et message.
          </li>
          <li>
            <strong>Informations techniques jointes à chaque demande</strong> : page
            d&apos;envoi, site d&apos;origine, paramètres de campagne (UTM), langue,
            type de navigateur, date et heure.
          </li>
        </ul>
        <p className="m-0">
          Le site n&apos;utilise ni cookie publicitaire ni outil de mesure
          d&apos;audience. Vos réponses au questionnaire sont enregistrées sur
          votre appareil pendant que vous le remplissez, pour ne pas les perdre
          ; elles ne nous parviennent qu&apos;au moment où vous envoyez la
          demande.
        </p>
      </Section>

      <Section title="Pourquoi nous les utilisons">
        <ul className={list}>
          <li>étudier votre besoin et établir votre devis ;</li>
          <li>vous recontacter et organiser, si besoin, une visite technique ;</li>
          <li>vous envoyer un email confirmant la bonne réception de votre demande.</li>
        </ul>
        <p className="m-0">
          Ces traitements reposent sur votre consentement, donné en cochant la
          case prévue avant l&apos;envoi, et sur les mesures préalables à un
          éventuel contrat que vous nous demandez. Vos données ne sont ni
          vendues ni utilisées à des fins publicitaires.
        </p>
      </Section>

      <Section title="Qui y a accès">
        <p className="m-0">
          Seule l&apos;équipe Cherryz chargée de traiter les demandes y a accès.
          Nous faisons appel aux prestataires techniques suivants, qui agissent
          pour notre compte :
        </p>
        <ul className={list}>
          <li>{HOST.name} : hébergement du site ;</li>
          <li>Supabase : stockage sécurisé des demandes ;</li>
          <li>Resend : envoi des emails de notification et de confirmation.</li>
        </ul>
        <p className="m-0">
          Si vous réservez un créneau via Cal.com ou nous écrivez sur WhatsApp,
          ces services traitent vos données selon leurs propres politiques.
          Ces prestataires peuvent héberger des données hors du Cameroun ; nous
          les choisissons pour leurs garanties de sécurité.
        </p>
      </Section>

      <Section title="Combien de temps nous les gardons">
        <p className="m-0">
          Vos demandes sont conservées <Fact value={LEGAL.retention} />, puis
          supprimées. Si vous devenez client, les données nécessaires au contrat
          sont conservées pendant la durée de la relation et les délais légaux
          qui s&apos;y appliquent.
        </p>
      </Section>

      <Section title="Comment nous les protégeons">
        <p className="m-0">
          Les échanges avec le site sont chiffrés (HTTPS). Les demandes sont
          stockées dans une base dont la lecture est fermée au public : le
          formulaire peut enregistrer une demande, mais personne ne peut la
          relire depuis le site.
        </p>
      </Section>

      <Section title="Vos droits">
        <p className="m-0">
          Vous pouvez à tout moment demander l&apos;accès à vos données, leur
          rectification ou leur effacement, vous opposer à leur traitement ou
          retirer votre consentement. Écrivez-nous à{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a> en
          précisant l&apos;email utilisé dans votre demande ; nous répondons dans
          les meilleurs délais.
        </p>
        <p className="m-0">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          saisir l&apos;Autorité de protection des données à caractère personnel
          (APDP) du Cameroun.
        </p>
      </Section>
    </LegalPage>
  );
}

// English translation, for information. The French version prevails.
function ConfidentialiteEn() {
  return (
    <LegalPage title="Privacy policy" updatedAt={LEGAL.updatedAt}>
      <Section title="Who is responsible for your data">
        <p className="m-0">
          <Fact value={LEGAL.companyName} /> (Cherryz), whose registered office is at{" "}
          <Fact value={LEGAL.address} />, Yaoundé, Cameroon, is the controller of
          the processing described here. For any question:{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>.
        </p>
        <p className="m-0">
          This policy applies under Law No. 2024/017 of 23 December 2024 on the
          protection of personal data in Cameroon. This English version is a
          translation provided for information; the French version prevails.
        </p>
      </Section>

      <Section title="The data we collect">
        <p className="m-0">We only collect what you choose to send us:</p>
        <ul className={list}>
          <li>
            <strong>Quote questionnaire</strong> (Business Internet or WiFi Zone):
            name, position, company, email, phone, city and neighbourhood, and
            your answers about your project (current connection, needs, budget,
            site to equip…).
          </li>
          <li>
            <strong>Exact location</strong>, only if you click &ldquo;Use my
            current location&rdquo; and allow it in your browser; otherwise, the
            description you type in.
          </li>
          <li>
            <strong>Contact form</strong>: name, email, phone, company, need and
            message.
          </li>
          <li>
            <strong>Technical information attached to each request</strong>: page
            it was sent from, referring site, campaign parameters (UTM), language,
            browser type, date and time.
          </li>
        </ul>
        <p className="m-0">
          The website uses neither advertising cookies nor audience measurement
          tools. Your questionnaire answers are saved on your device while you
          fill it in, so you don&apos;t lose them; they only reach us when you
          send the request.
        </p>
      </Section>

      <Section title="Why we use it">
        <ul className={list}>
          <li>to study your needs and prepare your quote;</li>
          <li>to get back to you and, if needed, arrange a technical visit;</li>
          <li>to send you an email confirming that we received your request.</li>
        </ul>
        <p className="m-0">
          This processing is based on your consent, given by ticking the box
          before sending, and on the pre-contractual steps you ask us to take.
          Your data is neither sold nor used for advertising.
        </p>
      </Section>

      <Section title="Who has access to it">
        <p className="m-0">
          Only the Cherryz team handling requests has access to it. We use the
          following technical providers, acting on our behalf:
        </p>
        <ul className={list}>
          <li>{HOST.name}: website hosting;</li>
          <li>Supabase: secure storage of requests;</li>
          <li>Resend: sending notification and confirmation emails.</li>
        </ul>
        <p className="m-0">
          If you book a slot through Cal.com or write to us on WhatsApp, those
          services process your data under their own policies. These providers
          may store data outside Cameroon; we choose them for their security
          guarantees.
        </p>
      </Section>

      <Section title="How long we keep it">
        <p className="m-0">
          Your requests are kept <Fact value={LEGAL.retention} />, then deleted.
          If you become a client, the data needed for the contract is kept for the
          duration of the relationship and the legal periods that apply to it.
        </p>
      </Section>

      <Section title="How we protect it">
        <p className="m-0">
          Exchanges with the website are encrypted (HTTPS). Requests are stored
          in a database that is closed to public reading: the form can save a
          request, but nobody can read it back from the website.
        </p>
      </Section>

      <Section title="Your rights">
        <p className="m-0">
          You may at any time ask to access, correct or delete your data, object
          to its processing or withdraw your consent. Write to us at{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>,
          stating the email used in your request; we will reply as soon as
          possible.
        </p>
        <p className="m-0">
          If you believe your rights are not being respected, you can refer the
          matter to Cameroon&apos;s Personal Data Protection Authority (APDP).
        </p>
      </Section>
    </LegalPage>
  );
}
