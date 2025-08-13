import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const mushroomRisotto: Meal = {
  id: "mushroom-risotto",
  name: "Mushroom risotto",
  imageUrl: "./img-meals/mushroom-risotto.jpg",
  tools: ["Pan", "Spatula", "Pot (for broth)"],
  steps: {
    prep: [
      "apologize to the mushrooms for being basic",
      "convince rice it's trendy",
      "take 47 photos for social media",
    ],
    cook: [
      "pretend this is a complete meal",
      "achieve Instagram-worthy presentation",
      "serve with millennial pride",
    ],
  },
  ingredients: [IngredientId.RICE, IngredientId.MUSHROOMS, IngredientId.SHALLOTS, IngredientId.PARMESAN, IngredientId.WHITE_WINE],
  seasoning: [SeasoningStapleId.ROSEMARY, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BUTTER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
