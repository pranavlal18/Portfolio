# Task 1 Report — Foundation (fonts, paper system, ticket nav, sticker hero)

**Status:** DONE
**Commit:** `7187297` — `feat: paper-collage foundation with ticket nav and sticker hero` (amended from `3ca42fd` to include one CSS fix found during verification)
**Base:** `c07d797` (branch `paper-redesign`) · 7 files changed, 360 insertions, 31 deletions

## What was built

1. **`index.html`** — added Google Fonts preconnect (×2) + stylesheet link only: Archivo Black, Fraunces (700/900 + italic), Inter (400/500/600/800). Verified via `git diff`: exactly 3 added lines; `<title>` and `<meta>` byte-identical.
2. **`src/index.css`** — fully overwritten with the reference paper system: OD-layout primitives layer, tokens (`--paper:#F6F1E5 --paper2 --ink --mut --tang --teal --yel`), dotted paper body background, hard ink shadows, pill buttons, ticket nav, hero collage, rails/cards, band, awards, quotes, resume `.tl`, marquee `.mq`, contact, footer, dialog, `.reveal`, breakpoints 1024/768, print rules (hide `.topbar,.hero-cta,.rail-btns,.c-grid,.mq`), `prefers-reduced-motion` block. No `@tailwind` directives. Faithfulness verified by line-set diff against reference `<style>`: **0 reference lines missing** (extra lines = my 2-line header comment only). One documented deviation (below).
3. **`src/hooks/useReveal.js`** — `useReveal(deps?)` returns a root ref; IntersectionObserver (threshold .1) adds `.in` to `.reveal` descendants once then unobserves; disconnects on cleanup; safe no-op when IntersectionObserver unsupported; falls back to document scope when ref unattached. ~~Wired into App so Tasks 2–4 only need `.reveal` classes.~~ **Correction (2026-10-13 fix round):** that wiring claim was false as shipped — the effect ran once at mount, found zero `.reveal` nodes (App mounts with nav+hero only), returned early, and never observed sections mounted later by Tasks 2–5 (they would have stayed at `opacity:0`). Fixed inside this file with a MutationObserver re-scan; see "Fix Round" below. The contract "later tasks just add `.reveal` classes" now actually holds.
4. **`src/components/TicketNav.jsx`** — sticky ticket bar: `★` brand `Pranav Lal · Portfolio` → `#top`; nav Index→`#work`, Work→`#featured`, About→`#about`, Contact→`#contact`; `Hire me` → `#contact`; mobile ☰ button with `aria-expanded`/`aria-controls`, `.nav.open` dropdown, closes on link/brand click. (Reference leaves `aria-expanded` stale after link-click close; ours updates it correctly.)
5. **`src/components/StickerHero.jsx`** — hero with pinned copy verbatim: kicker `Open to jobs & freelance gigs · 2026` + green `<i>`; H1 `PRANAV` / `AI` (`out`) / `DEVELOPER!` (`tang`) with `aria-label="Pranav — AI Developer"`; pinned lede; CTAs `Drag the work ↓`→`#featured` + `Print resume`→`window.print()`; tip line; sticker: `New · 2026folio` badge, avatar `PL`/`★ PYTHON ★ AI`, spinning stamp `OPEN TO WORK • HIRE PRANAV • OPEN TO WORK •` + center `★`. Hero root carries `id="work"`; no `.tip` rule div (its reference copy is persona copy, not pinned — `.tip` CSS still ported for later use).
6. **`src/App.jsx`** — rewritten: `<TicketNav/>` + `<main id="top" className="wrap"><StickerHero/></main>` inside a reveal root; comment marks the after-hero extension point for Tasks 2–5. No placeholder sections.
7. **`src/paper.test.js`** — text asserts per brief: css tokens/classes/`@media print`/`prefers-reduced-motion`, html fonts, App composition.

## Tests + outputs

- `node src/paper.test.js` → **FAIL first** (step 2, `index.css missing: --paper:#F6F1E5`, exit 1) → **PASS after implement**: `paper ok — paper system, fonts and app shell present` (exit 0).
- `npm run build` → **PASS** (`30 modules transformed`, dist CSS 13.12 kB, JS 146.68 kB).
- `npm run lint` → **zero errors, zero warnings**.
- **Copy fidelity (extra check):** SSR-rendered App via `react-dom/server` (esbuild bundle, temp file, deleted) — all pinned copy renders verbatim (lede incl. ASCII apostrophe `I'm`), all anchors `#top/#work/#featured/#about/#contact` present, no persona leak (`Maya`, `Amsterdam`, `Northwind`, `Ledger` absent), legacy Tailwind shell gone.
- **CSS port fidelity (extra check):** line-set diff vs reference `<style>` — 0 missing.
- **360px manual (headless Chrome CDP, exact 360×800 viewport):** `clientWidth 360 = scrollWidth 360` (was 407 pre-fix), `scrollX` stays 0; `#work` anchor present; brand `Pranav Lal · Portfolio`; mobile menu: ☰ `display:grid`, nav/CTA hidden ≤768px, click → `expanded:true` + `.nav open` (display grid), link click closes both class and `aria-expanded`.
- **Stamp/reduced-motion (same harness):** normal → `animationName: spin 14s running`; `Emulation.setEmulatedMedia prefers-reduced-motion: reduce` → `animationName: none`, `scroll-behavior: auto`.
- Fonts confirmed actually loading in the built page: `document.fonts.check` true for Archivo Black, Fraunces, Inter; `h1` computed family `"Archivo Black", system-ui, sans-serif`.

