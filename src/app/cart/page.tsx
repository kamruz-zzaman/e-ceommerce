import type { Metadata } from "next";
import { CartContents } from "@/components/cart/cart-contents";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return <main id="main-content" tabIndex={-1} className="site-container page-content cart-page">
    <h1>Your cart</h1>
    <CartContents />
  </main>;
}
