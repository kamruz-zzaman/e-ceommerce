import Link from "next/link";
import { CartTrigger } from "@/components/cart/cart-trigger";
import { HeaderSearch } from "@/components/product/header-search";

export function SiteHeader() {
  return (
    <header className="relative border-b border-border">
      <div className="site-container flex min-h-[72px] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        <Link
          href="/"
          aria-label="FSB — Future Studios BD home"
          className="inline-flex min-h-11 items-center text-[1.375rem] font-semibold tracking-tight"
        >
          <span className="hidden md:inline">Future Studios BD</span>
          <span className="md:hidden">FSB</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center px-3 text-sm font-medium hover:underline hover:underline-offset-[5px]"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center px-3 text-sm font-medium hover:underline hover:underline-offset-[5px]"
          >
            Products
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <HeaderSearch />
          <CartTrigger />
        </div>
      </div>
    </header>
  );
}
