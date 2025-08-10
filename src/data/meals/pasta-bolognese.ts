import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const pastaBolognese: Meal = {
  id: "pasta-bolognese",
  name: "Pasta bolognese",
  imageUrl: "./img-meals/pasta-bolognese.jpg",
  tools: ["Pot", "Pan", "Spatula"],
  steps: {
    prep: [
      "channel your inner Italian grandmother",
      "convince tomatoes to become sauce",
      "teach beef to tango with pasta",
    ],
    cook: [
      "achieve perfect al dente through meditation",
      "master the art of sauce harmony",
      "serve with Italian passion",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.TOMATO_SAUCE, IngredientId.GROUND_BEEF],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.POT_PAN,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT, ConvenienceTag.FRIDGE_FRIENDLY, ConvenienceTag.BATCHABLE],
  },
};
