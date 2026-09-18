import type { Metadata } from "next";
import { CATEGORIES } from "./categories";
import type { Product } from "../types/product";

export function parseSiteUrl(value: string | undefined): URL | undefined {
  if (value === undefined) return undefined;
  const message = "SITE_URL must be an absolute HTTP(S) origin without credentials, query, fragment, or subpath.";
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(message);
  }
  if (!/^https?:\/\/[^/?#\\@\s]+\/?$/.test(value) ||
      !["http:", "https:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error(message);
  }
  return url;
}

export function productMetadata(product: Product, siteUrl?: URL): Metadata {
  const image = product.images[0];
  const canonical = siteUrl ? new URL(`/products/${product.slug}`, siteUrl).href : undefined;
  return {
    title: product.title,
    description: product.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: product.title,
      description: product.description,
      siteName: "Future Studios BD",
      type: "website",
      ...(siteUrl ? {
        url: canonical,
        images: [{ url: new URL(image.src, siteUrl).href, width: image.width, height: image.height, alt: image.alt }],
      } : {}),
    },
  };
}

export function productJsonLd(product: Product, siteUrl?: URL) {
  if (!siteUrl) return undefined;
  const url = new URL(`/products/${product.slug}`, siteUrl).href;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    category: CATEGORIES.find((category) => category.id === product.category)?.label,
    image: new URL(product.images[0].src, siteUrl).href,
    url,
    offers: {
      "@type": "Offer",
      price: `${Math.floor(product.priceCents / 100)}.${String(product.priceCents % 100).padStart(2, "0")}`,
      priceCurrency: "USD",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url,
    },
    ...(product.rating !== null && product.reviews.length > 0 ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews.length,
      },
    } : {}),
  };
}

export function serializeJsonLd(value: NonNullable<ReturnType<typeof productJsonLd>>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
