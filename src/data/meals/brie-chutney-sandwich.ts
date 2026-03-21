import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const brieChutneySandwich: Meal = {
  id: "brie-chutney-sandwich",
  name: "Brie & chutney sandwich",
  imageUrl: "./img-meals/brie-sandwich.jpg",
  tools: ["large plate (for sandwich assembly)"],
  steps: {
    prep: [],
    cook: [
      "Slice bread in half",
      "Spread chutney on bottom half of bread",
      "Spread butter on top half",
      "Top with brie slices, walnuts, then spinach",
      "Close sandwich and serve",
    ],
  },
  ingredients: [IngredientId.BRIE, IngredientId.BROWN_BREAD, IngredientId.SPINACH, IngredientId.WALNUTS, IngredientId.CHUTNEY],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.HONEY],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
