import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const prosciuttoMozzaFocaccia: Meal = {
  id: "prosciutto-mozza-foccacia",
  name: "Prosciutto & mozzarella focaccia",
  imageUrl: "./img-meals/prosciutto-mozza-focaccia.jpg",
  tools: ["2 large plates (for assembly)", "1 small plate (for cutting cheese)"],
  steps: {
    prep: [
      "Slice mozzarella into medium slices",
      "Grind pistacchios if whole",
      "Slice bread in half",
    ],
    cook: [
      "Distribute mozzarella on bottom half of bread",
      "Top with pistachios, pepper, balsamic glaze, prosciutto, then rocket",
      "Close sandwich and serve",
    ],
  },
  ingredients: [IngredientId.PROSCIUTTO, IngredientId.FOCACCIA, IngredientId.MOZZARELLA, IngredientId.ROCKET, IngredientId.PISTACHIOS],
  seasoning: [SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.BALSAMIC_VINEGAR],
  tags: {
    cookingMethod: CookingMethodTag.NO_COOK,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.PORK,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
