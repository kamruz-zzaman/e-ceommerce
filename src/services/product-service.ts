import "server-only";

import { products } from "../data/products";
import { normalizeProductQuery } from "../lib/product-query";
import type { Product, ProductSuggestion } from "../types/product";
import type { ProductQuery } from "../types/product-query";
import { findProductBySlug, selectProducts, selectRelatedProducts } from "./product-selection";
import type { ProductListResult } from "./product-selection";

export type { ProductListResult } from "./product-selection";

const SUGGESTION_LIMIT = 5;

export function getProducts(query: ProductQuery): ProductListResult {
  return selectProducts(products, query);
}


export function getProductSuggestions(q: string): readonly ProductSuggestion[] {
  const query = normalizeProductQuery({ q, sort: "relevance" });
  return selectProducts(products, query).products.slice(0, SUGGESTION_LIMIT)
    .map(({ slug, title, category, priceCents, images }) => ({ slug, title, category, priceCents, image: images[0] }));
}

export function getProductBySlug(slug: string): Product | null {
  return findProductBySlug(products, slug);
}

export function getRelatedProducts(product: Product, limit?: number): readonly Product[] {
  return selectRelatedProducts(products, product, limit);
}
