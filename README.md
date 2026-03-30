# 🍴 Bust

> **Your personal recipe book.**

Bust is a private web app for saving and organising recipes you've made. Add photos, ingredients, step-by-step directions, and a rating out of 10. Search and sort your collection to find exactly what you want to cook.

---

## Version

**1.0.0** — Initial release

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Backend | Supabase (Auth, Postgres, Storage) |
| Hosting | Vercel |

---

## Features

- 🍴 Save recipes with ingredients and directions
- 📷 Upload a photo for each recipe
- ⭐ Rate recipes out of 10 with a half-star display
- 🔍 Search recipes by name in real time
- 🔃 Sort by newest, oldest, A–Z, Z–A, highest or lowest rated
- 🌙 Light and dark mode
- 🔐 Auth with email + username login

---

## To-Do

<!-- Add future changes and improvements here -->

- [ ]

---

## Development

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

**Environment variables required:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
