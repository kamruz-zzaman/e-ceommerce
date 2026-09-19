import { expect, it } from "vitest";
import { parseProductSuggestionResponse } from "./product-suggestions";

const validSuggestion = {
  slug: "backpack-12-l",
  title: "Day Backpack — 12 L",
  category: "bags",
  priceCents: 2600,
  image: { src: "/images/products/backpack.jpg", alt: "", width: 800, height: 800 },
};

it("passes through a well-formed response unchanged", () => {
  const response = { query: "backpack", results: [validSuggestion] };
  expect(parseProductSuggestionResponse(response)).toEqual(response);
});

it("accepts an empty results array as valid", () => {
  const response = { query: "zzz", results: [] };
  expect(parseProductSuggestionResponse(response)).toEqual(response);
});

it("falls back to empty results for non-object input", () => {
  for (const value of [null, undefined, "oops", 42, ["array"]]) {
    expect(parseProductSuggestionResponse(value)).toEqual({ query: "", results: [] });
  }
});

it("falls back to empty results when query is missing or the wrong type", () => {
  expect(parseProductSuggestionResponse({ results: [] })).toEqual({ query: "", results: [] });
  expect(parseProductSuggestionResponse({ query: 7, results: [] })).toEqual({ query: "", results: [] });
});

it("falls back to empty results when results is not an array", () => {
  expect(parseProductSuggestionResponse({ query: "bag", results: "nope" })).toEqual({
    query: "",
    results: [],
  });
});

it("falls back to empty results when a suggestion item is missing a required field", () => {
  const withoutImage = {
    slug: validSuggestion.slug,
    title: validSuggestion.title,
    category: validSuggestion.category,
    priceCents: validSuggestion.priceCents,
  };
  const response = { query: "bag", results: [withoutImage] };
  expect(parseProductSuggestionResponse(response)).toEqual({ query: "", results: [] });
});

it("falls back to empty results when a suggestion field has the wrong type", () => {
  const response = { query: "bag", results: [{ ...validSuggestion, priceCents: "2600" }] };
  expect(parseProductSuggestionResponse(response)).toEqual({ query: "", results: [] });
});
