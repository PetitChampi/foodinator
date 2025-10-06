import { test, expect } from "@playwright/test";

test.describe("Data Persistence Flow", () => {
  test("should persist meal plan data after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-planner")).toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toBeVisible();

    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    await expect(dinnerPlanSection.getByTestId("meal-card-pasta-bolognese")).toBeVisible();

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");
    await expect(dinnerPlanSection.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
  });

  test("should persist active tab state after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("tab-planner")).toHaveClass(/active/);

    const groceryTab = page.getByTestId("tab-grocery");
    await expect(groceryTab).toBeVisible();
    await groceryTab.click();

    await expect(groceryTab).toHaveClass(/active/);

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-grocery")).toHaveClass(/active/);
  });

  test("should persist grocery list checked items after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-planner")).toBeVisible();

    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const pastaCheckbox = page.getByTestId("grocery-list-checkbox-pasta");
    await expect(pastaCheckbox).toBeVisible();
    await pastaCheckbox.check();

    await expect(page.getByTestId("grocery-list-label-pasta")).toHaveCSS("text-decoration", /line-through/);

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-grocery")).toHaveClass(/active/);
    await expect(pastaCheckbox).toBeChecked();
    await expect(page.getByTestId("grocery-list-label-pasta")).toHaveCSS("text-decoration", /line-through/);
  });

  test("should persist grocery notes after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();

    const groceryTab = page.getByTestId("tab-grocery");
    await groceryTab.click();
    await expect(groceryTab).toHaveClass(/active/);

    const notesTextarea = page.getByTestId("grocery-list-notes-textarea");
    await expect(notesTextarea).toBeVisible();

    const testNote = "Remember to buy organic pasta and fresh herbs";
    await notesTextarea.fill(testNote);

    // Wait for debounced save to complete (500ms debounce + buffer)
    await page.waitForTimeout(600);

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-grocery")).toHaveClass(/active/);
    await expect(notesTextarea).toHaveValue(testNote);
  });

  test("should persist multiple meals and their quantities after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toBeVisible();

    const burgersButton = page.getByTestId("add-meal-burgers");
    await burgersButton.click();
    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const increaseButton = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Burgers");
    await increaseButton.click();
    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const pastaButton = page.getByTestId("add-meal-pasta-carbonara");
    await pastaButton.click();
    await expect(page.getByTestId("planner-meal-count")).toContainText("3/7");

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toContainText("3/7");

    const dinnerPlanSectionAfterReload = page.locator("section").filter({ hasText: "Dinner plan" });
    await expect(dinnerPlanSectionAfterReload.getByTestId("meal-card-burgers")).toBeVisible();
    await expect(dinnerPlanSectionAfterReload.getByTestId("meal-card-pasta-carbonara")).toBeVisible();

    const burgersQuantity = dinnerPlanSectionAfterReload.getByTestId("quantity-selector-quantity-Burgers");
    await expect(burgersQuantity).toContainText("2");
  });

  test("should persist schedule data and meal positions after page refresh", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();

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

    await page.reload();

    await expect(page.locator(".container")).toBeVisible();
    await expect(page.getByTestId("tab-schedule")).toHaveClass(/active/);
    await expect(firstSlot).toContainText("Burgers");
    await expect(secondSlot).toContainText("Pesto chicken gnocchi");
  });

  test("should handle data persistence across browser sessions", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.locator(".container")).toBeVisible();

    const addMealButton = page.getByTestId("add-meal-epic-beans-and-steak");
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    await page.close();

    const newPage = await context.newPage();
    await newPage.goto("/");

    await expect(newPage.locator(".container")).toBeVisible();
    await expect(newPage.getByTestId("planner-meal-count")).toContainText("1/7");

    const newPageDinnerPlan = newPage.locator("section").filter({ hasText: "Dinner plan" });
    await expect(newPageDinnerPlan.getByTestId("meal-card-epic-beans-and-steak")).toBeVisible();

    await newPage.close();
  });
});
