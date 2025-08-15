import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const prawnBurritos: Meal = {
  id: "prawn-burritos",
  name: "Prawn burritos",
  imageUrl: "./img-meals/prawn-burritos.jpg",
  tools: ["Pan", "Spatula", "2 plates", "1 bowl (for pico de gallo)"],
  steps: {
    prep: [
      "Slice tomatoes and red onion into medium pieces",
      "Add to mixer with parsley, salt, pepper and lime juice, blend into small chunks",
      "Place in bowl and rinse mixer",
      "Slice avocados",
      "Blend avocado pieces with lime juice, salt, pepper and paprika",
      "Place tortillas on plates",
    ],
    cook: [
      "Sear prawns (with paprika) in pan until cooked through",
      "Add beans and their water to small pot (5 min)",
      "Add cheese, beans, pico de gallo, avocado and prawns to tortillas",
      "Fold tortillas",
      "Toast burritos if desired",
    ],
  },
  ingredients: [IngredientId.PRAWNS, IngredientId.LARGE_TORTILLAS, IngredientId.AVOCADOS, IngredientId.TOMATO, IngredientId.RED_ONION, IngredientId.LIME, IngredientId.BEANS, IngredientId.SHREDDED_CHEESE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.TORTILLAS,
    proteinSource: ProteinSourceTag.SEAFOOD,
    convenience: [ConvenienceTag.SANDWICH, ConvenienceTag.ONE_POT],
  },
};
