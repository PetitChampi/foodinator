import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const luxuryJambonBeurre: Meal = {
  id: "luxury-jambon-beurre",
  name: "Luxury jambon-beurre",
  imageUrl: "./img-meals/luxury-jambon-beurre.jpg",
  tools: ["2 plates (for sandwich assembly)", "cutting board"],
  steps: {
    prep: [
      "Slice radishes thinly",
    ],
    cook: [
      "Slice baguette in half",
      "Spread butter on bottom half of baguette (top half optional)",
      "Top with cheese, ham, radish slices, pepper, balsamic glaze, then rocket",
      "Close sandwich adn serve",
    ],
  },
  ingredients: [IngredientId.HAM, IngredientId.BREAD, IngredientId.CHEESE, IngredientId.ROCKET, IngredientId.RADISHES],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BALSAMIC_VINEGAR],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.PORK,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
