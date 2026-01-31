import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const koftaStyleLambWraps: Meal = {
  id: "kofta-style-lamb-wraps",
  name: "Kofta style lamb wraps",
  imageUrl: "./img-meals/kofta-lamb-wraps.jpg",
  tools: ["2 plates (for assembly)", "1 mixing bowl"],
  steps: {
    prep: [
      "Chop mint finely",
      "Mix mint with yogurt, olive oil, lemon juice, salt and black pepper",
      "Mix salad with sauce",
      "Slice peppers into thin strips",
    ],
    cook: [
      "Cook lamb and peppers together",
      "Stuff the flatbread with ingredients",
    ],
  },
  ingredients: [IngredientId.LAMB, IngredientId.PITA_BREAD, IngredientId.LETTUCE, IngredientId.BELL_PEPPER, IngredientId.GREEK_YOGURT],
  seasoning: [SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.MINT, SeasoningStapleId.GARLIC_PASTE, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BLACK_PEPPER],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.LAMB,
    convenience: [ConvenienceTag.SANDWICH],
  },
};
