import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tunaPita: Meal = {
  id: "tuna-pita",
  name: "Tuna pita sandwiches",
  imageUrl: "./img-meals/tuna-pita.jpg",
  tools: ["2 plates (for pita assembly)", "1 bowl"],
  steps: {
    prep: [
      "Blend avocado with salt and pepper",
      "Slice pickled peppers into thin strips",
      "Mix Greek yogurt with dill, olive oil, lemon juice, salt and black pepper",
    ],
    cook: [
      "Stuff the pita bread with feta, avocado, tuna, yogurt sauce, pickled peppers",
    ],
  },
  ingredients: [IngredientId.TUNA, IngredientId.PITA_BREAD, IngredientId.AVOCADOS, IngredientId.PICKLED_PEPPERS, IngredientId.FETA, IngredientId.GREEK_YOGURT],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.DILL, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
