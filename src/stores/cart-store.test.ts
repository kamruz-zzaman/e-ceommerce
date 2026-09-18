import { describe, expect, it, vi } from "vitest";
import { createCartStore } from "./cart-store";
import { cartTotals } from "../lib/cart";
import type { CartSnapshot } from "../types/cart";

const product: CartSnapshot = {
  productId: "fsb-test", slug: "test", title: "Test product", priceCents: 1250, stock: 3,
  image: { src: "/images/products/backpack.jpg", alt: "Backpack", width: 800, height: 600 },
};
function memoryStorage(initial: string | null = null) {
  let raw = initial;
  return {
    getItem: vi.fn(() => raw),
    setItem: vi.fn((_name: string, value: string) => { raw = value; }),
    removeItem: vi.fn(() => { raw = null; }),
    read: () => raw,
  };
}
async function ready() {
  const storage = memoryStorage();
  const cart = createCartStore(() => storage);
  await cart.hydrateCart();
  return { ...cart, storage };
}

describe("cart actions", () => {
  it("adds new and existing items, caps stock independently of UI", async () => {
    const { store } = await ready();
    for (let n = 0; n < 5; n++) store.getState().addItem(product);
    expect(store.getState().items).toEqual([{ ...product, quantity: 3 }]);
    expect(store.getState().addItem(product)).toBe(false);
  });
  it("rejects zero-stock and malformed snapshots", async () => {
    const { store } = await ready();
    expect(store.getState().addItem({ ...product, stock: 0 })).toBe(false);
    expect(store.getState().addItem({ ...product, priceCents: -1 })).toBe(false);
    expect(store.getState().items).toEqual([]);
  });
  it("reconciles all incoming fields before incrementing", async () => {
    const { store } = await ready();
    store.getState().addItem(product);
    const fresh = { ...product, title: "Updated", slug: "updated", priceCents: 0, stock: 8, image: { ...product.image, alt: "New alt" } };
    store.getState().addItem(fresh);
    expect(store.getState().items).toEqual([{ ...fresh, quantity: 2 }]);
  });
  it("clamps existing quantity to reduced incoming stock", async () => {
    const { store } = await ready();
    store.getState().addItem(product);
    store.getState().setQuantity(product.productId, 3);
    const fresh = { ...product, stock: 1, priceCents: 2000 };
    expect(store.getState().addItem(fresh)).toBe(false);
    expect(store.getState().items).toEqual([{ ...fresh, quantity: 1 }]);
  });
  it("removes an obsolete line when incoming stock is zero", async () => {
    const { store } = await ready();
    store.getState().addItem(product);
    store.getState().addItem({ ...product, stock: 0 });
    expect(store.getState().items).toEqual([]);
  });
  it("supports increment, decrement and above-stock clamp with setQuantity", async () => {
    const { store } = await ready();
    store.getState().addItem(product);
    store.getState().setQuantity(product.productId, 2);
    expect(store.getState().items[0].quantity).toBe(2);
    store.getState().setQuantity(product.productId, 1);
    expect(store.getState().items[0].quantity).toBe(1);
    store.getState().setQuantity(product.productId, 99);
    expect(store.getState().items[0].quantity).toBe(3);
  });
  it.each([0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])("rejects quantity %s without removing or corrupting the line", async (quantity) => {
    const { store } = await ready();
    store.getState().addItem(product);
    expect(store.getState().setQuantity(product.productId, quantity)).toBe(false);
    expect(store.getState().items).toEqual([{ ...product, quantity: 1 }]);
  });
  it("removes one line and clears the rest", async () => {
    const { store } = await ready();
    store.getState().addItem(product);
    store.getState().addItem({ ...product, productId: "second" });
    store.getState().removeItem(product.productId);
    expect(store.getState().items.map((item) => item.productId)).toEqual(["second"]);
    store.getState().clearCart();
    expect(store.getState().items).toEqual([]);
  });
  it("guards unsafe arithmetic on add and quantity updates", async () => {
    const { store } = await ready();
    store.getState().addItem({ ...product, priceCents: Number.MAX_SAFE_INTEGER });
    expect(store.getState().addItem(product)).toBe(true); // Fresh lower price makes two safe.
    store.getState().clearCart();
    store.getState().addItem({ ...product, priceCents: Number.MAX_SAFE_INTEGER });
    expect(store.getState().setQuantity(product.productId, 2)).toBe(false);
    expect(store.getState().addItem({ ...product, productId: "second" })).toBe(false);
    expect(cartTotals(store.getState().items)).toEqual({ quantity: 1, subtotalCents: Number.MAX_SAFE_INTEGER });
  });
});

