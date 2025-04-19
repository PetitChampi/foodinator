import { Ingredient, Meal } from './types';

// Define all ingredients
export const ingredients: Ingredient[] = [
  { id: 'chicken', name: 'Chicken' },
  { id: 'broccoli', name: 'Broccoli' },
  { id: 'mushrooms', name: 'Mushrooms' },
  { id: 'creme-fraiche', name: 'Creme fraiche' },
  { id: 'rice', name: 'Rice' },
  { id: 'full-grain-pasta', name: 'Full grain pasta' },
  { id: 'tomato-sauce', name: 'Tomato sauce' },
  { id: 'ground-beef', name: 'Ground beef' },
  { id: 'steaks', name: 'Steaks' },
  { id: 'white-beans', name: 'White beans' },
  { id: 'garlic', name: 'Garlic' },
  { id: 'fresh-rosemary', name: 'Fresh rosemary' },
  { id: 'brown-bread', name: 'Brown bread' },
  { id: 'avocados', name: 'Avocados' },
  { id: 'lime', name: 'Lime' },
  { id: 'eggs', name: 'Eggs' },
  { id: 'fish', name: 'Fish' },
  { id: 'potatoes', name: 'Potatoes' },
  { id: 'shallots', name: 'Shallots' },
  { id: 'bell-pepper', name: 'Bell pepper' },
  { id: 'milk', name: 'Milk' },
];

// Define all meals with their ingredients
export const meals: Meal[] = [
  {
    id: 'creamy-chic-broc',
    name: 'Creamy Chic Broc',
    ingredients: ['chicken', 'broccoli', 'mushrooms', 'creme-fraiche', 'rice'],
  },
  {
    id: 'pasta-bolognese',
    name: 'Pasta bolognese',
    ingredients: ['full-grain-pasta', 'tomato-sauce', 'ground-beef'],
  },
  {
    id: 'epic-beans-and-steak',
    name: 'Epic beans and steak',
    ingredients: ['steaks', 'white-beans', 'mushrooms', 'garlic', 'fresh-rosemary'],
  },
  {
    id: 'avocado-toast',
    name: 'Avocado toast',
    ingredients: ['brown-bread', 'avocados', 'lime', 'eggs'],
  },
  {
    id: 'fish-n-mash',
    name: 'Fish n mash',
    ingredients: ['fish', 'potatoes', 'shallots', 'bell-pepper', 'milk'],
  },
];

// Helper function to get ingredient by ID
export const getIngredientById = (id: string): Ingredient | undefined => {
  return ingredients.find(ingredient => ingredient.id === id);
};

// Helper function to get meal by ID
export const getMealById = (id: string): Meal | undefined => {
  return meals.find(meal => meal.id === id);
};
