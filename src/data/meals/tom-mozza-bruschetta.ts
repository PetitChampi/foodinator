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
      "practice dramatic Italian hand gestures",
      "seduce tomatoes with compliments",
      "convince mozzarella to be photogenic",
    ],
    cook: [
      "arrange ingredients like a Renaissance painting",
      "achieve artistic food presentation",
      "serve with Italian passion",
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
