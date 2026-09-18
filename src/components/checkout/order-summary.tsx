import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import type { CartItem } from "@/types/cart";

export function OrderSummary({ items, totals }: {
  items: readonly CartItem[];
  totals: { quantity: number; subtotalCents: number };
}) {
  return (
    <aside className="order-summary" aria-labelledby="order-summary-heading">
      <h2 id="order-summary-heading">Order summary</h2>
      <ul className="order-summary-items">
        {items.map((item) => (
          <li key={item.productId} className="order-summary-row">
            <span className="order-summary-title">{item.title}</span>
            <span className="order-summary-qty">Qty {item.quantity}</span>
            <span className="order-summary-line-total">{formatPrice(item.priceCents * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="order-summary-subtotal">Subtotal <strong>{formatPrice(totals.subtotalCents)}</strong></p>
      <Link href="/cart" className="text-action">Edit cart</Link>
    </aside>
  );
}
