// Task 3 case-dialog check (like rails.test.js): imports the real case data
// for structure assertions, and text-checks the dialog component + App wiring.
// Run: node src/dialog.test.js
import assert from "node:assert";
import fs from "node:fs";
import { CASE_DETAILS } from "./content/caseDetails.js";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");

const dialogSrc = read("./components/CaseDialog.jsx");
const appSrc = read("./App.jsx");

// caseDetails.js: all six slugs, each with 3 metrics + 4 bullets; github is a
// real repo URL for the five public projects and null for DudhWala.
const SLUGS = ["fisherman", "dudhwala", "coderag", "salespilot", "fakereview", "bingetime"];
for (const slug of SLUGS) {
  const d = CASE_DETAILS[slug];
  assert(d, `caseDetails.js missing slug: ${slug}`);
  assert.strictEqual(d.metrics.length, 3, `${slug}: expected 3 metrics, got ${d.metrics.length}`);
  for (const m of d.metrics) {
    assert(m.value && m.label, `${slug}: metric missing value/label`);
  }
  assert.strictEqual(d.bullets.length, 4, `${slug}: expected 4 bullets, got ${d.bullets.length}`);
  assert(d.title && d.sub, `${slug}: missing title/sub`);
  if (slug === "dudhwala") {
    assert.strictEqual(d.github, null, "dudhwala: github must be null (private repo)");
  } else {
    assert(
      typeof d.github === "string" && d.github.startsWith("https://github.com/pranavlal18/"),
      `${slug}: github must be the pinned repo URL, got ${d.github}`,
    );
  }
}

// CaseDialog.jsx: modal open via showModal, backdrop coordinate check, native
// cancel (Esc) handling, focus-return query on the opener's data-slug card,
// and the DudhWala private badge (no anchor) branch next to the GitHub link.
const dialogExpect = [
  "showModal",
  "getBoundingClientRect",
  "clientX",
  "clientY",
  "onCancel",
  '[data-slug="',
  "Private repo · Live in production",
  "noopener noreferrer",
  'target="_blank"',
  'className="mrow"',
  'className="db"',
  'className="dh"',
  'className="dx"',
];
for (const token of dialogExpect) {
  assert(dialogSrc.includes(token), `CaseDialog.jsx missing: ${token}`);
}
// The GitHub anchor must live inside the truthy-github branch only, so a
// null-github case (DudhWala) renders the badge with zero anchors.
assert(
  /detail\.github\s*\?/.test(dialogSrc),
  "CaseDialog.jsx must branch the footer on detail.github (badge when null)",
);

// App.jsx: openSlug state, onOpen={setOpenSlug} on both rails, and the dialog
// mounted with detail={... : null}.
for (const token of ["useState", "openSlug", "onOpen={setOpenSlug}", "CASE_DETAILS[openSlug]", "CaseDialog"]) {
  assert(appSrc.includes(token), `App.jsx missing: ${token}`);
}

console.log("dialog ok — case data, dialog behavior and App wiring present");
