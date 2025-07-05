import { Ingredient, Meal } from './types';

export const ingredients: Ingredient[] = [
  { id: 'chicken', name: 'Chicken' },
  { id: 'lamb', name: 'Lamb' },
  { id: 'ground-beef', name: 'Ground beef' },
  { id: 'diced-beef', name: 'Diced beef' },
  { id: 'pork-fillet', name: 'Pork fillet' },
  { id: 'broccoli', name: 'Broccoli' },
  { id: 'mushrooms', name: 'Mushrooms' },
  { id: 'creme-fraiche', name: 'Creme fraiche' },
  { id: 'rice', name: 'Rice' },
  { id: 'chickpeas', name: 'Chickpeas' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'tomato-sauce', name: 'Tomato sauce' },
  { id: 'steaks', name: 'Steaks' },
  { id: 'white-beans', name: 'White beans' },
  { id: 'black-beans', name: 'Black beans' },
  { id: 'garlic', name: 'Garlic' },
  { id: 'rosemary', name: 'Rosemary' },
  { id: 'brown-bread', name: 'Brown bread' },
  { id: 'avocados', name: 'Avocados' },
  { id: 'hummus', name: 'Hummus' },
  { id: 'lime', name: 'Lime' },
  { id: 'lemon', name: 'Lemon' },
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
  { id: 'new-potatoes', name: 'New potatoes' },
  { id: 'green-veg', name: 'Green veg' },
  { id: 'mint-sauce', name: 'Mint sauce' },
  { id: 'pickled-peppers', name: 'Pickled peppers' },
  { id: 'fennel-seeds', name: 'Fennel seeds' },
  { id: 'cheese', name: 'Cheese' },
  { id: 'buns', name: 'Buns' },
  { id: 'sauce', name: 'Sauce' },
  { id: 'lettuce', name: 'Lettuce' },
  { id: 'chard', name: 'Chard' },
];

export const meals: Meal[] = [
  {
    id: 'creamy-chic-broc',
    name: 'Creamy Chic Broc',
    imageUrl: '/src/assets/img-meals/chic-broc.jpg',
    ingredients: ['chicken', 'broccoli', 'mushrooms', 'creme-fraiche', 'rice'],
  },
  {
    id: 'pasta-bolognese',
    name: 'Pasta bolognese',
    imageUrl: '/src/assets/img-meals/pasta-bolognese.jpg',
    ingredients: ['pasta', 'tomato-sauce', 'ground-beef'],
  },
  {
    id: 'pasta-carbonara',
    name: 'Pasta carbonara',
    imageUrl: '/src/assets/img-meals/pasta-carbonara.jpg',
    ingredients: ['pasta', 'eggs', 'grana-padano', "parmesan", 'lardons', 'mushrooms'],
  },
  {
    id: 'fishy-pasta',
    name: 'Fishy pasta',
    ingredients: ['pasta', 'fish', 'creme-fraiche', "shallots", 'asparagus', 'white-wine', 'lemon'],
  },
  {
    id: 'epic-beans-and-steak',
    name: 'Epic beans and steak',
    imageUrl: '/src/assets/img-meals/epic-beans-steak.jpg',
    ingredients: ['steaks', 'white-beans', 'mushrooms', 'garlic', 'rosemary'],
  },
  {
    id: 'mexican-style-bean-casserole',
    name: 'Mexican-style bean casserole',
    ingredients: ['eggs', 'black-beans', 'avocados', 'bell-pepper', 'lime', 'diced-beef'],
  },
  {
    id: 'avocado-toast',
    name: 'Avocado toast',
    imageUrl: '/src/assets/img-meals/avocado-toasts.jpg',
    ingredients: ['brown-bread', 'avocados', 'lime', 'eggs', 'hummus', 'mint-sauce'],
  },
  {
    id: 'fish-n-mash',
    name: 'Fish n mash',
    imageUrl: '/src/assets/img-meals/fisn-n-mash.jpg',
    ingredients: ['fish', 'potatoes', 'shallots', 'bell-pepper', 'milk'],
  },
  {
    id: 'pan-seared-lamb',
    name: 'Pan-seared lamb',
    ingredients: ['lamb', 'new-potatoes', 'green-veg', 'mint-sauce'],
  },
  {
    id: 'burgers',
    name: 'Burgers',
    imageUrl: '/src/assets/img-meals/burgers.jpg',
    ingredients: ['buns', 'sauce', 'ground-beef', 'cheese', 'lettuce', 'potatoes'],
  },
  {
    id: 'chickpea-chard-pork',
    name: 'Chickpea chard pork',
    imageUrl: '/src/assets/img-meals/chickpea-chard-pork.jpg',
    ingredients: ['pork-fillet', 'chickpeas', 'chard', 'pickled-peppers', 'fennel-seeds'],
  },
];

export const getIngredientById = (id: string): Ingredient | null => {
  return ingredients.find(ingredient => ingredient.id === id) || null;
};

export const getMealById = (id: string): Meal | null => {
  return meals.find(meal => meal.id === id) || null;
};
