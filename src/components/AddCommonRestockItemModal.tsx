import React, { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { RestockCategory } from "@/store/useFoodinatorStore";

interface AddCommonRestockItemModalProps {
  categories: RestockCategory[];
  onAdd: (itemName: string, categoryName: string) => void;
  mode?: "add" | "edit";
  initialItemName?: string;
  initialCategoryName?: string;
  onEdit?: (oldItemName: string, newItemName: string, newCategoryName: string) => void;
}

export function AddCommonRestockItemModal({
  categories,
  onAdd,
  mode = "add",
  initialItemName = "",
  initialCategoryName,
  onEdit,
}: AddCommonRestockItemModalProps) {
  const [itemName, setItemName] = useState(initialItemName);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryName || (categories.length > 0 ? categories[0].name : ""),
  );
  const { closeModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() && selectedCategory) {
      if (mode === "edit" && onEdit && initialItemName) {
        onEdit(initialItemName, itemName.trim(), selectedCategory);
      } else {
        onAdd(itemName.trim(), selectedCategory);
      }
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const isEdit = mode === "edit";
  const title = isEdit ? "Edit common item" : "Add common item";
  const submitButtonText = isEdit ? "Edit item" : "Add item";

  return (
    <div>
      <h2 className="modal-title">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group spaced">

          <div className="form-group">
            <label htmlFor="item-name" className="form-label">
              Item name
            </label>
            <input
              type="text"
              id="item-name"
              className="form-control"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
              data-testid="common-item-name-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-category" className="form-label">
              Category
            </label>
            <select
              id="item-category"
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              data-testid="common-item-category-select"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.emoji}&nbsp;&nbsp;{category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-tertiary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!itemName.trim() || !selectedCategory}
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
