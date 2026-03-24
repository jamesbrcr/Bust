@AGENTS.md

# Bust

A personal recipe organizer. Users can save recipes with photos, ingredients, ratings, and notes.

## Tech Stack

- **Next.js 16.2.1** (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code
- **React 19** with TypeScript 5
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **Supabase** — auth, Postgres database, and file storage (`@supabase/ssr`)

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/(auth)/` | Unauthenticated pages: login, signup |
| `src/app/(app)/` | Authenticated pages: dashboard, recipe CRUD |
| `src/actions/` | Server Actions (`'use server'`) — all mutations |
| `src/lib/queries/` | Server-side read-only query functions |
| `src/lib/supabase/` | Supabase client factories (client/server/middleware) |
| `src/components/ui/` | Primitive UI components (Button, Input, Modal, etc.) |
| `src/components/recipes/` | Recipe-specific components |
| `src/components/auth/` | Auth form components |
| `src/types/index.ts` | Shared TypeScript interfaces |

## Commands

```bash
npm run dev      # development server (localhost:3000)
npm run build    # production build
npm run start    # production server
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Additional Documentation

- [`.claude/docs/architectural_patterns.md`](.claude/docs/architectural_patterns.md) — Server Actions pattern, dual Supabase clients, query/action split, auth flow, UI component conventions
