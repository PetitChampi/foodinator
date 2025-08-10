import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const mexicanStyleBeanCasserole: Meal = {
  id: "mexican-style-bean-casserole",
  name: "Mexican-style bean casserole",
  imageUrl: "./img-meals/mex-bean-casserole.jpg",
  tools: ["Non-stick pan", "Spatula"],
  steps: {
    prep: [
      "teach beans to salsa dance",
      "serenade the avocados",
      "have a fiesta with the peppers",
    ],
    cook: [
      "convince lime to be more zesty",
      "achieve perfect Mexican harmony",
      "serve with festive enthusiasm",
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
