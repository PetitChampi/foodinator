import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const lambHot: Meal = {
  id: "lamb-hotpot",
  name: "Lamb hotpot",
  imageUrl: "./img-meals/lamb-hotpot.jpg",
  tools: ["Oven dish(es)"],
  steps: {
    prep: [
      "Preheat the oven to 200°C",
      "Cut the onion, green veg and parsnips into bite-sized pieces",
      "Cut the potatoes into thin slices",
      "Chop the lamb into bite-sized pieces",
      "Place the lamb and veg in the oven dish(es)",
      "Season with salt, pepper, olive oil and mint sauce, then mix",
      "Place the potato slices on top, season with salt, pepper and olive oil",
      "Bonus: add a tiny bit of butter and/or honey to counteract acidity of mint sauce",
    ],
    cook: [
      "Cook in the oven for 40 minutes",
    ],
  },
  ingredients: [IngredientId.LAMB, IngredientId.POTATOES, IngredientId.GREEN_VEG, IngredientId.PARSNIPS, IngredientId.MINT_SAUCE, IngredientId.WHITE_ONION],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.OVEN,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.LAMB,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
