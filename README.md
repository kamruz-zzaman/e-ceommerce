# Future Studios BD

A frontend e-commerce assessment: product discovery, search, cart, and
checkout built with the Next.js App Router.

## Features

- 520 deterministic, locally-generated products across 6 categories
- Search, category/price/rating filters, sorting, and numbered pagination
- All discovery state lives in the URL — refresh, share, and back/forward all work
- Debounced `/products` search plus a global header autocomplete for quick navigation
- Product detail pages with stock, reviews, and related products
- Persistent cart (localStorage) with a slide-out drawer
- Checkout with client-side validation and a simulated order confirmation
- Server-rendered SEO metadata, Open Graph tags, and Product JSON-LD
- Responsive layout and keyboard-accessible controls throughout

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Zustand** — cart state
- **React Hook Form + Zod** — checkout form and validation
- **Vitest** — unit and service tests

No UI component library, fuzzy-search dependency, or state-management library
beyond Zustand is used.

## Getting started

Requires Node 24.x (see `.nvmrc`) and pnpm 10.17.0 (declared as
`packageManager` in `package.json`).

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm test        # Vitest unit/service tests
pnpm lint        # ESLint, zero warnings allowed
pnpm typecheck   # next typegen + tsc --noEmit
pnpm build       # production build
pnpm start       # serve the production build
```

`pnpm build` runs a catalog integrity check first (`pnpm catalog:check`); it
validates the committed product data and does not regenerate anything.

## Environment variables

`SITE_URL` is optional and is not a secret.

```sh
SITE_URL=https://example.com
```

When set to a valid absolute HTTP(S) origin (no path, query, or credentials),
product pages emit absolute-URL-dependent SEO: canonical links, Open Graph
URL/image, and Product JSON-LD. Without it, the app runs normally and simply
omits those fields — title, description, and text metadata are unaffected.

## Architecture overview

- **App Router**, with Server Components for anything that only reads and
  renders catalog data (listing, product cards, product details, related
  products, homepage sections, SEO metadata).
- A small set of **Client Components** handle interaction: search/filter
  controls, the header autocomplete, the cart drawer and its trigger, cart
  hydration, and the checkout form.
- A **server-only product service** (`src/services`) is the single access
  point to the catalog; no component imports the raw data directly.
- The **URL is the source of truth** for product discovery (search, filters,
  sort, page) — there is no separate client-side discovery store.
- **Zustand** holds cart state, the one piece of state that genuinely needs
  to persist and be shared across routes.
- **React Context** is used only for the cart drawer's open/closed UI state,
  which is intentionally not persisted.
- **React Hook Form + Zod** drive the checkout form.
- A **Route Handler** (`/api/products/suggest`) powers the header
  autocomplete by calling into the same product service the listing page
  uses.

## Server vs. Client Components

Server Components are the default. A component only becomes a Client
Component when it genuinely needs a browser capability: local state, event
handlers, `localStorage`, or a native `<dialog>`. In this codebase that's the
search/filter controls, the header autocomplete, the cart drawer/trigger/
add-to-cart button, the checkout form, and the route error boundaries Next.js
requires to be client-rendered.

Everything else — product listing, product cards, product detail pages,
related products, homepage sections, and SEO metadata generation — stays on
the server. This keeps the ~520-product catalog and all review/description
data out of the client bundle entirely: the browser never fetches or holds
the full catalog, only the page of results the server already rendered (or,
for autocomplete, a handful of minimal suggestion objects from the Route
Handler). It also keeps the interactive surface area small and easy to
reason about, since each Client Component owns a narrow, well-defined job
rather than wrapping large chunks of otherwise-static markup.

## Product dataset

The catalog (520 products) is generated deterministically from explicit
definitions in `scripts/catalog-definitions.ts` and committed as
`src/data/products.generated.json` — there is no external commerce API and
no database. Generation is seeded and produces stable IDs, slugs, prices,
stock levels, and review data on every run; `pnpm catalog:check` verifies the
committed file still matches that deterministic output byte-for-byte.

This fits the assessment well: the app is fully offline-capable, every test
run sees the same data, and there's no dependency on a third-party service's
availability or rate limits. All products, prices, and reviews are synthetic
fixtures — see [docs/image-attribution.md](docs/image-attribution.md) for
image sourcing.

## Product discovery & URL state

`/products` accepts these query parameters, all validated and normalized
server-side:

| Param | Meaning |
|---|---|
| `q` | search text |
| `category` | one of the six category IDs |
| `minPrice` / `maxPrice` | USD bounds |
| `rating` | minimum rating (0–5) |
| `sort` | relevance / price / rating / name |
| `page` | 1-indexed page number |

The URL is the only source of truth for discovery state. Invalid or
malformed values (a negative page, an out-of-range rating, an unknown
category) normalize safely rather than erroring. Changing a filter or the
search term resets pagination to page 1; changing the page preserves every
other active parameter. Because the URL fully describes the view: refreshing,
sharing a link, and using browser Back/Forward all reproduce the exact same
result set, server-rendered.

## Search behavior

Two distinct search surfaces, for two distinct purposes:

**`/products` search** — part of discovery. Typing updates the input
immediately; after ~300ms of inactivity the URL updates automatically via
`router.replace` (so incidental keystrokes don't pollute browser history).
Pressing Enter or the Search button commits immediately instead. Results are
always rendered server-side from the URL.

**Header autocomplete** — a quick-navigation shortcut available from any
page. Starts suggesting after 2 characters, debounced ~300ms, capped at 5
results. Backed by `GET /api/products/suggest`, which validates and
length-limits the query server-side and reuses the exact same ranking logic
as the listing page (no duplicated search implementation). The response is a
minimal `{ slug, title, category, priceCents, image }` per result — no
descriptions, reviews, or stock data cross the wire. In-flight requests are
cancelled (`AbortController`) when superseded or when the user navigates
away, and a stale response can never overwrite newer results. The combobox
follows the standard ARIA combobox/listbox pattern (arrow keys, Enter,
Escape, `aria-activedescendant`). "View all results" and Enter-without-a-
selection both land on the same canonical `/products?q=...` URL the listing
page owns.

## Data / service layer

The server-only service (`src/services/product-service.ts`) exposes:

- `getProducts(query)` — search → filter → sort → paginate, in that order
- `getProductBySlug(slug)`
- `getRelatedProducts(product, limit?)` — same category, excludes the
  current product, capped and defaulted
- `getProductSuggestions(q)` — the autocomplete's minimal result shape

Selection is pure and deterministic: every sort has an explicit tie-breaker
(title, then ID) so ordering never varies between runs, and the underlying
catalog array is never mutated. The Route Handler and the listing page share
the same selection function, so autocomplete ordering and listing ordering
are guaranteed to agree.

## Cart

Cart state lives in a Zustand store, persisted to `localStorage` under a
versioned envelope. The persisted shape per item is intentionally minimal —
product identity, slug, title, price, image, stock, and quantity — not a
full product record. Malformed or unrecognized storage content is discarded
rather than trusted; the UI distinguishes "cart not yet loaded from storage"
from "loaded and genuinely empty" and won't mutate state before hydration
completes. Quantities are clamped to available stock, and adding a product
already in the cart refreshes its stored price/title/image/stock from the
snapshot passed in at that moment (it does not poll or revalidate against
the catalog in the background). Totals are always computed from the current
items, never stored separately.

## Cart drawer

The drawer is a native `<dialog>`, opened by the cart icon or automatically
after a successful "Add to cart." Its open/closed state is ephemeral UI
state held in a small React Context — not persisted, and separate from the
cart data itself, which comes from the same Zustand store the full `/cart`
page uses. "View cart" and "Checkout" navigate normally from there.

## Checkout

A single-step form (React Hook Form + Zod) collecting full name, email,
address, city, postal code, and country, with inline, accessible validation
errors. Submission is guarded against duplicate clicks, then simulated
(there is no payment processor and no backend order system — the "order" is
a client-side confirmation snapshot taken before the cart is cleared).
Refreshing the confirmation screen does not restore it, since nothing is
persisted server-side; this is an intentional scope boundary, not a bug.

## SEO

Product pages use `generateMetadata` for title/description, and — only when
`SITE_URL` is configured — a canonical URL, Open Graph tags, and Product
JSON-LD (price, currency, availability, and an aggregate rating only when
the product actually has reviews). No fabricated brand, SKU, or seller
fields are included. Requesting a nonexistent product slug returns a true
HTTP 404 (via `notFound()`), not a soft "not found" page served with a 200.

## Performance decisions

- Listing and detail pages are server-rendered per request rather than
  pre-building all 520 product pages at build time.
- Autocomplete requests are debounced, cancelled when superseded, and
  return a minimal payload — not the full product shape.
- React Hook Form and Zod are loaded only on the checkout route, not
  globally.
- Product images use `next/image` with responsive `sizes` and reserved
  aspect ratios; only the single above-the-fold detail image is marked a
  priority/eager load.
- No `useMemo`/`useCallback`/`memo` is applied speculatively — this app's
  render costs are small and none were found to need it; a couple of
  stable callbacks in the cart drawer's Context provider are memoized
  because they're passed down through Context and used as effect
  dependencies elsewhere.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a skip-to-
  content link.
- One `<h1>` per page and a consistent heading hierarchy.
- Labeled form controls with accessible, per-field validation errors.
- Visible focus states and a logical keyboard tab order throughout,
  including the filter disclosure, pagination, and checkout form.
- The header autocomplete follows the ARIA combobox/listbox pattern
  (`aria-expanded`, `aria-controls`, `aria-activedescendant`), with full
  keyboard and mouse support and no keyboard trap.
- The cart drawer is a native `<dialog>`, which provides a standard focus
  trap and keyboard/backdrop dismissal without custom JavaScript.
- Verified across 320–1440px viewport widths, with no horizontal overflow.

## Testing

Vitest covers the parts of the app where correctness matters most and is
cheapest to verify without a browser: query normalization, search/filter/
sort/pagination behavior and its tie-breaking rules, product and related-
product lookup, the autocomplete service and its Route Handler (including
input validation and response shape), cart persistence/sanitization/actions,
and the checkout schema and order-confirmation sequencing. Interactive/UI
behavior (keyboard navigation, focus, drawer dismissal, responsive layout)
is verified manually in a real browser rather than through a DOM-testing or
end-to-end framework.

## Project structure

```
src/
  app/          Routes, layout, root metadata, global styles
  components/   UI, grouped by feature (product, cart, checkout, home, shared)
  data/         Generated product catalog + its server-only loader
  lib/          Framework-independent helpers (query, URL, cart, SEO, ...)
  schemas/      Zod schemas
  services/     Server-only product service and pure selection logic
  stores/       Zustand cart store
  types/        Shared TypeScript types
scripts/        Catalog definitions, image manifest, generator, validator
docs/           Image attribution
```

## Key trade-offs / scope

These are deliberate choices for the scope of this assessment, not
oversights:

- A local, deterministic dataset instead of a real commerce backend —
  reproducible, offline, and stable for testing.
- Numbered pagination instead of infinite scroll.
- URL state instead of a global discovery store.
- Zustand only for cart state; everything else uses local state, URL state,
  or plain server rendering.
- No authentication, payment processing, or backend order persistence — the
  checkout confirmation is intentionally session-only.
- No inventory-synchronization service; cart items refresh against the
  catalog when re-added, not continuously in the background.
- No fuzzy-search dependency; ranking is explicit and deterministic.

## Design

A restrained, content-first storefront: product imagery is prioritized,
spacing and typography stay consistent, and interaction feedback (loading,
pending, success states) is deliberately understated rather than flashy.
