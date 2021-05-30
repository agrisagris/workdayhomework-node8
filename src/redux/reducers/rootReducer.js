import { combineReducers } from "redux";
import ratesState from "./ratesReducer";

const rootReducer = combineReducers({
  ratesState,
});

export default rootReducer;
