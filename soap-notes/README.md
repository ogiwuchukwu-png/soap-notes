# Soap Notes — landing page

A single-page marketing site for Soap Notes, implemented from the Claude
Design handoff in `../project/design_handoff_soap_notes_landing/`. See that
folder's `README.md` for the full design spec (palette, type, layout,
interactions, copy) — this app is a from-scratch Next.js recreation of it,
not a port of the original `.dc.html` runtime.

## Stack

Next.js (App Router, TypeScript), plain CSS Modules (no UI framework), and
`three.js` for the product mockups. No backend — this pass is presentational
only.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `components/SoapNotesLanding.tsx` — the page, section by section.
- `components/primitives.module.css` — shared button/link/kicker/`.plate`/`.input` styles.
- `components/SoapNotesLanding.module.css` — per-section layout styles.
- `components/SoapBar3D.tsx` + `lib/soap-bar-3d.js` — the `<soap-bar-3d>` custom element (ported from the handoff) wrapped for React, with a WebGL feature check and a static fallback panel for browsers without it.
- `components/Reveal.tsx` — the one-shot scroll-reveal wrapper used by most sections.
- `components/HeroSentinel.tsx` + `components/StickyBuyBar.tsx` + `lib/sticky-bar-store.ts` — the sticky buy-bar behavior (sentinel and bar are far apart in the tree, so they're wired through a small store).

## Known gaps (carried from the handoff)

- Bracketed placeholders unresolved — founder name, location, Instagram, email.
- Email capture is presentational only — no validation, submit handler, or ESP.
- No cart or checkout — product/trio/series CTAs are non-functional.
- `soapnotes.store` in the footer is the intended domain, not a live link.

Closed in this pass (the handoff listed both as known gaps): the 3D module
now respects `prefers-reduced-motion` (idle rotation is skipped) and falls
back to a static branded panel when WebGL isn't available.

## Deliberate deviation from the handoff file

The original `.dc.html` hero used a fixed `5fr/6fr` grid that — unlike every
other multi-column area in the design — doesn't actually reflow on narrow
viewports. The handoff `README.md` describes the hero as "collapses to
stacked," and the rest of the page follows a strict no-breakpoints,
auto-fit-everywhere approach, so this app's hero uses
`repeat(auto-fit, minmax(320px, 1fr))` like the rest of the page instead of
the literal fixed ratio. This trades the exact 5:6 desktop proportion for a
hero that actually stacks on phones without a media query.
