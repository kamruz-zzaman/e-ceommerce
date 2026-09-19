import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import type { CartItem as CartItemData } from "@/types/cart";

export function CartItem({
  item,
  onQuantity,
  onRemove,
}: {
  item: CartItemData;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-border py-6 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_172px_112px] md:items-start md:gap-6">
      <Link
        href={`/products/${item.slug}`}
        aria-labelledby={`cart-title-${item.productId}`}
        className="col-span-2 grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2"
      >
        <div className="relative h-24 w-24 bg-surface">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <h2
          id={`cart-title-${item.productId}`}
          className="wrap-anywhere text-base leading-snug font-semibold hover:underline hover:underline-offset-[3px]"
        >
          {item.title}
        </h2>
      </Link>
      <p className="col-span-2 text-sm text-muted md:col-start-1 md:col-span-1 md:row-start-3 md:pl-[112px]">
        {formatPrice(item.priceCents)} each
      </p>
      <div className="min-w-0 md:col-start-2 md:row-start-1 md:row-span-2">
        <div
          role="group"
          aria-label={`Quantity for ${item.title}`}
          className="inline-flex items-center gap-1"
        >
          <button
            type="button"
            disabled={item.quantity === 1}
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => onQuantity(item.quantity - 1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-control border border-border text-xl disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted [&:not(:disabled):hover]:border-accent"
          >
            −
          </button>
          <span
            aria-label={`Quantity ${item.quantity}`}
            className="flex h-11 w-11 items-center justify-center"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            disabled={item.quantity >= item.stock}
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => onQuantity(item.quantity + 1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-control border border-border text-xl disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted [&:not(:disabled):hover]:border-accent"
          >
            +
          </button>
        </div>
        {item.quantity >= item.stock && (
          <p className="mt-2 max-w-[24ch] text-[0.8125rem] text-muted">
            Maximum available quantity reached.
          </p>
        )}
      </div>
      <p className="wrap-anywhere self-start text-right font-semibold md:col-start-3 md:row-start-1">
        <span className="block text-[0.8125rem] font-normal text-muted">
          Line total
        </span>
        {formatPrice(item.priceCents * item.quantity)}
      </p>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${item.title}`}
        className="col-span-2 cursor-pointer justify-self-start text-sm text-accent underline underline-offset-[3px] hover:text-accent-hover md:col-span-1 md:col-start-3 md:row-start-2 md:justify-self-end"
      >
        Remove
      </button>
    </li>
  );
}
