# Handoff: Soap Notes Landing Page

## Overview

A single-page marketing site for **Soap Notes** — a small-batch luxury soap brand whose product is really the pairing of a scent with a question. Every bar ships with a sealed card carrying a question; the soap is the thing you hold while you think about it.

The page's job: tell the origin story, sell the four-bar Founding Set (and the boxed trio), and introduce the S.O.A.P. Series as a second, faith-adjacent product line. Primary conversion is add-to-cart on individual bars and the $48 trio; secondary is the email list.

Audience is warm, not cold retail — people arriving from a community newsletter and word of mouth who already half-know the story.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes that show intended look, behavior, and copy. They are **not production code to copy directly.**

`Soap Notes Kraft.dc.html` is authored in a bespoke streaming-component format (a template plus a logic class, assembled by a local `support.js` runtime). Do **not** try to port that runtime. Read the file for markup structure, exact copy, and inline style values, then **recreate the design in the target codebase's own environment** — React, Vue, Svelte, Astro, Shopify Liquid, whatever is already there — using its established component patterns, styling approach, and libraries.

If no environment exists yet: this is a content-led commerce page, so a static-first framework with an e-commerce backend (Astro or Next.js against Shopify/Stripe) is the natural fit. The 3D module is plain ES-module `three.js` and ports as-is.

`soap-bar-3d.js` is the exception — it is **real, portable code**. It is a dependency-free custom element (only `three` as an import) and can be dropped into the target project nearly unchanged. See "The 3D product mockups" below.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interaction behavior. Recreate the UI to match. Two deliberate exceptions, both marked in the markup with square brackets:

- Bracketed placeholders — `[Her Name]`, `[Location optional]`, `[Instagram handle]`, `[Email]` — are unresolved content, not design. The client has not supplied them.
- All product photography is replaced by live 3D mockups (see below). There are no photographs in this design. If real product photography arrives later, the `.plate`-wrapped figures are the slots it goes into, and the 3D module can be retired or kept for the hero only.

Prices ($18/bar, $48/trio) are from the concept doc and should be treated as real.

## Design System

This page is built on a bound design system called **Classical** — an editorial, book-like system. The consuming codebase should reuse its equivalents rather than re-deriving them. The relevant inherited rules:

- **Color is applied as stroke, not fill.** Buttons are 1px outlines on transparent. Cards are bordered, never filled with accent. No large color fills except the two intentional dark bands.
- **Hairline rules carry the structure** — `1px` dividers at ~20% ink between major sections, ~14% within lists.
- **Photographs and figures are matted** in a `.plate` wrapper (thin surface-colored mat, slight warm grade) so they read as tipped-in book plates rather than banners. Every 3D mockup in this design is inside a `.plate`.
- **Body copy is justified** at a comfortable measure with hyphenation on.
- **Bold is avoided.** Weight tops out at 500–600; emphasis comes from italics and scale.
- **Airy spacing.** Do not tighten leading or crowd margins.
- Focus is always a themed ring — `2px solid` accent at `2px` offset. Never the browser default.

### Palette override

The design system's stock ground is a near-white (#f3f2f2) with a gold accent. **This page deliberately overrides both** per the brand's packaging spec: kraft-paper tan ground, oxblood accent. Carry the overrides, not the stock values.

| Token | Value | Role |
| --- | --- | --- |
| `--sn-paper` | `#D9CBA3` | Page ground (kraft tan) |
| `--sn-card` | `#E3D6B4` | Product card fill, input fill |
| `--sn-cream` | `#EDE4CC` | Lighter bands (origin, trio, email), sticky bar, light type on dark |
| `--sn-ink` | `#211D19` | Body ink; also the dark band background |
| `--sn-soft` | `#4f483c` | Secondary/body text on tan |
| `--sn-accent` | `#6E2A2A` | Oxblood — headings, buttons, rules, links |
| accent pressed | `#4d1c1c` | Button active/link hover |
| gold (dark bands only) | `#c9a06d` | Kickers and S.O.A.P. letterforms on `--sn-ink` |
| cream body on dark | `#ddd3bd` | Paragraph text on dark bands |
| muted on dark | `#9a8f7a` | Fine print on dark bands |
| `--sn-rule` | `rgba(33,29,25,0.2)` | Section hairlines, card borders |
| `--sn-hair` | `rgba(33,29,25,0.14)` | Within-list hairlines |

