# Portfolio Rebuild via Open Design MCP — Design Doc

Date: 2026-10-09
Status: awaiting user review
Approach: A — OD-first, artifact-driven, full refresh

## 1. Goal

Rebuild the Vite + React portfolio (`C:\Users\prana\Desktop\portfolio`)
from a user-authored design in the Open Design desktop app, connected to
OpenCode via the `od mcp` stdio MCP server. Full refresh: new visual
tokens, new layout/sections, and new copy/content.

Success criteria:
- `opencode mcp list` shows `open-design` as `connected`.
- `get_artifact()` on the user's OD project returns the entry file plus
  referenced siblings (tokens CSS, components, assets).
- Rebuilt portfolio renders the OD design with fidelity, passes
  `npm run build` and `npm run lint`, and previews cleanly.

## 2. Context (verified 2026-10-09)

- OpenCode `1.18.35`, project config `opencode.json` (v1 schema:
  `mcp.<name>` with `type: "local"`).
- Open Design desktop running (`...\AppData\Local\Programs\Open Design\`),
  daemon `0.24.1` at `http://127.0.0.1:50609`, UI at `:50616/50618`.
- MCP server `open-design`: command = Open Design.exe + `daemon-cli.mjs`
  + `mcp --daemon-url http://127.0.0.1:50609`; environment =
  `OD_DATA_DIR`, `OD_SIDECAR_CLIENT_ENDPOINT`, `OD_MCP_BOOTSTRAP_COMMAND`,
  `OD_MCP_BOOTSTRAP_ARGS=["--headless"]`, `ELECTRON_RUN_AS_NODE=1`;
  `timeout: 60000`. Verified `connected`.
- OD daemon has **0 projects** — user will create one (working name
  `portfolio-v2`) before implementation starts.
- Current portfolio stack: Vite 6, React 18.3, Tailwind 3.4,
  framer-motion 11, react-icons 5. Sections: Navbar, Hero, About, Tech,
  Project, Contact. Content lives in `src/constants/index.js`.

## 3. Architecture

Single pipeline with three stages, each with one clear purpose:

1. **Handoff (OD -> agent).** OD desktop app is the source of truth.
   Agent pulls via MCP read tools only. No guessing the design.
2. **Mapping (OD files -> repo files).** Tokens to theme, OD components
   to `src/components/*`, OD copy to `src/constants/index.js`, OD assets
   to `src/assets/`. `App.jsx` rewired only if sections change.
3. **Verification (build/lint/preview).** `npm run build`,
   `npm run lint`, `vite preview` visual check.

Boundaries: the agent never writes into OD projects during this rebuild
(read path only: `list_projects`, `get_artifact`, `get_file`,
`search_files`, `list_files`, `get_active_context`). The agent never
edits outside `portfolio/` except the documented `opencode.json` MCP
refresh. Each stage can be understood and re-run independently.

## 4. Data flow

1. User creates/saves design project in OD app, reports its name.
2. Agent calls `list_projects` to confirm presence.
3. Agent calls `get_artifact(project)` — one call returns entry file plus
   referenced siblings. Preferred over N x `get_file`.
4. Agent uses `search_files(query)` / `get_file(path, offset, limit)` /
   `list_files(project)` only for gaps (long files page via `offset`;
   `[od:file-window]` marker signals more pages).
5. If user says "the design I have open" / "this file", agent omits
   `project` and relies on `get_active_context` defaulting, confirming
   `usedActiveContext` in the response.
6. Agent implements mapping (section 5), then verifies (section 7).

## 5. Code mapping

| OD input | Repo target |
|---|---|
| Tokens CSS (color, type scale, spacing, motion) | `tailwind.config.js` theme extension + `src/index.css` |
| OD components / sections | `src/components/NavBar.jsx`, `Hero.jsx`, `About.jsx`, `Technologies.jsx`, `Project.jsx`, `Contact.jsx` (rewrite; keep framer-motion) |
| OD copy (bio, projects, contact) | `src/constants/index.js` (`HERO_CONTENT`, `ABOUT_TEXT`, `PROJECTS`, `CONTACT`) |
| OD images/assets | `src/assets/` (+ `public/` only if needed) |
| OD page structure | `src/App.jsx` (rewire only if sections added/removed) |

Out of scope: unrelated refactoring, dependency upgrades (unless the
design requires one — then explicit approval first), deployment config
changes (`gh-pages` target noted as suspicious but untouched).

## 6. Error handling

- **Daemon unreachable / MCP `Connection closed` / 30s timeout.** Stop,
  report. Likely causes: OD app closed, or daemon port/pipe rotated after
  OD restart. Refresh: GET `/api/mcp/install-info` on the new daemon
  port, update `command`/`environment`/`--daemon-url` in `opencode.json`,
  restart OpenCode (config is load-once, no hot-reload). Do not invent
  design content while disconnected.
- **`get_active_context` returns `{active: false}`.** Prompt user to open
  the design in the OD app (5-min TTL on active context is expected).
- **`get_artifact` truncated (200-file cap / byte budget).** Page the
  remainder with `get_file(path, offset)`; note `truncated: true`.
- **Empty project list.** Wait for user to create the OD project; no
  implementation starts on empty input.
- **Config invalid.** Validate against `https://opencode.ai/config.json`
  before writing; keep `$schema`. If OpenCode refuses to start, use
  `OPENCODE_DISABLE_PROJECT_CONFIG=1` to boot from globals and fix.

## 7. Testing / verification

- `opencode mcp list` shows `open-design` `connected` before and after.
- `npm run build` passes.
- `npm run lint` passes (fix only violations in touched files).
- `vite preview` renders; spot-check responsive + motion states.
- MCP hygiene: only the `open-design` server enabled during the rebuild
  (MCP tools consume model context).

## 8. Open items (none blocking)

- Exact OD project name (working name `portfolio-v2`; user confirms).
- Whether the design adds/removes page sections (decided at handoff).
- Daemon port is per-session; refresh procedure above covers rotation.
