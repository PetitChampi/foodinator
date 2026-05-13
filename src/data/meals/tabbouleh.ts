import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tabbouleh: Meal = {
  id: "tabbouleh",
  name: "Tabbouleh",
  imageUrl: "./img-meals/tabbouleh.jpg",
  tools: ["Large salad bowl", "Pot for couscous"],
  steps: {
    prep: [
      "Cut all vegetables into tiny pieces",
      "Chop both fresh herbs finely",
    ],
    cook: [
      "Cook couscous in the pot",
      "Mix all ingredients in the salad bowl",
      "Distribute in boxes or plates",
    ],
  },
  // Base ingredients + seasonings shared across all variants
  ingredients: [IngredientId.COUSCOUS, IngredientId.CUCUMBER, IngredientId.CHERRY_TOMATOES, IngredientId.CELERY, IngredientId.RADISHES, IngredientId.FRESH_MINT, IngredientId.FRESH_PARSLEY],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.LEMON_JUICE],
  tags: {
    cookingMethod: CookingMethodTag.POT,
    base: BaseTag.COUSCOUS,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
