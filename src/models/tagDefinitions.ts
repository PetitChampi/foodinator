export interface TagDefinition {
  id: string;
  name: string;
  category: TagCategory;
}

export type TagCategory = "cookingMethod" | "base" | "proteinSource" | "convenience";

export const TAG_CATEGORIES: Record<TagCategory, string> = {
  cookingMethod: "Cooking method",
  base: "Carb base",
  proteinSource: "Main protein source",
  convenience: "Convenience",
};

export const TAG_DEFINITIONS: TagDefinition[] = [
  // Cooking methods
  { id: "pot", name: "Pot only", category: "cookingMethod" },
  { id: "slow-cooker", name: "Slow cooker", category: "cookingMethod" },
  { id: "oven", name: "Oven", category: "cookingMethod" },
  { id: "pan", name: "Pan only", category: "cookingMethod" },
  { id: "pot-pan", name: "Pot & pan", category: "cookingMethod" },
  { id: "no-cook", name: "No cook", category: "cookingMethod" },

  // Base
  { id: "rice", name: "Rice", category: "base" },
  { id: "pasta", name: "Pasta", category: "base" },
  { id: "bread", name: "Bread", category: "base" },
  { id: "potatoes", name: "Potatoes", category: "base" },
  { id: "tortillas", name: "Tortillas", category: "base" },
  { id: "gnocchi", name: "Gnocchi", category: "base" },
  { id: "beans", name: "Beans", category: "base" },
  { id: "chicipeas", name: "Chickpeas", category: "base" },

  // Protein source
  { id: "chicken", name: "Chicken", category: "proteinSource" },
  { id: "beef", name: "Beef", category: "proteinSource" },
  { id: "pork", name: "Pork", category: "proteinSource" },
  { id: "fish", name: "Fish", category: "proteinSource" },
  { id: "seafood", name: "Seafood", category: "proteinSource" },
  { id: "lamb", name: "Lamb", category: "proteinSource" },
  { id: "eggs", name: "Eggs", category: "proteinSource" },

  // Convenience
  { id: "sandwich", name: "Sandwich", category: "convenience" },
  { id: "fridge-friendly", name: "Fridge friendly", category: "convenience" },
  { id: "batchable", name: "Batchable", category: "convenience" },
  { id: "one-pot", name: "One pot", category: "convenience" },
];

export const getTagById = (id: string): TagDefinition | null => {
  return TAG_DEFINITIONS.find(tag => tag.id === id) || null;
};

export const getTagsByCategory = (category: TagCategory): TagDefinition[] => {
  return TAG_DEFINITIONS.filter(tag => tag.category === category);
};

export const getAllTagsForSearch = (): TagDefinition[] => {
  return TAG_DEFINITIONS;
};
