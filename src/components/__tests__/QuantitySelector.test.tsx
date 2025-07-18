import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantitySelector } from "@/components/QuantitySelector";

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
    expect(screen.getByText("5")).toBeInTheDocument();
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

    const increaseButton = screen.getByRole("button", { name: /Increase quantity/i });
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

    const decreaseButton = screen.getByRole("button", { name: /Decrease quantity/i });
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
    const increaseButton = screen.getByRole("button", { name: /Increase quantity/i });
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
    const decreaseButton = screen.getByRole("button", { name: /Decrease quantity/i });
    expect(decreaseButton).toBeDisabled();
  });
});
