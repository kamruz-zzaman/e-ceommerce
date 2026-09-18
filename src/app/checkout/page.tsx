import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/checkout/checkout-experience";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container page-content checkout-page">
      <h1>Checkout</h1>
      <CheckoutExperience />
    </main>
  );
}
