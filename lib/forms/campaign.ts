// Campaign parameters (utm_*) of the visit. A visitor lands on a campaign link,
// then browses to a form whose address no longer carries them: they are kept in
// the tab's session storage (gone when the tab closes), never in a cookie.

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "chz_utm_v1";
/** Far above any real campaign value: the link is written by whoever shares it. */
const MAX = 150;

export type Utm = Partial<Record<(typeof KEYS)[number], string>>;

/** Keeps the known parameters, trimmed and bounded. */
function pick(read: (key: string) => unknown): Utm {
  const utm: Utm = {};
  for (const k of KEYS) {
    const v = read(k);
    if (typeof v === "string" && v.trim()) utm[k] = v.trim().slice(0, MAX);
  }
  return utm;
}

const fromAddress = (): Utm => {
  const params = new URLSearchParams(window.location.search);
  return pick((k) => params.get(k));
};

/**
 * Remembers the campaign of the current address. A new campaign replaces the
 * previous one whole, so two campaigns are never mixed.
 */
export function rememberCampaign() {
  const utm = fromAddress();
  if (!Object.keys(utm).length) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // Storage blocked: the form still reads its own address.
  }
}

/** Campaign of the visit: the current address first, else the one remembered. */
export function campaignUtm(): Utm {
  if (typeof window === "undefined") return {};
  const utm = fromAddress();
  if (Object.keys(utm).length) return utm;
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!saved || typeof saved !== "object") return {};
    return pick((k) => (saved as Record<string, unknown>)[k]);
  } catch {
    return {};
  }
}
