import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  eager = false,
  headingLevel: Heading = "h2",
}: {
  product: Product;
  eager?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const image = product.images[0];
  return (
    <article className="min-w-0">
      <Link
        href={`/products/${product.slug}`}
        className="group block"
        aria-labelledby={`title-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading={eager ? "eager" : "lazy"}
            className="object-contain transition-transform duration-200 group-hover:scale-105"
            sizes="(min-width: 1280px) 286px, (min-width: 1024px) calc((100vw - 136px) / 4), (min-width: 768px) calc((100vw - 96px) / 3), (min-width: 360px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
          />
        </div>
        <Heading
          id={`title-${product.id}`}
          className="mt-3 text-[0.9375rem] leading-snug font-semibold wrap-anywhere group-hover:underline group-hover:underline-offset-[3px]"
        >
          {product.title}
        </Heading>
      </Link>
      <p className="mt-1 text-[0.8125rem] text-muted">
        {CATEGORIES.find((category) => category.id === product.category)?.label}
      </p>
      <p className="mt-1 text-[0.8125rem] text-muted">
        {product.rating === null
          ? "Not yet rated"
          : `${product.rating.toFixed(1)} out of 5 · ${product.reviews.length} reviews`}
      </p>
      <p className="mt-2 text-base font-semibold">
        {formatPrice(product.priceCents)}
      </p>
      {product.stock === 0 ? (
        <p className="mt-1 text-[0.8125rem] text-muted">Out of stock</p>
      ) : product.stock <= 5 ? (
        <p className="mt-1 text-[0.8125rem] text-muted">
          {product.stock} in stock
        </p>
      ) : null}
    </article>
  );
}
