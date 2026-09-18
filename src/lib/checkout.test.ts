import { describe, expect, it } from "vitest";
import { buildConfirmation, submitOrder } from "./checkout";
import type { CheckoutFormValues } from "../schemas/checkout";
import type { CartItem } from "../types/cart";

const values: CheckoutFormValues = {
  fullName: "Jordan Rivera",
  email: "jordan@example.com",
  address: "221B Baker Street",
  city: "London",
  postalCode: "NW1 6XE",
  country: "United Kingdom",
};

const item: CartItem = {
  productId: "fsb-test", slug: "test", title: "Test product", priceCents: 1250, stock: 5, quantity: 2,
  image: { src: "/images/products/backpack.jpg", alt: "Backpack", width: 800, height: 600 },
};

describe("buildConfirmation", () => {
  it("uses the normalized/trimmed name from the validated values", () => {
    expect(buildConfirmation(values, [item])?.name).toBe("Jordan Rivera");
  });

  it("derives total item quantity across all lines, not line count", () => {
    const second = { ...item, productId: "second", quantity: 3 };
    expect(buildConfirmation(values, [item, second])?.itemCount).toBe(5);
  });

  it("derives the exact subtotal in integer cents", () => {
    const second = { ...item, productId: "second", priceCents: 999, quantity: 3 };
    expect(buildConfirmation(values, [item, second])?.subtotalCents).toBe(item.priceCents * item.quantity + 999 * 3);
  });

  it("is independent of later cart mutation — a snapshot, not a live reference", () => {
    const items = [item];
    const confirmation = buildConfirmation(values, items);
    items.push({ ...item, productId: "second" }); // mutate the array after capture
    expect(confirmation).toEqual({ name: "Jordan Rivera", itemCount: 2, subtotalCents: 2500 });
  });

  it("handles an empty cart", () => {
    expect(buildConfirmation(values, [])).toEqual({ name: "Jordan Rivera", itemCount: 0, subtotalCents: 0 });
  });

  it("returns null instead of unsafe totals when the cart cannot be safely summed", () => {
    const unsafe = { ...item, priceCents: Number.MAX_SAFE_INTEGER, quantity: 2 };
    expect(buildConfirmation(values, [unsafe])).toBeNull();
  });
});

describe("submitOrder", () => {
  it("resolves deterministically", () => {
    return expect(submitOrder(0)).resolves.toBeUndefined();
  });

  it("supports a zero-delay path for fast tests", async () => {
    const start = Date.now();
    await submitOrder(0);
    expect(Date.now() - start).toBeLessThan(100);
  });
});
