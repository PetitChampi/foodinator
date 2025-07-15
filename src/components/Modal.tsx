import { useEffect } from "react";
import { useModal } from "../contexts/ModalContext";

export function Modal() {
  const { isOpen, isClosing, content, size, closeModal } = useModal();

  // Handle escape key press
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
    <div className={`modal-overlay ${isClosing ? 'modal-closing' : ''}`} onClick={handleOverlayClick}>
      <div
        className={`modal-body modal-${size} ${isClosing ? 'modal-closing' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-button" 
          onClick={closeModal}
          aria-label="Close modal"
        >×</button>
        <div className="modal-content">
          {content}
        </div>
      </div>
    </div>
  );
}