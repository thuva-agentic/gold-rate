# Gold Rate LKR

Live gold rate dashboard for Sri Lanka. Shows the international spot price converted to **8 gram (1 pawn)** in **Sri Lankan Rupees (LKR)**, with a **24K / 22K** purity toggle and **30 second** auto-refresh.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- TypeScript, Tailwind CSS v4
- TanStack Query for client polling
- Vitest for unit tests on pure price math

## Prerequisites

- Node.js 20+
- API keys for a metals spot provider and USD→LKR FX feed (see below)

## Setup

1. Clone and install dependencies:

```bash
npm install
```

2. Copy environment template and fill in values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `METALS_API_KEY` | API key for your metals provider (e.g. [metals-api.com](https://metals-api.com)) |
| `METALS_API_BASE_URL` | Base URL, default `https://metals-api.com/api` |
| `FX_API_URL` | USD→LKR rates endpoint (e.g. `https://api.exchangerate-api.com/v4/latest/USD`) |

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |

## Architecture

```
[Browser]
    │  TanStack Query (30s poll)
    ▼
[/api/gold-spot]  [/api/fx-usd-lkr]   ← server routes, keys in .env
    │                    │
    ▼                    ▼
[Metals API]      [FX API]
    │                    │
    └────────┬───────────┘
             ▼
    mapApiResponses → computePawnPriceLkr → Dashboard UI
```

- **Pure logic** lives in `src/features/gold-rate/` (`computePawnPriceLkr`, `formatLkr`, mappers).
- **API routes** proxy upstream services so keys never reach the browser.
- **UI** is a single page at `/` composed in `GoldRateDashboard`.

## Jira

Active ticket: [GLD-4](https://thuvaraganparamesh.atlassian.net/browse/GLD-4)
