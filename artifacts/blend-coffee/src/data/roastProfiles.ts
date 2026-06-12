import type { Product } from "./products";

export type RoastLevel = "R1" | "R2";

const COFFEE_CATEGORIES: Product["category"][] = ["beans", "ground", "capsules", "drinks"];

export function hasRoastProfile(category: Product["category"]): boolean {
  return COFFEE_CATEGORIES.includes(category);
}

export const roastLevels: RoastLevel[] = ["R1", "R2"];
