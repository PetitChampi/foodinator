import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();

  const burgersButton = page.getByTestId("add-meal-burgers");
  await expect(burgersButton).toBeVisible();
  await burgersButton.click();

  await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

  const pestoButton = page.getByTestId("add-meal-pesto-chicken-gnocchi");
  await expect(pestoButton).toBeVisible();
  await pestoButton.click();

  await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");
});

test("should allow a user to drag and drop to reorder meals", async ({ page }) => {
  const scheduleTab = page.getByTestId("tab-schedule");
  await expect(scheduleTab).toBeVisible();
  await scheduleTab.click();

  await expect(scheduleTab).toHaveClass(/active/);

  const sourceSlot = page.getByTestId("meal-slot-0");
  const targetSlot = page.getByTestId("meal-slot-1");

  await expect(sourceSlot).toBeVisible();
  await expect(targetSlot).toBeVisible();

  await expect(sourceSlot).toContainText("Burgers");
  await expect(targetSlot).toContainText("Pesto chicken gnocchi");

  await sourceSlot.dragTo(targetSlot);

  await expect(sourceSlot).toContainText("Pesto chicken gnocchi");
  await expect(targetSlot).toContainText("Burgers");
});
