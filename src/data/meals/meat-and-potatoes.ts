import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag } from "@/models/tagDefinitions";

export const meatAndPotatoes: Meal = {
  id: "meat-and-potatoes",
  name: "Meat and potatoes",
  imageUrl: "./img-meals/meat-potatoes.jpg",
  tools: ["Pan", "Spatula", "Tongs", "1 plate", "Pot or air fryer for potatoes"],
  steps: {
    prep: [
      "Cut the potatoes into thin slices",
      "Put potatoes in air fryer, add seasoning",
      "Cut green veg into bite-sized pieces",
    ],
    cook: [
      "Start the air fryer",
      "Season meat and add to pan",
      "Sear well, checking temperature, until desired doneness",
      "Place meat on plate",
      "Add veg to pan and sauté until tender",
      "Plate and serve with air-fried potatoes",
    ],
  },
  // Base ingredients shared across all variants
  ingredients: [IngredientId.POTATOES, IngredientId.GREEN_VEG],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.POTATOES,
    convenience: [],
  },
  variants: [
    { name: "Lamb", ingredients: [IngredientId.LAMB, IngredientId.MINT_SAUCE], proteinSourceTag: ProteinSourceTag.LAMB },
    { name: "Steak", ingredients: [IngredientId.STEAKS], proteinSourceTag: ProteinSourceTag.BEEF },
  ],
};
