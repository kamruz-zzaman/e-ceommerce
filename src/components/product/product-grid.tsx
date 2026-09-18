import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: readonly Product[] }) {
  return <ul className="product-grid" aria-label="Products">
    {products.map((product, index) => <li key={product.id}><ProductCard product={product} eager={index === 0} /></li>)}
  </ul>;
}
