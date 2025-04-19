import React, { useState } from 'react';
import { MealSelector } from './components/MealSelector';
import { WeeklyPlanDisplay } from './components/WeeklyPlanDisplay';
import { GroceryList } from './components/GroceryList';
import { IngredientSearch } from './components/IngredientSearch';
import { useWeeklyPlan } from './hooks/useWeeklyPlan';
import { useGroceryList } from './hooks/useGroceryList';
import { useIngredientSearch } from './hooks/useIngredientSearch';

function App() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'planner' | 'search'>('planner');

  // Initialize hooks
  const {
    weeklyPlan,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
  } = useWeeklyPlan();

  const {
    groceryList,
    toggleItemChecked,
    isEmpty,
  } = useGroceryList(weeklyPlan.selectedMeals);

  const {
    searchTerm,
    setSearchTerm,
    selectedIngredients,
    filteredIngredients,
    matchingMeals,
    addIngredient,
    removeIngredient,
    clearIngredients,
  } = useIngredientSearch();

  // Handle toggling grocery item checked state
  const handleToggleGroceryItem = (ingredientId: string) => {
    toggleItemChecked(ingredientId);
    // In a real app, we would update the state here
    // For this MVP, we're just calling the function without persisting the returned value
  };

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Foodinator</h1>
        <p className="app-subtitle">Weekly Meal & Grocery Planner</p>
      </header>

      <div className="container">
        {/* Tab Navigation */}
        <div className="tabs" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            className={`btn ${activeTab === 'planner' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('planner')}
            style={{ marginRight: '10px' }}
          >
            Meal Planner
          </button>
          <button
            className={`btn ${activeTab === 'search' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('search')}
          >
            Ingredient Search
          </button>
        </div>

        {/* Meal Planner Tab */}
        {activeTab === 'planner' && (
          <div>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h2>Plan Your Weekly Meals</h2>
              {weeklyPlan.selectedMeals.length > 0 && (
                <button className="btn btn-danger" onClick={resetPlan}>
                  Reset Plan
                </button>
              )}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <WeeklyPlanDisplay
                  selectedMeals={weeklyPlan.selectedMeals}
                  onRemoveMeal={removeMeal}
                  onUpdateQuantity={updateMealQuantity}
                  usedSlots={usedSlots}
                  totalSlots={weeklyPlan.totalSlots}
                />

                <GroceryList
                  groceryItems={groceryList.items}
                  onToggleItem={handleToggleGroceryItem}
                  isEmpty={isEmpty}
                />
              </div>

              <div>
                <MealSelector
                  onAddMeal={addMeal}
                  remainingSlots={remainingSlots}
                />
              </div>
            </div>
          </div>
        )}

        {/* Ingredient Search Tab */}
        {activeTab === 'search' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Find Meals by Ingredients</h2>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <IngredientSearch
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedIngredients={selectedIngredients}
                  filteredIngredients={filteredIngredients}
                  matchingMeals={matchingMeals}
                  onAddIngredient={addIngredient}
                  onRemoveIngredient={removeIngredient}
                  onClearIngredients={clearIngredients}
                />
              </div>
              <div>
                <MealSelector
                  onAddMeal={addMeal}
                  remainingSlots={remainingSlots}
                  searchResults={matchingMeals.map(meal => meal.id)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
