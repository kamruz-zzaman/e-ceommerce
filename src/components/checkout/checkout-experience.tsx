"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useCartHydration } from "@/components/cart/use-cart";
import { cartTotals } from "@/lib/cart";
import {
  buildConfirmation,
  submitOrder,
  type OrderConfirmation,
} from "@/lib/checkout";
import type { CheckoutFormValues } from "@/schemas/checkout";
import { CheckoutForm } from "./checkout-form";
import { Confirmation } from "./confirmation";
import { OrderSummary } from "./order-summary";

export function CheckoutExperience() {
  const hydrated = useCartHydration();
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );

  async function placeOrder(values: CheckoutFormValues) {
    const snapshot = buildConfirmation(values, items);
    if (!snapshot)
      throw new Error(
        "Unable to prepare an order confirmation from the current cart.",
      );
    await submitOrder();
    setConfirmation(snapshot);
    clearCart();
  }

  if (!hydrated)
    return (
      <p className="mt-7 text-muted" role="status">
        Loading checkout…
      </p>
    );
  if (confirmation) return <Confirmation data={confirmation} />;
  if (items.length === 0) {
    return (
      <div className="mt-7">
        <p>Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-3 inline-flex min-h-11 items-center text-accent underline underline-offset-[3px] hover:text-accent-hover"
        >
          Browse products
        </Link>
      </div>
    );
  }
  const totals = cartTotals(items)!; // All cart entry points enforce safe integer totals.
  return (
    <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <CheckoutForm onPlaceOrder={placeOrder} />
      <OrderSummary items={items} totals={totals} />
    </div>
  );
}
