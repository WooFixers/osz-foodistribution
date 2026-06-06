# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OSZ Food Distribution is a Next.js 16 e-commerce app for a food distribution business in Marrakech, Morocco. It has two user journeys: B2C (`/particuliers`) and B2B (`/professionnels`), plus an admin panel at `/woofixers`. The backend is entirely Supabase (auth + database + storage), with Resend for transactional email.

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
| `/particuliers/commander` | Client-side filterable product catalog (note: `/particuliers/catalogue` permanently redirects here) |
| `/particuliers/produit/[slug]` | Product detail — server-fetched by slug (not ID) |
| `/professionnels` | B2B landing page |
| `/compte/connexion` | Supabase auth login |
| `/compte/profil` | User profile management |
| `/compte/commandes` | Order history |
| `/woofixers` | Admin login (unprotected) |
| `/woofixers/(admin)/*` | Protected admin panel (dashboard, product CRUD, messages) |

API routes under `src/app/api/`: `order`, `quote`, `contact`, `admin/export-products`, `admin/import-products`.

## Architecture

### Data & Auth

- **Supabase client** (`src/lib/supabase/`): `client.ts` for browser, `server.ts` for RSC/API routes. Server file exports both a regular user client and an admin (service role) client.
- **Database types** are hand-maintained in `src/lib/supabase/types.ts` — not auto-generated. Key types: `Product`, `Profile`, `Order`, `Quote`, `Contact`.
- **Read pattern**: server components query Supabase directly.
- **Write pattern**: varies by context:
  - Transactional submissions (orders, quotes, contacts) go through API route handlers (so email can be sent server-side).
  - Admin product CRUD (`ProductForm.tsx`) writes directly to Supabase from the browser client — no API route involved.
  - Admin import/export go through API routes (server-side xlsx processing).
- **Auth is enforced in `src/middleware.ts`**: `/woofixers/:path+` redirects unauthenticated users to `/woofixers` (the login page itself is NOT protected). `/compte/profil` and `/compte/commandes` redirect to `/compte/connexion`. The admin layout also re-checks `getUser()` but middleware is the primary guard.

### Cart & State

- Cart state lives in `src/hooks/use-cart.ts` using localStorage key `"osz_cart"` — no global state library.
- `CartDrawer.tsx` is SSR-safe (guards against hydration mismatch with `useEffect`).
- Cart items: `{ id, name, price, unit, image, qty }`.

### Catalog Page

`/particuliers/commander` is a fully client-side `"use client"` component. Products are fetched once via the Supabase browser client in a `useEffect`, then all filtering, sorting, and pagination happen in-memory via `useMemo`. There is no server component involved.

### Product Model

- Products are identified by `slug` (URL) and `id` (DB). Slug is auto-generated from name at creation (`toSlug()` in `ProductForm.tsx`) and never updated on edits.
- `suggestions` is stored as a PostgreSQL array but entered/edited as a comma-separated string in the admin form.
- Product images are stored in Supabase storage bucket `"product-images"` and referenced by public URL.
- Categories: `"viandes" | "legumes" | "charcuterie"`. Types: `"frais" | "surgele" | "prepare"`. Formats: `"unite" | "kilo" | "paquet"`. Badges: `"populaire" | "nouveau" | "offre"`.

### Forms & Validation

- React Hook Form + Zod at both client and API layers.
- API routes validate input with Zod before writing to Supabase and triggering email via Resend.

### Styling

- Tailwind CSS 4 (CSS-first config via `postcss.config.mjs`, not `tailwind.config.js`).
- Theme tokens are CSS custom properties in `src/app/globals.css` (HSL values, `--primary`, `--foreground`, etc.).
- `cn()` utility in `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).
- Fonts: **Playfair Display** (headings, `--font-playfair`), **DM Sans** (body, `--font-dm-sans`), **DM Mono** (monospace, `--font-dm-mono`), loaded via `next/font/google`.
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
- Excel import/export for the product catalog uses the `xlsx` package in API routes.
- Admin product list renders mobile cards and desktop table in the same server component (toggled with responsive Tailwind classes `md:hidden` / `hidden md:table`).
