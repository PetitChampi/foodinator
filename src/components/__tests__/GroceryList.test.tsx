import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GroceryList } from '../GroceryList';
import { useFoodinatorStore } from '../../store/useFoodinatorStore';
import { vi } from 'vitest';

const renderGroceryList = () => {
  render(<GroceryList />);
};

const user = userEvent.setup();
const initialState = useFoodinatorStore.getState();

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: unknown) => value,
}));

describe('GroceryList', () => {
  beforeEach(() => {
    act(() => {
      useFoodinatorStore.setState(initialState, true);
    });
  });

  it('should display an empty state message when no meals are selected', () => {
    renderGroceryList();
    expect(screen.getByText(/Your grocery list will appear here/i)).toBeInTheDocument();
  });

  it('should group ingredients by meal by default', () => {
    act(() => {
      useFoodinatorStore.getState().addMeal('burgers', 1);
      useFoodinatorStore.getState().addMeal('pasta-bolognese', 1);
    });
    renderGroceryList();

    const burgerSection = screen.getByText('Burgers').closest('.grocery-section');
    const pastaSection = screen.getByText('Pasta bolognese').closest('.grocery-section');

    expect(burgerSection).toBeInTheDocument();
    expect(pastaSection).toBeInTheDocument();

    expect(within(burgerSection as HTMLElement).getByText('Buns')).toBeInTheDocument();
    expect(within(pastaSection as HTMLElement).getByText('Tomato sauce')).toBeInTheDocument();
  });

  it('should display portions as a badge for quantities greater than 1', () => {
    act(() => {
      useFoodinatorStore.getState().addMeal('pasta-bolognese', 2);
    });
    renderGroceryList();

    const groundBeefLi = screen.getByText('Ground beef').closest('li');
    expect(within(groundBeefLi!).getByText('2')).toBeInTheDocument();
  });

  it('should sort ingredients by name when selected', async () => {
    act(() => {
      useFoodinatorStore.getState().addMeal('burgers', 1);
    });
    renderGroceryList();

    const sortDropdown = screen.getByRole('combobox');
    await user.selectOptions(sortDropdown, 'name');

    const listItems = screen.getAllByRole('listitem');
    const ingredientNames = listItems.map(li => li.textContent);
    
    expect(ingredientNames).toEqual([
      "Buns",
      "Cheese",
      "Ground beef",
      "Lettuce",
      "Potatoes",
      "Sauce"
    ]);
  });
  
  it('should hide and show checked items', async () => {
    act(() => {
      useFoodinatorStore.getState().addMeal('burgers', 1);
    });
    renderGroceryList();

    const cheeseCheckbox = screen.getByLabelText('Cheese');
    await user.click(cheeseCheckbox);
    
    const hideButton = screen.getByRole('button', { name: /Hide checked/i });
    await user.click(hideButton);

    expect(screen.queryByText('Cheese')).not.toBeInTheDocument();

    const showButton = screen.getByRole('button', { name: /Show All/i });
    await user.click(showButton);

    expect(screen.getByText('Cheese')).toBeInTheDocument();
  });
});