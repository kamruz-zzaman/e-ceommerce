import { getHomepageShowcase } from "@/lib/homepage";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";

export default function Home() {
  const { hero, categories, featured } = getHomepageShowcase();
  return (
    <main id="main-content" tabIndex={-1} className="site-container">
      {hero && <Hero product={hero} />}
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featured} />
    </main>
  );
}
