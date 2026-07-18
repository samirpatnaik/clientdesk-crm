<!-- AI assisted development -->
# ClientDesk CRM Lite

Authenticated React CRM with validated forms, protected routes, and CRUD persistence via a localStorage-backed async API.

## Overview

ClientDesk shows end-to-end product ability: sign-in/out, client list CRUD, React Hook Form + Zod validation, status tags, and toast feedback — suitable for a freelance React portfolio demo.

## Features

### Auth
- Sign in / sign out with sessionStorage
- Protected routes redirect logged-out users to `/login`

### Clients CRUD
- Create, read, update, delete
- Status tags: Lead / Active / Closed
- Toast alerts for success and failure
- Seed data + **Reset seed** button

### Forms
- React Hook Form + Zod (required fields, email format)

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Routing**: React Router 6
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS 3
- **Persistence**: `localStorage` via async `clientsApi` (REST-like)

## Prerequisites

- Node.js 18+ and npm

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Demo login: `agent@clientdesk.dev` / `demo` (any email + password ≥ 4 chars).

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import in Vercel (framework: Vite)
3. SPA rewrites are in `vercel.json`

Live: _add Vercel URL after deploy_  
Code: _add GitHub URL after push_

## Loom walkthrough

_Add Loom link after recording (focus on create / edit / delete)._

## Project structure

```
src/
  app/           # Auth, toasts, protected routes
  components/    # Shell + UI
  data/          # Seed clients JSON
  features/      # Login + clients CRUD
  lib/           # Auth, schema, clientsApi
  types/
```

## Resume line

> **ClientDesk CRM Lite (React.js + TypeScript)** — Built authenticated CRUD app with validated forms, protected routes, and REST/API persistence. Live: [link] | Code: [link]
