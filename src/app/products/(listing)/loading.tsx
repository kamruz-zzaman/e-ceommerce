export default function LoadingProducts() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-8 pb-14 md:py-10 md:pb-18"
    >
      <h1>Products</h1>
      <p role="status" className="mt-4 text-muted">
        Loading products…
      </p>
      <div aria-hidden="true">
        <div className="mt-7 h-28 bg-surface" />
        <div className="mt-6 mb-5 h-5 w-32 bg-surface" />
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>
              <div className="aspect-square bg-surface" />
              <div className="mt-3 h-5 w-4/5 bg-surface" />
              <div className="mt-3 h-5 w-2/5 bg-surface" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
