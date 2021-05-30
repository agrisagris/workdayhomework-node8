import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import App from "./App";
import configureStore from "./redux/configureStore";

const component = () =>
  render(
    <ReduxProvider store={configureStore()}>
      <App />
    </ReduxProvider>
  );
var mock = new MockAdapter(axios);
const data = { rates: { EUR: 1, USD: 1.2264, JPY: 133.49 } };

test("Load rates button: pressed show data", async () => {
  mock.onGet(process.env.REACT_APP_API).reply(200, data);

  const { getByRole, getByText, container } = component();

  const buttonElement = getByRole("button", { name: /load rates/i });

  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);
  await wait(() => {
    expect(mock.history.get.length).toBe(1);
  });

  expect(container).toMatchSnapshot();

  expect(getByText(/currency/i)).toBeInTheDocument();

  expect(getByText(/eur/i)).toBeInTheDocument();
  expect(getByText(/usd/i)).toBeInTheDocument();
  expect(getByText(/jpy/i)).toBeInTheDocument();
});

test("Load rates button: pressed network error", async () => {
  mock.reset();
  mock.onGet(process.env.REACT_APP_API).networkError();

  const { getByRole, container } = component();

  const buttonElement = getByRole("button", { name: /load rates/i });

  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);

  await wait(() => {
    expect(mock.history.get.length).toBe(1);
  });

  expect(container).toMatchSnapshot();
});

test("Load rates button: pressed loading", async () => {
  mock.reset();
  mock.onGet(process.env.REACT_APP_API).replyOnce();

  const { getByRole, getByText, container } = component();

  const buttonElement = getByRole("button", { name: /load rates/i });

  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);

  expect(getByText(/loading/i)).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
