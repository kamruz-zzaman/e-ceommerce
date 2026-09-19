import { expect, it, vi } from "vitest";
// Only bypass the Next.js import marker in this Node integration test.
vi.mock("server-only", () => ({}));
import { normalizeProductQuery } from "../lib/product-query";
import { getProductBySlug, getProductSuggestions, getProducts, getRelatedProducts } from "./product-service";

it("lists the validated real catalog through the server service", () => {
  expect(getProducts(normalizeProductQuery({}))).toMatchObject({ total: 520, page: 1, limit: 20, totalPages: 26 });
  expect(getProducts(normalizeProductQuery({})).products).toHaveLength(20);
});
it("resolves a listed product and returns related products", () => {
  const product = getProducts(normalizeProductQuery({})).products[0];
  expect(getProductBySlug(product.slug)).toBe(product);
  const related = getRelatedProducts(product);
  expect(related).toHaveLength(4);
  expect(related.every((item) => item.category === product.category && item.id !== product.id)).toBe(true);
  expect(getProductBySlug("not-a-real-product")).toBeNull();
});
it("combines real category filtering and overflow clamping", () => {
  const result = getProducts(normalizeProductQuery({ category: "office", page: "999" }));
  expect(result).toMatchObject({ total: 80, page: 4, totalPages: 4 });
  expect(result.products.every((product) => product.category === "office")).toBe(true);
});

it("returns suggestions using the exact same relevance search as the listing", () => {
  const suggestions = getProductSuggestions("backpack");
  const listing = getProducts(normalizeProductQuery({ q: "backpack", sort: "relevance" }));
  expect(suggestions.map((item) => item.slug)).toEqual(listing.products.slice(0, 5).map((product) => product.slug));
});
it("caps suggestions at 5 regardless of how many products match", () => {
  expect(getProductSuggestions("bag").length).toBeLessThanOrEqual(5);
  expect(getProductSuggestions("bag").length).toBe(5); // "bag" matches far more than 5 real products
});
it("returns a minimal shape with no id/description/reviews/stock", () => {
  const [first] = getProductSuggestions("backpack");
  expect(first).toEqual({
    slug: expect.any(String), title: expect.any(String), category: expect.any(String),
    priceCents: expect.any(Number), image: expect.any(Object),
  });
  expect(Object.keys(first)).toEqual(["slug", "title", "category", "priceCents", "image"]);
});
it("is deterministic across repeated calls", () => {
  expect(getProductSuggestions("lamp")).toEqual(getProductSuggestions("lamp"));
});
it("returns nothing for a query matching no real product", () => {
  expect(getProductSuggestions("zzzznonexistentproductzzzz")).toEqual([]);
});
