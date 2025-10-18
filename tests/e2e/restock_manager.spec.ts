import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  // Navigate to Grocery tab where restock manager is
  const groceryTab = page.getByTestId("tab-grocery");
  await expect(groceryTab).toBeVisible();
  await groceryTab.click();

  // Click on Restock manager sub-tab
  const restockTab = page.getByTestId("grocery-tab-restock");
  await expect(restockTab).toBeVisible();
  await restockTab.click();

  // Wait for restock manager to be visible
  await expect(page.getByTestId("restock-manager-view")).toBeVisible();
});

test.describe("Restock Manager Flow", () => {
  test("should display empty state when no items in restock list", async ({ page }) => {
    await expect(page.getByTestId("restock-empty-state")).toBeVisible();
    await expect(page.getByTestId("restock-empty-state")).toContainText("Nothing to restock");
  });

  test("should add an unlisted item to restock list", async ({ page }) => {
    // Click add unlisted item button
    const addButton = page.getByTestId("restock-add-unlisted-item");
    await expect(addButton).toBeVisible();
    await addButton.click();

    // Modal should open
    await expect(page.getByText("Add item to restock")).toBeVisible();

    // Enter item name
    const itemInput = page.getByTestId("add-item-input");
    await itemInput.fill("Tomato sauce");

    // Submit
    const submitButton = page.getByTestId("add-restock-item-submit");
    await submitButton.click();

    // Item should appear in restock list
    await expect(page.getByTestId("restock-list")).toBeVisible();
    await expect(page.getByTestId("restock-item-checkbox-Tomato sauce")).toBeVisible();
  });

  test("should check and uncheck restock items", async ({ page }) => {
    // Add an item first
    await page.getByTestId("restock-add-unlisted-item").click();
    await page.getByTestId("add-item-input").fill("Milk");
    await page.getByTestId("add-restock-item-submit").click();

    // Find checkbox by test ID
    const checkbox = page.getByTestId("restock-item-checkbox-Milk");
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    // Check the item
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Uncheck the item
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test("should remove item from restock list", async ({ page }) => {
    // Add an item first
    await page.getByTestId("restock-add-unlisted-item").click();
    await page.getByTestId("add-item-input").fill("Bread");
    await page.getByTestId("add-restock-item-submit").click();

    // Verify item is in list
    await expect(page.getByTestId("restock-item-checkbox-Bread")).toBeVisible();

    // Click remove button
    const deleteButton = page.getByTestId("restock-item-remove-Bread");
    await deleteButton.click();

    // Item should be removed
    await expect(page.getByTestId("restock-item-checkbox-Bread")).not.toBeVisible();
    await expect(page.getByTestId("restock-empty-state")).toBeVisible();
  });

  test("should reset entire restock list", async ({ page }) => {
    // Add multiple items
    await page.getByTestId("restock-add-unlisted-item").click();
    await page.getByTestId("add-item-input").fill("Item 1");
    await page.getByTestId("add-restock-item-submit").click();

    await page.getByTestId("restock-add-unlisted-item").click();
    await page.getByTestId("add-item-input").fill("Item 2");
    await page.getByTestId("add-restock-item-submit").click();

    // Verify items are in list
    await expect(page.getByTestId("restock-item-checkbox-Item 1")).toBeVisible();
    await expect(page.getByTestId("restock-item-checkbox-Item 2")).toBeVisible();

    // Click reset list button
    await page.getByTestId("restock-reset-list").click();

    // Confirmation modal should appear
    await expect(page.getByTestId("confirmation-modal-title")).toContainText("Reset restock list");
    await expect(page.getByTestId("confirmation-modal-message")).toContainText("Are you sure you want to delete all items in the restock list?");

    // Confirm reset
    await page.getByTestId("confirmation-modal-confirm").click();

    // List should be empty
    await expect(page.getByTestId("restock-empty-state")).toBeVisible();
  });

  test("should add common item to restock list", async ({ page }) => {
    // Find and click a common item badge (they should be visible by default)
    await expect(page.getByTestId("restock-common-items")).toBeVisible();

    // Look for a common item badge - let's use "Milk" as an example
    const commonItemBadge = page.getByTestId("restock-common-item-Milk");
    await expect(commonItemBadge).toBeVisible();

    // Click to add it to restock list
    await commonItemBadge.click();

    // Item should now appear in restock list
    await expect(page.getByTestId("restock-list")).toBeVisible();
    await expect(page.getByTestId("restock-item-checkbox-Milk")).toBeVisible();

    // The common item badge should be hidden after adding (since it's already in the list)
    await expect(commonItemBadge).toBeHidden();
  });

  test("should hide common items already in restock list", async ({ page }) => {
    // Add a common item to restock list
    const commonItem = page.getByTestId("restock-common-item-Milk");
    await commonItem.click();

    // The badge should now be hidden
    await expect(commonItem).toBeHidden();

    // Remove the item from restock list
    const deleteButton = page.getByTestId("restock-item-remove-Milk");
    await deleteButton.click();

    // The common item badge should be visible again
    await expect(commonItem).toBeVisible();
  });

  test("should add new common item", async ({ page }) => {
    // Click new item button
    await page.getByTestId("restock-add-common-item").click();

    // Modal should open
    await expect(page.getByText("Add common item")).toBeVisible();

    // Fill in item details
    await page.getByTestId("common-item-name-input").fill("Coconut milk");

    // Select a category
    const categorySelect = page.getByTestId("common-item-category-select");
    await categorySelect.selectOption({ index: 0 });

    // Submit
    await page.getByTestId("add-common-item-submit").click();

    // Item should appear in common items list
    await expect(page.getByText("Coconut milk")).toBeVisible();
  });

  test("should enter and exit edit mode for common items", async ({ page }) => {
    // Click edit common items button
    await page.getByTestId("restock-toggle-edit-mode").click();

    // Should be in edit mode - check that delete button appears for a common item
    const deleteButton = page.getByTestId("restock-common-item-delete-Milk");
    await expect(deleteButton).toBeVisible();

    // New item button should be disabled
    const newItemButton = page.getByTestId("restock-add-common-item");
    await expect(newItemButton).toBeDisabled();

    // Click finish editing
    await page.getByTestId("restock-toggle-edit-mode").click();

    // Should exit edit mode - delete button should not be visible
    await expect(deleteButton).not.toBeVisible();
    await expect(newItemButton).toBeEnabled();
  });

  test("should edit common item", async ({ page }) => {
    // Enter edit mode
    await page.getByTestId("restock-toggle-edit-mode").click();

    // Wait for delete button to appear (indicates edit mode is active)
    await expect(page.getByTestId("restock-common-item-delete-Milk")).toBeVisible();

    // Click on a common item to edit
    const commonItem = page.getByTestId("restock-common-item-Milk");
    await commonItem.click({ force: true });

    // Edit modal should open
    await expect(page.getByText("Edit common item")).toBeVisible();

    // Change the name
    const itemNameInput = page.getByTestId("common-item-name-input");
    await itemNameInput.clear();
    await itemNameInput.fill("Updated Item Name");

    // Submit
    await page.getByTestId("add-common-item-submit").click();

    // Item should be updated
    await expect(page.getByText("Updated Item Name")).toBeVisible();
  });

  test("should delete common item", async ({ page }) => {
    // Enter edit mode
    await page.getByTestId("restock-toggle-edit-mode").click();

    // Find a common item's delete button and wait for it to be visible
    const deleteButton = page.getByTestId("restock-common-item-delete-Milk");
    await expect(deleteButton).toBeVisible();
    await deleteButton.click({ force: true });

    // Confirmation modal should appear
    await expect(page.getByTestId("confirmation-modal-title")).toContainText("Delete");
    await expect(page.getByTestId("confirmation-modal-message")).toContainText("Are you sure you want to delete this item from your Common items list?");

    // Confirm deletion
    await page.getByTestId("confirmation-modal-confirm").click();

    // Exit edit mode to verify
    await page.getByTestId("restock-toggle-edit-mode").click();

    // Item should be removed
    await expect(page.getByTestId("restock-common-item-Milk")).not.toBeVisible();
  });

  test("should not add duplicate common items to restock list", async ({ page }) => {
    // Add a common item
    const commonItem = page.getByTestId("restock-common-item-Milk");
    await commonItem.click();

    // Verify it's in the restock list
    await expect(page.getByTestId("restock-list")).toBeVisible();
    await expect(page.getByTestId("restock-item-checkbox-Milk")).toBeVisible();

    // The badge should be hidden
    await expect(commonItem).toBeHidden();
  });

  test("should disable submit when item name is empty", async ({ page }) => {
    // Open add unlisted item modal
    await page.getByTestId("restock-add-unlisted-item").click();

    // Submit button should be disabled
    const submitButton = page.getByTestId("add-restock-item-submit");
    await expect(submitButton).toBeDisabled();

    // Type something
    await page.getByTestId("add-item-input").fill("Test");
    await expect(submitButton).toBeEnabled();

    // Clear input
    await page.getByTestId("add-item-input").clear();
    await expect(submitButton).toBeDisabled();
  });

  test("should cancel adding unlisted item", async ({ page }) => {
    // Open modal
    await page.getByTestId("restock-add-unlisted-item").click();
    await expect(page.getByText("Add item to restock")).toBeVisible();

    // Fill input
    await page.getByTestId("add-item-input").fill("Test item");

    // Click cancel
    await page.getByTestId("add-restock-item-cancel").click();

    // Modal should close and item should not be added
    await expect(page.getByText("Add item to restock")).not.toBeVisible();
    await expect(page.getByTestId("restock-item-checkbox-Test item")).not.toBeVisible();
  });

  test("should cancel adding common item", async ({ page }) => {
    // Open modal
    await page.getByTestId("restock-add-common-item").click();
    await expect(page.getByText("Add common item")).toBeVisible();

    // Fill input
    await page.getByTestId("common-item-name-input").fill("Test common item");

    // Click cancel
    await page.getByTestId("add-common-item-cancel").click();

    // Modal should close and item should not be added
    await expect(page.getByText("Add common item")).not.toBeVisible();
    await expect(page.getByTestId("restock-common-item-Test common item")).not.toBeVisible();
  });
});
