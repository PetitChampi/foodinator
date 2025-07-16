import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('/');
  
  // Wait for the app to be fully loaded by checking for key UI elements
  await expect(page.locator('.container')).toBeVisible();
  await expect(page.getByTestId('tab-planner')).toBeVisible();
  
  // Wait for the store to hydrate by checking the meal count badge is present
  await expect(page.getByTestId('planner-meal-count')).toBeVisible();
});

test.describe('Meal Planning Flow', () => {
  test('should allow a user to add a meal and see the plan and grocery list update', async ({ page }) => {
    // 1. Initial state check - wait for the empty state to be visible
    await expect(page.getByTestId('planner-meal-count')).toContainText('0/7');
    await expect(page.getByText('No meals selected yet. Start by adding meals from the list below.')).toBeVisible();

    // 2. Add a meal - wait for the button to be available and click it
    const addMealButton = page.getByTestId('add-meal-pasta-bolognese');
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    // 3. Assert dinner plan has updated - wait for the state change
    await expect(page.getByTestId('planner-meal-count')).toContainText('1/7');
    await expect(page.locator('.meal-list').getByText('Pasta bolognese')).toBeVisible();

    // 4. Navigate to the Grocery tab
    const groceryTab = page.getByTestId('tab-grocery');
    await expect(groceryTab).toBeVisible();
    await groceryTab.click();

    // Wait for the grocery tab to be active
    await expect(groceryTab).toHaveClass(/active/);

    // 5. Assert grocery list is correct - wait for each ingredient to appear
    const groceryList = page.locator('.grocery-section__list');
    await expect(groceryList).toBeVisible();
    await expect(groceryList.getByText('Pasta')).toBeVisible();
    await expect(groceryList.getByText('Tomato sauce')).toBeVisible();
    await expect(groceryList.getByText('Ground beef')).toBeVisible();

    // 6. Check off an item in the grocery list
    const pastaCheckbox = page.locator('input#ingredient-pasta');
    await expect(pastaCheckbox).toBeVisible();
    await pastaCheckbox.check();
    
    // Wait for the visual change to occur
    await expect(page.locator('label[for="ingredient-pasta"]')).toHaveCSS('text-decoration', /line-through/);
  });
});
