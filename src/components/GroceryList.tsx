import React, { useState, useEffect, useMemo } from 'react';
import { GroceryItem } from '../models/types';
import { getIngredientById, getMealById } from '../models/data';
import { useFoodinatorStore } from '../store/useFoodinatorStore';
import { useDebounce } from '../hooks/useDebounce';

export const GroceryList: React.FC = () => {
  const mealOrder = useFoodinatorStore(state => state.mealOrder);
  const checkedItems = useFoodinatorStore(state => state.checkedItems);
  const notes = useFoodinatorStore(state => state.notes);
  const toggleItemChecked = useFoodinatorStore(state => state.toggleItemChecked);
  const updateNotes = useFoodinatorStore(state => state.updateNotes);
  
  const { items, isEmpty, groupedByMeal } = useMemo(() => {
    const ingredientPortions = new Map<string, number>();
    mealOrder.forEach(mealId => {
      if (!mealId) return;
      const meal = getMealById(mealId);
      if (!meal) return;

      meal.ingredients.forEach(ingredientId => {
        const currentPortions = ingredientPortions.get(ingredientId) || 0;
        ingredientPortions.set(ingredientId, currentPortions + 1);
      });
    });

    if (ingredientPortions.size === 0) {
      return { items: [], isEmpty: true, groupedByMeal: new Map() };
    }

    const allItems: GroceryItem[] = Array.from(ingredientPortions.entries()).map(([id, portions]) => ({
      ingredientId: id,
      portions,
      checked: checkedItems[id] || false,
    }));

    const groupedByMeal = new Map<string, GroceryItem[]>();
    const assignedIngredients = new Set<string>();

    const uniqueMealsInOrder = [...new Set(mealOrder.filter(id => id !== null) as string[])];

    uniqueMealsInOrder.forEach(mealId => {
      const meal = getMealById(mealId);
      if (!meal) return;

      const mealGroupItems: GroceryItem[] = [];
      meal.ingredients.forEach(ingredientId => {
        if (ingredientPortions.has(ingredientId) && !assignedIngredients.has(ingredientId)) {
          mealGroupItems.push({
            ingredientId: ingredientId,
            portions: ingredientPortions.get(ingredientId)!,
            checked: checkedItems[ingredientId] || false,
          });
          assignedIngredients.add(ingredientId);
        }
      });

      if (mealGroupItems.length > 0) {
        groupedByMeal.set(mealId, mealGroupItems);
      }
    });

    return {
      items: allItems,
      isEmpty: allItems.length === 0,
      groupedByMeal,
    };
  }, [mealOrder, checkedItems]);
  
  const [sortBy, setSortBy] = useState<'name' | 'portions' | 'meal'>('meal');
  const [showChecked, setShowChecked] = useState(true);
  
  const [localNotes, setLocalNotes] = useState(notes);
  const debouncedNotes = useDebounce(localNotes, 500);

  useEffect(() => {
    updateNotes(debouncedNotes);
  }, [debouncedNotes, updateNotes]);

  useEffect(() => {
    if (notes !== localNotes) {
      setLocalNotes(notes);
    }
  }, [notes]);

  const filteredItems = showChecked ? items : items.filter(item => !item.checked);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = getIngredientById(a.ingredientId)?.name || '';
      const nameB = getIngredientById(b.ingredientId)?.name || '';
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'portions') {
      return b.portions - a.portions;
    }
    return 0;
  });

  const renderGroceryItem = (item: GroceryItem) => {
    const ingredient = getIngredientById(item.ingredientId);
    if (!ingredient) return null;
    return (
      <li key={`${item.ingredientId}`}>
        <div className={`checkbox-container ${item.checked ? 'checked' : ''}`}>
          <input type="checkbox" checked={item.checked} onChange={() => toggleItemChecked(item.ingredientId)} id={`ingredient-${item.ingredientId}`} />
          <label htmlFor={`ingredient-${item.ingredientId}`}>
            {ingredient.name}
            {item.portions > 1 && (<span className="badge badge-neutral">{item.portions}</span>)}
          </label>
        </div>
      </li>
    );
  };

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Groceries</h2>
      </div>
      {!isEmpty && (
        <div className="controls-group">
          <select className="form-control select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'portions' | 'meal')}>
            <option value="meal">Group by Meal</option>
            <option value="name">Sort by Name</option>
            <option value="portions">Sort by Quantity</option>
          </select>
          <button className="btn btn-sm btn-secondary" onClick={() => setShowChecked(!showChecked)}>
            {showChecked ? 'Hide checked' : 'Show All'}
          </button>
        </div>
      )}
      {isEmpty ? (
        <div className="empty">Your grocery list will appear here once you select meals.</div>
      ) : (
        <>
          {sortBy === 'meal' && groupedByMeal ? (
            <div>
              {Array.from(groupedByMeal.entries()).map(([mealId, mealItems]) => {
                const filteredMealItems = showChecked ? mealItems : mealItems.filter((item: GroceryItem) => !item.checked);
                if (filteredMealItems.length === 0) return null;
                const meal = getMealById(mealId);
                if (!meal) return null;
                return (
                  <div key={mealId} className="grocery-section">
                    <h3 className="grocery-section__title">{meal.name}</h3>
                    <ul className="grocery-section__list">
                      {filteredMealItems.map(renderGroceryItem)}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grocery-section">
              <ul className="grocery-section__list">
                {sortedItems.map(renderGroceryItem)}
              </ul>
            </div>
          )}
        </>
      )}
      <div className="grocery-notes">
        <h3 className="grocery-notes__title">Notes</h3>
        <textarea className="form-control" value={localNotes} onChange={(e) => setLocalNotes(e.target.value)} placeholder="Add notes for your grocery list here..." rows={4} maxLength={1000} />
        <div className="grocery-notes__counter">
          {localNotes.length}/1000
        </div>
      </div>
    </section>
  );
};