import { render, fireEvent } from "@testing-library/react";
import InputLink from "../components/InputLink";

describe("InputLink", () => {
  const mockInputValueHandler = jest.fn();
  const mockButtonSubmitHandler = jest.fn();

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <InputLink
        inputValue=""
        inputValueHandler={mockInputValueHandler}
        buttonSubmitHandler={mockButtonSubmitHandler}
      />,
    );

    expect(getByPlaceholderText("Enter repo URL")).toBeInTheDocument();
    expect(getByText("Load issues")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const { getByPlaceholderText } = render(
      <InputLink
        inputValue=""
        inputValueHandler={mockInputValueHandler}
        buttonSubmitHandler={mockButtonSubmitHandler}
      />,
    );

    fireEvent.change(getByPlaceholderText("Enter repo URL"), {
      target: { value: "test" },
    });
    expect(mockInputValueHandler).toHaveBeenCalled();
  });

  it("triggers submit handler when button is clicked", () => {
    const { getByText } = render(
      <InputLink
        inputValue=""
        inputValueHandler={mockInputValueHandler}
        buttonSubmitHandler={mockButtonSubmitHandler}
      />,
    );

    fireEvent.click(getByText("Load issues"));
    expect(mockButtonSubmitHandler).toHaveBeenCalled();
  });
});
