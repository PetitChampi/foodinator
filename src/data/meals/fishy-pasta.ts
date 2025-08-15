import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const fishyPasta: Meal = {
  id: "fishy-pasta",
  name: "Fishy pasta",
  imageUrl: "./img-meals/fishy-pasta.jpg",
  tools: ["Pot", "Pan", "2 spatulas"],
  steps: {
    prep: [
      "Chop asparagus into small chunks",
      "Slice shallots into thin rings",
    ],
    cook: [
      "Boil water in pot, add pasta until al dente (8 min)",
      "Add veg to pan with olive oil",
      "Season fish, add to pan, stir for 3 min",
      "Add white wine, stir for 5 min",
      "Reduce heat, add creme fraiche, stir until combined (2 min)",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.FISH, IngredientId.CREME_FRAICHE, IngredientId.SHALLOTS, IngredientId.ASPARAGUS, IngredientId.WHITE_WINE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.LEMON_JUICE],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [],
  },
};
