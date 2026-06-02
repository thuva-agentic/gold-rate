# DM-1688 — Live gold rate dashboard (8g pawn in LKR)

**Jira:** https://deepmodel.atlassian.net/browse/DM-1688  
**Branch:** `feature-DM-1688-live-gold-rate-dashboard-lkr`  
**Status:** Draft — Q&A pending  
**Product Jira (future):** GLD

## Summary

Build a dashboard that tracks the **live gold rate** and prominently displays the price for **8 grams (1 pawn)** in **Sri Lankan Rupees (LKR)**.

## Scope (in)

- Fetch and refresh live gold price from an agreed data source
- Compute **8g (1 pawn)** price in **LKR** (pure calculation layer, unit-tested)
- Dashboard UI: hero metric (pawn LKR), supporting per-gram rate, last updated, source label
- Error and stale-data states (no silent outdated prices)
- Electron + React + TypeScript + Vite scaffold (per project rules)
- Env-based configuration for API keys / endpoints

## Scope (out)

- Price alerts, notifications, or watchlists
- Multi-purity picker beyond what Q&A locks (e.g. 22k vs 24k) for v1
- Payment, cart, or jeweller inventory
- Mobile-native apps (desktop/web responsive only for v1)

## Clarifying questions

Answer inline below before `/dm plan`.

1. **Gold rate source:** Which feed should v1 use?
   - (a) International spot (e.g. metals API) × USD→LKR FX
   - (b) Sri Lanka–specific published rate (CBSL, association, or jeweller API — specify URL)
   - (c) Manual admin-entered rate with optional API later  
   - **Answer:**

2. **Purity / karat:** Is the displayed pawn price for **24k**, **22k**, or market “standard” as used locally?  
   - **Answer:**

3. **Pawn weight:** Confirm **8g = 1 pawn** (fixed multiplier, no configurable weight in v1)?  
   - **Answer:**

4. **Refresh interval:** Auto-poll every ___ seconds, or manual refresh only?  
   - **Answer:**

5. **Deployment target:** Electron desktop only, or also deploy as static web?  
   - **Answer:**

6. **Formatting:** LKR display rules (e.g. `Rs. 1,234,567`, round to whole rupees vs 2 decimals)?  
   - **Answer:**

## Technical approach (draft)

- `src/features/gold-rate/` — types, API client, query hooks, `computePawnPriceLkr(rate, fx?)` pure fn
- Polling via TanStack Query `refetchInterval` once interval is answered
- Single route/dashboard view; minimal navigation
- Secrets in `.env`; document required vars in README

## Acceptance criteria

- [ ] Live rate loads on open; refresh per Q&A
- [ ] **8g pawn price in LKR** is the primary visible metric
- [ ] Last-updated timestamp visible; stale data shows warning if fetch fails
- [ ] `npm run lint` and `npm run build` pass

## Notes

- Task description: dashboard tracking live gold rate; display **8g (1 pawn)** in **LKR**
- Repo: `thuva-agentic/gold-rate` (empty)
- When **GLD** Jira project is created, link or migrate ticket from DM-1688
