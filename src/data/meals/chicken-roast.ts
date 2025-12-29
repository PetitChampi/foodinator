import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const chickenRoast: Meal = {
  id: "chicken-roast",
  name: "Chicken roast",
  imageUrl: "./img-meals/chicken-roast.jpg",
  tools: ["Roasting tin", "Large bowl"],
  steps: {
    prep: [
      "Preheat the oven to 200°C (400°F)",
      "Cut the carrots and parsnips into thin stips",
      "Halve the baby potatoes",
    ],
    cook: [
      "Season the chicken with salt, pepper, rosemary and olive oil, and put it in the oven for 20 min",
      "Mix the veg with olive oil, salt, pepper, and rosemary",
      "Add the veg to the roasting tin with the chicken, drizzle with lemon juice, cook for another 20 min",
      "Put the bacon on top of the chicken, and cook for another 20 min",
    ],
  },
  ingredients: [IngredientId.CHICKEN, IngredientId.POTATOES, IngredientId.CARROTS, IngredientId.PARSNIPS, IngredientId.ROSEMARY, IngredientId.BACON, IngredientId.GREEN_VEG],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.LEMON_JUICE],
  tags: {
    cookingMethod: CookingMethodTag.OVEN,
    base: BaseTag.POTATOES,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.BATCHABLE, ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
