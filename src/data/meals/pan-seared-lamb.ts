import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const panSearedLamb: Meal = {
  id: "pan-seared-lamb",
  name: "Pan-seared lamb",
  tools: ["Pan", "Spatula", "Tongs", "1 plate", "Pot or air fryer for potatoes"],
  steps: {
    prep: [
      "apologize to the lamb for being fancy",
      "convince mint it's not just for mojitos",
      "practice your best Gordon Ramsay impression",
    ],
    cook: [
      "pretend you know what you're doing",
      "achieve restaurant-quality searing",
      "serve with sophisticated confidence",
    ],
  },
  ingredients: [IngredientId.LAMB, IngredientId.POTATOES, IngredientId.GREEN_VEG, IngredientId.MINT_SAUCE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.LAMB,
    convenience: [],
  },
};
