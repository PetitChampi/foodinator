import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();

  await expect(page.getByTestId("planner-meal-count")).toBeVisible();
});

test.describe("Meal Planning Flow", () => {
  test("should allow a user to add a meal and see the plan and grocery list update", async ({ page }) => {
    await expect(page.getByTestId("planner-meal-count")).toContainText("0/7");
    await expect(page.getByText("No meals selected yet. Start by adding meals from the list below.")).toBeVisible();

    const addMealButton = page.getByTestId("add-meal-pasta-bolognese");
    await expect(addMealButton).toBeVisible();
    await addMealButton.click();

    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");
    await expect(page.locator(".meal-list").getByText("Pasta bolognese")).toBeVisible();

    const groceryTab = page.getByTestId("tab-grocery");
    await expect(groceryTab).toBeVisible();
    await groceryTab.click();

    await expect(groceryTab).toHaveClass(/active/);

    const groceryList = page.locator(".grocery-section__list");
    await expect(groceryList).toBeVisible();
    await expect(groceryList.getByText("Pasta")).toBeVisible();
    await expect(groceryList.getByText("Tomato sauce")).toBeVisible();
    await expect(groceryList.getByText("Ground beef")).toBeVisible();

    const pastaCheckbox = page.locator("input#ingredient-pasta");
    await expect(pastaCheckbox).toBeVisible();
    await pastaCheckbox.check();

    await expect(page.locator('label[for="ingredient-pasta"]')).toHaveCSS("text-decoration", /line-through/);
  });
});
