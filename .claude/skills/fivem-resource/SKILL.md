---
name: fivem-resource
description: Scaffold a new FiveM server resource (fxmanifest.lua + client/server/shared Lua stubs) following this project's custom-framework conventions. Use when the user asks to create, add, or scaffold a new FiveM resource/script.
---

# FiveM resource scaffolding

This project uses a custom in-house framework (see `CLAUDE.md`), not ESX/QBCore. Every resource lives under `resources/<name>/` where `<name>` is `lbl_<short-name>` (e.g. `lbl_jobs`).

## Steps

1. Ask the user what the resource does and whether it needs client, server, or both sides (don't scaffold empty sides nobody asked for).
2. Create `resources/lbl_<name>/` with only the pieces needed:
   - `fxmanifest.lua` — use the template from `CLAUDE.md`, filling in `description`.
   - `shared/config.lua` — only if there's actual shared config; export a `Config` table.
   - `client/main.lua` — only if client-side logic is needed. Register any client events as `lbl:client:<name>:<event>`.
   - `server/main.lua` — only if server-side logic is needed. Register any server events/callbacks as `lbl:server:<name>:<event>`, and validate all inputs — never trust client-supplied data for money/items/permissions.
3. If the resource needs framework data (player info, jobs, inventory), call it via `exports.lbl_core:<Function>(...)` rather than assuming globals — note in a comment if the underlying `lbl_core` export doesn't exist yet, so it's clear it's a TODO on the core framework.
4. If the resource needs persistence, add SQL under `resources/lbl_core/sql/` (not inside the new resource) and use `oxmysql` with prepared statements.
5. Remind the user to add the resource to `server.cfg` (`ensure lbl_<name>`) — don't edit `server.cfg` yourself unless asked, since it affects the live server.

Keep generated stubs minimal and functional — no speculative features, no unused boilerplate sides.
