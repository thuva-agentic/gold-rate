# System Patterns

## Architecture

```
[Browser / TanStack Query, 30s poll]
        │
        ▼
[/api/gold-spot]  [/api/fx-usd-lkr]   ← Next.js route handlers; keys in .env only
        │                    │
        ▼                    ▼
[Metals API]          [FX API]
        │                    │
        └────────┬───────────┘
                 ▼
    mapApiResponses → computePawnPriceLkr → Dashboard UI
```

- **Feature module**: `src/features/gold-rate/` owns types, pure math, mappers, hooks, and UI components
- **Pure functions** for conversion: troy oz → g, USD → LKR, karat purity × 8g pawn
- **Side effects at edges**: Next.js API routes (upstream fetch), TanStack Query (client poll), React UI
- **BFF pattern**: browser never calls metals/FX APIs directly; server routes proxy and normalize responses

## Confirmed decisions (GLD-4)

| Topic | Decision |
|-------|----------|
| Data source | International spot (metals API) × USD→LKR FX |
| App shell | **Next.js 16** App Router (web) |
| Refresh | Auto-poll **every 30s** via TanStack Query |
| Pawn | Fixed **8g**; **24k / 22k** toggle |
| LKR format | `Rs.` prefix, **2 decimals** |

## Shipped (GLD-4)

- v1 dashboard merged to `staging` — see `.agent/tickets/archived/GLD-4/` for full spec and task record

## Security

- API keys only in server env (`METALS_API_KEY`, etc.); validated in `getServerEnv()`
- API routes return `{ error: string }` on failure for consistent client error UI
- No secrets in client bundle

## Critical paths

- Price math: `computePawnPriceLkr(spot, fx, karat)` — unit-tested, used by `usePawnPrice`
- metals-api returns XAU as oz per USD; mapper inverts to USD per troy oz
