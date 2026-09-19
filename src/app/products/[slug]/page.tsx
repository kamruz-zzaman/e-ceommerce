import { cache } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductReviews } from "@/components/product/product-reviews";
import { AddToCart } from "@/components/cart/add-to-cart";
import { CATEGORIES } from "@/lib/categories";
import { formatPrice } from "@/lib/format-price";
import {
  parseSiteUrl,
  productJsonLd,
  productMetadata,
  serializeJsonLd,
} from "@/lib/product-seo";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/product-service";
import { TextActionLink } from "@/components/ui/text-action";

const lookupProduct = cache(getProductBySlug);

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = lookupProduct(slug);
  if (!product) notFound();
  return productMetadata(product, parseSiteUrl(process.env.SITE_URL));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = lookupProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const image = product.images[0];
  const jsonLd = productJsonLd(product, parseSiteUrl(process.env.SITE_URL));

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container py-6 pb-14 md:py-8 md:pb-18"
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
      <TextActionLink href="/products" className="mb-6 text-sm">
        Back to products
      </TextActionLink>
      <div className="grid gap-7 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="relative aspect-square w-full max-w-160 bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            className="object-contain"
            sizes="(min-width: 1280px) 584px, (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 768px) 640px, calc(100vw - 32px)"
          />
        </div>
        <div className="lg:pt-3">
          <p className="mb-3 text-sm text-muted">
            {
              CATEGORIES.find((category) => category.id === product.category)
                ?.label
            }
          </p>
          <h1 className="wrap-anywhere">{product.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {product.rating === null
              ? "Not yet rated"
              : `${product.rating.toFixed(1)} out of 5 · ${product.reviews.length} reviews`}
          </p>
          <p className="mt-6 text-2xl font-semibold">
            {formatPrice(product.priceCents)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {product.stock === 0
              ? "Out of stock"
              : product.stock <= 5
                ? `${product.stock} in stock`
                : "In stock"}
          </p>
          <AddToCart
            key={product.id}
            product={{
              productId: product.id,
              slug: product.slug,
              title: product.title,
              priceCents: product.priceCents,
              image: product.images[0],
              stock: product.stock,
            }}
          />
          <p className="wrap-anywhere mt-6 max-w-prose border-t border-border pt-6">
            {product.description}
          </p>
        </div>
      </div>
      <ProductReviews reviews={product.reviews} />
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mt-10 border-t border-border pt-7 md:mt-12 md:pt-8"
        >
          <h2 id="related-heading" className="mb-6 text-xl font-semibold">
            Related products
          </h2>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.id} className="min-w-0">
                <ProductCard product={item} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
