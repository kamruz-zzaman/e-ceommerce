import type { Metadata } from "next";
import { DiscoveryControls } from "@/components/product/discovery-controls";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductPagination } from "@/components/product/product-pagination";
import { normalizeProductQuery } from "@/lib/product-query";
import { buildProductUrl } from "@/lib/product-url";
import { getProducts } from "@/services/product-service";
import { TextActionLink } from "@/components/ui/text-action";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const query = normalizeProductQuery(await searchParams);
  const result = getProducts(query);
  const effectiveQuery = { ...query, page: result.page };
  const active =
    buildProductUrl(query, {}, { resetPage: false }) !== "/products";
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-8 pb-14 md:py-10 md:pb-18"
    >
      <h1>Products</h1>
      <DiscoveryControls query={effectiveQuery} total={result.total} />
      <p className="wrap-anywhere mb-5 min-h-11 flex items-center text-sm text-muted">
        {result.total} {result.total === 1 ? "product" : "products"}
        {query.q && <> for “{query.q}”</>}
      </p>
      {result.total > 0 ? (
        <ProductGrid products={result.products} />
      ) : (
        <section
          aria-labelledby="empty-heading"
          className="border-t border-border py-12 pb-16"
        >
          <h2 id="empty-heading" className="text-xl font-semibold">
            No products matched
          </h2>
          <p className="mt-2 text-muted">
            Try another search or clear your filters.
          </p>
          {active && (
            <TextActionLink href="/products" className="mt-3">
              Clear all
            </TextActionLink>
          )}
        </section>
      )}
      <ProductPagination
        query={effectiveQuery}
        page={result.page}
        totalPages={result.totalPages}
      />
    </main>
  );
}
