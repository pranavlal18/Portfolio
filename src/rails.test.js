// Task 2 rails check — text-based (like paper.test.js): asserts rail card data,
// ported drag semantics, and that App mounts both rails.
// Run: node src/rails.test.js
import assert from "node:assert";
import fs from "node:fs";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");

const casesSrc = read("./content/cases.js");
const railSrc = read("./components/WorkRail.jsx");
const appSrc = read("./App.jsx");

// cases.js: all six slugs present + exact rail groupings from the brief.
const SLUGS = ["fisherman", "dudhwala", "coderag", "salespilot", "fakereview", "bingetime"];
for (const slug of SLUGS) {
  assert(casesSrc.includes(slug), `cases.js missing slug: ${slug}`);
}
assert(
  casesSrc.includes("['fisherman', 'dudhwala', 'coderag']"),
  "cases.js missing featured grouping [fisherman, dudhwala, coderag]",
);
assert(
  casesSrc.includes("['salespilot', 'fakereview', 'bingetime']"),
  "cases.js missing more grouping [salespilot, fakereview, bingetime]",
);

// WorkRail: drag semantics ported from the reference (capture + scrollBy),
// the >6px travel guard, data-slug + onOpen wiring, and keyboard arrows.
const railExpect = [
  "scrollBy",
  "setPointerCapture",
  "> 6",
  "data-slug",
  "onOpen",
  "ArrowRight",
  "ArrowLeft",
];
for (const token of railExpect) {
  assert(railSrc.includes(token), `WorkRail.jsx missing: ${token}`);
}

// App: both rails mounted (rail1 = featured, rail2 = more).
for (const token of ["rail1", "rail2"]) {
  assert(appSrc.includes(token), `App.jsx missing: ${token}`);
}

console.log("rails ok — card data, drag semantics and both rail mounts present");
