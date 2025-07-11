import { createContext, useContext, useState, ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

interface ModalContextType {
  isOpen: boolean;
  isClosing: boolean;
  content: ReactNode | null;
  size: ModalSize;
  openModal: (content: ReactNode, size?: ModalSize) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [size, setSize] = useState<ModalSize>("sm");

  const openModal = (content: ReactNode, size: ModalSize = "sm") => {
    setContent(content);
    setSize(size);
    setIsOpen(true);
    setIsClosing(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setContent(null);
      setSize("sm");
      document.body.style.overflow = "unset";
    }, 200); // Match the transition duration
  };

  return (
    <ModalContext.Provider value={{ isOpen, isClosing, content, size, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
