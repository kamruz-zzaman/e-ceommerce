"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { CATEGORIES } from "@/lib/categories";
import { formatPrice } from "@/lib/format-price";
import { normalizeProductQuery } from "@/lib/product-query";
import { buildProductUrl } from "@/lib/product-url";
import type { ProductQuery } from "@/types/product-query";
import { Button } from "@/components/ui/button";
import { TextActionButton, TextActionLink } from "@/components/ui/text-action";
import { SearchIcon } from "@/components/icons/search-icon";
import { FilterIcon } from "@/components/icons/filter-icon";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { CloseIcon } from "@/components/icons/close-icon";

const ratingPresets = [4, 3, 2, 1];
const fieldBase =
  "w-full min-w-0 min-h-11 rounded-control border border-[#a8b2ab] bg-white text-foreground";
const inputClass = `${fieldBase} px-3`;
const selectClass = `${fieldBase} appearance-none px-3 pr-9`;
const labelClass = "mb-2 block text-sm font-semibold";
const SEARCH_DEBOUNCE_MS = 300;

function FilterChip({
  label,
  ariaLabel,
  onRemove,
  pending,
}: {
  label: string;
  ariaLabel: string;
  onRemove: () => void;
  pending: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!pending) onRemove();
      }}
      aria-disabled={pending}
      aria-label={ariaLabel}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3 text-sm hover:border-accent aria-disabled:cursor-wait aria-disabled:opacity-60"
    >
      {label}
      <CloseIcon className="h-3 w-3" />
    </button>
  );
}

