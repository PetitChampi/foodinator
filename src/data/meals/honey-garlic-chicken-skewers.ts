import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const honeyGarlicChickenSkewers: Meal = {
  id: "honey-garlic-chicken-skewers",
  name: "Honey garlic chicken skewers",
  imageUrl: "./img-meals/chicken-skewers.jpg",
  tools: ["1 bowl (for marinade)", "1 large plate", "Skewers", "Grill"],
  steps: {
    prep: [
      "dramatically stab chicken",
      "create marinade magic",
      "thread ingredients with precision",
    ],
    cook: [
      "master the grill dance",
      "achieve perfect char marks",
      "serve with skewer ceremony",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.BELL_PEPPER, IngredientId.WHITE_ONION, IngredientId.PEARL_COUSCOUS],
  seasoning: [SeasoningStapleId.SOY_SAUCE, SeasoningStapleId.HONEY, SeasoningStapleId.GINGER, SeasoningStapleId.SESAME_OIL, SeasoningStapleId.SESAME_SEEDS, SeasoningStapleId.GARLIC_PASTE],
  tags: {
    cookingMethod: CookingMethodTag.GRILL,
    base: BaseTag.COUSCOUS,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [],
  },
};
