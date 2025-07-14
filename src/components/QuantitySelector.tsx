import React from 'react';

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
    <div className="quantity-controls">
      <button
        type="button"
        className="btn btn-tertiary btn-sm quantifier"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={`Decrease quantity of ${ariaLabelPrefix}`}
      >
        -
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        type="button"
        className="btn btn-tertiary btn-sm quantifier"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={`Increase quantity of ${ariaLabelPrefix}`}
      >
        +
      </button>
    </div>
  );
};