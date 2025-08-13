import { getMealById } from "@/models/mealData";
import { getIngredientById } from "@/models/ingredients";
import { getTagById } from "@/models/tagDefinitions";
import { Icon } from "./Icon";

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
          {meal.tags?.convenience?.map((tagId) => {
            const tag = getTagById(tagId);
            return tag ? (
              <span key={tagId} className="tag tag-sm">{tag.name}</span>
            ) : null;
          })}
        </div>

        <div className="modal-split-2">
          <div className="modal-section" data-testid="meal-modal-ingredients">
            <h3 className="modal-section-header"><Icon name="carrot" className="icon" />Ingredients</h3>
            <ul data-testid="meal-modal-ingredients-list">
              {ingredientNames.map((ingredientName, index) => (
                <li key={index} data-testid={`meal-modal-ingredient-${index}`}>{ingredientName}</li>
              ))}
            </ul>
          </div>
          <div className="modal-section">
            <h3 className="modal-section-header"><Icon name="tools-kitchen" className="icon" />Tools</h3>
            <ul>
              {meal.tools?.map((tool, index) => (
                <li key={index} data-testid={`meal-modal-tool-${index}`}>{tool}</li>
              )) || <li>No tools specified</li>}
            </ul>
          </div>
        </div>
        {meal.seasoning && meal.seasoning.length > 0 && (
          <div className="section-notes">
            <div className="notes-title">Suggested seasoning:</div>
            {meal.seasoning
              .map(seasoningId => getIngredientById(seasoningId))
              .filter(seasoning => seasoning !== null)
              .map(seasoning => seasoning!.name)
              .join(", ")}
          </div>
        )}

        <div className="modal-section">
          <h3 className="modal-section-header"><Icon name="list-numbers" className="icon" />Steps</h3>
          {meal.steps ? (
            <>
              {meal.steps.prep && meal.steps.prep.length > 0 && (
                <div className="steps-section">
                  <h4 className="steps-subsection-header">Prep</h4>
                  <ol>
                    {meal.steps.prep.map((step, index) => (
                      <li key={`prep-${index}`} data-testid={`meal-modal-prep-step-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {meal.steps.cook && meal.steps.cook.length > 0 && (
                <div className="steps-section">
                  <h4 className="steps-subsection-header">Cooking</h4>
                  <ol start={meal.steps.prep ? meal.steps.prep.length + 1 : 1}>
                    {meal.steps.cook.map((step, index) => (
                      <li key={`cook-${index}`} data-testid={`meal-modal-cook-step-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          ) : (
            <p>No steps specified</p>
          )}
        </div>
      </div>
    </div>
  );
}
