import type { CartItem, CartSnapshot } from "../types/cart";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function positiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Reconstruct allowed fields; never merge arbitrary storage objects into state. */
export function readCartSnapshot(value: unknown): CartSnapshot | null {
  if (!record(value) || !text(value.productId) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.productId) || !text(value.slug) ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) || !text(value.title) ||
      typeof value.priceCents !== "number" || !Number.isSafeInteger(value.priceCents) || value.priceCents < 0 ||
      typeof value.stock !== "number" || !Number.isSafeInteger(value.stock) || value.stock < 0 ||
      !record(value.image) || !text(value.image.src) ||
      !/^\/images\/products\/[a-z0-9-]+\.jpg$/.test(value.image.src) ||
      !text(value.image.alt) || !positiveInteger(value.image.width) || !positiveInteger(value.image.height)) return null;
  return {
    productId: value.productId, slug: value.slug, title: value.title,
    priceCents: value.priceCents, stock: value.stock,
    image: { src: value.image.src, alt: value.image.alt, width: value.image.width, height: value.image.height },
  };
}

export function cartTotals(items: readonly CartItem[]): { quantity: number; subtotalCents: number } | null {
  let quantity = 0;
  let subtotalCents = 0;
  for (const item of items) {
    const lineCents = item.priceCents * item.quantity;
    quantity += item.quantity;
    subtotalCents += lineCents;
    if (!Number.isSafeInteger(lineCents) || !Number.isSafeInteger(quantity) || !Number.isSafeInteger(subtotalCents)) return null;
  }
  return { quantity, subtotalCents };
}

export function sanitizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const items: CartItem[] = [];
  const seen = new Set<string>();
  for (const entry of value) {
    const snapshot = readCartSnapshot(entry);
    if (!snapshot || snapshot.stock === 0 || !record(entry) || !positiveInteger(entry.quantity) || seen.has(snapshot.productId)) continue;
    const item = { ...snapshot, quantity: Math.min(entry.quantity, snapshot.stock) };
    if (!cartTotals([...items, item])) continue;
    items.push(item);
    seen.add(item.productId);
  }
  return items;
}

export function readCartEnvelope(value: unknown): { state: { items: CartItem[] }; version: 1 } | null {
  if (!record(value) || value.version !== 1 || !record(value.state) || !Array.isArray(value.state.items)) return null;
  return { state: { items: sanitizeCartItems(value.state.items) }, version: 1 };
}
