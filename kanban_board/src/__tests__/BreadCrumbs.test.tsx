import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import BreadCrumbs from "../components/BreadCrumbs";

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn),
}));

describe("BreadCrumbs", () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockClear();
  });

  it("calls useSelector with correct argument", () => {
    render(<BreadCrumbs />);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
  });

  it("assigns values from useSelector correctly", () => {
    const mockState = {
      issues: {
        repoRating: "100",
        userLink: "https://example.com/user",
        repoLink: "https://example.com/repo",
        value: [{ id: 1, title: "Issue 1" }],
        isLoading: false,
      },
    };

    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback(mockState),
    );

    render(<BreadCrumbs />);

    expect(
      screen.getByText(`${mockState.issues.repoRating} K stars`),
    ).toBeInTheDocument();
  });
});
