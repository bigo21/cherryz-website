import { Resend } from "resend";
import type { Answers, QuoteType } from "@/lib/quote/schemas";
import { quoteTypeLabel, summarizeAnswers } from "@/lib/quote/summary";

export interface Contact {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
}

const FROM = process.env.RESEND_FROM ?? "Cherryz <onboarding@resend.dev>";
const NOTIFY_TO = process.env.QUOTE_NOTIFY_EMAIL ?? "support@cherryz.tech";

const CHERRY = "#a2032d";
const NAVY = "#101b28";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rowsHtml(items: { label: string; value: string }[]): string {
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #eceef1;font-size:13px;color:#6b7280;vertical-align:top;width:44%">${esc(i.label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #eceef1;font-size:14px;color:${NAVY};font-weight:600">${esc(i.value)}</td>
      </tr>`,
    )
    .join("");
}

function teamEmailHtml(
  type: QuoteType,
  contact: Contact,
  answers: Answers,
  tracking: Record<string, unknown>,
): string {
  const items = summarizeAnswers(type, answers);
  const contactRows = rowsHtml(
    [
      { label: "Nom", value: contact.full_name ?? "" },
      { label: "Email", value: contact.email ?? "" },
      { label: "Téléphone / WhatsApp", value: contact.phone ?? "" },
      { label: "Entreprise", value: contact.company ?? "" },
    ].filter((r) => r.value),
  );
  const trackingText = esc(JSON.stringify(tracking ?? {}, null, 2));

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f5f3;padding:24px">
    <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px -18px rgba(16,27,40,.4)">
      <div style="background:${NAVY};padding:22px 26px">
        <span style="display:inline-block;background:${CHERRY};color:#fff;font-size:12px;letter-spacing:1px;font-weight:700;padding:5px 12px;border-radius:100px">NOUVELLE DEMANDE</span>
        <h1 style="margin:12px 0 0;color:#fff;font-size:22px">Cotation ${esc(quoteTypeLabel(type))}</h1>
      </div>
      <div style="padding:24px 26px">
        <h2 style="font-size:15px;color:${CHERRY};margin:0 0 8px">Contact</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:22px">${contactRows}</table>
        <h2 style="font-size:15px;color:${CHERRY};margin:0 0 8px">Réponses</h2>
        <table style="width:100%;border-collapse:collapse">${rowsHtml(items)}</table>
        <h2 style="font-size:13px;color:#9aa2ad;margin:22px 0 6px">Tracking</h2>
        <pre style="background:#f6f5f3;border-radius:10px;padding:12px;font-size:12px;color:#6b7280;white-space:pre-wrap;word-break:break-word">${trackingText}</pre>
      </div>
    </div>
  </div>`;
}

function prospectEmailHtml(firstName: string, type: QuoteType): string {
  const hi = firstName ? `Merci ${esc(firstName)} !` : "Merci !";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f5f3;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px -18px rgba(16,27,40,.4)">
      <div style="background:${NAVY};padding:26px">
        <h1 style="margin:0;color:#fff;font-size:24px">${hi}</h1>
      </div>
      <div style="padding:26px;color:${NAVY};font-size:15px;line-height:1.6">
        <p style="margin:0 0 16px">Votre demande de cotation <strong>${esc(quoteTypeLabel(type))}</strong> a bien été reçue. Notre équipe va l'étudier et vous recontactera <strong>sous 48h</strong>.</p>
        <p style="margin:0 0 16px">En attendant, vous pouvez nous joindre directement :</p>
        <ul style="margin:0 0 20px;padding-left:18px;color:#4b5563">
          <li>WhatsApp : <a href="https://wa.me/237242014664" style="color:${CHERRY}">+237 242 01 46 64</a></li>
          <li>Email : <a href="mailto:support@cherryz.tech" style="color:${CHERRY}">support@cherryz.tech</a></li>
        </ul>
        <p style="margin:24px 0 0;font-weight:700;color:${CHERRY}">Cherryz — Vous connecte !</p>
      </div>
    </div>
  </div>`;
}

/**
 * Fire the team notification + prospect confirmation. Best-effort: failures are
 * logged and swallowed so a persisted submission is never lost to an email error.
 */
export async function sendQuoteEmails(params: {
  type: QuoteType;
  contact: Contact;
  answers: Answers;
  tracking: Record<string, unknown>;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[quote] RESEND_API_KEY not set — skipping emails.");
    return;
  }

  const resend = new Resend(apiKey);
  const { type, contact, answers, tracking } = params;
  const firstName = (contact.full_name ?? "").trim().split(" ")[0] ?? "";

  // Team notification
  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: contact.email ?? undefined,
      subject: `Nouvelle demande — ${quoteTypeLabel(type)} — ${contact.full_name ?? "Prospect"}`,
      html: teamEmailHtml(type, contact, answers, tracking),
    });
  } catch (e) {
    console.error("[quote] team email failed:", e);
  }

  // Prospect confirmation (only if we have an email)
  if (contact.email) {
    try {
      await resend.emails.send({
        from: FROM,
        to: contact.email,
        subject: "Votre demande Cherryz a bien été reçue",
        html: prospectEmailHtml(firstName, type),
      });
    } catch (e) {
      console.error("[quote] prospect email failed:", e);
    }
  }
}
