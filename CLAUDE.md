# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OSZ Food Distribution is a Next.js 16 e-commerce app for a food distribution business in Marrakech, Morocco. It has two user journeys: B2C (`/particuliers`) and B2B (`/professionnels`), plus an admin panel at `/woofixers`. The backend is entirely Supabase (auth + database), with Resend for transactional email.

## Commands

```bash
npm run dev      # Dev server on http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
```

There is no test framework configured.

## Routing Structure

Uses Next.js App Router with server components by default:

| Route | Purpose |
|---|---|
| `/` | Home landing page |
| `/particuliers` | B2C landing page |
| `/particuliers/catalogue` | Client-side filterable product catalog |
| `/particuliers/produit/[id]` | Product detail |
| `/professionnels` | B2B landing page |
| `/compte/connexion` | Supabase auth login |
| `/compte/profil` | User profile management |
| `/compte/commandes` | Order history |
| `/woofixers` | Admin login |
| `/woofixers/(admin)/*` | Protected admin panel (dashboard, product CRUD, messages) |

API routes under `src/app/api/`: `products`, `order`, `quote`, `contact`, `admin/export-products`, `admin/import-products`.

## Architecture

### Data & Auth

- **Supabase client** (`src/lib/supabase/`): `client.ts` for browser, `server.ts` for RSC/API routes. Server file exports both a regular user client and an admin (service role) client.
- **Database types** are hand-maintained in `src/lib/supabase/types.ts` — not auto-generated. Key types: `Product`, `Profile`, `Order`, `Quote`, `Contact`.
- Server components query Supabase directly (no API layer for reads). Writes go through API route handlers.
- Admin-protected routes check `getUser()` server-side and redirect to `/woofixers` on failure.

### Cart & State

- Cart state lives in `src/hooks/use-cart.ts` using localStorage — no global state library.
- `CartDrawer.tsx` is SSR-safe (guards against hydration mismatch with `useEffect`).

### Forms & Validation

- React Hook Form + Zod at both client and API layers.
- API routes validate input with Zod before writing to Supabase and triggering email via Resend.

### Styling

- Tailwind CSS 4 (CSS-first config via `postcss.config.mjs`, not `tailwind.config.js`).
- Theme tokens are CSS custom properties in `src/app/globals.css` (HSL values, `--primary`, `--foreground`, etc.).
- `cn()` utility in `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).
- Fonts: **Cormorant Garamond** (headings), **Nunito** (body), loaded via Next.js `next/font/google`.
- shadcn/ui components in `src/components/ui/` — add new ones with `npx shadcn@latest add <component>`.

### Component Organization

- `src/components/sections/` — marketing/landing sections reused across B2B and B2C pages
- `src/components/forms/` — form dialogs (e.g., `QuoteFormDialog.tsx`)
- Top-level components (`CartDrawer`, `AccountButton`, `GTMScript`, etc.) are app-wide

## Environment Variables

See `.env.local.example` for all required variables:

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY    # server-only, never expose to client
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_TO_EMAIL
```

## Key Patterns

- Admin routes use `dynamic = "force-dynamic"` to prevent caching of real-time data.
- Email sending in API routes wraps `resend.emails.send()` in `.catch()` so order creation succeeds even if email fails.
- Images from Supabase storage and Unsplash are allowlisted in `next.config.ts` for `<Image>` optimization.
- The `/woofixers/(admin)` route group shares a layout that handles auth; individual pages don't re-check.
- Excel import/export for the product catalog uses the `xlsx` package in API routes.
