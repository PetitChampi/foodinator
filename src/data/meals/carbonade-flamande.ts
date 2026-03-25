import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const carbonadeFlamande: Meal = {
  id: "carbonade-flamande",
  name: "Carbonade flamande",
  imageUrl: "./img-meals/carbonade.jpg",
  tools: ["Pan", "Spatula"],
  steps: {
    prep: [
      "Cut the carrots, parsnips and potatoes into small pieces",
      "Cut the the onions into medium chunks",
      "Dice the beef into 5cm chunks",
    ],
    cook: [
      "Brown beef with butter in slow cooker pot, on the stove",
      "Reserve beef, and sear onions with oil until melty",
      "Add brown sugar to onions, caramelise for 2min",
      "Reduce with wine vinegar",
      "Add the meat, cover with beer",
      "Add salt, pepper and bayleaves",
      "Add speculoos biscuits and a spoonful of mustard",
      "Bring to a boil, then reduce heat and leave to cook for 2h30",
      "Put potatoes, carrots and parsnips in a large pot with water, boil until soft",
      "Mash, and season them with butter, nutmeg and cinnamon",
      "Serve, and distribute into containers if needed",
    ],
  },
  ingredients: [IngredientId.BEEF, IngredientId.WHITE_ONION, IngredientId.DARK_BEER, IngredientId.SPECULOOS, IngredientId.MUSTARD, IngredientId.POTATOES, IngredientId.CARROTS, IngredientId.PARSNIPS],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BAY_LEAVES, SeasoningStapleId.BROWN_SUGAR, SeasoningStapleId.RED_WINE_VINEGAR, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
