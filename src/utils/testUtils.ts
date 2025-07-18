/**
 * Test utilities for consistent test selector generation
 */

/**
 * Generates a consistent test ID for components
 * @param component - The component name (e.g., "grocery-list")
 * @param element - The specific element (e.g., "sort-dropdown", "empty-state")
 * @param modifier - Optional modifier for specific instances (e.g., meal ID, ingredient ID)
 */
export const testId = (component: string, element: string, modifier?: string | number): string => {
  const base = `${component}-${element}`;
  return modifier ? `${base}-${modifier}` : base;
};

/**
 * Common test ID patterns for reusable elements
 */
export const commonTestIds = {
  // Buttons
  button: (action: string, modifier?: string) => testId("btn", action, modifier),

  // Form elements
  input: (type: string, modifier?: string) => testId("input", type, modifier),
  select: (type: string, modifier?: string) => testId("select", type, modifier),
  textarea: (type: string, modifier?: string) => testId("textarea", type, modifier),
  checkbox: (modifier?: string) => testId("checkbox", "item", modifier),

  // Lists and items
  list: (type: string, modifier?: string) => testId("list", type, modifier),
  listItem: (type: string, modifier?: string) => testId("list-item", type, modifier),

  // Sections and containers
  section: (type: string, modifier?: string) => testId("section", type, modifier),
  container: (type: string, modifier?: string) => testId("container", type, modifier),

  // Modal and overlay elements
  modal: (type: string, modifier?: string) => testId("modal", type, modifier),
  overlay: (modifier?: string) => testId("overlay", "backdrop", modifier),

  // Status and state elements
  emptyState: (component: string) => testId(component, "empty-state"),
  loadingState: (component: string) => testId(component, "loading-state"),
  errorState: (component: string) => testId(component, "error-state"),
};

/**
 * Helper function to get test ID selector for use in tests
 */
export const getByTestId = (testIdValue: string) => `[data-testid="${testIdValue}"]`;

/**
 * Component-specific test ID generators
 */
export const groceryListTestIds = {
  container: testId("grocery-list", "container"),
  emptyState: commonTestIds.emptyState("grocery-list"),
  sortDropdown: testId("grocery-list", "sort-dropdown"),
  toggleCheckedButton: testId("grocery-list", "toggle-checked-btn"),
  section: (mealId?: string) => testId("grocery-list", "section", mealId),
  sectionTitle: (mealId?: string) => testId("grocery-list", "section-title", mealId),
  sectionList: (mealId?: string) => testId("grocery-list", "section-list", mealId),
  item: (ingredientId: string) => testId("grocery-list", "item", ingredientId),
  itemCheckbox: (ingredientId: string) => testId("grocery-list", "checkbox", ingredientId),
  itemLabel: (ingredientId: string) => testId("grocery-list", "label", ingredientId),
  itemBadge: (ingredientId: string) => testId("grocery-list", "badge", ingredientId),
  notesContainer: testId("grocery-list", "notes-container"),
  notesTextarea: testId("grocery-list", "notes-textarea"),
  notesCounter: testId("grocery-list", "notes-counter"),
};

export const mealSelectorTestIds = {
  container: testId("meal-selector", "container"),
  searchInput: testId("meal-selector", "search-input"),
  suggestionsList: testId("meal-selector", "suggestions-list"),
  suggestionItem: (ingredientId: string) => testId("meal-selector", "suggestion", ingredientId),
  selectedTagsContainer: testId("meal-selector", "selected-tags"),
  selectedTag: (ingredientId: string) => testId("meal-selector", "selected-tag", ingredientId),
  tagRemoveButton: (ingredientId: string) => testId("meal-selector", "tag-remove", ingredientId),
  mealCard: (mealId: string) => testId("meal-selector", "meal-card", mealId),
  mealCardTitle: (mealId: string) => testId("meal-selector", "meal-title", mealId),
  mealCardAddButton: (mealId: string) => testId("meal-selector", "add-btn", mealId),
};

export const quantitySelectorTestIds = {
  container: (prefix?: string) => testId("quantity-selector", "container", prefix),
  decreaseButton: (prefix?: string) => testId("quantity-selector", "decrease-btn", prefix),
  increaseButton: (prefix?: string) => testId("quantity-selector", "increase-btn", prefix),
  quantityDisplay: (prefix?: string) => testId("quantity-selector", "quantity", prefix),
};
