---
name: Cherryz
description: Connectivity broker for Cameroon. The site is a field quote book drawn on navy ink.
colors:
  cherry: "#a2032d"
  cherry-dark: "#7c0530"
  stamp: "#a2032d"
  navy: "#101b28"
  navy-deep: "#0b131d"
  ground: "#edf0f4"
  paper: "#ffffff"
  rule: "rgba(16, 27, 40, 0.12)"
  ink-soft: "#4a5563"
  positive: "#1f8a5b"
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(44px, 6vw, 80px)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 52px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.015em"
  figure-total:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 44px)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tnum"
  title:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17.5px"
    fontWeight: 400
    lineHeight: 1.65
  body-row:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.5
  label-action:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "0.02em"
  label-legend:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  chip: "8px"
  btn: "10px"
  sheet: "14px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "48px"
  container: "1280px"
  section: "80px"
  section-md: "112px"
  sheet-x: "36px"
  row-y: "12px"
components:
  button-primary:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.paper}"
    typography: "{typography.label-action}"
    rounded: "{rounded.btn}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cherry-dark}"
    textColor: "{colors.paper}"
  button-outline-on-navy:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label-action}"
    rounded: "{rounded.btn}"
    padding: "20px 24px"
  path-tab:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.btn}"
    padding: "16px 20px"
  path-tab-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.btn}"
    padding: "16px 20px"
  choice-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.chip}"
    padding: "9px 16px"
  choice-chip-active:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.chip}"
    padding: "9px 16px"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sheet}"
    padding: "36px 36px 28px"
  offer-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sheet}"
    padding: "28px 36px"
---

# Design System: Cherryz

## Overview

**Creative North Star: "The Field Quote Book"**

Cherryz is drawn as the quote book a connectivity technician carries on site. Navy ink fields carry the voice of the page; white numbered sheets, ruled and perforated along the top edge, carry the figures. The visitor does not read a brochure, they watch a quote being filled in with their own numbers, then send it. Everything that is a figure is set in tabular numerals and treated as a line item, not a marketing claim.

The world is flat, ruled and exact. Depth comes from paper lying on ink, not from gloss: no gradients, no glow, no hero photograph. Cherry is the colour of the rubber stamp and nothing else, so wherever cherry appears the eye reads "this is the total" or "this is the action". Line schematics in white at a 1.5px stroke explain the broker mechanism on navy. Motion is a single authored gesture (figures tick, the stamp presses once per change of path) and steps aside completely under reduced motion.

The density is that of a working document: compact rows, firm 2px navy rules under every sheet header, 1px hairline rules between rows, generous space between sections. It must read as serious enough for a general manager or IT director; playful chrome undermines that.

**Key Characteristics:**
- Navy ink fields own the hero, the mechanism band and the close.
- White sheets: perforated top edge, 2px navy rule under the header, 1px rules between rows.
- Cherry is stamp ink only: the stamp, totals, primary actions, the broker hub node.
- Barlow Condensed for voice, Barlow for reading, tabular numerals for every figure.
- Drawn line icons and line schematics; no glyph icons.
- Content is visible without JavaScript; motion is an enhancement that reduced motion removes.

**Migration status (branch `refonte`).** Home, Internet B2B, WiFi Zone, Contact, the `/demandes` hub and both questionnaires, the legal pages and the shared chrome are in this world. Only the maintenance page still carries the previous look (pill buttons, eyebrow chips, photo hero, `cherry-alt`, accent pinks); those patterns are not the system. `PageHero`, `FinalCta`, `SectionEyebrow` and `ReassuranceBar` are leftovers of the old look and no page uses them.

## Colors

Two inks and one stamp: navy fields, white paper, cherry reserved for the mark that matters.

### Primary
- **Stamp Cherry** (`cherry`, also exposed as `stamp`): the round ESTIMATION stamp on sheets, the total figure on a quote, the primary action button, the Cherryz hub node in the broker schematic, and the selected-path radio dot. Nowhere else.
- **Pressed Cherry** (`cherry-dark`): hover state of primary actions only.

### Neutral
- **Ink Navy** (`navy`): the hero and close fields, the solid nav, the footer, the mobile action bar; on paper it is the text colour, the 2px header rule, the selected choice chip, and the "Avec Cherryz" column rule.
- **Deep Ink** (`navy-deep`): the mechanism band, one step darker so the band separates from the hero without a border.
- **Cool Ground** (`ground`): the light section field on which sheets lie (on-site process, references).
- **Paper** (`paper`): sheets, offer cards, the offers section field, and text on navy.
- **Hairline Rule** (`rule`): 1px row dividers, chip and card borders.
- **Soft Ink** (`ink-soft`): labels, secondary values, row descriptions and notes on paper. On navy, secondary text is white at 70 to 80% opacity instead.

### Semantic
- **Saving Green** (`positive`): the estimated-saving row and check marks in the comparison. A figure that is good news, never an action.
- **WhatsApp Green** (`whatsapp`): the WhatsApp glyph on navy only.

