import "server-only";

import generatedCatalog from "./products.generated.json";
import type { Product } from "../types/product";

// catalog:check validates the serialized contract before every production build.
// JSON cannot express the non-empty image tuple or narrow review-rating union.
const catalog: unknown = generatedCatalog;
export const products = catalog as readonly Product[];
