import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Tasks from "../components/Tasks";

const mockStore = configureStore([]);

describe("Tasks component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      issues: {
        value: [
          { id: 1, title: "Issue 1", state: "open" },
          { id: 2, title: "Issue 2", state: "in_progress" },
          { id: 3, title: "Issue 3", state: "closed" },
        ],
        isLoading: false,
      },
    });
  });

  test("renders tasks columns correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>,
    );

    expect(getByText("ToDo")).toBeInTheDocument();
    expect(getByText("In Progress")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  test("displays spinner when loading", () => {
    store = mockStore({
      issues: {
        value: [],
        isLoading: true,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>,
    );

    expect(getByTestId("spinner")).toBeInTheDocument();
  });

  test('displays "No issues yet" when there are no issues', () => {
    store = mockStore({
      issues: {
        value: [],
        isLoading: false,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>,
    );

    expect(getByText("No issues yet")).toBeInTheDocument();
  });

  test("handles drag start event correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Tasks />
      </Provider>,
    );

    const issue = getByText("Issue 1");
    fireEvent.dragStart(issue);
  });
});
