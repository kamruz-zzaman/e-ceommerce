"use client";

import { CartIcon } from "@/components/icons/cart-icon";
import { useCartDrawer } from "@/components/shared/cart-drawer-provider";
import { useCart, useCartHydration } from "./use-cart";

export function CartTrigger() {
  const hydrated = useCartHydration();
  const quantity = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const { openDrawer } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={
        hydrated
          ? `Cart, ${quantity} ${quantity === 1 ? "item" : "items"}`
          : "Cart"
      }
      className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center text-foreground hover:text-accent"
    >
      <CartIcon className="h-6 w-6" />
      {hydrated && quantity > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-white"
        >
          {quantity}
        </span>
      )}
    </button>
  );
}
