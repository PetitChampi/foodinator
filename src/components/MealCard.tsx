import React from "react";

interface MealCardProps {
  imageUrl?: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const MealCard: React.FC<MealCardProps> = ({
  imageUrl,
  title,
  onClick,
  children,
}) => {
  // Create a test ID from the title by converting to lowercase and replacing spaces with hyphens
  const testId = `meal-card-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
      data-testid={testId}
    >
      <div className="meal-image" data-testid={`${testId}-image`}>
        {imageUrl && <img src={imageUrl} alt={title} data-testid={`${testId}-img`} />}
      </div>
      <div className="card-text" data-testid={`${testId}-text`}>
        <h3 className="card-title" data-testid={`${testId}-title`}>{title}</h3>
        {children}
      </div>
    </div>
  );
};
