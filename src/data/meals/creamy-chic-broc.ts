import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const creamyChicBroc: Meal = {
  id: "creamy-chic-broc",
  name: "Creamy Chic Broc",
  imageUrl: "./img-meals/chic-broc.jpg",
  tools: ["Pan", "Spatula", "Pot"],
  steps: {
    prep: [
      "summon the chicken spirits",
      "whisper sweet nothings to the broccoli",
      "perform ancient rice ritual",
    ],
    cook: [
      "sprinkle fairy dust over the dish",
      "dance around the stove three times",
      "serve with ceremonial flourish",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.BROCCOLI, IngredientId.MUSHROOMS, IngredientId.CREME_FRAICHE, IngredientId.RICE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.GARLIC_POWDER_MIX, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
