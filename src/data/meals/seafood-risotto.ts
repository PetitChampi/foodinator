import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const seafoodRisotto: Meal = {
  id: "seafood-risotto",
  name: "Seafood risotto",
  imageUrl: "./img-meals/seafood-risotto.jpg",
  tools: ["Pan", "Spatula", "Pot (for broth)", "1 plate"],
  steps: {
    prep: [
      "Cut seafood into bite-sized pieces if needed",
      "Cut shallots into thin slices",
      "Cut onion into thin slices",
    ],
    cook: [
      "Put broth in a pot until simmering",
      "Put seafood in pan with olive oil and pepper, untill cooked, then set aside in plate",
      "Put shallots and onion in pan with some butter (2 min)",
      "Add rice to pan, stir until coated",
      "Add saffron and a splash of wine to pan, stir until absorbed",
      "Add broth gradually (until each serving is absorbed), stir until rice creamy and cooked",
      "Add mascarpone and some of the parsley, stir",
      "Finish with a sprinkle of parsley, and black pepper",
    ],
  },
  ingredients: [IngredientId.RICE, IngredientId.WHITE_ONION, IngredientId.SHALLOTS, IngredientId.PRAWNS, IngredientId.FISH, IngredientId.WHITE_WINE, IngredientId.MASCARPONE, IngredientId.PARSLEY, IngredientId.FISH_BROTH],
  seasoning: [SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BUTTER, SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.SAFFRON],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.SEAFOOD,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
