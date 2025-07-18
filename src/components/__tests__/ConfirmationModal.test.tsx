import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalProvider } from "@/contexts/ModalContext";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { Modal } from "@/components/Modal";

function TestTriggerComponent() {
  const { openConfirmation } = useConfirmationModal();

  const handleOpen = () => {
    openConfirmation({
      title: "Test Title",
      message: "Are you sure?",
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });
  };

  return <button onClick={handleOpen}>Open Modal</button>;
}

const user = userEvent.setup();
const mockOnConfirm = vi.fn();
const mockOnCancel = vi.fn();

describe("ConfirmationModal and useConfirmationModal hook", () => {
  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  const renderComponent = () => {
    render(
      <ModalProvider>
        <TestTriggerComponent />
        <Modal />
      </ModalProvider>,
    );
  };

  it("should not be visible initially", () => {
    renderComponent();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should open the modal with the correct content when triggered", async () => {
    renderComponent();
    const openButton = screen.getByRole("button", { name: /Open Modal/i });
    await user.click(openButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should call onConfirm and close the modal when the confirm button is clicked", async () => {
    renderComponent();
    await user.click(screen.getByRole("button", { name: /Open Modal/i }));

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should call onCancel and close the modal when the cancel button is clicked", async () => {
    renderComponent();
    await user.click(screen.getByRole("button", { name: /Open Modal/i }));

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
