import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const honeyGarlicChickenSkewers: Meal = {
  id: "salmon-poke-plate",
  name: "Salmon poke plate",
  imageUrl: "./img-meals/salmon-poke-plate.jpg",
  tools: ["1 bowl", "Pot", "Pan", "Spatula", "Steaming basket"],
  steps: {
    prep: [
      "Chop carrots into thin strips",
      "Chop flat beans into small pieces",
      "Chop tenderstem broccoli into small pieces",
      "Prepare marinade in bowl",
    ],
    cook: [
      "Put rice in water",
      "Once the water is boiling, add veg in their steaming basket",
      "Sear salmon in pan with sesame oil and soy sauce",
      "Plate, and pour marinade over the veg with some sesame seeds",
    ],
  },
  ingredients: [IngredientId.SALMON, IngredientId.RICE, IngredientId.CARROTS, IngredientId.FLAT_BEANS, IngredientId.TENDERSTEM_BROCCOLI],
  seasoning: [SeasoningStapleId.SOY_SAUCE, SeasoningStapleId.HONEY, SeasoningStapleId.GINGER, SeasoningStapleId.SESAME_OIL, SeasoningStapleId.SESAME_SEEDS, SeasoningStapleId.GARLIC_PASTE, SeasoningStapleId.TAHINI],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.RICE,
    proteinSource: ProteinSourceTag.FISH,
    convenience: [ConvenienceTag.FRIDGE_FRIENDLY],
  },
};
