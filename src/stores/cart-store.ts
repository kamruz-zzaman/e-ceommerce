import { createStore } from "zustand/vanilla";
import { persist, type PersistStorage } from "zustand/middleware";
import { cartTotals, readCartEnvelope, readCartSnapshot } from "../lib/cart";
import type { CartItem, CartSnapshot } from "../types/cart";

type CartStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type PersistedCart = { items: readonly CartItem[] };

export interface CartState {
  items: readonly CartItem[];
  hasHydrated: boolean;
  persistenceAvailable: boolean;
  addItem: (snapshot: CartSnapshot) => boolean;
  setQuantity: (productId: string, quantity: number) => boolean;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export function createCartStore(getStorage: () => CartStorage = () => window.localStorage) {
  let storageFailed = false;
  let reportStorageFailure = () => {};
  function failStorage() {
    if (storageFailed) return;
    storageFailed = true;
    reportStorageFailure();
  }

  const storage: PersistStorage<PersistedCart> = {
    getItem(name) {
      if (storageFailed) return null;
      let raw: string | null;
      try { raw = getStorage().getItem(name); } catch { failStorage(); return null; }
      if (raw === null) return null;
      try { return readCartEnvelope(JSON.parse(raw)); } catch { return null; }
    },
    setItem(name, value) {
      if (storageFailed) return;
      try { getStorage().setItem(name, JSON.stringify(value)); } catch { failStorage(); }
    },
    removeItem(name) {
      if (storageFailed) return;
      try { getStorage().removeItem(name); } catch { failStorage(); }
    },
  };

  const store = createStore<CartState>()(persist((set, get) => ({
    items: [], hasHydrated: false, persistenceAvailable: true,
    addItem(value) {
      if (!get().hasHydrated) return false;
      const snapshot = readCartSnapshot(value);
      if (!snapshot) return false;
      const old = get().items.find((item) => item.productId === snapshot.productId);
      // A newly encountered zero-stock snapshot removes an obsolete cart line.
      if (snapshot.stock === 0) {
        if (old) set({ items: get().items.filter((item) => item.productId !== snapshot.productId) });
        return false;
      }
      const previousQuantity = Math.min(old?.quantity ?? 0, snapshot.stock);
      const quantity = Math.min(previousQuantity + 1, snapshot.stock);
      const item = { ...snapshot, quantity };
      const items = old ? get().items.map((entry) => entry.productId === snapshot.productId ? item : entry) : [...get().items, item];
      if (!cartTotals(items)) return false;
      set({ items });
      return quantity > previousQuantity;
    },
    setQuantity(productId, value) {
      if (!get().hasHydrated || !Number.isSafeInteger(value) || value < 1) return false;
      const old = get().items.find((item) => item.productId === productId);
      if (!old) return false;
      const quantity = Math.min(value, old.stock);
      if (quantity === old.quantity) return false;
      const items = get().items.map((item) => item.productId === productId ? { ...item, quantity } : item);
      if (!cartTotals(items)) return false;
      set({ items });
      return true;
    },
    removeItem(productId) {
      if (get().hasHydrated) set({ items: get().items.filter((item) => item.productId !== productId) });
    },
    clearCart() {
      if (get().hasHydrated) set({ items: [] });
    },
  }), {
    name: "fsb-cart", version: 1, storage, skipHydration: true,
    partialize: (state): PersistedCart => ({ items: state.items.map(({ productId, slug, title, priceCents, image, stock, quantity }) => ({
      productId, slug, title, priceCents, image: { src: image.src, alt: image.alt, width: image.width, height: image.height }, stock, quantity,
    })) }),
    merge: (persisted, current) => ({ ...current, items: readCartEnvelope({ state: persisted, version: 1 })?.state.items ?? [] }),
  }));

  reportStorageFailure = () => store.setState({ persistenceAvailable: false });
  let hydration: Promise<void> | undefined;
  function hydrateCart(): Promise<void> {
    // Deferred start installs the guard before synchronous localStorage hydration.
    hydration ??= Promise.resolve().then(async () => {
      try { await store.persist.rehydrate(); }
      finally { store.setState({ hasHydrated: true, persistenceAvailable: !storageFailed }); }
    });
    return hydration;
  }
  return { store, hydrateCart };
}
