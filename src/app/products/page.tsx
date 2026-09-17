import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container page-content">
      <h1>Products</h1>
    </main>
  );
}
