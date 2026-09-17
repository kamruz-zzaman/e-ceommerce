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
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Typechecking generates Next.js route types before running TypeScript.
The committed pnpm lockfile records dependency resolution.

## Current scope

The foundation includes a responsive shared header, homepage, metadata, favicon,
and a heading-only `/products` destination. Product discovery and commerce
features are not yet implemented. shadcn/ui setup is deferred until a component
requires it.

## Structure and rendering

- `src/app`: Server Component routes and root layout, metadata, global styles.
- `src/components/shared`: shared server-rendered header.

There are no application Client Components, data fetching, client stores, or
memoization in this foundation. Navigation uses Next.js links. System typography
avoids remote font downloads. Shared styles define a 1280px container, responsive
gutters, restrained colors, and visible keyboard focus.
