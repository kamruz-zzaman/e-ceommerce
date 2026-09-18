import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-content">
        <Link href="/" className="wordmark" aria-label="FSB — Future Studios BD home">
          <span className="wordmark-full" aria-hidden="true">Future Studios BD</span>
          <span className="wordmark-compact" aria-hidden="true">FSB</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
