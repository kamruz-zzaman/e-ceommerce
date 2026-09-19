import type { ProductSuggestion } from "../types/product";

export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 100;
export const SUGGESTION_LIMIT = 5;

export interface ProductSuggestionResponse {
  readonly query: string;
  readonly results: readonly ProductSuggestion[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProductSuggestion(value: unknown): value is ProductSuggestion {
  return (
    isRecord(value) &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.priceCents === "number" &&
    isRecord(value.image)
  );
}

//  Defends the client against a malformed/unexpected response shape; never throws.
export function parseProductSuggestionResponse(value: unknown): ProductSuggestionResponse {
  if (
    isRecord(value) &&
    typeof value.query === "string" &&
    Array.isArray(value.results) &&
    value.results.every(isProductSuggestion)
  ) {
    return { query: value.query, results: value.results };
  }
  return { query: "", results: [] };
}
