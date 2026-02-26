import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const jerseyBeanCrock: Meal = {
  id: "jersey-bean-crock",
  name: "Jersey bean crock",
  // imageUrl: "./img-meals/bean-crock.jpg",
  tools: ["Large knife"],
  steps: {
    prep: [
      "Cut the carrots, parsnips and onions into bite-sized pieces",
      "Cut the gammon joint into small chunks",
    ],
    cook: [
      "Start slow cooker on high, add water with veg broth",
      "Once the water is hot enough, add everything to slow cooker",
      "Season with white wine, bay leaves, black pepper, thyme and rosemary",
      "Leave to cook for at least 1h",
    ],
  },
  ingredients: [IngredientId.GAMMON_JOINT, IngredientId.CARROTS, IngredientId.PARSNIPS, IngredientId.WHITE_ONION, IngredientId.BEANS, IngredientId.WHITE_WINE, IngredientId.VEGETABLE_BROTH],
  seasoning: [SeasoningStapleId.BAY_LEAVES, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.THYME, SeasoningStapleId.ROSEMARY],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.BEANS,
    proteinSource: ProteinSourceTag.PORK,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
