import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const saotoPouleAuPot: Meal = {
  id: "saoto-chicken-soup",
  name: "Saoto-style chicken soup",
  imageUrl: "./img-meals/saoto-chicken-soup.jpg",
  tools: ["Pan", "Spatula"],
  steps: {
    prep: [
      "Cut the carrots and parsnips into bite-sized pieces",
      "Cut the cabbage into small pieces (if needed)",
    ],
    cook: [
      "Start slow cooker on high, add water with chicken broth",
      "Sear chicken in pan until golden on the outside",
      "Once the water is hot enough, add chicken to slow cooker",
      "Add carrots, parsnips, cabbage, cloves, bouquet garni and a sprinkle of tarragon to slow cooker",
      "Add some white wine to slow cooker",
      "Leave to cook for 30 min",
      "Cook rice in pan with chicken broth from slow-cooker",
      "At the end of cooking, mix in bean sprouts",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.CARROTS, IngredientId.PARSNIPS, IngredientId.CABBAGE, IngredientId.WHITE_WINE, IngredientId.CHICKEN_BROTH, IngredientId.BEAN_SPROUTS],
  seasoning: [SeasoningStapleId.BOUQUET_GARNI, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.CLOVES, SeasoningStapleId.TARRAGON],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.NONE,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
