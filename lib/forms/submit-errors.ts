// What a visitor reads when a form could not be sent. Each cause gets its own
// message: a value to correct (shown under its field), or a problem on our side,
// which must never read as if the visitor had made a mistake.

export type SubmitError = "validation" | "rejected" | "unavailable" | "too_fast" | "invalid_type";

const SUPPORT = "écrivez-nous sur WhatsApp ou à support@cherryz.tech";

export function submitErrorMessage(error: string | undefined): string {
  switch (error) {
    case "validation":
      return "Une de vos réponses est à corriger. Vérifiez vos réponses, puis renvoyez votre demande.";
    case "rejected":
      return `Une de vos réponses n'a pas été acceptée lors de l'enregistrement. Vérifiez vos réponses, en particulier les plus longues. Si tout vous semble correct, ${SUPPORT}.`;
    case "too_fast":
      return "L'envoi a été trop rapide. Patientez quelques secondes, puis réessayez.";
    default:
      return `Votre demande n'a pas été enregistrée. Le problème vient de notre côté, vos réponses ne sont pas en cause. Réessayez dans quelques minutes ; si cela continue, ${SUPPORT}.`;
  }
}

/** The request never got an answer: no network, or a page opened before an update of the site. */
export const CONNEXION_PERDUE =
  "Nous n'avons pas pu joindre le site. Vérifiez votre connexion Internet et réessayez. Si cela continue, rechargez la page.";

/**
 * Cause of a refused insert. 23514 is a CHECK constraint (cherryz schema): the
 * site's rules should have caught it first, so it means the two have drifted.
 * Anything else (rights, network, outage) is not about the visitor's answers.
 */
export function insertError(error: { code?: string; message: string }): {
  error: SubmitError;
  /** Suffix of the violated constraint: email_format, longueurs, besoin. */
  rule?: string;
} {
  if (error.code !== "23514") return { error: "unavailable" };
  return { error: "rejected", rule: /_(email_format|longueurs|besoin)"/.exec(error.message)?.[1] };
}
