import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

export function FeaturedProducts({
  products,
}: {
  products: readonly Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="featured-heading" className="py-10 md:py-14">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="featured-heading" className="text-xl font-semibold">
          Featured products
        </h2>
        <Link
          href="/products"
          className="text-sm text-accent underline underline-offset-[3px] hover:text-accent-hover"
        >
          View all products
        </Link>
      </div>
      <ul
        className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:grid-cols-4"
        aria-label="Featured products"
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
