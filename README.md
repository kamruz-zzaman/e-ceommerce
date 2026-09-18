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
and a heading-only `/products` destination. A local 520-product assessment catalog
is available to future server-side services. Product discovery and commerce
features are not yet implemented. shadcn/ui setup is deferred until a component
requires it.

## Structure and rendering

- `src/app`: Server Component routes and root layout, metadata, global styles.
- `src/components/shared`: shared server-rendered header.
- `src/types`: shared product, image, review, and normalized query contracts.
- `src/lib/categories.ts`: six shared category IDs and display labels.
- `src/data/products.generated.json`: committed generated catalog, outside `public`.
- `src/data/products.ts`: small typed server-only catalog entry point.
- `scripts`: curated definitions, image metadata, generator, and invariant checks.
- `public/images/products`: 51 local representative product photographs.
- `docs/image-attribution.md`: image source, author, license, and reuse information.

There are no application Client Components, data fetching, client stores, or
memoization in this foundation. Navigation uses Next.js links. System typography
avoids remote font downloads. Shared styles define a 1280px container, responsive
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
so absence of reviews is not misrepresented as a zero-star score.

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
production builds. The loader imports `server-only`. Future services should use
that entry point; components must not import the raw catalog. Shared types and
category labels contain no dataset dependency and are safe for client controls.
There is no product service, API route, runtime catalog generation, or data fetching
yet, and no application component imports the catalog.

Images are local, with no runtime image-host dependency. Each product has one
representative family image. Photos can show props or accessories and do not
represent exact fictional dimensions; no repeated view is added just to fill a
gallery. Photography varies in framing and lighting, and several source images
show real manufacturer markings. These are source-image details, not a fabricated
brand partnership. See [image attribution](docs/image-attribution.md) for licenses.
