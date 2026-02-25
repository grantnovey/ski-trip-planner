# Bluebird: Reference Docs for Claude

This document points to key planning and design docs for the Bluebird ski trip planner app. Use these when you need context on user flows, features, or UI design prompts.

---

## Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| **User Flow** | [`notes/user-flow.md`](user-flow.md) | End-to-end user flow across Planning, Pre-trip, During, and Post-trip phases |
| **Features** | [`notes/features.md`](features.md) | MVP vs future features, expense categories, mountain stats |
| **Subframe Prompts** | [`notes/Subframe.md`](Subframe.md) | Copy-paste prompts for generating each page in Subframe via `/subframe:design` |

---

## Quick Reference

- **User flow:** Planning → Pre-trip → During → Post-trip
- **MVP:** Trips + per-item expenses + mountain/resort stats
- **Expense categories:** Lift tickets, Lodging, Food, Gear, Transport, Other
- **Main screens:** Trips list (`/trips`), Trip detail (`/trips/[id]`), modals for Create Trip and Add Expense

---

## When to Use These

- **Implementing a new screen:** Check `user-flow.md` for flow and `features.md` for scope; use prompts from `Subframe.md` with `/subframe:design` if designing first.
- **Adding a feature:** Confirm it’s in scope in `features.md` and which phase it supports in `user-flow.md`.
- **Designing in Subframe:** Use prompts and `codeContext` from `Subframe.md` with the Subframe design tool.
