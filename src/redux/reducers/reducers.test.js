import * as types from "../actions/actionTypes";
import ratesReducer from "./ratesReducer";
import rootReducer from "./rootReducer";

const initialState = { loading: null, data: null, error: null };

test("ratesReducer: check initial state", () => {
  const newState = ratesReducer(undefined, {});

  expect(newState).toMatchObject(initialState);
});

test("ratesReducer: check loading state", () => {
  const type = types.API_LOADING;

  const newState = ratesReducer(initialState, { type, loading: true });

  expect(newState).toMatchObject({ ...initialState, loading: true });
});

test("ratesReducer: check data state", () => {
  const type = types.LOAD_RATES_SUCESS;

  const newState = ratesReducer(initialState, { type, data: "Test data" });

  expect(newState).toMatchObject({ ...initialState, data: "Test data" });
});

test("ratesReducer: check error state", () => {
  const type = types.API_ERROR;

  const newState = ratesReducer(initialState, { type, error: true });

  expect(newState).toMatchObject({ ...initialState, error: true });
});

test("ratesReducer: check if other type affects state", () => {
  const type = "Nonexisting type";

  const newState = ratesReducer(initialState, { type, error: true });

  expect(newState).toMatchObject(initialState);
});

test("rootReducer: check initial Root State", () => {
  const intialRootState = {
    ratesState: { loading: null, data: null, error: null },
  };

  const newState = rootReducer(undefined, {});

  expect(newState).toMatchObject(intialRootState);
});
