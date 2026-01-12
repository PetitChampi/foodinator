import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const classicBurritos: Meal = {
  id: "classic-burritos",
  name: "Classic burritos",
  imageUrl: "./img-meals/classic-burritos.jpg",
  tools: ["Pan", "Spatula", "2 plates"],
  steps: {
    prep: [
      "Slice tomatoes and red onion into medium pieces",
      "Slice avocado",
      "Add tomatoes, onion and avocado to mixer with parsley, paptika, salt, pepper and lime juice, blend into small chunks",
      "Place tortillas on plates",
    ],
    cook: [
      "Sear protein (with paprika) in pan until cooked through",
      "Add beans and their water to small pot (5 min)",
      "Add cheese, beans, pico de gallo / avocado mix and protein to tortillas",
      "Fold tortillas",
      "Toast burritos if desired",
    ],
  },
  // Base ingredients shared across all variants
  ingredients: [IngredientId.LARGE_TORTILLAS, IngredientId.AVOCADOS, IngredientId.TOMATO, IngredientId.RED_ONION, IngredientId.LIME, IngredientId.BEANS, IngredientId.SHREDDED_CHEESE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.TORTILLAS,
    convenience: [ConvenienceTag.SANDWICH, ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
  variants: [
    { name: "Prawn", ingredients: [IngredientId.PRAWNS], proteinSourceTag: ProteinSourceTag.SEAFOOD },
    { name: "Chicken", ingredients: [IngredientId.CHICKEN], proteinSourceTag: ProteinSourceTag.CHICKEN },
    { name: "Beef", ingredients: [IngredientId.GROUND_BEEF], proteinSourceTag: ProteinSourceTag.BEEF },
  ],
};
