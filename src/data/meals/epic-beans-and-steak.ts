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
      "challenge the steak to a duel",
      "train beans in martial arts",
      "conquer the mushroom kingdom",
    ],
    cook: [
      "declare victory over hunger",
      "achieve epic flavor combination",
      "serve with triumphant fanfare",
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
