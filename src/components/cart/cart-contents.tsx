"use client";

import { useState } from "react";
import Link from "next/link";
import { cartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format-price";
import { CartItem } from "./cart-item";
import { useCart, useCartHydration } from "./use-cart";

export function CartContents() {
  const hydrated = useCartHydration();
  const items = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const clearCart = useCart((state) => state.clearCart);
  const persistenceAvailable = useCart((state) => state.persistenceAvailable);
  const [message, setMessage] = useState("");
  if (!hydrated) return <p className="cart-pending" role="status">Loading cart…</p>;
  const totals = cartTotals(items)!; // All entry points enforce safe integer totals.
  return (
    <div className="cart-contents">
      <p className="sr-only" role="status">{message}</p>
      {!persistenceAvailable && <p className="cart-notice">Cart changes cannot be saved on this device.</p>}
      {items.length === 0 ? <div className="empty-cart">
        <p>Your cart is empty.</p>
        <Link href="/products" className="text-action">Browse products</Link>
      </div> : <>
        <ul className="cart-items" aria-label="Cart items">
          {items.map((item) => <CartItem key={item.productId} item={item}
            onQuantity={(quantity) => {
              const changed = setQuantity(item.productId, quantity);
              setMessage(changed ? `${item.title}: quantity ${Math.min(quantity, item.stock)}.` : "Quantity could not be changed.");
            }}
            onRemove={() => { removeItem(item.productId); setMessage(`${item.title} removed from cart.`); }} />)}
        </ul>
        <div className="cart-summary">
          <p>Subtotal <strong>{formatPrice(totals.subtotalCents)}</strong></p>
          <button type="button" className="text-action" onClick={() => { clearCart(); setMessage("Cart cleared."); }}>Clear cart</button>
        </div>
        <Link href="/products" className="text-action">Continue browsing</Link>
      </>}
    </div>
  );
}
