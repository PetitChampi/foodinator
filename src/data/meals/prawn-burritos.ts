import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const prawnBurritos: Meal = {
  id: "prawn-burritos",
  name: "Prawn burritos",
  imageUrl: "./img-meals/prawn-burritos.jpg",
  tools: ["Pan", "Spatula", "2 plates"],
  steps: {
    prep: [
      "teach prawns to surf on tortillas",
      "master the ancient art of burrito rolling",
      "convince ingredients to stay inside the wrap",
    ],
    cook: [
      "perform victory dance when burrito doesn't fall apart",
      "achieve perfect wrap technique",
      "serve with Mexican pride",
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
