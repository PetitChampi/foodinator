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
      "negotiate with the fish",
      "teach pasta to swim",
      "convince wine to cooperate",
    ],
    cook: [
      "perform underwater ballet while cooking",
      "achieve perfect fish-pasta harmony",
      "serve with aquatic elegance",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.FISH, IngredientId.CREME_FRAICHE, IngredientId.SHALLOTS, IngredientId.ASPARAGUS, IngredientId.WHITE_WINE, IngredientId.LEMON],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [],
  },
};
