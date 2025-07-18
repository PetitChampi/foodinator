import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantitySelector } from "@/components/QuantitySelector";
import { quantitySelectorTestIds } from "@/utils/testUtils";

describe("QuantitySelector", () => {
  const user = userEvent.setup();

  it("renders the initial quantity", () => {
    render(
      <QuantitySelector
        quantity={5}
        onIncrease={() => {}}
        onDecrease={() => {}}
        ariaLabelPrefix="Test Item"
      />,
    );
    expect(screen.getByTestId(quantitySelectorTestIds.quantityDisplay("Test Item"))).toHaveTextContent("5");
  });

  it("calls onIncrease when the increase button is clicked", async () => {
    const handleIncrease = vi.fn();
    render(
      <QuantitySelector
        quantity={1}
        onIncrease={handleIncrease}
        onDecrease={() => {}}
        ariaLabelPrefix="Test Item"
      />,
    );

    const increaseButton = screen.getByTestId(quantitySelectorTestIds.increaseButton("Test Item"));
    await user.click(increaseButton);

    expect(handleIncrease).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrease when the decrease button is clicked", async () => {
    const handleDecrease = vi.fn();
    render(
      <QuantitySelector
        quantity={2}
        onIncrease={() => {}}
        onDecrease={handleDecrease}
        ariaLabelPrefix="Test Item"
      />,
    );

    const decreaseButton = screen.getByTestId(quantitySelectorTestIds.decreaseButton("Test Item"));
    await user.click(decreaseButton);

    expect(handleDecrease).toHaveBeenCalledTimes(1);
  });

  it("disables the increase button when increaseDisabled is true", () => {
    render(
      <QuantitySelector
        quantity={1}
        onIncrease={() => {}}
        onDecrease={() => {}}
        increaseDisabled={true}
        ariaLabelPrefix="Test Item"
      />,
    );
    const increaseButton = screen.getByTestId(quantitySelectorTestIds.increaseButton("Test Item"));
    expect(increaseButton).toBeDisabled();
  });

  it("disables the decrease button when decreaseDisabled is true", () => {
    render(
      <QuantitySelector
        quantity={1}
        onIncrease={() => {}}
        onDecrease={() => {}}
        decreaseDisabled={true}
        ariaLabelPrefix="Test Item"
      />,
    );
    const decreaseButton = screen.getByTestId(quantitySelectorTestIds.decreaseButton("Test Item"));
    expect(decreaseButton).toBeDisabled();
  });
});
