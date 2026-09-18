import { CATEGORIES } from "./categories";
import type { CategoryId } from "./categories";
import type { ProductQuery, ProductSort } from "../types/product-query";

export type RawProductSearchParams = Readonly<
  Record<string, string | readonly string[] | undefined>
>;

function firstValid<T>(
  value: string | readonly string[] | undefined,
  parse: (value: string) => T | undefined,
): T | undefined {
  for (const candidate of typeof value === "string" ? [value] : value ?? []) {
    const parsed = parse(candidate.trim());
    if (parsed !== undefined) return parsed;
  }
}

function decimal(value: string): number | undefined {
  if (!/^\d+(?:\.\d+)?$/.test(value)) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function price(value: string): number | undefined {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return undefined;
  const [whole, fraction = ""] = value.split(".");
  const cents = BigInt(whole) * BigInt(100) + BigInt(fraction.padEnd(2, "0"));
  // Require a round trip so USD numbers cannot silently lose a cent.
  const amount = Number(cents) / 100;
  return cents <= BigInt(Number.MAX_SAFE_INTEGER) &&
    BigInt(Math.round(amount * 100)) === cents ? amount : undefined;
}

export function normalizeProductQuery(params: RawProductSearchParams): ProductQuery {
  let minPrice = firstValid(params.minPrice, price);
  let maxPrice = firstValid(params.maxPrice, price);
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }
  return {
    q: firstValid(params.q, (value) => value.replace(/\s+/g, " ")) ?? "",
    category: firstValid<CategoryId>(params.category, (value) =>
      CATEGORIES.find((category) => category.id === value)?.id),
    minPrice,
    maxPrice,
    rating: firstValid(params.rating, (value) => {
      const number = decimal(value);
      return number !== undefined && number <= 5 ? number : undefined;
    }),
    sort: firstValid<ProductSort>(params.sort, (value) => {
      switch (value) {
        case "relevance": case "price-asc": case "price-desc":
        case "rating-desc": case "name-asc": return value;
        default: return undefined;
      }
    }) ?? "relevance",
    page: firstValid(params.page, (value) => {
      const number = decimal(value);
      return number !== undefined && number > 0 && number <= Number.MAX_SAFE_INTEGER
        ? Math.max(1, Math.floor(number)) : undefined;
    }) ?? 1,
  };
}
