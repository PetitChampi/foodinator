import React, { useState } from 'react';
import { GroceryItem } from '../models/types';
import { getIngredientById, getMealById } from '../models/data';

interface GroceryListProps {
  groceryItems: GroceryItem[];
  onToggleItem: (ingredientId: string) => void;
  isEmpty: boolean;
  groupedByMeal?: Map<string, GroceryItem[]>;
  notes?: string;
  onUpdateNotes?: (notes: string) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  groceryItems,
  onToggleItem,
  isEmpty,
  groupedByMeal,
  notes = '',
  onUpdateNotes,
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'portions' | 'meal'>('meal');
  const [showChecked, setShowChecked] = useState(true);

  // Filter items based on checked status if needed
  const filteredItems = showChecked 
    ? groceryItems 
    : groceryItems.filter(item => !item.checked);

  // Sort grocery items based on the selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = getIngredientById(a.ingredientId)?.name || '';
      const nameB = getIngredientById(b.ingredientId)?.name || '';
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'portions') {
      return b.portions - a.portions; // Sort by portions in descending order
    } else {
      // For meal sorting, we'll handle this differently in the render
      return 0;
    }
  });

  const renderGroceryItem = (item: GroceryItem) => {
    const ingredient = getIngredientById(item.ingredientId);
    if (!ingredient) return null;

    return (
      <li key={item.ingredientId}>
        <div className={`checkbox-container ${item.checked ? 'checked' : ''}`}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onToggleItem(item.ingredientId)}
            id={`ingredient-${item.ingredientId}`}
          />
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
          <select
            className="form-control select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'portions' | 'meal')}
          >
            <option value="name">Sort by Name</option>
            <option value="portions">Sort by Quantity</option>
            <option value="meal">Group by Meal</option>
          </select>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setShowChecked(!showChecked)}
          >
            {showChecked ? 'Hide checked' : 'Show All'}
          </button>
        </div>
      )}

      {isEmpty ? (
        <div className="empty">Your grocery list will appear here once you select meals for your weekly plan.</div>
      ) : (
        <>
          {sortBy === 'meal' && groupedByMeal ? (
            // Group by meal view
            <div>
              {Array.from(groupedByMeal.entries()).map(([mealId, items]) => {
                if (items.length === 0) return null;
                
                // Filter out checked items if needed
                const mealItems = showChecked 
                  ? items 
                  : items.filter(item => !item.checked);
                  
                if (mealItems.length === 0) return null;
                
                const meal = getMealById(mealId);
                if (!meal) return null;
                
                return (
                  <div key={mealId} className="grocery-section">
                    <h3 className="grocery-section__title">
                      {meal.name}
                    </h3>
                    <ul className="grocery-section__list">
                      {mealItems.map(renderGroceryItem)}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            // Regular list view
            <div className="grocery-section">
              <ul className="grocery-section__list">
                {sortedItems.map(renderGroceryItem)}
              </ul>
            </div>
          )}
        </>
      )}
      {/* Notes section */}
      <div className="grocery-notes">
        <h3 className="grocery-notes__title">Notes</h3>
        <textarea
          className="form-control"
          value={notes}
          onChange={(e) => onUpdateNotes && onUpdateNotes(e.target.value)}
          placeholder="Add notes for your grocery list here..."
          rows={4}
          maxLength={1000}
        />
        <div className="grocery-notes__counter">
          {notes.length}/1000
        </div>
      </div>
    </section>
  );
};
