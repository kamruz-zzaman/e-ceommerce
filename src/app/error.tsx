"use client";

import { Button } from "@/components/ui/button";
import { TextActionLink } from "@/components/ui/text-action";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-8 pb-14 md:py-10 md:pb-18"
    >
      <h1>Something went wrong</h1>
      <p className="mt-4 max-w-prose text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <Button onClick={reset}>Try again</Button>
        <TextActionLink href="/">Back to home</TextActionLink>
      </div>
    </main>
  );
}
