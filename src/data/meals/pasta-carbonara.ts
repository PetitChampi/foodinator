import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const pastaCarbonara: Meal = {
  id: "pasta-carbonara",
  name: "Pasta carbonara",
  imageUrl: "./img-meals/pasta-carbonara.jpg",
  tools: ["Pot", "Pan", "Spatula", "1 bowl"],
  steps: {
    prep: [
      "swear allegiance to Rome",
      "prevent eggs from becoming scrambled at all costs",
      "negotiate cheese hierarchy",
    ],
    cook: [
      "achieve carbonara perfection or face Italian judgment",
      "master the art of silky sauce",
      "serve with Roman pride",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.EGGS, IngredientId.GRANA_PADANO, IngredientId.PARMESAN, IngredientId.LARDONS, IngredientId.MUSHROOMS],
  seasoning: [SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.PORK,
    convenience: [],
  },
};
