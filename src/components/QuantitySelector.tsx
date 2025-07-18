import React from "react";
import { quantitySelectorTestIds } from "@/utils/testUtils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
  ariaLabelPrefix: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  increaseDisabled = false,
  decreaseDisabled = false,
  ariaLabelPrefix,
}) => {
  return (
    <div className="quantity-controls" data-testid={quantitySelectorTestIds.container(ariaLabelPrefix)}>
      <button
        type="button"
        className="btn btn-tertiary btn-sm quantifier"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={`Decrease quantity of ${ariaLabelPrefix}`}
        data-testid={quantitySelectorTestIds.decreaseButton(ariaLabelPrefix)}
      >
        -
      </button>
      <span className="quantity-display" data-testid={quantitySelectorTestIds.quantityDisplay(ariaLabelPrefix)}>
        {quantity}
      </span>
      <button
        type="button"
        className="btn btn-tertiary btn-sm quantifier"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={`Increase quantity of ${ariaLabelPrefix}`}
        data-testid={quantitySelectorTestIds.increaseButton(ariaLabelPrefix)}
      >
        +
      </button>
    </div>
  );
};
