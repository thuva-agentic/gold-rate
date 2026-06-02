# Tech Context

## Stack (GLD-4)

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@import "tailwindcss"`)
- **TanStack Query** — client polling every 30s for `/api/gold-spot` and `/api/fx-usd-lkr`
- **Vitest** — unit tests for pure price math and API mappers
- Functional-first: pure functions in `src/features/gold-rate/`, side effects at API/UI edges

## Repository

- GitHub: `thuva-agentic/gold-rate`
- Base branch: `staging` (per `project-config.mdc`)

## Tooling

- `npm run dev` | `build` | `lint` | `test`
- Env vars: `METALS_API_KEY`, `METALS_API_BASE_URL`, `FX_API_URL` (see `.env.example`)

## Jira / Atlassian

- Project key: **GLD** on `thuvaraganparamesh.atlassian.net`
- `cloud_id`: `4d520abd-65c3-4484-b3b8-fb2c021d4678` (in `project-config.mdc`)

## Data sources (v1)

- International gold spot (USD/troy oz) via metals API
- USD→LKR via configurable FX URL
- Pawn: fixed **8g**; purity **24k** / **22k** toggle

## Feature layout

- `src/features/gold-rate/` — domain types, pure math, API mappers, fetch helpers, query hooks, dashboard components
- `src/lib/env.ts` — server-only env validation
- `src/providers/query-provider.tsx` — TanStack Query client wrapper in root layout

## Dependencies (runtime)

- `next@16`, `react@19`, `@tanstack/react-query`
- Dev: `vitest`, `@vitejs/plugin-react`, `tailwindcss@4`, `eslint-config-next`

## Deployment

- v1 merged to `staging`; runtime requires `.env` with metals and FX API credentials
