# LBL-App

Companion project for the "Loyalty B4 Love RP" FiveM server: a mobile PWA for players, and (growing) FiveM server resources built on a **custom, in-house framework** (not ESX/QBCore/vRP).

## Repo layout

- `app/` — source for the player-facing PWA (index.html/app.js/style.css/sw.js/manifest.json/icon.svg).
- `resources/` — FiveM Lua resources (server scripts). New resources go here, one folder per resource.
- `.claude/skills/` — skills for this project: `fivem-resource` (scaffold a new resource) and `fivem-server-admin` (server.cfg/database/RCON help).

## Mobile app conventions

- Vanilla JS PWA, no build step. `showPage(name)` swaps content into `#page`/`#pageContent`; `openLink(url)` opens external links (Discord, donations).
- Keep `manifest.json` theme color (`#7b2cff`) and app name ("LBL RP") in sync with branding used elsewhere.
- `sw.js` is a service worker for offline caching — bump its cache version string whenever cached assets (html/js/css) change, or returning players will see stale content.

## FiveM resource conventions (custom framework)

We are **not** using ESX/QBCore. We're building our own core framework from scratch, so conventions below apply and should be extended as the framework grows — update this file when new core patterns are established (e.g. inventory, jobs, permissions).

- **fxmanifest.lua** template for every resource:
  ```lua
  fx_version 'cerulean'
  game 'gta5'
  lua54 'yes'

  author 'Loyalty B4 Love RP'
  description ''
  version '1.0.0'

  shared_scripts { 'shared/*.lua' }
  client_scripts { 'client/*.lua' }
  server_scripts { 'server/*.lua' }
  ```
- **Naming**: resource folders and their internal namespace both use `lbl_<name>` (e.g. `lbl_core`, `lbl_jobs`, `lbl_inventory`).
- **Events**: namespace as `lbl:server:<event>` and `lbl:client:<event>`. Never trust client-fired events for anything that changes money, items, or permissions — validate server-side.
- **Exports**: expose framework functionality (player data, jobs, inventory) via `exports('lbl_core')` style exports rather than global tables, so resources stay decoupled.
- **Database**: use `oxmysql` for all queries (prepared statements only, never string-concatenated SQL). Keep schema/migrations under `resources/lbl_core/sql/`.
- **Threads**: always `Wait()` inside `CreateThread` loops; avoid 0ms loops except where genuinely needed (and document why).
- **Server authority**: any state that matters (money, items, rank/permissions) lives and is validated server-side. Client only requests/reflects.

## Server admin/ops

- `server.cfg` changes, database migrations, and RCON commands affect a live server — treat these as high-blast-radius: explain what a change does before applying it, and don't run destructive RCON (e.g. `restart`, `kick`, `ban`, `quit`) without explicit confirmation.
- See `.claude/skills/fivem-server-admin` for `server.cfg`/oxmysql/RCON reference material.

## General

- Lua files: 2-space indent, `snake_case` for variables/functions, `PascalCase` only for exported "class-like" modules if introduced later.
- Prefer small, single-purpose resources over one monolithic resource.
