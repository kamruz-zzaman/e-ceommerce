import { normalizeProductQuery } from "./product-query";
import type { ProductQuery } from "../types/product-query";

const keys = ["q", "category", "minPrice", "maxPrice", "rating", "sort", "page"] as const;
type QueryChanges = Partial<Record<(typeof keys)[number], string | number | undefined>>;

/** Undefined explicitly removes a value; omitted keys preserve committed state. */
export function buildProductUrl(
  current: ProductQuery,
  changes: QueryChanges = {},
  { resetPage = true }: { resetPage?: boolean } = {},
): string {
  const merged = { ...current, ...changes, ...(resetPage ? { page: 1 } : {}) };
  const raw = Object.fromEntries(keys.map((key) => [key, merged[key] === undefined ? undefined : String(merged[key])]));
  const query = normalizeProductQuery(raw);
  const params = new URLSearchParams();
  for (const key of keys) {
    const value = query[key];
    if (value === undefined || value === "" || (key === "sort" && value === "relevance") || (key === "page" && value === 1)) continue;
    params.set(key, String(value));
  }
  return `/products${params.size ? `?${params}` : ""}`;
}

/** Only the navigation window; product page counts come from the service. */
export function paginationPages(page: number, totalPages: number): readonly (number | "gap")[] {
  const visible = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((number) => totalPages <= 7 || number === 1 || number === totalPages || Math.abs(number - page) <= 1);
  return visible.flatMap((number, i): (number | "gap")[] =>
    i > 0 && number - visible[i - 1] > 1 ? ["gap", number] : [number]);
}
