import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import type { Product } from "@/types/product";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const image = product.images[0];
  return (
    <article className="product-card">
      <div className="product-image">
        <Image src={image.src} alt={image.alt} fill loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 286px, (min-width: 1024px) calc((100vw - 136px) / 4), (min-width: 768px) calc((100vw - 96px) / 3), (min-width: 360px) calc((100vw - 48px) / 2), calc(100vw - 32px)" />
      </div>
      <h2>{product.title}</h2>
      <p className="product-category">{CATEGORIES.find((category) => category.id === product.category)?.label}</p>
      <p className="product-rating">{product.rating === null ? "Not yet rated" :
        `${product.rating.toFixed(1)} out of 5 · ${product.reviews.length} reviews`}</p>
      <p className="product-price">{usd.format(product.priceCents / 100)}</p>
      {product.stock === 0 ? <p className="product-stock">Out of stock</p> :
        product.stock <= 5 ? <p className="product-stock">{product.stock} in stock</p> : null}
    </article>
  );
}
