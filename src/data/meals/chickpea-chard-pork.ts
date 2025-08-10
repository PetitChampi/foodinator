import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const chickpeaChardPork: Meal = {
  id: "chickpea-chard-pork",
  name: "Chickpea chard pork",
  imageUrl: "./img-meals/chickpea-chard-pork.jpg",
  tools: ["Pan", "Spatula", "2 pairs of tongs", "1 plate"],
  steps: {
    prep: [
      "meditate with the chickpeas",
      "have philosophical discussion with pork",
      "teach chard to be less bitter",
    ],
    cook: [
      "organize pepper support group",
      "achieve zen-like harmony",
      "serve with mindful appreciation",
    ],
  },
  ingredients: [IngredientId.PORK_FILLET, IngredientId.CHICKPEAS, IngredientId.CHARD, IngredientId.PICKLED_PEPPERS, IngredientId.FENNEL_SEEDS],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.CHICKPEAS,
    proteinSource: ProteinSourceTag.PORK,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
