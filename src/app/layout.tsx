import type { Metadata } from "next";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { CartDrawerProvider } from "@/components/shared/cart-drawer-provider";
import { parseSiteUrl } from "@/lib/product-seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: parseSiteUrl(process.env.SITE_URL),
  title: { default: "Future Studios BD", template: "%s | Future Studios BD" },
  description: "Browse the Future Studios BD product catalog.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main-content"
          className="fixed top-3 left-4 z-10 -translate-y-[200%] bg-white px-4 py-3 text-accent focus:translate-y-0">
          Skip to content
        </a>
        <CartDrawerProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </CartDrawerProvider>
      </body>
    </html>
  );
}
