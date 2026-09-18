import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryControls } from "@/components/product/discovery-controls";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductPagination } from "@/components/product/product-pagination";
import { normalizeProductQuery } from "@/lib/product-query";
import { buildProductUrl } from "@/lib/product-url";
import { getProducts } from "@/services/product-service";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const query = normalizeProductQuery(await searchParams);
  const result = getProducts(query);
  const effectiveQuery = { ...query, page: result.page };
  const active = buildProductUrl(query, {}, { resetPage: false }) !== "/products";
  return (
    <main id="main-content" tabIndex={-1} className="site-container page-content products-page">
      <h1>Products</h1>
      <DiscoveryControls query={effectiveQuery} total={result.total} />
      <div className="result-summary">
        <p>{result.total} {result.total === 1 ? "product" : "products"}{query.q && <> for “{query.q}”</>}</p>
        {active && <Link href="/products" className="text-action">Clear all</Link>}
      </div>
      {result.total > 0 ? <ProductGrid products={result.products} /> :
        <section className="empty-products" aria-labelledby="empty-heading">
          <h2 id="empty-heading">No products matched</h2>
          <p>Try another search or clear your filters.</p>
          {!active && <Link href="/products" className="text-action">Clear all</Link>}
        </section>}
      <ProductPagination query={effectiveQuery} page={result.page} totalPages={result.totalPages} />
    </main>
  );
}
