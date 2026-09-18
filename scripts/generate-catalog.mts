import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CATALOG_SEED, FAMILIES, REVIEW_AUTHORS } from "./catalog-definitions.ts";
import type { FamilyDefinition } from "./catalog-definitions.ts";
import { CATALOG_IMAGES } from "./catalog-images.ts";
import { summarizeCatalog, validateCatalog } from "./validate-catalog.ts";
import type { Product, Review } from "../src/types/product.ts";

const output = new URL("../src/data/products.generated.json", import.meta.url);
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const choice = (key: string, field: string, count: number) =>
  createHash("sha256").update(`${CATALOG_SEED}|${key}|${field}`).digest().readUInt32BE(0) % count;

function makeReviews(key: string, family: FamilyDefinition, configurationLabel: string): readonly Review[] {
  if (choice(key, "has-reviews", 100) < 8) return [];
  const count = 2 + choice(key, "review-count", 11);
  const profile = choice(key, "rating-profile", 100);
  const notes = [
    ...family.reviewNotes.positive.map((body) => ({ body, limitation: false })),
    ...family.reviewNotes.limitations.map((body) => ({ body, limitation: true })),
  ];
  if (notes.length < 12 || new Set(notes.map((note) => note.body)).size !== notes.length) {
    throw new Error(`Expected at least 12 distinct review observations: ${family.key}`);
  }
  // Select whole, family-specific observations without replacement. No category filler.
  notes.sort((a, b) => choice(key, `review:${a.body}`, 0xffffffff) - choice(key, `review:${b.body}`, 0xffffffff)
    || (a.body < b.body ? -1 : a.body > b.body ? 1 : 0));
  const authors = [...REVIEW_AUTHORS].sort((a, b) =>
    choice(key, `author:${a}`, 0xffffffff) - choice(key, `author:${b}`, 0xffffffff));
  return notes.slice(0, count).map((note, index) => {
    const reviewKey = `${key}|review:${note.body}`;
    const ratings: readonly Review["rating"][] = note.limitation
      ? (profile < 12 ? [2, 2, 3] : profile < 35 ? [2, 3, 3] : [3, 3, 4])
      : (profile < 12 ? [3, 3, 4] : profile < 35 ? [3, 4, 4] : [4, 5, 5]);
    return {
      id: `review-${createHash("sha256").update(reviewKey).digest("hex").slice(0, 16)}`,
      authorName: authors[index]!,
      rating: ratings[choice(reviewKey, "rating", ratings.length)]!,
      body: note.body.replaceAll("{label}", configurationLabel),
    };
  });
}

function generate(): readonly Product[] {
  const familyKeys = new Set<string>();
  const products: Product[] = [];
  for (const family of FAMILIES) {
    if (familyKeys.has(family.key)) throw new Error(`Duplicate family key: ${family.key}`);
    familyKeys.add(family.key);
    if (!family.attribute.trim()) throw new Error(`Missing specification label: ${family.key}`);
    const configurationKeys = new Set<string>();
    for (const configuration of family.configurations) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(configuration.key) || !configuration.label.trim()) throw new Error(`Invalid configuration: ${family.key}/${configuration.key}`);
      if (configurationKeys.has(configuration.key)) throw new Error(`Duplicate configuration: ${family.key}/${configuration.key}`);
      configurationKeys.add(configuration.key);
      const key = `${family.key}|${configuration.key}`;
      const reviews = makeReviews(key, family, configuration.label);
      const stockBucket = choice(key, "stock-state", 100);
      const stock = stockBucket < 10 ? 0 : stockBucket < 25 ? 1 + choice(key, "low-stock", 5) : 6 + choice(key, "regular-stock", family.category === "office" ? 55 : family.category === "lighting" ? 15 : 35);
      const image = CATALOG_IMAGES[family.key];
      if (!image) throw new Error(`Missing image for ${family.key}`);
      const specification = `${family.attribute[0]!.toUpperCase()}${family.attribute.slice(1)}: ${configuration.label}.`;
      const description = `${family.description} ${specification}`;
      products.push({
        id: `fsb-${family.key}-${configuration.key}`,
        slug: `${family.key}-${configuration.key}`,
        title: `${family.title} — ${configuration.label}`,
        description,
        category: family.category,
        priceCents: configuration.priceCents,
        rating: reviews.length ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10 : null,
        reviews,
        stock,
        images: [image],
      });
    }
  }
  // Canonical serialization order, not product-discovery sorting.
  return products.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

const products = generate();
validateCatalog(products, publicDirectory);
const serialized = JSON.stringify(products, null, 2) + "\n";
if (process.argv.includes("--check")) {
  const existing = readFileSync(output, "utf8");
  validateCatalog(JSON.parse(existing), publicDirectory);
  if (existing !== serialized) throw new Error("Catalog is stale. Run pnpm catalog:generate and review the diff.");
  console.log("Catalog matches deterministic source; no files changed.");
} else {
  writeFileSync(output, serialized);
  console.log("Wrote src/data/products.generated.json");
}
console.log(JSON.stringify(summarizeCatalog(products), null, 2));
console.log(`Bytes: ${Buffer.byteLength(serialized)}; SHA-256: ${createHash("sha256").update(serialized).digest("hex")}`);
