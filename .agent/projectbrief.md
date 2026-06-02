# Gold Rate — Project Brief

## Goal

Deliver a **live gold rate dashboard** for Sri Lanka that shows the current gold price and the **8 gram (1 pawn)** equivalent in **LKR**.

## Scope

- Real-time or near-real-time gold price tracking
- Conversion/display for **8g (1 pawn)** in **Sri Lankan Rupees**
- **Next.js 16** web dashboard (responsive; not Electron)

## Status

- **v1 implemented** (GLD-4): live dashboard at `/` with 24k/22k toggle and 30s auto-refresh

## Out of scope (initial)

- Multi-metal support (silver, platinum)
- Historical charts beyond a minimal “last updated” indicator
- User accounts / payments

## Repository

- GitHub: `thuva-agentic/gold-rate`
- Jira project key (configured): `GLD`

## Success criteria

Users can glance at the dashboard and see an accurate, up-to-date **8g pawn price in LKR** with clear freshness and error states.
