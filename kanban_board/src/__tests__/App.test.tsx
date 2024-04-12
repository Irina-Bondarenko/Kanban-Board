import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../pages/MainPage", () => () => <div>MainPage</div>);

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders MainPage", () => {
    render(<App />);
    expect(screen.getByText("MainPage")).toBeInTheDocument();
  });
});
