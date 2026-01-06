import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const lentilSalad: Meal = {
  id: "lentil-salad",
  name: "Lentil salad",
  imageUrl: "./img-meals/lentil-salad.jpg",
  tools: ["Large salad bowl"],
  steps: {
    prep: [
      "Slice feta into small squares (if needed)",
      "Slice veg into desired shapes",
      "Prepare vinaigrette by mixing oils and seasonings",
    ],
    cook: [
      "Mix all ingredients in the salad bowl",
      "Distribute in boxes or plates",
    ],
  },
  // Base ingredients + seasonings shared across all variants
  ingredients: [IngredientId.LENTILS, IngredientId.FETA],
  seasoning: [],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.LENTILS,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
  variants: [
    {
      name: "Tuna",
      ingredients: [IngredientId.TUNA, IngredientId.LETTUCE, IngredientId.CHERRY_TOMATOES],
      seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.TAHINI, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.THYME],
      proteinSourceTag: ProteinSourceTag.FISH,
    },
    {
      name: "Salmon",
      ingredients: [IngredientId.SALMON, IngredientId.SPINACH],
      seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.SOY_SAUCE, SeasoningStapleId.SESAME_OIL, SeasoningStapleId.TAHINI, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.SESAME_SEEDS, SeasoningStapleId.DILL],
      proteinSourceTag: ProteinSourceTag.FISH,
    },
  ],
};
