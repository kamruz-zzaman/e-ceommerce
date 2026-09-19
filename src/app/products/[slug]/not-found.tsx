import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-12 md:py-16"
    >
      <h1>Product not found</h1>
      <Link
        href="/products"
        className="inline-flex min-h-11 items-center text-accent underline underline-offset-[3px] hover:text-accent-hover"
      >
        Back to products
      </Link>
    </main>
  );
}
