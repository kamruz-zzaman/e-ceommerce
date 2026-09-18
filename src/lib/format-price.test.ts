import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it.each([[300, "$3.00"], [10900, "$109.00"], [1099, "$10.99"], [1, "$0.01"], [123456, "$1,234.56"]])(
    "formats %i USD cents as %s", (cents, expected) => expect(formatPrice(cents)).toBe(expected),
  );
});
