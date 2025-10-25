import { RestockCategory } from "@/store/types";

// Default restock categories - add new items here and they'll automatically merge with existing user data
export const DEFAULT_RESTOCK_CATEGORIES: RestockCategory[] = [
  {
    name: "Dog supplies",
    emoji: "🐶",
    items: ["Dog food", "Poo bags"],
  },
  {
    name: "Food",
    emoji: "🥕",
    items: ["Brown pasta", "Pasta sauce", "Risotto rice", "Bananas", "Cereal", "Milk"],
  },
  {
    name: "Cleaning",
    emoji: "🧽",
    items: ["Detergent", "Fabric conditioner", "Surface cleaner", "Cillit Bang", "Dishwasher tablets", "Dishwasher salt"],
  },
  {
    name: "Personal hygiene",
    emoji: "🧼",
    items: ["Shampoo", "Face wash", "Cotton pads", "Toothpaste"],
  },
];
