"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { formatPrice } from "@/lib/format-price";
import type { ProductSuggestion } from "@/types/product";
import { SearchIcon } from "@/components/icons/search-icon";
import { CloseIcon } from "@/components/icons/close-icon";

type Status = "idle" | "loading" | "results" | "empty";
const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

function productsUrl(q: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  return `/products${params.size ? `?${params}` : ""}`;
}

export function HeaderSearchCombobox({
  id,
  className,
  autoFocus,
  onNavigate,
}: {
  id: string;
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<readonly ProductSuggestion[]>(
    [],
  );
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const abortRef = useRef<AbortController | null>(null);
  const requestQueryRef = useRef("");

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
    if (activeIndex !== null) setActiveIndex(null);
  }

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(
    () => () => {
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    },
    [],
  );

  function runSearch(value: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    requestQueryRef.current = value;
    setStatus("loading");
    fetch(`/api/products/suggest?q=${encodeURIComponent(value)}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: { results: readonly ProductSuggestion[] }) => {
        if (requestQueryRef.current !== value) return; // superseded by a newer query
        setSuggestions(data.results);
        setStatus(data.results.length > 0 ? "results" : "empty");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        if (requestQueryRef.current !== value) return;
        setSuggestions([]);
        setStatus("empty");
      });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    setActiveIndex(null);
    clearTimeout(debounceRef.current);
    const trimmed = value.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      abortRef.current?.abort();
      setSuggestions([]);
      setStatus("idle");
      setOpen(false);
      return;
    }
    setOpen(true);
    debounceRef.current = setTimeout(() => runSearch(trimmed), DEBOUNCE_MS);
  }

  function goToProduct(slug: string) {
    onNavigate?.();
    setOpen(false);
    router.push(`/products/${slug}`);
  }

  function goToResults(value: string) {
    onNavigate?.();
    setOpen(false);
    router.push(productsUrl(value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    clearTimeout(debounceRef.current);
    if (activeIndex !== null && suggestions[activeIndex])
      goToProduct(suggestions[activeIndex].slug);
    else if (query.trim()) goToResults(query.trim());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      if (!open || suggestions.length === 0) return;
      event.preventDefault();
      setActiveIndex((index) =>
        index === null ? 0 : Math.min(index + 1, suggestions.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      if (!open || suggestions.length === 0) return;
      event.preventDefault();
      setActiveIndex((index) =>
        index === null ? suggestions.length - 1 : Math.max(index - 1, 0),
      );
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(null);
    }
  }

  function clear() {
    clearTimeout(debounceRef.current);
    abortRef.current?.abort();
    setQuery("");
    setSuggestions([]);
    setStatus("idle");
    setActiveIndex(null);
    // Focusing re-enters onFocus with the pre-clear closure, which may
    // queue setOpen(true); set this last so it always wins the batch.
    inputRef.current?.focus();
    setOpen(false);
  }

  const listboxId = `${id}-listbox`;
  const activeOptionId =
    activeIndex !== null ? `${id}-option-${activeIndex}` : undefined;
  const statusMessage =
    status === "loading"
      ? "Searching…"
      : status === "empty"
        ? "No products found."
        : status === "results"
          ? `${suggestions.length} ${suggestions.length === 1 ? "suggestion" : "suggestions"}`
          : "";

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor={id} className="sr-only">
          Search products
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            ref={inputRef}
            id={id}
            type="text"
            autoComplete="off"
            placeholder="Search products…"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim().length >= MIN_QUERY_LENGTH) setOpen(true);
            }}
            className="min-h-11 w-full rounded-control border border-[#a8b2ab] bg-white px-3 pr-9 pl-9 text-sm text-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center text-muted hover:text-accent"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      {open && (
        <div className="absolute top-full right-0 left-0 z-20 mt-2 border border-border bg-background">
          {status === "loading" && (
            <p className="px-4 py-3 text-sm text-muted">Searching…</p>
          )}
          {status === "empty" && (
            <p className="px-4 py-3 text-sm text-muted">No products found.</p>
          )}
          {status === "results" && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Product suggestions"
              className="max-h-80 list-none overflow-y-auto p-0 m-0"
            >
              {suggestions.map((product, index) => (
                <li
                  key={product.slug}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onNavigate?.();
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 ${index === activeIndex ? "bg-surface" : ""}`}
                  >
                    <span className="relative h-10 w-10 shrink-0 bg-surface">
                      <Image
                        src={product.image.src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {product.title}
                      </span>
                      <span className="block text-xs text-muted">
                        {
                          CATEGORIES.find(
                            (category) => category.id === product.category,
                          )?.label
                        }{" "}
                        · {formatPrice(product.priceCents)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-border">
                <button
                  type="button"
                  onClick={() => goToResults(query.trim())}
                  className="w-full cursor-pointer px-3 py-2 text-left text-sm text-accent hover:text-accent-hover"
                >
                  View all results for “{query.trim()}”
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
