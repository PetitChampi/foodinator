import { useState, useEffect } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { PlannerTab } from './components/tabs/PlannerTab';
import { SearchTab } from './components/tabs/SearchTab';
import { ScheduleTab } from './components/tabs/ScheduleTab';
import { GroceryTab } from './components/tabs/GroceryTab';
import { useWeeklyPlan } from './hooks/useWeeklyPlan';
import { useGroceryList } from './hooks/useGroceryList';
import { useIngredientSearch } from './hooks/useIngredientSearch';

type TabType = 'planner' | 'search' | 'grocery' | 'schedule';

function App() {
  // Load active tab from localStorage or default to 'planner'
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const savedTab = localStorage.getItem('foodinator_active_tab');
    return (savedTab as TabType) || 'planner';
  });

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('foodinator_active_tab', activeTab);
  }, [activeTab]);

  // Initialize hooks for state management
  const {
    weeklyPlan,
    mealOrder,
    cookedMeals,
    dragLocked,
    startDate,
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

  // Handler functions
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
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          groceryItemCount={groceryList.items.length}
          isEmpty={isEmpty}
        />

        {/* Tab Content */}
        {activeTab === 'planner' && (
          <PlannerTab 
            selectedMeals={weeklyPlan.selectedMeals}
            onRemoveMeal={removeMeal}
            onUpdateQuantity={updateMealQuantity}
            totalSlots={weeklyPlan.totalSlots}
            remainingSlots={remainingSlots}
            onAddMeal={addMeal}
            onResetPlan={handleResetPlan}
          />
        )}

        {activeTab === 'search' && (
          <SearchTab 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedIngredients={selectedIngredients}
            filteredIngredients={filteredIngredients}
            matchingMeals={matchingMeals}
            onAddIngredient={addIngredient}
            onRemoveIngredient={removeIngredient}
            onClearIngredients={clearIngredients}
            onAddMeal={addMeal}
            remainingSlots={remainingSlots}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab 
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
        )}

        {activeTab === 'grocery' && (
          <GroceryTab 
            groceryItems={groceryList.items}
            onToggleItem={handleToggleGroceryItem}
            isEmpty={isEmpty}
            groupedByMeal={groupedByMeal}
            notes={notes}
            onUpdateNotes={updateNotes}
          />
        )}
      </div>
    </div>
  );
}

export default App;
