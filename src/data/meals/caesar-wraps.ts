import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const caesarWraps: Meal = {
  id: "caesar-wraps",
  name: "Caesar wraps",
  imageUrl: "./img-meals/caesar-wraps.jpg",
  tools: ["Pan", "Spatula", "2 plates", "1 large mixing bowl"],
  steps: {
    prep: [
      "Chop lettuce into smaller pieces if needed",
      "Mix lettuce with parmesan and dressing in large bowl",
      "Chop croutons if needed",
      "Place tortillas on plates",
    ],
    cook: [
      "Sear chicken (with paprika) in pan until cooked through",
      "Distribute lettuce and croutons onto tortillas",
      "Distribute chicken on top",
      "Fold tortillas",
    ],
  },
  ingredients: [IngredientId.LARGE_TORTILLAS, IngredientId.CHICKEN, IngredientId.LETTUCE, IngredientId.CROUTONS, IngredientId.PARMESAN, IngredientId.CAESAR_DRESSING],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.TORTILLAS,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.SANDWICH, ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
