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
      "Cut chard into thin strips",
      "Cut peppers into thin slices",
    ],
    cook: [
      "Cook pork in pan with olive oil",
      "Remove pork and set aside in plate",
      "Add fennel seeds, chard and peppers to the pan for 2-3 minutes",
      "Add chickpeas and pork, cover, cook for another 10 minutes",
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
