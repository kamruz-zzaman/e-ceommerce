import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import { CATEGORIES } from "../src/lib/categories.ts";
import type { Product } from "../src/types/product.ts";
import { EXPECTED_CATEGORY_TOTALS } from "./catalog-definitions.ts";

function requireInvariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Catalog validation: ${message}`);
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
function integer(value: unknown, minimum: number): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= minimum;
}

/** Validate unknown serialized records rather than trusting a TypeScript assertion. */
export function validateCatalog(value: unknown, publicDirectory: string): asserts value is readonly Product[] {
  requireInvariant(Array.isArray(value), "expected an array");
  requireInvariant(value.length >= 500 && value.length === 520, "expected exactly 520 products");
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const reviewIds = new Set<string>();
  const totals = new Map<string, number>();
  const checkedImages = new Set<string>();
  const attributionRows = readFileSync(resolve(publicDirectory, "../docs/image-attribution.md"), "utf8").split("\n");
  const categories = new Set<string>(CATEGORIES.map(({ id }) => id));
  for (const product of value) {
    requireInvariant(record(product), "invalid product object");
    requireInvariant(text(product.id) && !ids.has(product.id), "missing or duplicate ID");
    ids.add(product.id);
    requireInvariant(text(product.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) && !slugs.has(product.slug), `${product.id}: invalid or duplicate slug`);
    slugs.add(product.slug);
    requireInvariant(text(product.title) && !titles.has(product.title.trim().toLowerCase()), `${product.id}: empty or duplicate title`);
    titles.add(product.title.trim().toLowerCase());
    requireInvariant(text(product.description), `${product.id}: empty description`);
    requireInvariant(!/\b1 rulers\b/.test(`${product.title} ${product.description}`), `${product.id}: singular ruler copy`);
    requireInvariant(text(product.category) && categories.has(product.category), `${product.id}: invalid category`);
    totals.set(product.category, (totals.get(product.category) ?? 0) + 1);
    requireInvariant(integer(product.priceCents, 1), `${product.id}: invalid priceCents`);
    requireInvariant(integer(product.stock, 0), `${product.id}: invalid stock`);
    requireInvariant(Array.isArray(product.reviews), `${product.id}: invalid reviews`);
    let sum = 0;
    const reviewBodies = new Set<string>();
    const reviewOpenings = new Set<string>();
    for (const review of product.reviews) {
      requireInvariant(record(review), `${product.id}: invalid review`);
      requireInvariant(text(review.id) && !reviewIds.has(review.id), `${product.id}: invalid review ID`);
      reviewIds.add(review.id);
      requireInvariant(text(review.authorName) && text(review.body), `${product.id}: empty review attribution/body`);
      const opening = review.body.split(/[.!?]\s/)[0]!;
      requireInvariant(!reviewBodies.has(review.body) && !reviewOpenings.has(opening), `${product.id}: repeated review observation`);
      requireInvariant(!/\{[^}]*\}/.test(review.body), `${product.id}: unresolved review placeholder`);
      if (product.slug.startsWith("lantern-") || product.slug.startsWith("candle-holder-")) {
        requireInvariant(!/I use it for (?:evening )?reading/i.test(review.body), `${product.id}: unsuitable candle reading claim`);
      }
      reviewBodies.add(review.body);
      reviewOpenings.add(opening);
      requireInvariant(integer(review.rating, 1) && review.rating <= 5, `${product.id}: invalid review rating`);
      sum += review.rating;
    }
    const expectedRating = product.reviews.length ? Math.round(sum / product.reviews.length * 10) / 10 : null;
    requireInvariant(product.rating === expectedRating, `${product.id}: rating does not match reviews`);
    requireInvariant(product.rating === null || (typeof product.rating === "number" && Number.isFinite(product.rating) && product.rating >= 0 && product.rating <= 5), `${product.id}: invalid aggregate rating`);
    requireInvariant(Array.isArray(product.images) && product.images.length > 0, `${product.id}: no images`);
    const sources = new Set<string>();
    for (const image of product.images) {
      requireInvariant(record(image) && text(image.src) && /^\/images\/products\/[a-z0-9-]+\.jpg$/.test(image.src), `${product.id}: invalid image path`);
      requireInvariant(text(image.alt) && integer(image.width, 1) && integer(image.height, 1), `${product.id}: invalid image metadata`);
      requireInvariant(!sources.has(image.src), `${product.id}: repeated gallery image`);
      sources.add(image.src);
      const path = resolve(publicDirectory, `.${image.src}`);
      requireInvariant(path.startsWith(resolve(publicDirectory) + sep) && existsSync(path), `${product.id}: missing local image ${image.src}`);
      if (!checkedImages.has(path)) {
        const filename = image.src.split("/").at(-1)!;
        const attributionRow = attributionRows.find((row) => row.startsWith(`| \`${filename}\` |`));
        // Coverage check only; source/license accuracy is verified against acquisition records.
        requireInvariant(attributionRow && attributionRow.includes("https://commons.wikimedia.org/wiki/File:")
          && /CC BY|CC0|Public domain/.test(attributionRow), `${image.src}: missing source/license attribution`);
        const bytes = readFileSync(path);
        requireInvariant(bytes.length > 1000 && bytes[0] === 0xff && bytes[1] === 0xd8, `${image.src}: expected a JPEG image`);
        checkedImages.add(path);
      }
    }
  }
  for (const [category, count] of Object.entries(EXPECTED_CATEGORY_TOTALS)) {
    requireInvariant(totals.get(category) === count, `${category}: expected ${count} records`);
  }
}

export function summarizeCatalog(products: readonly Product[]) {
  const rated = products.filter((p) => p.rating !== null);
  return {
    products: products.length,
    categories: Object.fromEntries(CATEGORIES.map(({ id }) => [id, products.filter((p) => p.category === id).length])),
    priceCents: { min: Math.min(...products.map((p) => p.priceCents)), max: Math.max(...products.map((p) => p.priceCents)) },
    rating: { unrated: products.length - rated.length, below3: rated.filter((p) => p.rating! < 3).length, from3To4: rated.filter((p) => p.rating! >= 3 && p.rating! < 4).length, atLeast4: rated.filter((p) => p.rating! >= 4).length },
    reviews: { total: products.reduce((sum, p) => sum + p.reviews.length, 0), minRated: Math.min(...rated.map((p) => p.reviews.length)), max: Math.max(...products.map((p) => p.reviews.length)) },
    stock: { out: products.filter((p) => p.stock === 0).length, low: products.filter((p) => p.stock > 0 && p.stock <= 5).length, regular: products.filter((p) => p.stock > 5).length, max: Math.max(...products.map((p) => p.stock)) },
    uniqueImages: new Set(products.flatMap((p) => p.images.map((i) => i.src))).size,
  };
}
