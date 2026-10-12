// src/constants/content.test.js — text-based check (avoids Vite png imports)
import assert from "node:assert";
import fs from "node:fs";
const src = fs.readFileSync(new URL("./index.js", import.meta.url), "utf8");
assert(src.includes("LangGraph"), "missing LangGraph");
assert(src.includes("Fisherman Safety Agent"), "missing Fisherman first");
assert(src.includes("DudhWala"), "missing DudhWala");
assert(src.includes("CodeRAG") && src.includes("SalesPilot"), "missing AI projects");
assert(src.includes("pranavlal18@gmail.com"), "missing contact email");
assert(src.includes("EXPERIENCE") && src.includes("Digicyfr"), "missing experience");
console.log("content ok");
