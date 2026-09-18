import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductReviews } from "@/components/product/product-reviews";
import { CATEGORIES } from "@/lib/categories";
import { formatPrice } from "@/lib/format-price";
import { parseSiteUrl, productJsonLd, productMetadata, serializeJsonLd } from "@/lib/product-seo";
import { getProductBySlug, getRelatedProducts } from "@/services/product-service";

const lookupProduct = cache(getProductBySlug);

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = lookupProduct(slug);
  if (!product) notFound();
  return productMetadata(product, parseSiteUrl(process.env.SITE_URL));
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = lookupProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const image = product.images[0];
  const jsonLd = productJsonLd(product, parseSiteUrl(process.env.SITE_URL));

  return (
    <main id="main-content" tabIndex={-1} className="site-container detail-page">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />}
      <Link href="/products" className="text-action detail-back">Back to products</Link>
      <div className="detail-overview">
        <div className="product-image detail-image">
          <Image src={image.src} alt={image.alt} fill loading="eager"
            sizes="(min-width: 1280px) 584px, (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 768px) 640px, calc(100vw - 32px)" />
        </div>
        <div className="detail-information">
          <p className="detail-category">{CATEGORIES.find((category) => category.id === product.category)?.label}</p>
          <h1>{product.title}</h1>
          <p className="detail-muted">{product.rating === null ? "Not yet rated" : `${product.rating.toFixed(1)} out of 5 · ${product.reviews.length} reviews`}</p>
          <p className="detail-price">{formatPrice(product.priceCents)}</p>
          <p className="detail-stock">{product.stock === 0 ? "Out of stock" : product.stock <= 5 ? `${product.stock} in stock` : "In stock"}</p>
          <p className="detail-description">{product.description}</p>
        </div>
      </div>
      <ProductReviews reviews={product.reviews} />
      {related.length > 0 && (
        <section className="detail-section" aria-labelledby="related-heading">
          <h2 id="related-heading">Related products</h2>
          <ul className="product-grid">
            {related.map((item) => <li key={item.id}><ProductCard product={item} headingLevel="h3" /></li>)}
          </ul>
        </section>
      )}
    </main>
  );
}
