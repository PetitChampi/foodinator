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
      "Cut broccoli into florets",
      "Cut mushrooms into slices",
    ],
    cook: [
      "Boil water in pot, and add rice",
      "Season chicken and cook in pan for 5 min",
      "Add mushrooms and broccoli to the pan, cook for 5 min",
      "Reduce heat, add creme fraiche, cook for 5 min",
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
