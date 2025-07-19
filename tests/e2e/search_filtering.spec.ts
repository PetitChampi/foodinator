import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();
});

test.describe("Search and Filtering Flow", () => {
  test("should filter meals by search term", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("pasta");

    const mealCards = page.locator("[data-testid^='meal-card-']");
    const visibleCards = await mealCards.count();

    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-carbonara")).toBeVisible();
    await expect(page.getByTestId("meal-card-fishy-pasta")).toBeVisible();

    expect(visibleCards).toBeGreaterThanOrEqual(3);
  });

  test("should show no results message when search has no matches", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("nonexistentmeal");

    const noResultsMessage = page.getByTestId("no-results");
    await expect(noResultsMessage).toBeVisible();

    const mealCards = page.locator("[data-testid^='meal-card-']");
    const visibleCards = await mealCards.count();
    expect(visibleCards).toBe(0);
  });

  test("should clear search and show all meals", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("pasta");

    let mealCards = page.locator("[data-testid^='meal-card-']");
    let visibleCards = await mealCards.count();
    expect(visibleCards).toBeLessThan(20);

    await searchInput.clear();

    mealCards = page.locator("[data-testid^='meal-card-']");
    visibleCards = await mealCards.count();
    expect(visibleCards).toBeGreaterThanOrEqual(8);

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-epic-beans-and-steak")).toBeVisible();
  });

  test("should filter meals by ingredient selection", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("beef");

    const suggestionsList = page.getByTestId("meal-selector-suggestions-list");
    await expect(suggestionsList).toBeVisible();

    const beefSuggestion = page.getByTestId("meal-selector-suggestion-ground-beef");
    await expect(beefSuggestion).toBeVisible();
    await beefSuggestion.click();

    await searchInput.clear();

    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();

    const mealCards = page.locator("[data-testid^='meal-card-']");
    const visibleCards = await mealCards.count();
    expect(visibleCards).toBeLessThanOrEqual(10);
  });

  test("should combine search term with ingredient filters", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("beef");
    const beefSuggestion = page.getByTestId("meal-selector-suggestion-ground-beef");
    await expect(beefSuggestion).toBeVisible();
    await beefSuggestion.click();

    await searchInput.fill("pasta");

    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();

    const pastaCarbonaraCard = page.getByTestId("meal-card-pasta-carbonara");
    await expect(pastaCarbonaraCard).not.toBeVisible();
  });

  test("should clear all filters and show all meals", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await searchInput.fill("pasta");

    await searchInput.fill("beef");
    const beefSuggestion = page.getByTestId("meal-selector-suggestion-ground-beef");
    await beefSuggestion.click();

    const clearFiltersButton = page.getByTestId("clear-filters");
    await expect(clearFiltersButton).toBeVisible();
    await clearFiltersButton.click();

    const mealCards = page.locator("[data-testid^='meal-card-']");
    const visibleCards = await mealCards.count();
    expect(visibleCards).toBeGreaterThanOrEqual(8);

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-epic-beans-and-steak")).toBeVisible();
  });

  test("should maintain search state when switching tabs", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("chicken");

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();
    await expect(plannerTab).toHaveClass(/active/);

    await expect(searchInput).toHaveValue("chicken");
    await expect(page.getByTestId("meal-card-pesto-chicken-gnocchi")).toBeVisible();
  });

  test("should handle case-insensitive search", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("BURGERS");

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();

    await searchInput.clear();
    await searchInput.fill("burgers");

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();

    await searchInput.clear();
    await searchInput.fill("Burgers");

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();
  });

  test("should handle partial word search", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("burg");

    await expect(page.getByTestId("meal-card-burgers")).toBeVisible();

    await searchInput.clear();
    await searchInput.fill("chick");

    await expect(page.getByTestId("meal-card-pesto-chicken-gnocchi")).toBeVisible();
  });

  test("should update search results in real-time as user types", async ({ page }) => {
    const searchInput = page.getByTestId("meal-selector-search-input");
    await expect(searchInput).toBeVisible();

    await searchInput.type("p");
    const mealCards = page.locator("[data-testid^='meal-card-']");
    const visibleCards = await mealCards.count();
    expect(visibleCards).toBeGreaterThan(0);

    await searchInput.type("a");
    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-carbonara")).toBeVisible();

    await searchInput.type("s");
    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-carbonara")).toBeVisible();

    await searchInput.type("t");
    await searchInput.type("a");
    await expect(page.getByTestId("meal-card-pasta-bolognese")).toBeVisible();
    await expect(page.getByTestId("meal-card-pasta-carbonara")).toBeVisible();
  });
});
