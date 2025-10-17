import React, { useState } from "react";
import { useModal } from "@/contexts/ModalContext";

interface AddRestockItemModalProps {
  onAdd: (itemName: string) => void;
}

export function AddRestockItemModal({ onAdd }: AddRestockItemModalProps) {
  const [itemName, setItemName] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim());
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div>
      <h2 className="modal-title">Add item to restock</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group spaced">
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
            data-testid="add-item-input"
          />
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
            disabled={!itemName.trim()}
          >
            Add item
          </button>
        </div>
      </form>
    </div>
  );
}
