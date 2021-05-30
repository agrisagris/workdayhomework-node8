import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const component = () =>
  render(
    <ReduxProvider store={mockStore({})}>
      <App />
    </ReduxProvider>
  );

test("renders todo", () => {
  const { getByText } = component();
  const todoElement = getByText(/here be dragons/i);

  expect(todoElement).toBeInTheDocument();
});

test("Load rates button:renders", () => {
  const { getByRole } = component();

  const buttonElement = getByRole("button", { name: /load rates/i });

  expect(buttonElement).toBeInTheDocument();
});

test("Load rates button:snapshot before press", () => {
  const { container } = component();

  expect(container).toMatchSnapshot();
});
