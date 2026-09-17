import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container page-content">
      <h1>Browse the store</h1>
      <p className="intro">Explore the catalog to find what you need.</p>
      <Link href="/products" className="primary-link">Browse products</Link>
    </main>
  );
}
