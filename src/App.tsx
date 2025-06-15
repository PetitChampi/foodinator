import { useState, useEffect } from 'react';
import { MealSelector } from './components/MealSelector';
import { WeeklyPlanDisplay } from './components/WeeklyPlanDisplay';
import { GroceryList } from './components/GroceryList';
import { IngredientSearch } from './components/IngredientSearch';
import { MealSchedule } from './components/MealSchedule';
import { useWeeklyPlan } from './hooks/useWeeklyPlan';
import { useGroceryList } from './hooks/useGroceryList';
import { useIngredientSearch } from './hooks/useIngredientSearch';

function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'search' | 'grocery' | 'schedule'>(() => {
    const savedTab = localStorage.getItem('foodinator_active_tab');
    return (savedTab as 'planner' | 'search' | 'grocery') || 'planner';
  });

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('foodinator_active_tab', activeTab);
  }, [activeTab]);

  const {
    weeklyPlan,
    mealOrder,
    cookedMeals,
    dragLocked,
    startDate,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
    reorderMeals,
    toggleMealCooked,
    toggleDragLock,
    updateStartDate,
    getSlotDate,
  } = useWeeklyPlan();

  const {
    groceryList,
    toggleItemChecked,
    clearAllCheckedItems,
    isEmpty,
    groupedByMeal,
    notes,
    updateNotes
  } = useGroceryList(weeklyPlan.selectedMeals, mealOrder);

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

  const handleToggleGroceryItem = (ingredientId: string) => {
    toggleItemChecked(ingredientId);
  };

  const handleResetPlan = () => {
    resetPlan();
    clearAllCheckedItems();
  };

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Foodinator</h1>
      </header>

      <div className="container">
        <div className="tabs">
          <button
            className={`btn ${activeTab === 'planner' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('planner')}
          >
            Meal Planner
          </button>
          <button
            className={`btn ${activeTab === 'schedule' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Meal Schedule
          </button>
          <button
            className={`btn ${activeTab === 'search' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('search')}
          >
            Ingredient Search
          </button>
          <button
            className={`btn ${activeTab === 'grocery' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('grocery')}
          >
            Grocery List
            {!isEmpty && (
              <span className="badge badge-count">
                {groceryList.items.length}
              </span>
            )}
          </button>
        </div>

        {/* Meal Planner Tab */}
        {activeTab === 'planner' && (
          <div>
            <div className="section-header">
              <h2>Plan Your Weekly Meals</h2>
              <div>
                {weeklyPlan.selectedMeals.length > 0 && (
                  <>
                    <button className="btn btn-danger" onClick={handleResetPlan}>
                      Reset Plan
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="app-section">
              <WeeklyPlanDisplay
                selectedMeals={weeklyPlan.selectedMeals}
                onRemoveMeal={removeMeal}
                onUpdateQuantity={updateMealQuantity}
                usedSlots={usedSlots}
                totalSlots={weeklyPlan.totalSlots}
              />
              
              <MealSelector
                onAddMeal={addMeal}
                remainingSlots={remainingSlots}
              />
            </div>
          </div>
        )}

        {/* Ingredient Search Tab */}
        {activeTab === 'search' && (
          <div>
            <div className="section-header">
              <h2>Find Meals by Ingredients</h2>
            </div>
            <div className="app-section">
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
              
              <MealSelector
                onAddMeal={addMeal}
                remainingSlots={remainingSlots}
                searchResults={matchingMeals.map(meal => meal.id)}
              />
            </div>
          </div>
        )}

        {/* Meal Schedule Tab */}
        {activeTab === 'schedule' && (
          <div>
            <MealSchedule
              selectedMeals={weeklyPlan.selectedMeals}
              totalSlots={weeklyPlan.totalSlots}
              onReorderMeals={reorderMeals}
              initialMealOrder={mealOrder}
              cookedMeals={cookedMeals}
              dragLocked={dragLocked}
              onToggleMealCooked={toggleMealCooked}
              onToggleDragLock={toggleDragLock}
              startDate={startDate}
              onUpdateStartDate={updateStartDate}
              getSlotDate={getSlotDate}
            />
          </div>
        )}

        {/* Grocery List Tab */}
        {activeTab === 'grocery' && (
          <div>
            <GroceryList
              groceryItems={groceryList.items}
              onToggleItem={handleToggleGroceryItem}
              isEmpty={isEmpty}
              groupedByMeal={groupedByMeal}
              notes={notes}
              onUpdateNotes={updateNotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
