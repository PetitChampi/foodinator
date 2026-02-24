import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const lentilCurrySoup: Meal = {
  id: "lentil-curry-soup",
  name: "Lentil curry soup",
  imageUrl: "./img-meals/lentil-curry-soup.jpg",
  tools: ["Large salad bowl"],
  steps: {
    prep: [
      "Dice onion, celery and carrots",
      "Wash lentils",
    ],
    cook: [
      "Sauté onion, carrot and celery with ollive oil until fragrant (1-2min)",
      "Add garlic, tomato paste, and all spices except cinnamon and lemon juice",
      "Stir lentils in",
      "Add broth, canned tomatoes, salt and pepper",
      "Cook until tender (1h)",
      "Blend the soup",
      "Finish with cinnamon and lemon juice",
      "Distribute in boxes or plates",
      "Serve with ricotta and bread",
    ],
  },
  // Base ingredients + seasonings shared across all variants
  ingredients: [IngredientId.LENTILS, IngredientId.RICOTTA, IngredientId.CELERY, IngredientId.CANNED_TOMATOES, IngredientId.WHITE_ONION, IngredientId.CARROTS, IngredientId.TOMATO_PASTE, IngredientId.BROWN_BREAD, IngredientId.VEGETABLE_BROTH],
  seasoning: [SeasoningStapleId.PAPRIKA, SeasoningStapleId.CINNAMON, SeasoningStapleId.GARLIC_PASTE, SeasoningStapleId.CUMIN, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.OLIVE_OIL],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.LENTILS,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
