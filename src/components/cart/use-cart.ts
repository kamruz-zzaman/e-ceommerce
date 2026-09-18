"use client";

import { useEffect } from "react";
import { useStore } from "zustand";
import { createCartStore, type CartState } from "@/stores/cart-store";

// Only browser effects/events mutate this instance. SSR always sees pending defaults.
const { store, hydrateCart } = createCartStore();

export function useCart<T>(selector: (state: CartState) => T): T {
  return useStore(store, selector);
}

export function useCartHydration() {
  useEffect(() => { void hydrateCart(); }, []);
  return useCart((state) => state.hasHydrated);
}
