export default function LoadingProducts() {
  return <main id="main-content" tabIndex={-1} className="site-container page-content products-page">
    <h1>Products</h1>
    <p role="status" className="loading-label">Loading products…</p>
    <div aria-hidden="true">
      <div className="loading-controls skeleton" />
      <div className="loading-count skeleton" />
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, i) => <div key={i}>
          <div className="product-image skeleton" />
          <div className="loading-title skeleton" />
          <div className="loading-price skeleton" />
        </div>)}
      </div>
    </div>
  </main>;
}
