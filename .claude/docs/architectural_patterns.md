# Architectural Patterns

## Dual Supabase Clients

Two factories, same export name — import from the correct file based on context:

- `src/lib/supabase/client.ts` — browser only (`createBrowserClient`). Used in Client Components that need direct Supabase access.
- `src/lib/supabase/server.ts` — server only (`createServerClient` + cookie handling). Used in Server Components, Server Actions, and query functions.

Never import the server client in a Client Component or vice versa.

## Server Actions for Mutations

All write operations live in `src/actions/` with `'use server'` at the top.

**Return contract:**
- On failure: return `{ error: string }` — never throw.
- On success: call `revalidatePath()` then `redirect()` — no return value.

**Ownership check pattern** (seen in `src/actions/recipes.ts:85-91`, `src/actions/recipes.ts:140-147`): fetch the record first, verify `record.user_id === user.id`, return `{ error: 'Not authorized.' }` on mismatch before any mutation.

## Query Layer for Reads

`src/lib/queries/` contains server-side read functions called directly from async Server Components (e.g. `dashboard/page.tsx:13`). These never revalidate or redirect — that responsibility stays in actions.

## Route Groups for Auth Segmentation

- `src/app/(auth)/` — unauthenticated shell layout
- `src/app/(app)/` — authenticated shell layout with nav header

`middleware.ts` delegates to `src/lib/supabase/middleware.ts:updateSession`, which:
- Redirects unauthenticated requests to `/login`
- Redirects authenticated users away from auth pages to `/dashboard`

Pages also perform a redundant `if (!user) redirect('/login')` guard as a safety net (e.g. `dashboard/page.tsx:11`).

## Client Form → Server Action Pattern

Client Components handle form submission, call Server Actions, and manage local error state:

1. `e.preventDefault()` + build `FormData` from `e.currentTarget`
2. Append non-input state (e.g. `rating`) manually via `formData.set()`
3. Call the Server Action, await `{ error }` result
4. Display error inline; on success the action redirects (no client-side nav needed)

`RecipeForm` uses `useTransition` for pending state (`src/components/recipes/RecipeForm.tsx:23`). `LoginForm`/`SignupForm` use plain `useState` loading flags.

## UI Component Conventions

Primitive components in `src/components/ui/` accept `variant` and `size` props and use `cn()` (`src/lib/utils.ts:1`) to merge Tailwind classes. `Button` variants: `primary` (orange), `secondary`, `danger`, `ghost`.

## Photo Storage Pattern

Bucket: `recipe-photos`. Path structure: `{userId}/{recipeId}/{timestamp}.{ext}` (see `src/lib/queries/storage.ts:12`).

Photos are private — always accessed via signed URLs with 1-hour expiry, generated fresh on every read in `src/lib/queries/recipes.ts:17-25`. The `photo_url` column stores a cached URL but should be treated as stale; `photo_path` is the stable reference.

On recipe update, the old photo is deleted before uploading the new one (`src/actions/recipes.ts:98`).
