import { getMealById, getIngredientById } from "@/models/data";

interface MealDetailsModalProps {
  mealId: string;
}

export function MealDetailsModal({ mealId }: MealDetailsModalProps) {
  const meal = getMealById(mealId);

  if (!meal) {
    return (
      <div data-testid="meal-modal-not-found">
        <h2 className="modal-title" data-testid="meal-modal-title">Meal not found</h2>
        <p>Sorry, we couldn't find the details for this meal.</p>
      </div>
    );
  }

  const ingredientNames = meal.ingredients
    .map(ingredientId => getIngredientById(ingredientId))
    .filter(ingredient => ingredient !== null)
    .map(ingredient => ingredient!.name);

  return (
    <div data-testid={`meal-modal-${mealId}`}>
      <div className="modal-img" data-testid="meal-modal-image">
        {meal.imageUrl && <img src={meal.imageUrl} alt={meal.name} data-testid="meal-modal-img" />}
      </div>
      <div className="modal-meal-details" data-testid="meal-modal-details">
        <h2 className="modal-title" data-testid="meal-modal-title">{meal.name}</h2>
        <div className="modal-ingredients" data-testid="meal-modal-ingredients">
          <h3 className="modal-section-header">Ingredients</h3>
          <ul data-testid="meal-modal-ingredients-list">
            {ingredientNames.map((ingredientName, index) => (
              <li key={index} data-testid={`meal-modal-ingredient-${index}`}>{ingredientName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
