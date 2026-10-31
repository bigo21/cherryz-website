// Checks the translation catalogs (npm run i18n:check):
// - messages/fr.json and messages/en.json have exactly the same keys;
// - every message is valid ICU and plain text survives ICU parsing unchanged
//   (an apostrophe before { or } would silently swallow text);
// - the questionnaire copy matches lib/quote/schemas.ts (one label per step,
//   question and option, in the schema's order).
import { readFileSync } from "node:fs";
import { parse, TYPE } from "@formatjs/icu-messageformat-parser";

const load = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const catalogs = { fr: load("fr"), en: load("en") };
const problems = [];

function leaves(node, path = "", out = {}) {
  if (typeof node === "string") out[path] = node;
  else if (node && typeof node === "object" && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) {
      if (k.includes(".")) problems.push(`"." in key: ${path}.${k}`);
      leaves(v, path ? `${path}.${k}` : k, out);
    }
  } else problems.push(`not a string or object: ${path}`);
  return out;
}

const flat = { fr: leaves(catalogs.fr), en: leaves(catalogs.en) };
for (const [a, b] of [["fr", "en"], ["en", "fr"]]) {
  for (const k of Object.keys(flat[a])) if (!(k in flat[b])) problems.push(`missing in ${b}: ${k}`);
}
for (const [locale, messages] of Object.entries(flat)) {
  for (const [k, s] of Object.entries(messages)) {
    try {
      const ast = parse(s);
      const plain = ast.every((n) => n.type === TYPE.literal);
      if (plain && ast.map((n) => n.value).join("") !== s) problems.push(`ICU alters ${locale}: ${k}`);
    } catch (e) {
      problems.push(`invalid ICU in ${locale}: ${k} (${e.message})`);
    }
  }
}

const { schemaIP, schemaWifi } = await import("../lib/quote/schemas.ts");
for (const [type, schema] of [["ip", schemaIP], ["wifi", schemaWifi]]) {
  const copy = catalogs.fr.Questionnaire[type];
  if (Object.keys(copy.steps).length !== schema.length) problems.push(`Questionnaire.${type}.steps: ${schema.length} steps expected`);
  for (const q of schema.flatMap((s) => s.questions)) {
    const c = copy.questions[q.id];
    if (!c) {
      problems.push(`Questionnaire.${type}.questions.${q.id}: missing`);
      continue;
    }
    const n = Object.keys(c.options ?? {}).length;
    if (n !== (q.options?.length ?? 0)) problems.push(`Questionnaire.${type}.questions.${q.id}.options: ${q.options?.length ?? 0} expected, ${n} found`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`messages ok: ${Object.keys(flat.fr).length} per locale`);
