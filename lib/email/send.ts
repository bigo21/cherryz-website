import type { Resend } from "resend";

type Message = Parameters<Resend["emails"]["send"]>[0];

/**
 * Sends one e-mail and tells whether Resend took it. Resend returns its
 * refusals (domain, quota…) instead of throwing them: both are logged here,
 * with no personal data, and neither ever breaks a form submission.
 */
export async function sendEmail(resend: Resend, label: string, message: Message): Promise<boolean> {
  try {
    const { error } = await resend.emails.send(message);
    if (!error) return true;
    console.error(`${label} email refused: ${error.name}`);
  } catch (e) {
    console.error(`${label} email failed:`, e instanceof Error ? e.name : "unknown error");
  }
  return false;
}

/**
 * Banner of the backup copy: the database did not store the request, so this
 * e-mail is its only trace (not in /admin, not in GHL).
 */
export function notStoredBanner(cause: string): string {
  return `
      <div style="background:#fff4d6;border-bottom:3px solid #d99a00;padding:16px 24px;font-size:14px;line-height:1.5;color:#101b28">
        <strong>Copie de secours : cette demande n'est pas enregistrée en base.</strong><br>
        Elle n'apparaît ni dans l'espace équipe ni dans GHL : cet e-mail en est la seule trace. Traitez-la à la main et prévenez le responsable technique (cause : ${cause.replace(/[^\w .-]/g, "")}).
      </div>`;
}
