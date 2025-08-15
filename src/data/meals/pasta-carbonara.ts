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
      "Slice mushrooms into thin pieces",
      "Prepare carbonara sauce in a bowl",
    ],
    cook: [
      "Put pasta in boiling water",
      "Sear lardons and mushrooms in pan until crispy",
      "Once pasta is cooked, drain and add sauce and lardons + mushrooms; make sure the eggs don't scramble",
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
