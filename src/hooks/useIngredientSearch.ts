import { useState, useMemo, useCallback, useEffect } from 'react';
import { ingredients } from '../models/data';
import { meals } from '../models/data';

const STORAGE_KEY = 'foodinator_selected_ingredients';

export const useIngredientSearch = () => {
  // Load selected ingredients from localStorage
  const loadSelectedIngredients = (): string[] => {
    const savedIngredients = localStorage.getItem(STORAGE_KEY);
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(loadSelectedIngredients);

  // Save selected ingredients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  // Filter ingredients based on search term
  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return ingredients.filter(
      (ingredient) =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedIngredients.includes(ingredient.id)
    );
  }, [searchTerm, selectedIngredients]);

  // Find meals that contain all selected ingredients
  const matchingMeals = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    return meals.filter((meal) =>
      selectedIngredients.every((ingredientId) =>
        meal.ingredients.includes(ingredientId)
      )
    );
  }, [selectedIngredients]);

  // Add an ingredient to the selected list
  const addIngredient = useCallback((ingredientId: string) => {
    setSelectedIngredients((prev) => [...prev, ingredientId]);
    setSearchTerm(''); // Clear search term after selection
  }, []);

  // Remove an ingredient from the selected list
  const removeIngredient = useCallback((ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((id) => id !== ingredientId)
    );
  }, []);

  // Clear all selected ingredients
  const clearIngredients = useCallback(() => {
    setSelectedIngredients([]);
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedIngredients,
    filteredIngredients,
    matchingMeals,
    addIngredient,
    removeIngredient,
    clearIngredients,
  };
};
