// Task 1 foundation check — text-based: avoids CSS parsing, asserts the ported paper system exists.
// Run: node src/paper.test.js
import assert from "node:assert";
import fs from "node:fs";

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), "utf8");

const css = read("./index.css");
const html = read("../index.html");
const app = read("./App.jsx");

// Paper design system tokens + every structural class later tasks mount into.
const cssExpect = [
  "--paper:#F6F1E5",
  ".topbar",
  ".avatar-star",
  ".stamp",
  ".rail",
  ".wcard",
  ".band",
  ".tl",
  ".mq",
  "@media print",
  "prefers-reduced-motion",
];
for (const token of cssExpect) {
  assert(css.includes(token), `src/index.css missing: ${token}`);
}

// Google Fonts: Archivo Black (display), Fraunces (serif), Inter (body).
const htmlExpect = ["Archivo+Black", "Fraunces", "Inter"];
for (const token of htmlExpect) {
  assert(html.includes(token), `index.html missing font link: ${token}`);
}

// App shell composes the ticket nav + sticker hero.
const appExpect = ["TicketNav", "StickerHero"];
for (const token of appExpect) {
  assert(app.includes(token), `src/App.jsx missing: ${token}`);
}

console.log("paper ok — paper system, fonts and app shell present");
