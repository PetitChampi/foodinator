import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const pastaBolognese: Meal = {
  id: "pasta-bolognese",
  name: "Pasta bolognese",
  imageUrl: "./img-meals/pasta-bolognese.jpg",
  tools: ["Pot", "Pan", "Spatula"],
  steps: {
    prep: [],
    cook: [
      "Put pasta in boiling water",
      "Place beef mince in pan with seasoning, dividing it into small pieces",
      "Once pasta is cooked, drain it and add the sauce and meat",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.TOMATO_SAUCE, IngredientId.GROUND_BEEF],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.BATCHABLE],
  },
};
