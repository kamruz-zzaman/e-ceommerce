import type { CategoryId } from "../lib/categories";

export interface ProductImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** Fictional assessment fixture, not an actual customer endorsement. */
export interface Review {
  readonly id: string;
  readonly authorName: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly body: string;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: CategoryId;
  /** USD minor units; positive safe integer. */
  readonly priceCents: number;
  /** Mean review rating rounded to one decimal; null when there are no reviews. */
  readonly rating: number | null;
  readonly reviews: readonly Review[];
  readonly stock: number;
  /** Non-empty and unique by src, checked before writing and on every build. */
  readonly images: readonly [ProductImage, ...ProductImage[]];
}
