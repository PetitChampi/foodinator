import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tunaPita: Meal = {
  id: "tuna-pita",
  name: "Tuna pita sandwiches",
  imageUrl: "./img-meals/tuna-pita.jpg",
  tools: ["2 plates (for pita assembly)", "1 bowl"],
  steps: {
    prep: [
      "contemplate the meaning of tuna",
      "convince pita to open its heart",
      "achieve zen-like sandwich assembly",
    ],
    cook: [
      "transport taste buds to Greek islands",
      "master the art of Mediterranean assembly",
      "serve with Greek hospitality",
    ],
  },
  ingredients: [IngredientId.TUNA, IngredientId.PITA_BREAD, IngredientId.AVOCADOS, IngredientId.PICKLED_PEPPERS, IngredientId.FETA, IngredientId.GREEK_YOGURT],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.DILL, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.SANDWICH, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
