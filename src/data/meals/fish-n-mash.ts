import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const fishNMash: Meal = {
  id: "fish-n-mash",
  name: "Fish n mash",
  imageUrl: "./img-meals/fisn-n-mash.jpg",
  tools: ["Pan", "Pot", "Spatula"],
  steps: {
    prep: [
      "practice saying 'brilliant' and 'lovely'",
      "convince potatoes to become fluffy clouds",
      "teach fish proper British manners",
    ],
    cook: [
      "serve with mandatory cup of tea",
      "achieve proper British comfort",
      "master the art of fish and chips alternative",
    ],
  },
  ingredients: [IngredientId.FISH, IngredientId.POTATOES, IngredientId.SHALLOTS, IngredientId.BELL_PEPPER, IngredientId.MILK],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
