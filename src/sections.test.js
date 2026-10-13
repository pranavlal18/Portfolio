// Task 4 sections check — text-based (like paper/rails/dialog.test.js):
// asserts the pinned band + resume copy, the print block scope, and the App
// mounts for both new sections.
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

// ResumeSection.jsx: both jobs, education score, YIP line, print + contact.
const resumeExpect = [
  "Digicyfr",
  "Odin Tech",
  "Vidya Academy",
  "Young Innovators",
  "window.print()",
  "Get in touch",
];
for (const token of resumeExpect) {
  assert(resumeSrc.includes(token), `ResumeSection.jsx missing: ${token}`);
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
