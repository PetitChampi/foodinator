import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const pestoChickenGnocchi: Meal = {
  id: "pesto-chicken-gnocchi",
  name: "Pesto chicken gnocchi",
  imageUrl: "./img-meals/pesto-chicken-gnocchi.jpg",
  tools: ["Pan", "Spatula", "Mixer"],
  steps: {
    prep: [
      "Toast pine nuts",
      "Put pesto ingredients in mixer and blend until smooth",
    ],
    cook: [
      "Cook spinach in small pot",
      "Season and sear chicken in pan (5 min)",
      "Add gnocchi + some more seasoning to the pan, cook until golden",
      "Plate and top with pesto, spinach and grated parmesan",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.GNOCCHI, IngredientId.SPINACH, IngredientId.FRESH_BASIL, IngredientId.PINE_NUTS, IngredientId.PARMESAN],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.GARLIC_POWDER_MIX, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.GNOCCHI,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
