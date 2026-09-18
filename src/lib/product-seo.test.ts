import { describe, expect, it } from "vitest";
import type { Product } from "../types/product";
import { parseSiteUrl, productJsonLd, productMetadata, serializeJsonLd } from "./product-seo";

const product: Product = {
  id: "test-product", slug: "desk-notebook", title: "Desk Notebook", description: "A lined notebook.",
  category: "office", priceCents: 1099, stock: 3, rating: 4.5,
  images: [{ src: "/images/products/notebook.jpg", alt: "Open lined notebook", width: 800, height: 600 }],
  reviews: [
    { id: "r1", authorName: "Alex", rating: 4, body: "Lines are easy to follow." },
    { id: "r2", authorName: "Sam", rating: 5, body: "Enough space for notes." },
  ],
};
const origin = new URL("https://example.com");

describe("SITE_URL", () => {
  it("allows omitted configuration", () => expect(parseSiteUrl(undefined)).toBeUndefined());
  it.each(["https://example.com", "https://example.com/", "http://example.com:8080"])("accepts an origin: %s", (value) => {
    expect(parseSiteUrl(value)?.origin).toBe(new URL(value).origin);
  });
  it.each(["", "example.com", "/relative", "ftp://example.com", "https://user:pass@example.com", "https://@example.com", "https://example.com\\", "https://example.com/shop", "https://example.com/?q=x", "https://example.com/#part", "https://example.com?", "https://example.com#", " https://example.com "])("rejects invalid configuration: %s", (value) => {
    expect(() => parseSiteUrl(value)).toThrow("SITE_URL must be an absolute HTTP(S) origin");
  });
});

describe("product metadata", () => {
  it("maps product content, canonical and absolute image with dimensions", () => {
    expect(productMetadata(product, origin)).toEqual({
      title: product.title, description: product.description,
      alternates: { canonical: "https://example.com/products/desk-notebook" },
      openGraph: {
        title: product.title, description: product.description, siteName: "Future Studios BD", type: "website",
        url: "https://example.com/products/desk-notebook",
        images: [{ url: "https://example.com/images/products/notebook.jpg", width: 800, height: 600, alt: "Open lined notebook" }],
      },
    });
  });
  it("omits origin-dependent fields when configuration is absent", () => {
    const metadata = productMetadata(product);
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.openGraph).toEqual({ title: product.title, description: product.description, siteName: "Future Studios BD", type: "website" });
  });
});

describe("Product JSON-LD", () => {
  it("omits structured data without an origin", () => expect(productJsonLd(product)).toBeUndefined());
  it("describes exactly the fixture with no unsupported fields or individual reviews", () => {
    expect(productJsonLd(product, origin)).toEqual({
      "@context": "https://schema.org", "@type": "Product", name: product.title, description: product.description,
      category: "Office & Stationery", image: "https://example.com/images/products/notebook.jpg",
      url: "https://example.com/products/desk-notebook",
      offers: { "@type": "Offer", price: "10.99", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://example.com/products/desk-notebook" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.5, reviewCount: 2 },
    });
  });
  it.each([[1, "0.01"], [300, "3.00"], [10005, "100.05"], [Number.MAX_SAFE_INTEGER, "90071992547409.91"]])("converts %i cents exactly", (priceCents, price) => {
    expect(productJsonLd({ ...product, priceCents }, origin)?.offers.price).toBe(price);
  });
  it("maps zero stock to OutOfStock", () => {
    expect(productJsonLd({ ...product, stock: 0 }, origin)?.offers.availability).toBe("https://schema.org/OutOfStock");
  });
  it("omits an aggregate for an unrated product", () => {
    expect(productJsonLd({ ...product, rating: null, reviews: [] }, origin)).not.toHaveProperty("aggregateRating");
  });
  it("requires actual reviews for an aggregate", () => {
    expect(productJsonLd({ ...product, reviews: [] }, origin)).not.toHaveProperty("aggregateRating");
  });
  it("escapes script-closing text while preserving parsed data", () => {
    const data = productJsonLd({ ...product, title: "</script><script>alert('x')</script>", description: "<b>Notes</b>" }, origin)!;
    const serialized = serializeJsonLd(data);
    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
    expect(JSON.parse(serialized)).toEqual(data);
  });
});
