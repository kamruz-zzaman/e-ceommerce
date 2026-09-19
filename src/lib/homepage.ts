import "server-only";

import { getProducts } from "../services/product-service";
import { CATEGORIES } from "./categories";
import type { CategoryId } from "./categories";
import type { Product } from "../types/product";

export interface CategoryShowcase {
  readonly id: CategoryId;
  readonly label: string;
  readonly product: Product;
}

export interface HomepageShowcase {
  readonly hero: Product | undefined;
  readonly categories: readonly CategoryShowcase[];
  readonly featured: readonly Product[];
}


export function getHomepageShowcase(): HomepageShowcase {
  const ranked = getProducts({ q: "", sort: "rating-desc", page: 1 }).products;
  const hero = ranked[0];

  const categories = CATEGORIES.flatMap((category) => {
    const options = getProducts({ q: "", sort: "rating-desc", page: 1, category: category.id }).products;
    const product = options.find((candidate) => candidate.id !== hero?.id) ?? options[0];
    return product ? [{ id: category.id, label: category.label, product }] : [];
  });

  const shown = new Set([hero?.id, ...categories.map((entry) => entry.product.id)].filter((id): id is string => Boolean(id)));
  const featured = ranked.filter((product) => !shown.has(product.id)).slice(0, 4);

  return { hero, categories, featured };
}
