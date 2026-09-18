import { expect, it, vi } from "vitest";
// Only bypass the Next.js import marker in this Node integration test.
vi.mock("server-only", () => ({}));
import { normalizeProductQuery } from "../lib/product-query";
import { getProductBySlug, getProducts, getRelatedProducts } from "./product-service";

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
