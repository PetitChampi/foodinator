import { useModal, ModalSize } from "@/contexts/ModalContext";

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  size?: ModalSize;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmationModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "btn btn-danger",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const { closeModal } = useModal();

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <h2 className="modal-title">{title}</h2>
      <p className="modal-subtitle">{message}</p>
      <div className="modal-actions">
        <button onClick={handleCancel} className="btn btn-tertiary">
          {cancelText}
        </button>
        <button onClick={handleConfirm} className={confirmButtonClass}>
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export function useConfirmationModal() {
  const { openModal } = useModal();

  const openConfirmation = (props: ConfirmationModalProps) => {
    const { size = "sm", ...modalProps } = props;
    openModal(<ConfirmationModal {...modalProps} />, size);
  };

  return { openConfirmation };
}
