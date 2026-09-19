import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export function Hero({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <section className="grid gap-8 py-10 md:py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20">
      <div>
        <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
          Everyday goods, chosen with care.
        </h1>
        <p className="mt-4 max-w-prose text-muted">
          A focused catalog of bags, kitchen, office, lighting, and outdoor
          essentials — browse the full collection or shop by category below.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Browse products
        </Link>
      </div>
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.title}
        className="relative block aspect-4/3 overflow-hidden bg-surface lg:aspect-square"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
      </Link>
    </section>
  );
}
