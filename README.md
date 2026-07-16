# React Dashboard

A modern admin dashboard built with React, TypeScript, and Tailwind CSS. It includes a login flow, a responsive sidebar layout, data tables with search and filters, charts, settings, and full English/Arabic internationalization with RTL support.

## Features

- **Dashboard overview** — KPI cards, revenue/orders charts, category breakdown, and recent activity
- **CRUD-style list pages** — Orders, Clients, Categories, Products, and Users with search, filters, and status badges
- **Add dialogs** — Reusable modal for creating clients, categories, products, and users
- **Settings & profile** — Preference toggles, language control, and editable profile form
- **Auth context** — React Context store with `localStorage` persistence; login/logout updates shared auth state
- **Protected routes** — All `/dashboard/*` pages require authentication; guests are redirected to `/`
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

Open [http://localhost:5173](http://localhost:5173) to sign in. Any email and password will authenticate (mock auth) and redirect to the dashboard. Session persists in `localStorage` under the key `auth`.

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
| `/` | Login page (redirects to dashboard if already signed in) |
| `/dashboard/home` | Overview with charts and KPIs (protected) |
| `/dashboard/orders` | Orders list with status filters (protected) |
| `/dashboard/clients` | Clients list + add dialog (protected) |
| `/dashboard/categories` | Categories list + add dialog (protected) |
| `/dashboard/products` | Products list + add dialog (protected) |
| `/dashboard/users` | Users list + add dialog (protected) |
| `/dashboard/settings` | General and notification preferences (protected) |
| `/dashboard/profile` | User profile summary and edit form (protected) |

## Project Structure

```
src/
├── components/     # Shared UI (Dialog, Toggle, ProtectedRoute)
├── layouts/        # Auth and Dashboard shells
├── pages/          # Route pages
├── store/          # AuthContext (auth state + login/logout)
├── languages/      # en.json, ar.json translation files
├── i18n.ts         # i18next configuration
├── index.css       # Tailwind + theme tokens
└── main.tsx        # Router setup + AuthProvider
```

## Authentication

Auth is managed by `src/store/AuthContext.tsx`:

- `login(email)` stores `{ email }` in context and `localStorage`
- `logout()` clears both
- `ProtectedRoute` blocks unauthenticated access to `/dashboard/*`
- Logged-in users visiting `/` are redirected to `/dashboard/home`

There is no backend or password verification — this is mock client-side auth for learning/demo purposes.

## Internationalization

Language files live in `src/languages/`. The selected language is stored in `localStorage` under the key `lang`. Switch language from the dashboard header or the Settings page.

## Notes

- Page data (orders, clients, products, etc.) is mock/local state — there is no API.
- Auth is mock React Context + `localStorage`; not suitable for production security.
