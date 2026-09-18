"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import type { FormEvent } from "react";
import { CATEGORIES } from "@/lib/categories";
import { normalizeProductQuery } from "@/lib/product-query";
import { buildProductUrl } from "@/lib/product-url";
import type { ProductQuery } from "@/types/product-query";

const ratingPresets = [4, 3, 2, 1];

export function DiscoveryControls({ query, total }: { query: ProductQuery; total: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const restoreFocus = useRef<string | null>(null);
  const key = buildProductUrl(query, {}, { resetPage: false });
  const customRating = query.rating !== undefined && query.rating !== 0 && !ratingPresets.includes(query.rating);
  const hasFilters = query.category !== undefined || query.minPrice !== undefined || query.maxPrice !== undefined || query.rating !== undefined;

  // Keyed forms reset drafts on committed navigation; keep keyboard focus on the same control.
  function formRef(form: HTMLFormElement | null) {
    if (!form) return;
    if (restoreFocus.current) {
      const control = form.querySelector<HTMLElement>(`#${restoreFocus.current}`);
      if (control) { control.focus({ preventScroll: true }); restoreFocus.current = null; }
    }
    return () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && form.contains(active)) restoreFocus.current = active.id;
    };
  }

  function navigate(url: string) {
    startTransition(() => router.push(url, { scroll: false }));
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    navigate(buildProductUrl(query, { q: String(data.get("q") ?? "") }));
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const minPrice = String(data.get("minPrice") ?? "").trim();
    const maxPrice = String(data.get("maxPrice") ?? "").trim();
    for (const name of ["minPrice", "maxPrice"] as const) {
      const control = form.elements.namedItem(name);
      if (!(control instanceof HTMLInputElement)) continue;
      const value = control.value.trim();
      const valid = !value || normalizeProductQuery({ [name]: value })[name] !== undefined;
      control.setCustomValidity(valid ? "" : "Enter a non-negative USD amount with up to two decimal places.");
      if (!valid) { control.reportValidity(); return; }
    }
    const selectedRating = String(data.get("rating") ?? "");
    navigate(buildProductUrl(query, {
      category: String(data.get("category") ?? "") || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      rating: selectedRating === "keep" ? query.rating : selectedRating || undefined,
    }));
  }

  return (
    <div className="discovery-controls" aria-busy={pending}>
      <div className="discovery-toolbar">
        <form key={`search-${key}`} ref={formRef} role="search" aria-label="Search products" onSubmit={search}>
          <label htmlFor="product-search">Search products</label>
          <div className="search-row">
            <input id="product-search" name="q" type="search" defaultValue={query.q} />
            <button id="search-submit" className="commerce-button" type="submit" aria-disabled={pending}>Search</button>
          </div>
          {query.q && <Link className="text-action" href={buildProductUrl(query, { q: undefined })}>Clear search</Link>}
        </form>
        <div className="sort-control">
          <label htmlFor="product-sort">Sort by</label>
          <select id="product-sort" value={query.sort} aria-disabled={pending}
            onChange={(event) => { if (!pending) navigate(buildProductUrl(query, { sort: event.target.value })); }}>
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating-desc">Highest rated</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>
      </div>
      <details className="filter-disclosure">
        <summary>Filters{hasFilters && <span className="filter-applied"> · Applied</span>}</summary>
        <form key={`filters-${key}`} ref={formRef} aria-label="Product filters" onSubmit={applyFilters}>
          <div className="filter-fields">
            <div className="filter-field">
              <label htmlFor="filter-category">Category</label>
              <select id="filter-category" name="category" defaultValue={query.category ?? ""}>
                <option value="">All categories</option>
                {CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
              </select>
            </div>
            <div className="price-fields">
              <div className="filter-field">
                <label htmlFor="filter-min">Min price (USD)</label>
                <input id="filter-min" name="minPrice" inputMode="decimal" defaultValue={query.minPrice ?? ""}
                  onInput={(event) => event.currentTarget.setCustomValidity("")} />
              </div>
              <div className="filter-field">
                <label htmlFor="filter-max">Max price (USD)</label>
                <input id="filter-max" name="maxPrice" inputMode="decimal" defaultValue={query.maxPrice ?? ""}
                  onInput={(event) => event.currentTarget.setCustomValidity("")} />
              </div>
            </div>
            <div className="filter-field">
              <label htmlFor="filter-rating">Minimum rating</label>
              <select id="filter-rating" name="rating" defaultValue={customRating || query.rating === 0 ? "keep" : query.rating ?? ""}
                aria-describedby={customRating ? "custom-rating" : undefined}>
                {(customRating || query.rating === 0) && <option value="keep" hidden>{customRating ? "Keep current setting" : "Any rating"}</option>}
                <option value="">Any rating</option>
                {ratingPresets.map((rating) => <option key={rating} value={rating}>{rating} and above</option>)}
              </select>
              {customRating && <p id="custom-rating" className="field-help">Custom minimum: {query.rating} out of 5. Kept until you choose a preset.</p>}
              {query.rating === 0 && <p className="field-help">Any rating, including unrated products.</p>}
            </div>
          </div>
          <button id="filter-apply" className="commerce-button" type="submit" aria-disabled={pending}>Apply filters</button>
        </form>
      </details>
      <p className="discovery-status" role="status">{pending ? "Updating products…" : <span className="sr-only">{total} {total === 1 ? "product" : "products"}</span>}</p>
    </div>
  );
}
