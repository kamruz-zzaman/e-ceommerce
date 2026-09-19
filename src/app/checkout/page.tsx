import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/checkout/checkout-experience";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-8 pb-16 md:py-10"
    >
      <h1>Checkout</h1>
      <CheckoutExperience />
    </main>
  );
}
