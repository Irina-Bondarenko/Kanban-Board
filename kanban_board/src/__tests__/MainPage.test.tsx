import { render, screen } from "@testing-library/react";
import MainPage from "../pages/MainPage";
import ErrorBoundary from "../components/ErrorBoundary";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../app/store";

const store = createStore(rootReducer);

describe("MainPage", () => {
  test("renders MainPage component", () => {
    render(
      <Provider store={store}>
        <MainPage />{" "}
      </Provider>,
    );
    const mainPageElement = screen.getByTestId("main-page");
    expect(mainPageElement).toBeInTheDocument();
  });

  test("renders InputComponent", () => {
    render(
      <Provider store={store}>
        <ErrorBoundary fallbackComponent={<div>Something went wrong...</div>}>
          <MainPage />
        </ErrorBoundary>
        ,
      </Provider>,
    );
    const inputComponentElement = screen.getByTestId("input-component");
    expect(inputComponentElement).toBeInTheDocument();
  });

  test("renders Tasks component", () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );
    const tasksComponentElement = screen.getByTestId("tasks-component");
    expect(tasksComponentElement).toBeInTheDocument();
  });
});
