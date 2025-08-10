import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const burgers: Meal = {
  id: "burgers",
  name: "Burgers",
  imageUrl: "./img-meals/burgers.jpg",
  tools: ["Pan", "2 spatulas", "Cutting board"],
  steps: {
    prep: [
      "pledge allegiance to the beef",
      "build burger architecture",
      "negotiate peace treaty between bun halves",
    ],
    cook: [
      "achieve burger enlightenment",
      "master the art of perfect patty",
      "serve with American pride",
    ],
  },
  ingredients: [IngredientId.BUNS, IngredientId.SAUCE, IngredientId.GROUND_BEEF, IngredientId.CHEESE, IngredientId.LETTUCE, IngredientId.POTATOES],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.PAPRIKA_MIX],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT],
  },
};
