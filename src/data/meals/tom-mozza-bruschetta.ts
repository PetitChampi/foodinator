import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tomMozzaBruschetta: Meal = {
  id: "tom-mozza-bruschetta",
  name: "Tomato mozzarella bruschetta",
  imageUrl: "./img-meals/tom-mozza-bruschetta.jpg",
  tools: ["2 plates (for bruschetta assembly)"],
  steps: {
    prep: [
      "Slice tomatoes thinly",
      "Slice mozzarella into similarly sized pieces",
      "Toast pine nuts",
      "Put pesto ingredients in mixer and blend until smooth",
    ],
    cook: [
      "Toast bread slices",
      "Coat bread with pesto",
      "Layer tomato and mozzarella slices on top",
      "Top with balsamic vinegar, olive oil, black pepper, fresh basil if any",
    ],
  },
  ingredients: [IngredientId.BREAD, IngredientId.TOMATO, IngredientId.MOZZARELLA, IngredientId.FRESH_BASIL, IngredientId.PINE_NUTS, IngredientId.PARMESAN],
  seasoning: [SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
