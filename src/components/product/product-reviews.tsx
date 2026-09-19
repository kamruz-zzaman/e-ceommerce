import type { Review } from "@/types/product";

export function ProductReviews({ reviews }: { reviews: readonly Review[] }) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="mt-10 border-t border-border pt-7 md:mt-12 md:pt-8"
    >
      <h2 id="reviews-heading" className="mb-6 text-xl font-semibold">
        Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-sm text-muted">No reviews yet.</p>
      ) : (
        <ul className="max-w-prose list-none m-0 p-0">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border-t border-border py-5 first:border-t-0 first:pt-0"
            >
              <p className="text-sm font-semibold">{review.authorName}</p>
              <p className="mt-1 text-[0.8125rem] text-muted">
                {review.rating} out of 5
              </p>
              <p className="wrap-anywhere mt-2">{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
