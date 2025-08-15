import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const salmonBagels: Meal = {
  id: "salmon-bagels",
  name: "Smoked salmon bagels",
  imageUrl: "./img-meals/salmon-bagels.jpg",
  tools: ["2 plates (for bagel assembly)"],
  steps: {
    prep: [
      "Slice radishes thinly",
    ],
    cook: [
      "Place bagels on plates",
      "Spread cream cheese on bagels",
      "Add seasoning to cream cheese",
      "Place radishes, spinach, smoked salmon",
    ],
  },
  ingredients: [IngredientId.SMOKED_SALMON, IngredientId.BAGELS, IngredientId.CREAM_CHEESE, IngredientId.RADISHES, IngredientId.SPINACH],
  seasoning: [SeasoningStapleId.DILL, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
