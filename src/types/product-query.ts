import type { CategoryId } from "../lib/categories";

export type ProductSort =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

/** Normalized discovery input; parsing belongs at the route boundary. */
export interface ProductQuery {
  readonly q: string;
  readonly category?: CategoryId;
  /** URL price bounds are USD major units, unlike Product.priceCents. */
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly rating?: number;
  readonly sort: ProductSort;
  readonly page: number;
}
