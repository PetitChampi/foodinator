import React from 'react';
import { GroceryList } from '../GroceryList';
import { GroceryItem } from '../../models/types';

interface GroceryTabProps {
  groceryItems: GroceryItem[];
  onToggleItem: (ingredientId: string) => void;
  isEmpty: boolean;
  groupedByMeal: Map<string, GroceryItem[]>;
  notes: string;
  onUpdateNotes: (notes: string) => void;
}

export const GroceryTab: React.FC<GroceryTabProps> = ({
  groceryItems,
  onToggleItem,
  isEmpty,
  groupedByMeal,
  notes,
  onUpdateNotes,
}) => {
  return (
    <div>
      <GroceryList
        groceryItems={groceryItems}
        onToggleItem={onToggleItem}
        isEmpty={isEmpty}
        groupedByMeal={groupedByMeal}
        notes={notes}
        onUpdateNotes={onUpdateNotes}
      />
    </div>
  );
};