import { Ingredient, Meal } from './types';

export const ingredients: Ingredient[] = [
  { id: 'chicken', name: 'Chicken' },
  { id: 'broccoli', name: 'Broccoli' },
  { id: 'mushrooms', name: 'Mushrooms' },
  { id: 'creme-fraiche', name: 'Creme fraiche' },
  { id: 'rice', name: 'Rice' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'tomato-sauce', name: 'Tomato sauce' },
  { id: 'ground-beef', name: 'Ground beef' },
  { id: 'diced-beef', name: 'Diced beef' },
  { id: 'steaks', name: 'Steaks' },
  { id: 'white-beans', name: 'White beans' },
  { id: 'black-beans', name: 'Black beans' },
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
  { id: 'parmesan', name: 'Parmesan' },
  { id: 'grana-padano', name: 'Grana Padano' },
  { id: 'lardons', name: 'Lardons' },
  { id: 'asparagus', name: 'Asparagus' },
  { id: 'white-wine', name: 'White wine' },
  { id: 'chillis', name: 'Chillis' },
  { id: 'shallots', name: 'Shallots' },
  { id: 'lamb', name: 'Lamb' },
  { id: 'new-potatoes', name: 'Lamb' },
  { id: 'frozen-peas', name: 'Frozen peas' },
  { id: 'fresh-basil', name: 'Fresh basil' },
  { id: 'yellow-pepper', name: 'Yellow pepper paste' },
];

export const meals: Meal[] = [
  {
    id: 'creamy-chic-broc',
    name: 'Creamy Chic Broc',
    ingredients: ['chicken', 'broccoli', 'mushrooms', 'creme-fraiche', 'rice'],
  },
  {
    id: 'pasta-bolognese',
    name: 'Pasta bolognese',
    ingredients: ['pasta', 'tomato-sauce', 'ground-beef'],
  },
  {
    id: 'pasta-carbonara',
    name: 'Pasta carbonara',
    ingredients: ['pasta', 'eggs', 'grana-padano', "parmesan", 'lardons', 'mushrooms'],
  },
  {
    id: 'fishy-pasta',
    name: 'Fishy pasta',
    ingredients: ['pasta', 'fish', 'creme-fraiche', "shallots", 'asparagus', 'white-wine'],
  },
  {
    id: 'epic-beans-and-steak',
    name: 'Epic beans and steak',
    ingredients: ['steaks', 'white-beans', 'mushrooms', 'garlic', 'fresh-rosemary'],
  },
  {
    id: 'all-day-mexican-breakfast',
    name: 'All day Mexican breakfast',
    ingredients: ['eggs', 'black-beans', 'avocados', 'chillis', 'lime', 'diced-beef'],
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
  {
    id: 'pan-seared-lamb',
    name: 'Pan-seared lamb',
    ingredients: ['lamb', 'new-potatoes', 'frozen-peas', 'fresh-basil', 'yellow-pepper'],
  },
];

export const getIngredientById = (id: string): Ingredient | null => {
  return ingredients.find(ingredient => ingredient.id === id) || null;
};

export const getMealById = (id: string): Meal | null => {
  return meals.find(meal => meal.id === id) || null;
};
