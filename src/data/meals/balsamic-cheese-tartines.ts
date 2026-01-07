import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const balsamicCheeseTartines: Meal = {
  id: "balsamic-cheese-tartines",
  name: "Balsamic cheese tartines",
  imageUrl: "./img-meals/balsamic-cheese-tartines.jpg",
  tools: ["Baking tray", "Mixer"],
  steps: {
    prep: [
      "Blend walnuts and pine nuts in mixer",
      "Mix lettuce with dressing",
      "Slice cheese and place on bread slices",
      "Season with chopped nuts and rosemary",
    ],
    cook: [
      "Preheat the oven to 220°C",
      "Place bread slices on baking tray, bake for 8 min",
      "Drizzle with balsamic glaze and honey",
    ],
  },
  ingredients: [IngredientId.BREAD, IngredientId.GOATS_CHEESE, IngredientId.WALNUTS, IngredientId.PINE_NUTS, IngredientId.LETTUCE, IngredientId.CAESAR_DRESSING],
  seasoning: [SeasoningStapleId.ROSEMARY, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BALSAMIC_GLAZE, SeasoningStapleId.HONEY],
  tags: {
    cookingMethod: CookingMethodTag.OVEN,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [],
  },
};