Contrast note: `#6E2A2A` on `#D9CBA3` is ~6:1 — safe for body text, unlike the design system's stock gold. Keep the accent for paragraph-size text only against the tan and cream grounds, never against the dark band.

## Typography

Two families, loaded from Google Fonts.

- **Lora** (serif) — `400, 500, 600` + italics. All headings, the brand mark, prices, pull quotes.
- **Karla** (sans) — `300, 400, 500, 600`. Body copy, kickers, buttons, nav, fine print.

This pairing is itself an override — the design system's stock heading face is Cormorant Garamond. The concept doc specifies Lora, and Lora is what ships here.

| Role | Family | Size | Weight | Line-height | Tracking | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| H1 "Soap Notes" | Lora | `clamp(48px, 7vw, 86px)` | 500 | 1.02 | `-0.015em` | Optical left inset `-0.03em` |
| Hero subhead | Lora | `clamp(21px, 2.5vw, 27px)` | 400 | 1.38 | — | max `30ch` |
| Hero body | Karla | 16.5px | 400 | 1.72 | — | max `42ch` |
| Section H2 | Lora | `clamp(32px, 4.4vw, 56px)` | 500 | 1.08 | `-0.01em` | Optical inset `-0.03em` |
| Smaller H2 | Lora | `clamp(26px, 3vw, 36px)` | 500 | 1.16 | — | Email capture, trio |
| Kicker | Karla | 12px | 500 | — | `0.15em` | Uppercase, accent (gold on dark) |
| Bar name H3 | Lora | 28px | 500 | 1.08 | — | Accent |
| Bar sub-label | Karla | 11.5px | 500 | — | `0.13em` | Uppercase, `--sn-soft` |
| Bar body copy | Karla | 14.5px | 400 | 1.7 | — | Justified, hyphenated |
| Body copy | Karla | 16–16.5px | 400 | 1.75–1.78 | — | Justified, hyphenated |
| Price | Lora | 19px (card) / 24px (trio) | 400 | — | — | `font-feature-settings: 'tnum' 1` |
| Button | Karla | 12–13px | 500 | 1.2 | `0.07em` | Uppercase |
| Nav link | Karla | 12px | 400 | — | `0.1em` | Uppercase |
| Pull quote | Lora | `clamp(24px, 3vw, 32px)` | 400 italic | — | — | Accent |
| Closing line | Lora | `clamp(22px, 3.2vw, 34px)` | 400 | 1.32 | — | Cream on dark |
| Footer / fine print | Karla | 13px | 400 | 1.6 | — | — |

All prices and figures set tabular (`'tnum' 1`); running prose keeps default figures.

## Layout Skeleton

Single column of full-bleed sections. Content is capped at `max-width: 1200px`, centered, with a fluid gutter `--sn-edge: clamp(20px, 5vw, 64px)`. Vertical section rhythm is `clamp(52px, 7vw, 96px)`.

Multi-column areas use `repeat(auto-fit, minmax(<floor>, 1fr))` so they collapse without media queries — there are **no breakpoints in this design**, and there shouldn't need to be. Floors: 240px (value props), 260–290px (two-ups), 280px (product cards), 170px (S.O.A.P. letters).

Section order:

1. **Nav** — brand left, three anchor links right, bottom hairline
2. **Hero** — 5fr/6fr split: copy left, 3D trio right (collapses to stacked)
3. *(sticky-bar sentinel — 1px)*
4. **Origin story** — cream band, two columns, headline + founder attribution left, prose right
5. **Founding Set intro** — kicker, H2, then a two-up of lede paragraph + a `<dl>` of the four bars
6. **Product cards** — 4-up grid of bordered cards, each with 3D mockup, name, sub-label, justified scent notes, price + CTA pinned to card bottom
7. **Trio box** — cream bordered panel, copy left, 3D drawer box right
8. **S.O.A.P. Series** — dark band (`--sn-ink`), the four letterforms in a hairline-gapped grid, two-column prose, CTA
9. **Value props** — three columns, each with a top rule
10. **Closing line** — dark band, centered
11. **Email capture** — cream band, headline left, input + button right, `align-items: end`
12. **Footer** — three text blocks, last pushed right with `margin-left: auto`
13. **Sticky buy bar** — fixed, off-screen until scrolled past the hero

