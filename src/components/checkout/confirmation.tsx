import { formatPrice } from "@/lib/format-price";
import type { OrderConfirmation } from "@/lib/checkout";
import { ButtonLink } from "@/components/ui/button";

export function Confirmation({ data }: { data: OrderConfirmation }) {
  return (
    <div className="max-w-[46ch]">
      <h2 className="text-2xl font-semibold">Order confirmed</h2>
      <p role="status" className="mt-3">
        Thanks, {data.name}. Your simulated order has been completed.
      </p>
      <dl className="my-6 grid gap-2 border-y border-border py-4">
        <div className="flex justify-between">
          <dt className="text-muted">Items</dt>
          <dd className="m-0 font-semibold">{data.itemCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="m-0 font-semibold">
            {formatPrice(data.subtotalCents)}
          </dd>
        </div>
      </dl>
      <ButtonLink href="/products">Browse products</ButtonLink>
    </div>
  );
}
