"use client";

import Link from "next/link";

export default function ProductError({ reset }: { reset: () => void }) {
  return <main id="main-content" tabIndex={-1} className="site-container page-content products-page">
    <h1>Products couldn’t load</h1>
    <p className="intro">Please try again.</p>
    <div className="error-actions">
      <button className="commerce-button" onClick={reset}>Try again</button>
      <Link className="text-action" href="/products">Back to all products</Link>
    </div>
  </main>;
}
