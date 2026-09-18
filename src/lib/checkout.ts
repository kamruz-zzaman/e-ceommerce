import type { CheckoutFormValues } from "../schemas/checkout";
import type { CartItem } from "../types/cart";
import { cartTotals } from "./cart";

export interface OrderConfirmation {
  readonly name: string;
  readonly itemCount: number;
  readonly subtotalCents: number;
}

export function buildConfirmation(values: CheckoutFormValues, items: readonly CartItem[]): OrderConfirmation | null {
  const totals = cartTotals(items);
  if (!totals) return null;
  return { name: values.fullName, itemCount: totals.quantity, subtotalCents: totals.subtotalCents };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function submitOrder(delayMs = 400): Promise<void> {
  return delay(delayMs);
}
