import { combineReducers } from "redux";
import userReducer from "./userReducer";

const reducers = combineReducers({
  userReducerList: userReducer,
});

export default reducers;
