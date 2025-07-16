import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  
  // Wait for the app to be fully loaded
  await expect(page.locator('.container')).toBeVisible();
  await expect(page.getByTestId('tab-planner')).toBeVisible();
  await expect(page.getByTestId('planner-meal-count')).toBeVisible();

  // Setup: Add two different meals to the plan
  const burgersButton = page.getByTestId('add-meal-burgers');
  await expect(burgersButton).toBeVisible();
  await burgersButton.click();
  
  // Wait for first meal to be added
  await expect(page.getByTestId('planner-meal-count')).toContainText('1/7');
  
  const pestoButton = page.getByTestId('add-meal-pesto-chicken-gnocchi');
  await expect(pestoButton).toBeVisible();
  await pestoButton.click();
  
  // Wait for second meal to be added
  await expect(page.getByTestId('planner-meal-count')).toContainText('2/7');
});

test('should allow a user to drag and drop to reorder meals', async ({ page }) => {
  // 1. Navigate to the Schedule tab
  const scheduleTab = page.getByTestId('tab-schedule');
  await expect(scheduleTab).toBeVisible();
  await scheduleTab.click();
  
  // Wait for the schedule tab to be active
  await expect(scheduleTab).toHaveClass(/active/);

  // 2. Wait for the lock button to be visible and unlock the schedule for dragging
  const lockButton = page.getByRole('button', { name: /🔓 Unlocked|🔒 Locked/ });
  await expect(lockButton).toBeVisible();
  
  // If it's locked, unlock it
  if (await lockButton.textContent() === '🔒 Locked') {
    await lockButton.click();
  }
  
  // Wait for unlock state
  await expect(page.getByRole('button', { name: '🔓 Unlocked' })).toBeVisible();

  // 3. Define the source and target locators and wait for them to be ready
  const sourceSlot = page.getByTestId('meal-slot-0');
  const targetSlot = page.getByTestId('meal-slot-1');
  
  await expect(sourceSlot).toBeVisible();
  await expect(targetSlot).toBeVisible();
  
  // 4. Assert initial state - wait for meals to be loaded in slots
  await expect(sourceSlot).toContainText('Burgers');
  await expect(targetSlot).toContainText('Pesto chicken gnocchi');
  
  // 5. Perform the drag-and-drop using Playwright's native command
  await sourceSlot.dragTo(targetSlot);

  // 6. Assert final state - wait for the reorder to complete
  await expect(sourceSlot).toContainText('Pesto chicken gnocchi');
  await expect(targetSlot).toContainText('Burgers');
});
