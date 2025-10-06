import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const boeufBourguignon: Meal = {
  id: "boeuf-bourguign",
  name: "Boeuf bourguignon",
  imageUrl: "./img-meals/boeuf-bourguignon.jpg",
  tools: ["Pan", "Spatula"],
  steps: {
    prep: [
      "Cut the carrots into bite-sized pieces",
      "Cut the mushrooms into desired shape",
      "Cut the the onions into large slices",
      "Dice the beef into 3-4cm chunks",
      "Cut the potatoes into thin slices",
    ],
    cook: [
      "Start slow cooker on high, add water with beef broth",
      "Sear onions in pan with butter, then add to slow cooker",
      "Sear beef in pan with salt and pepper until browned on the outside, then add to slow cooker",
      "Add carrots and bouquet garni to slow cooker",
      "Add mushrooms to slow cooker",
      "Add some butter and red wine to slow cooker",
      "Bonus: reduce pan juices with red wine, scrape and add to slow cooker",
      "Bonus: add a tablespoon of flour to thicken",
      "Leave to cook for at least 1 hour, ideally 2-3 hours",
      "Season and air-fry (or cook) potatoes",
    ],
  },
  ingredients: [IngredientId.BEEF, IngredientId.POTATOES, IngredientId.WHITE_ONION, IngredientId.CARROTS, IngredientId.MUSHROOMS, IngredientId.RED_WINE, IngredientId.BEEF_BROTH],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BOUQUET_GARNI, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.SLOW_COOKER,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