### Named Rules
**The Stamp Ink Rule.** Cherry marks the stamp, totals, primary actions and the broker hub, and nothing else: no cherry headings, borders, backgrounds, highlights or decorative shapes. If a screen has more cherry than that, something has been promoted that should not be.

**The Two Inks Rule.** Sections alternate between navy ink fields and light grounds (`ground` or `paper`). Hero, mechanism and close are always navy.

## Typography

**Display Font:** Barlow Condensed (with system-ui, sans-serif), weights 500 to 800
**Body Font:** Barlow (with system-ui, sans-serif), weights 400 to 700

**Character:** A narrow, upright industrial grotesque for headings, figures and actions, like the printed fields of a form; its regular-width sibling for everything read in sentences.

### Hierarchy
- **Display** (700, clamp(44px, 6vw, 80px), 0.95): the H1 only, on navy, balanced, max about 12ch.
- **Headline** (700, clamp(34px, 4.2vw, 52px), 1): section H2s, balanced, max about 17 to 20ch.
- **Figure Total** (700, clamp(30px, 4vw, 44px), 1, tabular): the cherry total on a quote sheet, followed by "XAF" in Barlow 600 16px navy.
- **Title** (700, 24px mobile / 28px desktop, 1.25): sheet titles and offer-card titles, sitting directly above the 2px navy rule.
- **Body** (400, 17.5px, 1.65): section prose, max 48 to 52ch; the hero lead is 18px / 1.55, max 46ch.
- **Body Row** (400, 15.5 to 16px, 1.55): sheet rows, comparison cells, process steps.
- **Note** (400, 13.5px, 1.5): sheet metadata and estimate disclaimers, in soft ink, max 62ch.
- **Label Action** (Condensed 600, 16 to 20px, 0.02em): button and tab labels, sentence case.
- **Label Legend** (Condensed 600, 15px, 0.06em, uppercase): fieldset legends and footer column titles only.

### Named Rules
**The Tabular Rule.** Every figure (prices, counts, phone numbers, dates, step numbers) is set with tabular numerals and thousands separated by a space, so columns align and ticking values never jitter.

**The No Kicker Rule.** Headings stand alone. No eyebrow, kicker or chip label sits above a heading. The uppercase legend style labels a form control group or a footer column; it never introduces a heading. A sheet's own header fields (Devis n°, Date, Établi pour) are quote-book metadata, part of the world, not kickers.

## Layout

A 1280px container with 16 / 24 / 48px gutters at mobile / tablet / desktop, on a 12-column grid from `lg`. Content sections split 5/7: prose and heading in the 5, a sheet or schematic in the 7. Sections breathe at 80px vertical padding, 112px from `md`. Sheets pad 20px horizontally on mobile and 36px from `sm`, 32 to 40px at the top so the perforation never crowds text. Rows run 12px vertical on the hero sheet and 17 to 18px in comparison and process sheets.

On mobile, everything stacks in source order: H1, lead, path switch, then the sheet. Tables become ruled definition lists on the same sheet; the wide broker schematic swaps for a tall one. The close splits 50/50 at `lg` with a full-bleed photograph opposite the contact actions, inside a 1440px frame.

The nav is fixed and transparent over the navy hero, turning solid navy with a hairline once scrolled. On mobile a fixed bottom action bar (quote + WhatsApp) appears after 420px of scroll and steps aside whenever a primary action marked as such is on screen.

## Elevation & Depth

Flat by default. Depth is paper on ink: a white sheet on a navy field reads as lifted by contrast alone. One shadow exists to make that literal for the hero sheet; chrome uses soft shadows only while it overlays scrolling content. Sheets on light grounds carry no shadow; offer cards use a hairline border instead.

### Shadow Vocabulary
- **Sheet on ink** (`box-shadow: 0 40px 80px -40px rgba(0,0,0,0.7)`): the hero quote sheet on navy only.
- **Chrome over content** (`box-shadow: 0 10px 30px -18px rgba(0,0,0,.7)` for the solid nav; `0 -12px 30px -18px rgba(0,0,0,.6)` for the mobile bar): fixed chrome once it overlays the page.

### Named Rules
**The No Glow Rule.** No gradients, no coloured shadows, no glow. The legacy `shadow-cherry` and `shadow-card` tokens belong to unmigrated pages.

## Shapes

Rectangles with moderate corners. Buttons and path tabs are 10px-radius rectangles, choice chips 8px, sheets and cards 14px. A sheet rounds only its bottom corners; its top edge is perforated, a row of 5px semicircle bites every 18px cut by a mask, like a page torn from a quote book. Full circles are reserved for the stamp, the radio dot of the path switch, the trust-list bullets and the hub node. Photographs sit in a 14px-radius frame at 4:3 on light grounds.

Line work: UI icons are drawn on a 24px grid at a 1.8px round stroke in `currentColor`; schematics use a 1.5px stroke, with a heavier 2.5px for the single delivered connection, and dashed lines for unnamed operators.

**The Rectangle Rule.** No pill buttons. Actions are 10px-radius rectangles.

## Components

