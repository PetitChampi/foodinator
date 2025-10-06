import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const panSearedLamb: Meal = {
  id: "lamb-and-potatoes",
  name: "Lamb and potatoes",
  imageUrl: "./img-meals/lamb-potatoes.jpg",
  tools: ["Pan", "Spatula", "Tongs", "1 plate", "Pot or air fryer for potatoes"],
  steps: {
    prep: [
      "Cut the potatoes into thin slices",
      "Put potatoes in air fryer, add seasoning",
      "Cut green veg into bite-sized pieces",
    ],
    cook: [
      "Start the air fryer",
      "Season lamb and add to pan",
      "Sear well, checking temperature, until desired doneness",
      "Place lamb on plate",
      "Add veg to pan and sauté until tender",
      "Plate and serve with air-fried potatoes",
    ],
  },
  ingredients: [IngredientId.LAMB, IngredientId.POTATOES, IngredientId.GREEN_VEG, IngredientId.MINT_SAUCE],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.LAMB,
    convenience: [],
  },
};
