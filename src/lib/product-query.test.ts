import { describe, expect, it } from "vitest";
import { normalizeProductQuery } from "./product-query";

const defaults = { q: "", category: undefined, minPrice: undefined, maxPrice: undefined,
  rating: undefined, sort: "relevance", page: 1 };

describe("normalizeProductQuery", () => {
  it("supplies defaults and ignores unsupported parameters", () => {
    expect(normalizeProductQuery({ limit: "100", brand: "test" })).toEqual(defaults);
  });
  it("normalizes valid values and whitespace", () => {
    expect(normalizeProductQuery({ q: "  Green\t desk  ", category: "office", minPrice: "0",
      maxPrice: "12.30", rating: "4.5", sort: "price-desc", page: "3.8" }))
      .toEqual({ q: "Green desk", category: "office", minPrice: 0, maxPrice: 12.3,
        rating: 4.5, sort: "price-desc", page: 3 });
  });
  it.each(["", " ", "-1", "NaN", "Infinity", "1e2", "0x10", "12x", "+2"])("rejects invalid numeric input %j", (value) => {
    expect(normalizeProductQuery({ page: value, minPrice: value, maxPrice: value, rating: value })).toEqual(defaults);
  });
  it.each([["0", 1], ["0.5", 1], ["2.9", 2], ["9007199254740992", 1]])("normalizes page %s", (input, expected) => {
    expect(normalizeProductQuery({ page: input }).page).toBe(expected);
  });
  it("selects the first valid repeated value before fallbacks", () => {
    const input = Object.freeze({ page: Object.freeze(["bad", "-1", "3.9", "4"]),
      category: ["unknown", "home", "bags"], sort: ["bad", "name-asc", "price-asc"],
      minPrice: ["-1", "1.234", "1.25", "2"], maxPrice: ["bad", "5"],
      rating: ["6", "0", "4"], q: ["  ", "ignored"] });
    const before = structuredClone(input);
    expect(normalizeProductQuery(input)).toEqual({ q: "", category: "home", sort: "name-asc",
      minPrice: 1.25, maxPrice: 5, rating: 0, page: 3 });
    expect(input).toEqual(before);
  });
  it("swaps reversed bounds", () => {
    expect(normalizeProductQuery({ minPrice: "10", maxPrice: "2" })).toMatchObject({ minPrice: 2, maxPrice: 10 });
  });
  it.each(["1.001", "9007199254740992", "999999999999999999999999999999999999999"])("rejects unsafe/sub-cent price %s", (value) => {
    expect(normalizeProductQuery({ minPrice: value }).minPrice).toBeUndefined();
  });
  it.each(["0", "5", "4.25"])("accepts rating %s", (value) => {
    expect(normalizeProductQuery({ rating: value }).rating).toBe(Number(value));
  });
  it.each(["-0.1", "5.01"])("ignores out-of-range rating %s", (value) => {
    expect(normalizeProductQuery({ rating: value }).rating).toBeUndefined();
  });
  it("ignores unknown category and sort", () => {
    expect(normalizeProductQuery({ category: "HOME", sort: "popular" })).toEqual(defaults);
  });
});
