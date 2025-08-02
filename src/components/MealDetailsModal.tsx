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

        <div className="meal-tags">
          <span className="tag tag-sm">Batchable</span>
          <span className="tag tag-sm">Fridge-friendly</span>
          <span className="tag tag-sm">Sandwich</span>
        </div>

        <div className="modal-split-2">
          <div className="modal-section" data-testid="meal-modal-ingredients">
            <h3 className="modal-section-header">Ingredients</h3>
            <ul data-testid="meal-modal-ingredients-list">
              {ingredientNames.map((ingredientName, index) => (
                <li key={index} data-testid={`meal-modal-ingredient-${index}`}>{ingredientName}</li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h3 className="modal-section-header">Tools</h3>
            <ul>
              <li>Non-stick pan</li>
              <li>Large pot</li>
              <li>Tongs</li>
              <li>2 medium-sized bowls</li>
              <li>1 plate</li>
            </ul>
          </div>
        </div>
        <div className="section-notes"><div className="notes-title">Suggested seasoning:</div>dill, lemon juice, pepper, super long, ingredient, another thing</div>

        <div className="modal-section">
          <h3 className="modal-section-header">Steps</h3>
          <ol>
            <li>Cut the vegetables finely</li>
            <li>Sear the meat on medium-high heat</li>
            <li>Do something else until meal ready</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
