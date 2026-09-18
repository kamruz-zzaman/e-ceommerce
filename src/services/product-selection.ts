import { CATEGORIES } from "../lib/categories";
import type { Product } from "../types/product";
import type { ProductQuery } from "../types/product-query";

const PAGE_SIZE = 20;
export interface ProductListResult {
  readonly products: readonly Product[];
  readonly total: number;
  readonly page: number;
  readonly limit: 20;
  readonly totalPages: number;
}

const normalizeText = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();
const compareText = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
const compareTitle = (a: Product, b: Product) =>
  compareText(normalizeText(a.title), normalizeText(b.title)) || compareText(a.id, b.id);
const compareRating = (a: Product, b: Product) =>
  (b.rating ?? -1) - (a.rating ?? -1) || compareTitle(a, b);

/** Pure selection over validated products and normalized query input. */
export function selectProducts(catalog: readonly Product[], query: ProductQuery): ProductListResult {
  const phrase = normalizeText(query.q);
  const terms = phrase ? phrase.split(" ") : [];
  const minCents = query.minPrice === undefined ? undefined : Math.round(query.minPrice * 100);
  const maxCents = query.maxPrice === undefined ? undefined : Math.round(query.maxPrice * 100);

  // Search first; retain the small relevance keys for sorting without rescanning text.
  const searched = catalog.flatMap((product) => {
    const title = normalizeText(product.title);
    const category = CATEGORIES.find((category) => category.id === product.category)!.label;
    const text = `${title} ${normalizeText(product.description)} ${normalizeText(category)}`;
    if (!terms.every((term) => text.includes(term))) return [];
    const titleTerms = terms.filter((term) => title.includes(term)).length;
    const tier = !phrase ? 0 : title === phrase ? 3 : title.includes(phrase) ? 2 :
      titleTerms === terms.length ? 1 : 0;
    return [{ product, tier, titleTerms }];
  });
  const filtered = searched.filter(({ product }) =>
    (query.category === undefined || product.category === query.category) &&
    (minCents === undefined || product.priceCents >= minCents) &&
    (maxCents === undefined || product.priceCents <= maxCents) &&
    (query.rating === undefined || query.rating === 0 ||
      (product.rating !== null && product.rating >= query.rating)));

  filtered.sort((a, b) => {
    switch (query.sort) {
      case "price-asc": return a.product.priceCents - b.product.priceCents || compareTitle(a.product, b.product);
      case "price-desc": return b.product.priceCents - a.product.priceCents || compareTitle(a.product, b.product);
      case "rating-desc": return compareRating(a.product, b.product);
      case "name-asc": return compareTitle(a.product, b.product);
      case "relevance": return phrase
        ? b.tier - a.tier || b.titleTerms - a.titleTerms || compareTitle(a.product, b.product)
        : compareText(a.product.id, b.product.id);
    }
  });
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const requestedPage = Number.isFinite(query.page) ? Math.max(1, Math.floor(query.page)) : 1;
  const page = total === 0 ? 1 : Math.min(requestedPage, totalPages);
  return {
    products: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ product }) => product),
    total, page, limit: PAGE_SIZE, totalPages,
  };
}

export function findProductBySlug(catalog: readonly Product[], slug: string): Product | null {
  return catalog.find((product) => product.slug === slug) ?? null;
}

export function selectRelatedProducts(catalog: readonly Product[], product: Product, limit = 4): readonly Product[] {
  const count = typeof limit === "number" && Number.isFinite(limit)
    ? Math.min(8, Math.max(0, Math.floor(limit))) : 4;
  if (count === 0) return [];
  return catalog.filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .sort(compareRating).slice(0, count);
}
