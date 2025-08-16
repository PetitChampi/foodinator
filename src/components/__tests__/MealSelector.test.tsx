import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MealSelector } from "@/components/MealSelector";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { ModalProvider } from "@/contexts/ModalContext";

const initialState = useFoodinatorStore.getState();

const renderMealSelector = () => {
  render(
    <ModalProvider>
      <MealSelector />
    </ModalProvider>,
  );
};

describe("MealSelector", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    act(() => {
      useFoodinatorStore.setState(initialState);
    });
  });

  it("should filter meals based on search term", async () => {
    renderMealSelector();
    const searchInput = screen.getByTestId("meal-selector-search-input");

    await user.type(searchInput, "pasta");

    expect(screen.getByText("Fishy pasta")).toBeInTheDocument();
    expect(screen.getByText("Pasta bolognese")).toBeInTheDocument();
    expect(screen.getByText("Pasta carbonara")).toBeInTheDocument();

    expect(screen.queryByText("Burgers")).not.toBeInTheDocument();
  });

  it("should show ingredient suggestions when typing", async () => {
    renderMealSelector();
    const searchInput = screen.getByTestId("meal-selector-search-input");

    await user.type(searchInput, "chic");

    const suggestionsList = screen.getByTestId("meal-selector-suggestions-list");
    expect(within(suggestionsList).getByText("Chicken")).toBeInTheDocument();
    expect(within(suggestionsList).getByText("Chickpeas")).toBeInTheDocument();
  });

  it("should filter meals by selected ingredients", async () => {
    renderMealSelector();

    const searchInput = screen.getByTestId("meal-selector-search-input");
    await user.type(searchInput, "mush");

    const mushroomSuggestionTag = screen.getByTestId("meal-selector-suggestion-mushrooms");
    await user.click(mushroomSuggestionTag);

    const selectedTag = await screen.findByTestId("meal-selector-selected-tag-mushrooms");
    expect(selectedTag).toBeInTheDocument();

    expect(within(selectedTag).getByText("×")).toBeInTheDocument();

    expect(screen.getByText("Creamy Chic Broc")).toBeInTheDocument();
    expect(screen.getByText("Epic beans and steak")).toBeInTheDocument();
    expect(screen.queryByText("Burgers")).not.toBeInTheDocument();
  });

  it('should add a meal to the plan when "Add" is clicked', async () => {
    renderMealSelector();

    const burgerCard = screen.getByText("Burgers").closest(".card")!;
    const addButton = within(burgerCard as HTMLElement).getByRole("button", { name: "Add" });

    await user.click(addButton);

    const mealSlots = useFoodinatorStore.getState().mealSlots;
    const addedMeal = mealSlots.find(slot => slot.mealId === "burgers");
    expect(addedMeal).toBeDefined();
  });
});
