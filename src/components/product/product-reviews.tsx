import type { Review } from "@/types/product";

export function ProductReviews({ reviews }: { reviews: readonly Review[] }) {
  return (
    <section className="detail-section" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading">Reviews</h2>
      {reviews.length === 0 ? <p className="detail-muted">No reviews yet.</p> : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id}>
              <p className="review-author">{review.authorName}</p>
              <p className="product-rating">{review.rating} out of 5</p>
              <p className="review-body">{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
