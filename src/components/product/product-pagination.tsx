import Link from "next/link";
import { buildProductUrl, paginationPages } from "@/lib/product-url";
import type { ProductQuery } from "@/types/product-query";

export function ProductPagination({ query, page, totalPages }: { query: ProductQuery; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const url = (page: number) => buildProductUrl(query, { page }, { resetPage: false });
  return <nav className="product-pagination" aria-label="Product pages">
    {page > 1 ? <Link href={url(page - 1)}>Previous</Link> : <span aria-disabled="true">Previous</span>}
    <ol>
      {paginationPages(page, totalPages).map((number, index) => <li key={number === "gap" ? `gap-${index}` : number}>
        {number === "gap" ? <span aria-hidden="true">…</span> : number === page ?
          <span aria-current="page" aria-label={`Page ${number}`}>{number}</span> :
          <Link href={url(number)} aria-label={`Page ${number}`}>{number}</Link>}
      </li>)}
    </ol>
    {page < totalPages ? <Link href={url(page + 1)}>Next</Link> : <span aria-disabled="true">Next</span>}
  </nav>;
}
