# System Patterns

## Architecture (planned)

```
[Gold rate API] --> [Fetcher / cache] --> [Pure price math] --> [React UI]
```

- **Pure functions** for unit conversion: oz → g, USD → LKR, rate × 8g
- **Side effects at edges**: HTTP client, polling/refresh timer, Electron main if needed
- **React Query** (or project equivalent) for server state and refresh intervals

## Key decisions (to confirm in spec)

| Topic | Options |
|-------|---------|
| Data source | International spot × FX, local CBSL/jewellers feed, scraped public page |
| App shell | Electron desktop vs Vite web-only |
| Refresh | Polling interval (e.g. 60s–5m) vs manual refresh |
| Pawn definition | Fixed 8g; document if local market uses different purity (22k/24k) |

## Security

- No API keys in client bundle; use env vars and Electron secure storage if needed
- Validate and sanitize any user-configurable refresh settings
