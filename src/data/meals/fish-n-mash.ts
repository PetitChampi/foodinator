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
      "Cut potatoes into chunks",
      "Chop shallots and bell pepper",
    ],
    cook: [
      "Boil water in pot, add potatoes and cook until tender (15 min)",
      "In pan, sauté shallots and bell peppers for 5 min",
      "Add fish to the pan",
      "Once one side of fish is done, flip and add balsamic vinegar to everything in pan",
      "Once done, place fish and veg in plate",
      "Drain potatoes, then mash them with milk",
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
