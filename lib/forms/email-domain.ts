import "server-only";

import { resolveMx, resolve4 } from "node:dns/promises";

// Does the e-mail's domain accept mail? Asked to the DNS: a domain with mail
// servers (MX records), or at least an address (A record, the fallback mail
// servers use). It catches domains that do not exist or never receive mail
// (gmial.co, entreprise.cmm). It cannot tell whether the mailbox itself
// exists: nimporte@gmail.com passes.
//
// FAIL-OPEN: when the DNS does not answer in time, the address is accepted.
// Losing a real client to a slow resolver costs more than a rare bad address.

const TIMEOUT_MS = 2500;
const cache = new Map<string, { ok: boolean; at: number }>();
const CACHE_MS = 60 * 60 * 1000;

function withTimeout<T>(p: Promise<T>): Promise<T> {
  return Promise.race([p, new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS))]);
}

/** Error codes meaning "this domain has no such record", as opposed to a failure to ask. */
const NO_RECORD = new Set(["ENOTFOUND", "ENODATA", "ENONAME"]);

async function hasRecord(lookup: () => Promise<unknown[]>): Promise<boolean | null> {
  try {
    return (await withTimeout(lookup())).length > 0;
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code ?? "";
    return NO_RECORD.has(code) ? false : null;
  }
}

/** True when the domain can receive mail, or when the DNS could not tell (fail-open). */
export async function emailDomainAcceptsMail(email: string): Promise<boolean> {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if (!domain) return false;
  const hit = cache.get(domain);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.ok;

  const mx = await hasRecord(() => resolveMx(domain));
  let ok: boolean;
  if (mx === true) ok = true;
  else if (mx === null) return true; // no answer: accept, and do not cache
  else {
    const a = await hasRecord(() => resolve4(domain));
    if (a === null) return true;
    ok = a;
  }
  cache.set(domain, { ok, at: Date.now() });
  return ok;
}

export const DOMAINE_INVALIDE =
  "Ce domaine ne reçoit pas d'e-mails. Vérifiez l'adresse (par ex. gmail.com, et non gmial.com).";
