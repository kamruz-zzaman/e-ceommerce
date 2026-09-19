import Link from "next/link";
import Image from "next/image";
import type { CategoryShowcase } from "@/lib/homepage";

export function CategoryGrid({
  categories,
}: {
  categories: readonly CategoryShowcase[];
}) {
  if (categories.length === 0) return null;
  return (
    <section
      aria-labelledby="shop-by-category-heading"
      className="py-10 md:py-14"
    >
      <h2 id="shop-by-category-heading" className="text-xl font-semibold">
        Shop by category
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ id, label, product }) => (
          <li key={id}>
            <Link href={`/products?category=${id}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={product.images[0].src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-semibold">{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
