import { describe, expect, it } from "vitest";
import type { Product } from "../types/product";
import type { ProductQuery } from "../types/product-query";
import { normalizeProductQuery } from "../lib/product-query";
import { findProductBySlug, selectProducts, selectRelatedProducts } from "./product-selection";

function product(id: string, fields: Partial<Product> = {}): Product {
  return { id, slug: id, title: id, description: "Useful everyday item", category: "home",
    priceCents: 1000, rating: null, reviews: [], stock: 5,
    images: [{ src: "/test.jpg", alt: "Test item", width: 100, height: 100 }], ...fields };
}
const query = (fields: Partial<ProductQuery> = {}): ProductQuery => ({ ...normalizeProductQuery({}), ...fields });
const ids = (products: readonly Product[]) => products.map((product) => product.id);
const list = (products: readonly Product[], fields: Partial<ProductQuery> = {}) =>
  ids(selectProducts(products, query(fields)).products);

describe("search and relevance", () => {
  it("orders exact, phrase, all-title-terms, then title-term count matches", () => {
    const products = [
      product("none", { title: "Accessory", description: "red desk lamp" }),
      product("one", { title: "Red shade", description: "desk lamp" }),
      product("two", { title: "Desk red shade", description: "lamp" }),
      product("all", { title: "Lamp desk red" }),
      product("phrase", { title: "Small red desk lamp" }),
      product("exact", { title: " RED  desk\tLAMP " }),
      product("missing", { title: "Red desk", description: "No matching final term" }),
    ];
    expect(list(products, { q: " RED\t desk   lamp " })).toEqual(["exact", "phrase", "all", "two", "one", "none"]);
  });
  it("matches description and category display labels", () => {
    const products = [product("a", { title: "Notebook", category: "office", description: "Recycled paper" }), product("b")];
    expect(list(products, { q: "recycled stationery" })).toEqual(["a"]);
    expect(list(products, { q: "notebook missing" })).toEqual([]);
  });
  it("breaks relevance ties by normalized title then ID", () => {
    const products = [product("z", { title: "Beta", description: "desk" }),
      product("b", { title: "Alpha", description: "desk" }), product("a", { title: "ALPHA", description: "desk" })];
    expect(list(products, { q: "desk" })).toEqual(["a", "b", "z"]);
  });
  it("orders empty searches by stable ID", () => {
    expect(list([product("b"), product("a")], { q: "  " })).toEqual(["a", "b"]);
  });
});

const filtered = [product("low", { priceCents: 999, rating: 3 }),
  product("boundary", { priceCents: 1001, rating: 4 }),
  product("high", { priceCents: 2000, rating: 5, category: "office" }), product("unrated", { priceCents: 1001 })];

describe("filters", () => {
  it("filters exact categories", () => expect(list(filtered, { category: "office" })).toEqual(["high"]));
  it("includes the minimum price boundary", () => expect(list(filtered, { minPrice: 10.01 })).toEqual(["boundary", "high", "unrated"]));
  it("includes the maximum price boundary", () => expect(list(filtered, { maxPrice: 10.01 })).toEqual(["boundary", "low", "unrated"]));
  it("includes the minimum rating and excludes unrated above zero", () => expect(list(filtered, { rating: 4 })).toEqual(["boundary", "high"]));
  it("retains unrated products with zero or absent rating", () => {
    expect(list(filtered, { rating: 0 })).toEqual(list(filtered));
    expect(list(filtered)).toContain("unrated");
  });
  it("combines all filters with AND", () => expect(list(filtered, { q: "boundary", category: "home", minPrice: 10.01, maxPrice: 10.01, rating: 4 })).toEqual(["boundary"]));
});

describe("sorts", () => {
  const products = [product("z", { title: "Beta", rating: null, priceCents: 2000 }),
    product("b", { title: "Alpha", rating: 4 }), product("a", { title: "ALPHA", rating: 4 }),
    product("c", { title: "Gamma", rating: 5, priceCents: 3000 })];
  it.each([
    ["relevance", ["a", "b", "c", "z"]], ["price-asc", ["a", "b", "z", "c"]],
    ["price-desc", ["c", "z", "a", "b"]], ["rating-desc", ["c", "a", "b", "z"]],
    ["name-asc", ["a", "b", "z", "c"]],
  ] as const)("sorts %s with explicit ties", (sort, expected) => {
    expect(list(products, { sort })).toEqual(expected);
    expect(list([...products].reverse(), { sort })).toEqual(expected);
  });
});

describe("pagination and immutability", () => {
  const products = Array.from({ length: 45 }, (_, i) => product(String(i).padStart(2, "0")));
  it.each([[1, 20, "00"], [2, 20, "20"], [3, 5, "40"], [99, 5, "40"]])("paginates request %i", (page, length, first) => {
    const result = selectProducts(products, query({ page }));
    expect(result).toMatchObject({ total: 45, totalPages: 3, limit: 20, page: Math.min(page, 3) });
    expect(result.products).toHaveLength(length);
    expect(result.products[0].id).toBe(first);
  });
  it("returns the empty result contract", () => {
    expect(selectProducts(products, query({ q: "absent", page: 99 }))).toEqual({ products: [], total: 0, totalPages: 0, page: 1, limit: 20 });
  });
  it("filters and sorts before slicing", () => {
    expect(list(products, { q: "4", sort: "name-asc", page: 2 })).toEqual(["04", "14", "24", "34", "40", "41", "42", "43", "44"]);
  });
  it("does not mutate products or query", () => {
    const source = Object.freeze([Object.freeze(product("b")), Object.freeze(product("a"))]);
    const input = Object.freeze(query({ sort: "name-asc" }));
    const before = structuredClone({ source, input });
    selectProducts(source, input);
    selectRelatedProducts(source, source[0]);
    expect({ source, input }).toEqual(before);
  });
});

describe("detail lookup", () => {
  const current = product("exact-slug");
  it("returns the exact product", () => expect(findProductBySlug([current], "exact-slug")).toBe(current));
  it.each(["missing", "EXACT-SLUG", " exact-slug "])("returns null for %s", (slug) => expect(findProductBySlug([current], slug)).toBeNull());
});

describe("related products", () => {
  const current = product("current");
  const products = [current, product("other", { category: "bags", rating: 5 }),
    product("unrated"), ...Array.from({ length: 10 }, (_, i) => product(`rated-${i}`, { rating: i < 2 ? 5 : 4, title: i < 2 ? "Same" : `Title ${i}` }))];
  it("excludes current and other categories, orders rated first with title/ID ties", () => {
    const result = selectRelatedProducts(products, current, 8);
    expect(ids(result)).toEqual(["rated-0", "rated-1", "rated-2", "rated-3", "rated-4", "rated-5", "rated-6", "rated-7"]);
    expect(selectRelatedProducts([...products].reverse(), current, 8)).toEqual(result);
    expect(ids(selectRelatedProducts([current, product("z", { rating: null }), product("a", { rating: 1 })], current))).toEqual(["a", "z"]);
  });
  it("defaults to four", () => expect(selectRelatedProducts(products, current)).toHaveLength(4));
  it.each([[100, 8], [2.9, 2], [0.5, 0], [0, 0], [-1, 0], [NaN, 4], [Infinity, 4], [-Infinity, 4]])("handles limit %s", (limit, expected) => {
    expect(selectRelatedProducts(products, current, limit)).toHaveLength(expected);
  });
  it("handles invalid JavaScript caller values", () => {
    // @ts-expect-error Exercise a runtime caller outside the TypeScript contract.
    expect(selectRelatedProducts(products, current, "2")).toHaveLength(4);
  });
});
