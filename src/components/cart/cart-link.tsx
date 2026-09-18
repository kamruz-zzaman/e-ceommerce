"use client";

import Link from "next/link";
import { useCart, useCartHydration } from "./use-cart";

export function CartLink() {
  const hydrated = useCartHydration();
  const quantity = useCart((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  return <Link href="/cart" aria-label={hydrated ? `Cart, ${quantity} ${quantity === 1 ? "item" : "items"}` : "Cart"}>
    Cart{hydrated && ` (${quantity})`}
  </Link>;
}
