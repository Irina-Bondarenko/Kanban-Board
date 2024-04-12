import { render, fireEvent } from "@testing-library/react";
import Column, { IColumnProps } from "../components/Column";

describe("Column", () => {
  const mockHandleDragStart = jest.fn();
  const mockHandleDragOver = jest.fn();
  const mockHandleDrop = jest.fn();

  const defaultProps: IColumnProps = {
    issues: [{ id: 1, title: "Test Issue" }],
    columnProgressName: "Test Column",
    targetColumnIndex: 0,
    handleDragStart: mockHandleDragStart,
    handleDragOver: mockHandleDragOver,
    handleDrop: mockHandleDrop,
  };

  it("renders without crashing", () => {
    const { getByText } = render(<Column {...defaultProps} />);
    expect(getByText("Test Column")).toBeInTheDocument();
  });

  it("renders the correct number of issues", () => {
    const { getAllByText } = render(<Column {...defaultProps} />);
    expect(getAllByText("Test Issue")).toHaveLength(1);
  });

  it("calls handleDragOver when column is dragged over", () => {
    const { getByText } = render(<Column {...defaultProps} />);
    fireEvent.dragOver(getByText("Test Column"));
    expect(mockHandleDragOver).toHaveBeenCalled();
  });

  it("calls handleDrop when an item is dropped on the column", () => {
    const { getByText } = render(<Column {...defaultProps} />);
    fireEvent.drop(getByText("Test Column"));
    expect(mockHandleDrop).toHaveBeenCalled();
  });
});
