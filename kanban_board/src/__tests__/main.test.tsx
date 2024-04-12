import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { render } from "@testing-library/react";
import { store, persistor } from "../app/store";
import App from "../App";

describe("App Component", () => {
  let getByTestId: Function;

  beforeEach(() => {
    const renderResult = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>,
    );
    getByTestId = renderResult.getByTestId;
  });

  test("renders without crashing", () => {
    const appContent = getByTestId("app-content");
    expect(appContent).toBeTruthy();
  });

  test("redux store is initialized correctly", () => {
    expect(store.getState()).toEqual(expect.anything());
  });

  test("redux persistor is initialized correctly", () => {
    expect(persistor.getState()).toEqual(expect.anything());
  });
});
