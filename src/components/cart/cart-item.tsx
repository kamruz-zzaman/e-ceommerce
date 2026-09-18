import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import type { CartItem as CartItemData } from "@/types/cart";

export function CartItem({ item, onQuantity, onRemove }: {
  item: CartItemData;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="cart-row">
      <Link className="cart-product-link" href={`/products/${item.slug}`} aria-labelledby={`cart-title-${item.productId}`}>
        <div className="product-image cart-image">
          <Image src={item.image.src} alt={item.image.alt} fill sizes="96px" />
        </div>
        <h2 id={`cart-title-${item.productId}`}>{item.title}</h2>
      </Link>
      <p className="cart-unit-price">{formatPrice(item.priceCents)} each</p>
      <div className="cart-quantity">
        <div className="quantity-controls" role="group" aria-label={`Quantity for ${item.title}`}>
          <button type="button" disabled={item.quantity === 1} aria-label={`Decrease quantity of ${item.title}`} onClick={() => onQuantity(item.quantity - 1)}>−</button>
          <span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
          <button type="button" disabled={item.quantity >= item.stock} aria-label={`Increase quantity of ${item.title}`} onClick={() => onQuantity(item.quantity + 1)}>+</button>
        </div>
        {item.quantity >= item.stock && <p className="cart-limit">Maximum available quantity reached.</p>}
      </div>
      <p className="cart-line-total"><span>Line total</span> {formatPrice(item.priceCents * item.quantity)}</p>
      <button type="button" className="text-action cart-remove" aria-label={`Remove ${item.title}`} onClick={onRemove}>Remove</button>
    </li>
  );
}
