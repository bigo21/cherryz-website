# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served with equal weight (confirmed 2026-10-30):

- **Internet B2B**: Cameroonian companies, institutions and organisations that need a reliable professional connection with a dedicated public IP. The people who decide are general managers, IT managers (DSI) and system administrators. Their job is to get a stable, dedicated link at a lower price than going directly to an operator, without civil works or downtime.
- **WiFi Zone**: entrepreneurs, property owners and managers, investors, hotels and campuses that want to turn a space (a building, neighbourhood, residence, market, hotel or campus) into paid public WiFi. Their job is to launch a profitable WiFi business without being a technician.

Many visitors arrive on mobile, sometimes on slow connections.

## Product Purpose

Cherryz is a connectivity broker based in Yaoundé that serves all of Cameroon. It is not an operator. It works in five steps:

1. analyses the client's need;
2. visits the site for free;
3. compares the infrastructure of its partner operators;
4. delivers the best-fitting solution;
5. provides after-sales support.

The website exists to turn visitors from both audiences into qualified quote requests.

## Positioning

The broker mechanism: Cherryz aggregates several operators (Camtel, Orange, MTN and others) and negotiates on the client's behalf. This gives multi-operator choice and a lower price than going direct, and the client keeps a single local contact for support. Baseline: « Cherryz — Vous connecte ! ».

## Operating Context

Prospects convert through every channel at once:

- the online quote questionnaires (`/demandes/internet-b2b` and `/demandes/wifi-zone`);
- WhatsApp;
- phone calls;
- in-person meetings and site visits.

Cal.com booking links exist as a secondary "prefer a call" option.

After a quote request, Cherryz studies the answers, calls the prospect back, and may send a technician on site.

## Capabilities and Constraints

- **Languages: bilingual French and English, required for the redesign launch** (confirmed 2026-10-30). French is the source language today. The English copy, including the quote questionnaires and confirmation emails, does not exist yet.
- The quote questionnaires' content (questions, options, branching) is fixed. Submissions go to Supabase, in the `cherryz` schema only, never `public`, and emails go out through Resend.
- The site runs on Next.js 16 (App Router) on Vercel. `proxy.ts` provides a maintenance gate (`MAINTENANCE_MODE`) that must keep working.
- **Decided on 2026-10-30:**
  - Response delays: 24h for the contact form, 48h for quote requests.
  - B2B price claim: "à partir de 45 000 XAF/Mbps". The current range of 45 000 – 70 000 XAF/Mbps is used only as a labelled estimate.
  - The 1xBet logo stays in the client references.
  - Legal pages are `/mentions-legales` and `/confidentialite`. The company identifiers in `lib/site/legal.ts` are still empty and must be provided by Cherryz before these pages go to production: legal name, legal form, capital, RCCM, NIU, address, publication director, ART reference, data retention period.

## Brand Commitments

- The logo and pictogram (`public/brand/`) stay as they are.
- The colours **cherry** (#a2032d / #a0042d) and **navy** (#101b28) stay.
- The two offers stay as they are: Internet B2B and WiFi Zone.
- The baseline « Cherryz — Vous connecte ! » stays.
- Desired feel for the redesign: more "tech" and warmer.

## Evidence on Hand

- **Operators:** the partner operator logos and client logos in `public/logos/`.
- **Regulation:** the company is regulated by the ART.
- **No real field material yet. Do not fabricate it:**
  - no real photos of Cherryz teams or installations (`public/photos/` holds illustrative imagery, not documented Cherryz work);
  - no named client stories or testimonials (the current case studies are labelled "indicatifs");
  - no validated price ranges for simulators.

  The user will provide these later. Until then, leave clearly marked slots and label any demonstration figures as estimates.

## Product Principles

1. Every page leads to a qualified quote request. The questionnaire is the primary path, and a human channel (WhatsApp or a call) is always one tap away.
2. Show the brokering, don't just claim it: visitors should see the comparison and the savings logic applied to their own situation.
3. Be truthful about evidence: no invented clients, figures or installations. Mark estimates as estimates.
4. Serve both audiences with equal weight, and make it obvious within seconds which path fits the visitor.
5. Work well on mobile and on slow connections. Content never depends on JavaScript to be visible.

## Accessibility & Inclusion

The site targets WCAG 2.1 AA:

- text contrast of at least 4.5:1;
- keyboard-operable forms, including the quote questionnaires;
- respect for `prefers-reduced-motion`;
- correct `lang` attributes for each language.
