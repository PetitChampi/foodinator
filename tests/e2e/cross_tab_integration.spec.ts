import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();
});

test.describe("Cross-Tab Integration Flow", () => {
  test("should sync meals from planner to grocery list", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const groceryList = page.getByTestId("grocery-list-section-list-pasta-bolognese");
    await expect(groceryList).toBeVisible();
    await expect(groceryList.getByText("Pasta")).toBeVisible();
    await expect(groceryList.getByText("Tomato sauce")).toBeVisible();
    await expect(groceryList.getByText("Ground beef")).toBeVisible();
  });

  test("should sync meals from planner to schedule", async ({ page }) => {
    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();

    const pestoButton = page.getByTestId("add-meal-pesto-chicken-gnocchi");
    await pestoButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const firstSlot = page.getByTestId("meal-slot-0");
    const secondSlot = page.getByTestId("meal-slot-1");

    await expect(firstSlot).toContainText("Burgers");
    await expect(secondSlot).toContainText("Pesto chicken gnocchi");
  });

  test("should aggregate ingredients when multiple meals share same ingredients", async ({ page }) => {
    const pastaBoloButton = page.getByTestId("add-meal-pasta-bolognese");
    await pastaBoloButton.click();

    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const groundBeefItem = page.getByTestId("grocery-list-item-ground-beef");
    await expect(groundBeefItem).toBeVisible();

    const quantityBadge = page.getByTestId("grocery-list-badge-ground-beef");
    await expect(quantityBadge).toBeVisible();
    await expect(quantityBadge).toContainText("2");
  });

  test("should update grocery list when meals are removed from planner", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-pasta-carbonara");
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const groceryList = page.getByTestId("grocery-list-section-list-pasta-carbonara");
    await expect(groceryList.getByText("Pasta")).toBeVisible();
    await expect(groceryList.getByText("Eggs")).toBeVisible();

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();
    await expect(plannerTab).toHaveClass(/active/);

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const removeButton = dinnerPlanSection.getByTestId("remove-meal-Pasta carbonara");
    await removeButton.click({ force: true });

    const confirmButton = page.getByRole("button", { name: "Remove meal" });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    await expect(page.getByTestId("modal-overlay")).not.toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toContainText("0/7");

    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const emptyState = page.getByTestId("grocery-list-empty-state");
    await expect(emptyState).toBeVisible();
  });

  test("should update schedule when meals are removed from planner", async ({ page }) => {
    const fishyPastaButton = page.getByTestId("add-meal-fishy-pasta");
    await fishyPastaButton.click();

    const epicBeansButton = page.getByTestId("add-meal-epic-beans-and-steak");
    await epicBeansButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    await expect(page.getByTestId("meal-slot-0")).toContainText("Fishy pasta");
    await expect(page.getByTestId("meal-slot-1")).toContainText("Epic beans and steak");

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const removeButton = dinnerPlanSection.getByTestId("remove-meal-Fishy pasta");
    await removeButton.click({ force: true });

    const confirmButton = page.getByRole("button", { name: "Remove meal" });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    await expect(page.getByTestId("modal-overlay")).not.toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    await scheduleTab.click();

    await page.waitForTimeout(200);

    await expect(page.getByTestId("meal-slot-0")).toContainText("Empty slot");
    await expect(page.getByTestId("meal-slot-1")).toContainText("Epic beans and steak");
  });

  test("should maintain grocery list checked state when switching tabs", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await addMealButton.click();

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();

    const pastaCheckbox = page.getByTestId("grocery-list-checkbox-pasta");
    await expect(pastaCheckbox).toBeVisible();
    await pastaCheckbox.check();

    await expect(page.getByTestId("grocery-list-label-pasta")).toHaveCSS("text-decoration", /line-through/);

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();
    await expect(plannerTab).toHaveClass(/active/);

    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    await expect(pastaCheckbox).toBeChecked();
    await expect(page.getByTestId("grocery-list-label-pasta")).toHaveCSS("text-decoration", /line-through/);
  });

  test("should show complete ingredient list for complex meal plan", async ({ page }) => {
    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();

    const pastaButton = page.getByTestId("add-meal-pasta-bolognese");
    await pastaButton.click();

    const chickenButton = page.getByTestId("add-meal-pesto-chicken-gnocchi");
    await chickenButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("3/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const expectedIngredients = [
      "buns",
      "ground-beef",
      "pasta",
      "tomato-sauce",
      "chicken",
      "gnocchi",
      "fresh-basil",
    ];

    for (const ingredient of expectedIngredients) {
      const ingredientElement = page.getByTestId(`grocery-list-item-${ingredient}`);
      if (await ingredientElement.count() > 0) {
        await expect(ingredientElement.first()).toBeVisible();
      }
    }
  });

  test("should update quantities when meal quantities change", async ({ page }) => {
    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();

    const groundBeefItem = page.getByTestId("grocery-list-item-ground-beef");
    await expect(groundBeefItem).toBeVisible();

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const increaseButton = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Burgers");
    await increaseButton.click();
    await increaseButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("3/7");

    await groceryTab.click();

    const quantityBadge = page.getByTestId("grocery-list-badge-ground-beef");
    await expect(quantityBadge).toBeVisible();
    await expect(quantityBadge).toContainText("3");
  });

  test("should reflect schedule changes in all tabs", async ({ page }) => {
    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();

    const pestoButton = page.getByTestId("add-meal-pesto-chicken-gnocchi");
    await pestoButton.click();

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();

    const sourceSlot = page.getByTestId("meal-slot-0");
    const targetSlot = page.getByTestId("meal-slot-1");

    await expect(sourceSlot).toContainText("Burgers");
    await expect(targetSlot).toContainText("Pesto chicken gnocchi");

    await sourceSlot.dragTo(targetSlot);

    await expect(sourceSlot).toContainText("Pesto chicken gnocchi");
    await expect(targetSlot).toContainText("Burgers");

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    await expect(dinnerPlanSection.getByTestId("meal-card-burgers")).toBeVisible();
    await expect(dinnerPlanSection.getByTestId("meal-card-pesto-chicken-gnocchi")).toBeVisible();

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();

    await expect(page.getByTestId("grocery-list-item-ground-beef")).toBeVisible();
    await expect(page.getByTestId("grocery-list-item-chicken")).toBeVisible();
    await expect(page.getByTestId("grocery-list-item-fresh-basil")).toBeVisible();
  });

  test("should handle empty state across all tabs", async ({ page }) => {
    await expect(page.getByTestId("planner-meal-count")).toContainText("0/7");

    const emptyMessage = page.getByText("No meals selected yet. Start by adding meals from the list below.");
    await expect(emptyMessage).toBeVisible();

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();

    const groceryEmptyState = page.getByTestId("grocery-list-empty-state");
    await expect(groceryEmptyState).toBeVisible();

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();

    for (let i = 0; i < 7; i++) {
      const slot = page.getByTestId(`meal-slot-${i}`);
      await expect(slot).toBeVisible();
      await expect(slot).toContainText("Empty slot");
    }
  });
});
