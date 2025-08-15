import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const honeyGarlicChickenSkewers: Meal = {
  id: "honey-garlic-chicken-skewers",
  name: "Honey garlic chicken skewers",
  imageUrl: "./img-meals/chicken-skewers.jpg",
  tools: ["1 bowl (for marinade)", "1 large plate", "Skewers", "Grill"],
  steps: {
    prep: [
      "Cut the bell peppers into even chunks",
      "Cut the white onions into even chunks",
      "Prepare the marinade in a bowl",
      "Place chicken in marinade (and let it sit in the fridge if prepping in advance)",
    ],
    cook: [
      "Thread chicken, bell peppers, and onions onto skewers",
      "Place on grill (cook and turn occasionally until chicken is done)",
      "Boil pearl couscous in water",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.BELL_PEPPER, IngredientId.WHITE_ONION, IngredientId.PEARL_COUSCOUS],
  seasoning: [SeasoningStapleId.SOY_SAUCE, SeasoningStapleId.HONEY, SeasoningStapleId.GINGER, SeasoningStapleId.SESAME_OIL, SeasoningStapleId.SESAME_SEEDS, SeasoningStapleId.GARLIC_PASTE],
  tags: {
    cookingMethod: CookingMethodTag.GRILL,
    base: BaseTag.COUSCOUS,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [],
  },
};
