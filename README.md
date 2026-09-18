# Future Studios BD

A restrained e-commerce frontend assessment built with Next.js App Router,
React, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 24.x (see `.nvmrc`). Next.js 16.3.5 requires Node >=20.9.0;
  this project targets Node 24 LTS.
- pnpm 10.17.0, declared in `package.json`.

## Setup

Select Node 24 with your runtime manager (`nvm use` if using nvm), then run:

```sh
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Checks

```sh
pnpm catalog:check
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Typechecking generates Next.js route types before running TypeScript.
The committed pnpm lockfile records dependency resolution. `pnpm build` first
runs the lightweight catalog check; it does not regenerate data or process images.

## Current scope

The foundation includes a responsive shared header, homepage, metadata, favicon,
and server-rendered product discovery at `/products`. A local 520-product
assessment catalog is accessed through a server-only product service. Query normalization, search,
filtering, sorting, pagination, and detail/related lookup are implemented and
unit tested. Discovery includes search, grouped filters, sorting, pagination, and
loading/empty/error states. Product detail pages and commerce features are not yet
implemented; cards intentionally have no links to missing detail routes.
shadcn/ui setup is deferred until a component requires it.

## Structure and rendering

- `src/app`: Server Component routes and root layout, metadata, global styles.
- `src/components/shared`: shared server-rendered header.
- `src/components/product`: server cards/grid/pagination and interactive discovery controls.
- `src/types`: shared product, image, review, and normalized query contracts.
- `src/lib/categories.ts`: six shared category IDs and display labels.
- `src/lib/product-query.ts`: framework-independent URL query normalization.
- `src/lib/product-url.ts`: deterministic discovery URLs and the page-number window.
- `src/services`: pure product selection and a server-only catalog-backed service.
- `src/data/products.generated.json`: committed generated catalog, outside `public`.
- `src/data/products.ts`: small typed server-only catalog entry point.
- `scripts`: curated definitions, image metadata, generator, and invariant checks.
- `public/images/products`: 51 local representative product photographs.
- `docs/image-attribution.md`: image source, author, license, and reuse information.

Only discovery controls and the route error boundary are application Client
Components. The `/products` Server Component normalizes searchParams and calls
getProducts once. Controls receive query values and the result count, never products
or reviews. No browser product fetching, global stores, or memoization is used.
Pagination uses Next.js links. System typography avoids remote font downloads. Shared styles define a 1280px container, responsive
gutters, restrained colors, and visible keyboard focus.

## Catalog fixtures

All products, prices, inventory, review bodies, and reviewer names are synthetic
assessment fixtures, not actual goods offered for sale or customer endorsements.
The 18 reviewer names are fictional. Do not present these reviews as verified
purchases or publish their aggregates as claims about real products.

There are 52 curated families with ten explicitly allowed size, capacity, page,
or pack configurations each. Home & Living and Kitchen & Dining each have 100
products; Office & Stationery, Lighting, Bags & Everyday Carry, and Outdoor &
Garden each have 80. Descriptions are practical family-specific copy with explicit
configuration specifications. Compatible configurations intentionally share copy
and imagery; this is not 520 independently photographed products.

Prices use positive integer USD cents (`priceCents`). Stock is a non-negative
integer and includes unavailable and low-stock examples. Rated products have
2–12 synthetic reviews, each with a 1–5 integer rating. Product ratings are the
arithmetic mean rounded to one decimal; products without reviews use `null`,
so absence of reviews is not misrepresented as a zero-star score. Reviews draw
without replacement from small family-specific observation pools, with explicit
configuration wording where useful. Generic category-wide closing sentences are
not appended. Observations intentionally recur across compatible variants.

The Everyday Tote Bag is sold singly; the Shopping Tote Pair contains two bags.
The pair's capacity label is per bag, its price covers both, and the shared image
represents one bag. No unpictured pockets, closures, or materials are implied.

To change the catalog, edit the explicit definitions or image manifest, then run:

```sh
pnpm catalog:generate
pnpm catalog:check
```

Node 24 runs these TypeScript development scripts directly; no runner is needed.
The package uses ES modules. Generation uses the fixed `fsb-catalog-v1` seed and
field-specific SHA-256 choices keyed by family/configuration, without randomness,
timestamps, or position-based product IDs. IDs and slugs retain the authored keys.
Output is serialized in ID order for stable diffs; this is not discovery sorting.
`catalog:check` validates the committed JSON, compares it byte-for-byte with the
expected output, and reports counts and distributions without writing files.

The roughly 1 MB generated output is JSON instead of a large TypeScript literal.
The small loader has one boundary assertion for JSON's non-empty image tuple and
narrow review-rating union; the invariant check validates the actual data before
production builds. The loader imports `server-only`. The product service uses
that entry point; components must not import the raw catalog. Shared types and
category labels contain no dataset dependency and are safe for client controls.
There is no API route, runtime catalog generation, or network data fetching,
and no application component imports the catalog.

