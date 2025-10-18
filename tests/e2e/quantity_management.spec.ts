import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();
});

test.describe("Quantity Management Flow", () => {
  test("should allow increasing meal quantities using quantity selector", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const increaseButton = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Pasta bolognese");
    await expect(increaseButton).toBeVisible();
    await increaseButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const quantityDisplay = dinnerPlanSection.getByTestId("quantity-selector-quantity-Pasta bolognese");
    await expect(quantityDisplay).toContainText("2");
  });

  test("should allow decreasing meal quantities using quantity selector", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-burgers");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const increaseButton = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Burgers");
    await increaseButton.click();
    await increaseButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("3/7");

    const decreaseButton = dinnerPlanSection.getByTestId("quantity-selector-decrease-btn-Burgers");
    await expect(decreaseButton).toBeVisible();
    await decreaseButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");

    const quantityDisplay = dinnerPlanSection.getByTestId("quantity-selector-quantity-Burgers");
    await expect(quantityDisplay).toContainText("2");
  });

  test("should respect quantity limits - cannot exceed 7 total slots", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-pasta-carbonara");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const increaseButton = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Pasta carbonara");

    for (let i = 0; i < 6; i++) {
      await increaseButton.click();
    }

    await expect(page.getByTestId("planner-meal-count")).toContainText("7/7");

    await expect(increaseButton).toBeDisabled();

    const quantityDisplay = dinnerPlanSection.getByTestId("quantity-selector-quantity-Pasta carbonara");
    await expect(quantityDisplay).toContainText("7");
  });

  test("should disable decrease button when quantity is 1", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-fishy-pasta");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const decreaseButton = dinnerPlanSection.getByTestId("quantity-selector-decrease-btn-Fishy pasta");
    await expect(decreaseButton).toBeDisabled();

    const quantityDisplay = dinnerPlanSection.getByTestId("quantity-selector-quantity-Fishy pasta");
    await expect(quantityDisplay).toContainText("1");
  });

  test("should show remove button for planned meals", async ({ page }) => {
    const addMealButton = page.getByTestId("add-meal-epic-beans-and-steak");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    await expect(dinnerPlanSection.getByText("Epic beans and steak")).toBeVisible();

    const removeButton = dinnerPlanSection.locator(".card-close");
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveAttribute("aria-label", "Remove Epic beans and steak from plan");
  });
});
