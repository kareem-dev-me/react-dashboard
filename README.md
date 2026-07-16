# React Dashboard

A modern admin dashboard built with React, TypeScript, and Tailwind CSS. It includes a login flow, a responsive sidebar layout, data tables with search and filters, charts, settings, and full English/Arabic internationalization with RTL support.

## Features

- **Dashboard overview** — KPI cards, revenue/orders charts, category breakdown, and recent activity
- **CRUD-style list pages** — Orders, Clients, Categories, Products, and Users with search, filters, and status badges
- **Add dialogs** — Reusable modal for creating clients, categories, products, and users
- **Settings & profile** — Preference toggles, language control, and editable profile form
- **Authentication shell** — Login page with mock sign-in (redirects to dashboard; no backend auth)
- **i18n** — English and Arabic via `i18next`, with `dir` and `lang` switching for RTL
- **Theme** — Semantic color tokens (`primary`, `surface`, `ink`, etc.) defined in Tailwind v4 `@theme`

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router 7 |
| Charts | Recharts |
| i18n | i18next, react-i18next |
| Icons | lucide-react |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to sign in. Any email and password will redirect to the dashboard.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Login page |
| `/dashboard/home` | Overview with charts and KPIs |
| `/dashboard/orders` | Orders list with status filters |
| `/dashboard/clients` | Clients list + add dialog |
| `/dashboard/categories` | Categories list + add dialog |
| `/dashboard/products` | Products list + add dialog |
| `/dashboard/users` | Users list + add dialog |
| `/dashboard/settings` | General and notification preferences |
| `/dashboard/profile` | User profile summary and edit form |

## Project Structure

```
src/
├── components/       # Shared UI (Dialog, Toggle)
├── layouts/        # Auth and Dashboard shells
├── pages/          # Route pages
├── languages/      # en.json, ar.json translation files
├── i18n.ts         # i18next configuration
├── index.css       # Tailwind + theme tokens
└── main.tsx        # Router setup
```

## Internationalization

Language files live in `src/languages/`. The selected language is stored in `localStorage` under the key `lang`. Switch language from the dashboard header or the Settings page.

## Notes

- All data is mock/local state — there is no API or persistence layer.
- Login and logout are UI-only; no real authentication is implemented.
