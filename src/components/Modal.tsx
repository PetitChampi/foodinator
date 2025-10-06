import { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";

export function Modal() {
  const { isOpen, isClosing, content, size, isSlider, closeModal } = useModal();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal-overlay ${isSlider ? "is-slider" : ""} ${isClosing ? "modal-closing" : ""}`}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        className={`modal-body modal-${size} ${isClosing ? "modal-closing" : ""}`}
        role="dialog"
        aria-modal="true"
        data-testid="modal-body"
      >
        <button
          className="modal-close-button"
          onClick={closeModal}
          aria-label="Close modal"
          data-testid="modal-close-button"
        >×</button>
        <div className="modal-content" data-testid="modal-content">
          {content}
        </div>
      </div>
    </div>
  );
}
