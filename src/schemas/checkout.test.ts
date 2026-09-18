import { describe, expect, it } from "vitest";
import { COUNTRIES, checkoutSchema } from "./checkout";

const valid = {
  fullName: "Jordan Rivera",
  email: "jordan@example.com",
  address: "221B Baker Street",
  city: "London",
  postalCode: "NW1 6XE",
  country: "United Kingdom",
};

function fieldErrors(input: unknown) {
  const result = checkoutSchema.safeParse(input);
  if (result.success) return {};
  const errors: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
}

describe("checkout schema", () => {
  it("accepts a valid complete form", () => {
    expect(checkoutSchema.safeParse(valid)).toMatchObject({ success: true, data: valid });
  });

  it("trims fullName, address, and city", () => {
    const result = checkoutSchema.parse({ ...valid, fullName: "  Jordan Rivera  ", address: "  221B Baker Street  ", city: "  London  " });
    expect(result).toMatchObject({ fullName: "Jordan Rivera", address: "221B Baker Street", city: "London" });
  });

  it("trims and lowercases email", () => {
    expect(checkoutSchema.parse({ ...valid, email: "  Jordan@Example.COM  " }).email).toBe("jordan@example.com");
  });

  it.each(["A", " A "])("rejects fullName below the minimum (%j)", (fullName) => {
    expect(fieldErrors({ ...valid, fullName })).toHaveProperty("fullName");
  });

  it("rejects fullName above the maximum", () => {
    expect(fieldErrors({ ...valid, fullName: "A".repeat(81) })).toHaveProperty("fullName");
  });

  it("accepts fullName at the boundaries", () => {
    expect(checkoutSchema.safeParse({ ...valid, fullName: "Al" }).success).toBe(true);
    expect(checkoutSchema.safeParse({ ...valid, fullName: "A".repeat(80) }).success).toBe(true);
  });

  it("requires a non-empty email", () => {
    expect(fieldErrors({ ...valid, email: "" })).toHaveProperty("email");
  });

  it.each(["not-an-email", "missing-at.com", "no-domain@", "@no-local.com"])("rejects invalid email %j", (email) => {
    expect(fieldErrors({ ...valid, email })).toHaveProperty("email");
  });

  it("rejects email above the maximum", () => {
    const email = `${"a".repeat(250)}@b.co`;
    expect(fieldErrors({ ...valid, email })).toHaveProperty("email");
  });

  it("rejects address below the minimum and above the maximum", () => {
    expect(fieldErrors({ ...valid, address: "12" })).toHaveProperty("address");
    expect(fieldErrors({ ...valid, address: "A".repeat(121) })).toHaveProperty("address");
  });

  it("requires a non-empty city and rejects one above the maximum", () => {
    expect(fieldErrors({ ...valid, city: "" })).toHaveProperty("city");
    expect(fieldErrors({ ...valid, city: "A".repeat(81) })).toHaveProperty("city");
  });

  it("rejects postalCode below the minimum and above the maximum", () => {
    expect(fieldErrors({ ...valid, postalCode: "1" })).toHaveProperty("postalCode");
    expect(fieldErrors({ ...valid, postalCode: "1".repeat(17) })).toHaveProperty("postalCode");
  });

  it.each([
    "10001", // United States
    "SW1A 1AA", // United Kingdom
    "K1A 0B1", // Canada
    "100-0001", // Japan
    "1234 AB", // Netherlands
    "1220", // Bangladesh
  ])("accepts a representative international postal value %j", (postalCode) => {
    expect(checkoutSchema.safeParse({ ...valid, postalCode }).success).toBe(true);
  });

  it("rejects an empty country", () => {
    expect(fieldErrors({ ...valid, country: "" })).toHaveProperty("country");
  });

  it("rejects an unsupported country", () => {
    expect(fieldErrors({ ...valid, country: "Atlantis" })).toHaveProperty("country");
  });

  it.each(COUNTRIES)("accepts supported country %j", (country) => {
    expect(checkoutSchema.safeParse({ ...valid, country }).success).toBe(true);
  });
});
