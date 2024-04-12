import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";

describe("ErrorBoundary", () => {
  const FallbackComponent = () => <div>Fallback component</div>;
  const ChildComponent = () => {
    throw new Error("Test error");
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders children when there's no error", () => {
    const { container } = render(
      <ErrorBoundary fallbackComponent={<FallbackComponent />}>
        <div>Child component</div>
      </ErrorBoundary>,
    );

    expect(container).toHaveTextContent("Child component");
  });

  test("Renders fallback component when child throws an error", () => {
    render(
      <ErrorBoundary fallbackComponent={<FallbackComponent />}>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Fallback component")).toBeInTheDocument();
  });

  test("logs error to console when child throws an error", () => {
    render(
      <ErrorBoundary fallbackComponent={<FallbackComponent />}>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