## Components

### Buttons

Single outline treatment, no filled variant.

```
font: 500 13px Karla; letter-spacing: 0.07em; text-transform: uppercase;
color: #6E2A2A; background: transparent;
border: 1px solid #6E2A2A; border-radius: 2px;
padding: 13px 24px; line-height: 1.2;
transition: background-color .25s, color .25s, border-color .25s;
```

- **hover** — `background: rgba(110,42,42,0.09)`
- **active** — border and text to `#4d1c1c`
- **focus-visible** — `outline: 2px solid #6E2A2A; outline-offset: 2px`
- **secondary** (hero's second CTA) — border `rgba(33,29,25,0.3)`, text `--sn-ink`
- **on-dark variant** — text `--sn-cream`, border `rgba(237,228,204,0.55)`; hover fills `rgba(237,228,204,0.12)` and border goes solid cream
- **in-card** — `padding: 11px 18px; font-size: 12px`

Note the border radius: **2px**, not the design system's stock 4px. Intentional — it reads as a letterpress rule.

### Nav links

12px Karla, `0.1em` uppercase, `--sn-soft`, no underline, `1px` transparent bottom border. On hover the text goes accent and the border becomes a visible accent underline — so the underline animates in without shifting layout.

### Product card

```
background: #E3D6B4; border: 1px solid rgba(33,29,25,0.2);
border-radius: 2px; padding: 22px 24px;
display: flex; flex-direction: column;
```

Order inside: `.plate`-matted 3D mockup (4:3, min-height 170px, 14px bottom margin) → H3 name → uppercase sub-label → justified scent copy → footer row. The footer row uses `margin-top: auto` so price/CTA sit flush to the card bottom regardless of copy length — the four scent descriptions differ substantially in length and the cards must still align.

### The `<dl>` bar index

Two-column grid, `max-content 1fr`, `0 24px` gap. Top rule at `--sn-rule`; each subsequent row parted by `--sn-hair` on both the `dt` and `dd`. Terms are 15px Lora 500 accent; definitions 15px Karla `--sn-soft` at 1.6.

### S.O.A.P. letter grid

`repeat(auto-fit, minmax(170px, 1fr))` with `gap: 1px` over a `rgba(237,228,204,0.22)` background — the background bleeds through the gaps to draw hairlines without borders. Each cell is `--sn-ink` with 26px/22px padding: a 44px Lora gold letterform, then a 12px `0.14em` uppercase cream label (Scripture / Observation / Application / Prayer).

### Email capture

Flex row, `gap: 10px`, wrapping. Input is `flex: 1 1 200px`, `min-height: 46px`, fill `--sn-card`, border `rgba(33,29,25,0.28)`, Karla. Button matches at `min-height: 46px`. Below: 13px fine print, "No spam. Just soap notes."

**Not wired.** No validation, no submit handler, no success state — the client hasn't chosen an ESP. Wire it to whatever the codebase uses, add inline validation and a success state, and keep the button's 46px height so the row stays aligned.

## Interactions & Behavior

Three behaviors, all implemented.

### Scroll reveals

Sections carry `data-reveal`. Initial state `opacity: 0; transform: translateY(18px)`; revealed state `data-reveal="in"` → `opacity: 1; transform: none`. Transition: `opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)`.

Driven by a single `IntersectionObserver` with `rootMargin: '0px 0px -8% 0px'`, `threshold: 0.05`, unobserving each element once fired — reveals are one-shot, never re-hiding on scroll up.

### Sticky buy bar

A 1px sentinel sits immediately after the hero. A second `IntersectionObserver` (`threshold: 0`) watches it; when it is not intersecting **and** its `boundingClientRect.top < 0` (i.e. scrolled past, not approached from below), the bar slides in. Transform `translateY(120%)` → `translateY(0)`, `.45s cubic-bezier(.2,.7,.2,1)`.

The bar is `position: fixed; bottom: 0; z-index: 40`, cream ground, top border `rgba(33,29,25,0.26)`, and a whisper shadow `0 -3px 10px rgba(33,29,25,0.12)`. Contents: "The Founding Set" in Lora accent, "$18 a bar · $48 the trio" in tabular Karla, then a "Shop the set" button pushed right.

### Smooth anchor scrolling

`html { scroll-behavior: smooth }` for the three nav anchors (`#origin`, `#founding`, `#series`).

### Reduced motion

`@media (prefers-reduced-motion: reduce)` disables smooth scroll and forces all reveals to their visible state with `transition: none`. **Carry this.** Also stop the 3D idle rotation — see below.

## The 3D Product Mockups

The distinguishing feature of this page, and the piece most likely to be mishandled in a port. There is no product photography; every product slot is a live `three.js` render.

`soap-bar-3d.js` defines a `<soap-bar-3d>` custom element. Attributes:

| Attribute | Values | Effect |
| --- | --- | --- |
| `mode` | `bar` (default), `trio`, `box` | Which arrangement to build |
| `tone` | hex | Soap body color |
| `label` | string | Bar name stamped on the wrapper |
| `sub` | string | Small line under the name |
| `band` | hex, default `#D9CBA3` | Kraft wrapper color |
| `accent` | hex, default `#6E2A2A` | Stamp ink |
| `spin` | `0` to disable | Idle oscillation |

Six mount points: `mode="trio"` in the hero, `mode="bar"` in each of the four product cards (tones `#EFE6D2`, `#E9D2CC`, `#EFE2C6`, `#E7DCC2` for Agora/Eros/Kairos/Logos), and `mode="box"` in the trio panel.

### How it's built

- **Bars** are extruded rounded rectangles (`ExtrudeGeometry` on a quadratic-curve `Shape`, bevelled, rotated flat and re-centered on its own base) at 88×62×30mm — roughly a real bar of soap. `MeshStandardMaterial` at `roughness: 0.62`.
- **Wrappers** are a box sleeve at 58% of the bar's length, 1.6mm proud of the soap on each axis. The brand stamp is a **canvas texture** — a 1024×512 `CanvasTexture` drawn at runtime with the brand mark, the bar name in Lora, an optional sub-line, a hairline accent border, and ~2600 random 2px specks at 5% alpha for paper tooth. It is applied only to the `+y` face via a per-face material array, so the stamp reads on top and the sides stay plain kraft.
- **The drawer box** is a five-panel kraftboard sleeve (top/bottom/left/right/back, 4mm stock) with a separate tray slid forward to 42% of depth, cream-lined floor, holding three shorter wrapped bars. A plane with its own stamp texture sits 0.5mm above the sleeve top.
- **Lighting** is a hemisphere light plus a warm key at intensity 2.1 with a 1024² PCF-soft shadow map and a tight ortho frustum, plus a cool fill at 0.45. A `ShadowMaterial` ground plane at `opacity: 0.22` catches the contact shadow. `ACESFilmicToneMapping`, exposure 1.02.
- **Camera** is a 28° perspective on a turntable: `-0.52rad` base azimuth, oscillating `±0.36rad` at `0.28 rad/s`, positioned at `radius * 0.62` elevation and aimed at a per-mode lift point.

### The performance architecture — do not flatten this

The first implementation gave each element its own `WebGLRenderer`. Six live contexts exceeded the browser's limit and contexts were silently evicted, blanking mockups.

The shipped version uses **one shared `WebGLRenderer` for the whole page.** Each element owns a cheap 2D canvas; the shared renderer resizes to that element's dimensions, renders its scene, and the result is blitted across with `drawImage`. This requires `preserveDrawingBuffer: true`.

Also load-bearing:

- Only elements intersecting the viewport are in the render set (`IntersectionObserver`, `threshold: 0.02`).
- The loop is throttled to ~30fps — an idle turntable does not need 60.
- Static instances (`spin="0"`) render once and then only on demand via a `_dirty` flag.
- Backing store is capped at 1400px on the long edge and DPR at 2.
- `webglcontextlost` is caught and the shared renderer rebuilt; `webglcontextrestored` re-dirties every live element.
- `attributeChangedCallback` rebuilds the scene contents when `accent`/`band`/`tone`/`label`/`sub` change, so theme changes propagate to the stamps.

If the target framework wraps this in a component, keep the module-level singleton outside the component lifecycle — one renderer per page, not per component instance.

**Reduced motion:** the current module does not check `prefers-reduced-motion`. It should. Add a `matchMedia('(prefers-reduced-motion: reduce)')` check that forces `_spin = false` so the mockups render once and hold. Flagging as a known gap rather than silently leaving it.

**Fallback:** there is no no-WebGL fallback. Product slots will be empty on a machine without WebGL. Either add a static rendered PNG poster per mode, or gate on `WebGLRenderingContext` support and fall back to product photography when it exists.

## State

Almost none. This page is presentational.

- `showBar: boolean` — sticky bar visibility, driven by the sentinel observer
- reveal state — per-element, held in a DOM attribute rather than a store, deliberately
- 3D internals — `_dirty`, `_spin`, `_phase`, plus the module-level live set

A real implementation adds: cart state for the five SKUs (four bars + trio), email-capture form state (value, validation, submitting, success, error), and whatever the commerce backend needs.

Tweakable props exposed in the prototype — `accent`, `paper`, `stickyBar`, `reveals` — are a design-review convenience, not product features. Don't port them.

## Spacing, Radius, Shadow

Spacing is fluid rather than a fixed scale. Recurring values:

- Section padding `clamp(52px, 7vw, 96px)`; hero `clamp(48px, 7vw, 92px)`
- Gutter `clamp(20px, 5vw, 64px)`
- Column gap `clamp(26px, 4vw, 64px)`; card grid gap `clamp(22px, 3vw, 36px)`
- Card padding `22px 24px`; panel padding `clamp(26px, 3.5vw, 44px)`
- Radius: `2px` everywhere. No other value appears.
- Shadow: exactly one in the whole page — `0 -3px 10px rgba(33,29,25,0.12)` on the sticky bar. Elevation is a whisper here; don't add more.

## Copy

All copy is final and comes from the client's concept doc. Source the exact strings from the HTML rather than retyping — the scent descriptions in particular are long, specific, and deliberately voiced.

Worth preserving: the CTAs are **not** generic. Each bar's button states a desire — "Yes, I want to begin," "Yes, I want love," "Yes, I want aliveness," "Yes, I want to be remembered," "Yes, I want it all." These are brand voice, not placeholders. Don't normalize them to "Add to cart."

Two taglines recur and should be treated as fixed: *"Lather in luxury. Keep the questions."* and *"The fragrance notes are meant for your senses. The soap notes are meant for your spirit."*

## Assets

- **Fonts** — Lora and Karla, Google Fonts. Self-host in production.
- **three.js** — `0.184.0`, pinned with SRI in an import map. Only `three` itself; no addons, no loaders, no `OrbitControls`.
- **Design system** — `_ds/classical-.../styles.css` provides tokens and the `.plate` / `.input` / `.hr` classes. Only `.plate` and `.input` are actually used; everything else is bespoke inline styles.
- **No images.** No icons either — the design system nominates Lucide, but this page uses none.
- `image-slot.js` is a leftover from an earlier photo-placeholder pass. Not referenced by the shipped design. Ignore it.

## Known Gaps

1. Bracketed placeholders unresolved — founder name, location, Instagram, email.
2. Email capture is inert.
3. No cart or checkout — CTAs are non-functional.
4. 3D module ignores `prefers-reduced-motion`.
5. No WebGL fallback.
6. Wax-seal treatment from the packaging spec is deliberately absent; don't reintroduce it.
7. `soapnotes.store` in the footer is the intended domain, not a live link.

## Files

| File | What it is |
| --- | --- |
| `Soap Notes Kraft.dc.html` | The design. Read for structure, copy, and style values — do not port the runtime. |
| `soap-bar-3d.js` | The 3D mockup custom element. **Portable as-is.** |
| `soap-notes-landing-page-copy.docx` | The client's concept doc — source of truth for copy, palette, and packaging. |
| `README.md` | This file. |
