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
  return (
    <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="meal-image">
        {imageUrl && <img src={imageUrl} alt={title} />}
      </div>
      <div className="card-text">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};
