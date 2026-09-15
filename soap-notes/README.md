# Soap Notes — landing page

A single-page marketing site for Soap Notes, implemented from the Claude
Design handoff in `../project/design_handoff_soap_notes_landing/`. See that
folder's `README.md` for the full design spec (palette, type, layout,
interactions, copy) — this app is a from-scratch Next.js recreation of it,
not a port of the original `.dc.html` runtime.

## Stack

Next.js (App Router, TypeScript), plain CSS Modules (no UI framework),
`three.js` for the product mockups, and Supabase for order/email capture
(no payment processing — orders are recorded for manual follow-up, not
charged).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in SUPABASE_URL and SUPABASE_ANON_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without the Supabase
env vars set, the page and UI work fully — only the order/subscribe API
routes fail (cleanly, with a normal error message) since there's nowhere to
write to.

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL editor — creates `subscribers`,
   `orders`, `order_items`, and row-level-security policies that let the
   anon key `INSERT` only (never read, update, or delete).
3. Copy the Project URL and the **anon / public** key (not `service_role`)
   into `.env.local` / your deploy environment as `SUPABASE_URL` and
   `SUPABASE_ANON_KEY`.

### Deploying to Netlify

`netlify.toml` pins `@netlify/plugin-nextjs`, so a standard Netlify site
pointed at this repo (base directory `soap-notes/` if deploying from the
monorepo root) builds and deploys with no extra config beyond setting
`SUPABASE_URL` / `SUPABASE_ANON_KEY` as site environment variables.

## Structure

- `components/SoapNotesLanding.tsx` — the page, section by section.
- `components/primitives.module.css` — shared button/link/kicker/`.plate`/`.input` styles.
- `components/SoapNotesLanding.module.css` — per-section layout styles.
- `components/SoapBar3D.tsx` + `lib/soap-bar-3d.js` — the `<soap-bar-3d>` custom element (ported from the handoff) wrapped for React, with a WebGL feature check and a static fallback panel for browsers without it.
- `components/Reveal.tsx` — the one-shot scroll-reveal wrapper used by most sections.
- `components/HeroSentinel.tsx` + `components/StickyBuyBar.tsx` + `lib/sticky-bar-store.ts` — the sticky buy-bar behavior (sentinel and bar are far apart in the tree, so they're wired through a small store).
- `lib/catalog.ts` — the one source of truth for SKU names/prices, used both for cart display and (server-side only) for repricing every order so a tampered client request can't change what an order is worth.
- `lib/cart-store.ts` + `components/AddToCartButton.tsx` + `components/CartToggle.tsx` + `components/CartPanel.tsx` — client-side cart state (same pub-sub pattern as the sticky bar) and the cart drawer UI.
- `components/SubscribeForm.tsx` — the "Keep me posted" form, now wired to `/api/subscribe`.
- `app/api/orders/route.ts` + `app/api/subscribe/route.ts` — Route Handlers that validate input and write to Supabase via `lib/supabase.ts` (server-only; never imported into client code).
- `supabase/schema.sql` — table definitions and RLS policies. Run once per Supabase project.

## Known gaps (carried from the handoff)

- Bracketed placeholders are all filled in now — Instagram handle is `@thesoapnotes_store`, email is `hello@soapnotes.com`; location was dropped (it was explicitly optional).
- No payment processing — "Place order" records the order in Supabase for manual follow-up (invoice, etc.), it doesn't charge a card. The "Shop the series" CTA still has no SKU/price defined and remains inert.
- `soapnotes.store` in the footer is the intended domain, not a live link.

Closed in this pass (the handoff listed both as known gaps): the 3D module
now respects `prefers-reduced-motion` (idle rotation is skipped) and falls
back to a static branded panel when WebGL isn't available. Email capture and
the five product/trio CTAs are now fully wired to Supabase instead of being
inert.

## Deliberate deviation from the handoff file

The original `.dc.html` hero used a fixed `5fr/6fr` grid that — unlike every
other multi-column area in the design — doesn't actually reflow on narrow
viewports. The handoff `README.md` describes the hero as "collapses to
stacked," and the rest of the page follows a strict no-breakpoints,
auto-fit-everywhere approach, so this app's hero uses
`repeat(auto-fit, minmax(320px, 1fr))` like the rest of the page instead of
the literal fixed ratio. This trades the exact 5:6 desktop proportion for a
hero that actually stacks on phones without a media query.
