import { Meal } from "@/models/types";
import { IngredientId, SeasoningStapleId } from "@/models/ingredients";
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export const burgers: Meal = {
  id: "burgers",
  name: "Burgers",
  imageUrl: "./img-meals/burgers.jpg",
  tools: ["Pan", "2 spatulas", "Cutting board"],
  steps: {
    prep: [
      "Cut potatoes into desired shape",
      "Put potatoes in air fryer, add seasoning",
      "Cut cheese into slices",
      "Cut lettuce if needed",
      "Cut any extra ingredients (e.g. onions) if needed",
      "Shape beef mince into patties",
    ],
    cook: [
      "Start the air fryer",
      "Season patties with salt and pepper",
      "Put patties in pan",
      "Toast buns",
      "When cooked enough, flip patties, add cheese slices on top",
      "Place sauce on bun bases",
      "Once cooked, place patties on buns",
      "Add lettuce and close burgers with bun tops",
      "Serve with air-fried potatoes",
    ],
  },
  ingredients: [IngredientId.BUNS, IngredientId.SAUCE, IngredientId.GROUND_BEEF, IngredientId.CHEESE, IngredientId.LETTUCE, IngredientId.POTATOES],
  seasoning: [SeasoningStapleId.BUTTER, SeasoningStapleId.BLACK_PEPPER, SeasoningStapleId.PAPRIKA_MIX],
  tags: {
    cookingMethod: CookingMethodTag.PAN,
    base: BaseTag.BREAD,
    proteinSource: ProteinSourceTag.BEEF,
    convenience: [ConvenienceTag.ONE_POT],
  },
};