Images are local, with no runtime image-host dependency. Each product has one
representative family image. Photos can show props or accessories and do not
represent exact fictional dimensions; no repeated view is added just to fill a
gallery. Photography varies in framing and lighting, and several source images
show real manufacturer markings. These are source-image details, not a fabricated
brand partnership. See [image attribution](docs/image-attribution.md) for licenses.

## Product service and query behavior

The synchronous server-only service exposes `getProducts(query)`,
`getProductBySlug(slug)`, and `getRelatedProducts(product, limit?)`. Pure selection
functions accept readonly products, so behavior can be tested with small fixtures.
No repository classes, internal HTTP calls, caches, or search indexes are needed
for 520 in-memory products. The listing route consumes getProducts; detail and
related lookup are available for the later product-detail UI.

`normalizeProductQuery` accepts raw string/string-array search parameters without
React or Next.js dependencies. Supported keys are q, category, minPrice, maxPrice,
rating, sort, and page. Repeated parameters use the first valid value before any
fallback. Search whitespace is collapsed; an empty first search value is valid.
Unknown categories are ignored; unknown sorts default to relevance. Numeric input
uses decimal notation, not exponents, hexadecimal, partial numbers, or infinity.
Prices are non-negative USD amounts with at most two decimal places and safe,
round-trippable integer cents. Reversed price bounds are swapped. Invalid bounds
are ignored. Positive fractional pages are floored with a minimum of one;
invalid/zero/negative pages default to one. Rating accepts 0–5 inclusive.

Listing processes search → filter → sort → paginate. Every search term must occur
in title, description, or category display label, ignoring case. Relevance prefers
exact normalized titles, complete title phrases, all terms in the title, then more
title-term matches, with normalized title and stable ID breaking ties. Empty
searches use stable ID order. Price sorts use title then ID for ties; rating sort
places rated products before unrated, then uses descending rating, title, and ID.
Name sort uses normalized title then ID. Text comparisons are explicit lexical
comparisons rather than machine-locale dependent ordering.

Price and rating bounds are inclusive; filters combine with AND. An absent or
zero minimum rating includes unrated products, while a positive minimum excludes
them. Results contain only products, total, effective page, limit (20), and
totalPages. Excessive pages clamp to the final page; empty results use page 1 and
zero totalPages. Only the requested page is returned; the catalog is never sorted
in place. Discovery controls write URLs and reset pagination on search, filter,
and sort changes.

Slug lookup is exact and case-sensitive, returning null when missing; future
routes own `notFound()`. Related products share the category, exclude the current
ID, and use the rating/title/ID ordering above. Limits default to 4, cap at 8,
and floor positive fractions; zero/negative limits return no items, while
non-finite or invalid programmatic values use the default.

Vitest runs in Node with small synthetic fixtures plus a few real-catalog service
integration checks. Only that integration test mocks the `server-only` marker;
production boundaries remain intact. Run `pnpm test` once or `pnpm test:watch`
during development. No browser, DOM, or coverage dependency is required.


## Discovery interaction and accessibility

Search submits explicitly with Enter or Search. Category, USD price bounds, and
minimum rating commit together with Apply filters. One native details/summary
filter form works across desktop and mobile. Invalid typed prices receive native
validation feedback. Sorting commits immediately using committed filters, without
submitting unsaved drafts. Clear search removes only q; Clear all returns to
/products. Generated URLs omit empty/default values, preserve rating=0, and keep
all active discovery parameters during pagination. Manually entered non-canonical
URLs are rendered safely without cosmetic redirects.

Rating presets are Any rating and 4/3/2/1 and above. A custom URL minimum such as
4.25 is described below the control and retained with a fixed Keep current setting
choice until a preset is selected. No arbitrary numeric preset is manufactured.
Uncontrolled form inputs hold temporary drafts; query-keyed forms reset them on
committed navigation and history changes. A form ref preserves keyboard focus
when a keyed form is replaced. No URL synchronization effect is used.

Controls have associated labels, native keyboard behavior, visible focus, and
44px-or-larger targets. A single local live region reports pending navigation and
result counts. Route loading uses static placeholders; empty results retain the
controls and Clear all. The route error boundary offers retry and a default-products
link without exposing technical details. Error recovery was not artificially
triggered during browser verification.

Cards render at most 20 products, with category, textual rating/review count, USD
price, and useful stock information. Titles wrap without truncation. Local next/image
images reserve square space and use responsive sizes with object containment.
Browser inspection identified the first product image as an LCP candidate, so only
that image uses eager loading; other images remain lazy. Product data/review bodies
stay in Server Components, not client control props or client JavaScript.

The grid uses one column at narrow reflow widths, two at phone widths from 360px,
three from 768px, and four from 1024px within the 1280px container. Manual checks
covered 320/375/768/1024/1440px, URL/history behavior, keyboard forms/disclosure,
focus, empty results, and pagination. Actual 200% browser zoom remains unverified
and is reserved for the final accessibility audit.

Vitest additionally covers URL updates/removal, default omission, page reset,
encoding, rating preservation, immutability, and pagination windows. The current
suite has 82 tests. No DOM-testing or end-to-end dependency has been introduced.
