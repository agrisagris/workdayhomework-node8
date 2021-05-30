import * as types from "../actions/actionTypes";

export default function ratesReducer(
  state = { loading: null, data: null, error: null },
  { type, loading, data, error }
) {
  switch (type) {
    case types.API_LOADING:
      return { ...state, loading };
    case types.LOAD_RATES_SUCESS:
      return { ...state, data };
    case types.API_ERROR:
      return { ...state, error, data: null };
    default:
      return state;
  }
}
