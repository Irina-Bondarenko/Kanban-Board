import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  let onPageChangeMock: jest.Mock;

  beforeEach(() => {
    onPageChangeMock = jest.fn();
  });

  test("renders correct number of buttons", () => {
    const { getAllByRole } = render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = getAllByRole("button");

    const numberedButtons = buttons.slice(1, -1);

    expect(numberedButtons).toHaveLength(5);
  });

  test("renders correct button numbers", () => {
    const { getAllByRole } = render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = getAllByRole("button");

    for (let i = 1; i < buttons.length - 1; i++) {
      expect(buttons[i].textContent).toBe(String(i));
    }
  });

  it('current page button has "solid" variant', async () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    const button = screen.getByText("3");

    await waitFor(() => {
      expect(button).toHaveClass("solid");
    });
  });

  it('non-current page buttons have "outline" variant', async () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = screen.getAllByRole("button");

    await waitFor(() => {
      buttons.forEach((button, index) => {
        if (index + 1 !== 3) {
          expect(button).toHaveAttribute("variant", "outline");
        }
      });
    });
  });

  it('non-current page buttons have "outline" variant', async () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    const buttons = screen.getAllByRole("button");

    await waitFor(() => {
      buttons.forEach((button, index) => {
        if (index !== 2) {
          expect(button).toHaveClass("outline");
        }
      });
    });
  });

  test("clicking a button calls onPageChange with correct page number", () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );
    const button = getByText("2");
    fireEvent.click(button);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
