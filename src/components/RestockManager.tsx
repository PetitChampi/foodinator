import React, { useState } from "react";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { useModal } from "@/contexts/ModalContext";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { AddRestockItemModal } from "@/components/AddRestockItemModal";
import { AddCommonRestockItemModal } from "@/components/AddCommonRestockItemModal";

export const RestockManager: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const restockList = useFoodinatorStore((state) => state.restockList);
  const restockCategories = useFoodinatorStore((state) => state.restockCategories);
  const addRestockItem = useFoodinatorStore((state) => state.addRestockItem);
  const removeRestockItem = useFoodinatorStore((state) => state.removeRestockItem);
  const toggleRestockItem = useFoodinatorStore((state) => state.toggleRestockItem);
  const resetRestockList = useFoodinatorStore((state) => state.resetRestockList);
  const addCommonRestockItem = useFoodinatorStore((state) => state.addCommonRestockItem);
  const editCommonRestockItem = useFoodinatorStore((state) => state.editCommonRestockItem);
  const deleteCommonRestockItem = useFoodinatorStore((state) => state.deleteCommonRestockItem);

  const { openModal } = useModal();
  const { openConfirmation } = useConfirmationModal();

  const handleRemoveItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeRestockItem(itemId);
  };

  const handleToggleItem = (itemId: string) => {
    toggleRestockItem(itemId);
  };

  const handleResetList = () => {
    openConfirmation({
      title: "Reset restock list",
      message: "Are you sure you want to delete all items in the restock list?",
      confirmText: "Reset list",
      confirmButtonClass: "btn btn-danger",
      onConfirm: resetRestockList,
    });
  };

  const handleAddUnlistedItem = () => {
    openModal(
      <AddRestockItemModal
        onAdd={(itemName) => addRestockItem(itemName, "📦")}
      />,
      "sm",
    );
  };

  const handleAddNewCommonItem = () => {
    openModal(
      <AddCommonRestockItemModal
        categories={restockCategories}
        onAdd={(itemName, categoryName) => addCommonRestockItem(itemName, categoryName)}
        mode="add"
      />,
      "sm",
    );
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleEditCommonItem = (itemName: string, categoryName: string) => {
    openModal(
      <AddCommonRestockItemModal
        categories={restockCategories}
        onAdd={() => {}}
        onEdit={(oldName, newName, newCategory) => {
          editCommonRestockItem(oldName, categoryName, newName, newCategory);
        }}
        mode="edit"
        initialItemName={itemName}
        initialCategoryName={categoryName}
      />,
      "sm",
    );
  };

  const handleDeleteCommonItem = (itemName: string, categoryName: string, emoji: string) => {
    openConfirmation({
      title: `Delete ${emoji} ${itemName}`,
      message: "Are you sure you want to delete this item from your Common items list?",
      confirmText: "Delete item",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => deleteCommonRestockItem(itemName, categoryName),
    });
  };

  const handleAddCommonItemToBadge = (itemName: string, categoryEmoji: string) => {
    // Only add if not already in restock list
    const alreadyInList = restockList.some((item) => item.name === itemName);
    if (!alreadyInList) {
      addRestockItem(itemName, categoryEmoji);
    }
  };

  const isItemInRestockList = (itemName: string) => {
    return restockList.some((item) => item.name === itemName);
  };

  return (
    <div className="restock-view">
      {restockList.length === 0 ? (
        <div className="empty" data-testid="restock-manager-view">
          Nothing to restock
        </div>
      ) : (
        <ul className="restock-list">
          {restockList.map((item) => (
            <li key={item.id}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                />
                <label htmlFor={item.id}>
                  <span className="category-emoji">{item.categoryEmoji}</span>
                  {item.name}
                  <span
                    className="badge-delete"
                    onClick={(e) => handleRemoveItem(e, item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleRemoveItem(e as unknown as React.MouseEvent, item.id);
                      }
                    }}
                  >✕</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="restock-view-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleAddUnlistedItem}
          data-testid="restock-add-unlisted-item"
        >
          <span className="plus">+</span>
          Add unlisted item
        </button>
        {restockList.length > 0 && (
          <button
            className="btn btn-danger-tertiary btn-sm"
            onClick={handleResetList}
          >Reset list</button>
        )}
      </div>

      <div className="restock-common-items">
        <h3 className="grocery-section__title">Common items</h3>

        <div className="restock-category-list">
          {restockCategories.map((category) => (
            <div key={category.name} className="restock-common-category">
              <h4 className="tag-category-title">{category.name}</h4>
              <div className="badge-list">
                {category.items.map((itemName) => {
                  const inRestockList = isItemInRestockList(itemName);
                  const badgeClass = `restock-common-item-badge ${
                    inRestockList && !isEditMode ? "restock-common-item-badge--hidden" : ""
                  } ${isEditMode ? "restock-common-item-badge--editing" : ""}`;

                  return (
                    <div
                      key={itemName}
                      className={badgeClass}
                      onClick={() => {
                        if (isEditMode) {
                          handleEditCommonItem(itemName, category.name);
                        } else if (!inRestockList) {
                          handleAddCommonItemToBadge(itemName, category.emoji);
                        }
                      }}
                      role="button"
                      tabIndex={inRestockList && !isEditMode ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          if (isEditMode) {
                            handleEditCommonItem(itemName, category.name);
                          } else if (!inRestockList) {
                            handleAddCommonItemToBadge(itemName, category.emoji);
                          }
                        }
                      }}
                      style={{ display: inRestockList && !isEditMode ? "none" : undefined }}
                    >
                      {!isEditMode && <span className="plus">+</span>}
                      <span className="category-emoji">{category.emoji}</span>
                      {itemName}
                      {isEditMode && (
                        <span
                          className="badge-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCommonItem(itemName, category.name, category.emoji);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              handleDeleteCommonItem(itemName, category.name, category.emoji);
                            }
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="restock-common-items-actions">
          <button className="btn btn-tertiary" onClick={handleToggleEditMode}>
            {isEditMode ? "Finish editing" : "Edit common items"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleAddNewCommonItem}
            disabled={isEditMode}
          >
            <span className="plus">+</span>
            New item
          </button>
        </div>
      </div>
    </div>
  );
};
