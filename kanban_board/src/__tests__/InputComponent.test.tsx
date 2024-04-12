import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import InputComponent from "../components/InputComponent";

const mockStore = configureStore([]);

describe("InputComponent", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      issues: {
        value: [],
        totalPages: 0,
        repoLink: "",
        currentPage: 1,
        sorting: "",
        isLoading: false,
      },
    });
  });

  test("renders input component correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InputComponent />
      </Provider>,
    );

    expect(getByTestId("input-component")).toBeInTheDocument();
  });

  test("updates input value correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InputComponent />
      </Provider>,
    );

    const input = getByTestId("input");
    fireEvent.change(input, {
      target: { value: "https://github.com/user/repo" },
    });

    expect(input).toHaveValue("https://github.com/user/repo");
  });

  test("calls button submit handler correctly", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InputComponent />
      </Provider>,
    );

    const input = getByTestId("input");
    fireEvent.change(input, {
      target: { value: "https://github.com/user/repo" },
    });

    const button = getByTestId("submit-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual({
        type: "ISSUES_LOADING",
        payload: true,
      });

      expect(store.getActions()).toContainEqual({});
    });
  });
});
