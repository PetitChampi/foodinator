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
  // State for active tab
  const [activeTab, setActiveTab] = useState<'planner' | 'search' | 'grocery' | 'schedule'>(() => {
    // Try to restore active tab from localStorage
    const savedTab = localStorage.getItem('foodinator_active_tab');
    return (savedTab as 'planner' | 'search' | 'grocery') || 'planner';
  });

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('foodinator_active_tab', activeTab);
  }, [activeTab]);

  // Initialize hooks
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

  // Handle toggling grocery item checked state
  const handleToggleGroceryItem = (ingredientId: string) => {
    toggleItemChecked(ingredientId);
  };

  // Handle resetting the plan and clearing checked grocery items
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
            className={`btn ${activeTab === 'schedule' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('schedule')}
            style={{ marginRight: '10px' }}
          >
            Meal Schedule
          </button>
          <button
            className={`btn ${activeTab === 'search' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('search')}
            style={{ marginRight: '10px' }}
          >
            Ingredient Search
          </button>
          <button
            className={`btn ${activeTab === 'grocery' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('grocery')}
          >
            Grocery List
            {!isEmpty && (
              <span className="badge" style={{ marginLeft: '5px', fontSize: '0.7rem' }}>
                {groceryList.items.length}
              </span>
            )}
          </button>
        </div>

        {/* Meal Planner Tab */}
        {activeTab === 'planner' && (
          <div>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <h2 style={{ marginBottom: '20px' }}>Find Meals by Ingredients</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h2>Meal Schedule</h2>
              <div>
              </div>
            </div>
            
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
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h2>Your Grocery List</h2>
            </div>
            
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
