import { Meal } from "./types";
import { IngredientId, SeasoningStapleId } from "./ingredients";

export const meals: Meal[] = [
  {
    id: "creamy-chic-broc",
    name: "Creamy Chic Broc",
    imageUrl: "./img-meals/chic-broc.jpg",
    ingredients: [IngredientId.CHICKEN, IngredientId.BROCCOLI, IngredientId.MUSHROOMS, IngredientId.CREME_FRAICHE, IngredientId.RICE],
    tags: {
      cookingMethod: "pot-pan",
      base: "rice",
      proteinSource: "chicken",
      convenience: ["batchable", "fridge-friendly"],
    },
  },
  {
    id: "fishy-pasta",
    name: "Fishy pasta",
    imageUrl: "./img-meals/fishy-pasta.jpg",
    ingredients: [IngredientId.PASTA, IngredientId.FISH, IngredientId.CREME_FRAICHE, IngredientId.SHALLOTS, IngredientId.ASPARAGUS, IngredientId.WHITE_WINE, IngredientId.LEMON],
    tags: {
      cookingMethod: "pot-pan",
      base: "pasta",
      proteinSource: "fish",
      convenience: [],
    },
  },
  {
    id: "epic-beans-and-steak",
    name: "Epic beans and steak",
    imageUrl: "./img-meals/epic-beans-steak.jpg",
    ingredients: [IngredientId.STEAKS, IngredientId.WHITE_BEANS, IngredientId.MUSHROOMS, IngredientId.GARLIC, IngredientId.ROSEMARY],
    tags: {
      cookingMethod: "pan",
      base: "beans",
      proteinSource: "beef",
      convenience: ["one-pot"],
    },
  },
  {
    id: "mexican-style-bean-casserole",
    name: "Mexican-style bean casserole",
    imageUrl: "./img-meals/mex-bean-casserole.jpg",
    ingredients: [IngredientId.EGGS, IngredientId.BLACK_BEANS, IngredientId.AVOCADOS, IngredientId.BELL_PEPPER, IngredientId.LIME, IngredientId.DICED_BEEF],
    tags: {
      cookingMethod: "pan",
      base: "beans",
      proteinSource: "beef",
      convenience: ["one-pot", "batchable", "fridge-friendly"],
    },
  },
  {
    id: "avocado-toast",
    name: "Avocado toast",
    imageUrl: "./img-meals/avocado-toasts.jpg",
    ingredients: [IngredientId.BROWN_BREAD, IngredientId.AVOCADOS, IngredientId.LIME, IngredientId.EGGS, IngredientId.HUMMUS, IngredientId.MINT_SAUCE],
    tags: {
      cookingMethod: "pot",
      base: "bread",
      proteinSource: "eggs",
      convenience: ["one-pot"],
    },
  },
  {
    id: "burgers",
    name: "Burgers",
    imageUrl: "./img-meals/burgers.jpg",
    ingredients: [IngredientId.BUNS, IngredientId.SAUCE, IngredientId.GROUND_BEEF, IngredientId.CHEESE, IngredientId.LETTUCE, IngredientId.POTATOES],
    tags: {
      cookingMethod: "pan",
      base: "bread",
      proteinSource: "beef",
      convenience: ["one-pot"],
    },
  },
  {
    id: "chickpea-chard-pork",
    name: "Chickpea chard pork",
    imageUrl: "./img-meals/chickpea-chard-pork.jpg",
    ingredients: [IngredientId.PORK_FILLET, IngredientId.CHICKPEAS, IngredientId.CHARD, IngredientId.PICKLED_PEPPERS, IngredientId.FENNEL_SEEDS],
    tags: {
      cookingMethod: "pan",
      base: "chickpeas",
      proteinSource: "pork",
      convenience: ["one-pot", "batchable", "fridge-friendly"],
    },
  },
  {
    id: "pesto-chicken-gnocchi",
    name: "Pesto chicken gnocchi",
    imageUrl: "./img-meals/pesto-chicken-gnocchi.jpg",
    ingredients: [IngredientId.CHICKEN, IngredientId.GNOCCHI, IngredientId.SPINACH, IngredientId.FRESH_BASIL, IngredientId.PINE_NUTS, IngredientId.PARMESAN],
    tags: {
      cookingMethod: "pan",
      base: "gnocchi",
      proteinSource: "chicken",
      convenience: ["one-pot", "fridge-friendly"],
    },
  },
  {
    id: "pasta-bolognese",
    name: "Pasta bolognese",
    imageUrl: "./img-meals/pasta-bolognese.jpg",
    ingredients: [IngredientId.PASTA, IngredientId.TOMATO_SAUCE, IngredientId.GROUND_BEEF],
    tags: {
      cookingMethod: "pot",
      base: "pasta",
      proteinSource: "beef",
      convenience: ["one-pot", "fridge-friendly", "batchable"],
    },
  },
  {
    id: "pasta-carbonara",
    name: "Pasta carbonara",
    imageUrl: "./img-meals/pasta-carbonara.jpg",
    ingredients: [IngredientId.PASTA, IngredientId.EGGS, IngredientId.GRANA_PADANO, IngredientId.PARMESAN, IngredientId.LARDONS, IngredientId.MUSHROOMS],
    tags: {
      cookingMethod: "pot-pan",
      base: "pasta",
      proteinSource: "pork",
      convenience: [],
    },
  },
  {
    id: "fish-n-mash",
    name: "Fish n mash",
    imageUrl: "./img-meals/fisn-n-mash.jpg",
    ingredients: [IngredientId.FISH, IngredientId.POTATOES, IngredientId.SHALLOTS, IngredientId.BELL_PEPPER, IngredientId.MILK],
    tags: {
      cookingMethod: "pot-pan",
      base: "potatoes",
      proteinSource: "fish",
      convenience: ["fridge-friendly"],
    },
  },
  {
    id: "pan-seared-lamb",
    name: "Pan-seared lamb",
    ingredients: [IngredientId.LAMB, IngredientId.POTATOES, IngredientId.GREEN_VEG, IngredientId.MINT_SAUCE],
    tags: {
      cookingMethod: "pot-pan",
      base: "potatoes",
      proteinSource: "lamb",
      convenience: [],
    },
  },
  {
    id: "prawn-burritos",
    name: "Prawn burritos",
    imageUrl: "./img-meals/prawn-burritos.jpg",
    ingredients: [IngredientId.PRAWNS, IngredientId.LARGE_TORTILLAS, IngredientId.AVOCADOS, IngredientId.TOMATO, IngredientId.RED_ONION, IngredientId.LIME, IngredientId.BEANS, IngredientId.SHREDDED_CHEESE],
    tags: {
      cookingMethod: "pan",
      base: "tortillas",
      proteinSource: "seafood",
      convenience: ["sandwich", "one-pot"],
    },
  },
  {
    id: "tuna-pita",
    name: "Tuna pita sandwiches",
    imageUrl: "./img-meals/tuna-pita.jpg",
    ingredients: [IngredientId.TUNA, IngredientId.PITA_BREAD, IngredientId.AVOCADOS, IngredientId.PICKLED_PEPPERS, IngredientId.FETA, IngredientId.GREEK_YOGURT],
    tags: {
      cookingMethod: "no-cook",
      base: "bread",
      proteinSource: "fish",
      convenience: ["sandwich", "fridge-friendly"],
    },
  },
  {
    id: "salmon-bagels",
    name: "Smoked salmon bagels",
    imageUrl: "./img-meals/salmon-bagels.jpg",
    ingredients: [IngredientId.SMOKED_SALMON, IngredientId.BAGELS, IngredientId.CREAM_CHEESE, IngredientId.RADISHES, IngredientId.SPINACH],
    seasoning: [SeasoningStapleId.DILL, SeasoningStapleId.LEMON_JUICE, SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.BLACK_PEPPER],
    tags: {
      cookingMethod: "no-cook",
      base: "bread",
      proteinSource: "fish",
      convenience: ["sandwich"],
    },
  },
  {
    id: "tom-mozza-bruschetta",
    name: "Tomato mozzarella bruschetta",
    imageUrl: "./img-meals/tom-mozza-bruschetta.jpg",
    ingredients: [IngredientId.BREAD, IngredientId.TOMATO, IngredientId.MOZZARELLA, IngredientId.FRESH_BASIL, IngredientId.PINE_NUTS, IngredientId.PARMESAN],
    seasoning: [SeasoningStapleId.BALSAMIC_VINEGAR, SeasoningStapleId.OLIVE_OIL, SeasoningStapleId.BLACK_PEPPER],
    tags: {
      cookingMethod: "no-cook",
      base: "bread",
      proteinSource: "vegetarian",
      convenience: ["sandwich"],
    },
  },
];

export const getMealById = (id: string): Meal | null => {
  return meals.find(meal => meal.id === id) || null;
};
