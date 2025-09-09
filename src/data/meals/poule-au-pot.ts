import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const mexicanStyleBeanCasserole: Meal = {
  id: "poule-au-pot",
  name: "Poule au pot",
  imageUrl: "./img-meals/poule-au-pot.jpg",
  tools: ["Pan", "Spatula"],
  steps: {
    prep: [
      "Cut the carrots and parsnips into bite-sized pieces",
      "Cut the the onions and leeks into large slices",
    ],
    cook: [
      "Start slow cooker on high, add water with chicken broth",
      "Once the water is hot enough, add chicken to slow cooker",
      "Add carrots, parsnips, onions, leeks, cloves and bouquet garni to slow cooker",
      "Add some butter and white wine to slow cooker",
      "Leave to cook for 2 hours",
      "Cook rice in pan with chicken broth from slow-cooker",
      "Bonus: make poulette sauce with some of the broth, butter, flour, creme fraiche, and lemon juice",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.RICE, IngredientId.WHITE_ONION, IngredientId.CARROTS, IngredientId.PARSNIPS, IngredientId.WHITE_WINE, IngredientId.CHICKEN_BROTH],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BOUQUET_GARNI, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.CLOVES],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
