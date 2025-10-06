import { MealTagId } from "@/models/types";

export interface TagDefinition {
  id: MealTagId;
  name: string;
  category: TagCategory;
}

export type TagCategory = "cookingMethod" | "base" | "proteinSource" | "convenience";

// Tag enums for type safety
export enum CookingMethodTag {
  POT = "pot",
  SLOW_COOKER = "slow-cooker",
  OVEN = "oven",
  GRILL = "grill",
  PAN = "pan",
  POT_PAN = "pot-pan",
  NO_COOK = "no-cook",
}

export enum BaseTag {
  NONE = "none",
  RICE = "rice",
  PASTA = "pasta",
  BREAD = "bread",
  POTATOES = "potatoes",
  TORTILLAS = "tortillas",
  GNOCCHI = "gnocchi",
  BEANS = "beans",
  CHICKPEAS = "chickpeas",
  COUSCOUS = "couscous",
}

export enum ProteinSourceTag {
  CHICKEN = "chicken",
  BEEF = "beef",
  PORK = "pork",
  FISH = "fish",
  SEAFOOD = "seafood",
  LAMB = "lamb",
  EGGS = "eggs",
  VEGETARIAN = "vegetarian",
}

export enum ConvenienceTag {
  SANDWICH = "sandwich",
  FRIDGE_FRIENDLY = "fridge-friendly",
  BATCHABLE = "batchable",
  ONE_POT = "one-pot",
}

export const TAG_CATEGORIES: Record<TagCategory, string> = {
  cookingMethod: "Cooking method",
  base: "Carb base",
  proteinSource: "Main protein source",
  convenience: "Convenience",
};

export const TAG_DEFINITIONS: TagDefinition[] = [
  // Cooking methods
  { id: CookingMethodTag.POT, name: "Pot only", category: "cookingMethod" },
  { id: CookingMethodTag.SLOW_COOKER, name: "Slow cooker", category: "cookingMethod" },
  { id: CookingMethodTag.OVEN, name: "Oven", category: "cookingMethod" },
  { id: CookingMethodTag.GRILL, name: "Grill", category: "cookingMethod" },
  { id: CookingMethodTag.PAN, name: "Pan only", category: "cookingMethod" },
  { id: CookingMethodTag.POT_PAN, name: "Pot & pan", category: "cookingMethod" },
  { id: CookingMethodTag.NO_COOK, name: "No cook", category: "cookingMethod" },

  // Base
  { id: BaseTag.RICE, name: "Rice", category: "base" },
  { id: BaseTag.PASTA, name: "Pasta", category: "base" },
  { id: BaseTag.BREAD, name: "Bread", category: "base" },
  { id: BaseTag.POTATOES, name: "Potatoes", category: "base" },
  { id: BaseTag.TORTILLAS, name: "Tortillas", category: "base" },
  { id: BaseTag.GNOCCHI, name: "Gnocchi", category: "base" },
  { id: BaseTag.BEANS, name: "Beans", category: "base" },
  { id: BaseTag.CHICKPEAS, name: "Chickpeas", category: "base" },
  { id: BaseTag.COUSCOUS, name: "Couscous", category: "base" },

  // Protein source
  { id: ProteinSourceTag.CHICKEN, name: "Chicken", category: "proteinSource" },
  { id: ProteinSourceTag.BEEF, name: "Beef", category: "proteinSource" },
  { id: ProteinSourceTag.PORK, name: "Pork", category: "proteinSource" },
  { id: ProteinSourceTag.FISH, name: "Fish", category: "proteinSource" },
  { id: ProteinSourceTag.SEAFOOD, name: "Seafood", category: "proteinSource" },
  { id: ProteinSourceTag.LAMB, name: "Lamb", category: "proteinSource" },
  { id: ProteinSourceTag.EGGS, name: "Eggs", category: "proteinSource" },
  { id: ProteinSourceTag.VEGETARIAN, name: "Vegetarian", category: "proteinSource" },

  // Convenience
  { id: ConvenienceTag.SANDWICH, name: "Sandwich", category: "convenience" },
  { id: ConvenienceTag.FRIDGE_FRIENDLY, name: "Fridge friendly", category: "convenience" },
  { id: ConvenienceTag.BATCHABLE, name: "Batchable", category: "convenience" },
  { id: ConvenienceTag.ONE_POT, name: "One pot", category: "convenience" },
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
