# Tech Context

## Stack (from IDE rules)

- **Electron** + **React** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-first config)
- **TanStack Query** for async gold-rate data
- Strict TypeScript, functional-first style

## Repository

- `thuva-agentic/gold-rate` (empty scaffold; greenfield)
- Base branch: `staging` (per `project-config.mdc`)

## Tooling

- `npm run lint`, `npm run build`, project test script before merge

## Jira / Atlassian

- Configured `project_key`: **GLD** — project not found on connected `deepmodel.atlassian.net` site yet
- Accessible `cloud_id`: `26be6ccf-8778-4a20-9584-98afaab9eba7` (update `project-config.mdc` if different from placeholder)
- Interim tracking: **DM** story until GLD project exists

## Environment

- Gold rate API URL and keys via `.env` (never committed)
- USD/LKR or direct LKR rate source TBD in ticket spec
