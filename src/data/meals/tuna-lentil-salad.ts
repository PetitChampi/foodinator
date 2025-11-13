import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tunaLentilSalad: Meal = {
  id: "tuna-lentil-salad",
  name: "Tuna & feta lentil salad",
  imageUrl: "./img-meals/tuna-lentil-salad.jpg",
  tools: ["Large salad bowl"],
  steps: {
    prep: [
      "Slice feta into small squares (if needed)",
      "Slice cherry tomatoes in half",
      "Slice lettuce into thin strips",
      "Prepare vinaigrette by mixing olive oil, salt, balsamic vinegar, tahini, thyme and lemon juice",
    ],
    cook: [
      "Mix all ingredients in the salad bowl",
      "Distribute in boxes or plates",
    ],
  },
  ingredients: [IngredientId.TUNA, IngredientId.LENTILS, IngredientId.FETA, IngredientId.LETTUCE, IngredientId.CHERRY_TOMATOES],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.TAHINI, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.THYME],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.LENTILS,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
