"use client";

import { useEffect, useRef, useState } from "react";
import type { CartSnapshot } from "@/types/cart";
import { CheckIcon } from "@/components/icons/check-icon";
import { useCartDrawer } from "@/components/shared/cart-drawer-provider";
import { useCart, useCartHydration } from "./use-cart";

export function AddToCart({ product }: { product: CartSnapshot }) {
  const hydrated = useCartHydration();
  const quantity = useCart(
    (state) =>
      state.items.find((item) => item.productId === product.productId)
        ?.quantity ?? 0,
  );
  const addItem = useCart((state) => state.addItem);
  const persistenceAvailable = useCart((state) => state.persistenceAvailable);
  const { openDrawer } = useCartDrawer();
  const [message, setMessage] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const atMaximum = quantity >= product.stock;

  useEffect(() => () => clearTimeout(revertTimer.current), []);

  return (
    <div className="mt-6">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-44 cursor-pointer items-center justify-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-[#e9ece9] disabled:text-muted"
        disabled={!hydrated || product.stock === 0 || atMaximum}
        onClick={() => {
          const added = addItem(product);
          setMessage(
            added
              ? `Added to cart. ${quantity + 1} in cart.`
              : "Could not add another item.",
          );
          if (added) {
            setJustAdded(true);
            clearTimeout(revertTimer.current);
            revertTimer.current = setTimeout(() => setJustAdded(false), 1200);
            openDrawer();
          }
        }}
      >
        {justAdded ? (
          <>
            <CheckIcon className="h-4 w-4" /> Added
          </>
        ) : product.stock === 0 ? (
          "Out of stock"
        ) : !hydrated ? (
          "Loading cart…"
        ) : atMaximum ? (
          "Maximum quantity reached"
        ) : (
          "Add to cart"
        )}
      </button>
      <p role="status" className="mt-2 min-h-6 text-sm text-muted">
        {message}
      </p>
      {!persistenceAvailable && (
        <p className="mt-3 text-sm text-muted">
          Cart changes cannot be saved on this device.
        </p>
      )}
    </div>
  );
}
