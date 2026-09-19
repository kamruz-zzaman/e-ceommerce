import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: readonly Product[] }) {
  return (
    <ul
      aria-label="Products"
      className="grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product, index) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} eager={index === 0} />
        </li>
      ))}
    </ul>
  );
}
