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
      "Put everything (except bread and eggs) in mixer",
      "Blend until smooth",
    ],
    cook: [
      "Boil water in pot",
      "Crack eggs into boiling water and poach (2-4 min)",
      "Toast bread",
      "Spread avocado mix on toasted bread",
      "Place poached eggs on top",
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
