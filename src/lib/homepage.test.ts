import { describe, expect, it, vi } from "vitest";
// Only bypass the Next.js import marker in this Node integration test.
vi.mock("server-only", () => ({}));
import { getHomepageShowcase } from "./homepage";
import { CATEGORIES } from "./categories";

describe("getHomepageShowcase", () => {
  it("is deterministic across calls", () => {
    expect(getHomepageShowcase()).toEqual(getHomepageShowcase());
  });

  it("returns one entry per category", () => {
    const { categories } = getHomepageShowcase();
    expect(categories.map((entry) => entry.id)).toEqual(CATEGORIES.map((category) => category.id));
  });

  it("returns up to four featured products", () => {
    const { featured } = getHomepageShowcase();
    expect(featured.length).toBeLessThanOrEqual(4);
  });

  it("never repeats a product across hero, category tiles, and featured", () => {
    const { hero, categories, featured } = getHomepageShowcase();
    const ids = [hero?.id, ...categories.map((entry) => entry.product.id), ...featured.map((product) => product.id)].filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
