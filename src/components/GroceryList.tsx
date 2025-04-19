import React, { useState } from 'react';
import { GroceryItem } from '../models/types';
import { getIngredientById } from '../models/data';

interface GroceryListProps {
  groceryItems: GroceryItem[];
  onToggleItem: (ingredientId: string) => void;
  isEmpty: boolean;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  groceryItems,
  onToggleItem,
  isEmpty,
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'portions'>('name');

  // Sort grocery items based on the selected sort option
  const sortedItems = [...groceryItems].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = getIngredientById(a.ingredientId)?.name || '';
      const nameB = getIngredientById(b.ingredientId)?.name || '';
      return nameA.localeCompare(nameB);
    } else {
      return b.portions - a.portions; // Sort by portions in descending order
    }
  });

  return (
    <div className="card">
      <div className="flex-between">
        <h2 className="card-title">Grocery List</h2>
        {!isEmpty && (
          <div className="form-group" style={{ margin: 0 }}>
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'portions')}
              style={{ width: 'auto' }}
            >
              <option value="name">Sort by Name</option>
              <option value="portions">Sort by Quantity</option>
            </select>
          </div>
        )}
      </div>

      {isEmpty ? (
        <p>Your grocery list will appear here once you select meals for your weekly plan.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sortedItems.map((item) => {
              const ingredient = getIngredientById(item.ingredientId);
              if (!ingredient) return null;

              return (
                <li key={item.ingredientId}>
                  <div
                    className={`checkbox-container ${item.checked ? 'checked' : ''}`}
                    onClick={() => onToggleItem(item.ingredientId)}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}} // Handled by the onClick on the container
                      id={`ingredient-${item.ingredientId}`}
                    />
                    <label htmlFor={`ingredient-${item.ingredientId}`}>
                      {ingredient.name} <strong>({item.portions})</strong>
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
