import "server-only";

import { products } from "../data/products";
import type { Product } from "../types/product";
import type { ProductQuery } from "../types/product-query";
import { findProductBySlug, selectProducts, selectRelatedProducts } from "./product-selection";
import type { ProductListResult } from "./product-selection";

export type { ProductListResult } from "./product-selection";

export function getProducts(query: ProductQuery): ProductListResult {
  return selectProducts(products, query);
}

export function getProductBySlug(slug: string): Product | null {
  return findProductBySlug(products, slug);
}

export function getRelatedProducts(product: Product, limit?: number): readonly Product[] {
  return selectRelatedProducts(products, product, limit);
}
