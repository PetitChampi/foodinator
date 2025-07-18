import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroceryList } from "@/components/GroceryList";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { groceryListTestIds } from "@/utils/testUtils";
import { vi } from "vitest";

const renderGroceryList = () => {
  render(<GroceryList />);
};

const user = userEvent.setup();
const initialState = useFoodinatorStore.getState();

vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: unknown) => value,
}));

describe("GroceryList", () => {
  beforeEach(() => {
    act(() => {
      useFoodinatorStore.setState(initialState, true);
    });
  });

  it("should display an empty state message when no meals are selected", () => {
    renderGroceryList();
    expect(screen.getByTestId(groceryListTestIds.emptyState)).toBeInTheDocument();
  });

  it("should group ingredients by meal by default", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 1);
      useFoodinatorStore.getState().addMeal("pasta-bolognese", 1);
    });
    renderGroceryList();

    const burgerSection = screen.getByTestId(groceryListTestIds.section("burgers"));
    const pastaSection = screen.getByTestId(groceryListTestIds.section("pasta-bolognese"));

    expect(burgerSection).toBeInTheDocument();
    expect(pastaSection).toBeInTheDocument();

    expect(within(burgerSection).getByTestId(groceryListTestIds.sectionTitle("burgers"))).toHaveTextContent("Burgers");
    expect(within(pastaSection).getByTestId(groceryListTestIds.sectionTitle("pasta-bolognese"))).toHaveTextContent("Pasta bolognese");
  });

  it("should display portions as a badge for quantities greater than 1", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("pasta-bolognese", 2);
    });
    renderGroceryList();

    // Ground beef ingredient ID is "ground-beef" based on the data structure
    const groundBeefBadge = screen.getByTestId(groceryListTestIds.itemBadge("ground-beef"));
    expect(groundBeefBadge).toHaveTextContent("2");
  });

  it("should sort ingredients by name when selected", async () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 1);
    });
    renderGroceryList();

    const sortDropdown = screen.getByTestId(groceryListTestIds.sortDropdown);
    await user.selectOptions(sortDropdown, "name");

    const listItems = screen.getAllByRole("listitem");
    const ingredientNames = listItems.map(li => li.textContent);

    expect(ingredientNames).toEqual([
      "Buns",
      "Cheese",
      "Ground beef",
      "Lettuce",
      "Potatoes",
      "Sauce",
    ]);
  });

  it("should hide and show checked items", async () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 1);
    });
    renderGroceryList();

    // Cheese ingredient ID is "cheese" based on the data structure
    const cheeseCheckbox = screen.getByTestId(groceryListTestIds.itemCheckbox("cheese"));
    await user.click(cheeseCheckbox);

    const hideButton = screen.getByTestId(groceryListTestIds.toggleCheckedButton);
    await user.click(hideButton);

    expect(screen.queryByTestId(groceryListTestIds.item("cheese"))).not.toBeInTheDocument();

    const showButton = screen.getByTestId(groceryListTestIds.toggleCheckedButton);
    await user.click(showButton);

    expect(screen.getByTestId(groceryListTestIds.item("cheese"))).toBeInTheDocument();
  });
});
