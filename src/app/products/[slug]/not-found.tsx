import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container page-content">
      <h1>Product not found</h1>
      <Link href="/products" className="text-action">Back to products</Link>
    </main>
  );
}
