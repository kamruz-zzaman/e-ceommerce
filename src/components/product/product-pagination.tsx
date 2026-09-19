import Link from "next/link";
import { buildProductUrl, paginationPages } from "@/lib/product-url";
import type { ProductQuery } from "@/types/product-query";

const cell =
  "inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm";

export function ProductPagination({
  query,
  page,
  totalPages,
}: {
  query: ProductQuery;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const url = (page: number) =>
    buildProductUrl(query, { page }, { resetPage: false });
  return (
    <nav
      aria-label="Product pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={url(page - 1)}
          className={`${cell} text-accent hover:underline hover:underline-offset-4`}
        >
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={`${cell} text-muted`}>
          Previous
        </span>
      )}
      <ol className="flex flex-wrap list-none justify-center gap-1 p-0 m-0">
        {paginationPages(page, totalPages).map((number, index) => (
          <li key={number === "gap" ? `gap-${index}` : number}>
            {number === "gap" ? (
              <span aria-hidden="true" className={cell}>
                …
              </span>
            ) : number === page ? (
              <span
                aria-current="page"
                aria-label={`Page ${number}`}
                className={`${cell} border-b-2 border-accent font-semibold`}
              >
                {number}
              </span>
            ) : (
              <Link
                href={url(number)}
                aria-label={`Page ${number}`}
                className={`${cell} text-accent hover:underline hover:underline-offset-4`}
              >
                {number}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < totalPages ? (
        <Link
          href={url(page + 1)}
          className={`${cell} text-accent hover:underline hover:underline-offset-4`}
        >
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={`${cell} text-muted`}>
          Next
        </span>
      )}
    </nav>
  );
}
