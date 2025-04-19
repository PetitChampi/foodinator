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
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
    reorderMeals,
  } = useWeeklyPlan();

  const {
    groceryList,
    toggleItemChecked,
    isEmpty,
    groupedByMeal
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
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setActiveTab('schedule')}
                      style={{ marginRight: '10px' }}
                    >
                      Arrange Schedule
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setActiveTab('grocery')}
                      style={{ marginRight: '10px' }}
                    >
                      View Grocery List
                    </button>
                    <button className="btn btn-danger" onClick={resetPlan}>
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
                <button 
                  className="btn" 
                  onClick={() => setActiveTab('planner')}
                >
                  Back to Meal Plan
                </button>
              </div>
            </div>
            
            <MealSchedule
              selectedMeals={weeklyPlan.selectedMeals}
              totalSlots={weeklyPlan.totalSlots}
              onReorderMeals={reorderMeals}
              initialMealOrder={mealOrder}
            />
          </div>
        )}

        {/* Grocery List Tab */}
        {activeTab === 'grocery' && (
          <div>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h2>Your Grocery List</h2>
              <button 
                className="btn" 
                onClick={() => setActiveTab('planner')}
              >
                Back to Meal Plan
              </button>
            </div>
            
            <GroceryList
              groceryItems={groceryList.items}
              onToggleItem={handleToggleGroceryItem}
              isEmpty={isEmpty}
              groupedByMeal={groupedByMeal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
