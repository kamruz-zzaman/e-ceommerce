import { describe, expect, it } from "vitest";
import { cartTotals, readCartEnvelope, sanitizeCartItems } from "./cart";

const item = {
  productId: "fsb-test", slug: "test", title: "Test product", priceCents: 1250, stock: 5, quantity: 2,
  image: { src: "/images/products/backpack.jpg", alt: "Backpack", width: 800, height: 600 },
};

describe("cart storage validation", () => {
  it("reconstructs only allowed fields", () => {
    expect(sanitizeCartItems([{ ...item, reviews: ["private"], description: "not persisted", image: { ...item.image, extra: 1 } }])).toEqual([item]);
  });
  it("accepts zero cents", () => expect(sanitizeCartItems([{ ...item, priceCents: 0 }])[0]?.priceCents).toBe(0));
  it.each([
    { productId: "" }, { productId: "bad id" }, { slug: "../bad" }, { title: "  " },
    { priceCents: -1 }, { priceCents: 1.1 }, { priceCents: Infinity }, { priceCents: "5" },
    { stock: 0 }, { stock: -1 }, { stock: 2.5 }, { stock: Number.MAX_SAFE_INTEGER + 1 },
    { quantity: 0 }, { quantity: -1 }, { quantity: 1.5 }, { quantity: NaN }, { quantity: Infinity },
    { image: null }, { image: { ...item.image, src: "https://example.com/image.jpg" } },
    { image: { ...item.image, src: "/images/products/../file.jpg" } },
    { image: { ...item.image, width: 0 } }, { image: { ...item.image, alt: "" } },
  ])("discards invalid entry %j", (override) => expect(sanitizeCartItems([{ ...item, ...override }])).toEqual([]));
  it("discards missing fields and non-records", () => expect(sanitizeCartItems([{}, null, 2, "item"])).toEqual([]));
  it("clamps restored quantity to stock", () => expect(sanitizeCartItems([{ ...item, quantity: 9 }])[0]?.quantity).toBe(5));
  it("keeps first valid duplicate, not an invalid earlier entry", () => {
    expect(sanitizeCartItems([{ ...item, quantity: 0 }, item, { ...item, quantity: 4 }])).toEqual([item]);
  });
  it.each([null, [], {}, { version: 0, state: { items: [item] } }, { version: 2, state: { items: [item] } }, { version: 1, state: { items: {} } }])(
    "discards unsupported envelope %j", (value) => expect(readCartEnvelope(value)).toBeNull(),
  );
  it("ignores untrusted state/action/hydration fields", () => {
    expect(readCartEnvelope({ version: 1, state: { items: [item], hasHydrated: true, addItem: "bad" } })).toEqual({ version: 1, state: { items: [item] } });
  });
  it("discards unsafe line totals", () => expect(sanitizeCartItems([{ ...item, priceCents: Number.MAX_SAFE_INTEGER }])).toEqual([]));
  it("discards entries that would overflow the accumulated subtotal", () => {
    const big = { ...item, priceCents: Number.MAX_SAFE_INTEGER, quantity: 1 };
    expect(sanitizeCartItems([big, { ...item, productId: "second" }])).toEqual([big]);
  });
});

describe("cart totals", () => {
  it("derives quantity, exact line amounts and subtotal", () => {
    expect(cartTotals([item, { ...item, productId: "second", priceCents: 999, quantity: 3 }])).toEqual({ quantity: 5, subtotalCents: 5497 });
  });
  it("handles empty and free carts", () => {
    expect(cartTotals([])).toEqual({ quantity: 0, subtotalCents: 0 });
    expect(cartTotals([{ ...item, priceCents: 0 }])).toEqual({ quantity: 2, subtotalCents: 0 });
  });
  it("rejects quantity overflow even for free items", () => {
    expect(cartTotals([{ ...item, priceCents: 0, quantity: Number.MAX_SAFE_INTEGER }, { ...item, priceCents: 0 }])).toBeNull();
  });
});
