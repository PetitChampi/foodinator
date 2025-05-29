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

  // Render a single grocery item
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
            {ingredient.name} <strong>({item.portions})</strong>
          </label>
        </div>
      </li>
    );
  };

  return (
    <div className="card">
      <div className="flex-between">
        <h2 className="card-title">Grocery List</h2>
        {!isEmpty && (
          <div className="form-group" style={{ margin: 0, display: 'flex', gap: '10px' }}>
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'portions' | 'meal')}
              style={{ width: 'auto' }}
            >
              <option value="name">Sort by Name</option>
              <option value="portions">Sort by Quantity</option>
              <option value="meal">Group by Meal</option>
            </select>
            <button 
              className="btn btn-sm" 
              onClick={() => setShowChecked(!showChecked)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {showChecked ? 'Hide Checked' : 'Show All'}
            </button>
          </div>
        )}
      </div>

      {isEmpty ? (
        <p>Your grocery list will appear here once you select meals for your weekly plan.</p>
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
                  <div key={mealId} style={{ margin: '20px 0' }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '5px',
                      marginBottom: '10px'
                    }}>
                      {meal.name}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {mealItems.map(renderGroceryItem)}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            // Regular list view
            <div style={{ marginTop: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {sortedItems.map(renderGroceryItem)}
              </ul>
            </div>
          )}
          
          {/* Notes section */}
          <div className="grocery-notes" style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Notes</h3>
            <textarea
              className="form-control"
              value={notes}
              onChange={(e) => onUpdateNotes && onUpdateNotes(e.target.value)}
              placeholder="Add notes for your grocery list here..."
              rows={4}
              style={{ width: '100%', resize: 'vertical' }}
              maxLength={1000}
            />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-color)', opacity: 0.7, marginTop: '5px', textAlign: 'right' }}>
              {notes.length}/1000 characters
            </div>
          </div>
        </>
      )}
    </div>
  );
};
