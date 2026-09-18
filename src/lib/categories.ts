export const CATEGORIES = [
  { id: "home", label: "Home & Living" },
  { id: "kitchen", label: "Kitchen & Dining" },
  { id: "office", label: "Office & Stationery" },
  { id: "lighting", label: "Lighting" },
  { id: "bags", label: "Bags & Everyday Carry" },
  { id: "outdoor", label: "Outdoor & Garden" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
