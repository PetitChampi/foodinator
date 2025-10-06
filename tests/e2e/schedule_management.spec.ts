import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".container")).toBeVisible();
  await expect(page.getByTestId("tab-planner")).toBeVisible();
  await expect(page.getByTestId("planner-meal-count")).toBeVisible();

  const burgersButton = page.getByTestId("add-meal-burgers");
  await expect(burgersButton).toBeVisible();
  await burgersButton.click();

  const pestoButton = page.getByTestId("add-meal-pesto-chicken-gnocchi");
  await expect(pestoButton).toBeVisible();
  await pestoButton.click();

  await expect(page.getByTestId("planner-meal-count")).toContainText("2/7");
});

test.describe("Schedule Management Flow", () => {
  test("should change start date for meal schedule", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const dateInput = page.getByTestId("schedule-date-input");
    await expect(dateInput).toBeVisible();

    const newDate = "2024-12-25";
    await dateInput.fill(newDate);

    await expect(dateInput).toHaveValue(newDate);
  });

  test("should mark meals as cooked in schedule view", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const firstMealSlot = page.getByTestId("meal-slot-0");
    await expect(firstMealSlot).toBeVisible();
    await expect(firstMealSlot).toContainText("Burgers");

    const cookToggle = firstMealSlot.locator(".meal-cooked-toggle");
    await expect(cookToggle).toBeVisible();
    await cookToggle.click();

    await expect(firstMealSlot).toHaveClass(/cooked/);
  });

  test("should unmark meals as cooked", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const secondMealSlot = page.getByTestId("meal-slot-1");
    await expect(secondMealSlot).toBeVisible();
    await expect(secondMealSlot).toContainText("Pesto chicken gnocchi");

    const cookToggle = secondMealSlot.locator(".meal-cooked-toggle");
    await expect(cookToggle).toBeVisible();

    await cookToggle.click();
    await expect(secondMealSlot).toHaveClass(/cooked/);

    await cookToggle.click();
    await expect(secondMealSlot).not.toHaveClass(/cooked/);
  });

  test("should allow dragging and reordering meals", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const sourceSlot = page.getByTestId("meal-slot-0");
    const targetSlot = page.getByTestId("meal-slot-1");

    await expect(sourceSlot).toContainText("Burgers");
    await expect(targetSlot).toContainText("Pesto chicken gnocchi");

    await sourceSlot.dragTo(targetSlot);

    await expect(sourceSlot).toContainText("Pesto chicken gnocchi");
    await expect(targetSlot).toContainText("Burgers");
  });

  test("should display empty schedule state when no meals are planned", async ({ page }) => {
    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });

    const burgersRemove = dinnerPlanSection.getByTestId("remove-meal-Burgers");
    await burgersRemove.click({ force: true });

    const confirmButton1 = page.getByRole("button", { name: "Remove meal" });
    await expect(confirmButton1).toBeVisible();
    await confirmButton1.click();

    await expect(page.getByTestId("modal-overlay")).not.toBeVisible();
    await expect(page.getByTestId("planner-meal-count")).toContainText("1/7");

    const pestoRemove = dinnerPlanSection.getByTestId("remove-meal-Pesto chicken gnocchi");
    await pestoRemove.click({ force: true });

    const confirmButton2 = page.getByRole("button", { name: "Remove meal" });
    await expect(confirmButton2).toBeVisible();
    await confirmButton2.click();

    await expect(page.getByTestId("modal-overlay")).not.toBeVisible();

    await expect(page.getByTestId("planner-meal-count")).toContainText("0/7");

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const emptySlots = page.locator("[data-testid^='meal-slot-']");
    const slotCount = await emptySlots.count();
    expect(slotCount).toBe(7);

    for (let i = 0; i < slotCount; i++) {
      const slot = page.getByTestId(`meal-slot-${i}`);
      await expect(slot).toBeVisible();
      await expect(slot).toContainText("Empty slot");
    }
  });

  test("should show correct day labels in schedule", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const dayLabels = page.locator(".day-label, .schedule-day, [data-testid*='day-']");
    const labelCount = await dayLabels.count();

    if (labelCount > 0) {
      const expectedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      for (let i = 0; i < Math.min(labelCount, 7); i++) {
        const dayLabel = dayLabels.nth(i);
        const labelText = await dayLabel.textContent();

        const hasValidDay = expectedDays.some(day =>
          labelText?.toLowerCase().includes(day.toLowerCase()) ||
          labelText?.toLowerCase().includes(day.substring(0, 3).toLowerCase()),
        );

        expect(hasValidDay).toBe(true);
      }
    }
  });

  test("should handle schedule with maximum meals (7 slots filled)", async ({ page }) => {
    const plannerTab = page.getByTestId("tab-planner");
    await plannerTab.click();

    const dinnerPlanSection = page.locator("section").filter({ hasText: "Dinner plan" });
    const burgersIncrease = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Burgers");
    for (let i = 0; i < 3; i++) {
      await burgersIncrease.click();
    }

    const pestoIncrease = dinnerPlanSection.getByTestId("quantity-selector-increase-btn-Pesto chicken gnocchi");
    for (let i = 0; i < 2; i++) {
      await pestoIncrease.click();
    }

    await expect(page.getByTestId("planner-meal-count")).toContainText("7/7");

    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    for (let i = 0; i < 7; i++) {
      const slot = page.getByTestId(`meal-slot-${i}`);
      await expect(slot).toBeVisible();
      await expect(slot).not.toContainText("Empty slot");
    }
  });

  test("should maintain cooking status after reordering meals", async ({ page }) => {
    const scheduleTab = page.getByTestId("tab-schedule");
    await scheduleTab.click();
    await expect(scheduleTab).toHaveClass(/active/);

    const firstSlot = page.getByTestId("meal-slot-0");
    await expect(firstSlot).toContainText("Burgers");

    const cookToggle = firstSlot.locator(".meal-cooked-toggle");
    await expect(cookToggle).toBeVisible();
    await cookToggle.click();
    await expect(firstSlot).toHaveClass(/cooked/);

    const secondSlot = page.getByTestId("meal-slot-1");
    await firstSlot.dragTo(secondSlot);

    await expect(secondSlot).toContainText("Burgers");
    await expect(secondSlot).toHaveClass(/cooked/);
  });
});
