"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format-price";
import { CloseIcon } from "@/components/icons/close-icon";
import { useCart, useCartHydration } from "./use-cart";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hydrated = useCartHydration();
  const items = useCart((state) => state.items);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeItem = useCart((state) => state.removeItem);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Cleans itself up whenever open flips false or the component unmounts, never left locked.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  const totals = hydrated ? cartTotals(items) : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="cart-drawer-heading"
      className="cart-drawer m-0 ml-auto h-dvh max-h-dvh w-full max-w-sm flex-col bg-background p-0 open:flex"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 id="cart-drawer-heading" className="text-lg font-semibold">
          Your cart
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-foreground"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {!hydrated ? (
        <p role="status" className="px-5 py-6 text-muted">
          Loading cart…
        </p>
      ) : items.length === 0 ? (
        <div className="px-5 py-8">
          <p>Your cart is empty.</p>
          <Link
            href="/products"
            onClick={onClose}
            className="mt-3 inline-flex min-h-11 items-center text-accent underline underline-offset-[3px] hover:text-accent-hover"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto px-5" aria-label="Cart items">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex gap-3 border-b border-border py-4 last:border-b-0"
              >
                <div className="relative h-16 w-16 shrink-0 bg-surface">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={onClose}
                    className="text-sm font-semibold hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {formatPrice(item.priceCents)} each
                  </p>
                  <div
                    className="mt-2 inline-flex items-center gap-1"
                    role="group"
                    aria-label={`Quantity for ${item.title}`}
                  >
                    <button
                      type="button"
                      disabled={item.quantity === 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() =>
                        setQuantity(item.productId, item.quantity - 1)
                      }
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-control border border-border disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted"
                    >
                      −
                    </button>
                    <span
                      aria-label={`Quantity ${item.quantity}`}
                      className="w-6 text-center text-sm"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      disabled={item.quantity >= item.stock}
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() =>
                        setQuantity(item.productId, item.quantity + 1)
                      }
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-control border border-border disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-between">
                  <p className="text-sm font-semibold">
                    {formatPrice(item.priceCents * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Remove ${item.title}`}
                    className="cursor-pointer text-xs text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-5 py-4">
            <p className="flex items-center justify-between text-base">
              <span>Subtotal</span>
              <strong>{formatPrice(totals?.subtotalCents ?? 0)}</strong>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="inline-flex min-h-11 items-center justify-center rounded-control border border-border text-sm font-semibold hover:border-accent"
              >
                View cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="inline-flex min-h-11 items-center justify-center rounded-control bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
