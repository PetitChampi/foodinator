import { getMealById, getIngredientById } from '../models/data';

interface MealDetailsModalProps {
  mealId: string;
}

export function MealDetailsModal({ mealId }: MealDetailsModalProps) {
  const meal = getMealById(mealId);

  if (!meal) {
    return (
      <div>
        <h2 className="modal-title">Meal not found</h2>
        <p>Sorry, we couldn't find the details for this meal.</p>
      </div>
    );
  }

  const ingredientNames = meal.ingredients
    .map(ingredientId => getIngredientById(ingredientId))
    .filter(ingredient => ingredient !== null)
    .map(ingredient => ingredient!.name);

  return (
    <div>
      <div className="modal-img">
        {meal.imageUrl && <img src={meal.imageUrl} alt={meal.name} />}
      </div>
      <div className="modal-meal-details">
        <h2 className="modal-title">{meal.name}</h2>
        <div className="modal-ingredients">
          <h3 className="modal-section-header">Ingredients</h3>
          <ul>
            {ingredientNames.map((ingredientName, index) => (
              <li key={index}>{ingredientName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
