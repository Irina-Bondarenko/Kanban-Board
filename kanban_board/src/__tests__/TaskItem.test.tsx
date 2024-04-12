import { render, fireEvent } from "@testing-library/react";
import TaskItem, { ITaskItemProps } from "../components/TaskItem";

describe("TaskItem", () => {
  const mockHandleDragStart = jest.fn();
  const mockIssue = {
    title: "Test Issue",
    number: 1,
    created_at: new Date().toISOString(),
    user: { type: "User" },
    comments: 5,
    id: 123,
  };

  const defaultProps: ITaskItemProps = {
    issue: mockIssue,
    handleDragStart: mockHandleDragStart,
    columnProgressName: "To Do",
  };

  it("renders without crashing", () => {
    const { getByText } = render(<TaskItem {...defaultProps} />);
    expect(getByText("Test Issue")).toBeInTheDocument();
  });

  it("displays the correct issue number and days opened", () => {
    const { getByText } = render(<TaskItem {...defaultProps} />);
    expect(getByText(`#1 opened 0 days ago`)).toBeInTheDocument();
  });

  it("displays the correct user type and comments", () => {
    const { getByText } = render(<TaskItem {...defaultProps} />);
    expect(getByText("User")).toBeInTheDocument();
    expect(getByText("Comments: 5")).toBeInTheDocument();
  });

  it("calls handleDragStart when dragged", () => {
    const { getByText } = render(<TaskItem {...defaultProps} />);
    const taskItem = getByText("Test Issue");
    fireEvent.dragStart(taskItem);
    expect(mockHandleDragStart).toHaveBeenCalled();
  });
});
