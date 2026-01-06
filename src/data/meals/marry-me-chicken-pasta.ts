import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const marryMeChickenPasta: Meal = {
  id: "marry-me-chicken-pasta",
  name: "Marry-me chicken pasta",
  imageUrl: "./img-meals/marry-me-chicken-pasta.jpg",
  tools: ["Large pot", "Smaller pot (for stock)", "Metal spatula"],
  steps: {
    prep: [],
    cook: [
      "Sear chicken in large pot until golden",
      "Boil chicken stock in smaller pot",
      "Add canned tomatoes, chicken broth, and seasonings; simmer to make sauce",
      "Add pasta and stock, cook with lid on until al dente",
      "Cut the heat, stir in spinach and crème fraîche",
    ],
  },
  ingredients: [IngredientId.PASTA, IngredientId.CHICKEN, IngredientId.CANNED_TOMATOES, IngredientId.CHICKEN_BROTH, IngredientId.PARMESAN, IngredientId.SPINACH, IngredientId.CREME_FRAICHE],
  seasoning: [SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.PAPRIKA, SeasoningStapleId.GARLIC_POWDER_MIX, SeasoningStapleId.OREGANO],
  tags: {
    cookingMethod: CookingMethodTag.POT,
    base: BaseTag.PASTA,
    proteinSource: ProteinSourceTag.CHICKEN,
    convenience: [ConvenienceTag.ONE_POT],
  },
};
