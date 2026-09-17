import type { Metadata } from "next";
import { SiteHeader } from "@/components/shared/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Future Studios BD", template: "%s | Future Studios BD" },
  description: "Browse the Future Studios BD product catalog.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
