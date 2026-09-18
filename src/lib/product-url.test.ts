import { describe, expect, it } from "vitest";
import { normalizeProductQuery } from "./product-query";
import { buildProductUrl, paginationPages } from "./product-url";

const active = normalizeProductQuery({ q: "desk lamp", category: "lighting", minPrice: "10.25", maxPrice: "80", rating: "4.25", sort: "price-desc", page: "3" });

describe("product URLs", () => {
  it("omits defaults", () => expect(buildProductUrl(normalizeProductQuery({}))).toBe("/products"));
  it("preserves unaffected fields and resets page on discovery changes", () => {
    expect(buildProductUrl(active, { category: "office" })).toBe("/products?q=desk+lamp&category=office&minPrice=10.25&maxPrice=80&rating=4.25&sort=price-desc");
  });
  it("removes explicitly cleared values without losing other filters", () => {
    expect(buildProductUrl(active, { q: undefined, minPrice: undefined, maxPrice: undefined, sort: "relevance" }))
      .toBe("/products?category=lighting&rating=4.25");
  });
  it("preserves fractional rating when applying unrelated filters", () => {
    expect(new URL(buildProductUrl(active, { maxPrice: "50" }), "https://example.test").searchParams.get("rating")).toBe("4.25");
  });
  it("preserves zero rating", () => expect(buildProductUrl(normalizeProductQuery({ rating: "0" }))).toBe("/products?rating=0"));
  it("replaces a custom rating only on explicit change", () => {
    expect(new URL(buildProductUrl(active, { rating: "3" }), "https://example.test").searchParams.get("rating")).toBe("3");
    expect(new URL(buildProductUrl(active, { rating: undefined }), "https://example.test").searchParams.has("rating")).toBe(false);
  });
  it("preserves all discovery values for pagination", () => {
    expect(buildProductUrl(active, { page: 4 }, { resetPage: false }))
      .toBe("/products?q=desk+lamp&category=lighting&minPrice=10.25&maxPrice=80&rating=4.25&sort=price-desc&page=4");
    expect(buildProductUrl(active, { page: 1 }, { resetPage: false })).not.toContain("page=");
  });
  it("encodes deterministically without mutating inputs", () => {
    const current = Object.freeze(active);
    const changes = Object.freeze({ q: "  café & desk?  ", minPrice: "90", maxPrice: "20" });
    const before = structuredClone({ current, changes });
    expect(buildProductUrl(current, changes)).toBe("/products?q=caf%C3%A9+%26+desk%3F&category=lighting&minPrice=20&maxPrice=90&rating=4.25&sort=price-desc");
    expect({ current, changes }).toEqual(before);
  });
  it("clears all values to the default destination", () => {
    expect(buildProductUrl(active, { q: undefined, category: undefined, minPrice: undefined, maxPrice: undefined, rating: undefined, sort: undefined })).toBe("/products");
  });
  it("normalizes empty values and ignores unsupported keys", () => {
    expect(buildProductUrl(active, { q: " ", category: "", rating: "bad", sort: "bad", minPrice: "", maxPrice: "" })).toBe("/products");
    const extra = { ...active, unexpected: "ignored" };
    expect(buildProductUrl(extra)).not.toContain("unexpected");
  });
});

describe("pagination window", () => {
  it.each([
    [1, 0, []], [1, 1, [1]], [1, 5, [1, 2, 3, 4, 5]],
    [1, 26, [1, 2, "gap", 26]], [13, 26, [1, "gap", 12, 13, 14, "gap", 26]],
    [26, 26, [1, "gap", 25, 26]],
  ] as const)("shows a bounded window for page %i of %i", (page, total, expected) => {
    expect(paginationPages(page, total)).toEqual(expected);
  });
});
