// Task 4 sections check — text-based (like paper/rails/dialog.test.js):
// asserts the pinned band + resume copy, the download-only CTAs, and the print
// block scope, and that App mounts for both new sections.
// Run: node src/sections.test.js
import assert from "node:assert";
import fs from "node:fs";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");

const bandSrc = read("./components/ArtisanBand.jsx");
const resumeSrc = read("./components/ResumeSection.jsx");
const appSrc = read("./App.jsx");
const css = read("./index.css");

// ArtisanBand.jsx: pinned headline, step labels, stats and proof cards.
const bandExpect = [
  "AI artisan for hire",
  "01 · Ingest",
  "02 · Reason",
  "03 · Ship",
  "30+",
  "Certs & awards",
  "Production counts.",
  "Built for the real world.",
];
for (const token of bandExpect) {
  assert(bandSrc.includes(token), `ArtisanBand.jsx missing: ${token}`);
}

// ResumeSection.jsx: both jobs, split education rows, certs, download CTA and
// the retitled section heading.
const resumeExpect = [
  "Digicyfr",
  "Odin Tech",
  "Track record.",
  "2023 — 2025",
  "MCA · Vidya Academy",
  "Focused on software engineering and applied AI.",
  "2020 — 2023",
  "BCA · Christ College (Autonomous)",
  "Young Innovators",
  "Download PDF",
  "Get in touch",
];
for (const token of resumeExpect) {
  assert(resumeSrc.includes(token), `ResumeSection.jsx missing: ${token}`);
}

// Download-only: no Print CTAs / window.print() anywhere in the three
// components that used to carry one (print CSS stays, Ctrl+P still works).
const heroSrc = read("./components/StickerHero.jsx");
const contactSrc = read("./components/ContactSection.jsx");
for (const [name, src] of [
  ["StickerHero.jsx", heroSrc],
  ["ResumeSection.jsx", resumeSrc],
  ["ContactSection.jsx", contactSrc],
]) {
  assert(!src.includes("window.print()"), `${name} must not call window.print()`);
  assert(!src.includes("Print "), `${name} must not render a Print button`);
  assert(src.includes("Download PDF"), `${name} must keep its Download PDF link`);
}

// index.css print block: review-focus selectors + resume-only print scope
// (everything inside main except the resume section is hidden for print).
const printStart = css.indexOf("@media print");
assert(printStart !== -1, "src/index.css missing @media print block");
const reduceStart = css.indexOf("@media(prefers-reduced-motion");
const printBlock = css.slice(printStart, reduceStart === -1 ? undefined : reduceStart);
assert(
  printBlock.includes(".topbar,.hero-cta,.rail-btns,.c-grid,.mq{display:none !important}"),
  "index.css print block must hide .topbar,.hero-cta,.rail-btns,.c-grid,.mq",
);
assert(
  printBlock.includes("main > *:not(#resume)"),
  "index.css print block must hide everything but #resume (resume-only print)",
);

// App.jsx: both components mounted inside #about / #resume section wrappers.
for (const token of ["ArtisanBand", "ResumeSection", 'id="about"', 'id="resume"']) {
  assert(appSrc.includes(token), `App.jsx missing: ${token}`);
}

console.log("sections ok — artisan band, resume timeline and print scope present");
