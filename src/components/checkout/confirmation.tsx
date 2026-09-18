import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import type { OrderConfirmation } from "@/lib/checkout";

export function Confirmation({ data }: { data: OrderConfirmation }) {
  return (
    <div className="checkout-confirmation">
      <h2>Order confirmed</h2>
      <p role="status">Thanks, {data.name}. Your simulated order has been completed.</p>
      <dl className="confirmation-details">
        <div>
          <dt>Items</dt>
          <dd>{data.itemCount}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(data.subtotalCents)}</dd>
        </div>
      </dl>
      <Link href="/products" className="commerce-button">Browse products</Link>
    </div>
  );
}
