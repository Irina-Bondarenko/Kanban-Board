import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Sorting from "../components/Sorting";

describe("Sorting", () => {
  let mockOnSort: jest.Mock;
  let mockOnResetHandler: jest.Mock;

  beforeEach(() => {
    mockOnSort = jest.fn();
    mockOnResetHandler = jest.fn();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sorting onSort={mockOnSort} onResetHandler={mockOnResetHandler} />
      </Provider>,
    );

    expect(getByText("Sort by Created")).toBeInTheDocument();
    expect(getByText("Sort by Updated")).toBeInTheDocument();
    expect(getByText("Sort by Comments")).toBeInTheDocument();
    expect(getByText("Sort by Reactions")).toBeInTheDocument();
    expect(getByText("To default")).toBeInTheDocument();
  });

  it("calls onSort with correct argument when sort buttons are clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sorting onSort={mockOnSort} onResetHandler={mockOnResetHandler} />
      </Provider>,
    );

    fireEvent.click(getByText("Sort by Created"));
    expect(mockOnSort).toHaveBeenCalledWith("created");

    fireEvent.click(getByText("Sort by Updated"));
    expect(mockOnSort).toHaveBeenCalledWith("updated");

    fireEvent.click(getByText("Sort by Comments"));
    expect(mockOnSort).toHaveBeenCalledWith("comments");

    fireEvent.click(getByText("Sort by Reactions"));
    expect(mockOnSort).toHaveBeenCalledWith("reactions");
  });

  it("calls onResetHandler when reset button is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sorting onSort={mockOnSort} onResetHandler={mockOnResetHandler} />
      </Provider>,
    );

    fireEvent.click(getByText("To default"));
    expect(mockOnResetHandler).toHaveBeenCalled();
  });
});