## Deviations (documented, deliberate)

1. **`h1` clamp min 56px → 44px** (only change vs reference CSS). The reference's widest hero word ("Designer!", 332px at 56px) fits 360px; the pinned word "DEVELOPER!" measures 383px at 56px, expanding the hero grid track to 407px — the lede card and sticker column were **clipped** at 360px (violating the binding "360px no horizontal overflow"). 44px → 336px right edge, `scrollWidth == clientWidth`. Affects only viewports <560px; ≥560px identical to reference. Comment in CSS explains why.
2. **Outline class named `out`** (reference's name) per plan rule "class names kept identical to reference where possible"; brief prose "(outline class)" interpreted as description of the outlined-text style. Trivial rename if controller prefers `outline`.

## Self-review

- Global constraints: `src/constants/index.js` untouched (not in diff); no `@tailwind`; fonts exact per brief; no GitHub anchors (none added); build+lint green before commit; 360px verified with real layout engine.
- Copy: every pinned string byte-checked against brief JSON extraction (straight `'` in `I'm`, em-dashes, `·`, `★`, `↓`, `•`), then render-verified.
- Extension points: App has single comment-marked slot after hero; `useReveal` root already live; nav `#about`/`#contact` anchors exist but targets mount in Tasks 4/5 (per brief "sections later tasks mount get nothing now").
- Legacy components (`NavBar/Hero/About/...`) untouched and unimported (Task 5 deletes them); `App.css` remains unimported.
- Test file matches brief's assert list exactly (plus node:assert for clear failures).
- Working tree clean except pre-existing untracked `docs/superpowers/plans/` (present at base, not mine).

## Concerns (for controller)

1. Reference stamp `textPath` string likely exceeds its 276px path circumference and clips — inherited verbatim from reference geometry (text pinned in source is complete). Same visual behavior as reference; flagging in case a smaller font-size/letter-spacing is wanted later.
2. `.tip` rule line between hero and rail (reference bottom lead-in) intentionally omitted — its copy was persona copy and is not pinned for us. If Task 2 wants a lead-in, its copy must be authored there.
3. Stamp width (`120px` + rotation) and `DEVELOPER!` at 44–56px are the tightest 360px spots; if later tasks add wider hero content, re-run the 360px check.

---

## Fix Round (2026-10-13) — useReveal observes late-mounted reveal nodes

**Status:** DONE · **Scope:** `src/hooks/useReveal.js` only (+ this report).

**Open finding (reviewer, Important):** `useReveal` runs once at mount, finds zero `.reveal` nodes (App at Task 1 mounts nav + hero only, no `.reveal` yet), returns early with `undefined` — no IntersectionObserver is ever created and no later section is observed. Any `.reveal` element mounted by Tasks 2–5 stays at `opacity:0` (invisible). The report's "wired into App so Tasks 2–4 only need `.reveal` classes" claim was therefore false as shipped; it has been corrected in item 3 above.

**Controller ruling (binding):** fix inside `src/hooks/useReveal.js` via MutationObserver re-scan for late `.reveal` nodes, preserving the contract "later tasks just add `.reveal` classes".

### What changed

- Effect no longer returns early on zero `.reveal` nodes: the IntersectionObserver (threshold `0.1`, add `.in` once + `unobserve`, disconnect on cleanup) is always created first, then the initial scan runs.
- Added a `MutationObserver` on the root (`childList` + `subtree`) that, for every added node, observes the node itself if it has `.reveal` and all `.reveal` descendants (skips non-element nodes). Late-mounted Tasks 2–5 sections are picked up automatically — no re-run, no API change.
- Cleanup disconnects **both** observers; `typeof MutationObserver` guarded so absence degrades to the original scan-only behavior; no-op when `IntersectionObserver` unsupported unchanged; `deps` param and `rootRef.current ?? document` fallback unchanged; JSDoc updated to document the re-scan.

### Tests run

1. `node check.mjs` (throwaway harness in `%TEMP%\opencode\reveal-check`, outside repo — stubbed react `useEffect`/`useRef` + fake IntersectionObserver/MutationObserver):
   **`PASS — all useReveal re-scan checks green`** — 14 assertions: effect runs once, threshold `0.1`, MO watches root `childList+subtree`, **zero `.reveal` at mount still creates the observer (bug reproduced)**, late-added wrapper with nested `.reveal` → 2 observed, late-added node that is itself `.reveal` → observed, text nodes ignored, intersect → `.in` added and unobserved, `.in` idempotent, cleanup disconnects IO + MO.
2. Unsupported-IO path: `node --input-type=module -e "..."` with `IntersectionObserver=undefined` → **`ok — no-op when IntersectionObserver unsupported`** (effect returns `undefined`).
3. `node src/paper.test.js` → **`paper ok — paper system, fonts and app shell present`** (exit 0).
4. `npm run build` → **PASS** — `✓ 30 modules transformed`, `dist/assets/index-DhuZKueb.js 146.97 kB │ gzip: 47.61 kB`, `✓ built in 1.87s`.
5. `npm run lint` → **zero errors, zero warnings** (no output beyond the npm script banner).

### Concerns

1. Harness is a DOM simulation, not a real browser pass — the MutationObserver path was exercised against fakes. If the controller wants belt-and-braces, re-run a CDP check after Tasks 2–5 mount (inject a `.reveal`, confirm `.in` appears on intersect).
2. A `.reveal` node moved in the DOM after being revealed is re-observed once (harmless: `classList.add('in')` is idempotent and it unobserves again).
