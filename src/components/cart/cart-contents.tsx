"use client";

import { useState } from "react";
import { cartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format-price";
import { CartItem } from "./cart-item";
import { useCart, useCartHydration } from "./use-cart";
import { ButtonLink } from "@/components/ui/button";
import { TextActionButton, TextActionLink } from "@/components/ui/text-action";

export function CartContents() {
  const hydrated = useCartHydration();
  const items = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const clearCart = useCart((state) => state.clearCart);
  const persistenceAvailable = useCart((state) => state.persistenceAvailable);
  const [message, setMessage] = useState("");
  if (!hydrated)
    return (
      <p role="status" className="mt-7 text-muted">
        Loading cart…
      </p>
    );
  const totals = cartTotals(items)!; // All entry points enforce safe integer totals.
  return (
    <div className="mt-7">
      <p role="status" className="sr-only">
        {message}
      </p>
      {!persistenceAvailable && (
        <p className="my-3 text-sm text-muted">
          Cart changes cannot be saved on this device.
        </p>
      )}
      {items.length === 0 ? (
        <div className="py-3 pb-8">
          <p>Your cart is empty.</p>
          <TextActionLink href="/products" className="mt-3">
            Browse products
          </TextActionLink>
        </div>
      ) : (
        <>
          <ul aria-label="Cart items" className="list-none m-0 p-0">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQuantity={(quantity) => {
                  const changed = setQuantity(item.productId, quantity);
                  setMessage(
                    changed
                      ? `${item.title}: quantity ${Math.min(quantity, item.stock)}.`
                      : "Quantity could not be changed.",
                  );
                }}
                onRemove={() => {
                  removeItem(item.productId);
                  setMessage(`${item.title} removed from cart.`);
                }}
              />
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
            <p>
              Subtotal{" "}
              <strong className="ml-6 text-xl">
                {formatPrice(totals.subtotalCents)}
              </strong>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <TextActionButton
                className="text-sm"
                onClick={() => {
                  clearCart();
                  setMessage("Cart cleared.");
                }}
              >
                Clear cart
              </TextActionButton>
              <ButtonLink href="/checkout">Checkout</ButtonLink>
            </div>
          </div>
          <TextActionLink href="/products">Continue browsing</TextActionLink>
        </>
      )}
    </div>
  );
}
