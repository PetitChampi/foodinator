import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const avocadoToast: Meal = {
  id: "avocado-toast",
  name: "Avocado toast",
  imageUrl: "./img-meals/avocado-toasts.jpg",
  tools: ["Pot (for poaching eggs)", "Holed spoon", "Mixer", "Toaster"],
  steps: {
    prep: [
      "apologize to the avocado for being basic",
      "convince bread it's trendy",
      "take 47 photos for social media",
    ],
    cook: [
      "pretend this is a complete meal",
      "achieve Instagram-worthy presentation",
      "serve with millennial pride",
    ],
  },
  ingredients: [IngredientId.BROWN_BREAD, IngredientId.AVOCADOS, IngredientId.LIME, IngredientId.EGGS, IngredientId.HUMMUS, IngredientId.MINT_SAUCE],
  seasoning: [SeasoningStapleId.PAPRIKA_MIX, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.EGGS,
    convenience: [ConvenienceTag.ONE_POT],
  },
};
