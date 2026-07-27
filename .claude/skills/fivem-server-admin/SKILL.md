---
name: fivem-server-admin
description: Help with FiveM server operations - server.cfg entries, oxmysql/database schema and migrations, txAdmin, and RCON command reference. Use when the user asks about server.cfg, database setup, txAdmin, or running/administering the live FiveM server.
---

# FiveM server admin/ops reference

This is reference and drafting help, not a live connection to the server — always show the user the exact `server.cfg` lines, SQL, or RCON commands and let them apply/run it, rather than assuming execution access to the live server.

## server.cfg

- Resource load order matters: core framework (`ensure lbl_core`) before anything that depends on its exports.
- Common useful lines:
  ```
  ensure oxmysql
  ensure lbl_core
  ensure <other resources>

  set mysql_connection_string "mysql://user:pass@localhost/database?charset=utf8mb4"
  ```
- Never put real credentials in files committed to the repo — use `server.cfg` locally/on the host only, or reference an env var, and keep it out of version control (check `.gitignore`).

## Database (oxmysql)

- Migrations/schema live in `resources/lbl_core/sql/`. Each new table/column change = a new numbered `.sql` file, never edit an already-applied migration in place.
- Always use parameterized queries (`exports.oxmysql:execute(query, params, cb)` style) — never string-concatenate user input into SQL.

## txAdmin / RCON

- RCON commands directly affect the live, connected server and its players. Before suggesting or running any of: `restart <resource>`, `kick`, `ban`, `quit`, or a full server restart — state exactly what it will do and get explicit confirmation. These are not safe to run speculatively.
- Read-only checks (player list, resource list, server status) are fine to run/suggest without extra confirmation.
- txAdmin recipe/config changes should be described first (what changes, what it affects) before being applied.
