// Shared classes of the team dashboard (/admin), from the site's design system:
// same fields and buttons as the quote questionnaire, in a quieter setting.

export const field =
  "w-full rounded-[11px] border-[1.5px] border-[rgba(16,27,43,0.16)] bg-white px-[15px] py-3 text-[16px] text-navy-alt transition-colors placeholder:text-[#6b7280] focus:border-cherry focus:outline-none focus:shadow-[0_0_0_3px_rgba(162,3,45,0.22)]";

export const label = "mb-[7px] block font-sans text-[15px] font-semibold text-navy-alt";

export const btnPrimary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-cherry-alt px-6 py-3 font-condensed text-[16px] font-semibold tracking-[0.5px] text-white transition-colors hover:bg-[#c0093a] disabled:cursor-not-allowed disabled:opacity-60";

export const btnSecondary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-navy/20 bg-white px-5 py-3 font-condensed text-[16px] font-semibold tracking-[0.5px] text-navy transition-colors hover:border-navy/40";

export const card = "rounded-2xl border border-navy/[0.08] bg-white shadow-[0_24px_50px_-34px_rgba(16,27,40,0.4)]";

/** Status badge colours: neutral for the pipeline, green for won, grey for lost. */
export function statutBadge(statut: string): string {
  const base = "inline-flex items-center rounded-full px-[10px] py-1 font-condensed text-[13px] font-semibold tracking-[0.3px]";
  if (statut === "nouveau") return `${base} bg-cherry-alt text-white`;
  if (statut === "client") return `${base} bg-positive/[0.12] text-positive`;
  if (statut === "perdu") return `${base} bg-navy/[0.06] text-navy/60`;
  return `${base} bg-cherry-alt/[0.08] text-cherry-alt`;
}