export function DiscoveryControls({
  query,
  total,
}: {
  query: ProductQuery;
  total: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const restoreFocus = useRef<string | null>(null);
  const key = buildProductUrl(query, {}, { resetPage: false });
  const customRating =
    query.rating !== undefined &&
    query.rating !== 0 &&
    !ratingPresets.includes(query.rating);
  const filterCount = [
    query.category !== undefined,
    query.minPrice !== undefined || query.maxPrice !== undefined,
    query.rating !== undefined,
  ].filter(Boolean).length;
  const anyActive =
    query.q !== "" || filterCount > 0 || query.sort !== "relevance";

  // Keyed forms reset drafts on committed navigation; keep keyboard focus on the same control.
  // (Only the filters form remounts this way now — see the search input's own sync effect below.)
  function formRef(form: HTMLFormElement | null) {
    if (!form) return;
    if (restoreFocus.current) {
      const control = form.querySelector<HTMLElement>(
        `#${restoreFocus.current}`,
      );
      if (control) {
        control.focus({ preventScroll: true });
        restoreFocus.current = null;
      }
    }
    return () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && form.contains(active))
        restoreFocus.current = active.id;
    };
  }

  function navigate(url: string) {
    startTransition(() => router.push(url, { scroll: false }));
  }

  function navigateFromTyping(url: string) {
    startTransition(() => router.replace(url, { scroll: false }));
  }

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const lastCommittedQ = useRef(query.q);

  useEffect(() => {
    if (query.q !== lastCommittedQ.current) {
      if (searchInputRef.current) searchInputRef.current.value = query.q;
      lastCommittedQ.current = query.q;
    }
  }, [query.q]);

  useEffect(() => () => clearTimeout(searchDebounce.current), []);

  function cancelPendingSearch() {
    clearTimeout(searchDebounce.current);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    cancelPendingSearch();
    searchDebounce.current = setTimeout(() => {
      lastCommittedQ.current = value;
      navigateFromTyping(buildProductUrl(query, { q: value }));
    }, SEARCH_DEBOUNCE_MS);
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    cancelPendingSearch();
    if (pending) return;
    const value = String(new FormData(event.currentTarget).get("q") ?? "");
    lastCommittedQ.current = value;
    navigate(buildProductUrl(query, { q: value }));
  }

  function clearSearch() {
    cancelPendingSearch();
    if (pending) return;
    lastCommittedQ.current = "";
    if (searchInputRef.current) searchInputRef.current.value = "";
    navigate(buildProductUrl(query, { q: undefined }));
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
      const valid =
        !value || normalizeProductQuery({ [name]: value })[name] !== undefined;
      control.setCustomValidity(
        valid
          ? ""
          : "Enter a non-negative USD amount with up to two decimal places.",
      );
      if (!valid) {
        control.reportValidity();
        return;
      }
    }
    const selectedRating = String(data.get("rating") ?? "");
    navigate(
      buildProductUrl(query, {
        category: String(data.get("category") ?? "") || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        rating:
          selectedRating === "keep"
            ? query.rating
            : selectedRating || undefined,
      }),
    );
  }

  function removeFilters(changes: Parameters<typeof buildProductUrl>[1]) {
    if (pending) return;
    navigate(buildProductUrl(query, changes));
  }

  const categoryLabel = query.category
    ? CATEGORIES.find((category) => category.id === query.category)?.label
    : undefined;
  const priceLabel =
    query.minPrice !== undefined && query.maxPrice !== undefined
      ? `${formatPrice(Math.round(query.minPrice * 100))} – ${formatPrice(Math.round(query.maxPrice * 100))}`
      : query.minPrice !== undefined
        ? `From ${formatPrice(Math.round(query.minPrice * 100))}`
        : query.maxPrice !== undefined
          ? `Up to ${formatPrice(Math.round(query.maxPrice * 100))}`
          : undefined;
  const ratingLabel =
    query.rating === 0
      ? "Any rating (incl. unrated)"
      : query.rating !== undefined
        ? `${query.rating} and above`
        : undefined;

  return (
    <div aria-busy={pending} className="mt-7">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-end md:gap-6">
        <form role="search" aria-label="Search products" onSubmit={search}>
          <label htmlFor="product-search" className={labelClass}>
            Search products
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={searchInputRef}
                id="product-search"
                name="q"
                type="search"
                defaultValue={query.q}
                onChange={handleSearchInput}
                placeholder="Search by product name…"
                className={`${inputClass} pl-9`}
              />
            </div>
            <Button id="search-submit" type="submit" aria-disabled={pending}>
              Search
            </Button>
            {query.q && (
              <TextActionButton onClick={clearSearch} className="text-sm">
                Clear search
              </TextActionButton>
            )}
          </div>
        </form>
        <div>
          <label htmlFor="product-sort" className={labelClass}>
            Sort by
          </label>
          <div className="relative">
            <select
              id="product-sort"
              value={query.sort}
              aria-disabled={pending}
              className={selectClass}
              onChange={(event) => {
                if (!pending)
                  navigate(
                    buildProductUrl(query, { sort: event.target.value }),
                  );
              }}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating-desc">Highest rated</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <details className="group">
          <summary className="[&::-webkit-details-marker]:hidden inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-control border border-border px-3 text-sm font-semibold hover:border-accent">
            <FilterIcon className="h-4 w-4" />
            Filters
            {filterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                {filterCount}
              </span>
            )}
            <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
          </summary>
          <form
            key={`filters-${key}`}
            ref={formRef}
            aria-label="Product filters"
            onSubmit={applyFilters}
            className="mt-4 rounded-control border border-border bg-surface p-4 sm:p-5"
          >
            <div className="mb-5 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-6">
              <div className="min-w-0">
                <label htmlFor="filter-category" className={labelClass}>
                  Category
                </label>
                <div className="relative">
                  <select
                    id="filter-category"
                    name="category"
                    defaultValue={query.category ?? ""}
                    className={selectClass}
                  >
                    <option value="">All categories</option>
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>
              <div>
                <span className={labelClass}>Price</span>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="min-w-0">
                    <label htmlFor="filter-min" className="sr-only">
                      Min price (USD)
                    </label>
                    <input
                      id="filter-min"
                      name="minPrice"
                      inputMode="decimal"
                      placeholder="Min"
                      defaultValue={query.minPrice ?? ""}
                      className={inputClass}
                      onInput={(event) =>
                        event.currentTarget.setCustomValidity("")
                      }
                    />
                  </div>
                  <span aria-hidden="true" className="text-muted">
                    –
                  </span>
                  <div className="min-w-0">
                    <label htmlFor="filter-max" className="sr-only">
                      Max price (USD)
                    </label>
                    <input
                      id="filter-max"
                      name="maxPrice"
                      inputMode="decimal"
                      placeholder="Max"
                      defaultValue={query.maxPrice ?? ""}
                      className={inputClass}
                      onInput={(event) =>
                        event.currentTarget.setCustomValidity("")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <label htmlFor="filter-rating" className={labelClass}>
                  Minimum rating
                </label>
                <div className="relative">
                  <select
                    id="filter-rating"
                    name="rating"
                    className={selectClass}
                    defaultValue={
                      customRating || query.rating === 0
                        ? "keep"
                        : (query.rating ?? "")
                    }
                    aria-describedby={
                      customRating ? "custom-rating" : undefined
                    }
                  >
                    {(customRating || query.rating === 0) && (
                      <option value="keep" hidden>
                        {customRating ? "Keep current setting" : "Any rating"}
                      </option>
                    )}
                    <option value="">Any rating</option>
                    {ratingPresets.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} and above
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
                {customRating && (
                  <p
                    id="custom-rating"
                    className="mt-2 text-[0.8125rem] text-muted"
                  >
                    Custom minimum: {query.rating} out of 5. Kept until you
                    choose a preset.
                  </p>
                )}
                {query.rating === 0 && (
                  <p className="mt-2 text-[0.8125rem] text-muted">
                    Any rating, including unrated products.
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Button id="filter-apply" type="submit" aria-disabled={pending}>
                Apply filters
              </Button>
              {filterCount > 0 && (
                <button
                  type="button"
                  aria-disabled={pending}
                  onClick={() =>
                    removeFilters({
                      category: undefined,
                      minPrice: undefined,
                      maxPrice: undefined,
                      rating: undefined,
                    })
                  }
                  className="min-h-11 cursor-pointer text-sm text-accent underline underline-offset-[3px] hover:text-accent-hover aria-disabled:cursor-wait aria-disabled:opacity-60"
                >
                  Clear filters
                </button>
              )}
            </div>
          </form>
        </details>

        {(filterCount > 0 || anyActive) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {categoryLabel && (
              <FilterChip
                label={categoryLabel}
                pending={pending}
                ariaLabel={`Remove category filter: ${categoryLabel}`}
                onRemove={() => removeFilters({ category: undefined })}
              />
            )}
            {priceLabel && (
              <FilterChip
                label={priceLabel}
                pending={pending}
                ariaLabel={`Remove price filter: ${priceLabel}`}
                onRemove={() =>
                  removeFilters({ minPrice: undefined, maxPrice: undefined })
                }
              />
            )}
            {ratingLabel && (
              <FilterChip
                label={ratingLabel}
                pending={pending}
                ariaLabel={`Remove rating filter: ${ratingLabel}`}
                onRemove={() => removeFilters({ rating: undefined })}
              />
            )}
            {anyActive && (
              <TextActionLink href="/products" className="ml-auto text-sm">
                Clear all
              </TextActionLink>
            )}
          </div>
        )}
      </div>

      <p role="status" className="mt-3 min-h-6 text-sm text-muted">
        {pending ? (
          "Updating products…"
        ) : (
          <span className="sr-only">
            {total} {total === 1 ? "product" : "products"}
          </span>
        )}
      </p>
    </div>
  );
}
