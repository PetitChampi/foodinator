import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const mushroomRisotto: Meal = {
  id: "mushroom-risotto",
  name: "Mushroom risotto",
  imageUrl: "./img-meals/mushroom-risotto.jpg",
  tools: ["Pan", "Spatula", "Pot (for broth)"],
  steps: {
    prep: [
      "Cut mushrooms into small pieces",
      "Cut shallots into thin slices",
    ],
    cook: [
      "Put broth in a pot until simmering",
      "Put shallots in pan with some butter (2 min)",
      "Add mushrooms + any extra seasoning to the pan (5 min)",
      "Add rice and a splash of wine to pan, stir until absorbed",
      "Add broth gradually (until each serving is absorbed), stir until rice creamy and cooked",
      "Add grated parmesan + butter, stir until melted",
      "Finish with grated parmesan and a sprinkle of rosemary or parsley, and black pepper",
    ],
  },
  ingredients: [IngredientId.RICE, IngredientId.MUSHROOMS, IngredientId.SHALLOTS, IngredientId.PARMESAN, IngredientId.WHITE_WINE, IngredientId.VEGETABLE_BROTH],
  seasoning: [SeasoningStapleId.ROSEMARY, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BUTTER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