describe("cart hydration and persistence", () => {
  it("stays pending without reading storage or allowing mutations before hydration", () => {
    const storage = memoryStorage();
    const { store } = createCartStore(() => storage);
    store.getState().addItem(product);
    store.getState().setQuantity(product.productId, 2);
    store.getState().clearCart();
    expect(store.getState().hasHydrated).toBe(false);
    expect(store.getState().items).toEqual([]);
    expect(storage.getItem).not.toHaveBeenCalled();
    expect(storage.setItem).not.toHaveBeenCalled();
  });
  it("hydrates once even with concurrent/repeated consumers", async () => {
    const storage = memoryStorage(JSON.stringify({ version: 1, state: { items: [{ ...product, quantity: 2 }] } }));
    const { store, hydrateCart } = createCartStore(() => storage);
    await Promise.all([hydrateCart(), hydrateCart(), hydrateCart()]);
    store.getState().addItem(product);
    await hydrateCart();
    expect(storage.getItem).toHaveBeenCalledTimes(1);
    expect(store.getState().hasHydrated).toBe(true);
    expect(store.getState().items[0].quantity).toBe(3);
  });
  it("persists only snapshot fields and restores in a new instance", async () => {
    const { store, storage } = await ready();
    store.getState().addItem(product);
    expect(JSON.parse(storage.read()!)).toEqual({ version: 1, state: { items: [{ ...product, quantity: 1 }] } });
    const restored = createCartStore(() => storage);
    await restored.hydrateCart();
    expect(restored.store.getState().items).toEqual(store.getState().items);
  });
  it.each(["{broken", "null", "{}", '{"version":2,"state":{"items":[]}}'])("recovers from malformed storage %s", async (raw) => {
    const storage = memoryStorage(raw);
    const { store, hydrateCart } = createCartStore(() => storage);
    await hydrateCart();
    expect(store.getState().hasHydrated).toBe(true);
    expect(store.getState().items).toEqual([]);
    expect(store.getState().persistenceAvailable).toBe(true);
    store.getState().addItem(product);
    expect(JSON.parse(storage.read()!).state.items).toHaveLength(1);
  });
  it("restores sanitized items, clamps quantity and discards duplicates", async () => {
    const storage = memoryStorage(JSON.stringify({ version: 1, state: { items: [{ ...product, quantity: 8 }, { ...product, quantity: 1 }, { bad: true }] } }));
    const cart = createCartStore(() => storage);
    await cart.hydrateCart();
    expect(cart.store.getState().items).toEqual([{ ...product, quantity: 3 }]);
  });
  it("completes hydration and remains usable when storage access throws", async () => {
    const cart = createCartStore(() => { throw new Error("denied"); });
    await cart.hydrateCart();
    expect(cart.store.getState().hasHydrated).toBe(true);
    expect(cart.store.getState().persistenceAvailable).toBe(false);
    cart.store.getState().addItem(product);
    expect(cart.store.getState().items).toHaveLength(1);
  });
  it("handles a getItem failure", async () => {
    const storage = memoryStorage();
    storage.getItem.mockImplementation(() => { throw new Error("read failed"); });
    const cart = createCartStore(() => storage);
    await cart.hydrateCart();
    expect(cart.store.getState().hasHydrated).toBe(true);
    expect(cart.store.getState().persistenceAvailable).toBe(false);
    expect(cart.store.getState().addItem(product)).toBe(true);
  });
  it("retains changes in memory when a later write fails", async () => {
    const { store, storage } = await ready();
    storage.setItem.mockImplementation(() => { throw new Error("quota"); });
    expect(store.getState().addItem(product)).toBe(true);
    expect(store.getState().persistenceAvailable).toBe(false);
    store.getState().setQuantity(product.productId, 2);
    expect(store.getState().items[0].quantity).toBe(2);
    store.getState().clearCart();
    expect(store.getState().items).toEqual([]);
  });
});
