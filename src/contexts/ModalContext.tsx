import { createContext, useContext, ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

interface ModalContextType {
  isOpen: boolean;
  isClosing: boolean;
  content: ReactNode | null;
  size: ModalSize;
  isSlider: boolean;
  openModal: (content: ReactNode, size?: ModalSize, isSlider?: boolean) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
