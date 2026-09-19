import { expect, it, vi } from "vitest";
// Only bypass the Next.js import marker in this Node integration test.
vi.mock("server-only", () => ({}));
import { GET } from "./route";

function request(query: string) {
  return new Request(`http://localhost/api/products/suggest${query}`);
}

it("returns no results below the 2-character minimum", async () => {
  for (const q of ["", "a"]) {
    const response = await GET(request(`?q=${encodeURIComponent(q)}`));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.results).toEqual([]);
  }
});
it("returns missing q the same as empty", async () => {
  const response = await GET(request(""));
  const body = await response.json();
  expect(body.results).toEqual([]);
});
it("returns real, minimally-shaped suggestions for a valid query", async () => {
  const response = await GET(request("?q=backpack"));
  const body = await response.json();
  expect(body.query).toBe("backpack");
  expect(body.results.length).toBeGreaterThan(0);
  expect(body.results.length).toBeLessThanOrEqual(5);
  for (const item of body.results) {
    expect(Object.keys(item).sort()).toEqual(["category", "image", "priceCents", "slug", "title"]);
  }
});
it("trims whitespace before applying the minimum length", async () => {
  const response = await GET(request(`?q=${encodeURIComponent("  a  ")}`));
  const body = await response.json();
  expect(body.results).toEqual([]);
});
it("caps an excessively long query rather than rejecting or erroring", async () => {
  const response = await GET(request(`?q=${encodeURIComponent("a".repeat(500))}`));
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.query.length).toBeLessThanOrEqual(100);
  expect(body.results).toEqual([]);
});
it("treats an unusual/malformed query as plain text, not an error", async () => {
  const response = await GET(request(`?q=${encodeURIComponent("<script>alert(1)</script>")}`));
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.results)).toBe(true);
});
it("ignores a client-supplied limit — the result count stays server-controlled", async () => {
  const response = await GET(request("?q=bag&limit=100"));
  const body = await response.json();
  expect(body.results.length).toBeLessThanOrEqual(5);
});
