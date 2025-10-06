import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const pistacchioGnocchi: Meal = {
  id: "pistachio-pesto-gnocchi",
  name: "Pistachio pesto gnocchi",
  imageUrl: "./img-meals/pistachio-pesto-gnocchi.jpg",
  tools: ["Pan", "Spatula", "Mixer", "Fork"],
  steps: {
    prep: [
      "Tear basil and spinach into smaller pieces",
      "Toast pistachios (if untoasted)",
      "Put basil, spinach, pistachios, dill, garlic, parmesan, honey, lemon zest and lemon juice in mixer",
      "Mix until roughly chopped",
      "Add ricotta, olive oil, salt and pepper, and mix with fork",
    ],
    cook: [
      "Sear gnocchi in pan with butter and olive oil until golden",
      "Lower heat, add ricotta to pan and mix well (1 min)",
      "Plate gnocchi, top with pesto",
    ],
  },
  ingredients: [IngredientId.PISTACHIOS, IngredientId.GNOCCHI, IngredientId.SPINACH, IngredientId.FRESH_BASIL, IngredientId.RICOTTA, IngredientId.PARMESAN, IngredientId.HONEY, IngredientId.LEMON],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.DILL, SeasoningStapleId.GARLIC_PASTE],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.GNOCCHI,
    proteinSource: ProteinSourceTag.VEGETARIAN,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
