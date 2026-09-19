import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="site-container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Future Studios BD</p>
          <p className="mt-1 text-sm text-muted">
            A storefront built to demonstrate modern e-commerce frontend
            architecture.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex items-center gap-5 text-sm"
        >
          <Link
            href="/products"
            className="text-accent underline underline-offset-[3px] hover:text-accent-hover"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="text-accent underline underline-offset-[3px] hover:text-accent-hover"
          >
            Cart
          </Link>
        </nav>
      </div>
    </footer>
  );
}
