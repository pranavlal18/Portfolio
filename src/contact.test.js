// Task 5 contact check — imports the real buildMailto for behavioral asserts
// (tricky input encoding), and text-checks the contact section, the nav
// scrollspy wiring, the App mount, and that the seven legacy components are gone.
// Run: node src/contact.test.js
import assert from "node:assert";
import fs from "node:fs";
import { buildMailto } from "./lib/mailto.js";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");
const exists = (p) => fs.existsSync(new URL(p, import.meta.url));

// buildMailto: tricky input (&, newline, raw ★) must come back fully encoded
// and target the pinned address.
const mailto = buildMailto({ name: "A & B", email: "a@b.co", message: "line1\nline2 ★" });
assert(
  mailto.startsWith("mailto:pranavlal18@gmail.com?"),
  `mailto must target pranavlal18@gmail.com, got: ${mailto}`,
);
assert(mailto.includes("A%20%26%20B"), `mailto must encode the name, got: ${mailto}`);
assert(mailto.includes("%0A"), `mailto must encode newlines, got: ${mailto}`);
assert(!mailto.includes("★"), `mailto must not contain a raw star, got: ${mailto}`);

// ContactSection.jsx: pinned title, mailto submit wiring, role=status note.
const contactSrc = read("./components/ContactSection.jsx");
for (const token of ["Let's make the hire", "window.location.href", 'role="status"']) {
  assert(contactSrc.includes(token), `ContactSection.jsx missing: ${token}`);
}

// TicketNav.jsx: scrollspy toggles aria-current.
const navSrc = read("./components/TicketNav.jsx");
assert(navSrc.includes("aria-current"), "TicketNav.jsx missing: aria-current");

// Legacy components deleted (unimported since the redesign began).
const LEGACY = [
  "./components/About.jsx",
  "./components/Hero.jsx",
  "./components/NavBar.jsx",
  "./components/Project.jsx",
  "./components/Technologies.jsx",
  "./components/Contact.jsx",
  "./components/Experience.jsx",
];
for (const p of LEGACY) {
  assert(!exists(p), `legacy component must be deleted: ${p}`);
}

// App.jsx mounts ContactSection.
assert(read("./App.jsx").includes("ContactSection"), "App.jsx missing: ContactSection");

console.log("contact ok — mailto encoding, section wiring, scrollspy and legacy cleanup present");
