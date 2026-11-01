import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";

export interface ContactPayload {
  full_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  besoin?: string | null;
  message?: string | null;
}

const FROM = process.env.RESEND_FROM ?? "Cherryz <onboarding@resend.dev>";
const NOTIFY_TO = process.env.QUOTE_NOTIFY_EMAIL ?? "support@cherryz.tech";
const CHERRY = "#a0042d";
const NAVY = "#101b28";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function teamHtml(p: ContactPayload): string {
  const row = (k: string, v: string | null | undefined) =>
    v ? `<tr><td style="padding:9px 14px;border-bottom:1px solid #eceef1;font-size:13px;color:#70767e;width:38%">${esc(k)}</td><td style="padding:9px 14px;border-bottom:1px solid #eceef1;font-size:14px;color:${NAVY};font-weight:600">${esc(v)}</td></tr>` : "";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f5f3;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
      <div style="background:${NAVY};padding:20px 24px">
        <span style="display:inline-block;background:${CHERRY};color:#fff;font-size:12px;letter-spacing:1px;font-weight:700;padding:5px 12px;border-radius:100px">NOUVEAU MESSAGE</span>
        <h1 style="margin:10px 0 0;color:#fff;font-size:20px">Contact : ${esc(p.besoin ?? "Général")}</h1>
      </div>
      <div style="padding:20px 24px">
        <table style="width:100%;border-collapse:collapse">
          ${row("Nom", p.full_name)}${row("Email", p.email)}${row("Téléphone", p.phone)}${row("Entreprise", p.company)}${row("Besoin", p.besoin)}
        </table>
        ${p.message ? `<h2 style="font-size:13px;color:#9aa2ad;margin:18px 0 6px">Message</h2><p style="font-size:14px;color:${NAVY};white-space:pre-wrap;line-height:1.5">${esc(p.message)}</p>` : ""}
      </div>
    </div>
  </div>`;
}

async function prospectHtml(firstName: string, locale: Locale): Promise<string> {
  const t = await getTranslations({ locale, namespace: "Email" });
  const hi = firstName ? t("hi", { name: esc(firstName) }) : t("hiAnonymous");
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f5f3;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
      <div style="background:${NAVY};padding:24px"><h1 style="margin:0;color:#fff;font-size:22px">${hi}</h1></div>
      <div style="padding:24px;color:${NAVY};font-size:15px;line-height:1.6">
        <p style="margin:0 0 16px">${t.markup("contact.received", { strong: (chunks) => `<strong>${chunks}</strong>` })}</p>
        <p style="margin:0 0 16px">${t("contact.faster")} <a href="https://cal.com/vireel/cherryzip" style="color:${CHERRY}">cal.com</a>.</p>
        <p style="margin:20px 0 0;font-weight:700;color:${CHERRY}">${t("slogan")}</p>
      </div>
    </div>
  </div>`;
}

/** Best-effort: never fail the submission on an email error. */
export async function sendContactEmails(p: ContactPayload, lang: Locale = "fr"): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set: skipping emails.");
    return;
  }
  const resend = new Resend(apiKey);
  const firstName = (p.full_name ?? "").trim().split(" ")[0] ?? "";

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: p.email,
      subject: `${lang === "en" ? "[EN] " : ""}Nouveau message contact : ${p.besoin ?? "Général"} (${p.full_name})`,
      html: teamHtml(p),
    });
  } catch (e) {
    console.error("[contact] team email failed:", e);
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: p.email,
      subject: (await getTranslations({ locale: lang, namespace: "Email" }))("contact.subject"),
      html: await prospectHtml(firstName, lang),
    });
  } catch (e) {
    console.error("[contact] prospect email failed:", e);
  }
}
