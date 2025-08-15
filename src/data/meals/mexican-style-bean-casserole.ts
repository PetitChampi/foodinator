import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const mexicanStyleBeanCasserole: Meal = {
  id: "mexican-style-bean-casserole",
  name: "Mexican-style bean casserole",
  imageUrl: "./img-meals/mex-bean-casserole.jpg",
  tools: ["Non-stick pan", "Spatula", "1 plate"],
  steps: {
    prep: [
      "Cut the bell peppers into small pieces",
      "Cut the avocados into wedges",
    ],
    cook: [
      "Sear diced beef in pan until browned",
      "Place beef in plate",
      "Sear peppers in the same pan (2 min)",
      "Add eggs to the pan",
      "Add black beans, season, cover, and cook until eggs are set",
      "Plate and top with avocado wedges and lime juice",
    ],
  },
  ingredients: [IngredientId.EGGS, IngredientId.BLACK_BEANS, IngredientId.AVOCADOS, IngredientId.BELL_PEPPER, IngredientId.LIME, IngredientId.DICED_BEEF],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.BEANS,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
