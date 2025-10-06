import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const tunaGnocchi: Meal = {
  id: "tuna-gnocchi",
  name: "Tarragon tuna gnocchi",
  imageUrl: "./img-meals/tuna-gnocchi.jpg",
  tools: ["Pan", "Spatula"],
  steps: {
    prep: [
      "Chop cabbage into thin strips",
      "Chop spring onion into small pieces",
      "Prepare Greek yogurt sauce with tarragon, olive oil, salt, and pepper",
      "Mix in drained tuna",
    ],
    cook: [
      "Sear veg in pan with olive oil (2 min)",
      "Add gnocchi and cook until golden",
      "Once heat turned off, add tuna mixture and mix",
    ],
  },
  ingredients: [IngredientId.TUNA, IngredientId.GNOCCHI, IngredientId.SPRING_ONION, IngredientId.CABBAGE, IngredientId.GREEK_YOGURT],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.TARRAGON],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.GNOCCHI,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
