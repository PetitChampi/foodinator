import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();
});

test.describe("Meal Details Modal Flow", () => {
  test("should open meal details modal when clicking on meal card", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-pasta-bolognese");
    await expect(mealCard).toBeVisible();
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    const modalTitle = page.getByTestId("meal-modal-title");
    await expect(modalTitle).toContainText("Pasta bolognese");

    const ingredientsSection = page.getByTestId("meal-modal-ingredients");
    await expect(ingredientsSection).toBeVisible();
    await expect(ingredientsSection).toContainText("Ingredients");
  });

  test("should display correct ingredients for pasta bolognese", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-pasta-bolognese");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    const ingredientsList = page.getByTestId("meal-modal-ingredients-list");
    await expect(ingredientsList).toBeVisible();
    await expect(ingredientsList).toContainText("Pasta");
    await expect(ingredientsList).toContainText("Tomato sauce");
    await expect(ingredientsList).toContainText("Ground beef");
  });

  test("should display meal image when available", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-burgers");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    const modalImage = page.getByTestId("meal-modal-img");
    await expect(modalImage).toBeVisible();
    await expect(modalImage).toHaveAttribute("alt", "Burgers");
  });

  test("should close modal when clicking close button", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-pasta-carbonara");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    const closeButton = page.getByTestId("modal-close-button");
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test("should close modal when pressing Escape key", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-pesto-chicken-gnocchi");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(modal).not.toBeVisible();
  });

  test("should open different meal details when clicking different meal cards", async ({ page }) => {
    const firstMealCard = page.getByTestId("meal-card-pasta-bolognese");
    await firstMealCard.click();

    let modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("meal-modal-title")).toContainText("Pasta bolognese");

    const closeButton = page.getByTestId("modal-close-button");
    await closeButton.click();
    await expect(modal).not.toBeVisible();

    const secondMealCard = page.getByTestId("meal-card-burgers");
    await secondMealCard.click();

    modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("meal-modal-title")).toContainText("Burgers");

    const ingredientsList = page.getByTestId("meal-modal-ingredients-list");
    await expect(ingredientsList).toContainText("Buns");
    await expect(ingredientsList).toContainText("Ground beef");
  });

  test("should handle meal details for meals with many ingredients", async ({ page }) => {
    const mealCard = page.getByTestId("meal-card-epic-beans-and-steak");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();

    const modalTitle = page.getByTestId("meal-modal-title");
    await expect(modalTitle).toContainText("Epic beans and steak");

    const ingredientsList = page.getByTestId("meal-modal-ingredients-list").locator("li");
    const ingredientCount = await ingredientsList.count();
    expect(ingredientCount).toBeGreaterThan(3);
  });

  test("should maintain modal functionality when opened from different tabs", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();
    await expect(plannerTab).toHaveClass(/active/);

    const mealCard = page.getByTestId("meal-card-fishy-pasta");
    await mealCard.click();

    const modal = page.getByTestId("modal-overlay");
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("meal-modal-title")).toContainText("Fishy pasta");
  });
});
