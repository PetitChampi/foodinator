import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tunaMelt: Meal = {
  id: "tuna-melt",
  name: "Tuna melt",
  imageUrl: "./img-meals/tuna-melt.jpg",
  tools: ["1 bowl"],
  steps: {
    prep: [
      "Slice spring onions, celery and bell pepper into tiny pieces",
      "Blend tuna with mayo, pepper, herbs and lemon juice",
      "Mix tuna blend with chopped veg",
    ],
    cook: [
      "Stuff the bread tuna mix, add cheese slices on top and grill until cheese has melted",
    ],
  },
  ingredients: [IngredientId.TUNA, IngredientId.BREAD, IngredientId.CHEESE_SLICES, IngredientId.SPRING_ONION, IngredientId.CELERY, IngredientId.BELL_PEPPER],
  seasoning: [SeasoningStapleId.MAYO, SeasoningStapleId.MIXED_HERBS, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
