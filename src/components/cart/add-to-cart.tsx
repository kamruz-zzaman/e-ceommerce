"use client";

import { useState } from "react";
import type { CartSnapshot } from "@/types/cart";
import { useCart, useCartHydration } from "./use-cart";

export function AddToCart({ product }: { product: CartSnapshot }) {
  const hydrated = useCartHydration();
  const quantity = useCart((state) => state.items.find((item) => item.productId === product.productId)?.quantity ?? 0);
  const addItem = useCart((state) => state.addItem);
  const persistenceAvailable = useCart((state) => state.persistenceAvailable);
  const [message, setMessage] = useState("");
  const atMaximum = quantity >= product.stock;
  return (
    <div className="purchase-action">
      <button className="commerce-button" disabled={!hydrated || product.stock === 0 || atMaximum}
        onClick={() => {
          const added = addItem(product);
          setMessage(added ? `Added to cart. ${quantity + 1} in cart.` : "Could not add another item.");
        }}>
        {product.stock === 0 ? "Out of stock" : !hydrated ? "Loading cart…" : atMaximum ? "Maximum quantity reached" : "Add to cart"}
      </button>
      <p className="cart-feedback" role="status">{message}</p>
      {!persistenceAvailable && <p className="cart-notice">Cart changes cannot be saved on this device.</p>}
    </div>
  );
}
