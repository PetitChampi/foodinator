import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const pestoChickenGnocchi: Meal = {
  id: "pesto-chicken-gnocchi",
  name: "Pesto chicken gnocchi",
  imageUrl: "./img-meals/pesto-chicken-gnocchi.jpg",
  tools: ["Pan", "Spatula", "Mixer"],
  steps: {
    prep: [
      "speak fluent Italian to the gnocchi",
      "convince chicken it's actually Italian",
      "perform pesto rain dance",
    ],
    cook: [
      "achieve pasta nirvana",
      "master the art of Italian fusion",
      "serve with Mediterranean flair",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.GNOCCHI, IngredientId.SPINACH, IngredientId.FRESH_BASIL, IngredientId.PINE_NUTS, IngredientId.PARMESAN],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.GARLIC_POWDER_MIX, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.GNOCCHI,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
