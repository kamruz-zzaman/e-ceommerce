import type { ProductImage } from "./product";

export interface CartSnapshot {
  readonly productId: string;
  readonly slug: string;
  readonly title: string;
  readonly priceCents: number;
  readonly image: ProductImage;
  readonly stock: number;
}

export interface CartItem extends CartSnapshot {
  readonly quantity: number;
}
