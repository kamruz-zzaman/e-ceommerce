import { formatPrice } from "@/lib/format-price";
import type { CartItem } from "@/types/cart";
import { TextActionLink } from "@/components/ui/text-action";

export function OrderSummary({
  items,
  totals,
}: {
  items: readonly CartItem[];
  totals: { quantity: number; subtotalCents: number };
}) {
  return (
    <aside
      aria-labelledby="order-summary-heading"
      className="self-start border border-border bg-surface p-5"
    >
      <h2 id="order-summary-heading" className="text-lg font-semibold">
        Order summary
      </h2>
      <ul className="mt-4 list-none m-0 p-0">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t border-border py-3 first:border-t-0 first:pt-0"
          >
            <span className="wrap-anywhere basis-full font-medium">
              {item.title}
            </span>
            <span className="text-sm text-muted">Qty {item.quantity}</span>
            <span className="font-semibold">
              {formatPrice(item.priceCents * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mb-4 flex items-center justify-between border-t border-border py-4 text-[1.0625rem]">
        Subtotal <strong>{formatPrice(totals.subtotalCents)}</strong>
      </p>
      <TextActionLink href="/cart">Edit cart</TextActionLink>
    </aside>
  );
}