### Buttons
Firm, printed, unmistakable.
- **Shape:** 10px-radius rectangle.
- **Primary:** cherry fill, white Condensed 600 label at 0.02em, trailing drawn arrow icon; 16px × 24px padding (14px × 20px in cards, 20px × 24px in the close, 12px × 20px in the nav).
- **Hover / Focus:** hover darkens to `cherry-dark` with a colour transition only; focus-visible draws a 2px outline at 2px offset, cherry on paper, white on navy.
- **Outline on navy:** transparent with a 1.5px white border at 25%, hover to 60%; used for WhatsApp and phone in the close, each with its number in Barlow tabular at the right.
- **Text link:** Barlow 600 navy, underlined at 30% navy with a 4px offset, full navy on hover. Used for secondary paths ("Découvrir l'offre", "Une question ? WhatsApp").

### Path Switch
Two large toggle buttons (`aria-pressed`) on navy: inactive is transparent with a white 25% border; active turns to a white fill with navy text. A 20px radio circle at the right fills cherry with a white dot when selected. Grouped in a fieldset with an uppercase legend.

### Choice Chips
Option buttons inside a sheet (Mbps, users, ticket price): 8px radius, 1.5px hairline border, paper fill, Barlow 600 15px tabular, minimum 64px wide. Selected inverts to a navy fill with white text; hover darkens the border to navy at 50%.

### Sheets (signature)
The quote sheet is the system's core container.
- **Corner Style:** perforated top edge, 14px bottom corners.
- **Background:** paper, text navy.
- **Header:** metadata fields in Note size (labels soft ink, values navy 600), the title, and the stamp at the right, closed by a 2px navy rule.
- **Rows:** label left in soft ink, value right, separated by 1px hairline rules; a strong row sets its label in navy 600.
- **Total:** opened by a 2px navy rule, label in Condensed 700 18px, cherry figure total, and a soft-ink note beneath stating what the estimate rests on.
- **Action:** the primary button sits at the foot of the sheet, a text link beside it.

### Stamp
A round rubber stamp: two concentric rings (3px and 1.5px), "ESTIMATION · INDICATIVE · CHERRYZ" set on the ring in Condensed 700 caps, "CHZ" at the centre, at 90% opacity. Cherry on a sheet at 78px / 96px; white at 85% on navy in the close. On a sheet it presses in once per path change (rotate −14°, scale 1.35 to 1, 0.45s, `cubic-bezier(0.16, 0.7, 0.3, 1)`).

### Offer Cards
Paper cards with a 1px hairline border and 14px radius (no perforation, they are not quotes): a drawn icon and Condensed title over a 2px navy rule, a ruled definition list, then a primary button and a text link.

### Broker Schematic
White line drawing on navy: operator nodes as white 6px-radius tags with their logo, curved 1.5px feeds into the cherry hub ("Cherryz · compare · négocie"), one 2.5px arrow to a line-drawn building ("Votre site"). Wide and tall variants; labelled with a full-sentence `aria-label`.

### Navigation
Fixed, transparent over the navy hero, solid navy with a hairline bottom border and shadow once scrolled. Links in Condensed 600 15px at 0.6px tracking, white at 72%, full white when current. The quote action is a primary button. On mobile, a three-bar toggle opens a navy panel of ruled links with a full-width primary button.

### Footer
Navy field, four columns, uppercase legend-style column titles in white at 50%, links in Barlow 15.5px at 78% white with drawn line icons, a hairline above the legal row.

### Motion
- **Ticking figures:** values ease to their new target over 420ms (cubic ease-out); instant under reduced motion.
- **Reveal:** sections fade up 30px with a CSS scroll-driven animation only where `animation-timeline: view()` is supported and motion is allowed; otherwise content is simply there.
- **Reduced motion:** a global block reduces every animation and transition to 0.01ms.

## Do's and Don'ts

### Do:
- **Do** put the hero, the mechanism band and the close on navy fields, and figures on white sheets.
- **Do** give every sheet a perforated top edge, a 2px navy rule under its header and 1px hairline rules between rows.
- **Do** set every figure in tabular numerals, thousands separated by a space, currency after the number.
- **Do** keep cherry to the stamp, totals, primary actions and the broker hub node.
- **Do** use drawn SVG line icons from the shared icon set (24px grid, 1.8px round stroke, `currentColor`).
- **Do** make content visible without JavaScript and treat every animation as an enhancement that reduced motion removes.
- **Do** label estimates as estimates, with the note that says what they rest on.

### Don't:
- **Don't** place an eyebrow, kicker or chip label above a heading.
- **Don't** use pill-shaped buttons; buttons are 10px-radius rectangles.
- **Don't** use Unicode arrows, emoji or text glyphs as icons. Typographic punctuation (·, –, ≈) inside copy is fine.
- **Don't** use cherry for headings, borders, backgrounds or decoration.
- **Don't** use gradients, glows or coloured shadows, or a photograph as the hero.
- **Don't** copy patterns from pages that have not migrated yet (Internet B2B, WiFi Zone, Contact, `/demandes`, maintenance).
- **Don't** treat the stock photographs in `public/photos/refonte/` as final: they are placeholders with embedded provenance, and `terrain-installation.jpg` is to be replaced by a real Cherryz installation photo.
