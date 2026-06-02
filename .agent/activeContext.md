# Active Context

## Active Ticket

None — **GLD-4** implementation complete; ready for PR and ticket archive.

| Item | Path / link |
|------|-------------|
| Spec | `.agent/tickets/active/GLD-4/spec.md` |
| Tasks | `.agent/tickets/active/GLD-4/tasks.md` (all phases done) |
| Jira | https://thuvaraganparamesh.atlassian.net/browse/GLD-4 |
| Branch | `feature-GLD-4-live-gold-rate-dashboard-lkr` |

## Recently Completed

- **GLD-4**: Full live gold rate dashboard — Next.js 16 app, API routes, TanStack Query (30s poll), 24k/22k toggle, pawn hero UI, unit tests, README

## Current Focus

- Open PR to `staging` via **`/dm create-pr`**
- After merge: archive GLD-4 ticket folder to `.agent/tickets/archived/GLD-4/`

## Open Decisions

- **Upstream API choice**: `.env.example` documents metals-api.com and exchangerate-api.com as examples; production may swap providers without code changes if response shapes are mapped in `mapApiResponses.ts`
- **Local SL rate feed**: v2 could add CBSL/jeweller-specific source (out of GLD-4 scope)
