import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const epicBeansAndSteak: Meal = {
  id: "epic-beans-and-steak",
  name: "Epic beans and steak",
  imageUrl: "./img-meals/epic-beans-steak.jpg",
  tools: ["Pan", "Spatula", "Tongs", "1 plate"],
  steps: {
    prep: [
      "Cut mushrooms into slices",
    ],
    cook: [
      "Season steak, cook in pan until desired doneness",
      "Set steak aside on plate",
      "Reduce heat, add olive oil, garlic, rosemary and mushrooms to pan (3 min)",
      "Add white beans and some of their water to pan, cover, leave for 10 min",
    ],
  },
  ingredients: [IngredientId.STEAKS, IngredientId.WHITE_BEANS, IngredientId.MUSHROOMS, IngredientId.GARLIC, IngredientId.ROSEMARY],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.RED_WINE_VINEGAR, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.BEANS,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT],
  },
};
